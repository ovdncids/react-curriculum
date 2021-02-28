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
    membersCreate: (state, action) => {
      state.members.push(action.payload);
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
import { stateMembers, actionsMembers } from 'store/members/membersSlice.js';

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
src/stores/members/MembersStore.js
```js
membersRead: (state) => {
  state.members.push({
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  });
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
src/stores/members/MembersStore.js
```js
membersSet: (state, action) => {
  state.members = action.payload;
},
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
src/stores/members/MembersStore.js
```js
membersDelete(state, action) {
  state.members.splice(action.payload, 1);
}
```

src/components/contents/Members.js
```diff
<button>Delete</button>
```
```js
<button onClick={() => dispatch(actionsMembers.membersDelete(index))}>Delete</button>
```

## Redux Thunk 액션 만들기
dispatch로 리덕스의 state 값을 수정 하기 전에 실행될 함수를 사용하게 해준다. 주로 통신  컴포넌트에서 빼기 위해 사용한다.

## 설치
```sh
npm install redux-thunk
```

## Redux Thunk 등록
src/store.js
```js
import ReduxThunk from 'redux-thunk';

export default configureStore({
  middleware: [
    ReduxThunk
  ]
```

## Members Actions 미들웨어 만들기
src/store/members/membersActions.js
```js
import { actionsMembers } from './membersSlice.js';

const actions = {
  memberSet: payload => (dispatch) => {
    dispatch(actionsMembers.memberSet(payload));
  },
  membersSet: payload => (dispatch) => {
    dispatch(actionsMembers.membersSet(payload));
  },
  membersCreate: payload => (dispatch) => {
    dispatch(actionsMembers.membersCreate(payload));
  },
  membersRead: () => (dispatch) => {
    dispatch(actionsMembers.membersRead());
  },
  membersUpdate: payload => (dispatch) => {
    dispatch(actionsMembers.membersCreate(payload));
  },
  membersDelete: payload => (dispatch) => {
    dispatch(actionsMembers.membersDelete(payload));
  }
};

export default actions;
```

## Redux에서 Members Actions으로 액션 수정하기
src/stores/members/MembersStore.js
```diff
- import { stateMembers, actionsMembers } from 'store/members/membersSlice.js';
```
```js
import { stateMembers } from 'store/members/membersSlice.js';
import actionsMembers from 'store/members/membersActions.js';
```
