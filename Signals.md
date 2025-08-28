# Signals
* https://github.com/preactjs/signals
* `useState`의 변화는 컴포넌트 전체가 다시 렌더링 되는데 `Signals`를 사용하면 `{시그널스변수}` 부분만 다시 렌더링 한다.
* 렌더링 방지 목적의 `useMemo`, `useCallback` 등을 사용할 필요가 없어져 `더 이해하기 쉬운 코딩`이 가능하다.

## 설치
```sh
npm install @preact/signals-react
```

## 사용
### signal, computed
```jsx
import { signal, computed } from '@preact/signals-react';

const s = signal(0);
const c = computed(() => {
  return <span>{s}</span>;
});
// `Signals`는 컴포넌트와 독립적인 사용가능도 하다.

function Button() {
  console.log('Button ' + s.value + ' - Render only one time');
  return (
    <button onClick={() => {s.value++}}>Change {s}</button>
  );
}

export default function Component() {
  console.log('Component ' + s + ' - Render only one time');
  return (
    <div>
      <div>
        {s}{/*          Re render */}
      </div>
      <div>
        {s.value}{/*    No render again */}
      </div>
      <Button />{/*     No render again */}
      <div>{c}</div>{/* Re render only part of {c} */}
    </div>
  );
}
```

### signal, effect
```jsx
import { signal, effect } from '@preact/signals-react';

const s = signal(null);
effect(() => {
  console.log(s.value);
  if (s.value === null) return;
  // `s.value`를 Component에서 값을 초기화 후에 `API 통신`등을 호출 해야 하는 경우
  console.log('API 통신');
});
// `effect() 함수`를 호출하면 `effect 안의 익명 함수`도 내부적 의존성을 추적하기 위해 즉시 호출 시킨다.
// `s.value`가 의존적이므로 `s.value`가 변할때 마다 `effect 안의 익명 함수`가 다시 호출 된다.

export default function Component() {
  s.value = 's';
  return <div>{s}</div>;
}
```

### batch
```jsx
import { signal, effect, batch } from '@preact/signals-react';

const s = signal(0);
effect(() => {
  console.log(s.value);
});
s.value++;
s.value++;
batch(() => {
  s.value++;
  s.value++;
});
// `effect 안의 익명 함수`에서 `0, 1, 2, 4` 이렇게 출력한다.
// `batch` 함수는 여러번의 수정을 모아서 한번만 `effect 안의 익명 함수`를 호출한다.
```
