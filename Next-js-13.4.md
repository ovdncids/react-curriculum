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
* TS: `const _global: { users: User[] } = global as unknown as { users: User[] }`

services/usersService.js
```js
export const usersService = {
  usersRead: async () => {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' })
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
* TS: `request: Request`

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
import Create from './create.js'
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
* TS:
```ts
export async function DELETE(
  _: Request,
  context: { params: { index: number } }
) {
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
- import Delete from './delete.js'
+ import Update from './update.js'
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
import { usersService } from '@/services/usersService.js'
import Delete from './delete.js'

const Update = (props) => {
  const { index } = props
  const router = useRouter()
  const [user, setUser] = useState(props.user)
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
  import { usersService } from '@/services/usersService.js'
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
    }
    await mysql2Init()
  }
  return global.mysql2Connection
}

export default mysqlPool
```
* TS:
``ts
import mysql2, { Connection } from 'mysql2/promise'

const _global: { mysql2Connection: Connection } = global as unknown as {
  mysql2Connection: Connection
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

### Search 검색
app/search/page.js
```js
import SearchForm from './search-form.js'
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

pages/api/search-form.js
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
* `검색`, `뒤로가기` 해보기
* ❔ `뒤로가기` 하면 검색창이 변하지 않는다. `useEffect`를 사용해서 검색창이 변하게 하려면
* <details><summary>정답</summary>

  ```js
  useEffect(() => {
    setQ(props.q)
  }, [props.q])
  ```
</details>
