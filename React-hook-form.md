# React-hook-form
* https://react-hook-form.com/get-started

```sh
npm install react-hook-form
```

## 배열로 radio 핸들링
src/App.js
```js
import { useForm, useFieldArray } from 'react-hook-form';

function App() {
  const form = useForm({
    defaultValues: {
      title: '',
      buckets: [
        { id: 0, show: true },
        { id: 1, show: false },
        { id: 2, show: false }
      ]
    }
  });
  const { control, register } = form;
  const { fields } = useFieldArray({ control, name: 'buckets' });
  // ❕ useFieldArray는 buckets를 복사 한다. 하지만 { id: '변경된 아이디 값', show: true } id값을 변경한다. (id가 없으면 생성)
  // ❕ const { fields } = useFieldArray({ keyName: 'key', control, name: 'buckets' }); 이렇게 key 변경 가능함.
  const buckets = fields;
  const bucketShow = (i) => {
    // form.watch 후에 bucket.show, form.setValue 값을 변경 해주어야 radio 버튼이 정상 클릭 가능
    form.watch('buckets');
    buckets.forEach((bucket, j) => {
      bucket.show = i === j;
      form.setValue(`buckets.${j}.show`, i === j);
    });
    console.log(form.getValues());
  };
  return (
    <div>
      <input {...register('title')} />
      {buckets.map((bucket, index) => (
        <span key={index}>
          <input
            id={index}
            type="radio"
            value={index}
            checked={bucket.show}
            onChange={() => bucketShow(index)}
          /><label htmlFor={index}>{index}</label>
        </span>
      ))}
    </div>
  );
}

export default App;
```

## reset을 활용 하여 새로운 값으로 전체 변경
```js
// 폼의 defaultValues값으로 돌림
form.reset();

// setValue는 값 하나만 수정 가능
form.setValue('name', '이순신');

// 폼에 새로운 값으로 전체 초기화함
form.reset({
  name: '홍길동',
  age: 39
});
```

## isDirty
```js
const { formState: {isDirty} } = form;
```
* `value`가 수정 되면 `true`, 수정 후 다시 처음과 같아지면 `false`

## Clone
```js
const formClone = useForm({
  defaultValues: {...form.getValues()}
});
```

## Users
```js
import { useForm, useFieldArray } from 'react-hook-form';

function Users() {
  const userForm = useForm({
    defaultValues: {
      name: '홍길동',
      age: 39
    }
  });
  const { register: userRegister } = userForm;
  const usersForm = useForm({
    defaultValues: {
      users: []
    }
  });
  const usersFieldArray = useFieldArray({ control: usersForm.control, name: 'users' });
  const { register: usersRegister } = usersForm;
  console.log(userForm.getValues(), usersFieldArray.fields);
  return (
    <div>
      <h3>Users</h3>
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
            {usersFieldArray.fields.map((user, index) => (
              <tr key={user.id}>
                <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.name`)} /></td>
                <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.age`)} /></td>
                <td>
                  {/* usersFieldArray.fields[index]으로 update 하면 append 시점의 정보를 받게 된다. */}
                  <button onClick={() => usersFieldArray.update(index, usersForm.getValues(`users.${index}`))}>Update</button>
                  <button onClick={() => usersFieldArray.remove(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="d-block" />
      <div>
        <h4>Create</h4>
        <input type="text" placeholder="Name" {...userRegister('name')} />
        <input type="text" placeholder="Age" {...userRegister('age')} />
        <button onClick={() => usersFieldArray.append(userForm.getValues())}>Create</button>
      </div>
    </div>
  );
}

export default Users;
```
