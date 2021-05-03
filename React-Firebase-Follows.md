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
    member: null,
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
  const { membersStore, followsStore } = props;
  const { members } = membersStore;
  const { follow } = followsStore;
  useEffect(() => {
    membersStore.membersRead();
  }, [membersStore]);
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
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <input type="radio" name="follow-member" value={member.key}
                    onChange={event => {follow.member = event.target.value}}
                  />
                  {member.name}
                </td>
                <td>{member.age}</td>
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
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <input type="radio" name="follow-following" value={member.key}
                    onChange={event => {follow.following = event.target.value}}
                  />
                  {member.name}
                </td>
                <td>{member.age}</td>
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
  )
}

export default inject('membersStore', 'followsStore')(observer(Follows));
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
  membersStore.membersRead();
  followsStore.followsRead();
}, [membersStore, followsStore]);
const getMemberName = (key) => {
  return members.map(member => {
    return member.key === key ? member.name : '';
  })
}
```
```js
{follows.length && members.length ? (
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
        <td>{getMemberName(follow.member)}</td>
        <td>{getMemberName(follow.following)}</td>
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
