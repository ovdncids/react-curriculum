# useMemo
https://www.daleseo.com/react-hooks-use-memo

* 부모 컴포넌트가 redering 되어 자식까지 redering 되는 경우, 자식에서 사용되는 일정 부분의 함수를 다시 실행하지 않기

## useMemo 사용전
index.js
```js
import { useState } from 'react';

function App() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState('');
  return (
    <div>
      <Members members={members}></Members>
      <input
        type="text" placeholder="Member" value={member}
        onChange={event => setMember(event.target.value)}
      />
      <button onClick={() => setMembers([...members, member])}>Create</button>
    </div>
  );
}

function Members(props) {
  const fMembers = () => {
    console.log('fMembers');
    return props.members;
  };
  const cMembers = fMembers();
  return (
    <div>
    {cMembers.map((member, index) => (
      <div key={index}>{member}</div>
    ))}
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

- const cMembers = fMembers();
+ const cMembers = useMemo(fMembers, [props.members]);
```

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
