# React Query
* https://react-query-v3.tanstack.com
* https://tech.kakaopay.com/post/react-query-1

## React Query 설치와 등록
```sh
npm install react-query
npm install axios
```

src/index.js
```js
import { QueryClient, QueryClientProvider } from 'react-query';
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

## Users Component React Query 주입
src/components/contents/Users.js
```js
import { useQuery } from 'react-query';
import axios from 'axios';

function Users() {
  const result = useQuery('usersRead', () => {
    return axios.get('http://localhost:3100/api/v1/users');
  });
  console.log(result);
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

### React Query 설정
```js
const result = useQuery('usersRead', () => {
  return axios.get('http://localhost:3100/api/v1/users');
}, {
  // 통신중에 오류가 발생 하면 재시도 회수  
  retry: 0,
  // 화면이 blur 상태에서 focus 상태이면 통신을 다시 요청 한다. (기본 true)
  refetchOnWindowFocus: true,
  // stale 시간 동안은 focus와 상관 없이 통신을 다시 요청 하지 않는다.
  staleTime: 1000 * 3
});
const { data, isLoading, error, status } = result;
```
* `isLoading`과 `debugger`로 로딩 상황 설명

## Query Users CRUD
### Read
src/components/contents/Users.js
```diff
- const result = useQuery('usersRead', () => {
-   return axios.get('http://localhost:3100/api/v1/users');
- });
```
```js
const result = useQuery('usersRead', () => {
  return axios.get('http://localhost:3100/api/v1/users').then((res) => {
    return res.data.users;
  });
}, {
  retry: 0,
  refetchOnWindowFocus: false,
});
const users = result.data;
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
{users && users.map((user, index) => (
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

## Create
src/components/contents/Users.js
```js
import { useState } from 'react';

const [user, setUser] = useState({
  name: '',
  age: ''
});
```
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={event => {
    setUser({
      ...user,
      name: event.target.value
    });
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={event => {
    setUser({
      ...user,
      age: event.target.value
    });
  }}
/>
```
* `Input box` 수정 해보기

```js
import { useQueryClient, useMutation } from 'react-query';

const queryClient = useQueryClient();
const usersCreate = useMutation((user) => {
  return axios.post('http://localhost:3100/api/v1/users', user);
}, {
  onSuccess: () => {
    queryClient.invalidateQueries('usersRead');
  }
});
```
```js
<button onClick={() => {
  usersCreate.mutate(user);
}}>Create</button>
```

## Delete
src/components/contents/Users.js
```js
const usersDelete = useMutation((index) => {
  return axios.delete('http://localhost:3100/api/v1/users/' + index);
}, {
  onSuccess: () => {
    queryClient.invalidateQueries('usersRead');
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
src/components/contents/Users.js
```js
const [users, setUsers] = useState([]);
```
```diff
- return res.data.users;
```
```js
setUsers(res.data.users);
return res.data.users;
```

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
      setUsers(JSON.parse(JSON.stringify(users)));
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={event => {
      user.age = event.target.value;
      setUsers(JSON.parse(JSON.stringify(users)));
    }}
  />
</td>
```
* `Input box` 수정 해보기

```js
const usersUpdate = useMutation(({index, user}) => {
  return axios.path('http://localhost:3100/api/v1/users/' + index, user);
}, {
  onSuccess: () => {
    queryClient.invalidateQueries('usersRead');
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

* `axios` 부분을 `services`로 만들기
