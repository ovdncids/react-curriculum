# TanStack Query (구 React Query)
* https://tanstack.com/query/latest/docs/framework/react/overview
* https://www.heropy.dev/p/HZaKIE
* https://tech.kakaopay.com/post/react-query-1

## TanStack Query 설치 (@tanstack/react-query@5.101.4)
```sh
npm install react-query
```

## Backend Server
* [Axios 서버 연동](BackendServer.md)

## TanStack Query 등록
src/index.js
```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
```
```diff
- <App />
```
```js
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

## Users Component TanStack Query 주입
src/pages/Users.js
```js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Users() {
  const usersRead = useQuery({
    queryKey: ['usersRead'],
    queryFn: () => {
      return axios.get('http://localhost:3100/api/v1/users');
    }
  });
  console.log(usersRead);
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

### TanStack Query 상한 상태 설정
```js
const usersRead = useQuery({
  queryKey: ['usersRead'],
  queryFn: () => {
    return axios.get('http://localhost:3100/api/v1/users');
  },
  // 통신중에 오류가 발생하면 재시도 회수
  retry: 0,
  // 탭 이동 또는 최소화 상태에서 다시 focus 되면 다시 통신을 요청 한다. (기본 true)
  refetchOnWindowFocus: true,
  // isStale(상한 상태)로 변하는 시간. 설정 시간 동안은 다시 통신을 요청 하지 않는다.
  staleTime: 1000 * 3,
  // 데이터 변형
  select: (data) => data
});
const { data, isLoading, isStale, status, error } = usersRead;
console.log(data, isLoading, isStale);
```
* `undefined true true 'pending' null` 최초 렌더링
* `{데이터} false false 'success' null` 데이터 받고 렌더링
* `{데이터} false true 'success' null` 3초(staleTime) 후 상한 상태 렌더링

## Users CRUD
### Read
src/pages/Users.js
```js
function UsersRows({ users }) {
  return (
    <tbody>
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
    </tbody>
  );
}
```
```js
const users = usersRead.data?.data.users || [];
```
```diff
- <tbody> 부분 삭제
+ <UsersRows users={users} />
```

* <details><summary>TS: response</summary>

  ```ts
  export interface User {
    name: string
    age: string | number
  }
  ```
  ```diff
  - const usersRead = useQuery({
  + const usersRead = useQuery<{ data: { users: User[] } }>({
  ```
</details>

## Create
src/pages/Users.js
```js
import { useState } from 'react';

function UsersCreate() {
  const [user, setUser] = useState({
    name: '',
    age: ''
  });
  return (
    <div>
      <h4>Create</h4>
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
      <button>Create</button>
    </div>
  );
}
```
```diff
- <div> <h4>Create</h4> 부분 삭제
- <input type="text" placeholder="Age" />
```

* `Input box` 수정 해보기

```diff
- import { useQuery } from '@tanstack/react-query'
```
```js
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

// function UsersCreate() {
  const queryClient = useQueryClient();
  const usersCreate = useMutation({
    mutationFn: (user) => {
      return axios.post('http://localhost:3100/api/v1/users', user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersRead']
      });
    }
  });
```
```diff
- <button>Create</button>
```
```js
<button onClick={() => {
  usersCreate.mutate(user);
}}>Create</button>
```
* <details><summary>TS: Argument of type '{ name: string; age: string; }' is not assignable to parameter of type 'void'.ts(2345)</summary>

  ```diff
  - const [user, setUser] = useState({
  + const [user, setUser] = useState<User>({

  - mutationFn: (user) => {
  + mutationFn: (user: User) => {
  ```
</details>

## Delete
src/pages/Users.js
```js
const usersDelete = useMutation({
  mutationFn: (index: number) => {
    return axios.delete('http://localhost:3100/api/v1/users/' + index);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['usersRead']
    })
  }
});
```
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  usersDelete.mutate(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

## Update
src/pages/Users.js
```diff
- function UsersRows({ users }) {
```
```js
function UsersRows(props) {
  console.log('UsersRows', props);
  const [users, setUsers] = useState(props.users);
```
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={(event) => {
      setUsers(
        users.map((user, i) => i === index ? { ...user, name: event.target.value } : user)
      );
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      setUsers(
        users.map((user, i) => i === index ? { ...user, age: event.target.value } : user)
      );
    }}
  />
</td>
```
* `console.log('UsersRows', props);`에서 정상적으로 `users`가 변경되지만 화면에 다시 그려지지 않는다.

```diff
- <UsersRows users={users} />
+ <UsersRows key={usersRead.dataUpdatedAt} users={users} />
```
* `key`가 변경되면 강제 리마운트된다. (useEffect를 쓰고 싶지 않을때 효과적)
* `Input box` 수정 해보기

```js
const usersUpdate = useMutation({
  mutationFn: ({index, user}) => {
    return axios.patch('http://localhost:3100/api/v1/users/' + index, user);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['usersRead']
    })
  }
});
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  usersUpdate.mutate({index, user});
}}>Update</button>
```
* <details><summary>TS: Property 'user' does not exist on type 'void'.ts(2339)</summary>

  ```diff
  - mutationFn: ({index, user}) => {
  + mutationFn: ({index, user}: { index: number, user: User }) => {
  ```
</details>

* `통신 횟수`와 `렌더링 횟수` 비교

### TanStack Query 사용자 Hook 만들기
src/hooks/useUsers.js
```js
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useUsers() {
  const queryClient = useQueryClient();
  const usersRead = useQuery({
    queryKey: ['usersRead'],
    queryFn: () => {
      return axios.get('http://localhost:3100/api/v1/users');
    },
    // 통신중에 오류가 발생하면 재시도 회수
    retry: 0,
    // 탭 이동 또는 최소화 상태에서 다시 focus 되면 다시 통신을 요청 한다. (기본 true)
    refetchOnWindowFocus: true,
    // isStale(상한 상태)로 변하는 시간. 설정 시간 동안은 다시 통신을 요청 하지 않는다.
    staleTime: 1000 * 3,
    // 데이터 변형
    select: (data) => data
  });
  const usersCreate = useMutation({
    mutationFn: (user) => {
      return axios.post('http://localhost:3100/api/v1/users', user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersRead']
      });
    }
  });
  const usersDelete = useMutation({
    mutationFn: (index: number) => {
      return axios.delete('http://localhost:3100/api/v1/users/' + index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersRead']
      })
    }
  });
  const usersUpdate = useMutation({
    mutationFn: ({index, user}) => {
      return axios.patch('http://localhost:3100/api/v1/users/' + index, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersRead']
      })
    }
  });
  return {
    usersRead,
    usersCreate,
    usersDelete,
    usersUpdate
  };
}
```

src/pages/Users.js
```diff
- import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
- import axios from 'axios';
+ import { useUsers } from '../hooks/useUsers';
```
```diff
- const queryClient = useQueryClient();
- const usersDelete = useMutation({
```
```js
const { usersUpdate, usersDelete } = useUsers();
```

### 상대 경로 절대 경로로 수정하기
* [Alias](ESLint_Prettier_Alias.md#alias)
