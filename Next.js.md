# Next.js

## Install
* https://nextjs.org/learn/basics/create-nextjs-app/setup

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
