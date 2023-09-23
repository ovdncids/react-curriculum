# useMemo
https://www.daleseo.com/react-hooks-use-memo

* 부모 컴포넌트가 redering 되어 자식까지 redering 되는 경우, 자식에서 사용되는 일정 부분의 함수를 다시 실행하지 않기

## useMemo 사용전
index.js
```js
import { useState } from 'react';

function Users(props) {
  const { users } = props;
  console.warn(users);
  return (
    <div>
    {users.map((user, index) => (
      <div key={index}>{user}</div>
    ))}
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  return (
    <div>
      <Users users={users}></Users>
      <input
        type="text" placeholder="User" value={user}
        onChange={(event) => setUser(event.target.value)}
      />
      <button onClick={() => setUsers([...users, user])}>Create</button>
    </div>
  );
}

export default App;
```

## useMemo 사용후
index.js
```diff
- import { useState } from 'react';
+ import { useState, useMemo } from 'react';

- <Users users={users}></Users>
```
```js
{useMemo(() => (
  <Users users={users}></Users>
), [users])}
```
* ❕ `useEffect`와 모양은 비슷하다. 차이점은 `useMemo`는 렌더링 중에 실행, `useEffect`는 렌더링 후 실행 한다.

# useCallback
* ❕ `useMemo`와 비슷하지만 `useCallback`은 함수를 반환, `useMemo` 결과를 반환 한다.

```js
const usersInit = () => {
  return [];
};
const usersInitCopy = usersInit;
useEffect(() => {
  setUsers(usersInitCopy());
}, []);
```
* `useEffect` 함수 안에서 `usersInitCopy 상수`를 사용하면 `React Hook useEffect has a missing dependency: 'usersInitCopy'.` 발생한다.

```diff
- }, []);
+ }, [usersInitCopy]);
```
* 해결하기 위해여 `useEffect`에서 `usersInitCopy` 의존성을 추가하면 무한루프가 발생한다.

```diff
- const usersInit = () => {
-   return [];
- };
```
```js
const usersInit = useCallback(() => {
  return [];
}, []);
```
* `useCallback` 사용하면 `usersInit 함수`는 렌터링이 되더라도 변하지 않는다. `[]` 안의 의존성이 변할때만 새로운 함수를 받는다.

# useRef
```js
import { useRef } from 'react';

function App() {
  const refInput = useRef();
  return (
    <input
      ref={refInput}
      onChange={() => console.log(refInput)}
    />
  );
}
```
* `refInput`는 `{current: input}` 형식을 갖는다.
