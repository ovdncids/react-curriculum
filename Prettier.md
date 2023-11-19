# Prettier
## 기본 동작 원리
* https://www.daleseo.com/js-prettier
```sh
# 예상 포맷 적용 결과가 출력 됨
npx prettier ./index.js

# 포맷 적용으로 파일 수정
npx prettier --write ./index.js
```

## 자동 저장으로 Prettier 적용
* https://velog.io/@fbtmdals011/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-Prettier-%EC%84%A4%EC%B9%98-%ED%9B%84-%EC%9E%90%EB%8F%99%EC%A0%81%EC%9A%A9-%EC%85%8B%ED%8C%85%ED%95%98%EA%B8%B0
```sh
VSCode > 확장 프로그램 > Prettier - Code formatter 설치
VSCode > 기본 설정 > 설정 > 검색 > Editor: Default Formatter > Prettier - Code formatter 선택
VSCode > 기본 설정 > 설정 > 검색 > Format On Save > 체크
VSCode 재시작
```

### Prettier 설정 파일 생성
* https://hj-blog.github.io/frontend/Prettier
* 프로젝트 루트에 `.prettierrc` 또는 `.prettierrc.json` 파일 생성
```json
{
  "semi": false,
  "singleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": false,
  "arrowParens": "always"
}
```
* `.prettierrc` 파일을 수정 하면, 바로 다음 저장 부터 포맷이 자동으로 변경된다.

# gts (Google TypeScript Style)
* https://github.com/google/gts
* https://jhyeok.com/gts-and-husky
* 자동으로 `eslint` 설정 파일과 `prettier` 설정 파일을 생성 해준다.
```sh
npx gts init
```
* 알아서 `package.json` 파일에 설정이 추가 된다.

package.json
```diff
- next lint
+ gts lint
? Replace (y/N) Y
```

```sh
./tsconfig.json already exists
? Overwrite (y/N) N

./.eslintrc.json already exists
? Overwrite (y/N) Y
```

```sh
npm install
```
### React: While resolving: react-study-typescript@0.1.0 Found: @typescript-eslint/eslint-plugin@5.62.0
package.json
```diff
"devDependencies": {
-   "typescript": "~5.1.6",
}
```

.prettierrc.js
```js
module.exports = {
  ...require("gts/.prettierrc.json"),
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: false,
  arrowParens: "always"
}
```

## npm run lint
### ESLint couldn't find the plugin "@typescript-eslint/eslint-plugin".
```sh
npm install -D @typescript-eslint/eslint-plugin
```

### warning Strings must use singlequote quotes
.eslintrc.json
```json
{
  "rules": {
    "quotes": "off"
  }
}
```

### The 'URL' is not supported until Node.js 10.0.0. The configured version range is '>=8.0.0'
package.json
```json
{
  "engines": {
    "node": "16.17.1"
  }
}
```

## npm run fix
* `lint` 설정이 맞지 않는 부분을 가능한 것만 자동으로 수정 해준다.

# husky
* https://typicode.github.io/husky
* `Git hooks`를 편하게 설정 할 수 있다.
* `git commit` 할때 `npm run lint` 실행 시켜서 통과 하지 못하면 `git commit`을 중지 시킨다.
```sh
npm install -D husky
```

package.json
```diff
- "prepare": "npm run compile",
+ "prepare": "husky install",
```
* 기본은 `error`만 커밋 방지하지만 `warning`까지 방지 싶은 경우
```diff
- "lint": "... lint",
+ ""lint": "... lint --max-warnings=0"
```

```sh
npm run prepare
```
* `.husky` 폴더가 생성 된다.

```sh
npx husky add .husky/pre-commit "npm run lint"
```
* `.husky/pre-commit` 파일이 생성된다. 이제 부터 `git commit` 마다 `npm run lint`가 먼저 실행 된다.

# Only ESLint in Next.js (Javascript & Typescript)
.eslintrc.json
```json
{
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "semi": [2, "never"],
    "comma-dangle": "error",
    "array-bracket-spacing": "error",
    "object-curly-spacing": "error",
    "arrow-parens": "error"
  }
}
```
```sh
indent: Tab size 2
quotes: 홑따옴표 사용 유무
jsx-quotes: jsx 안에서 "" 또는 '""' 사용 유무
semi: 세미콜론 사용 유무
comma-dangle: 마지막 배열과 마지막 오브젝트에 컴마 사용 유무
array-bracket-spacing: 배열 안에 공백 유무
object-curly-spacing: 오브젝트 안에 공백 유무
arrow-parens: 화살표 함수에서 인자가 하나인 경우 () 사용 유무
```

package.json
```json
{
  "scripts": {
    "fix": "next lint --fix"
  }
}
```
* [`husky` 연동](https://github.com/ovdncids/react-curriculum/blob/master/Prettier.md#husky)

# Only ESLint in React
```sh
npx eslint --init

How would you like to use ESLint? To check syntax, find problems, and enforce code style
What type of modules does your project use? JavaScript modules (import/export)
Which framework does your project use? React
Does your project use TypeScript? (Javascript = No) / (Typescript = Yes)
Where does your code run? Browser
How would you like to define a style for your project? Answer questions about your style
What format do you want your config file to be in? JavaScript
What style of indentation do you use? Spaces
What quotes do you use for strings? Double / Single
What line endings do you use? Unix / Windows
Do you require semicolons? No
eslint-plugin-react@latest eslint@latest Would you like to install them now? (Javascript = Yes) / (Typescript = No)
Which package manager do you want to use? npm
```
```sh
npx eslin  .
npx eslin  --fix .
```

package.json
```json
"scripts": {
  "lint": "npx eslint .",
  "fix": "npx eslint --fix ."
}
```
```sh
npm run lint
npm run fix
```

## Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration
.eslintrc.js
```js
{
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## Spaces 2
```js
{
  "rules": {
    "indent": [
      "error",
      2
    ]
  }
}
```

## error  'React' must be in scope when using JSX  react/react-in-jsx-scope
.eslintrc.js
```js
"rules": {
  "react/react-in-jsx-scope": "off"
}
```

## error  'test' is not defined, error  'expect' is not defined
.eslintrc.js
```js
"env": {
  "jest": true
}
```

* [`husky` 연동](https://github.com/ovdncids/react-curriculum/blob/master/Prettier.md#husky)
