# MobX
https://github.com/mobxjs/mobx

## MobX 설치 (mobx@6.16.1, mobx-react-lite@4.1.1)
```sh
npm install mobx mobx-react-lite
```

## Users Store 생성
src/stores/UsersStore.js
```js
import { configure, makeAutoObservable } from 'mobx';

configure({
  // enforceActions: 'never',
  // useProxies: 'never'
});

export default class UsersStore {
  constructor() {
    makeAutoObservable(this);
  }

  users = [];
  user = {
    name: '',
    age: ''
  };
}

export const usersStore = new UsersStore();
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

* <details><summary>TS: (state: UsersStore)</summary>

  ```ts
  interface User {
    name: string
    age: string | number
  }

  users: User[] = [];
  user: User = {
  ```
</details>

**Users Store 등록**

src/index.js
```js
import { usersStore } from './stores/UsersStore.js';
```
```diff
- { path: '/users', element: <Users /> },
+ { path: '/users', element: <Users usersStore={usersStore} /> },
```

### Users Component MobX Store 주입
src/pages/Users.js
```js
import { observer } from 'mobx-react-lite';

const Users = observer((props) => {
  const { usersStore } = props;
  const { user } = usersStore;
  console.log(props, user);
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
})

export default Users;
```

* <details><summary>TS: Property 'usersStore' does not exist on type '{}'.ts(2339)</summary>

  ```diff
  - const Users = observer((props) => {
  ```
  ```ts
  import type UsersStore from '../stores/UsersStore';

  const Users = observer((props: { usersStore: UsersStore }) => {
  ```
</details>

**useProxies 설명**

<!--
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
-->

### 상대 경로 절대 경로로 수정하기
* [Alias](ESLint_Prettier_Alias.md#alias)

## Users Store CRUD
### Create
src/stores/UsersStore.js
```js
usersCreate(user) {
  this.users.push({
    name: user.name,
    age: user.age
  });
  console.log('Done usersCreate', this.users);
}
```

src/pages/Users.js
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={(event) => {user.name = event.target.value}}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={(event) => {user.age = event.target.value}}
/>
<button onClick={() => usersStore.usersCreate(user)}>Create</button>
```
**enforceActions 설명**

src/stores/UsersStore.js
```diff
- // enforceActions: 'never'
+ enforceActions: 'never'
```

**render에 대한 설명**

### Read
src/stores/UsersStore.js
```js
usersRead() {
  this.users = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }];
  console.log('Done usersRead', this.users);
}
```

src/pages/Users.js
```js
import { useEffect } from 'react';
```
```diff
- const { user } = usersStore;
```
```js
const { users, user } = usersStore;
useEffect(() => {
  usersStore.usersRead();
}, [usersStore]);
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
<!--
#### users가 object인 경우
```diff
- {users.map((user, index) => (
+ {Object.entries(users).map(([index, user]) => (
```
-->

<!-- Hook exhaustive-deps 경고
https://www.npmjs.com/package/eslint-plugin-react-hooks#installation

또는 마지막 줄에
// eslint-disable-next-line
추가 -->

### Delete
src/stores/UsersStore.js
```js
usersDelete(index) {
  this.users.splice(index, 1);
  console.log('Done usersDelete', this.users);
}
```

src/pages/Users.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => usersStore.usersDelete(index)}>Delete</button>
```

### Update
src/stores/UsersStore.js
```js
usersUpdate(index, user) {
  this.users[index] = user;
  console.log('Done usersUpdate', this.users);
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
    onChange={(event) => {user.name = event.target.value}}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {user.age = event.target.value}}
  />
</td>
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => usersStore.usersUpdate(index, user)}>Update</button>
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

## Axios 서버 연동 (1.18.1)
https://github.com/axios/axios
```sh
npm install axios
```

### Read
src/stores/UsersStore.js
```js
import axios from 'axios';
```
```diff
usersRead() {
- this.users = [{
-   name: '홍길동',
-   age: 20
- }, {
-   name: '춘향이',
-   age: 16
- }];
- console.log('Done usersRead', this.users);
```
```js
axios.get('http://localhost:3100/api/v1/users').then((response) => {
  console.log('Done usersRead', response);
  this.users = response.data.users;
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

### Create
src/stores/UsersStore.js
```diff
usersCreate(user) {
- this.users.push({
-   name: user.name,
-   age: user.age
- })
- console.log('Done usersCreate', this.users);
```
```js
axios.post('http://localhost:3100/api/v1/users', user).then((response) => {
  console.log('Done usersCreate', response);
  this.usersRead();
});
```

### Delete
src/stores/UsersStore.js
```diff
usersDelete(index) {
- this.users.splice(index, 1);
- console.log('Done usersDelete', this.users);
```
```js
axios.delete('http://localhost:3100/api/v1/users/' + index).then((response) => {
  console.log('Done usersDelete', response);
  this.usersRead();
});
```

### Update
src/stores/UsersStore.js
```diff
usersUpdate(index, user) {
- this.users[index] = user;
- console.log('Done usersUpdate', this.users);
```
```js
axios.patch('http://localhost:3100/api/v1/users/' + index, user).then((response) => {
  console.log('Done usersUpdate', response);
  this.usersRead();
});
```

## Search Store 만들기
src/stores/SearchStore.js
```js
import { makeAutoObservable } from 'mobx';
import { usersStore } from './UsersStore.js';
import axios from 'axios';
import { axiosError } from './common.js';

export default class SearchStore {
  constructor() {
    makeAutoObservable(this);
  }

  searchRead(q) {
    const url = 'http://localhost:3100/api/v1/search?q=' + q;
    axios.get(url).then((response) => {
      console.log('Done searchRead', response);
      usersStore.users = response.data.users;
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

### Search Component MobX Store 주입
src/pages/Search.js
```js
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react-lite';

function Search(props) {
  const { usersStore, searchStore } = props;
  const { users } = usersStore;
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

export default inject('usersStore', 'searchStore')(observer(Search));
```

## Search Component에서만 사용 가능한 state값 적용
src/pages/Search.js
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
    onChange={(event) => {setQ(event.target.value)}}
  />
  <button>Search</button>
</form>
```

## Search Component 쿼리스트링 변경
src/pages/Search.js
```diff
- function Search(props) {
```
```js
import { useLocation, useNavigate } from 'react-router-dom';

function Search(props) {
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
