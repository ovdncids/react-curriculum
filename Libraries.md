# Libraries

## React Syntax Highlighter
* https://github.com/react-syntax-highlighter/react-syntax-highlighter
* https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo

```sh
npm install react-syntax-highlighter
```
```js
// 긴 한줄을 여러줄로 보기 (자동 줄바꿈)
<SyntaxHighlighter
  wrapLongLines={true}
>
  내용
</SyntaxHighlighter>
```

## XML to JSON
* https://github.com/Leonidas-from-XIV/node-xml2js
```sh
npm install xml2js
```
```js
const parseString = require('xml2js').parseString;
const xml = `
<user>
  <name>홍길동</name>
  <age>39</age>
</user>
`;
parseString(xml, function (err, result) {
  console.log(result);
});
```
