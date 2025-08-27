# Signals
* https://github.com/preactjs/signals
* `useState`의 변화는 컴포넌트 전체가 리렌더링 되는데 `signal`을 사용하면 `signal` 적용 부분만 렌더링 한다.
* 렌더링 방지 목적의 `useMemo`, `useCallback` 등의 사용할 필요가 없어진다.

## 설치
```sh
npm install @preact/signals-react
```

## 사용
```jsx
import { signal } from '@preact/signals-react';
const s = signal(null);
// signal은 컴포넌트와 독립적으로 사용가능 하다.
function Component() {
  s.value = 's2';
  return <div>{s}</div>
}
```

```jsx
import { computed } from '@preact/signals-react';
const c1 = computed(() => s.value + ' ss');
<div>{c1}</div>
```

```jsx
import { effect } from '@preact/signals-react';
effect(() => {
  if (s.value === null) return; // `const s = signal(null);` 이렇게 생성시에도 `effect 안에 함수`가 실행되므로 생성시는 실행시키지 않는 방법
  console.log(s.value);
});
// effect 함수안에 `signal 함수`로 생성한 `s`가 있으므로 생성 또는 `s.value`가 변할때 마다 함수가 실행 된다.
```
