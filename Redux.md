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
    }]
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

## 컴포넌트에서 확인
src/App.js
```js
import { useSelector, useDispatch } from 'react-redux';
import { stateMembers, actionsMembers } from './store/members/membersSlice.js';

function App() {
  const { members } = useSelector(stateMembers);
  const dispatch = useDispatch();
  console.log(members);
```
```js
<button onClick={() => dispatch(actionsMembers.membersUpdate([{
  name: '이순신',
  age: 30
}]))}>Update {members[0].name}: {members[0].age}</button>
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

# Redux Thunk
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
src/store/membersActions.js
```js
import { actionsMembers } from './membersSlice.js';

const actions = {
  membersUpdate: () => (dispatch) => {
    dispatch(actionsMembers.membersUpdate([{
      name: '김유신',
      age: 40
    }]));
  }
};

export default actions;
```

## Redux에서 Members Actions으로 액션 수정하기
src/App.js
```diff
- import { stateMembers, actionsMembers } from './store/membersSlice.js';
```
```js
import { stateMembers } from './store/members/membersSlice.js';
import actionsMembers from './store/members/membersActions.js';

dispatch(actionsMembers.membersUpdate())
```

# Redux Saga
Redux Saga, Redux thunk 중 하나를 사용하면 된다. Redux thunk 보다 기능이 더 많다.

## 설치
```sh
npm install redux-saga
```

## Members Actions 미들웨어 만들기
src/store/membersActions.js
```js
import { put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { actionsMembers } from './membersSlice.js';

export const membersUpdate = createAction('membersUpdate', payload => { return { payload: payload } });

export function* takeEveryMembers() {
  yield takeEvery(membersUpdate, function* () {
    yield put(actionsMembers.membersUpdate([{
      name: '김유신',
      age: 40
    }]))
  });
}

const actions = {
  membersUpdate
}

export default actions;
```

## Redux Saga 등록
src/store.js
```js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'
import membersReducer from './store/members/membersSlice.js';
import { takeEveryMembers } from './store/members/membersActions.js';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    members: membersReducer
  },
  middleware : [ sagaMiddleware ]
});

sagaMiddleware.run(function* () {
  yield all([takeEveryMembers()]);
});
```

## Redux에서 Members Actions으로 액션 수정하기
src/App.js
```diff
- import { stateMembers, actionsMembers } from './store/membersSlice.js';
```
```js
import { stateMembers } from './store/members/membersSlice.js';
import actionsMembers from './store/members/membersActions.js';

dispatch(actionsMembers.membersUpdate())
```

## Members Actions 미들웨어에서 통신 하기
```sh
npm install axios
```

src/store/membersActions.js
```diff
- import { put, takeEvery } from 'redux-saga/effects';
```
```js
import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
```
```diff
- yield put(actionsMembers.membersUpdate([{
-   name: '김유신',
-   age: 40
- }]))
```
```js
try {
  const response = yield call(() => axios.get('http://localhost:3100/api/v1/members'));
  yield put(actionsMembers.membersUpdate(response.data.members));
} catch(error) {
  console.error(error.message);
}
```
