# Signals (@preact/signals-react@3.3.0)
* https://github.com/preactjs/signals
* `useState`, `Store`의 변화는 컴포넌트 전체가 리렌더링 되는데, `Signals`는 `리렌더링`해야 하는 부분만 신경써서 코딩 해야한다.
* 렌더링 방지 목적의 `useMemo`, `useCallback` 등을 사용할 필요가 없어지고, `useEffect`의 의존성이 약화되어 `더 이해하기 쉬운 코딩`이 가능하다.

## 결론
* `Signals`의 `useComputed`는 `리렌더링`해야 하는 부분을 감싸고, `useMemo`는 `리렌더링`하지 말아야 할 부분을 감싼다.
* `useState`, `Store`등의 `리렌더링`를 도구를 사용하지 않고, `Signals`의 `리렌더링` 방식으로 프로젝트가 가능하다.
* `Vue.js`나 `Svelte`와 구조가 비슷해지는 느낌이다.

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
* ❕ `{s.value}`는 `1.3.8 버전`까지 Re render 지원했지만, `2 버전`부터는 지원안하고 `computed`가 권장됨

### effect, batch
```jsx
import { signal, effect, batch } from '@preact/signals-react';

const s = signal(0);
effect(() => {
  console.log(s.value);
  // s.value = s.peek() + 1;
});
// `effect() 함수`를 호출하면 `effect 안의 익명 함수`도 내부적 의존성을 추적하기 위해 즉시 호출 시킨다.
// `s.value`는 읽기이므로 의존성이 추적된다. `s.value`가 변할때 마다 `effect 안의 익명 함수`가 다시 호출 된다.
// `s.value = 1;`는 쓰기이므로 의존성이 추적되지 않는다.
// `s.value = s.value + 1` 이렇게 사용하면 `s.value`을 읽었으므로 추적되지만
// `s.value = s.peek() + 1` 이렇게 사용하면 `peek` 함수가 `s.value`의 읽기를 회피할 수 있다.
// `peek` 함수는 `effect` 함수에서만 사용하면 된다.
s.value++;
s.value++;
batch(() => {
  s.value++;
  s.value++;
});
// `effect 안의 익명 함수`에서 `0, 1, 2, 4` 이렇게 출력한다.
// `batch` 함수는 여러번의 수정을 모아서 한번만 `effect 안의 익명 함수`를 호출한다.
```

### Component with effect
```jsx
import { signal, effect } from '@preact/signals-react';

const s = signal(null);
effect(async () => {
  console.log(s.value);
  if (s.value === null) return;
  // `s.value`를 Component에서 값을 초기화 후에 `API 통신`등을 호출 해야 하는 경우
  console.log('API 통신');
  // s.value = await axios.get('');
});

export default function Component() {
  s.value = 1;
  return <div>{s}</div>;
}
```
* ❕ `useEffect`는 `Signals 라이브러리` 안에 없다.

### Component with useComputed
```jsx
import { signal, useComputed } from '@preact/signals-react';

const s = signal(null);

export default function Component() {
  s.value = true;
  const c = useComputed(() => s.value ? 'true' : 'false');
  return (
    <div className={c}>{/* 리렌더링 안된다. className={c} 속성은 문자로만 받기때문에 추적할 수 없다. */}
      {useComputed(() => (
        <button
          className={c.value}
          onClick={() => s.value = !s.value}
        >
          {s.value ? 'true' : 'false'}
        </button>
      ))}
    </div>
  );
}
```
* `useComputed`는 `use`로 시작하므로 컴포넌트 안에서 사용하는 `Hook 함수`이다.
* ❕ `useComputed` 안에서 `className={c}`로 사용하면 `리렌더링` 되지 않는다. `useComputed` 안에서 `{c}`의 사용을 피하자.

### Component with useSignalEffect
* `useSignalEffect` 함수는 `s.value`가 변경되면 실행된다. 필요할때 찾아보자.

<!--
```jsx
import { signal, useSignalEffect } from '@preact/signals-react';

const s = signal(0);

export default function Component() {
  useSignalEffect(() => {
    console.log(s.value);
    // s.value의 값이 변하면 실행됨
  });
  return (
    <button onClick={() => s.value += 1}>{s}</button>
  );
}
```
-->
