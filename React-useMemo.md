# useMemo
https://www.daleseo.com/react-hooks-use-memo

* 부모 컴포넌트가 redering 되어 자식까지 redering 되는 경우, 자식에서 사용되는 일정 부분의 함수를 다시 실행하지 않기

## useMemo 사용전
index.js
```js
import { useState } from 'react';

function Users(props) {
  const fUsers = () => {
    console.log('fUsers');
    return props.users;
  };
  const cUsers = fUsers();
  return (
    <div>
    {cUsers.map((user, index) => (
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
        onChange={event => setUser(event.target.value)}
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

- const cUsers = fUsers();
+ const cUsers = useMemo(fUsers, [props.users]);
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
