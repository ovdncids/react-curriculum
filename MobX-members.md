# MobX
https://github.com/mobxjs/mobx

## MobX 설치
```sh
npm install mobx mobx-react
```

## Members Store 생성
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

### Members Component Store inject
src/components/contents/Members.js
```js
import { inject, observer } from 'mobx-react';

function Members(props) {
  const { membersStore } = props;
  const { member } = membersStore;
  console.log(props, member);
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
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Age" />
        <button>Create</button>
      </div>
    </div>
  );
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
### Create
src/stores/MembersStore.js
```js
membersCreate(member) {
  this.members.push({
    name: member.name,
    age: member.age
  });
  console.log('Done membersCreate', this.members);
}
```

src/components/contents/Members.js
```js
<input
  type="text" placeholder="Name" value={member.name}
  onChange={event => {member.name = event.target.value}}
/>
<input
  type="text" placeholder="Age" value={member.age}
  onChange={event => {member.age = event.target.value}}
/>
<button onClick={() => membersStore.membersCreate(member)}>Create</button>
```

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
membersCreate(member) {
- this.members.push({
-   name: member.name,
-   age: member.age
- })
- console.log('Done membersCreate', this.members);
```
```js
axios.post('http://localhost:3100/api/v1/members', member).then((response) => {
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

## Search Store 만들기
src/stores/SearchStore.js
```js
import { makeAutoObservable } from 'mobx';
import { membersStore } from './MembersStore.js';
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

### Search Component Store inject
src/components/contents/Search.js
```js
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Search(props) {
  const { membersStore, searchStore } = props;
  const { members } = membersStore;
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
  );
}

export default inject('membersStore', 'searchStore')(observer(Search));
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
