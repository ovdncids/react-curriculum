# Redux users
* https://redux-toolkit.js.org

## Redux Tookit 설치 (react-redux@9.3.0, @reduxjs/toolkit@2.12.0)
```sh
npm install react-redux @reduxjs/toolkit
```

## Users 리듀서 생성
src/store/users/usersSlice.js
```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: {
    name: '',
    age: '',
  }
};

export const usersSlice = createSlice({
  name: '$users',
  initialState,
  reducers: {}
});

export const usersState = (state) => state.$users;
export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
```
* <details><summary>TS: (state: UsersState)</summary>

  ```ts
  export interface User {
    name: string
    age: string | number
  }
  
  interface UsersState {
    users: User[]
    user: User
  }
  
  const initialState: UsersState = {

  export const usersState = (state: { $users: UsersState }) => state.$users;
  ```
</details>

## Users 리듀서 등록
src/store/index.js
```js
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice.js';

const store = configureStore({
  reducer: {
    $users: usersReducer
  }
});

export const useAppDispatch = () => useDispatch();
export default store;
```

## 스토어를 Provider에 등록
src/index.js
```js
import { Provider } from 'react-redux';
import store from './store';
```
```diff
- <App />
```
```js
<Provider store={store}>
  <App />
</Provider>
```

### Users Component Redux Store 주입
src/pages/Users.js
```js
import { useSelector } from 'react-redux';
import { usersState } from '../store/users/usersSlice.js';

function Users() {
  const user = useSelector(usersState).user;
  console.log(user);
  return (
    <div>
      <h3>Users</h3>
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

export default Users;
```

### 상대 경로 절대 경로로 수정하기
* [Alias](ESLint_Prettier_Alias.md#alias)

**Redux DevTools 설치**

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

## Users Store CRUD
### Create
src/store/users/usersSlice.js
```js
reducers: {
  userSet: (state, action) => {
    state.user = action.payload;
  },
  usersCreate: (state, action) => {
    state.users.push(action.payload);
  }
}
```

src/pages/Users.js
```diff
- import { usersState } from '@/store/users/usersSlice.js';

- function Users() {
```
```js
import { useAppDispatch } from '@/store'
import { usersState, usersActions } from '@/store/users/usersSlice.js';

function Users() {
  const dispatch = useAppDispatch();
```
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={(event) => {
    dispatch(usersActions.userSet({
      ...user,
      name: event.target.value
    }));
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={(event) => {
    dispatch(usersActions.userSet({
      ...user,
      age: event.target.value
    }));
  }}
/>
<button onClick={() => dispatch(usersActions.usersCreate(user))}>Create</button>
```

### Read
src/store/users/usersSlice.js
```js
usersRead: (state) => {
  state.users.push({
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  });
}
```

src/pages/Users.js
```js
import { useEffect } from 'react';

function Users() {
  ...
  const users = useSelector(usersState).users;
  useEffect(() => {
    dispatch(usersActions.userSet({
      name: '',
      age: ''
    }));
    dispatch(usersActions.usersRead());
  }, [dispatch]);
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
{users.map((user, index) => (
  <tr key={index}>
    <td>{user.name}</td>
    <td>{user.age}</td>
    <td>
      <button>Update</button>
      <button>Delete</button>
    </td>
  </tr>
))}
```

### Delete
src/store/users/usersSlice.js
```js
usersDelete(state, action) {
  state.users.splice(action.payload, 1);
}
```

src/pages/Users.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => dispatch(usersActions.usersDelete(index))}>Delete</button>
```

### Update
src/store/users/usersSlice.js
```js
usersSet: (state, action) => {
  state.users = action.payload;
},
usersUpdate: (state, action) => {
  state.users[action.payload.index] = action.payload.user;
}
```

src/pages/Users.js
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={(event) => {
      dispatch(usersActions.usersSet(
        users.map((user, i) => i === index ? { ...user, name: event.target.value } : user)
      ));
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={(event) => {
      dispatch(usersActions.usersSet(
        users.map((user, i) => i === index ? { ...user, age: event.target.value } : user)
      ));
    }}
  />
</td>
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => dispatch(usersActions.usersUpdate({index, user}))}>Update</button>
```

## 스토어 state 주의 사항
src/pages/Users.js
```diff
- dispatch(usersActions.usersSet(
-   users.map((user, i) => i === index ? { ...user, name: event.target.value } : user)
- ));
```
```js
user.name = event.target.value;
dispatch(usersActions.usersSet(users));
// dispatch 전에 리덕스의 state 값이 바뀐다면 dispatch 할때 오류가 발생한다.
// 따라서 리덕스의 state 값은 꼭 dispatch에서만 변경해야 한다.
```

## 비동기 액션 만들기
dispatch로 리덕스의 state 값을 수정 하기 전에 호출될 함수를 사용하게 해준다. 주로 통신을 컴포넌트에서 빼기 위해 사용한다.

### 비동기 액션을 만드는 이유
```diff
- state.users.push(action.payload)
```
```js
setTimeout(() => {
  state.users.push(action.payload);
  // 오류 발생
}, 1000);
```

* `setTimeout`, `Promise`등으로 `진행 쓰레드`가 변경되는 경우 Redux에서 에러를 발생 시키므로 이를 피하기 위해 사용한다.

### Redux Thunk VS Redux Saga
Redux Toolkit Thunk: 설정도 없고, 간단 하고 쉽게 만들 수 있다.

Redux Saga: 설정이 복잡하지만 다양한 기능을 사용할 수 있다. 다양한 기능을 사용하기 위한 러닝 커브가 크다.

# Redux Toolkit Thunk (추천)

* https://redux-toolkit.js.org/api/createAsyncThunk

## Users Thunk 미들웨어 만들기
src/store/users/usersThunks.js
```js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from './usersSlice.js';

export const usersThunks = {
  usersCreate: createAsyncThunk(
    'usersCreate',
    (user, thunkAPI) => {
      thunkAPI.dispatch(usersActions.usersCreate(user));
    }
  ),
  usersRead: createAsyncThunk(
    'usersRead',
    (_payload, thunkAPI) => {
      thunkAPI.dispatch(usersActions.usersRead());
    }
  ),
  usersDelete: createAsyncThunk(
    'usersDelete',
    (index, thunkAPI) => {
      thunkAPI.dispatch(usersActions.usersDelete(index));
    }
  ),
  usersUpdate: createAsyncThunk(
    'usersUpdate',
    (payload, thunkAPI) => {
      thunkAPI.dispatch(usersActions.usersUpdate(payload));
    }
  )
};
```

## Redux에서 Users Thunk로 액션 수정하기
src/pages/Users.js
```js
import { usersThunks } from '@/store/users/usersThunks.js';
```
```diff
- dispatch(usersActions.usersRead());
+ dispatch(usersThunks.usersRead());
```
```diff
- <button onClick={() => dispatch(usersActions.usersUpdate({index, user}))}>Update</button>
- <button onClick={() => dispatch(usersActions.usersDelete(index))}>Delete</button>
+ <button onClick={() => dispatch(usersThunks.usersUpdate({index, user}))}>Update</button>
+ <button onClick={() => dispatch(usersThunks.usersDelete(index))}>Delete</button>
```
```diff
- <button onClick={() => dispatch(usersActions.usersCreate(user))}>Create</button>
+ <button onClick={() => dispatch(usersThunks.usersCreate(user))}>Create</button>
```

### Typescript 오류
#### Argument of type 'AsyncThunkAction<void, void, AsyncThunkConfig>' is not assignable to parameter of type 'UnknownAction'.
src/store/index.ts
```diff
- export const useAppDispatch = () => useDispatch()
+ export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
```

#### Argument of type 'User' is not assignable to parameter of type 'undefined'.
src/store/users/usersThunks.ts
```diff
- usersCreate: createAsyncThunk(
+ usersCreate: createAsyncThunk<void, User>(
# 첫번째 인자는 `return`될 타입을 뜻하고 (현재 함수 안에 return 없음), 두번째 인자 넘겨 받은 타입을 뜻 한다.

- usersDelete: createAsyncThunk(
+ usersDelete: createAsyncThunk<void, number>(

- usersUpdate: createAsyncThunk(
+ usersUpdate: createAsyncThunk<void, { index: number; user: User }>(
```

## Backend Server
* [Axios 서버 연동](BackendServer.md)

### Axios common 에러 처리
src/store/common.js
```js
export const axiosError = function(error) {
  console.error(error.response || error.message || error);
};
```

### Read
src/store/users/usersThunks.js
```js
import axios from 'axios';
import { axiosError } from '../common.js';
```
```diff
- thunkAPI.dispatch(usersActions.usersRead());
```
```js
return axios.get('http://localhost:3100/api/v1/users').then((response) => {
  console.log('Done usersRead', response);
  // thunkAPI.dispatch(usersActions.usersSet(response.data.users));
  return response.data.users;
}).catch((error) => {
  axiosError(error);
});
```
```js
reducers: {
  ...
},
extraReducers: (builder) => {
  // builder.addCase('usersRead/fulfilled', (state, action) => {
  builder.addCase(usersThunks.usersRead.fulfilled, (state, action) => {
    state.users = action.payload;
  })
}
```

### Create
src/store/users/usersSlice.js
```diff
- thunkAPI.dispatch(usersActions.usersCreate(user));
```
```js
axios.post('http://localhost:3100/api/v1/users', user).then((response) => {
  console.log('Done usersCreate', response);
  thunkAPI.dispatch(usersThunks.usersRead());
}).catch((error) => {
  axiosError(error);
});
```

### Delete
src/store/users/usersSlice.js
```diff
- thunkAPI.dispatch(usersActions.usersDelete(index));
```
```js
axios.delete('http://localhost:3100/api/v1/users/' + index).then((response) => {
  console.log('Done usersDelete', response);
  thunkAPI.dispatch(usersThunks.usersRead());
}).catch((error) => {
  axiosError(error);
});
```

### Update
src/store/users/usersSlice.js
```diff
- thunkAPI.dispatch(usersActions.usersUpdate(payload));
```
```js
axios.patch('http://localhost:3100/api/v1/users/' + payload.index, payload.user).then((response) => {
  console.log('Done usersUpdate', response);
  thunkAPI.dispatch(usersThunks.usersRead());
}).catch((error) => {
  axiosError(error);
});
```

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
### Search Thunk 만들기
src/store/search/searchThunks.js
```js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '@/store/users/usersSlice.js';
import axios from 'axios';
import { axiosError } from '../common.js';

export const searchThunks = {
  searchRead: createAsyncThunk(
    '',
    (q, thunkAPI) => {
      const url = 'http://localhost:3100/api/v1/search?q=' + q;
      axios.get(url).then((response) => {
      console.log('Done searchRead', response);
      thunkAPI.dispatch(usersActions.usersSet(response.data.users));
      }).catch((error) => {
        axiosError(error);
      });
    }
  )
};
```

<details><summary>Redux Saga</summary>

## 설치
```sh
npm install redux-saga
```

## Users Saga 미들웨어 만들기
src/store/users/usersSaga.js
```js
import { put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { usersActions } from './usersSlice.js';

export const usersCreate = createAction('usersCreate', (payload) => {return { payload: payload }});
export const usersRead = createAction('usersRead', (payload) => {return { payload: payload }});
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
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'
import usersReducer from './users/usersSlice.js';
import { usersTakeEvery } from './users/usersSaga.js';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    $users: usersReducer
  },
  middleware : [ sagaMiddleware ]
});

sagaMiddleware.run(function* () {
  yield all([usersTakeEvery()]);
});
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
src/store/common.js
```js
export const axiosError = function(error) {
  console.error(error.response || error.message || error);
};
```

### Read
src/store/users/usersSaga.js
```diff
- import { put, takeEvery } from 'redux-saga/effects';
+ import { put, takeEvery, call } from 'redux-saga/effects';
```
```js
import axios from 'axios';
import { axiosError } from '../common.js';
```
```diff
const usersRead$ = function* () {
- yield put(usersActions.usersRead());
```
```js
try {
  const response = yield call(() => axios.get('http://localhost:3100/api/v1/users'));
  console.log('Done usersRead', response);
  yield put(usersActions.usersSet(response.data.users));
} catch(error) {
  axiosError(error);
}
```

### Create
src/store/users/usersActions.js
```diff
yield takeEvery(usersCreate, function* (action) {
- yield put(usersActions.usersCreate(action.payload))
```
```js
try {
  const response = yield call(() => axios.post('http://localhost:3100/api/v1/users', action.payload));
  console.log('Done usersCreate', response);
  yield usersRead$();
} catch(error) {
  axiosError(error);
}
```

### Delete
src/store/users/usersActions.js
```diff
yield takeEvery(usersDelete, function* (action) {
- yield put(usersActions.usersDelete(action.payload));
````
```js
try {
  const response = yield call(() => axios.delete('http://localhost:3100/api/v1/users/' + action.payload));
  console.log('Done usersUpdate', response);
  yield usersRead$();
} catch(error) {
  axiosError(error);
}
```

### Update
src/store/users/usersActions.js
```diff
yield takeEvery(usersUpdate, function* (action) {
- yield put(usersActions.usersUpdate(action.payload));
```
```js
try {
  const response = yield call(() => axios.patch('http://localhost:3100/api/v1/users/' + action.payload.index, action.payload.user));
  console.log('Done usersUpdate', response);
  yield usersRead$();
} catch(error) {
  axiosError(error);
}
```

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
import { put, takeEvery, call } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { usersActions } from '@/store/users/usersSlice.js';
import axios from 'axios';
import { axiosError } from '../common.js';

export const searchRead = createAction('searchRead', payload => {return {payload: payload}});

export function* searchTakeEvery() {
  yield takeEvery(searchRead, function* (action) {
    try {
      const response = yield call(() => axios.get('http://localhost:3100/api/v1/search?q=' + action.payload));
      console.log('Done searchRead', response);
      yield put(usersActions.usersSet(response.data.users));
    } catch(error) {
      axiosError(error);
    }
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
</details>

### Search Component Redux Store 주입
src/pages/Search.js
```js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usersState } from '@/store/users/usersSlice.js';
import { searchThunks } from '@/store/search/searchThunks.js';
// import { searchSaga } from '@/store/search/searchSaga.js';

function Search() {
  const dispatch = useDispatch();
  const users = useSelector(usersState).users;
  console.log(users);
  useEffect(() => {
    dispatch(searchThunks.searchRead(''));
    // dispatch(searchSaga.searchRead(''));
  }, [dispatch]);
  return (
    <div>
      <h3>Search</h3>
      <hr className="d-block" />
      <div>
        <form>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </form>
      </div>
      <hr className="d-block" />
      <div>
        <table className="table-search">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
```

## Search Component에서만 사용 가능한 state값 적용
src/pages/Search.js
```diff
- import { useEffect } from 'react';
+ import { useState, useEffect } from 'react';
```
```js
const [ q, setQ ] = useState('');
const searchRead = () => {
  dispatch(searchThunks.searchRead(q));
};
```
```diff
- <form>
-   <input type="text" placeholder="Search" />
-   <button>Search</button>
- </form>
```
```js
<form onSubmit={(event) => {
  event.preventDefault();
  searchRead();
}}>
  <input
    type="text" placeholder="Search"
    value={q}
    onChange={(event) => {setQ(event.target.value)}}
  />
  <button>Search</button>
</form>
```

### Search Component 쿼리스트링 변경
src/pages/Search.js
```diff
- function Search() {
```
```js
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const _q = searchParams.get('q') || '';
  console.log(_q);
```
```diff
- dispatch(searchThunks.searchRead(q));
+ navigate('/search?q=' + q);
```
`검색`, `뒤로가기` 해보기

### Search Component 새로고침 적용
```diff
- useEffect(() => {
-   dispatch(searchThunks.searchRead(''));
- }, [dispatch]);
```
```js
useEffect(() => {
  dispatch(searchThunks.searchRead(_q));
  setQ(_q);
}, [dispatch, _q]);
```
* ❔ `새로고침`하면 렌더링이 3번 되고 있다. 랜더링이 2번 되게 하려면 (한줄 수정)
* <details><summary>정답</summary>

  ```diff
  - const [ q, setQ ] = useState('');
  + const [ q, setQ ] = useState(_q);
  ```
</details>

## Proxy 설정
package.json
```json
"proxy": "http://localhost:3100"
```

모든 파일 수정
```diff
- http://localhost:3100/api
+ /api
```

당황 하지 말고 다시 실행
```sh
npm start
```

# 수고 하셨습니다.
