# useRef
UseRefTest.js
```js
import { useEffect, useRef } from 'react';

function Child({refDiv}) {
  return (
    <div ref={refDiv}></div>
  );
}

function App() {
  const refDiv = useRef();
  // const refDiv = useRef({} as HTMLDivElement); // {current: {}}으로 초기화 된다.
  useEffect(() => {
    console.log(refDiv.current.scrollTop);
    // refDiv.current = 456; // 자유롭게 current값을 수정 할 수 있다.
    return () => {
      console.log(refDiv);
    }
  }, []);
  // }, [refDiv]); // useRef 함수는 항상 동일한 객체를 리턴하므로 의존성 대상이 아니다.
  return (
    <Child refDiv={refDiv} />
  );
}
```
* `refDiv`는 `{current: undefined}`로 선언되고 -> `useEffect`에서 `{current: 엘리먼트}` 엘리먼트가 지정 되어 있고 -> `useEffect[return]`에서 `{current: null}`이 된다.
* ❕ `자식 useEffect`가 `부모 useEffect`보다 항상 우선 실행되므로 `부모 useEffect`는`refDiv.current.scrollTop`값을 가지고 있는다.

# useMemo
https://www.daleseo.com/react-hooks-use-memo

* 부모 컴포넌트가 redering 되어 자식까지 redering 되는 경우, 자식에서 사용되는 일정 부분의 함수를 다시 실행하지 않기

## useMemo 사용전
UseMemoTest.js
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
* ❕ `useCallback`은 `useEffect` 의존성 경고를 피하려고 많이 사용됨.

UseCallbackTest.js
```js
function CBTest() {
  const [bool] = useState(false);
  const fn = () => {console.log(bool)};
  useEffect(() => {
    fn();
  }, []);
  return <></>;
}
```
* `fn` 함수가 `bool` 변수를 사용하므로 `useEffect[fn]` 의존성 넣으라는 경고 발생.
* `}, []);` -> `}, [fn]);` 추가하면 `useCallback` 넣으라는 경고 발생. (랜더링마다 `fn`이 사용하는 `익명 함수`가 새롭게 생성된어서 `useCallback`을 사용하라는 경고이다.)
```js
const fn = useCallback(() => {console.log(bool)}, [bool]);
```
* ❕ `useCallback` 사용을 줄이기 위해서는 `useEffect`에서 컴포넌트안의 함수 호출 대신 `store 또는 service`의 함수를 호출하고, 랜더링에 필요 없는 `useState` 상태값들은 컴포넌트 밖으로 뺀다.

## useCallback 필요 예제
* ❕ `useMemo`와 비슷하지만 `useCallback`은 함수를 반환, `useMemo` 결과를 반환 한다.

UseMemoTest.js
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
* ❕ `useCallback`의 과도한 사용으로 소스의 가독성이 떨어진다면 [Signals](https://github.com/ovdncids/react-curriculum/blob/master/Signals.md) 사용을 고려해 보자.
