# JSON Web Token(JWT)
서버와 클라이언트 통신에서 주로 로그인에 사용되는 보안 토큰

* https://www.npmjs.com/package/jsonwebtoken
* https://jwt.io

## Backend
* [Download](https://github.com/ovdncids/vue-curriculum/raw/master/download/express-server.zip)

### 설치
```sh
npm install jsonwebtoken
```

### JWT 미들웨어 파일 생성
middlewares/jwtAuth.js
```js
const jwt = require('jsonwebtoken')
const privateKey = 'a@a.com'
// privateKey를 바탕으로 JWT가 암호환된 토큰을 생성한다.

const tokenCreate = function(request, response, user) {
  try {
    const token = jwt.sign(user, privateKey, {
      expiresIn: '1d', // '60' = 60초
      subject: 'login'
    })
    response.status(200).send({
      token: token
    })
  } catch (error) {
    response.status(403).json({
      message: error.message
    })
  }
}

const tokenCheck = function (request, response, next) {
  const token = request.headers['x-jwt-token']
  if (!token) return response.status(403).json({
    message: 'You need to login first'
  })
  try {
    const decoded = jwt.verify(token, privateKey)
    request.decoded = decoded
    next()
  } catch (error) {
    if (error) return response.status(403).json({
      message: error.message
    })
  }
}

module.exports = {
  tokenCreate: tokenCreate,
  tokenCheck: tokenCheck
}
```

### 라우터에 JWT 미들웨어 적용
routers/users.js
```js
const jwtAuth = require('../middlewares/jwtAuth.js')

router.post('/login/', function(request, response) {
  // TODO: 로그인 가능한 회원인지 확인
  jwtAuth.tokenCreate(request, response, request.body);
})

router.get('/login/', jwtAuth.tokenCheck, function(request, response) {
  response.status(200).send({
    decoded: request.decoded
  })
})
```

### Access-Control-Allow-Headers에 x-jwt-token 적용 되어 있는지 확인
index.js
```js
app.use(function(request, response, next) {
  ...
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-jwt-token')
});
```

### Swagger 적용
swagger.json
```json
"securityDefinitions": {
  "jwtHeaderToken": {
    "type": "apiKey",
    "in": "header",
    "name": "x-jwt-token"
  }
},
```
"paths": {
```json
"/users/login": {
  "post": {
    "tags": [
      "users/login"
    ],
    "summary": "Login",
    "parameters": [
      {
        "in": "body",
        "name": "body",
        "required": true,
        "schema": {
          "$ref": "#/definitions/user"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Login done"
      }
    }
  },
  "get": {
    "security": [
      {
        "jwtHeaderToken": []
      }
    ],
    "tags": [
      "users/login"
    ],
    "summary": "Login check",
    "headers": [
      {
        "in": "body",
        "name": "body",
        "required": true,
        "schema": {
          "$ref": "#/definitions/user"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Login checked"
      },
      "403": {
        "description": "Login failed"
      }
    }
  }
},
```

## Frontend
### 설치
```sh
npm install axios
```

### Login
```js
import axios from 'axios';

const axiosDefaultsHeaders = function(token) {
  if (token) {
    localStorage.setItem('x-jwt-token', token);
    axios.defaults.headers.common['x-jwt-token'] = token;
  } else if (localStorage.getItem('x-jwt-token')) {
    axios.defaults.headers.common['x-jwt-token'] = localStorage.getItem('x-jwt-token');
  }
};
axiosDefaultsHeaders();

const user = {
  name: '홍길동',
  age: 20
};
axios.post('/api/v1/users/login', user).then(function(response) {
  axiosDefaultsHeaders(response.data.token);
  // TODO: 로그인 구현
  // Store의 state값 수정 (token: localStorage.getItem('x-jwt-token'))
});

axios.get('/api/v1/users/login').then(function(response) {
  console.log(response.data.decoded);
});
```

### Logout
```js
import axios from 'axios';

axios.defaults.headers.common['x-jwt-token'] = null;
localStorage.removeItem('x-jwt-token');
window.location.href = '/login';
// 또는 Store의 state값 수정 (token: null)
```

## Refresh 토큰에 대한 생각
* 토큰 2개를 발행하고 하나를 `Access용 토큰` 하나를 `Refresh용 토큰`으로 사용한다. 만료일은 `Refresh용 토큰`을 좀 더 길개 한다.
* `tokenCheck` 미들웨어에서 `Access용 토큰`을 먼저 검사하고 만료되면 `Refresh용 토큰`를 검사하고 토큰 2개를 다시 발행한다.
