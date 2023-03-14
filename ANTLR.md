# ANTLR v4
* https://github.com/antlr/antlr4/blob/master/doc/getting-started.md

## 설치
```sh
pip3 install antlr4-tools

# PATH 정의 없다는 경고가 발생하면
vi ~/.zshrc

# python3
export PATH="/Users/{사용자}/Library/Python/3.9/bin:$PATH"
```

## 문법 만들기
antlr4/Expr.g4
```g4
grammar Expr;
prog:    expr EOF ;
expr:    expr ('*'|'/') expr
    |    expr ('+'|'-') expr
    |    INT
    |    '(' expr ')'
    ;
NEWLINE : [\r\n]+ -> skip;
INT     : [0-9]+ ;
```

### 테스트
```sh
antlr4-parse Expr.g4 prog -tree
10+20*30
^D

# 결과
(prog:1 (expr:2 (expr:3 10) + (expr:1 (expr:3 20) * (expr:3 30))) <EOF>)
```

## Javascript로 만들기
* https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md
```sh
cd antlr4
antlr4 -Dlanguage=JavaScript Expr.g4
```

test.js
```js
import antlr4 from 'antlr4';
import ExprLexer from '../antlr4/ExprLexer.js';
import ExprParser from '../antlr4/ExprParser.js';
import ExprListener from '../antlr4/ExprListener.js';

const input = '10+20*30';
const chars = new antlr4.InputStream(input);
const lexer = new ExprLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ExprParser(tokens);
parser.buildParseTrees = true;
const tree = parser.expr();
const exprListener = new ExprListener();
antlr4.tree.ParseTreeWalker.DEFAULT.walk(exprListener, tree);
```

antlr4/ExprListener.js
```js
enterProg(ctx) {
  console.log('enterProg', ctx);
}
```
