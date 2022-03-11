# React
* [데모](https://ovdncids.github.io/react-curriculum/demo)

<!-- ## 용어
**Markup**: 디자인을 HTML, CSS로 변환 하는 과정 또는 HTML 파일을 뜻함. HTML, CSS로 변환 된다. 퍼블리싱이라고도 함.

**Markdown**: 주로 README.md 파일로 많이 쓰이고, 현재 이 문서도 Markdown으로 만들어짐. 화려한 레이아웃 업이 Text로 정보 전달 할때 많이 사용한다. -->

## Node.js
https://nodejs.org

## NVM (Node Version Manager)
Node.js 버전을 관리하는 프로그램, 어느 버전이든 설치, 변경, 삭제 가능하다.

<!-- **Mac OS Node 삭제 방법**: https://gomugom.github.io/how-to-remove-node-from-macos/ -->

<!-- **VSCode에서 터미널 호출시 버전을 못 찾을 때**: https://github.com/Microsoft/vscode-docs/blob/master/docs/editor/integrated-terminal.md#why-is-nvm-complaining-about-a-prefix-option-when-the-integrated-terminal-is-launched
```sh
# nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
# Run `npm config delete prefix` or `nvm use --delete-prefix v8.12.0 --silent` to unset it.
## nvm 설치 전에 npm이 설치되어서 문제가 발생 한다.
ls -la /usr/local/bin | grep npm
rm -R /usr/local/bin/npm /usr/local/lib/node_modules/npm/bin/npm-cli.js
``` -->

<!-- **nvm 삭제 방법**:
```sh
rm -rf ~/.nvm
rm -rf ~/.npm
rm -rf ~/.bower
``` -->

<details><summary>Mac OS</summary>
https://github.com/nvm-sh/nvm

https://gist.github.com/falsy/8aa42ae311a9adb50e2ca7d8702c9af1
```sh
# 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# vi 에디터 실행
vi ~/.bash_profile

# 해당 경로 적용 시키키
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# ~/.bash_profile 재 실행 시키기
source ~/.bash_profile
```
</details>

Windows

https://github.com/coreybutler/nvm-windows/releases

```sh
# 설치 된 node.js 리스트를 본다.
nvm ls

# 해당 버전을 설치 한다.
nvm install 14.15.5

# 해당 버전을 삭제 한다.
nvm uninstall 14.15.5

# 해당 버전을 사용 한다.
nvm use 14.15.5

# 기본 버전 변경 한다.
nvm alias default 14.15.5
```

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
npm install sass sass-loader
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
        <li><h2>Members</h2></li>
        <li><h2>Search</h2></li>
      </ul>
    </nav>
    <hr />
    <section className="contents">
      <div>
        <h3>Members</h3>
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
  )
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
-     <li><h2>Members</h2></li>
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
import Members from './components/contents/Members.js';
import Search from './components/contents/Search.js';
```
```diff
- <div>
-   <h3>Members</h3>
-   <p>Contents</p>
- </div>
```
```js
<BrowserRouter>
  <Routes>
    <Route path="/members" element={<Members />} />
    <Route path="/search" element={<Search />} />
    <Route path="*" element={<Navigate replace to="/members" />} />
  </Routes>
</BrowserRouter>
```
<!--
<Route exact={true} path="/members" render={props => <Members {...props} testProps={true} />} />
render는 render={Members} 이렇게 사용할 수 없다.
-->

src/components/contents/Members.js
```js
function Members(props) {
  console.log(props);
  return (
    <div>
      <h3>Members</h3>
      <p>Contents</p>
    </div>
  )
}

export default Members;
```

src/components/contents/Search.js (동일)

**주소 창에서 router 바꾸어 보기**

src/components/Nav.js
```js
import { NavLink } from 'react-router-dom';

<li><h2><NavLink to="members" className={({ isActive }) => isActive ? 'active' : ''}>Members</NavLink></h2></li>
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

**여기 까지가 Markup 개발자 분들이 할일 입니다.**

## Members Store 만들기

**Store 개념 설명**

Component가 사용하는 글로벌 함수 또는 변수라고 생각하면 쉽다, state 값이 변하면 해당 값을 바라 보는 모든 Component가 수정 된다.

### MobX 설치
https://github.com/mobxjs/mobx
```sh
npm install mobx mobx-react
```

src/stores/MembersStore.js
```js
import { configure, makeAutoObservable } from 'mobx';

configure({
  // enforceActions: 'never',
  // useProxies: 'never'
});

export default class MembersStore {
  constructor() {
    makeAutoObservable(this);
  }

  members = [];
  member = {
    name: '',
    age: ''
  };

  membersCreate() {
    this.members.push({
      name: this.member.name,
      age: this.member.age
    });
    console.log('Done membersCreate', this.members);
  }
}

export const membersStore = new MembersStore();
```

<!-- ## VSCode experimentalDecorators 에러 발생시
tsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "allowJs": true
  }
}
``` -->

**Members Store 등록**

src/index.js
```js
import { Provider } from 'mobx-react';
import { membersStore } from './stores/MembersStore.js';
```
```diff
- <App />
```
```js
<Provider
  membersStore={membersStore}
>
  <App />
</Provider>
```

## Members Compenent Store inject
src/components/contents/Members.js
```js
import { inject, observer } from 'mobx-react';

function Members(props) {
  const { membersStore } = props;
  const { member } = membersStore;
  return (
    <div>
      <h3>Members</h3>
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
        <input
          type="text" placeholder="Name" value={member.name}
          onChange={event => {member.name = event.target.value}}
        />
        <input
          type="text" placeholder="Age" value={member.age}
          onChange={event => {member.age = event.target.value}}
        />
        <button onClick={() => membersStore.membersCreate()}>Create</button>
      </div>
    </div>
  )
}

export default inject('membersStore')(observer(Members));
```

**enforceActions 설명**

**useProxies 설명**

src/stores/MembersStore.js (enforceActions 주석 풀기)
```js
enforceActions: 'never'
```

**render에 대한 설명**

**debugger 설명**
```js
debugger;
```
**Unexpected 'debugger' statement 발생할 경우**

package.json
```json
"eslintConfig": {
  "rules": {
    "no-debugger": 1
  }
}
// 0 = off, 1 = warn, 2 = error
```
**또는**
```js
debugger; // eslint-disable-line no-debugger
```

## Members Store CRUD
### Read
src/stores/MembersStore.js
```js
membersRead() {
  this.members = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }];
  console.log('Done membersRead', this.members);
}
```

src/components/contents/Members.js
```js
import { useEffect } from 'react';
```
```diff
- const { member } = membersStore;
```
```js
const { members, member } = membersStore;
useEffect(() => {
  membersStore.membersRead();
}, [membersStore]);
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
{members.map((member, index) => (
  <tr key={index}>
    <td>{member.name}</td>
    <td>{member.age}</td>
    <td>
      <button>Update</button>
      <button>Delete</button>
    </td>
  </tr>
))}
```
<!--
#### members가 object인 경우
```diff
- {members.map((member, index) => (
+ {Object.entries(members).map(([index, member]) => (
```
-->

<!-- Hook exhaustive-deps 경고
https://www.npmjs.com/package/eslint-plugin-react-hooks#installation

또는 마지막 줄에
// eslint-disable-next-line
추가 -->

### Update
src/stores/MembersStore.js
```js
membersUpdate(index, member) {
  this.members[index] = member;
  console.log('Done membersUpdate', this.members);
}
```

src/components/contents/Members.js
```diff
- <td>{member.name}</td>
- <td>{member.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={member.name}
    onChange={event => {member.name = event.target.value}}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={member.age}
    onChange={event => {member.age = event.target.value}}
  />
</td>
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => membersStore.membersUpdate(index, member)}>Update</button>
```

### Delete
src/stores/MembersStore.js
```js
membersDelete(index) {
  this.members.splice(index, 1);
  console.log('Done membersDelete', this.members);
}
```

src/components/contents/Members.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => membersStore.membersDelete(index)}>Delete</button>
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

### Create
src/stores/MembersStore.js
```js
import axios from 'axios';
import { axiosError } from './common.js';
```
```diff
membersCreate() {
- this.members.push({
-   name: this.member.name,
-   age: this.member.age
- })
- console.log('Done membersCreate', this.members);
```
```js
axios.post('http://localhost:3100/api/v1/members', this.member).then((response) => {
  console.log('Done membersCreate', response);
  this.membersRead();
}).catch((error) => {
  axiosError(error);
});
```

<details><summary>class method 안에서 this에 대한 function과 화살표 함수 비교</summary>

```js
const C = class {
  method() {
    const f1 = function() {
      console.log('f1: ', this);
      // f1:  undefined
    };
    const f2 = () => {
      console.log('f2: ', this);
      // f2: C {}
    };
    f1();
    f2();
  }
};
const c = new C();
c.method();
```
</details>

<!-- ```js
const C = class {
  method() {
    const object = {
      f1: function() {
        console.log('f1: ', this);
        // f1: 부모 {}
      },
      f2: () => {
        console.log('f2: ', this);
        // f2: C {} (부모 object가 무시 되고 자신의 class가 this가 된다)
      }
    };
    object.f1();
    object.f2();
  }
};
const c = new C();
c.method();
``` -->

### Read
src/stores/MembersStore.js
```diff
membersRead() {
- this.members = [{
-   name: '홍길동',
-   age: 20
- }, {
-   name: '춘향이',
-   age: 16
- }];
- console.log('Done membersRead', this.members);
```
```js
axios.get('http://localhost:3100/api/v1/members').then((response) => {
  console.log('Done membersRead', response);
  this.members = response.data.members;
}).catch((error) => {
  axiosError(error);
});
```

### Update
src/stores/MembersStore.js
```diff
membersUpdate(index, member) {
- this.members[index] = member;
- console.log('Done membersUpdate', this.members);
```
```js
axios.patch('http://localhost:3100/api/v1/members/' + index, member).then((response) => {
  console.log('Done membersUpdate', response);
  this.membersRead();
}).catch((error) => {
  axiosError(error);
});
```

### Delete
src/stores/MembersStore.js
```diff
membersDelete(index) {
- this.members.splice(index, 1);
- console.log('Done membersDelete', this.members);
```
```js
axios.delete('http://localhost:3100/api/v1/members/' + index).then((response) => {
  console.log('Done membersDelete', response);
  this.membersRead();
}).catch((error) => {
  axiosError(error);
});
```

## Search Store 만들기
src/stores/SearchStore.js
```js
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { axiosError } from './common.js';
import { membersStore } from './MembersStore.js';

export default class SearchStore {
  constructor() {
    makeAutoObservable(this);
  }

  searchRead(q) {
    const url = `http://localhost:3100/api/v1/search?q=${q}`;
    axios.get(url).then((response) => {
      console.log('Done searchRead', response);
      membersStore.members = response.data.members;
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const searchStore = new SearchStore();
```

### Search Store 등록
src/index.js
```js
import { searchStore } from './stores/SearchStore';

searchStore={searchStore}
```

### Search Compenent Store inject
src/components/contents/Search.js
```js
import { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Search(props) {
  const { membersStore, searchStore } = props;
  const { members } = membersStore;
  const [ q, setQ ] = useState('');
  const searchRead = (event) => {
    event.preventDefault();
    searchStore.searchRead(q);
  };
  useEffect(() => {
    searchStore.searchRead('');
  }, [searchStore]);
  return (
    <div>
      <h3>Search</h3>
      <hr className="d-block" />
      <div>
        <form onSubmit={(event) => {searchRead(event)}}>
          <input
            type="text" placeholder="Search"
            value={q}
            onChange={event => {setQ(event.target.value)}}
          />
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
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.age}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default inject('membersStore', 'searchStore')(observer(Search));
```

## Search Compenent 쿼리스트링 변경과 새로고침 적용
src/components/contents/Search.js
```diff
- function Search(props) {
```
```js
import { useLocation, useNavigate } from 'react-router-dom';

function Search(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const spSearch = searchParams.get('q') || '';
```
```diff
- searchStore.searchRead(q);
+ navigate(`/search?q=${q}`);
```
* 검색 해보기

```diff
- useEffect(() => {
-   searchStore.searchRead('');
- }, [searchStore]);
```
```js
useEffect(() => {
  searchStore.searchRead(spSearch);
  setQ(spSearch);
}, [searchStore, spSearch]);
```

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
