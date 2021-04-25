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

export default function Home() {
  return <div>
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

## https
https://www.gatsbyjs.com/docs/local-https
```sh
npm run develop -- --https
```
