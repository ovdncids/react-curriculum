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
import { usersAtom } from '../atoms/usersAtoms.js';

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
src/stores/usersAtoms.js
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
src/stores/usersAtoms.js
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
src/stores/usersAtoms.js
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
src/stores/usersAtoms.js
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
