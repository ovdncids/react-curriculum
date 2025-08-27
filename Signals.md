# Signals
* https://github.com/preactjs/signals
* `useState`의 변화는 컴포넌트 전체가 리렌더링 되는데 `signal`을 사용하면 `signal` 적용 부분만 렌더링 한다.
* 렌더링 방지 목적의 `useMemo`, `useCallback` 등의 사용이 필요 없어진다.

## 설치
```sh
npm install @preact/signals-react
```

## 사용
```jsx
import { signal } from '@preact/signals-react';
const s = signal('s1');
s.value = 's2';
<div>{s}</div>
```

```jsx
import { computed } from '@preact/signals-react';
const c1 = computed(() => s.value + ' ss');
```

```jsx
import { effect } from '@preact/signals-react';
effect(() => {
  console.log('effect1');
});
// 컴포넌트 안에서 사용하면 무한 렌더링 된다. 컴포넌트 밖에서 사용하자.
```
