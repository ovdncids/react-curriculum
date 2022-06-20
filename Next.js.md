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
