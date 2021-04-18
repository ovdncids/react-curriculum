# JSON Web Token(JWT)
서버와 클라이언트 통신에서 주로 로그인에 사용되는 보안 토큰

https://www.npmjs.com/package/jsonwebtoken

## Backend
### 설치
```sh
npm install jsonwebtoken
```

### JWT 미들웨어 파일 생성
middlewares/jwtAuth.js
```js
const jwt = require('jsonwebtoken');
const privateKey = 'privateKey';
// privateKey를 바탕으로 JWT가 암호환된 토큰을 생성한다.

const tokenCreate = function(request, response, member) {
  jwt.sign(member, privateKey, {
    expiresIn: '1d',
    subject: 'signIn'
  }, function (error, token) {
    if (error) return response.status(403).json({
      message: error.message
    });
    response.status(200).send({
      token: token
    });
  });
}

const tokenCheck = function (request, response, next) {
  const token = request.headers['x-access-token'] || request.query.token;
  if (!token) return response.status(403).json({
    message: 'You need to login first'
  });
  jwt.verify(token, privateKey, function (error, decoded) {
    if (error) return response.status(403).json({
      message: error.message
    });
    request.decoded = decoded;
    next();
  });
};

module.exports = {
  tokenCreate: tokenCreate,
  tokenCheck: tokenCheck
};
```

### 라우터에 JWT 미들웨어 적용
routers/members.js
```js
const jwtAuth = require('../middlewares/jwtAuth.js');

router.post('/', function(request, response) {
  jwtAuth.tokenCreate(request, response, request.body);
});

router.get('/', jwtAuth.tokenCheck, function(request, response) {
  response.status(200).send({
    decoded: request.decoded
  });
});
```

### Access-Control-Allow-Headers에 x-access-token 적용 되어 있는지 확인
index.js
```js
app.use(function(request, response, next) {
  ...
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
});
```

## Frontend
```js
import axios from 'axios';

const axiosDefaultsHeaders = function(token) {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['x-access-token'] = token;
  } else if (localStorage.getItem('token')) {
    axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
  }
};
axiosDefaultsHeaders();

const member = {
  name: '홍길동',
  age: 20
};
axios.post('/api/v1/members', member).then(function(response) {
  axiosDefaultsHeaders(response.data.token);
});

axios.get('/api/v1/members').then(function(response) {
  console.log(response.data.decoded);
});
```

### Logout
```js
import axios from 'axios';

axios.defaults.headers.common['x-access-token'] = '';
localStorage.setItem('token', '');
window.location.href = '/login';
```
