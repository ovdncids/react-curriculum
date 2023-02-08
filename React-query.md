# React-query
* https://react-query-v3.tanstack.com
* https://tech.kakaopay.com/post/react-query-1

## 설치
```sh
npm install react-query
```

src/App.js
```js
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      ...
    </QueryClientProvider>  
  );
}
```

src/components/contents/Members.js
```js
import { useQuery } from 'react-query';
import axios from 'axios';

function Members(props) {
  const result = useQuery('members', async () => await axios.get('http://localhost:3100/api/v1/members'), {
    // 통신중에 오류가 발생 하면 재시도 회수  
    retry: 0,
    // 화면이 blur 상태에서 focus 상태이면 통신을 다시 요청 한다. (기본 true)
    refetchOnWindowFocus: true,
    // stale 시간 동안은 focus와 상관 없이 통신을 다시 요청 하지 않는다.
    staleTime: 1000 * 10
  });
  // status값은 통신 오류 재시도 회수가 끝나기 전에는 'loading' 끝나면 'error'가 된다.
  const { data, isLoading, error, status } = result;
  
  // {data && data.data.members.map((member, index) => (
}
```
