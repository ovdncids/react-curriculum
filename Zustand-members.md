# Zustand members
* https://github.com/pmndrs/zustand

## Members Store 만들기

### 설치
```sh
npm install zustand
```

### Members Store 생성
src/stores/MembersStore.js
```js
import { create } from 'zustand';

const MembersStore = create((set) => ({
  members: [],
  member: {
    name: '',
    age: ''
  }
}));

export default MembersStore;
```

## Members Component Store inject
src/components/contents/Members.js
```js
import MembersStore from '../../stores/MembersStore.js';

function Members() {
  const membersStore = MembersStore((state) => state);
  const member = membersStore.member;
  const members = membersStore.members;
  console.log(member, members);
  return (
    <div>
      <h3>Members</h3>
      <hr className="d-block" />
      <div>
        <h4>Read</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>20</td>
              <td>
                <button>Update</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="d-block" />
      <div>
        <h4>Create</h4>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Age" />
        <button>Create</button>
      </div>
    </div>
  );
}

export default Members;
```

## Members Store CRUD
### Create
src/stores/MembersStore.js
```js
memberSet: (member) => {
  set(() => ({ member }));
},
membersCreate: (member) => {
  set((state) => {
    state.members.push({
      ...member
    });
    return {
      members: state.members
    };
  });
}
```
* `전개 구조` 설명 하기

### Zustand 특징
* `useState`와 다르게 동일한 객체를 `set` 해도 랜더링 가능
* `redux`와 다르게 `state`가 readonly 아님, 하지만 렌더링은 무조건 `set` 사용

src/components/contents/Members.js
```js
<input
  type="text" placeholder="Name" value={member.name}
  onChange={event => {
    member.name = event.target.value;
    membersStore.memberSet(member);
  }}
/>
<input
  type="text" placeholder="Age" value={member.age}
  onChange={event => {
    member.age = event.target.value;
    membersStore.memberSet(member);
  }}
/>
<button onClick={() => {
  membersStore.membersCreate(member);
}}>Create</button>
```

### Read
src/stores/MembersStore.js
```js
membersRead: () => {
  set((state) => {
    state.members.push({
      name: '홍길동',
      age: 20
    }, {
      name: '춘향이',
      age: 16
    });
    return {
      members: state.members
    };
  });
}
```

src/components/contents/Members.js
```js
import { useEffect } from 'react';

const memberSet = membersStore.memberSet;
const membersRead = membersStore.membersRead;
useEffect(() => {
  memberSet({
    name: '',
    age: ''
  });
  membersRead();
}, [memberSet, membersRead]);
```

```diff
- <tr>
-   <td>홍길동</td>
-   <td>20</td>
-   <td>
-     <button>Update</button>
-     <button>Delete</button>
-   </td>
- </tr>
```
```js
{members.map((member, index) => (
  <tr key={index}>
    <td>{member.name}</td>
    <td>{member.age}</td>
    <td>
      <button>Update</button>
      <button>Delete</button>
    </td>
  </tr>
))}
```

### Delete
src/stores/MembersStore.js
```js
membersDelete: (index) => {
  set((state) => {
    state.members.splice(index, 1);
    return {
      members: state.members
    };
  });
}
```

src/components/contents/Members.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  membersDelete.membersDelete(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

### Update
src/stores/MembersStore.js
```js
membersSet: (members) => {
  set(() => ({ members }));
},
membersUpdate: (index, member) => {
  set((state) => {
    state.members[index] = member;
    return {
      members: state.members
    };
  });
}
```

src/components/contents/Members.js
```diff
- <td>{member.name}</td>
- <td>{member.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={member.name}
    onChange={event => {
      member.name = event.target.value;
      membersStore.membersSet(members);
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={member.age}
    onChange={event => {
      member.age = event.target.value;
      membersStore.membersSet(members);
    }}
  />
</td>
```
* `Input box` 수정 해보기

```diff
- <button>Update</button>
<button onClick={() => {
  membersUpdate(index, member);
}}>Update</button>
```

## Backend Server
* [Download](https://github.com/ovdncids/vue-curriculum/raw/master/download/express-server.zip)
```sh
# BE 서버 실행 방법
npm install
node index.js
# 터미널 종료
Ctrl + c
```

## Axios 서버 연동
https://github.com/axios/axios
```sh
npm install axios
```

### Axios common 에러 처리
src/stores/common.js
```js
export const axiosError = (error) => {
  console.error(error.response || error.message || error);
};
```

### Read
src/stores/MembersStore.js
```js
import axios from 'axios';
import { axiosError } from './common.js';
```
```diff
- membersRead: () => {
```
```js
membersRead: async () => {
  try {
    const response = await axios.get('http://localhost:3100/api/v1/members');
    console.log('Done membersRead', response);
    set({ members: response.data.members });
  } catch(error) {
    axiosError(error);
  }
},
```

### Create
src/stores/MembersStore.js
```diff
- const MembersStore = create((set) => ({
const MembersStore = create((set, get) => ({
```
```diff
- membersCreate: (member) => {
```
```js
membersCreate: async (member) => {
  try {
    const response = await axios.post('http://localhost:3100/api/v1/members', member);
    console.log('Done membersCreate', response);
    get().membersRead();
  } catch(error) {
    axiosError(error);
  }
},
```

### Delete
src/stores/MembersStore.js
```diff
- membersDelete: (index) => {
```
```js
membersDelete: async (index) => {
  try {
    const response = await axios.delete('http://localhost:3100/api/v1/members/' + index);
    console.log('Done membersDelete', response);
    get().membersRead();
  } catch(error) {
    axiosError(error);
  }
},
```

### Update
src/stores/MembersStore.js
```diff
- membersUpdate: async (index, member) => {
```
```js
membersUpdate: async (index, member) => {
  try {
    const response = await axios.patch('http://localhost:3100/api/v1/members/' + index, member);
    console.log('Done membersUpdate', response);
    get().membersRead();
  } catch(error) {
    axiosError(error);
  }
}
```
