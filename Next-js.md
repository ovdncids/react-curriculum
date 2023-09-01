# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup
```sh
npx create-next-app@latest
```
```sh
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? No
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias? No
```

## 실행
```sh
cd {프로젝트명}
code .
npm run dev
```

* TS: `tsconfig.json` 오류
```diif
- "moduleResolution": "bundler",
+ "moduleResolution": "node",
```

## ESlint 설정
* [Typescript](https://github.com/ovdncids/react-curriculum/blob/master/Prettier.md#gts-google-typescript-style)
* [Javascript](https://github.com/ovdncids/react-curriculum/blob/master/Prettier.md#javascript-style)

## Markup + Layout
app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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
  display: block;
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

input {
  border: 1px solid black;
}
input.error {
  border: 1px solid red;
}
```

app/layout.js
```js
import Nav from './nav.js'
```
```diff
- <body className={inter.className}>{children}</body>
```
```js
<body className={inter.className}>
  <div>
    <header>
      <h1>Next.js study</h1>
    </header>
    <hr />
    <div className="container">
      <Nav />
      <hr />
      <section className="contents">{children}</section>
      <hr />
    </div>
    <footer>Copyright</footer>
  </div>
</body>
```

app/nav.js
```js
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="nav">
      <ul>
        <li>
          <h2>
            <Link
              href="/users"
              className={pathname === '/users' ? 'active' : ''}
            >Users</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link
              href="/search"
              className={pathname === '/search' ? 'active' : ''}
            >Search</Link>
          </h2>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
```

## Pages
app/users/page.js
```js
const Users = () => {
  return (
    <div>
      <h3>Users</h3>
      <p>Contents</p>
    </div>
  )
}

export default Users
```

app/search/page.js
```js
const Search = () => {
  return (
    <div>
      <h3>Search</h3>
      <p>Contents</p>
    </div>
  )
}

export default Search
```

## Redirect / to users
app/page.js
```js
import { redirect } from 'next/navigation'

const Home = () => {
  redirect('/users')
}

export default Home
```

## SSR
app/users/page.js
```js
const Users = async () => {
  const users = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }]
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
  )
}

export default Users
```
* `페이지 소스 보기`에서 `홍길동` 검색 (SEO 최적화)

## API Users CRUD
### Read
app/api/users/route.js
```js
import { NextResponse } from 'next/server'

if (!global.users) {
  global.users = [{
    name: '홍길동',
    age: 20
  }, {
    name: '춘향이',
    age: 16
  }]
}

export async function GET() {
  return NextResponse.json(global.users)
}
```
* http://localhost:3000/api/users

services/usersService.js
```js
export const usersService = {
  usersRead: async () => {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  }
}
```
* ❕ `http://localhost:3000/api/users`는 서버 사이드이므로 `Endpoint`를 절대 경로로 넣어야 한다.

app/users/page.js
```js
import { usersService } from '@/services/usersService.js'
```
```diff
- const users = [{
-   name: '홍길동',
-   age: 20
- }, {
-   name: '춘향이',
-   age: 16
- }]
```
```js
const users = await usersService.usersRead()
```
* `페이지 소스 보기`에서 `홍길동` 다시 검색

### Create
```sh
npm install react-hook-form
```

app/api/users/route.js
```js
export async function POST(request) {
  global.users.push(await request.json())
  return NextResponse.json({
    result: 'Created'
  })
}
```

services/usersService.js
```js
usersCreate: async (user) => {
  const res = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })
  return res.json()
}
```

app/users/page.js
```js
import Create from './create'
```
```diff
- <div>
-   <h4>Create</h4>
-   <input type="text" placeholder="Name" />
-   <input type="text" placeholder="Age" />
-   <button>Create</button>
- </div>
```
```js
<Create />
```

app/users/create.js
```js
'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { usersService } from '@/services/usersService.js'

const Create = () => {
  const router = useRouter()
  const userForm = useForm({
    defaultValues: {
      name: '',
      age: ''
    }
  })
  const { register, formState, formState: {errors} } = userForm
  const userFormSubmit = userForm.handleSubmit(() => {})
  const usersCreate = async () => {
    userForm.clearErrors()
    await userFormSubmit()
    if (Object.keys(formState.errors).length === 0) {
      await usersService.usersCreate(userForm.getValues())
      router.refresh()
    }
  }
  return (
    <div>
      <h4>Create</h4>
      <input type="text" placeholder="Name"
        {...register('name', {
          required: true
        })}
        className={!!errors.name ? 'error' : ''}
      />
      <input type="text" placeholder="Age"
        {...register('age', {
          required: true
        })}
        className={!!errors.name ? 'error' : ''}
      />
      <button onClick={() => {
        usersCreate()
      }}>Create</button>
    </div>
  )
}

export default Create
```

### Delete
app/api/users/[index]/route.js
```js
import { NextResponse } from 'next/server'

export async function DELETE(_, context) {
  global.users.splice(context.params.index, 1)
  return NextResponse.json({
    result: 'Deleted'
  })
}
```

services/usersService.js
```js
usersDelete: async (index) => {
  const res = await fetch('http://localhost:3000/api/users/' + index, {
    method: 'DELETE'
  })
  return res.json()
}
```

app/users/page.js
```js
import Delete from './delete'
```
```diff
- <button>Delete</button>
```
```js
<Delete index={index} />
```

app/users/delete.js
```js
'use client'
import { useRouter } from 'next/navigation'
import { usersService } from '@/services/usersService.js'

const Delete = ({index}) => {
  const router = useRouter()
  return (
    <button onClick={async () => {
      await usersService.usersDelete(index)
      router.refresh()
    }}>Delete</button>
  )
}

export default Delete
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

app/users/page.js
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
* [MariaDB 설치](https://github.com/ovdncids/mysql-curriculum/blob/master/Install.md)
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
app/api/users/route.js
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
app/api/users/route.js
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
import mysql from '../../../libraries/mysqlPool'
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

app/users/page.js
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

app/users/page.js
* `usersUpdate`에 관련된 `index`만 `user.userPk`로 바꾸기
* `key`에 사용되는 `index`를 `user.userPk`로 바꾸기

pages/api/users/[userPk].js
```diff
- import { users } from '../users'
```

app/api/users/route.js
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
```

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
const searchRead = (event) => {
  event.preventDefault()
  router.push({query: {q}})
}
```
```diff
- <form>
-   <input type="text" placeholder="Search" />
-   <button>Search</button>
- </form>
```
```js
<form onSubmit={searchRead}>
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
* TS: `const searchRead = (event: React.SyntheticEvent) => {`
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
npm install -D env-cmd
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
* `next build`나 `next start`는 자동으로 `.env.production` 파일을 읽으므로 `.env.prod` 파일로 사용 하자.

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

## 서버 사이드인지 클라이언트 사이드인지 확인 하는 방법
* https://stackoverflow.com/questions/49411796/how-do-i-detect-whether-i-am-on-server-on-client-in-next-js
```js
type window === 'undefined'
```

## File Upload
* https://codesandbox.io/s/thyb0?file=/package.json:234-244

```sh
npm install formidable
```

pages/upload.js
```js
import axios from 'axios'

const Update = () => {
  const upload = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', event.target[0].files[0])
    axios.post('http://localhost:3000/api/upload', formData)
  }
  return (
    <div>
      <form onSubmit={(event) => upload(event)}>
        <input type="file" name="file" />
        <button>업로드</button>
      </form>
    </div>
  )
}

export default Update
```
* TS: `const upload = (event: FormEvent<HTMLFormElement>) => {`

pages/api/upload.js
```js
import formidable from 'formidable'
import fs from 'fs'

// bodyParser를 사용하지 않아야 files을 받을 수 있다.
export const config = {
  api: {
    bodyParser: false
  }
}

const handler = (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      const file = files.file
      const data = fs.readFileSync(file.filepath)
      // 경로는 최상단 기준
      fs.writeFileSync(`./uploads/${file.originalFilename}`, data)
      fs.unlinkSync(file.filepath)
      return res.status(200).send({result: 'Done'})
    })
  }
}

export default handler
```

## Jimp (이미지 포맷, 크기 변경)
* https://github.com/oliver-moran/jimp
```js
import Jimp from 'jimp'

const formatSize = async (file) => {
  const image = await Jimp.read(file.filepath)
  const imageFormat = image.write('./uploads/format.jpg')
  const imageResize = imageFormat.resize(1920, Jimp.AUTO)
  imageResize.write('./uploads/1920.jpg')
}
await formatSize(files.file)
```

## Head
* https://nextjs.org/docs/api-reference/next/head
```js
import Head from 'next/head';

<Head>
  <title>홈 {'}'} 목록</title>
  <meta keywords={'keywords'} />
</Head>
```

## Next.js 서버에러 페이지
pages/_error.js
```js
const Error = () => {
  return <div>에러 페이지</div>
}

export default Error
```
