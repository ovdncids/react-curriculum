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
import React from "react"
import "../styles/index.css"

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
            <li><h2>Members</h2></li>
            <li><h2>Search</h2></li>
          </ul>
        </nav>
        <hr />
        <section className="contents">
          <div>
            <h3>Members</h3>
            <p>Contents</p>
          </div>
        </section>
        <hr />
      </div>
      <footer>Copyright</footer>
    </div>
  )
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
import React from "react"

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
            <li><h2>Members</h2></li>
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
  )
}
```

src/pages/index.js
```js
import Layout from '../components/layout.js'

export default function Index() {
  return (
    <Layout>
      <div>
        <h3>Members</h3>
        <p>Contents</p>
      </div>
    </Layout>
  )
}
```

## React Router DOM
src/pages/search.js
```js
import React from "react"
import Layout from '../components/layout.js'

export default function Search() {
  return (
    <Layout>
      <div>
        <h3>Search</h3>
        <p>Contents</p>
      </div>
    </Layout>
  )
}
```

src/components/layout.js
```diff
- <li><h2>Members</h2></li>
- <li><h2>Search</h2></li>
```
```js
<li><h2><Link to="/" activeClassName='active'>Members</Link></h2></li>
<li><h2><Link to="/search" activeClassName='active'>Search</Link></h2></li>
```

## 404 Page
src/pages/404.js
```js
import React from "react"

export default function Page404() {
  return (
    <div>404 Page</div>
  )
}
```

## Members Store 만들기
### MobX 설치
```sh
npm install mobx mobx-react
```
src/stores/MembersStore.js
```js
import { configure, makeAutoObservable } from 'mobx';

configure({
  // enforceActions: 'never',
  // useProxies: 'never'
});

export default class MembersStore {
  constructor() {
    makeAutoObservable(this);
  }

  members = [];
  member = {
    name: '',
    age: ''
  };

  membersCreate() {
    this.members.push({
      name: this.member.name,
      age: this.member.age
    });
    console.log('Done membersCreate', this.members);
  }
}

export const membersStore = new MembersStore();
```

### Provide 등록
provide-stores.js
```js
import React from 'react'
import { Provider } from 'mobx-react'
import { membersStore } from './src/stores/MembersStore'

export default function Stores({ element }) {
  return (
    <Provider membersStore={membersStore}>{element}</Provider>
  )
}
```

gatsby-browser.js
gatsby-ssr.js
```js
import provideStores from './provide-stores'

export const wrapRootElement = provideStores
```

### Members Compenent Store inject
src/pages/index.js
```diff
- export default function Index() {
```
```js
import { inject, observer } from 'mobx-react';

function Index(props) {
  const { membersStore } = props;
  const { member } = membersStore;
  return (
    <Layout>
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
            onChange={event => {member.name = event.target.value}}
          />
          <input
            type="text" placeholder="Age" value={member.age}
            onChange={event => {member.age = event.target.value}}
          />
          <button onClick={() => membersStore.membersCreate()}>Create</button>
        </div>
      </div>
    </Layout>
  )
}

export default inject('membersStore')(observer(Index));
```

### Members Store CRUD
src/stores/MembersStore.js
```js
membersRead() {
  this.members = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }];
  console.log('Done membersRead', this.members);
}
```

src/pages/index.js
```diff
- import React from "react"
+ import React, { useEffect } from "react"
```
```diff
- const { member } = membersStore;
```
```js
const { members, member } = membersStore;
useEffect(() => {
  membersStore.membersRead();
}, [membersStore]);
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

## https
https://www.gatsbyjs.com/docs/local-https
```sh
npm run develop -- --https
```
