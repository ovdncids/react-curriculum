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


## Members Conpenent Store inject
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
src/store/members/MembersStore.js
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
    dispatch(actionsMembers.memberSet({
      name: '',
      age: ''
    }));
    dispatch(actionsMembers.membersRead());
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
src/store/members/MembersStore.js
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
src/store/members/MembersStore.js
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

## 스토어 state 주의 사항
src/components/contents/Members.js
```diff
- const members = JSON.parse(JSON.stringify(useSelector(stateMembers).members));
+ const members = useSelector(stateMembers).members;
// dispatch 전에 리덕스의 state 값이 바뀐다면 dispatch 할때 오류가 발생한다.
// 따라서 리덕스의 state 값은 꼭 dispatch에서만 변경 해야 한다.
```

## 스토어 액션 만들기
dispatch로 리덕스의 state 값을 수정 하기 전에 실행될 함수를 사용하게 해준다. 주로 통신을 컴포넌트에서 빼기 위해 사용한다.

### Redux Thunk VS Redux Saga
Redux Thunk: 설정도 간단하고 쉽게 만들 수 있다.

Redux Saga: 설정이 Redux Thunk 보다 복잡하지만 다양한 기능을 사용할 수 있다. 다양한 기능을 사용하기 위한 러닝 커브가 크다.

<details><summary>Redux Thunk</summary>

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
src/store/members/MembersStore.js
```diff
- import { stateMembers, actionsMembers } from 'store/members/membersSlice.js';
```
```js
import { stateMembers } from 'store/members/membersSlice.js';
import actionsMembers from 'store/members/membersActions.js';
```

src/store/members/membersActions.js
```js
import axios from 'axios';
import { axiosError } from '../common.js';
```
```diff
membersCreate: payload => (dispatch) => {
- dispatch(actionsMembers.membersCreate(payload));
```
```js
axios.post('http://localhost:3100/api/v1/members', payload).then((response) => {
  console.log('Done membersCreate', response);
  (actions.membersRead())(dispatch);
}).catch((error) => {
  axiosError(error);
});
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
  console.error(error.response || error.message || error)
}
```

### Read
src/store/members/membersActions.js
```diff
membersRead: () => (dispatch) => {
- dispatch(actionsMembers.membersRead());
```
```js
axios.get('http://localhost:3100/api/v1/members').then((response) => {
  console.log('Done membersRead', response);
  dispatch(actionsMembers.membersRead(response.data.members));
}).catch((error) => {
  axiosError(error);
});
```

src/store/members/membersSlice.js
```diff
- membersRead: (state) => {
-   state.members.push({
-     name: '홍길동',
-     age: 20
-   }, {
-     name: '춘향이',
-     age: 16
-   });
- },
```
```js
membersRead: (state, action) => {
  state.members = action.payload;
},
```

### Update
src/store/members/membersActions.js
```diff
membersUpdate: payload => (dispatch) => {
- dispatch(actionsMembers.membersCreate(payload));
```
```js
axios.patch('http://localhost:3100/api/v1/members', payload).then((response) => {
  console.log('Done membersUpdate', response);
  (actions.membersRead())(dispatch);
}).catch((error) => {
  axiosError(error);
});
```

### Delete
src/store/members/membersActions.js
```diff
membersDelete: payload => (dispatch) => {
- dispatch(actionsMembers.membersDelete(payload));
```
```js
axios.delete('http://localhost:3100/api/v1/members/' + payload).then((response) => {
  console.log('Done membersDelete', response);
  (actions.membersRead())(dispatch);
}).catch((error) => {
  axiosError(error);
});
```

src/store/members/membersSlice.js
```diff
- membersCreate: (state, action) => {
-   state.members.push(action.payload);
- },
- membersUpdate: (state, action) => {
-   state.members[action.payload.index] = action.payload.member;
- },
- membersDelete(state, action) {
-   state.members.splice(action.payload, 1);
- }
```

## Search
### Search Action 만들기
src/store/search/searchActions.js
```js
import axios from 'axios';
import { axiosError } from '../common.js';
import { actionsMembers } from 'store/members/membersSlice.js';

const actions = {
  searchRead: search => (dispatch) => {
    const url = `http://localhost:3100/api/v1/search?search=${search}`;
    axios.get(url).then((response) => {
      console.log('Done searchRead', response);
      dispatch(actionsMembers.membersRead(response.data.members));
    }).catch((error) => {
      axiosError(error);
    });
  }
};

export default actions;
```
</details>

<details><summary>Redux Saga</summary>

## 설치
```sh
npm install redux-saga
```

## Members Actions 미들웨어 만들기
src/store/members/membersActions.js
```js
import { put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { actionsMembers } from './membersSlice.js';

export const memberSet = createAction('memberSet', payload => {return {payload: payload}});
export const membersSet = createAction('membersSet', payload => {return {payload: payload}});
export const membersCreate = createAction('membersCreate', payload => {return {payload: payload}});
export const membersRead = createAction('membersRead', payload => {return {payload: payload}});
export const membersUpdate = createAction('membersUpdate', payload => {return {payload: payload}});
export const membersDelete = createAction('membersDelete', payload => {return {payload: payload}});

export function* takeEveryMembers() {
  yield takeEvery(memberSet, function* (action) {
    yield put(actionsMembers.memberSet(action.payload));
  });

  yield takeEvery(membersSet, function* (action) {
    yield put(actionsMembers.membersSet(action.payload));
  });
  
  yield takeEvery(membersCreate, function* (action) {
    yield put(actionsMembers.membersCreate(action.payload));
  });

  const membersRead$ = function* () {
    yield put(actionsMembers.membersRead());
  };
  yield takeEvery(membersRead, membersRead$);

  yield takeEvery(membersUpdate, function* (action) {
    yield put(actionsMembers.membersUpdate(action.payload));
  });

  yield takeEvery(membersDelete, function* (action) {
    yield put(actionsMembers.membersDelete(action.payload));
  });
}

const actions = {
  memberSet,
  membersSet,
  membersCreate,
  membersRead,
  membersUpdate,
  membersDelete
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
- import { stateMembers, actionsMembers } from 'store/membersSlice.js';
```
```js
import { stateMembers } from 'store/members/membersSlice.js';
import actionsMembers from 'store/members/membersActions.js';
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
  console.error(error.response || error.message || error)
}
```

### Create
src/store/members/membersActions.js
```diff
- import { put, takeEvery } from 'redux-saga/effects';
```
```js
import axios from 'axios';
import { axiosError } from '../common.js';
import { put, takeEvery, call } from 'redux-saga/effects';
```
```diff
yield takeEvery(membersCreate, function* (action) {
- yield put(actionsMembers.membersCreate(action.payload))
```
```js
try {
  const response = yield call(() => axios.post('http://localhost:3100/api/v1/members', action.payload));
  console.log('Done membersCreate', response);
  yield membersRead$();
} catch(error) {
  axiosError();
}
```

### Read
src/store/members/membersActions.js
```diff
const membersRead$ = function* () {
- yield put(actionsMembers.membersRead());
```
```js
try {
  const response = yield call(() => axios.get('http://localhost:3100/api/v1/members'));
  console.log('Done membersRead', response);
  yield put(actionsMembers.membersRead(response.data.members));
} catch(error) {
  axiosError();
}
```

src/store/members/membersSlice.js
```diff
- membersRead: (state) => {
-   state.members.push({
-     name: '홍길동',
-     age: 20
-   }, {
-     name: '춘향이',
-     age: 16
-   });
- },
```
```js
membersRead: (state, action) => {
  state.members = action.payload;
},
```

### Update
src/store/members/membersActions.js
```diff
yield takeEvery(membersUpdate, function* (action) {
- yield put(actionsMembers.membersUpdate(action.payload));
```
```js
try {
  const response = yield call(() => axios.patch('http://localhost:3100/api/v1/members', action.payload));
  console.log('Done membersUpdate', response);
  yield membersRead$();
} catch(error) {
  axiosError();
}
```

### Delete
src/store/members/membersActions.js
```diff
yield takeEvery(membersDelete, function* (action) {
- yield put(actionsMembers.membersDelete(action.payload));
````
```js
try {
  const response = yield call(() => axios.delete('http://localhost:3100/api/v1/members/' + action.payload));
  console.log('Done membersUpdate', response);
  yield membersRead$();
} catch(error) {
  axiosError();
}
```

src/store/members/membersSlice.js
```diff
- membersCreate: (state, action) => {
-   state.members.push(action.payload);
- },
- membersUpdate: (state, action) => {
-   state.members[action.payload.index] = action.payload.member;
- },
- membersDelete(state, action) {
-   state.members.splice(action.payload, 1);
- }
```

## Search
### Search Action 만들기
src/store/search/searchActions.js
```js
import axios from 'axios';
import { axiosError } from '../common.js';
import { put, takeEvery, call } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { actionsMembers } from 'store/members/membersSlice.js';

export const searchRead = createAction('searchRead', payload => {return {payload: payload}});

export function* takeEverySearch() {
  yield takeEvery(searchRead, function* (action) {
    try {
      const response = yield call(() => axios.get(`http://localhost:3100/api/v1/search?search=${action.payload}`));
      console.log('Done searchRead', response);
      yield put(actionsMembers.membersRead(response.data.members));
    } catch(error) {
      axiosError();
    }
  });
}

const actions = {
  searchRead
}

export default actions;
```

### Search Action을 Redux Saga에 등록
```js
import { takeEverySearch } from './store/search/searchActions.js';
```
```diff
- yield all([takeEveryMembers()]);
+ yield all([takeEveryMembers(), takeEverySearch()]);
```
</details>

### Search Conpenent Store inject
src/components/contents/Search.js
```js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stateMembers } from 'store/members/membersSlice.js';
import actionsSearch from 'store/search/searchActions.js';

function Search() {
  const dispatch = useDispatch();
  const members = useSelector(stateMembers).members;
  const [ search, setSearch ] = useState('');
  const searchRead = (search) => {
    dispatch(actionsSearch.searchRead(search));
  };
  useEffect(() => {
    dispatch(actionsSearch.searchRead(''));
  }, [dispatch]);
  return (
    <div>
      <h3>Search</h3>
      <hr className="d-block" />
      <div>
        <input type="text"
          value={search}
          onChange={event => {setSearch(event.target.value)}}
          onKeyUp={event => {if (event.key === 'Enter') searchRead(search)}}
        />
        <button onClick={() => searchRead(search)}>Search</button>
      </div>
      <hr className="d-block" />
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.age}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Search;
```

### Search Conpenent 쿼리스트링 변경과 새로고침 적용
src/components/contents/Search.js
```diff
- function Search() {
```
```js
function Search(props) {
  const url = new URL(window.location.href);
  const spSearch = url.searchParams.get('search') || '';
  const { history } = props;
```
```diff
- dispatch(actionsSearch.searchRead(search));
+ history.push(`/search?search=${search}`);
```
```diff
- useEffect(() => {
-   dispatch(actionsSearch.searchRead(''));
- }, [dispatch]);
```
```js
useEffect(() => {
  setSearch(spSearch);
  dispatch(actionsSearch.searchRead(spSearch));
}, [dispatch, spSearch]);
```

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


