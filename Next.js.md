# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup
```sh
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
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
import '../styles/global.scss';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Layouts
* https://nextjs.org/docs/basic-features/layouts

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
import { Button } from 'antd';

<Button type="primary">button</Button>
```

## 404
pages/404.js
```js
export default function Custom404() {
  return <div>404</div>;
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
