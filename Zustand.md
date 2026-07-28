# Zustand 설치 (5.0.14)
https://github.com/pmndrs/zustand
```sh
npm install zustand
```

## Users Store 생성
src/stores/usersStore.js
```js
import { create } from 'zustand';

export const usersStore = create(() => ({
  users: [],
  user: {
    name: '',
    age: ''
  }
}));
```
* <details><summary>TS: (state: UsersStore)</summary>

  ```ts
  interface User {
    name: string
    age: string | number
  }

  interface UsersStore {
    users: User[]
    user: User
  }
  
  export const usersStore = create<UsersStore>(() => ({
    users: [],
    user: {
      name: '',
      age: ''
    }
  }));
  ```
</details>

## Users Component Zustand Store 주입
src/pages/Users.js
```js
import { usersStore } from '../stores/usersStore.js';

function Users() {
  const usersState = usersStore((state) => state);
  const user = usersState.user;
  const users = usersState.users;
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

### 상대 경로 절대 경로로 수정하기
* [Alias](ESLint_Prettier_Alias.md#alias)

## Users Store CRUD
### Create
src/stores/usersStore.js
```js
export const usersActions = {
  userSet: (user) => {
    usersStore.setState({ user });
  },
  usersCreate: (user) => {
    usersStore.setState((state) => {
      state.users.push({
        ...user
      });
      return {
        users: state.users
      };
    });
  }
};
```
* `전개 구조` 설명 하기
* `action` 안에서 `state` 사용 `usersStore.getState().user`

### Zustand 특징
* `useState`와 다르게 동일한 객체를 `set` 해도 랜더링 가능
* `redux`와 다르게 `state`가 readonly 아님, 하지만 렌더링은 무조건 `set` 사용

src/pages/Users.js
```diff
- import { usersStore } from '../stores/usersStore.js';
+ import { usersStore, usersActions } from '../stores/usersStore.js';
```
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={(event) => {
    usersActions.userSet({
      ...user,
      name: event.target.value
    });
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={(event) => {
    usersActions.userSet({
      ...user,
      age: event.target.value
    });
  }}
/>
<button onClick={() => {
  usersActions.usersCreate(user);
}}>Create</button>
```

### Read
src/stores/usersStore.js
```js
usersRead: () => {
  usersStore.setState((state) => {
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

src/pages/Users.js
```js
import { useEffect } from 'react';

useEffect(() => {
  usersActions.userSet({
    name: '',
    age: ''
  });
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
src/stores/usersStore.js
```js
usersDelete: (index) => {
  usersStore.setState((state) => {
    state.users.splice(index, 1);
    return {
      users: state.users
    };
  });
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
usersSet: (users) => {
  usersStore.setState({ users });
},
```
```js
usersUpdate: (index, user) => {
  usersStore.setState((state) => {
    state.users[index] = user;
    return {
      users: state.users
    };
  });
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
      const users = [...usersState.users]
      users[index].name = event.target.value
      usersActions.usersSet(users)
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      const users = [...usersState.users]
      users[index].age = event.target.value
      usersActions.usersSet(users)
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

## Axios 서버 연동 (1.18.1)
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
  usersActions.usersSet(response.data.users);
},
```

### Create
src/stores/usersStore.js
```diff
- usersCreate: (user) => {
```
```js
usersCreate: async (user) => {
  const response = await axios.post('http://localhost:3100/api/v1/users', user);
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
import { usersActions } from './usersStore.js';
import axios from 'axios';

export const searchActions = {
  searchRead: async (q) => {
    const response = await axios.get('http://localhost:3100/api/v1/search?q=' + q);
    console.log('Done searchRead', response);
    usersActions.usersSet(response.data.users);
  }
};
```

### Search Component Zustand Store 주입
src/pages/Search.js
```js
import { useEffect } from 'react';
import { usersStore } from '../stores/usersStore.js';
import { searchActions } from '../stores/searchStore.js';

function Search() {
  const users = usersStore((state) => state).users;
  const q = '';
  console.log(q, users);
  useEffect(() => {
    searchActions.searchRead(q);
  }, []);
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

## SearchBar Component에서만 사용 가능한 state값 적용
src/pages/Search.js
```diff
- import { useEffect } from 'react';
+ import { useState, useEffect } from 'react';
```
```js
function SearchBar(props) {
  const [ q, setQ ] = useState('');
  console.log('SearchBar', props.q);
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        searchActions.searchRead(q);
      }}>
        <input
          type="text" placeholder="Search"
          value={q}
          onChange={event => {setQ(event.target.value)}}
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

## Search Component 쿼리스트링 변경
src/pages/Search.js
```js
import { useNavigate } from 'react-router-dom';
```
```diff
- function SearchBar(props) {
```
```js
function SearchBar(props) {
  const navigate = useNavigate();
```
```diff
- searchActions.searchRead(q);
+ navigate('/search?q=' + q);
```
* `검색`, `뒤로가기` 해보기

## Search Component 새로고침 적용
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
- const [ q, setQ ] = useState('');
+ const [ q, setQ ] = useState(props.q);
```
* `새로고침`, `뒤로가기` 해보기

```diff
- <SearchBar q={q} />
+ <SearchBar key={q} q={q} />
```
* `새로고침`, `뒤로가기`, `검색` 해보기
* `key`는 `q`가 수정되면 새로운 컴포넌트를 생성한다.
