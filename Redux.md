# Redux

## 설치
```sh
npm install react-redux @reduxjs/toolkit
```

### Members 리듀서 생성
src/store/members/membersSlice.js
```js
import { createSlice } from '@reduxjs/toolkit';

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [{
      name: '홍길동',
      age: 20
    }, {
      name: '춘향이',
      age: 16
    }],
    member: 'abc'
  },
  reducers: {
    membersUpdate: (state, action) => {
      state.members = action.payload;
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
import membersReducer from './store/membersSlice';

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

## 컴포넌트에서 확인
src/App.js
```js
import { useSelector, useDispatch } from 'react-redux';
import { stateMembers, actionsMembers } from './store/membersSlice';

function App() {
  const { members } = useSelector(stateMembers);
  const dispatch = useDispatch();
  console.log(members);
```
```js
<button onClick={() => dispatch(actionsMembers.membersUpdate([{
  name: '이순신',
  age: 30
}]))}>Update</button>
 ```
