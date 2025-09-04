# React (19.1.1)
[데모](https://curriculums-min.web.app)

<!-- ## 용어
**Markup**: 디자인을 HTML, CSS로 변환 하는 과정 또는 HTML 파일을 뜻함. HTML, CSS로 변환 된다. 퍼블리싱이라고도 함.

**Markdown**: 주로 README.md 파일로 많이 쓰이고, 현재 이 문서도 Markdown으로 만들어짐. 화려한 레이아웃 업이 Text로 정보 전달 할때 많이 사용한다. -->

## Node.js (20.19.4)
https://nodejs.org

## NVM (Node Version Manager)
https://github.com/ovdncids/react-curriculum/blob/master/NVM.md

<!-- ## Visual Studio Code
**Tab 스페이스 2칸으로 설정**: Preferences > 검색 > editor.detectIndent

https://stackoverflow.com/questions/29972396/how-to-set-tab-space-style

기본 텝 사이즈를 2칸으로 변경한다.
```json
"editor.tabSize": 2
```

해당 파일의 텝 사이즈를 무시하고 기본 텝 사이즈로 설정한다.
```json
"editor.detectIndentation": false
``` -->

## Create React App 설치
https://github.com/facebook/create-react-app
```sh
# React의 스케폴딩을 쉽게 만들고 작업 후 쉽게 빌드 할 수 있다.
# npx는 npm v.5.2 이후 부터 npm과 같이 설치 된다.
# npm install -g create-react-app
# create-react-app react-study
npx create-react-app react-study
# Typescript
npx create-react-app react-study-typescript --template typescript
cd react-study
code .

# VSCode로 해당 디렉토리 열기
npm run build
npm install -g serve
serve -s build

## 프로젝트 실행
npm start
```

<!-- # redux 사용
npx create-react-app my-app --template redux -->

## GIT
소스 관리를 위해 사용한다. 어느 파일이 언제 어떻게 변경되었는지 쉽게 볼 수 있다.

**GIT 설치**

**VSCode 확장 Git Graph 설치**

<!-- ## 현재 문서 Git clone 하기

git clone https://github.com/ovdncids/react-curriculum.git

## Git .gitignore
```sh
# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

**Git push**
```sh
git push
```

**commit 이름 수정**
```sh
git commit --amend -m ""
```

**commit 취소**
```sh
git reset HEAD~
``` -->

<!-- **첫 commit 취소**
```sh
git update-ref -d HEAD
``` -->

<!-- **이전 commit과 합치기**
```sh
git rebase -i HEAD~2
# 2번째 줄 pick을 fixup으로 바꾸고 저장
``` -->

<!-- **이전으로 돌아가 수정**
```sh
# 첫 commit 수정
git rebase -i --root $tip
# 이후 commit 수정
git rebase -i HEAD~2
  pick -> edit 수정
원하는 파일 수정
git add .
git rebase --continue
``` -->

## Sass 설치
css를 프로그램화 하여 색상 테마를 변수에 넣을 수 있고, 반복 부분을 저장하고 불러 올 수 있다. 이름은 Sass지만 파일명은 scss이다.

https://sass-guidelin.es/ko
```sh
npm install -D sass sass-loader
```

## 필요 없는 파일 지우기
```diff
- src/App.css
- src/App.test.js
- src/index.css
- src/logo.svg
```

## Markup
src/App.js
```diff
- import logo from './logo.svg';
- import './App.css';
```
```js
<div>
  <header>
    <h1>React study</h1>
  </header>
  <hr />
  <div className="container">
    <nav className="nav">
      <ul>
        <li><h2>Users</h2></li>
        <li><h2>Search</h2></li>
      </ul>
    </nav>
    <hr />
    <section className="contents">
      <div>
        <h3>Users</h3>
        <p>Contents</p>
      </div>
    </section>
    <hr />
  </div>
  <footer>Copyright</footer>
</div>
```

src/index.scss
```scss
* {
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
a:link, a:visited {
  text-decoration: none;
  color: black;
}
a.active {
  color: white;
}
h1, footer, .nav ul {
  padding: 0.5rem;
}
h4, li {
  margin: 0.5rem 0;
}
hr {
  display: none;
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid #ccc;
}
input[type=text] {
  width: 120px;
}

.d-block {
  display: block;
}
.container {
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.nav {
  min-height: 300px;
  background-color: #4285F4;
}
.nav ul {
  list-style: none;
}
.contents {
  flex: 1;
  padding: 1rem;
}

.table-search {
  border: 1px solid rgb(118, 118, 118);
  border-collapse: collapse;
  text-align: center;
}
.table-search th, .table-search td {
  padding: 0.2rem;
}
.table-search td {
  border-top: 1px solid rgb(118, 118, 118);
  min-width: 100px;
}
```

src/index.js
```diff
- import './index.css';
+ import './index.scss';
```

<!-- ## CSS Flex
https://opentutorials.org/course/2418/13526

https://www.youtube.com/watch?v=eprXmC_j9A4

**현재 브라우저 상황**: YouTube IE11 부터 지원. IE11 부터 Flex 사용 가능. -->

## React Layout Component 만들기
Header, Nav, Footer 이렇게 Component 별로 파일을 나눈다.

src/App.js
```js
import Header from './components/layout/Header.js';
import Nav from './components/layout/Nav.js';
import Footer from './components/layout/Footer.js';
```

src/components/layout/Header.js
```js
function Header(props) {
  console.log(props);
  return (
    <header>
      <h1>React study</h1>
    </header>
  );
}

export default Header;
```

src/App.js
```diff
- <header>
-  <h1>React study</h1>
- </header>
+ <Header></Header>

- <nav className="nav">
-   <ul>
-     <li><h2>Users</h2></li>
-     <li><h2>Search</h2></li>
-   </ul>
- </nav>
+ <Nav></Nav>

- <footer>Copyright</footer>
+ <Footer></Footer>
```
* `props`: 설명, `Properties`의 줄임말

## React Router DOM (7.8.2)
https://reacttraining.com/react-router

### 설치
```sh
npm install react-router-dom
```

### Router 만들기
src/index.js
```js
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Users from './pages/Users.js';
import Search from './pages/Search.js';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/users', element: <Users /> },
        { path: '/search', element: <Search /> },
        {
          index: true,
          element: <Navigate replace to="/users" />
        }
      ]
    }
  ]
);
```
```diff
- <App />
+ <RouterProvider router={router} />
```

src/App.js
```js
import { Outlet } from 'react-router-dom';
```
```diff
- <div>
-   <h3>Users</h3>
-   <p>Contents</p>
- </div>
+ <Outlet />
```

src/pages/Users.js
```js
function Users() {
  return (
    <div>
      <h3>Users</h3>
      <p>Contents</p>
    </div>
  );
}

export default Users;
```

src/pages/Search.js (동일)

**주소 창에서 router 바꾸어 보기**

src/components/layout/Nav.js
```js
import { NavLink } from 'react-router-dom';

<li><h2><NavLink to="users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink></h2></li>
<li><h2><NavLink to="search" className={({ isActive }) => isActive ? 'active' : ''}>Search</NavLink></h2></li>
```

**React.StrictMode 설명**

**여기 까지가 Markup 개발자 분들이 할일 입니다.**

## Users Store 만들기

**Store 개념 설명**

Component가 사용하는 글로벌 함수 또는 변수라고 생각하면 쉽다, state 값이 변하면 해당 값을 바라 보는 모든 Component가 수정 된다.

**Store 사용 하는 이유**

Component에 변경된 사항을 다시 그리기 위해서 Store를 사용 한다.

## Signals 설치 (3.3.0)
* https://github.com/preactjs/signals
```sh
npm install @preact/signals-react
```

## Users Store 생성
src/stores/usersStore.js
```js
import { signal } from '@preact/signals-react';

export const usersState = {
  users: signal([]),
  user: signal({
    name: '',
    age: ''
  })
};
```
* <details><summary>TS: (state: UsersStore)</summary>

  ```ts
  interface User {
    name: string
    age: string | number
  }
  
  export const usersState = {
    users: signal<User[]>([]),
    user: signal<User>({
      name: '',
      age: ''
    })
  };
  ```
</details>

## Users Component Signals Store 주입
src/pages/Users.js
```js
import { usersState } from '../stores/usersStore.js';

function Users() {
  console.log('Users', usersState.users.value, usersState.user.value);
  return (
    <div>
      <h3>Users</h3>
      <hr className="d-block" />
      <div>
        <h4>Read</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>20</td>
              <td>
                <button>Update</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="d-block" />
      <div>
        <h4>Create</h4>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Age" />
        <button>Create</button>
      </div>
    </div>
  );
}

export default Users;
```

### 상대 경로 절대 경로로 수정하기
jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```
* TS: tsconfig.json

```diff
- import { usersState } from '../stores/usersStore.js';
+ import { usersState } from 'stores/usersStore.js';
```
* `npm start` 재시작

## Users Store CRUD
### Create
src/stores/usersStore.js
```js
export const usersActions = {
  usersCreate: (user) => {
    const users = [...usersState.users.value];
    users.push({...user.value});
    usersState.users.value = users;
    console.log(usersState.users.value);
  }
};
```
* <details><summary>TS: usersCreate: (user) => {</summary>

  ```ts
  usersCreate: (user: Signal<User>) => {
  ```
</details>

src/pages/Users.js
```js
import { useComputed } from '@preact/signals-react';
```
```diff
- import { usersState } from 'stores/usersStore.js';
+ import { usersState, usersActions } from 'stores/usersStore.js';
```
```js
{useComputed(() => {
  console.log('Create.name', usersState.user.value.name);
  return (
    <input
      type="text" placeholder="Name" value={usersState.user.value.name}
      onChange={(event) => {
        usersState.user.value = {
          ...usersState.user.value,
          name: event.target.value
        }
      }}
    />
  );
})}
{useComputed(() => {
  console.log('Create.age', usersState.user.value.age);
  return (
    <input
      type="text" placeholder="Age" value={usersState.user.value.age}
      onChange={(event) => {
        usersState.user.value = {
          ...usersState.user.value,
          age: event.target.value
        }
      }}
    />
  );
})}
<button onClick={() => {
  usersActions.usersCreate(usersState.user);
}}>Create</button>
```
* `전개 구조` 설명 하기

### Read
src/stores/usersStore.js
```js
usersRead: () => {
  usersState.users.value = [
    {
      name: '홍길동',
      age: 20
    }, {
      name: '춘향이',
      age: 16
    }
  ];
}
```

src/pages/Users.js
```js
import { useEffect } from 'react';

useEffect(() => {
  usersActions.usersRead();
}, []);
```

```diff
- <tr>
-   <td>홍길동</td>
-   <td>20</td>
-   <td>
-     <button>Update</button>
-     <button>Delete</button>
-   </td>
- </tr>
```
```js
{useComputed(() => {
  console.log('Read', usersState.users.value);
  return usersState.users.value.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>
        <button>Update</button>
        <button>Delete</button>
      </td>
    </tr>
  ));
})}
```
* [Signals 특징](https://github.com/ovdncids/react-curriculum/blob/master/Signals.md)

### Delete
src/stores/usersStore.js
```js
usersDelete: (index) => {
  const users = [...usersState.users.value];
  users.splice(index, 1);
  usersState.users.value = users;
}
```

src/pages/Users.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  usersActions.usersDelete(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

### Update
src/stores/usersStore.js
```js
usersUpdate: (index, user) => {
  const users = [...usersState.users.value];
  users[index] = user;
  usersState.users.value = users;
}
```

src/pages/Users.js
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={(event) => {
      const users = [...usersState.users.value];
      users[index].name = event.target.value;
      usersState.users.value = users;
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      const users = [...usersState.users.value];
      users[index].age = event.target.value;
      usersState.users.value = users;
    }}
  />
</td>
```
* `Input box` 수정 해보기

```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  usersActions.usersUpdate(index, user);
}}>Update</button>
```

## Backend Server
* [Download](https://github.com/ovdncids/vue-curriculum/raw/master/download/express-server.zip)
```sh
# BE 서버 실행 방법
npm install
node index.js
# 터미널 종료
Ctrl + c
```

## Axios 서버 연동
https://github.com/axios/axios
```sh
npm install axios
```

### Read
src/stores/usersStore.js
```js
import axios from 'axios';
```
```diff
- usersRead: () => {
```
```js
usersRead: async () => {
  const response = await axios.get('http://localhost:3100/api/v1/users');
  console.log('Done usersRead', response);
  usersState.users.value = response.data.users;
},
```

### Create
src/stores/usersStore.js
```diff
- usersCreate: (user) => {
```
```js
usersCreate: async (user) => {
  const response = await axios.post('http://localhost:3100/api/v1/users', user.value);
  console.log('Done usersCreate', response);
  usersActions.usersRead();
},
```

### Delete
src/stores/usersStore.js
```diff
- usersDelete: (index) => {
```
```js
usersDelete: async (index) => {
  const response = await axios.delete('http://localhost:3100/api/v1/users/' + index);
  console.log('Done usersDelete', response);
  usersActions.usersRead();
},
```

### Update
src/stores/usersStore.js
```diff
- usersUpdate: async (index, user) => {
```
```js
usersUpdate: async (index, user) => {
  const response = await axios.patch('http://localhost:3100/api/v1/users/' + index, user);
  console.log('Done usersUpdate', response);
  usersActions.usersRead();
}
```

## Search Store 만들기
src/stores/searchStore.js
```js
import axios from 'axios';
import { usersState } from './usersStore.js';

export const searchActions = {
  searchRead: async (q) => {
    const response = await axios.get('http://localhost:3100/api/v1/search?q=' + q);
    console.log('Done searchRead', response);
    usersState.users.value = response.data.users;
  }
};
```

### Search Component Signals Store 주입
src/pages/Search.js
```js
import { signal, effect, useComputed } from '@preact/signals-react';
import { usersState } from 'stores/usersStore.js';
import { searchActions } from 'stores/searchStore.js';

const q = signal('');
effect(() => {
  searchActions.searchRead(q.value);
});

function Search() {
  console.log('Search', q.value, usersState.users.value);
  return (
    <div>
      <h3>Search</h3>
      <hr className="d-block" />
      <div>
        <form>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </form>
      </div>
      <hr className="d-block" />
      <div>
        <table className="table-search">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {useComputed(() => {
              console.log('Search.users', usersState.users.value);
              return usersState.users.value.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
```

## SearchBar Component에서만 사용 가능한 state값 적용
src/pages/Search.js
```js
function SearchBar(props) {
  const q = signal('');
  console.log('SearchBar', q.value);
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        props.q.value = q.value;
      }}>
        <input
          type="text" placeholder="Search"
          value={q}
          onChange={event => {q.value = event.target.value}}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
```
```diff
- <div>
-   <form>
-     <input type="text" placeholder="Search" />
-     <button>Search</button>
-   </form>
- </div>
+ <SearchBar q={q} />
```
* <details><summary>TS: Type 'Signal<string>' is not assignable to type 'string | number | readonly string[] | undefined'.</summary>

  ```diff
  - value={q}
  + value={q as unknown as string}
  ```
</details>
* `signal`과 `useState` 비교하기

## Search Component 쿼리스트링 변경
src/pages/Search.js
```js
import { useNavigate } from 'react-router-dom';
```
```diff
- const q = signal('');
```
```js
const navigate = useNavigate();
const q = signal(props.q.value);
```
```diff
- props.q.value = q.value;
+ navigate('/search?q=' + q.value);
```
* `검색`, `뒤로가기` 해보기

## Search Component 새로고침 적용
src/pages/Search.js
```diff
- import { useNavigate } from 'react-router-dom';
+ import { useNavigate, useLocation } from 'react-router-dom';
```
```diff
- console.log('Search', q.value, usersState.users.value);
```
```js
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
q.value = searchParams.get('q') || '';
console.log('Search', q.value, usersState.users.value);
```
* `새로고침`, `검색`, `뒤로가기` 해보기
* ❔ `새로고침`하면 API 호출이 2번 되고 있다. API 호출이 1번만 되게 하려면 (`const q = signal('');`와 `effect 안`의 함수 수정)
* <details><summary>정답</summary>

  ```diff
  - const q = signal('');
  + const q = signal(null);
  ```
  ```js
  effect(() => {
    if (q.value === null) return;
    searchActions.searchRead(q.value);
  });
  ```

</details>

## Proxy 설정
package.json
```json
"proxy": "http://localhost:3100"
```

모든 파일 수정
```diff
- http://localhost:3100/api
+ /api
```

당황 하지 말고 다시 실행
```sh
npm start
```

# 수고 하셨습니다.
