# Express

## 서로 다른 도메인 간에 Cookie 공유
* https://cotak.tistory.com/87

/etc/hosts
```sh
127.0.0.1    backend.test.com
127.0.0.1    frontend.test.com
```

### Express
```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3100;

app.use(cookieParser());

app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', 'http://frontend.test.com:3000');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', function(request, response) {
  response.send(request.cookies);
});

app.post('/', function(request, response) {
  response.cookie('coo', 'kie', {
    httpOnly: true,
    maxAge: 1000000,
    signed: false,
    domain: 'test.com'
  });
  response.send('Set cookite');
})

app.options('/', function(request, response)) {
  // 클라이언트 사이드 렌더링일 경우 OPTIONS 메소드는 쿠키를 받을 수 없다.
  response.send(request.cookies);
}

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
});
```

### React
```js
axios.get('http://backend.test.com:3100', {
  withCredentials: true
});
axios.post('http://backend.test.com:3100', {
  withCredentials: true
});
```
