# Recoil members

## Members Store 만들기

### 설치
```sh
npm install recoil
```

### Members Store 생성
src/stores/members.js
```js
import { atom } from 'recoil';

export const memberState = atom({
  key: 'memberState',
  default: {
    name: '',
    age: ''
  }
});

export const membersState = atom({
  key: 'membersState',
  default: []
});
```

## 스토어를 Provider에 등록
src/index.js
```js
import { RecoilRoot } from 'recoil';
```
```diff
- <App />
```
```js
<RecoilRoot>
  <App />
</RecoilRoot>
```

## Members Conpenent Store inject
src/components/contents/Members.js
```js
import { useRecoilState } from 'recoil';
import { memberState, membersState } from '../../stores/members';

function Members() {
  const [member, setMember] = useRecoilState(memberState);
  const [members, setMembers] = useRecoilState(membersState);
  return (
    <div>
      <h3>Members</h3>
      <hr className="d-block" />
      <div>
        <h4>Read</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>20</td>
              <td>
                <button>Update</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="d-block" />
      <div>
        <h4>Create</h4>
        <input
          type="text" placeholder="Name" value={member.name}
          onChange={event => {
            setMember({
              ...member,
              name: event.target.value
            });
          }}
        />
        <input
          type="text" placeholder="Age" value={member.age}
          onChange={event => {setMember({
            ...member,
            age: event.target.value
          });}}
        />
        <button onClick={() => {
          setMembers(members.concat({
            ...member
          }))
        }}>Create</button>
      </div>
    </div>
  )
}

export default Members;
```
