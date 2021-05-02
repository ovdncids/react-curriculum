# React Firebase Follow
src/App.js
```js
import Follows from './components/contents/Follows.js';

<Route exact={true} path="/follows" component={Follows} />
```

src/components/Nav.js
```js
<li><h2><NavLink to="follows" exact={true} activeClassName='active'>Follows</NavLink></h2></li>
```

src/stores/MembersStore.js
```js
memberFollow = {
  member: null,
  following: null
};

membersFollow() {
  axios.post('https://firebase-default-rtdb.firebaseio.com/follows.json', this.memberFollow).then((response) => {
    console.log('Done membersCreate', response);
    this.membersRead();
  }).catch((error) => {
    axiosError(error);
  });
}
```

src/components/contents/Follows.js
```js
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Follows(props) {
  const { membersStore } = props;
  const { members, memberFollow } = membersStore;
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
                    onChange={event => {memberFollow.member = event.target.value}}
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
                    onChange={event => {memberFollow.following = event.target.value}}
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
        <button onClick={() => membersStore.membersFollow()}>Follow</button>
      </div>
    </div>
  )
}

export default inject('membersStore')(observer(Follows));
```
