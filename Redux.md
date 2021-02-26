# Redux

**Store 개념 설명**

Component가 사용하는 글로벌 함수 또는 변수라고 생각하면 쉽다, state 값이 변하면 해당 값을 바라 보는 모든 Component가 수정 된다.

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

## state 주의 사항
src/App.js
```js
members[0] = {
  name: '박지삼',
  age: 40
};
dispatch(actionsMembers.membersUpdate([{
  name: '이순신',
  age: 30
}]));
// dispatch 전에 리덕스의 state 값이 바뀐다면 dispatch 할때 오류가 발생한다.
// 따라서 리덕스의 state 값은 꼭 dispatch에서만 변경 해야 한다.
```
