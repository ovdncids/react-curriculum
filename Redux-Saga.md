# Redux Saga

## Redux Saga 설치 (1.5.1)
```sh
npm install redux-saga
```

## Users Saga 미들웨어 만들기
src/store/users/usersSaga.js
```js
import { createAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { usersActions } from './usersSlice.js';

export const usersCreate = createAction('usersCreate', (payload) => {return { payload: payload }});
export const usersRead = createAction('usersRead', () => {return { payload: undefined }});
export const usersDelete = createAction('usersDelete', (payload) => {return { payload: payload }});
export const usersUpdate = createAction('usersUpdate', (payload) => {return { payload: payload }});

export function* usersTakeEvery() {
  yield takeEvery(usersCreate, function* (action) {
    yield put(usersActions.usersCreate(action.payload));
  });

  const usersRead$ = function* () {
    yield put(usersActions.usersRead());
  };
  yield takeEvery(usersRead, usersRead$);

  yield takeEvery(usersDelete, function* (action) {
    yield put(usersActions.usersDelete(action.payload));
  });

  yield takeEvery(usersUpdate, function* (action) {
    yield put(usersActions.usersUpdate(action.payload));
  });
}

export const usersSaga = {
  usersCreate,
  usersRead,
  usersDelete,
  usersUpdate
};
```
* `function*`: `Generator function` 설명
* [function*](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
* `put`: 리듀서의 action을 호출함
* `takeEvery`: 컴포넌트에서 호출할 수 있는 `미들웨어` 함수 등록

## Redux Saga 등록
src/store/index.js (덮어 씌우기)
```js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'
import { usersTakeEvery } from './users/usersSaga.js';
import usersReducer from './users/usersSlice.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    $users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false,  // Thunk는 끄기
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(function* () {
  yield all([usersTakeEvery()]);
});

export const useAppDispatch = () => useDispatch();
export default store;
```

## Redux에서 Users Saga로 액션 수정하기
src/pages/Users.js
```js
import { usersSaga } from '@/store/users/usersSaga.js';
```
```diff
- dispatch(usersActions.usersRead());
+ dispatch(usersSaga.usersRead());
```
```diff
- <button onClick={() => dispatch(usersActions.usersUpdate({index, user}))}>Update</button>
- <button onClick={() => dispatch(usersActions.usersDelete(index))}>Delete</button>
+ <button onClick={() => dispatch(usersSaga.usersUpdate({index, user}))}>Update</button>
+ <button onClick={() => dispatch(usersSaga.usersDelete(index))}>Delete</button>
```
```diff
- <button onClick={() => dispatch(usersActions.usersCreate(user))}>Create</button>
+ <button onClick={() => dispatch(usersSaga.usersCreate(user))}>Create</button>
```

## Backend Server
* [Axios 서버 연동](BackendServer.md)

### Read
src/store/users/usersSaga.js
```diff
- import { put, takeEvery } from 'redux-saga/effects';
+ import { put, takeEvery, call } from 'redux-saga/effects';
```
```js
import axios from 'axios';
```
```diff
const usersRead$ = function* () {
- yield put(usersActions.usersRead());
```
```js
const response = yield call(() => axios.get('http://localhost:3100/api/v1/users'));
console.log('Done usersRead', response);
yield put(usersActions.usersSet(response.data.users));
```
* <details><summary>TS: response</summary>

  ```ts
  const response: AxiosResponse<{ users: User[] }> = yield call(() => axios.get('http://localhost:3100/api/v1/users'));
  ```
</details>

### Create
src/store/users/usersActions.js
```diff
yield takeEvery(usersCreate, function* (action) {
- yield put(usersActions.usersCreate(action.payload))
```
```js
const response = yield call(() => axios.post('http://localhost:3100/api/v1/users', action.payload));
console.log('Done usersCreate', response);
yield usersRead$();
```

* <details><summary>TS: response</summary>

  ```ts
  const response: AxiosResponse
  ```
</details>


### Delete
src/store/users/usersActions.js
```diff
yield takeEvery(usersDelete, function* (action) {
- yield put(usersActions.usersDelete(action.payload));
````
```js
const response = yield call(() => axios.delete('http://localhost:3100/api/v1/users/' + action.payload));
console.log('Done usersUpdate', response);
yield usersRead$();
```

### Update
src/store/users/usersActions.js
```diff
yield takeEvery(usersUpdate, function* (action) {
- yield put(usersActions.usersUpdate(action.payload));
```
```js
const response = yield call(() => axios.patch('http://localhost:3100/api/v1/users/' + action.payload.index, action.payload.user));
console.log('Done usersUpdate', response);
yield usersRead$();
```

### 불필요한 리듀서 삭제
src/store/users/usersSlice.js
```diff
- usersCreate: (state, action) => {
-   state.users.push(action.payload);
- },
- usersRead: (state) => {
-   state.users.push({
-     name: '홍길동',
-     age: 20
-   }, {
-     name: '춘향이',
-     age: 16
-   });
- },
- usersDelete(state, action) {
-   state.users.splice(action.payload, 1);
- },
- usersUpdate: (state, action) => {
-   state.users[action.payload.index] = action.payload.user;
- }
```

## Search
### Search Saga 만들기
src/store/search/searchSaga.js
```js
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { usersActions } from '@/store/users/usersSlice.js';

export const searchRead = createAction('searchRead', payload => {return {payload: payload}});

export function* searchTakeEvery() {
  yield takeEvery(searchRead, function* (action) {
    const response = yield call(() => axios.get('http://localhost:3100/api/v1/search?q=' + action.payload));
    console.log('Done searchRead', response);
    yield put(usersActions.usersSet(response.data.users));
  });
}

export const searchSaga = {
  searchRead
};
```

### Search Saga을 Redux에 등록
src/store/index.js
```js
import { searchTakeEvery } from './search/searchSaga.js';
```
```diff
- yield all([usersTakeEvery()]);
+ yield all([usersTakeEvery(), searchTakeEvery()]);
```

### [Search Component Redux Store 주입](Redux.md#search-component-redux-store-%EC%A3%BC%EC%9E%85)
