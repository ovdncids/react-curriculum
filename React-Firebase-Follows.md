# React Firebase Follows

## Follows Create
src/stores/FollowsStore.js
```js
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { axiosError } from './common.js';

export default class FollowsStore {
  constructor() {
    makeAutoObservable(this);
  }

  follows = [];
  follow = {
    user: null,
    following: null
  };

  followsCreate() {
    axios.post('https://firebase-default-rtdb.firebaseio.com/follows.json', this.follow).then((response) => {
      console.log('Done followsCreate', response);
      // this.followsRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const followsStore = new FollowsStore();
```

src/index.js
```js
import { followsStore } from './stores/FollowsStore';

followsStore={followsStore}
```

src/components/contents/Follows.js
```js
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Follows(props) {
  const { usersStore, followsStore } = props;
  const { users } = usersStore;
  const { follow } = followsStore;
  useEffect(() => {
    usersStore.usersRead();
  }, [usersStore]);
  return (
    <div>
      <h3>Follow</h3>
      <div style={{display: 'flex'}}>
        <div>
          <table className="table-search">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <input type="radio" name="follow-user" value={user.key}
                    onChange={event => {follow.user = event.target.value}}
                  />
                  {user.name}
                </td>
                <td>{user.age}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div>
          <table className="table-search">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <input type="radio" name="follow-following" value={user.key}
                    onChange={event => {follow.following = event.target.value}}
                  />
                  {user.name}
                </td>
                <td>{user.age}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button onClick={() => followsStore.followsCreate()}>Follow</button>
      </div>
    </div>
  );
}

export default inject('usersStore', 'followsStore')(observer(Follows));
```

src/App.js
```js
import Follows from './components/contents/Follows.js';

<Route exact={true} path="/follows" component={Follows} />
```

src/components/Nav.js
```js
<li><h2><NavLink to="follows" exact={true} activeClassName='active'>Follows</NavLink></h2></li>
```

## Follows Read
src/stores/FollowsStore.js
```diff
- // this.followsRead();
+ this.followsRead();
```
```js
followsRead() {
  axios.get('https://firebase-default-rtdb.firebaseio.com/follows.json').then((response) => {
    console.log('Done followsRead', response);
    const follows = [];
    for(const key in response.data) {
      response.data[key].key = key;
      follows.push(response.data[key]);
    }
    this.follows = follows;
  }).catch((error) => {
    axiosError(error);
  });
}
```

src/components/contents/Follows.js
```diff
- useEffect(() => {
```
```js
useEffect(() => {
  usersStore.usersRead();
  followsStore.followsRead();
}, [usersStore, followsStore]);
const getUserName = (key) => {
  return users.map(user => {
    return user.key === key ? user.name : '';
  })
}
```
```js
{follows.length && users.length ? (
<div>
  <hr className="d-block" />
  <h3>Follows</h3>
  <table className="table-search">
    <thead>
      <tr>
        <th>Name</th>
        <th>Following</th>
      </tr>
    </thead>
    <tbody>
    {follows.map((follow, index) => (
      <tr key={index}>
        <td>{getUserName(follow.user)}</td>
        <td>{getUserName(follow.following)}</td>
      </tr>
    ))}
    </tbody>
  </table>
</div>
) : undefined}
```

## Follows Delete
src/stores/FollowsStore.js
```js
followsDelete(key) {
  axios.delete(`https://firebase-default-rtdb.firebaseio.com/follows/${key}.json`).then((response) => {
    console.log('Done followsDelete', response);
    this.followsRead();
  }).catch((error) => {
    axiosError(error);
  });
}
```

src/components/contents/Follows.js
```js
<th>Delete</th>
```
```js
<td>
  <button onClick={() => followsStore.followsDelete(follow.key)}>Delete</button>
</td>
```
