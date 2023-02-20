# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup
```sh
npx create-next-app@latest {프로젝트명} --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

## typescript
* https://nextjs.org/docs/basic-features/typescript
```sh
npx create-next-app@latest --ts
```

## 실행
```sh
cd {프로젝트명}
code .
npm run dev
```

## Scss
* https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
```sh
npm install -D sass
```

## 필요 없는 파일 지우기
```diff
- styles/*
```

## Markup
styles/global.scss
```scss
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
h1, footer, .nav ul {
  padding: 0.5rem;
}
h4, li {
  margin: 0.5rem 0;
}
hr {
  display: none;
  margin: 1rem 0;
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

pages/_app.js
```js
import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
* TS: `{ Component, pageProps }: AppProps`

pages/users.js
```js
const Users = () => {
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
  )
}

export default Users
```

## Redirect / to users
pages/index.js
```js
const Home = () => {
  return <></>
}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/users'
    }
  }
}

export default Home
```

## Layouts
* https://nextjs.org/docs/basic-features/layouts

components/layouts/layout.js
```js
import Header from './header'
import Nav from './nav'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <hr />
      <div className="container">
        <nav className="nav">
          <ul>
            <li><h2>Users</h2></li>
            <li><h2>Search</h2></li>
          </ul>
        </nav>
        <hr />
        <section className="contents">{children}</section>
        <hr />
      </div>
      <footer>Copyright</footer>
    </div>
  )
}

export default Layout
```
* TS: `{ children }: { children: React.ReactNode }`

components/layouts/header.js
```js
const Header = () => {
  return (
    <header>
      <h1>Next.js study</h1>
    </header>
  )
}

export default Header
```

pages/users.js
```js
import Layout from '../components/layouts/layout'

const Users = () => {
  return (
    <Layout>
      <div>
        <h3>Users</h3>
        <p>Contents</p>
      </div>
    </Layout>
  )
}

export default Users
```
* `pages/search.js` 생성

## ActiveLink
* https://github.com/vercel/next.js/tree/canary/examples/active-class-name
* <details><summary>ActiveLink 소스</summary>

  components/common/ActiveLink.js
  ```ts
  import { useRouter } from 'next/router'
  import Link, { LinkProps } from 'next/link'
  import React, { useState, useEffect, ReactElement, Children } from 'react'

  type ActiveLinkProps = LinkProps & {
    children: ReactElement
    activeClassName: string
  }

  const ActiveLink = ({
    children,
    activeClassName,
    ...props
  }: ActiveLinkProps) => {
    const { asPath, isReady } = useRouter()

    const child = Children.only(children)
    const childClassName = child.props.className || ''
    const [className, setClassName] = useState(childClassName)

    useEffect(() => {
      // Check if the router fields are updated client-side
      if (isReady) {
        // Dynamic route will be matched via props.as
        // Static route will be matched via props.href
        const linkPathname = new URL(
          (props.as || props.href) as string,
          location.href
        ).pathname

        // Using URL().pathname to get rid of query and hash
        const activePathname = new URL(asPath, location.href).pathname

        const newClassName =
          linkPathname === activePathname
            ? `${childClassName} ${activeClassName}`.trim()
            : childClassName

        if (newClassName !== className) {
          setClassName(newClassName)
        }
      }
    }, [
      asPath,
      isReady,
      props.as,
      props.href,
      childClassName,
      activeClassName,
      setClassName,
      className,
    ])

    return (
      <Link {...props} legacyBehavior>
        {React.cloneElement(child, {
          className: className || null,
        })}
      </Link>
    )
  }

  export default ActiveLink
  ```
</details>

```diff
- <li><h2>Users</h2></li>
```
```js
<li>
  <ActiveLink activeClassName="active" href="/users">
    <a>Users</a>
  </ActiveLink>
 </li>
```

## getServerSideProps Users
pages/users.js
```js
import Layout from '../components/layouts/layout'

const Users = (props) => {
  console.log(props.users)
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
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Age" />
          <button>Create</button>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = () => {
  console.log('서버 사이드 우선 작업')
  return {
    props: {
      users: [{
        name: '홍길동',
        age: 20
      }, {
        name: '춘향이',
        age: 16
      }]
    }
  }
}

export default Users
```
* `getServerSideProps` 설명
* 개발자 도구 > Elements > `__NEXT_DATA__` 확인

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
* `페이지 소스 보기`에서 `홍길동` 검색 (SEO 최적화)
* export const getServerSideProps에서 export 빼보기

## API Users CRUD
### Read
```sh
npm install axios
```

pages/api/users.js
```js
export const users = [{
  name: '홍길동',
  age: 20
}]

const handler = async (req, res) => {
  console.log(req.method)
  users.push({
    name: '춘향이',
    age: 16
  })
  res.status(200).json(users)
}

export default handler
```
* http://localhost:3000/api/users
* TS: `(req: NextApiRequest, res: NextApiResponse<Data>)`

pages/users.js
```diff
- export const getServerSideProps = (context) => {
```
```js
export const getServerSideProps = async (context) => {
  console.log(context.query)
  const response = await axios('http://localhost:3000/api/users')
  return {
    props: {
      users: response.data
    }
  }
}
```
* ❕ `getServerSideProps`는 `서버 사이드`이므로 `Endpoint`를 절대 경로로 넣어야 한다.
* `페이지 소스 보기`에서 `홍길동` 다시 검색

### Create
pages/api/users.js
```diff
- handler
```
```js
const handler = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    users.push(req.body)
    res.status(200).json({
      result: 'Created'
    })
  }
}
```

pages/users.js
```js
import { useState } from 'react'
import { useRouter } from 'next/router'
```
```js
const [user, setUser] = useState({
  name: '',
  age: ''
})
const router = useRouter()
const usersCreate = async () => {
  await axios.post('/api/users', user)
  router.push('')
}
```
```js
<input
  type="text" placeholder="Name" value={user.name}
  onChange={event => {
    setUser({
      ...user,
      name: event.target.value
    })
  }}
/>
<input
  type="text" placeholder="Age" value={user.age}
  onChange={event => {
    setUser({
      ...user,
      age: event.target.value
    })
  }}
/>
<button onClick={() => {
  usersCreate(user)
}}>Create</button>
```

### Delete
pages/api/users/[index].js
```js
import { users } from '../users'

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    users.splice(req.query.index, 1)
    res.status(200).json({
      result: 'Deleted'
    })
  }
}

export default handler
```

pages/users.js
```js
const usersDelete = async (index) => {
  await axios.delete('/api/users/' + index)
  router.push('')
}
```
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  usersDelete(index)
}}>Delete</button>
```

### Update
pages/api/users/[index].js
```js
} else if (req.method === 'PATCH') {
  users[req.query.index] = req.body
  res.status(200).json({
    result: 'Updated'
  })
}
```

pages/users.js
```diff
- const users = props.users
```
```js
const [users, setUsers] = useState(props.users)

const usersSet = (users) => {
  setUsers(JSON.parse(JSON.stringify(users)))
}
useEffect(() => {
  console.log('props.users 다시 받음')
  usersSet(props.users)
}, [props.users])
```
```diff
- <td>{user.name}</td>
- <td>{user.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={user.name}
    onChange={event => {
      user.name = event.target.value
      usersSet(users)
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={user.age}
    onChange={event => {
      user.age = event.target.value
      usersSet(users)
    }}
  />
</td>
```
* `Input box` 수정 해보기

```js
const usersUpdate = async (index, user) => {
  await axios.patch('/api/users/' + index, user)
  router.push('')
}
```
```diff
- <button>Update</button>
```
```js
<button onClick={() => {
  usersUpdate(index, user)
}}>Update</button>
```

## MySQL CRUD
### MySQL 연결
* https://www.simplenextjs.com/posts/next-mysql
```sh
npm install mysql2
```
next.config.js
```js
const mysql2 = require('mysql2/promise')

global.mysql2 = {
  connection: null
}
const mysql2Init = async () => {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database'
  })
  const [rows, fields] = await connection.execute(`
    select 'MySQL Connected' as Result
  `)
  console.log(rows)
  global.mysql2.connection = connection
}
mysql2Init()
```
* ❕ `npm run dev` 실행시 `next.config.js` 안에 `async await`가 완료 되어야 `로컬 서버` 응답을 받을 수 있다.

libraries/mysqlPool.js
```js
export default global.mysql2.connection
```

libraries/mysqlPool.ts
```ts
import type { Connection } from 'mysql2'

export const { mysql2: { connection } } = global as unknown as { mysql2: { connection: Connection } }
export default connection
```

### Read
pages/api/users.js
```js
import mysql from '../../libraries/mysqlPool'
```
```diff
- res.status(200).json(users)
```
```js
const [rows] = await mysql.execute(`
  select
    user_pk as userPk, name, age
  from users
`)
console.log(rows)
res.status(200).json(rows)
```

### Create
pages/api/users.js
```diff
- users.push(req.body)
```
```js
const [rows] = await mysql.execute(`
  insert into users(name, age)
  values (?, ?)
`, [req.body.name, req.body.age])
console.log(rows)
```

### Delete
pages/api/users/[index].js to pages/api/users/[userPk].js
```js
import mysql from '../../libraries/mysqlPool'
```
```diff
- users.splice(req.query.index, 1)
```
```js
const [rows] = await mysql.execute(`
  delete from users
  where user_pk = ?
`, [req.query.userPk])
console.log(rows)
```

pages/users.js
* `usersDelete`에 관련된 `index`만 `user.userPk`로 바꾸기

### Update
pages/api/users/[userPk].js
```diff
- users[req.query.index] = req.body
```
```js
const [rows] = await mysql.execute(`
  update users
  set name = ?, age = ?
  where user_pk = ?
`, [req.body.name, req.body.age, req.query.userPk])
```

pages/users.js
* `usersUpdate`에 관련된 `index`만 `user.userPk`로 바꾸기
* `key`에 사용되는 `index`를 `user.userPk`로 바꾸기

pages/api/users/[userPk].js
```diff
- import { users } from '../users'
```

pages/api/users.js
```diff
- export const users = [{
```

## getServerSideProps Search
pages/search.js
```js
import Layout from '../components/layouts/layout'
import axios from 'axios'

const Search = (props) => {
  const users = props.users
  return (
    <Layout>
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
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  console.log(context.query)
  const response = await axios('http://localhost:3000/api/search')
  return {
    props: {
      users: response.data
    }
  }
}

export default Search
```
* TS: `(context: NextPageContext)`
* TS: `const { query } = context as unknown as { query: any }`

pages/api/search.js
```js
import mysql from '../../libraries/mysqlPool'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const [rows] = await mysql.execute(`
      select
        user_pk as userPk, name, age
      from users
    `)
    console.log(rows)
    res.status(200).json(rows)
  }
}

export default handler
```
* http://localhost:3000/search?q=홍

### Search q값 넘기기
pages/search.js
```diff
- const response = await axios('http://localhost:3000/api/users')
```
```js
const response = await axios('http://localhost:3000/api/search', {
  params: context.query
})
``

pages/api/search.js
```diff
- const [rows] = await mysql.execute(`
-   select
-     user_pk as userPk, name, age
-   from users
- `)
```
```js
const q = req.query.q || ''
console.log(q)
const [rows] = await mysql.execute(`
  select
    user_pk as userPk, name, age
  from users
  where
    name like concat('%', ?, '%')
`, [q])
```

### Search 검색
pages/search.js
```js
import { useState } from 'react'
import { useRouter } from 'next/router'

const [q, setQ] = useState(props.q)
const router = useRouter()
const searchRead = async (event) => {
  event.preventDefault()
  router.push(`?q=${q}`)
}
```
```diff
- <form>
-   <input type="text" placeholder="Search" />
-   <button>Search</button>
- </form>
```
```js
<form onSubmit={(event) => {searchRead(event)}}>
  <input
    type="text" placeholder="Search"
    value={q}
    onChange={event => {setQ(event.target.value)}}
  />
  <button>Search</button>
</form>
```
```diff
- return {
-   props: {
-     users: response.data
-   }
- }
```
```js
return {
  props: {
    users: response.data,
    q: context.query.q || ''
  }
}
```
* `검색`, `뒤로가기` 해보기
* ❔ `뒤로가기` 하면 검색창이 변하지 않는다. `useEffect`를 사용해서 검색창이 변하게 하려면
* <details><summary>정답</summary>

  ```js
  useEffect(() => {
    setQ(props.q)
  }, [props.q])
  ```
</details>

# etc.
## Antd
```sh
npm install antd
```

styles/global.scss
```scss
@import '~antd/dist/antd.css';
```

pages/index.js
```js
import { Button } from 'antd'

<Button type="primary">button</Button>
```

## 404
pages/404.js
```js
export default function Custom404() {
  return <div>404</div>
}
```

## Data Fetching - getInitialProps
* https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
```js
function Page(props) {
  return <div>Next stars: {props.stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

## 환경 설정
* https://nextjs.org/docs/basic-features/environment-variables
```sh
npm install env-cmd
```

.env.development
```env
NEXT_PUBLIC_BACKEND_API_URL=http://backend.com
```
* `NEXT_PUBLIC_`를 붙히면 `클라이언트 사이드`에서도 사용 가능

package.json
```json
{
  "scripts": {
    "build:dev": "env-cmd -f .env.development next build",
    "start:dev": "env-cmd -f .env.development next start",
    "build:prod": "env-cmd -f .env.prod next build",
    "start:prod": "env-cmd -f .env.prod next start"
  }
}
```
* local(`npm run dev`)은 자동으로 `.env.development` 파일을 읽는다.
* `next build`나 `next start`는 자동으로 `.env.production` 파일을 읽으므로 `.env.prod` 파일로 사용 하자

## Proxy
next.config.js
```js
const nextConfig = {
  ...
}

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`
      }
    ]
  }
}
```

## cookies-next
* https://www.npmjs.com/package/cookies-next
* [Express Cookies - httpOnly](https://github.com/ovdncids/react-curriculum/blob/master/Express.md#%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8-%EA%B0%84%EC%97%90-cookie-%EA%B3%B5%EC%9C%A0)
```sh
npm install cookies-next
```

<!--
next.config.js
```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: "true"
          }
        ]
      }
    ]
  }
}
```
-->

/page/api/users.ts
```ts
import { setCookie } from 'cookies-next'

setCookie("user_pk", 1, { req, res, maxAge: 60 * 60 * 24 })
```

/page/users.ts
```ts
import { getCookie } from 'cookies-next'

export const getServerSideProps = async (context: NextPageContext) => {
  const user_pk = getCookie('user_pk', { req: context.req, res: context.res })
  const response = await axios.get('http://localhost:3000/api/users', {
    headers: {
      Cookie: `user_pk=${user_pk}`
    }
  })
  return {
    props: {
      users: response.data
    }
  }
}
```

## getServerSideProps에서 redirect 시키키
```ts
if (!user.name) {
  apiRedirectAuthPage(content)
}

export const apiRedirectAuthPage = (context: NextPageContext) => {
  // `/_next/data/development/list.json` 이런 형식의 `context.req?.url` 처리
  let url = context.req?.url?.split('/').pop()
  url = url?.split('?').map((u, index) => {
    if (index === 0) {
      return u.replace('.json', '')
    } else {
      return u
    }
  }).join('?')
  const scheme = context.req?.headers.host?.includes('local') ? 'http' : 'https'
  const redirectUrl = encodeURIComponent(`${scheme}://${context.req?.headers.host}/${url}`)
  const destination = `${process.env.NEXT_PUBLIC_BACKEND_AUTH_URL}/login?redirect_url=${redirectUrl}`
  return {
    redirect: {
      destination
    }
  }
}
```

## Next.js - Typescript 환경에서만 발생 하는 문제
```ts
const funny = async () => {
  const array1 = [{ id: 1 }, { id: 2}]
  const array2 = []
  for (let index = 0; index < array1.length; index++) {
    const obj = array1[index]
    array2.push({
      id: obj.id
    })
  }
  console.log(array2)
}
funny()
```
* async 함수에서 `for문`을 사용하면 동일한 object가 push 된다. `[].forEach문`을 사용하면 문제 없다.

## Next.js 13에서 12로 버전 내리기
```sh
# 프로젝트 생성 후
npm install next@^12.3.2
```

## File Upload
* https://codesandbox.io/s/thyb0?file=/package.json:234-244
```js
import formidable from 'formidable'
import fs from 'fs'

// bodyParser를 사용 하 않아야 files을 받을 수 있다.
export const config = {
  api: {
    bodyParser: false
  }
}

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath)
  // ./는 최상단 경로
  fs.writeFileSync(`./uploads/${file.originalFilename}`, data)
  fs.unlinkSync(file.filepath)
  return
}

const post = async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file)
    return res.status(200).send({ result: 'Done' })
  })
}

export default (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('')
}
```

## Jimp (이미지 포맷, 크기 변경)
* https://github.com/oliver-moran/jimp
```js
import Jimp from 'jimp'

const reFormatSize = async (file) => {
  const image = await Jimp.read(file.filepath)
  const imageFormat = image.write('./uploads/format.jpg')
  const imageResize = imageFormat.resize(1920, Jimp.AUTO)
  imageResize.write('./uploads/1920.jpg')
}
await reFormatSize(files.file)
```
