# React Query
* https://react-query-v3.tanstack.com
* https://tech.kakaopay.com/post/react-query-1

## React Query 설치와 등록
```sh
npm install react-query
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

## Users query 생성
src/quires/UsersQuery.js
```js
import { useQuery } from 'react-query';
import axios from 'axios';

export const UsersQuery = {
  UsersRead: () => {
    return useQuery('UsersRead', () => {
      return axios.get('http://localhost:3100/api/v1/users');
    });
  }
};

export default UsersQuery;
```

### Users Component React Query 주입
src/components/contents/Users.js
```js
import UsersQuery from '../../quires/UsersQuery.js';

function Users() {
  const result = UsersQuery.UsersRead();
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

## React Query 설정
```js
import { useQuery } from 'react-query';
import axios from 'axios';

function Users(props) {
  const result = useQuery('users', async () => await axios.get('http://localhost:3100/api/v1/users'), {
    // 통신중에 오류가 발생 하면 재시도 회수  
    retry: 0,
    // 화면이 blur 상태에서 focus 상태이면 통신을 다시 요청 한다. (기본 true)
    refetchOnWindowFocus: true,
    // stale 시간 동안은 focus와 상관 없이 통신을 다시 요청 하지 않는다.
    staleTime: 1000 * 10
  });
  // status값은 통신 오류 재시도 회수가 끝나기 전에는 'loading' 끝나면 'error'가 된다.
  const { data, isLoading, error, status } = result;
  
  // {data && data.data.users.map((user, index) => (
}
```
