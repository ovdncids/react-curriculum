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
