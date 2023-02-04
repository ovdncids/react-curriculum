# Zustand members
* https://github.com/pmndrs/zustand

## Members Store 만들기

### 설치
```sh
npm install zustand
```

### Members Store 생성
src/stores/membersStore.js
```js
import { create } from 'zustand';

export const membersStore = create((set) => ({
  members: [],
  member: {
    name: '',
    age: ''
  }
}));
```

## Members Component Store inject
src/components/contents/Members.js
```js
import { membersStore } from '../../stores/membersStore.js';

function Members() {
  const member = membersStore((state) => state.member);
  const members = membersStore((state) => state.members);
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
src/stores/membersStore.js
```js
memberSet: (member) => {
  set(() => ({ member }));
},
membersCreate: (member) => {
  set((state) => {
    state.members.push(member);
    return {
      members: [...state.members]
    };
  });
}
```
* `전개 구조` 설명 하기

src/components/contents/Members.js
```js
const memberSet = membersStore((state) => state.memberSet);
const membersCreate = membersStore((state) => state.membersCreate);
```
```js
<input
  type="text" placeholder="Name" value={member.name}
  onChange={event => {
    member.name = event.target.value;
    memberSet(member);
  }}
/>
<input
  type="text" placeholder="Age" value={member.age}
  onChange={event => {
    member.age = event.target.value;
    memberSet(member);
  }}
/>
<button onClick={() => {
  membersCreate(member);
}}>Create</button>
```

### Read
src/stores/membersStore.js
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
      members: [...state.members]
    };
  });
}
```

src/components/contents/Members.js
```js
import { useEffect } from 'react';

const membersRead = membersStore((state) => state.membersRead);
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
src/stores/membersStore.js
```js
membersDelete: (index) => {
  set((state) => {
    state.members.splice(index, 1);
    return {
      members: [...state.members]
    };
  });
}
```

src/components/contents/Members.js
```js
const membersDelete = membersStore((state) => state.membersDelete);
```
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  membersDelete(index);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

### Update
src/stores/membersStore.js
```js
membersSet: (members) => {
  set(() => ({ members }));
},
membersUpdate: (index, member) => {
  set((state) => {
    state.members[index] = member;
    return {
      members: [...state.members]
    };
  });
}
```

src/components/contents/Members.js
```diff
- const members = membersStore((state) => state.members);
const members = JSON.parse(JSON.stringify(membersStore((state) => state.members)));
const membersUpdate = membersStore((state) => state.membersUpdate);
```
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
      membersSet(members);
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={member.age}
    onChange={event => {
      member.age = event.target.value;
      membersSet(members);
    }}
  />
</td>
<td>
  <button onClick={() => {
    membersUpdate(index, member);
  }}>Update</button>
  <button onClick={() => {
    membersDelete(index);
  }}>Delete</button>
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
src/stores/membersStore.js
```js
import { atom, selector } from 'recoil';
import axios from 'axios';
import { axiosError } from './common.js';

export const memberState = atom({
  key: 'memberState',
  default: {
    name: '',
    age: ''
  }
});

export const membersState = atom({
  key: 'membersState',
  default: []
});

export const membersService = {
  create: async (member) => {
    try {
      const response = await axios.post('http://localhost:3100/api/v1/members', member);
      console.log('Done membersRead', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  },
  read: async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/members');
      console.log('Done membersCreate', response);
      return response.data.members;
    } catch(error) {
      axiosError(error);
    }
  },
  delete: async (index) => {
    try {
      const response = await axios.delete('http://localhost:3100/api/v1/members/' + index);
      console.log('Done membersDelete', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  },
  update: async (index, member) => {
    try {
      const response = await axios.patch('http://localhost:3100/api/v1/members/' + index, member);
      console.log('Done membersUpdate', response);
      return response.data;
    } catch(error) {
      axiosError(error);
    }
  }
};

export const membersRead = selector({
  key: 'membersRead',
  get: membersService.read
});
```

src/components/contents/Members.js
```diff
- import { useRecoilState } from 'recoil';
- import { memberState, membersState } from '../../stores/membersStore.js';
```
```js
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState, membersState, membersRead } from '../../stores/membersStore.js';
```
```js
const _membersRead = useRecoilValue(membersRead);
useEffect(() => {
  setMembers(_membersRead);
}, [setMembers, _membersRead]);
```
* 확인 해보기

index.js
```diff
- <App />
```
```js
<React.Suspense fallback={<div>Loading...</div>}>
  <App />
</React.Suspense>
```

### Create
src/stores/membersStore.js
```js
export const membersCreate = ({set}) => async (member) => {
  await membersService.create(member);
  const members = await membersService.read();
  set(membersState, members)
};
```

src/components/contents/Members.js
```diff
- import { useRecoilState, useRecoilValue } from 'recoil';
- import { memberState, membersState, membersRead } from '../../stores/membersStore.js';
```
```js
import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import { memberState, membersState, membersRead, membersCreate } from '../../stores/membersStore.js';
```
```js
const _membersCreate = useRecoilCallback(membersCreate);
```
```diff
- <button onClick={() => {
-   setMembers(members.concat({
-     ...member
-   }));
- }}>Create</button>
```
```js
<button onClick={() => {
  _membersCreate(member);
}}>Create</button>
```

### Delete
src/stores/membersStore.js
```js
export const membersDelete = ({set}) => async (index) => {
  await membersService.delete(index);
  const members = await membersService.read();
  set(membersState, members)
};
```

src/components/contents/Members.js
```diff
- import { memberState, membersState, membersRead, membersCreate } from '../../stores/membersStore.js';
+ import { memberState, membersState, membersRead, membersCreate, membersDelete } from '../../stores/membersStore.js';
```
```js
const _membersDelete = useRecoilCallback(membersDelete);
```
```diff
- <button onClick={() => {
-   members.splice(index, 1);
-   setMembers(members);
- }}>Delete</button>
```
```js
<button onClick={() => {
  _membersDelete(index);
}}>Delete</button>
```

### Update
src/stores/membersStore.js
```js
export const membersUpdate = ({set}) => async (index, member) => {
  await membersService.update(index, member);
  const members = await membersService.read();
  set(membersState, members)
};
```

src/components/contents/Members.js
```diff
- import { memberState, membersState, membersRead, membersCreate, membersDelete } from '../../stores/membersStore.js';
+ import { memberState, membersState, membersRead, membersCreate, membersDelete, membersUpdate } from '../../stores/membersStore.js';
```
```js
const _membersUpdate = useRecoilCallback(membersUpdate);
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  _membersUpdate(index, member);
}}>Update</button>
```
