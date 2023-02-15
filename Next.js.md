# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup
```sh
npx create-next-app@latest 프로젝트명 --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

## typescript
* https://nextjs.org/docs/basic-features/typescript
```sh
npx create-next-app@latest --ts
```

## Scss
* https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
```sh
npm install --save-dev sass
```

styles/global.scss
```scss
body {
  background-color: red;
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

## Layouts
* https://nextjs.org/docs/basic-features/layouts

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

## ActiveLink
* https://github.com/vercel/next.js/tree/canary/examples/active-class-name
* <details><summary>ActiveLink 소스</summary>

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

```ts
<ActiveLink activeClassName="active" href="/users">
  <a>Users</a>
</ActiveLink>
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

## serverless-mysql
* https://www.simplenextjs.com/posts/next-mysql

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
