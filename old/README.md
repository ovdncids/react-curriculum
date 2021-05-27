
# 리액트 커리큘럼

## 목표
프론트엔드 자바스크립트 프레임웍인 리액트를 학습 하여, SPA 를 개발 하기 위함이다.

<!--
## 궁국적 목표
고객 또는 기획자의 니즈를 어느정도의 일정 소요 될지, 빠르게 예측 하기 위함이다.
-->

## 리더의 의도
리액트 세부 설정(스펙 등)을 학습 하기 보다는, 주어진 스케폴딩을 바탕으로 데이터의 흐름(CRUD) 개발에 중점을 둔다. 이는 리액트 외의 다른 개발 언어(Angular 2, Java 등)로의 이질감 없는 확장 위해서 이다.

## 개발자란?
>해당 **환경**에 따라 **데이터**를 **데이터 흐름**에 맞추어 주는 사람

* 환경: 앱(IOS, Android), 프론트엔드(Angular, React, Vue.js 또는 서버렌더링), 백엔드(ASP, PHP, Java, Node.js), DB(MS-SQL, My-SQL, Oracle, MongoDB)
* 데이터: 배열과 객체
* 데이터 흐름: CRUD

## 용어
**SPA**: (싱글 페이지 에플리케이션) 처음 호출된 html 페이지 에서 필요한 부분만 서버에 요청하는 방식으로, 앱과 유사한 방식이다. 이전 웹페이지들은 서버 사이드 렌더링이 였는데, SPA 는 클라이언트 사이드 렌더링이다.

**스케폴딩**: 개발에 필요한 구조를 미리 설계해 놓은 것을 뜻한다. cli(커멘드 라인 인터페이스) 명령 또는 git 으로 해당 구조를 다운 받는다.

**CRUD**: DB에 CREATE, READ, UPDATE, DELETE 한다는 뜻이다.
모든 데이터가 흐르는 환경에 존재 한다. (예: 로그인, 게시판, 결제 등)

## 사용 프로그램
**Visual Studio Code**: 가볍고 typescript 에 특화되어 있어 React, Angular 2 개발에 유용 하다. 가볍게 git 과 연동된다.

**Post Man**: 서버와의 통신에서 url, header, method, fromdata 값들을 손쉽게 수정 가능하다.

# 1 교시

## level test
>javascript 문제 1, 2번 JSON 문제 3, 4번을 코딩 해주세요. 주어진 시간은 5분 입니다.

1. for 문을 사용하여 console.log('react'); 10번 출력 하시요. (2점)

2. for 문을 사용하여 1 부터 10까지 더하시요. 답은 55입니다. (3점)

3. 사과, 배, 바나나 이 구조를 JSON Array 형식으로 만드시오. (2점)

4. 국어 60점, 수학 50점, 영어 70점 이 구조를 JSON Object 형식으로 만드시오. (3점)

## Redux-CLI
### 전역에 redux-cli 설치 [redux-cli](https://github.com/SpencerCDixon/redux-cli)
```sh
npm i redux-cli -g
```

### 프로젝트 생성
```sh
redux new <project name>
```

### 라이브러리 다운로드
```sh
npm install
```

### 실행
```sh
npm start
```

### 브라우저 확인
```
http://localhost:3000
```

### 구조

|경로|설명|
|---|---|
|/src/components|자주 사용하는 태그들을 묶어서 여러 곳에 사용 할 수 있다. 공용 태그라 생각하면 쉽다.|
|/src/layouts|SPA 의 layout 을 관리한다.|
|/src/routes|SPA 의 라우터를 관리한다. 예) `/, /abc, /def` 이렇게 접속 할 때 이에 해당 하는 페이지를 호출한다.|
|/src/store|횡적인 데이터의 흐름을 관리한다.|
|/src/styles|공용 style 을 관리한다.|

## 금일 목표
백그라운드 색을 넣어 보자.
레이아웃을 만들어보고 prob 과 state  의 차이를 이해 한다.

# 2 교시
응모기능 만들기

## 금일 목표
### State CRUD 만들기
### SessionStorage CRUD 만들기
### LocalStorage CRUD 만들기

## 설명
render 함수가 호출되는 시점
위의 5개의 CRUD 비교

## 참고 사항
Component 는 부모 태그가 꼭 하나여야 한다.

## 용어
**Interface**: protocal 과 비슷하게 약속이라는 의미를 같는다.

**MVC 패턴**: Model, View, Controller 를 뜻 하고, Java 서버에서 먼저 이와 같은 패턴을 쓰기 시작했다.

***MVC 의 Model***: 데이터가 문자인지, 숫자인지, 배열인지 등을 정의 한다. 클라이언트가 Typescript 로 정의 된 값들을 서버로 전달하고, 서버는 Model 로 값을 받은 후 DB 에 이 Model 을 사용하여 값을 넣는다. 이는 데이터 구조가 DB 스키마 -> 서버 Model -> 클라이언트 Typescript 로 정의 될 수 있음을 의미한다.

***MVC 의 View***: SPA 클라이언트 프래임웍(Angular, React 등등)이 나오기 전까지는 서버에서 HTML 문자열을 조립하여 랜터링 해주었다. Model 값을 View 페이지 HTML 문자열에 매핑 시킨 후 클라이언트에 보내주는 방식이다.

***MVC 의 Controller***: 비즈니스 로직을 처리 해주는 역할을 하는데, 쉽게 말하면 Model 로 클라이언트에서 값을 받아서 DB 에 넣고 결과를 어느 뷰를 통해서 보내줄지 정의 하는 것이다.

## 숙제
??

# 3 교시

## 금일 목표
### 서버 CRUD 만들기

> 일반 실행
```sh
npm install
node app.js
```

> nodemon 실행
```sh
npm install nodemon -g
nodemon app.js
```

#### nodemon 전역에 설치
```sh
npm install nodemon -g
nodemon app.js
```

#### Postman 에서 확인

***GET***
```
http://localhost:3000/subscribe
```

***POST***
```
http://localhost:3000/subscribe
Body -> raw -> JSON(application/json)
{
    "subscribe": true
}
```

### 서버 MongoDB, Postman 에서 확인

***GET***
```
http://localhost:3000/api/v1/subscribe
```

***POST***
```
http://localhost:3000/api/v1/subscribe
Body -> raw -> JSON(application/json)
{
    "subscribe": true
}
```

***DELETE***
```
http://localhost:3000/api/v1/subscribe
```

## 기술
```
debugger
```

## 숙제
??

# 4 교시
## 금일 목표
### 서버 MongoDB CRUD 만들기

> mongod 실행 후에 mongo 실행
```mongo
.\mongod.cmd
.\mongo.cmd
    // for Windows

./mongod
./mongo
    // for Mac
```

> mongo 명령어
```mongo
show dbs
    // DB 보기
use local
    // local DB 사용
show tables
    // 테이블 보기
db.테이블명.insert({id:"a"})
    // 테이블 생성 명령이 없고, 바로 해당 테이블에 값을 입력한다.
    // 컬럼명 = 대소문자를 구별하고, 데이터 마다 서로 다른 컬럼명이 사용 가능하다. (신계념)
db.테이블명.count()
    // 데이터 수를 조회한다.
db.테이블명.find({id:"a"})
    // 조건에 맞는 데이터를 조회한다.
db.테이블명.update({id:"a"}, {$set:{id:"b"}}, false, true)
    // 1번 인자 = 검색 조건
    // 2번 인자 = 수정 조건
    // 3번 인자 = true 일경우 검색 조건이 없을 경우 insert 한다. 기본(false)
    // 4번 인자 = true 일경우 해당 테이블 전체에 적용, 기본(false)
db.테이블명.remove({id:"b"})
    // 데이터 삭제
db.테이블명.drop()
    // 테이블 삭제
```

### swagger 소개

[샘플](http://petstore.swagger.io/),
[에디터](http://editor.swagger.io/#/),
[설치](https://github.com/swagger-api/swagger-node)

### typescript 적용 하기

> 이점

1. BE 서버의 모델 타입과 1대 1로 대응 된다. API 연동 시 해당 하는 타입으로 요청하고, 해당 하는 타입으로 응답 받는다.
2. 해당 모델에 대해서 타이핑 오류가 발생 하지 않는다.

```
obj['abc']  // 타입 스크립트 전에 형식 obj['adc'] 이런식으 타입핑 오류 가능성이 존재한다.
obj.abc     // 해당 타입이 있는지 없는지 IDE 에서 확인 해준다.
```

> 단점

1. 생각지도 않은 타입 오류를 많이 만나게 된다.

> 나아가야 할 방향

1. any 타입은 최소한 방관 하고, API 연동 시 만은 꼭 타입스크립트를 사용한다.

[Typescript 강좌](https://www.youtube.com/playlist?list=PLV6pYUAZ-ZoEBNDzOxzToMqv-V1QGlU0T),
[React 강좌](https://www.youtube.com/watch?v=PFBRhxjIBUM&index=1&list=PLV6pYUAZ-ZoHx0OjUduzaFSZ4_cUqXLm0) by 이웅재

### React CRA(create-react-app) 설치
```sh
npx create-react-app start-project-cra --template typescript
```

### Router 설치
```sh
npm install react-router-dom --save
npm install @types/react-router-dom --save

yarn add react-router-dom
yarn add @types/react-router-dom
```

[설정 방법](https://reacttraining.com/react-router/web/example/basic)

### TSLint 설정
```json
"no-any": false
"no-console": ["log"] // 삭제
```

### tsconfig 설정
```json
"noImplicitAny": false
```

## 숙제
??

# 5 교시
## 금일 목표

### Router 만들기

> Admin 페이지

> 404 페이지

### 회원 이름과 나이 CRUD 만들기

> Postman CRUD 만들기

> 회원 만들기

## 숙제
??

# 6 교시
## 금일 목표

### 회원 이름과 나이 CRUD 만들기

> 회원 리스트 만들기

> 회원 삭제 만들기

1. DELETE 메소드 사용시 POST, PUT 과 다른점

> 회원 수정 만들기

### 국제화(i18n) 버튼 만들기

[소개 페이지](https://www.i18next.com/)
```sh
npm install --save i18next
yarn add i18next
```

### MobX 를 이용한 국제화(i18n) 버튼 만들기

[소개 페이지](https://mobx.js.org/index.html),
[예제 페이지](https://github.com/zalmoxisus/mobx-remotedev)
```sh
npm install --save mobx
npm install --save mobx-react
npm install --save mobx-remotedev

yarn add mobx
yarn add mobx-react
yarn add mobx-remotedev
```

## 숙제
??

## 리더 연락처
최세민: 010-2524-9707
