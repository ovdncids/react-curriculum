# React with Firebase

## Firebase Realtime Database 설정
Database 규칙
```json
{
  "rules": {
    "member": {
      ".read": true,
    	".write": true
    }
  }
}
```

## Firebase 설치
```sh
npm install --save firebase
```

index.js
```js
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
});

```

## CRUDStore 수정

### create
CRUDStore.js
```js
import * as firebase from 'firebase/app';

create(spinnerTarget) {
  ...

  const spinner = utils.spinner().spin(spinnerTarget);
  firebase.database().ref('member').push({
    name: this.member.name,
    age: Number(this.member.age),
    createdDate: moment().format()
  }).then(response => {
    console.log(response);
    spinner.stop();
    utils.toastr().success('Created');
  }).catch(error => {
    utils.apiCommonError(error, spinner);
  });
}
```

### read
```js
read() {
  this.membersListener = firebase.database().ref('member');
  this.membersListener.on('value', snapshot => {
    utils.nProgress.start();
    const members = _.map(snapshot.val(), (member, uid) => {
      member.uid = uid;
      return member;
    });
    this.members = _.orderBy(members, ['createdDate'], ['desc']);
    utils.nProgress.done();
  })
}

readOff() {
  if (this.membersListener) {
    this.membersListener.off();
  }
}

```

CRUD.js
```js
componentWillUnmount() {
  const { crudStore } = this.props;
  crudStore.readOff();
}

```

### update
```diff
- const member = this.members[key];
+ const member = {
+   ...this.members[key]
+ };
+ delete member.uid;
```
```js
update(spinnerTarget, key) {
  ...
  const spinner = utils.spinner().spin(spinnerTarget);
  firebase.database().ref(`member/${this.members[key].uid}`).update(member).then(response => {
    console.log(response);
    spinner.stop();
    utils.toastr().success('Updated');
  }).catch(error => {
    utils.apiCommonError(error, spinner);
  });
}

```

### delete
```js
delete() {
  ...
  const spinner = utils.spinner().spin(spinnerTarget);
  firebase.database().ref(`member/${this.members[key].uid}`).remove().then(response => {
    console.log(response);
    spinner.stop();
    utils.toastr().success('Deleted');
  }).catch(error => {
    utils.apiCommonError(error, spinner);
  });
}
```
```diff
- import axios from 'axios';
```
