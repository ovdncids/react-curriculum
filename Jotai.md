# Jotai (2.20.2)
https://github.com/pmndrs/jotai
```sh
npm install jotai
```

## Users Atoms 생성
src/atoms/usersAtoms.js
```js
import { atom } from 'jotai';

const user = atom({
  name: '',
  age: ''
});

const users = atom([]);

export const usersAtoms = {
  user,
  users
};
```
* <details><summary>TS: (state: usersAtoms)</summary>

  ```ts
  interface User {
    name: string
    age: string | number
  }

  const user = atom<User>({
  
  const users = atom<User[]>([]);
  ```
</details>

## Users Component Jotai Atoms 주입
src/pages/Users.js
```js
import { useAtom } from 'jotai';
import { usersAtoms } from '../atoms/usersAtoms.js';

function Users() {
  const [user] = useAtom(usersAtoms.user);
  const [users] = useAtom(usersAtoms.users);
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

## Users Atoms CRUD
### Create
src/atoms/usersAtoms.js
```js
export const usersActions = {
  usersCreate: atom(null, (get, set, user) =>
    set(usersAtoms.users, get(usersAtoms.users).concat(user))
  )
};
```

* <details><summary>TS: Argument of type 'unknown' is not assignable to parameter of type 'User | ConcatArray<User>'.ts(2769)</summary>

  ```diff
  - usersCreate: atom(null, (get, set, user) =>
  + usersCreate: atom(null, (get, set, user: User) =>
  ```
</details>

src/pages/Users.js
```diff
- import { usersAtoms } from '@/atoms/usersAtoms.js'
+ import { usersAtoms, usersActions } from '@/stores/usersStore.js';

- const [user] = useAtom(usersAtoms.user);
+ const [user, setUser] = useAtom(usersAtoms.user);
const [, usersCreate] = useAtom(usersActions.usersCreate);
```

```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={(event) => {
    setUser({
      ...user,
      name: event.target.value
    });
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={(event) => {
    setUser({
      ...user,
      age: event.target.value
    });
  }}
/>
<button onClick={() => {
  usersCreate(user);
}}>Create</button>
```

### Read
src/atoms/usersAtoms.js
```js
usersRead: atom(null, (_get, set) =>
  set(usersAtoms.users, [
    {
      name: '홍길동',
      age: 20
    }, {
      name: '춘향이',
      age: 16
    }
  ])
)
```

src/pages/Users.js
```js
import { useEffect } from 'react';

const [, usersRead] = useAtom(usersActions.usersRead);

useEffect(() => {
  setUser({
    name: '',
    age: ''
  });
  usersRead();
}, [setUser, usersRead]);
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
src/atoms/usersAtoms.js
```js
usersDelete: atom(null, (get, set, index) => {
  const users = [...get(usersAtoms.users)];
  users.splice(index, 1);
  set(usersAtoms.users, users);
})
```

src/pages/Users.js
```js
const [, usersDelete] = useAtom(usersActions.usersDelete);
```
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  usersDelete(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기
* `전개 구조` 설명 하기

### Update
src/atoms/usersAtoms.js
```js
usersUpdate: atom(null, (get, set, index, user) => {
  const users = [...get(usersAtoms.users)];
  users[index] = user;
  set(usersAtoms.users, users);
})
```

src/pages/Users.js
```diff
- const [users] = useAtom(usersAtoms.users);
+ const [users, setUsers] = useAtom(usersAtoms.users);
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={(event) => {
      setUsers(
         users.map((user, i) => i === index ? { ...user, name: event.target.value } : user)
      )
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      setUsers(
        users.map((user, i) => i === index ? { ...user, age: event.target.value } : user)
      )
    }}
  />
</td>
```
* `Input box` 수정 해보기

```js
const [, usersUpdate] = useAtom(usersActions.usersUpdate);
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  usersUpdate(index, user);
}}>Update</button>
```

## Backend Server
* [Axios 서버 연동](BackendServer.md)

### Read
src/atoms/usersAtoms.js
```js
import axios from 'axios';
```
```diff
- usersRead: atom(null, (_get, set) =>
```
```js
usersRead: atom(null, async (_get, set) => {
  const response = await axios.get('http://localhost:3100/api/v1/users');
  console.log('Done usersRead', response);
  set(usersAtoms.users, response.data.users);
}),
```

### Create
src/atoms/usersAtoms.js
```diff
- usersCreate: atom(null, (get, set, user) =>
```
```js
usersCreate: atom(null, async (_get, set, user) => {
  const response = await axios.post('http://localhost:3100/api/v1/users', user);
  console.log('Done usersCreate', response);
  set(usersActions.usersRead);
}),
```

### Delete
src/atoms/usersAtoms.js
```diff
- usersDelete: atom(null, (get, set, index) => {
```
```js
usersDelete: atom(null, async (_get, set, index) => {
  const response = await axios.delete('http://localhost:3100/api/v1/users/' + index);
  console.log('Done usersDelete', response);
  set(usersActions.usersRead);
}),
```

### Update
src/atoms/usersAtoms.js
```diff
- usersUpdate: atom(null, (get, set, index, user) => {
```
```js
usersUpdate: atom(null, async (_get, set, index, user) => {
  const response = await axios.patch('http://localhost:3100/api/v1/users/' + index, user);
  console.log('Done usersUpdate', response);
  set(usersActions.usersRead);
})
```

## Search Atoms 만들기
src/atoms/searchAtoms.js
```js
import axios from 'axios';
import { atom } from 'jotai';
import { usersAtoms } from './usersAtoms.js';

export const searchActions = {
  searchRead: atom(null, async (_get, set, q: string) => {
    const response = await axios.get('http://localhost:3100/api/v1/search?q=' + q);
    console.log('Done searchRead', response);
    set(usersAtoms.users, response.data.users);
  })
};
```

### Search Component Jotai Atoms 주입
src/pages/Search.js
```js
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { searchActions } from '@/atoms/searchAtoms.js';
import { usersAtoms } from '@/atoms/usersAtoms.js';

function Search() {
  const [users] = useAtom(usersAtoms.users)
  const [, searchRead] = useAtom(searchActions.searchRead)
  const q = '';
  console.log(q, users);
  useEffect(() => {
    searchRead(q);
  }, [searchRead]);
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
  const [q, setQ] = useState('');
  const [, searchRead] = useAtom(searchActions.searchRead);
  console.log('SearchBar', props.q);
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        searchRead(q);
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
```js
function SearchBar(props) {
  const navigate = useNavigate();
```
```diff
- const [, searchRead] = useAtom(searchActions.searchRead);
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
  searchRead(q);
- }, [searchRead])
+ }, [searchRead, q])
```
* `검색`, `새로고침` 해보기

```diff
- const [q, setQ] = useState('');
+ const [q, setQ] = useState(props.q);
```
* `새로고침`, `뒤로가기` 해보기

```diff
- <SearchBar q={q} />
+ <SearchBar key={q} q={q} />
```
* `새로고침`, `뒤로가기`, `검색` 해보기
* `key`는 `q`가 수정되면 새로운 컴포넌트를 생성한다.
