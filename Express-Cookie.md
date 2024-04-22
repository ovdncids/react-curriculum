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
    maxAge: 60 * 60 * 24,
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
* ❕ `httpOnly: true`인 경우 `document.cookie`에 값이 사라진다.

### React
```js
axios.get('http://backend.test.com:3100', {
  withCredentials: true
});
axios.post('http://backend.test.com:3100', {}, {
  withCredentials: true
});
```

### Next.js
```js
export const getServerSideProps = async (context) => {
  await axios.get('http://backend.test.com:3100', {
    headers: {
      Cookie: 'coo=' + encodeURIComponent(context.req.cookies.coo)
    }
  })
}
```
* ❕ SSR에서는 `withCredentials: true`를 사용해도 Cookie가 전달되지 않으므로 `headers 안에 Cookie`를 넣어야 한다.
* ❕ SSR에서는 `axios` 또는 `fetch` 통신한 API에서 Cookie를 생성하면 `같은 도메인`이라도 Cookie가 생성되지 않는다.
