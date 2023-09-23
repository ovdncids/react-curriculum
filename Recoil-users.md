# Recoil users
* https://recoiljs.org

## Recoil 설치
```sh
npm install recoil
```

## Users Store 생성
src/stores/usersStore.js
```js
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    name: '',
    age: ''
  }
});

export const usersState = atom({
  key: 'usersState',
  default: []
});
```

## 스토어를 Provider에 등록
src/index.js
```js
import { RecoilRoot } from 'recoil';
```
```diff
- <App />
```
```js
<RecoilRoot>
  <App />
</RecoilRoot>
```

## Users Component Recoil Store 주입
src/components/contents/Users.js
```js
import { useRecoilState } from 'recoil';
import { userState, usersState } from '../../stores/usersStore.js';

function Users() {
  const [user] = useRecoilState(userState);
  const [users] = useRecoilState(usersState);
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
src/components/contents/Users.js
```diff
- const [user] = useRecoilState(userState);
- const [users] = useRecoilState(usersState);
```
```js
const [user, setUser] = useRecoilState(userState);
const [users, setUsers] = useRecoilState(usersState);
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
  setUsers(users.concat({
    ...user
  }))
}}>Create</button>
```

### Read
src/components/contents/Users.js
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
src/components/contents/Users.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  users.splice(index, 1);
  setUsers(users);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

```diff
- const [users, setUsers] = useRecoilState(usersState);
+ const [[...users], setUsers] = useRecoilState(usersState);
```
* `전개 구조` 설명 하기

### Update
src/components/contents/Users.js
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={(event) => {
      user.name = event.target.value;
      users[index] = user;
      setUsers(users);
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      user.age = event.target.value;
      users[index] = user;
      setUsers(users);
    }}
  />
</td>
```
* `Input box` 수정 해보기

```diff
- {users.map((user, index) => (
+ {users.map(({...user}, index) => (
```
* `전개 구조` 설명 하기

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
src/stores/usersStore.js
```js
import { atom, selector } from 'recoil';
import axios from 'axios';
import { axiosError } from './common.js';

export const userState = atom({
  key: 'userState',
  default: {
    name: '',
    age: ''
  }
});

export const usersState = atom({
  key: 'usersState',
  default: []
});

export const usersService = {
  create: async (user) => {
    try {
      const response = await axios.post('http://localhost:3100/api/v1/users', user);
      console.log('Done usersCreate', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  },
  read: async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/users');
      console.log('Done usersRead', response);
      return response.data.users;
    } catch(error) {
      axiosError(error);
    }
  },
  delete: async (index) => {
    try {
      const response = await axios.delete('http://localhost:3100/api/v1/users/' + index);
      console.log('Done usersDelete', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  },
  update: async (index, user) => {
    try {
      const response = await axios.patch('http://localhost:3100/api/v1/users/' + index, user);
      console.log('Done usersUpdate', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  }
};

export const usersRead = selector({
  key: 'usersRead',
  get: usersService.read
});
```

src/components/contents/Users.js
```diff
- import { useRecoilState } from 'recoil';
- import { userState, usersState } from '../../stores/usersStore.js';
```
```js
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, usersState, usersRead } from '../../stores/usersStore.js';
```
```js
const _usersRead = useRecoilValue(usersRead);
useEffect(() => {
  setUsers(_usersRead);
}, [setUsers, _usersRead]);
```
* 확인 해보기

index.js
```diff
- <App />
```
```js
<React.Suspense fallback={<div>Loading...</div>}>
  <App />
</React.Suspense>
```

### Create
src/stores/usersStore.js
```js
export const usersCreate = ({set}) => async (user) => {
  await usersService.create(user);
  const users = await usersService.read();
  set(usersState, users)
};
```

src/components/contents/Users.js
```diff
- import { useRecoilState, useRecoilValue } from 'recoil';
- import { userState, usersState, usersRead } from '../../stores/usersStore.js';
```
```js
import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import { userState, usersState, usersRead, usersCreate } from '../../stores/usersStore.js';
```
```js
const _usersCreate = useRecoilCallback(usersCreate);
```
```diff
- <button onClick={() => {
-   setUsers(users.concat({
-     ...user
-   }));
- }}>Create</button>
```
```js
<button onClick={() => {
  _usersCreate(user);
}}>Create</button>
```

### Delete
src/stores/usersStore.js
```js
export const usersDelete = ({set}) => async (index) => {
  await usersService.delete(index);
  const users = await usersService.read();
  set(usersState, users)
};
```

src/components/contents/Users.js
```diff
- import { userState, usersState, usersRead, usersCreate } from '../../stores/usersStore.js';
+ import { userState, usersState, usersRead, usersCreate, usersDelete } from '../../stores/usersStore.js';
```
```js
const _usersDelete = useRecoilCallback(usersDelete);
```
```diff
- <button onClick={() => {
-   users.splice(index, 1);
-   setUsers(users);
- }}>Delete</button>
```
```js
<button onClick={() => {
  _usersDelete(index);
}}>Delete</button>
```

### Update
src/stores/usersStore.js
```js
export const usersUpdate = ({set}) => async (index, user) => {
  await usersService.update(index, user);
  const users = await usersService.read();
  set(usersState, users)
};
```

src/components/contents/Users.js
```diff
- import { userState, usersState, usersRead, usersCreate, usersDelete } from '../../stores/usersStore.js';
+ import { userState, usersState, usersRead, usersCreate, usersDelete, usersUpdate } from '../../stores/usersStore.js';
```
```js
const _usersUpdate = useRecoilCallback(usersUpdate);
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  _usersUpdate(index, user);
}}>Update</button>
```
