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
