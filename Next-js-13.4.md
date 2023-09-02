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

* https://nextjs.org/docs/app/api-reference/file-conventions

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
* https://nextjs.org/docs/app/api-reference/file-conventions/route
* https://junghan92.medium.com/번역-next-js의-app-디렉터리-아키텍처-이해하기-28672980d765

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
* ❕ `import { useState } from 'react'` 넣어보기

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
import { useState } from 'react'

const Create = () => {
  return (
    <div>
      <h4>Create</h4>
    </div>
  )
}

export default Create
```

app/users/create.js
* <details><summary>react-hook-form</summary>

  * https://medium.com/@prithvi128717/creating-a-form-in-react-with-react-hook-form-and-next-js-13-4-5dae780daaef

  ```sh
  npm install react-hook-form
  ```
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
        <button onClick={usersCreate}>Create</button>
      </div>
    )
  }
  
  export default Create
  ```

</details>

```js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usersService } from '@/services/usersService.js'

const Create = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    name: '',
    age: ''
  })
  const usersCreate = async () => {
    await usersService.usersCreate(user)
    router.refresh()
  }
  return (
    <div>
      <h4>Create</h4>
      <input
        type="text" placeholder="Name" value={user.name}
        onChange={(event) => {
          setUser({
            ...user,
            name: event.target.value
          })
        }}
      />
      <input
        type="text" placeholder="Age" value={user.age}
        onChange={(event) => {
          setUser({
            ...user,
            age: event.target.value
          })
        }}
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
app/api/users/[index]/route.js
```js
export async function PATCH(request, context) {
  global.users[context.params.index] = await request.json()
  return NextResponse.json({
    result: 'Updated'
  })
}
```

services/usersService.js
```js
usersUpdate: async (index, user) => {
  const res = await fetch('http://localhost:3000/api/users/' + index, {
    method: 'PATCH',
    body: JSON.stringify(user)
  })
  return res.json()
}
```

```js
usersUpdate: async (index, user) => {
  const res = await fetch('http://localhost:3000/api/users/' + index, {
    method: 'PATCH',
    body: JSON.stringify(user)
  })
  return res.json()
}
```

app/users/page.js
```diff
- import Delete from './delete'
+ import Update from './update'
```
```diff
- <tr key={index}>
-   <td>{user.name}</td>
-   <td>{user.age}</td>
-   <td>
-     <button>Update</button>
-     <Delete />
-   </td>
- </tr>
```
```js
<Update key={index} index={index} _user={user} />
```

app/users/update.js
```js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usersService } from '@/services/usersService.js'
import Delete from './delete'

const Update = ({index, _user}) => {
  const router = useRouter()
  const [user, setUser] = useState(_user)
  const usersUpdate = async () => {
    await usersService.usersUpdate(index, user)
    router.refresh()
  }
  return (
    <tr key={index}>
      <td>
        <input
          type="text" placeholder="Name" value={user.name}
          onChange={(event) => {
            setUser({
              ...user,
              name: event.target.value
            })
          }}
        />
      </td>
      <td>
        <input
          type="text" placeholder="Age" value={user.age}
          onChange={(event) => {
            setUser({
              ...user,
              age: event.target.value
            })
          }}
        />
      </td>
      <td>
        <button onClick={usersUpdate}>Update</button>
        <Delete index={index} />
      </td>
    </tr>
  )
}

export default Update
```
* ❕ `useEffect` 적용해서 `SSR` 비교
```js
useEffect(() => {
  setUser(_user)
}, [])
```

* <details><summary>react-hook-form</summary>

  ```sh
  npm install react-hook-form
  ```
  ```js
  'use client'
  import { useRouter } from 'next/navigation'
  import { useForm } from 'react-hook-form'
  import { usersService } from '@/services/usersService.js'
  import Delete from './delete'
  
  const Update = ({index, _user}) => {
    const router = useRouter()
    const userForm = useForm({
      defaultValues: {..._user}
    })
    const { register, formState, formState: {errors} } = userForm
    const userFormSubmit = userForm.handleSubmit(() => {})
    const usersUpdate = async () => {
      userForm.clearErrors()
      await userFormSubmit()
      if (Object.keys(formState.errors).length === 0) {
        await usersService.usersUpdate(index, userForm.getValues())
        router.refresh()
      }
    }
    return (
      <tr key={index}>
        <td>
          <input type="text" placeholder="Name"
            {...register('name', {
              required: true
            })}
            className={!!errors.name ? 'error' : ''}
          />
        </td>
        <td>
          <input type="text" placeholder="Age"
            {...register('age', {
              required: true
            })}
            className={!!errors.name ? 'error' : ''}
          />
        </td>
        <td>
          <button onClick={usersUpdate}>Update</button>
          <Delete index={index} />
        </td>
      </tr>
    )
  }
  
  export default Update
  ```

</details>


## MySQL CRUD
### MySQL 연결
* [MariaDB 설치](https://github.com/ovdncids/mysql-curriculum/blob/master/Install.md)
* https://www.simplenextjs.com/posts/next-mysql
```sh
npm install mysql2
```
libraries/mysql2Pool.js
```js
import mysql2 from 'mysql2/promise'

const mysqlPool = async () => {
  if (!global.mysql2Connection) {
    const mysql2Init = async () => {
      const connection = await mysql2.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'test'
      })
      const [rows, fields] = await connection.execute(`
        select 'MySQL Connected' as Result
      `)
      console.log(rows)
      global.mysql2Connection = connection
      console.log(global.mysql2Connection)
    }
    await mysql2Init()
  }
  return global.mysql2Connection
}

export default mysqlPool
```

### Read
app/api/users/route.js
```js
import { NextResponse } from 'next/server'
import mysql2Pool from '@/libraries/mysql2Pool'

export async function GET() {
  const mysql = await mysql2Pool()
  const [rows] = await mysql.execute(`
    select
      user_pk as userPk, name, age
    from users
  `)
  console.log(rows)
  return NextResponse.json(rows)
}

export async function POST(request) {
  global.users.push(await request.json())
  return NextResponse.json({
    result: 'Created'
  })
}
```

### Create
app/api/users/route.js
```js
export async function POST(request) {
  const user = await request.json()
  const mysql = await mysql2Pool()
  const [rows] = await mysql.execute(`
    insert into users(name, age)
    values (?, ?)
  `, [user.name, user.age])
  console.log(rows)
  return NextResponse.json({
    result: 'Created'
  })
}
```

### Delete
pages/api/users/[index].js to pages/api/users/[userPk].js
```js
import mysql2Pool from '@/libraries/mysql2Pool'

export async function DELETE(_, context) {
  const mysql = await mysql2Pool()
  const [rows] = await mysql.execute(`
    delete from users
    where user_pk = ?
  `, [context.params.userPk])
  console.log(rows)
  return NextResponse.json({
    result: 'Deleted'
  })
}
```

app/users/delete.js
* `index`를 `userPk`로 바꾸기 

app/users/update.js
```diff
<Delete index={index} />
```
```js
<Delete userPk={user.userPk} />
```

### Update
pages/api/users/[userPk].js
```js
export async function PATCH(request, context) {
  const user = await request.json()
  const mysql = await mysql2Pool()
  const [rows] = await mysql.execute(`
    update users
    set name = ?, age = ?
    where user_pk = ?
  `, [user.name, user.age, context.params.userPk])
  console.log(rows)
  return NextResponse.json({
    result: 'Updated'
  })
}
```

app/users/update.js
```diff
- await usersService.usersUpdate(index, user)
```
```js
await usersService.usersUpdate(user.userPk, user)
```

## API Search
app/api/search/route.js
```js
import { NextResponse } from 'next/server'
import mysql2Pool from '@/libraries/mysql2Pool'

export async function GET(request) {
  const q = request.nextUrl.searchParams.get('q')
  const mysql = await mysql2Pool()
  const [rows] = await mysql.execute(`
    select
      user_pk as userPk, name, age
    from users
    where
      name like concat('%', ?, '%')
  `, [q])
  console.log(rows)
  return NextResponse.json(rows)
}
```

services/searchService.js
```js
export const searchService = {
  searchRead: async (q) => {
    const res = await fetch('http://localhost:3000/api/search?q=' + q, { cache: 'no-store' })
    return res.json()
  }
}
```

app/search/page.js
```js
import { searchService } from '@/services/searchService.js'

const Search = async (request) => {
  const q = request.searchParams.q || ''
  const users = await searchService.searchRead(q)
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
  )
}

export default Search
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
