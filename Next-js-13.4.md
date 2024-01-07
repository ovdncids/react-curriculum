# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup
```sh
npx create-next-app@latest
# npx create-next-app@13.5.6 (node 16버전으로 사용할 수 있는 latest 버전)
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
* [Javascript & Typescript](https://github.com/ovdncids/react-curriculum/blob/master/Prettier_ESLint.md#only-eslint-in-nextjs-javascript--typescript)
  * next.config.js
  ```js
  const nextConfig = {
    eslint: {
      dirs: ["/"]
    }
  }
  ```
* [GTS (Typescript)](https://github.com/ovdncids/react-curriculum/blob/master/Prettier_ESLint.md#gts-google-typescript-style)

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
import Nav from './nav'
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
  console.log(users)
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
* `console.log(users)`가 어디에 찍히는지 확인

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
* TS: `declare global { var users: User[] }`

services/usersServices.js
```js
export const usersServices = {
  usersRead: async () => {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' })
    return res.json()
  }
}
```
* ❕ `http://localhost:3000/api/users`는 서버 사이드이므로 `Endpoint`를 절대 경로로 넣어야 한다.

app/users/page.js
```js
import { usersServices } from '@/services/usersServices'
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
const users = await usersServices.usersRead()
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
* TS: `request: NextRequest`

services/usersServices.js
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
* ❕ `import { useState } from 'react'` `const [user, setUser] = useState()` 넣어보기

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
* <details><summary>react-hook-form</summary>

  ```sh
  npm install react-hook-form
  ```
  ```js
  'use client'
  import { useRouter } from 'next/navigation'
  import { useForm } from 'react-hook-form'
  import { usersServices } from '@/services/usersServices'
  
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
        await usersServices.usersCreate(userForm.getValues())
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
import { usersServices } from '@/services/usersServices'

const Create = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    name: '',
    age: ''
  })
  const usersCreate = async () => {
    await usersServices.usersCreate(user)
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
* ❕ `'use client'` 빼보기

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
* TS:
```ts
export async function DELETE(
  _: Request,
  context: { params: { index: number } }
) {
```

services/usersServices.js
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
import { usersServices } from '@/services/usersServices'

const Delete = ({index}) => {
  const router = useRouter()
  return (
    <button onClick={async () => {
      await usersServices.usersDelete(index)
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

services/usersServices.js
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
<Update key={index} index={index} user={user} />
```

app/users/update.js
```js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usersServices } from '@/services/usersServices'
import Delete from './delete'

const Update = (props) => {
  const { index } = props
  const router = useRouter()
  const [user, setUser] = useState(props.user)
  const usersUpdate = async () => {
    await usersServices.usersUpdate(index, user)
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
const [user, setUser] = useState({
  name: '',
  age: ''
})

useEffect(() => {
  setUser(props.user)
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
  import { usersServices } from '@/services/usersServices'
  import Delete from './delete'
  
  const Update = (props) => {
    const { index } = props
    const router = useRouter()
    const userForm = useForm({
      defaultValues: {...props.user}
    })
    const { register, formState, formState: {errors} } = userForm
    const userFormSubmit = userForm.handleSubmit(() => {})
    const usersUpdate = async () => {
      userForm.clearErrors()
      await userFormSubmit()
      if (Object.keys(formState.errors).length === 0) {
        await usersServices.usersUpdate(index, userForm.getValues())
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
### MySQL2 연결
* [MariaDB 설치](https://github.com/ovdncids/mysql-curriculum/blob/master/Install.md)
* [npm install mysql2](https://github.com/sidorares/node-mysql2)
* [Next.js with Library](https://www.simplenextjs.com/posts/next-mysql)
* [Next.js with MySQL 2](https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-nextjs)
* [MySQL 연결 지속 시간](https://stackoverflow.com/questions/5397776/how-long-does-a-mysql-connect-stay-open)
* [Can't add new command when connection is in closed state](https://greedthread.github.io/2021/03/09/Mysql2-%EB%AA%A8%EB%93%88%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9E%A5%EC%8B%9C%EA%B0%84-%EC%BC%9C%EB%86%93%EC%9D%84%EC%8B%9C-%EC%BB%A4%EB%84%A5%EC%85%98-%EC%98%88%EC%99%B8%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%8A%88.html)
* `waitForConnections`부터 `enableKeepAlive`까지는 `pool`이 계속 살아있게 한다.

```sh
npm install mysql2
```
libraries/mysql2Pool.js
```js
import mysql2 from 'mysql2/promise'

const mysql2Pool = async () => {
  if (!global.mysql2Pool) {
    const mysql2Pool = mysql2.createPool({
      host: "localhost",
      user: "user",
      password: "password",
      database: "test",

      connectionLimit: 1,
      maxIdle: 1,
      enableKeepAlive: true
    })
    const [rows, fields] = await mysql2Pool.execute(`
      select 'MySQL Connected' as Result
    `)
    console.log(rows)
    global.mysql2Pool = mysql2Pool
  }
  return global.mysql2Pool
}

export default mysql2Pool
```
* TS:
```ts
import mysql2, { Connection } from 'mysql2/promise'

declare global {
  var mysql2Connection: Connection
}
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
* TS:
```ts
import { RowDataPacket, FieldPacket } from 'mysql2/promise'

const [rows, _]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
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
- <Delete index={index} />
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
- await usersServices.usersUpdate(index, user)
```
```js
await usersServices.usersUpdate(user.userPk, user)
```

services/usersServices.js
* `index`를 `userPk`로 바꾸기 

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
* http://localhost:3000/api/search?q=홍

services/searchServices.js
```js
export const searchServices = {
  searchRead: async (q) => {
    const res = await fetch('http://localhost:3000/api/search?q=' + q, { cache: 'no-store' })
    return res.json()
  }
}
```

app/search/page.js
```js
import { searchServices } from '@/services/searchServices'

const Search = async (request) => {
  const q = request.searchParams.q || ''
  const users = await searchServices.searchRead(q)
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
* https://nextjs.org/docs/app/api-reference/file-conventions/page
* TS: request: { searchParams: { q: string } }
* http://localhost:3000/search?q=홍
* `검색`, `뒤로가기` 해보기

### Search 검색
app/search/page.js
```js
import SearchForm from './search-form'
```
```diff
- <form>
-   <input type="text" placeholder="Search" />
-   <button>Search</button>
- </form>
```
```js
<SearchForm q={q} />
```

app/search/search-form.js
```js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SearchForm = (props) => {
  const router = useRouter()
  const [q, setQ] = useState(props.q)
  const searchRead = (event) => {
    event.preventDefault()
    router.push('?q=' + q)
  }
  return (
    <form onSubmit={searchRead}>
      <input
        type="text" placeholder="Search"
        value={q}
        onChange={(event) => {setQ(event.target.value)}}
      />
      <button>Search</button>
    </form>
  )
}

export default SearchForm
```
* TS: `event: React.FormEvent<HTMLFormElement>`
* `검색`, `뒤로가기` 해보기
* ❔ `뒤로가기` 하면 검색창이 변하지 않는다. `useEffect`를 사용해서 검색창이 변하게 하려면
* <details><summary>정답</summary>

  ```js
  useEffect(() => {
    setQ(props.q)
  }, [props.q])
  ```
</details>

## 환경 설정
* https://github.com/ovdncids/react-curriculum/blob/master/Next-js.md#환경-설정

## 빌드, 배포
```sh
# 운영 환경 배포전 빌드
npm run build
```

### Error: connect ECONNREFUSED 127.0.0.1:3000 오류 발생시
`Generating static pages (0/8)TypeError: fetch failed`

services/usersServices.js
```js
usersRead: async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store'
    })
    return res.json()
  } catch (error) {
    return []
  }
},
```
* ❕ Next.js는 build 시 `page.js 파일들`을 사전 랜더하므로 오류가 나오면 build가 중단 된다.
* ❕ 따라서 `page.js` 파일들의 통신은 `try catch` 해주어야 한다. (주로 `read` 통신)

```sh
# 운영 환경
npm run start
```
