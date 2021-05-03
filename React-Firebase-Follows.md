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
    axios.post('https://ovdncids-red-firebase-default-rtdb.firebaseio.com/follows.json', this.follow).then((response) => {
      console.log('Done followsCreate', response);
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
      <hr className="d-block" />
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
