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
  "bracketSpacing": false
}
```
* `.prettierrc` 파일을 수정 하면, 바로 다음 저장 부터 포맷이 변경 된다.
