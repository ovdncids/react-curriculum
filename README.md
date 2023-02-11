# React
[데모](https://curriculums-min.web.app)

<!-- ## 용어
**Markup**: 디자인을 HTML, CSS로 변환 하는 과정 또는 HTML 파일을 뜻함. HTML, CSS로 변환 된다. 퍼블리싱이라고도 함.

**Markdown**: 주로 README.md 파일로 많이 쓰이고, 현재 이 문서도 Markdown으로 만들어짐. 화려한 레이아웃 업이 Text로 정보 전달 할때 많이 사용한다. -->

## Node.js
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
소스 관리를 위해 사용한다. 어느 파일이 언제 어떻게 변경 되었는지 쉽게 볼 수 있다.

**GIT 설치**

**VSCode 확장 Git Graph 설치**

<!-- ## 현재 문서 Git clone 하기

git clone https://github.com/ovdncids/react-curriculum.git

## Git .gitignore
```sh
# npm or yarn
package-lock.json
yarn.lock

# .idea
.idea
```

**lock 파일**: 가끔 이 파일 때문에 클라이언트와 서버 사이에 버전이 안 맞아서 오류가 발생한다.
용량도 크고 npm install 할때 마다 생성되는 파일이니 .gitignore 목록에 넣는다.

**package-lock.json, yarn.lock 파일 삭제**

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

## React Component 만들기
Header, Nav, Footer 이렇게 Component 별로 파일을 나눈다.

src/App.js
```js
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
```

src/components/Header.js
```js
function Header(props) {
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

## React Router DOM
https://reacttraining.com/react-router

### 설치
```sh
npm install react-router-dom
```

### Router 만들기
src/App.js
```js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Users from './components/contents/Users.js';
import Search from './components/contents/Search.js';
```
```diff
- <div>
-   <h3>Users</h3>
-   <p>Contents</p>
- </div>
```
```js
<BrowserRouter>
  <Routes>
    <Route path="/users" element={<Users />} />
    <Route path="/search" element={<Search />} />
    <Route path="*" element={<Navigate replace to="/users" />} />
  </Routes>
</BrowserRouter>
```
<!--
<Route exact={true} path="/users" render={props => <Users {...props} testProps={true} />} />
render는 render={Users} 이렇게 사용할 수 없다.
-->

src/components/contents/Users.js
```js
function Users(props) {
  console.log(props);
  return (
    <div>
      <h3>Users</h3>
      <p>Contents</p>
    </div>
  );
}

export default Users;
```

src/components/contents/Search.js (동일)

**주소 창에서 router 바꾸어 보기**

src/components/Nav.js
```js
import { NavLink } from 'react-router-dom';

<li><h2><NavLink to="users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink></h2></li>
<li><h2><NavLink to="search" className={({ isActive }) => isActive ? 'active' : ''}>Search</NavLink></h2></li>
```
**You should not use `<Link>` outside a `<Router>` 설명**

<!-- history.push 자식으로 넘기기
```js
<A1 {...props}></A1>

function A1(props) {
  return (
    <button onClick={() => {props.history.push('/b')}}>
      A1
    </button>
  );
}
``` -->

<!-- **BrowserRouter와 HashRouter 차이점**: BrowserRouter 사용 할 경우 IE9 이전 브라우저에서 오류가 발생 해서 HashRouter를 써야함 -->

**React.StrictMode 설명**

**여기 까지가 Markup 개발자 분들이 할일 입니다.**

## Users Store 만들기

**Store 개념 설명**

Component가 사용하는 글로벌 함수 또는 변수라고 생각하면 쉽다, state 값이 변하면 해당 값을 바라 보는 모든 Component가 수정 된다.

**Store 사용 하는 이유**

Component에 변경된 사항을 다시 그리기 위해서 Store를 사용 한다.

## Zustand 설치
https://github.com/pmndrs/zustand
```sh
npm install zustand
```

## Users Store 생성
src/stores/UsersStore.js
```js
import { create } from 'zustand';

const UsersStore = create((set) => ({
  users: [],
  user: {
    name: '',
    age: ''
  }
}));

export default UsersStore;
```

## Users Component Zustand Store 주입
src/components/contents/Users.js
```js
import UsersStore from '../../stores/UsersStore.js';

function Users() {
  const usersStore = UsersStore((state) => state);
  const user = usersStore.user;
  const users = usersStore.users;
  console.log(user, users);
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

## Users Store CRUD
### Create
src/stores/UsersStore.js
```js
userSet: (user) => {
  set(() => ({ user }));
},
usersCreate: (user) => {
  set((state) => {
    state.users.push({
      ...user
    });
    return {
      users: state.users
    };
  });
}
```
* `전개 구조` 설명 하기

### Zustand 특징
* `useState`와 다르게 동일한 객체를 `set` 해도 랜더링 가능
* `redux`와 다르게 `state`가 readonly 아님, 하지만 렌더링은 무조건 `set` 사용

src/components/contents/Users.js
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={event => {
    user.name = event.target.value;
    usersStore.userSet(user);
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={event => {
    user.age = event.target.value;
    usersStore.userSet(user);
  }}
/>
<button onClick={() => {
  usersStore.usersCreate(user);
}}>Create</button>
```

### Read
src/stores/UsersStore.js
```js
usersRead: () => {
  set((state) => {
    state.users.push({
      name: '홍길동',
      age: 20
    }, {
      name: '춘향이',
      age: 16
    });
    return {
      users: state.users
    };
  });
}
```

src/components/contents/Users.js
```js
import { useEffect } from 'react';

const userSet = usersStore.userSet;
const usersRead = usersStore.usersRead;
useEffect(() => {
  userSet({
    name: '',
    age: ''
  });
  usersRead();
}, [userSet, usersRead]);
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
{users.map((user, index) => (
  <tr key={index}>
    <td>{user.name}</td>
    <td>{user.age}</td>
    <td>
      <button>Update</button>
      <button>Delete</button>
    </td>
  </tr>
))}
```

### Delete
src/stores/UsersStore.js
```js
usersDelete: (index) => {
  set((state) => {
    state.users.splice(index, 1);
    return {
      users: state.users
    };
  });
}
```

src/components/contents/Users.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  usersStore.usersDelete(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

### Update
src/stores/UsersStore.js
```js
usersSet: (users) => {
  set(() => ({ users }));
},
usersUpdate: (index, user) => {
  set((state) => {
    state.users[index] = user;
    return {
      users: state.users
    };
  });
}
```

src/components/contents/Users.js
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={event => {
      user.name = event.target.value;
      usersStore.usersSet(users);
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={event => {
      user.age = event.target.value;
      usersStore.usersSet(users);
    }}
  />
</td>
```
* `Input box` 수정 해보기

```diff
- <button>Update</button>
<button onClick={() => {
  usersStore.usersUpdate(index, user);
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

### Axios common 에러 처리
src/stores/common.js
```js
export const axiosError = (error) => {
  console.error(error.response || error.message || error);
};
```

### Read
src/stores/UsersStore.js
```js
import axios from 'axios';
import { axiosError } from './common.js';
```
```diff
- usersRead: () => {
```
```js
usersRead: async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/v1/users');
    console.log('Done usersRead', response);
    set({ users: response.data.users });
  } catch(error) {
    axiosError(error);
  }
},
```

### Create
src/stores/UsersStore.js
```diff
- const UsersStore = create((set) => ({
const UsersStore = create((set, get) => ({
```
```diff
- usersCreate: (user) => {
```
```js
usersCreate: async (user) => {
  try {
    const response = await axios.post('http://localhost:3100/api/v1/users', user);
    console.log('Done usersCreate', response);
    get().usersRead();
  } catch(error) {
    axiosError(error);
  }
},
```

### Delete
src/stores/UsersStore.js
```diff
- usersDelete: (index) => {
```
```js
usersDelete: async (index) => {
  try {
    const response = await axios.delete('http://localhost:3100/api/v1/users/' + index);
    console.log('Done usersDelete', response);
    get().usersRead();
  } catch(error) {
    axiosError(error);
  }
},
```

### Update
src/stores/UsersStore.js
```diff
- usersUpdate: async (index, user) => {
```
```js
usersUpdate: async (index, user) => {
  try {
    const response = await axios.patch('http://localhost:3100/api/v1/users/' + index, user);
    console.log('Done usersUpdate', response);
    get().usersRead();
  } catch(error) {
    axiosError(error);
  }
}
```

## Search Store 만들기
src/stores/SearchStore.js
```js
import { create } from 'zustand';
import UsersStore from './UsersStore.js';
import axios from 'axios';
import { axiosError } from './common.js';

const SearchStore = create(() => ({
  searchRead: async (q) => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/search?q=' + q);
      console.log('Done searchRead', response);
      UsersStore.setState({ users: response.data.users });
    } catch(error) {
      axiosError(error);
    }
  }
}));

export default SearchStore;
```

### Search Component Zustand Store 주입
src/components/contents/Search.js
```js
import { useEffect } from 'react';
import UsersStore from '../../stores/UsersStore.js';
import SearchStore from '../../stores/SearchStore.js';

function Search() {
  const users = UsersStore((state) => state).users;
  const searchStore = SearchStore((state) => state);
  console.log(users);
  useEffect(() => {
    searchStore.searchRead('');
  }, [searchStore]);
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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
```

## Search Component에서만 사용 가능한 state값 적용
src/components/contents/Search.js
```diff
- import { useEffect } from 'react';
+ import { useState, useEffect } from 'react';
```
```js
const [ q, setQ ] = useState('');
const searchRead = (event) => {
  event.preventDefault();
  searchStore.searchRead(q);
};
```
```diff
- <form>
-   <input type="text" placeholder="Search" />
-   <button>Search</button>
- </form>
```
```js
<form onSubmit={(event) => {searchRead(event)}}>
  <input
    type="text" placeholder="Search"
    value={q}
    onChange={event => {setQ(event.target.value)}}
  />
  <button>Search</button>
</form>
```

## Search Component 쿼리스트링 변경
src/components/contents/Search.js
```diff
- function Search(props) {
```
```js
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const _q = searchParams.get('q') || '';
  console.log(_q);
```
```diff
- searchStore.searchRead(q);
+ navigate('/search?q=' + q);
```
`검색`, `뒤로가기` 해보기

## Search Component 새로고침 적용
```diff
- useEffect(() => {
-   searchStore.searchRead('');
- }, [searchStore]);
```
```js
useEffect(() => {
  searchStore.searchRead(_q);
  setQ(_q);
}, [searchStore, _q]);
```
* ❔ `새로고침`하면 렌더링이 3번 되고 있다. 랜더링이 2번 되게 하려면 (한줄 수정)
* <details><summary>정답</summary>

  ```diff
  - const [ q, setQ ] = useState('');
  + const [ q, setQ ] = useState(_q);
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

<!-- ## Express에 build된 파일 넣기
package.json
```json
"build": "react-scripts build && rm -fr ../express/public && mv build ../express/public",
``` -->

<!-- ## React for IE11
```sh
npm install react-app-polyfill
```

package.json
```diff
"browserslist": {
  "development": [
+   "ie 11",
```

src/index.js
```js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
``` -->

# 수고 하셨습니다.

<!--
예전 라이프 사이클(Life cycle)
https://coding-hyeok.tistory.com/5
-->
