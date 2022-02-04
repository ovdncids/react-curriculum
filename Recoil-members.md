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

## Members Store CRUD
### Read
src/components/contents/Members.js
```diff
- <tr>
-   <td>홍길동</td>
-   <td>20</td>
-   <td>
-     <button>Update</button>
-     <button>Delete</button>
-   </td>
- </tr>
```
```js
{members.map((member, index) => (
  <tr key={index}>
    <td>{member.name}</td>
    <td>{member.age}</td>
    <td>
      <button>Update</button>
      <button>Delete</button>
    </td>
  </tr>
))}
```

### Delete
src/components/contents/Members.js
```diff
- <button>Delete</button>
```
```js
<button onClick={() => {
  members.splice(index, 1);
  setMembers(members);
}}>Delete</button>
```
* `Delete` 버튼 눌러 보기

```diff
- const [members, setMembers] = useRecoilState(membersState);
+ const [[...members], setMembers] = useRecoilState(membersState);
```
* `전개 구조` 설명 하기

### Update
src/components/contents/Members.js
```diff
- <td>{member.name}</td>
- <td>{member.age}</td>
```
```js
<td>
  <input
    type="text" placeholder="Name" value={member.name}
    onChange={event => {
      member.name = event.target.value;
      members[index] = member;
      setMembers(members);
    }}
  />
</td>
<td>
  <input
    type="text" placeholder="Age" value={member.age}
    onChange={event => {
      member.age = event.target.value;
      members[index] = member;
      setMembers(members);
    }}
  />
</td>
```
* `Input box` 수정 해보기

```diff
- {members.map((member, index) => (
+ {members.map(({...member}, index) => (
```
* `전개 구조` 설명 하기
