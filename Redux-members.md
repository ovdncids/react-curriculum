# Redux members

## Members Store 만들기

### 설치
```sh
npm install react-redux @reduxjs/toolkit
```

### 상대 경로 절대 경로로 수정하기
jsconfig.json
```json
{
  "compilerOptions": {
      "baseUrl": "src"
  },
  "include": [
      "src"
  ]
}
```

### Members 리듀서 생성
src/store/members/membersSlice.js
```js
import { createSlice } from '@reduxjs/toolkit';

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    member: {
      name: '',
      age: ''
    }
  },
  reducers: {
    memberSet: (state, action) => {
      state.member = action.payload;
    },
    membersCreate: (state) => {
      state.members.push(state.member);
    }
  },
});

export const stateMembers = state => state.members;
export const actionsMembers = membersSlice.actions;

export default membersSlice.reducer;
```

## Members 리듀서 등록
src/store.js
```js
import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './store/members/membersSlice.js';

export default configureStore({
  reducer: {
    members: membersReducer
  }
});
```

## 스토어를 Provider에 등록
src/index.js
```js
import { Provider } from 'react-redux';
import store from './store.js';
```
```diff
- <App />
```
```js
<Provider store={store}>
  <App />
</Provider>
```


## Members Conpenent Store inject & observer
src/components/contents/Members.js
```js
import { useSelector, useDispatch } from 'react-redux';
import { stateMembers, actionsMembers } from '../../store/members/membersSlice.js';

function Members() {
  const dispatch = useDispatch();
  const member = {...useSelector(stateMembers).member};
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
        <input
          type="text" placeholder="Name" value={member.name}
          onChange={event => {member.name = event.target.value; dispatch(actionsMembers.memberSet(member))}}
        />
        <input
          type="text" placeholder="Age" value={member.age}
          onChange={event => {member.age = event.target.value; dispatch(actionsMembers.memberSet(member))}}
        />
        <button onClick={() => dispatch(actionsMembers.membersCreate(member))}>Create</button>
      </div>
    </div>
  )
}

export default Members;
```

## Members Store CRUD
### Read
src/stores/MembersStore.js
```js
membersRead: (state) => {
  state.members.push([{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }]);
}
```

src/components/contents/Members.js
```js
import { useEffect } from 'react';

function Members() {
  const members = JSON.parse(JSON.stringify(useSelector(stateMembers).members));
  useEffect(() => {
    dispatch(actionsMembers.membersRead())
  }, [dispatch]);
```
```diff
- <tr>
-   <td>홍길동</td>
-   <td>20</td>
```
```js
{members.map((member, index) => (
  <tr key={index}>
    <td>{member.name}</td>
    <td>{member.age}</td>
    ...
  </tr>
))}
```

### Update
src/stores/MembersStore.js
```js
membersUpdate: (state, action) => {
  state.members[action.payload.index] = action.payload.member;
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
    onChange={event => {member.name = event.target.value; dispatch(actionsMembers.membersSet(members))}}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={member.age}
    onChange={event => {member.age = event.target.value; dispatch(actionsMembers.membersSet(members))}}
  />
</td>
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => dispatch(actionsMembers.membersUpdate({index, member}))}>Update</button>
```

### Delete
src/stores/MembersStore.js
```js
membersDelete(state, action) {
  state.members.splice(action.payload.index, 1);
}
```


src/components/contents/Members.js
```diff
<button>Delete</button>
```
```js
<button onClick={() => dispatch(actionsMembers.membersDelete(index))}>Delete</button>
```
