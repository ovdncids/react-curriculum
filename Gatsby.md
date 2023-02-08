# Gatsby
https://www.gatsbyjs.com

## 설치
```sh
npm install -g gatsby-cli
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
cd hello-world
npm start
```

## 빌드
```sh
gatsby build
gatsby serve
```

## Markup
src/pages/index.js
```js
import React from 'react'
import '../styles/index.css'

export default function Index() {
  return (
    <div>
      <header>
        <h1>React study</h1>
      </header>
      <hr />
      <div className="container">
        <nav className="nav">
          <ul>
            <li><h2>Users</h2></li>
            <li><h2>Search</h2></li>
          </ul>
        </nav>
        <hr />
        <section className="contents">
          <div>
            <h3>Users</h3>
            <p>Contents</p>
          </div>
        </section>
        <hr />
      </div>
      <footer>Copyright</footer>
    </div>
  );
}
```

src/styles/index.js
```css
* {
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
a:link, a:visited {
  text-decoration: none;
  color: black;
}
a.active {
  color: white;
}
hr {
  display: none;
}
h1, footer, .nav ul {
  padding: 0.5rem;
}
h4, li {
  margin: 0.5rem 0;
}
hr {
  margin: 1rem 0;
}
hr {
  border: 0;
  border-top: 1px solid #ccc;
}
input[type=text] {
  width: 120px;
}

.d-block {
  display: block;
}
.container {
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.nav {
  min-height: 300px;
  background-color: #4285F4;
}
.nav ul {
  list-style: none;
}
.contents {
  flex: 1;
  padding: 1rem;
}

.table-search {
  border: 1px solid rgb(118, 118, 118);
  border-collapse: collapse;
  text-align: center;
}
.table-search th, .table-search td {
  padding: 0.2rem;
}
.table-search td {
  border-top: 1px solid rgb(118, 118, 118);
  min-width: 100px;
}
```

## React Component 만들기
src/components/layout.js
```js
import React from 'react'

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>React study</h1>
      </header>
      <hr />
      <div className="container">
        <nav className="nav">
          <ul>
            <li><h2>Users</h2></li>
            <li><h2>Search</h2></li>
          </ul>
        </nav>
        <hr />
        <section className="contents">
          {children}
        </section>
        <hr />
      </div>
      <footer>Copyright</footer>
    </div>
  );
}
```

src/pages/index.js
```js
import Layout from '../components/layout.js'

export default function Index() {
  return (
    <Layout>
      <div>
        <h3>Users</h3>
        <p>Contents</p>
      </div>
    </Layout>
  );
}
```

## React Router DOM
src/pages/search.js
```js
import React from 'react'
import Layout from '../components/layout.js'

export default function Search() {
  return (
    <Layout>
      <div>
        <h3>Search</h3>
        <p>Contents</p>
      </div>
    </Layout>
  );
}
```

src/components/layout.js
```diff
- <li><h2>Users</h2></li>
- <li><h2>Search</h2></li>
```
```js
<li><h2><Link to="/" activeClassName='active'>Users</Link></h2></li>
<li><h2><Link to="/search" activeClassName='active'>Search</Link></h2></li>
```

## 404 Page
src/pages/404.js
```js
import React from 'react'

export default function Page404() {
  return (
    <div>404 Page</div>
  );
}
```

## Users Store 만들기
### MobX 설치
```sh
npm install mobx mobx-react
```
src/stores/UsersStore.js
```js
import { configure, makeAutoObservable } from 'mobx'

configure({
  // enforceActions: 'never',
  // useProxies: 'never'
})

export default class UsersStore {
  constructor() {
    makeAutoObservable(this)
  }

  users = []
  user = {
    name: '',
    age: ''
  }

  usersCreate() {
    this.users.push({
      name: this.user.name,
      age: this.user.age
    })
    console.log('Done usersCreate', this.users)
  }
}

export const usersStore = new UsersStore()
```

### Provide 등록
provide-stores.js
```js
import React from 'react'
import { Provider } from 'mobx-react'
import { usersStore } from './src/stores/UsersStore'

export default function Stores({ element }) {
  return (
    <Provider usersStore={usersStore}>{element}</Provider>
  );
}
```

gatsby-browser.js
gatsby-ssr.js
```js
import provideStores from './provide-stores'

export const wrapRootElement = provideStores
```

### Users Component Store inject
src/pages/index.js
```diff
- export default function Index() {
```
```js
import { inject, observer } from 'mobx-react'

function Index(props) {
  const { usersStore } = props
  const { user } = usersStore
  return (
    <Layout>
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
          <input
            type="text" placeholder="Name" value={user.name}
            onChange={event => {user.name = event.target.value}}
          />
          <input
            type="text" placeholder="Age" value={user.age}
            onChange={event => {user.age = event.target.value}}
          />
          <button onClick={() => usersStore.usersCreate()}>Create</button>
        </div>
      </div>
    </Layout>
  );
}

export default inject('usersStore')(observer(Index))
```

### Users Store CRUD
### Read
src/stores/UsersStore.js
```js
usersRead() {
  this.users = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }]
  console.log('Done usersRead', this.users)
}
```

src/pages/index.js
```diff
- import React from 'react'
+ import React, { useEffect } from 'react'
```
```diff
- const { user } = usersStore
```
```js
const { users, user } = usersStore
useEffect(() => {
  usersStore.usersRead()
}, [usersStore])
```
```diff
- <tr>
-   <td>홍길동</td>
-   <td>20</td>
```
```js
{users.map((user, index) => (
  <tr key={index}>
    <td>{user.name}</td>
    <td>{user.age}</td>
    ...
  </tr>
))}
```

### Update
src/stores/UsersStore.js
```js
usersUpdate(index, user) {
  this.users[index] = user
  console.log('Done usersUpdate', this.users)
}
```

src/pages/index.js
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={event => {user.name = event.target.value}}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={event => {user.age = event.target.value}}
  />
</td>
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => usersStore.usersUpdate(index, user)}>Update</button>
```

### Delete
src/stores/UsersStore.js
```js
usersDelete(index) {
  this.users.splice(index, 1)
  console.log('Done usersDelete', this.users)
}
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
src/stores/common.js
```js
export const axiosError = (error) => {
  console.error(error.response || error.message || error)
}
```

### Create
src/stores/UsersStore.js
```js
import axios from 'axios'
import { axiosError } from './common.js'
```
```diff
usersCreate() {
- this.users.push({
-   name: this.user.name,
-   age: this.user.age
- })
- console.log('Done usersCreate', this.users)
```
```js
axios.post('http://localhost:3100/api/v1/users', this.user).then((response) => {
  console.log('Done usersCreate', response)
  this.usersRead()
}).catch((error) => {
  axiosError(error)
})
```

### Read
src/stores/UsersStore.js
```diff
usersRead() {
- this.users = [{
-   name: '홍길동',
-   age: 20
- }, {
-   name: '춘향이',
-   age: 16
- }]
- console.log('Done usersRead', this.users)
```
```js
axios.get('http://localhost:3100/api/v1/users').then((response) => {
  console.log('Done usersRead', response)
  this.users = response.data.users
}).catch((error) => {
  axiosError(error)
})
```

### Update
src/stores/UsersStore.js
```diff
usersUpdate(index, user) {
- this.users[index] = user
- console.log('Done usersUpdate', this.users)
```
```js
const userUpdate = {
  index: index,
  user: user,
}
axios.patch('http://localhost:3100/api/v1/users', userUpdate).then((response) => {
  console.log('Done usersUpdate', response)
  this.usersRead()
}).catch((error) => {
  axiosError(error)
})
```

### Delete
src/stores/UsersStore.js
```diff
usersDelete(index) {
- this.users.splice(index, 1)
- console.log('Done usersDelete', this.users)
```
```js
axios.delete('http://localhost:3100/api/v1/users/' + index).then((response) => {
  console.log('Done usersDelete', response)
  this.usersRead()
}).catch((error) => {
  axiosError(error)
})
```

## Search Store 만들기
src/stores/SearchStore.js
```js
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { axiosError } from './common.js'
import { usersStore } from './UsersStore.js'

export default class SearchStore {
  constructor() {
    makeAutoObservable(this)
  }

  searchRead(q) {
    const url = `http://localhost:3100/api/v1/search?q=${q}`
    axios.get(url).then((response) => {
      console.log('Done searchRead', response)
      usersStore.users = response.data.users
    }).catch((error) => {
      axiosError(error)
    })
  }
}

export const searchStore = new SearchStore()
```

### Search Store 등록
provide-stores.js
```js
import { searchStore } from './src/stores/SearchStore'
```
```diff
- <Provider usersStore={usersStore}>{element}</Provider>
```
```js
<Provider
  usersStore={usersStore}
  searchStore={searchStore}
>{element}</Provider>
```

### Search Component Store inject
src/pages/search.js
```js
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout.js'
import { inject, observer } from 'mobx-react'

function Search(props) {
  const { usersStore, searchStore } = props
  const { users } = usersStore
  const [ q, setQ ] = useState('')
  const searchRead = (event) => {
    searchStore.searchRead(q)
    event.preventDefault()
  }
  useEffect(() => {
    searchStore.searchRead('')
  }, [searchStore])
  return (
    <Layout>
      <div>
        <h3>Search</h3>
        <hr className="d-block" />
        <div>
          <form onSubmit={(event) => {searchRead(event)}}>
            <input
              type="text" placeholder="Search"
              value={q}
              onChange={event => {setQ(event.target.value)}}
            />
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
    </Layout>
  );
}

export default inject('usersStore', 'searchStore')(observer(Search))
```

## Search Component 쿼리스트링 변경과 새로고침 적용
src/pages/search.js
```diff
- const { usersStore, searchStore } = props
```
```js
const url = new URL(props.location.href || 'http://localhost')
const spSearch = url.searchParams.get('q') || ''
const { usersStore, searchStore, navigate } = props
```
```diff
- searchStore.searchRead(q)
+ navigate(`/search?q=${q}`)
```
```diff
- useEffect(() => {
-   searchStore.searchRead('')
- }, [searchStore])
```
```js
useEffect(() => {
  searchStore.searchRead(spSearch)
  setQ(spSearch)
}, [searchStore, spSearch])
```


## https
https://www.gatsbyjs.com/docs/local-https
```sh
npm run develop -- --https
```

## gatsby-node.js
https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/

https://medium.com/@christinavhastenrath/rest-apis-in-gatsby-at-runtime-89a89dd976d7
