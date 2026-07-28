# Signals 설치 (3.3.0)
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
* [Alias](ESLint_Prettier_Alias.md#alias)

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
- import { usersState } from '@/stores/usersStore.js';
+ import { usersState, usersActions } from '@/stores/usersStore.js';
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
* [Signals 특징](SignalsBasic.md)

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
import { useEffect } from 'react';
import { useComputed } from '@preact/signals-react';
import { usersState } from '@/stores/usersStore.js';
import { searchActions } from '@/stores/searchStore.js';

function Search() {
  const q = '';
  useEffect(() => {
    searchActions.searchRead(q);
  }, []);
  console.log('Search', q, usersState.users.value);
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
```diff
- import { useComputed } from '@preact/signals-react';
+ import { useComputed, useSignal } from '@preact/signals-react';
```
```js
function SearchBar(props) {
  const q = useSignal('');
  console.log('SearchBar', props.q, q.value);
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        searchActions.searchRead(q.value);
      }}>
        {useComputed(() => {
          console.log('SearchBar.q', q.value);
          return (
            <input
              type="text" placeholder="Search"
              value={q.value}
              onChange={event => {q.value = event.target.value}}
            />
          );
        })}
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
* <details><summary><code>useSignal</code>과 <code>useState</code> 비교하기</summary>

  ```js
  function SearchBar(props: {q: string}) {
    const [s, sSet] = useState('');
  
  <button onClick={() => sSet(s + 1)}>{s}</button>
  ```
</details>

* <details><summary><code>useSignal</code>과 <code>signal</code> 비교하기</summary>

  ```diff
  - useSignal
  + signal
  ```
  * `signal`은 `useState`의 `s` 값이 변하면 `리렌더링` 되면서 `signal`의 값도 초기화 되지만, `useSignal`은 초기화 되지 않는다.
  * 이유 확인
  ```js
  const hooks = [];

  function SearchBar(props: {q: string}) {
    const q = signal('');
    hooks.push(q);
    console.warn(hooks, hooks[0] === hooks[hooks.length - 1]);
  ```
  * `signal`를 `useSignal`로 변경해 보기
  * `hooks.push(sSet);`로 변경해 보기
  * `hooks.push(sSet);`로 변경해 보기
  * `useRef`도 확인해 보기
  ```diff
  - hooks.push(sSet);
  ```
  ```js
  const r = useRef(null);
  hooks.push(r);
  ```
  * 결론: `useSignal`는 `use`로 시작하므로 컴포넌트 안에서만 사용 가능한 `Hook 함수`이다. 소스 코드를 추적하면 `useRef`가 사용되고 있다.
</details>

## Search Component 쿼리스트링 변경
src/pages/Search.js
```js
import { useNavigate } from 'react-router-dom';
```
```js
function SearchBar(props) {
  const navigate = useNavigate();
```
```diff
- searchActions.searchRead(q.value);
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
- const q = '';
```
```js
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const q = searchParams.get('q') || '';
```
* `검색`, `새로고침` 해보기

```diff
useEffect(() => {
  searchActions.searchRead(q);
- }, []);
+ }, [q]);
```
* `검색`, `새로고침` 해보기

```diff
- const q = useSignal(''); 
+ const q = useSignal(props.q);
```
* `새로고침`, `뒤로가기` 해보기

```diff
- <SearchBar q={q} />
+ <SearchBar key={q} q={q} />
```
* `새로고침`, `뒤로가기`, `검색` 해보기
* `key`는 `q`가 수정되면 새로운 컴포넌트를 생성한다.

## Search Component Signals의 특징
* `Signals`를 사용하는 `Search` 컴포넌트는 `useState`, `타 Store`등으로 `리렌더링`될 일이 없으므로 `useEffect`를 지워도 `무한 리렌더링` 되지 않는다.
```diff
- useEffect(() => {
-   searchActions.searchRead(q);
- }, [q]);
```
```js
searchActions.searchRead(q);
```
