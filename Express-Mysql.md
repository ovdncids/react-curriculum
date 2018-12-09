# Express with Mysql

## 이전 수행되어야 할 쿼리
```sql
CREATE DATABASE reactTestDB DEFAULT CHARACTER SET utf8 collate utf8_general_ci;
USE reactTestDB;
CREATE TABLE member (
  idx INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  age INT NOT NULL,
  createdDate DATETIME NOT NULL
);
```

## mysql connection 설치
```sh
npm install --save mysql
```

## mysql connection 정보 파일 생성
connection-mysql.js
```js
const mysql = require('mysql');
const connections = {
  product: {
    host: '10.0.0.1',
    user: 'user',
    password: 'password',
    database: 'database'
  },
  dev: {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'reactTestDB'
  }
};

process.env.NODE_ENV = 'product';
if (process.env.USER === 'ec2-user') {
  process.env.NODE_ENV = 'dev';
}
const connection = mysql.createPool(connections[process.env.NODE_ENV]);

const error = function (req, res, err) {
  console.error('Start: err.sql');
  console.error(err.sql);
  console.error('End: err.sql');
  err.sql = undefined;
  res.status(500).send(err);
  return false;
};

module.exports = {
  db: connection,
  err: error
};

```

## /api/v1/member 라우터 수정
routes/member.js

### create
```js
const connection = require('../connection-mysql');
const db = connection.db;
const dbError = connection.err;

router.post('/', (req, res) => {
  const member = req.body;
  const sql = `
  INSERT INTO member(name, age, createdDate)
  VALUES (?, ?, NOW())
  `;
  db.query(sql, [member.name, member.age], err => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Created'
      });
    }
  });
});

```

### read
```js
router.get('/', (req, res) => {
  const sql = `
  SELECT * FROM member ORDER BY createdDate DESC
  `;
  db.query(sql, (err, rows) => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Success',
        members: rows
      });
    }
  });
});

```

### update
```js
router.put('/:idx', (req, res) => {
  const member = req.body;
  const sql = `
  UPDATE member SET name = ?, age = ?
  WHERE idx = ?
  `;
  db.query(sql, [member.name, member.age, req.params.idx], (err, rows) => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Updated'
      });
    }
  });
});

```
```diff
- axios.put('/api/v1/member', {key, member}).then(response => {
+ axios.put(`/api/v1/member/${member.idx}`, member).then(response => {
```

### delete
```js
router.delete('/:idx', (req, res) => {
  const sql = `
  DELETE FROM member
  WHERE idx = ?
  `;
  db.query(sql, [req.params.idx], err => {
    if (!err || dbError(req, res, err)) {
      res.status(200).send({
        result: 'Deleted'
      });
    }
  });
});

```
```diff
- axios.delete(`/api/v1/member/${key}`).then(response => {
+ axios.delete(`/api/v1/member/${this.members[key].idx}`).then(response => {
```
