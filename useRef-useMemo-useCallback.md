# React Hook의 특징
Hooks.js
```js
const hooks = [];

function Hooks() {
  const [s, sSet] = useState(0);
  const f = function() { return s; };
  console.warn('f', f());
  hooks.push(f);
  console.log('hooks', hooks, hooks[0] === hooks[hooks.length - 1]);
  return (
    <button onClick={() => sSet(s + 1)}>{s}</button>
  );
}
```
* `리렌더링` 될때마다 `hooks`에 새로 생성된 `f 함수`가 쌓이게 된다.
* ❕ 새로운 `f 함수`가 생성되므로 `f 함수`를 호출하면 `s`값이 달라지게 된다.

```diff
- hooks.push(f);
+ hooks.push(s);
```
* `리렌더링` 될때마다 `hooks`에 현재 상태 `s`가 쌓이게 된다.

```diff
- hooks.push(s);
+ hooks.push(sSet);
```
* ❕ `sSet` 함수는 `s` 상태를 변경해야 하므로 항상 같은 함수가 리턴된다.

```diff
- hooks.push(sSet);
```
```js
const r = useRef({});
hooks.push(r);
```
* `r` 객체 역시 항상 같은 객체가 리턴된다.
* ChatGPT: `const [s, sSet] = useState(''); 에서 리렌더링 되어도 sSet은 항상 동일한 함수인 이유는?`
* ChatGPT: `React가 내부적으로 상태 저장소를 “위치(index)”로 기억는 코드는?`
```js
if (Math.random() < 0.5) {
  useState(0);
}
```
* `Hook 함수`를 `if문` 안에서 호출하면 React 내부적으로 `index`가 달라지므로 사용하면 에러가 발생한다.

```diff
- console.log('f', f());
- const r = useRef();
- hooks.push(r);
```
```js
const m = useMemo(f, []);
hooks.push(m);
console.log('f', f(), 'm', m);
```
* `useMemo`는 `f 함수`를 호출하고 결과를 `m 변수`에 리턴한다.
* ❕ `useMemo`는 `의존성 배열`이 비어 있으면 처음 한번만 `f 함수`를 호출하므로 `m` 값이 변하지 않는다.

```diff
- const m = useMemo(f, []);
+ const m = useMemo(f, [f]);
```
* `의존성 배열`에 `리렌더링`마다 새로 생성되는 `f 함수`를 넣었으므로 매번 `f 함수`가 호출되어 `m` 값이 변하게 된다.

```diff
- const m = useMemo(f, [f]);
+ const m = useMemo(f, [s]);
```
* `f 함수`가 `s` 값을 사용하고 있고 `s` 역시 `리렌더링`마다 변하므로 결과는 동일하다.

```diff
- const m = useMemo(f, [s]);
- hooks.push(m);
- console.log('f', f(), 'm', m);
```
```js
const c = useCallback(f, []);
hooks.push(c);
console.log('f', f(), 'c', c());
```
* ❕ `useMemo`와 `useCallback`의 차이는 `useMemo`는 함수를 호출한 결과를 반환하고, `useCallback`는 해당 함수를 반환한다.
* ❕ `useCallback` 또한 `의존성 배열`이 비어 있으면 처음 받은 `f 함수`만 반환한다.

```diff
- const c = useCallback(f, []);
+ const c = useCallback(f, [f]);
```
* `의존성 배열`은 `useMemo` 동일하므로 새로운 `f 함수`를 반환한다.

```diff
- const c = useCallback(f, [f]);
+ const c = useCallback(f, [s]);
```
* 동일

```diff
- hooks.push(c);
```
```js
const e = function() { console.error('effect', c()); };
useEffect(e, []);
hooks.push(e);
```
* `useEffect`는 반환값이 없으므로 항상 `undefined`를 반환한다. `console.log(useEffect(e, []));`
* ❕ `useEffect`는 리턴부분의 `HTML`이 모두 그려진 다음에 `e 함수`를 호출한다.
* ❕ `의존성 배열`이 비어 있으면 처음 한번만 `e 함수`를 호출한다.

```diff
- useEffect(e, []);
+ useEffect(e, [e]);
```
* `e 함수`는 리랜더링 될때마다 새로 생성되므로 `의존성 배열` 넣으면 매번 리랜더링 될때마다 `useEffect`가 `e 함수`를 호출한다.

```diff
- useEffect(e, [e]);
+ useEffect(e, [c]);
```
* 현재 코드상으로 `c`가 리랜더링 될때마다 생성되므로 `e`와 동일하다.

# useRef
* 주로 `자식 컴포넌트`의 `Element`에 접근하기 위해 사용한다. 

UseRefTest.js
```js
import { useEffect, useRef } from 'react';

function Child({refDiv}) {
  return (
    <div ref={refDiv}></div>
  );
}

function UseRefTest() {
  const refDiv = useRef();
  useEffect(() => {
    refDiv.current.innerHTML = 'Child.div';
    console.log(refDiv.current.clientWidth);
    // refDiv.current = {}; // refDiv.current는 수정도 가능하지만 코드의 복잡도가 증가한다.
    return () => {
      console.log(refDiv);
    };
  }, []);
  return (
    <Child refDiv={refDiv} />
  );
}
```
* <details><summary>TS: <code>const refDiv = useRef();</code></summary>

  ```diff
  - const refDiv = useRef();
  + const refDiv = useRef({} as HTMLDivElement);
  ```
  ```diff
  - function Child({refDiv}) {
  + function Child({refDiv}: {refDiv: React.RefObject<HTMLDivElement>}) {
  ```
</details>

* ❕ `Child`가 `리렌더링` 되어도 `refDiv.current` 객체는 처음에 지정된 `div` 객체가 유지 된다.
* ❕ `useRef`를 사용하지 않고 `id`와 `document.getElementById`를 사용해도 처음에 지정된 객체가 유지 된다.
* `refDiv`는 `{current: undefined}`로 선언되고 -> `useEffect`에서 `{current: 엘리먼트}` 엘리먼트가 지정 되어 있고 -> `useEffect[return]`에서 `{current: null}`이 된다.

# useMemo
* https://www.daleseo.com/react-hooks-use-memo
* 컴포넌트가 `리렌더링` 될때 특정 부분만 `리렌더링`를 방지하기 위해 사용

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

function UseMemoTest() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  console.log('UseMemoTest', users, user);
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
* ❕ `useEffect`와 모양은 비슷하다. 차이점은 `useMemo`는 렌더링 중에 실행하고, `useEffect`는 렌더링 후 실행 한다.

# useCallback
* ❕ `useCallback`은 `useEffect`안의 의존성 경고를 피하려고 많이 사용됨

UseCallbackTest.js
```js
function UseCallbackTest() {
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
* ❕ `useCallback`의 과도한 사용으로 소스의 가독성이 떨어진다면 [Signals](https://github.com/ovdncids/react-curriculum/blob/master/Signals.md) 사용을 고려해 보자.

<!--
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
-->
