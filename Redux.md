# Redux
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

// useAppDispatch는 Typescript에서 사용
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

[Redux Saga](Redux-Saga.md): 설정이 복잡하지만 다양한 기능을 사용할 수 있다. 다양한 기능을 사용하기 위한 러닝 커브가 크다.

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

### Read
src/store/users/usersThunks.js
```js
import axios from 'axios';
```
```diff
- thunkAPI.dispatch(usersActions.usersRead());
```
```js
return axios.get('http://localhost:3100/api/v1/users').then((response) => {
  console.log('Done usersRead', response);
  // thunkAPI.dispatch(usersActions.usersSet(response.data.users));
  return response.data.users;
});
```
src/store/users/usersSlice.js
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
});
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
### Search Thunk 만들기
src/store/search/searchThunks.js
```js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { usersActions } from '@/store/users/usersSlice.js';

export const searchThunks = {
  searchRead: createAsyncThunk(
    '',
    (q, thunkAPI) => {
      const url = 'http://localhost:3100/api/v1/search?q=' + q;
      axios.get(url).then((response) => {
      console.log('Done searchRead', response);
      thunkAPI.dispatch(usersActions.usersSet(response.data.users));
      });
    }
  )
};
```

### Search Component Redux Store 주입
src/pages/Search.js
```js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { searchThunks } from '@/store/search/searchThunks.js';
// import { searchSaga } from '@/store/search/searchSaga.js';
import { usersState } from '@/store/users/usersSlice.js';

function Search() {
  const dispatch = useAppDispatch();
  const users = useSelector(usersState).users;
  const q = '';
  console.log(q, users);
  useEffect(() => {
    dispatch(searchThunks.searchRead(q));
    // dispatch(searchSaga.searchRead(q));
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
function SearchBar(props) {
  const dispatch = useAppDispatch();
  const [q, setQ] = useState('');
  console.log('SearchBar', props.q);
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(searchThunks.searchRead(q));
        // dispatch(searchSaga.searchRead(q));
      }}>
        <input
          type="text" placeholder="Search"
          value={q}
          onChange={event => {setQ(event.target.value)}}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
```
```diff
- <div>
-   <form>
-     <input type="text" placeholder="Search" />
-     <button>Search</button>
-   </form>
- </div>
+ <SearchBar q={q} />
```

### Search Component 쿼리스트링 변경
src/pages/Search.js
```js
import { useNavigate } from 'react-router-dom';
```
```diff
- function SearchBar(props) {
```
```js
function SearchBar(props) {
  const navigate = useNavigate();
```
```diff
- const dispatch = useAppDispatch();

- dispatch(searchThunks.searchRead(q));
+ navigate('/search?q=' + q);
```
* `검색`, `뒤로가기` 해보기

### Search Component 새로고침 적용
```diff
- import { useNavigate } from 'react-router-dom';
+ import { useNavigate, useLocation } from 'react-router-dom';
```
```diff
- const q = '';
```
```js
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const q = searchParams.get('q') || '';
```
* `검색`, `새로고침` 해보기

```diff
useEffect(() => {
  searchActions.searchRead(q);
- }, []);
+ }, [q]);
```
* `검색`, `새로고침` 해보기

```diff
- const [q, setQ] = useState('');
+ const [q, setQ] = useState(props.q);
```
* `새로고침`, `뒤로가기` 해보기

```diff
- <SearchBar q={q} />
+ <SearchBar key={q} q={q} />
```
* `새로고침`, `뒤로가기`, `검색` 해보기
* `key`는 `q`가 수정되면 새로운 컴포넌트를 생성한다.
