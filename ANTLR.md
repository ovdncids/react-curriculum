# ANTLR v4
* https://github.com/antlr/antlr4/blob/master/doc/getting-started.md

## 설치
```sh
pip3 install antlr4-tools

# PATH 없다는 경고 발생하면
vi ~/.zshrc

# python3
export PATH="/Users/{사용자}/Library/Python/3.9/bin:$PATH"
```

## 문법 만들기
antlr4/Expr.g4
```g4
grammar Expr;
prog:    expr EOF;
expr:    expr ('*'|'/') expr
    |    expr ('+'|'-') expr
    |    INT
    |    '(' expr ')'
    ;
NEWLINE: [\r\n]+ -> skip;
INT: [0-9]+;
```

* https://www.antlr3.org/pipermail/antlr-interest/2006-August/017207.html
```g4
grammar Expr;
prog:    expr EOF;
expr:    expr ('AND'|'OR') expr
    |    '(' expr ')'
    |    'A' '=' ('x'|'y')
    |    'B' OPERATOR VERSION
    |    'C' '(' STRINGLITERAL ')' '=' ('TRUE'|'FALSE')
    |    'D' '(' INT ')'
    ;
WS: [ \t\r\n]+ -> skip;
INT: [0-9]+;
OPERATOR: ('='|'>'|'<'|'>='|'<=');
VERSION: [0-9.]+;
STRINGLITERAL: '\'' (~'\'')* '\'';
```
* `VERSION` = `1.0.0`, `STRINGLITERAL` = `'문자'`
* `(A=x AND B >= 1.0.0) OR (C('abc')=TRUE AND D(50))`

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
* https://github.com/antlr/antlr4/blob/master/doc/typescript-target.md
```sh
cd antlr4
antlr4 -Dlanguage=JavaScript Expr.g4
# antlr4 -Dlanguage=TypeScript Expr.g4

npm install antlr4
```

test.js
```js
import antlr4 from 'antlr4';
import ExprLexer from '../antlr4/ExprLexer.js';
import ExprParser from '../antlr4/ExprParser.js';

const input = '10+20*30';
const chars = new antlr4.InputStream(input);
const lexer = new ExprLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ExprParser(tokens);
parser.buildParseTrees = true;
const tree = parser.expr();

class Visitor {
  visitChildren(ctx) {
    console.log(ctx);
    if (!ctx) {
      return;
    }
    if (ctx.children) {
      return ctx.children.map(child => {
        if (child.children && child.children.length != 0) {
          return child.accept(this);
        } else {
          return child.getText();
        }
      });
    }
  }
}
const accept = tree.accept(new Visitor());
console.log(accept);
// 결과를 볼 수 있다.
// [["10"],"+",[["20"],"*",["30"]]]
```

### 좀더 깊은 과정을 보고 싶을때
```js
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

<!-- THANOS
```g4
grammar ExpressionV1;

expression:
    PERCENT'('NUMBER')' #percent
    | OS op=(EQ|NEQ) value=OS_VALUE #os
    | OS_VER op=(EQ|NEQ|GT|GTE|LT|LTE) value=(NUMBER | NUMBER_WITH_DOT) #osVer
    | APP op=(EQ|NEQ) value=APP_VALUE #app
    | APP_VER op=(EQ|NEQ|GT|GTE|LT|LTE) value=(NUMBER | NUMBER_WITH_DOT) #appVer
    | HQL'('query=SQUOTA_STRING')' op=EQ value=BOOLEAN #hql
    | PERIOD'('from=TIME_STRING'~'to=TIME_STRING')' #period
    | HEADER'('key=DQUOTA_STRING')' op=(EQ|NEQ|CONTAINS) value=DQUOTA_STRING #header
    | expression AND expression #and
    | expression OR expression #or
    | left=LEFT_BRACKET expression right=RIGHT_BRACKET #parent
;

PERCENT: 'PERCENT';
OS: 'OS';
OS_VER: 'OS_VER';
APP: 'APP';
APP_VER: 'APP_VER';
HQL: 'HQL';
PERIOD: 'PERIOD';
HEADER: 'HEADER';

LEFT_BRACKET: '(';
RIGHT_BRACKET: ')';
EQ: '=';
NEQ: '!=';
GT: '>';
GTE: '>=';
LT: '<';
LTE: '<=';
CONTAINS: 'CONTAINS';
AND: 'AND';
OR: 'OR';

NUMBER: [0-9]+;
fragment DIGIT_1: [0-9];
fragment DIGIT_2: DIGIT_1 DIGIT_1;

BOOLEAN: 'TRUE'|'FALSE';
TIME_STRING: DIGIT_2':'DIGIT_2;
SQUOTA_STRING:  '\'' ('\\'. | '\'\'' | ~('\'' | '\\'))* '\'';
DQUOTA_STRING: '"' ('\\'. | '""' | ~('"' | '\\'))* '"';

NUMBER_WITH_DOT: NUMBER'.'NUMBER'.'?NUMBER?;
OS_VALUE: 'IOS' | 'ANDROID';
APP_VALUE: 'KAKAO_TALK' | 'KAKAO_PAY';

s: expression EOF;
WS: [ \t\r\n]+ -> skip
;
```
-->
