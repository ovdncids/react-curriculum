# React-hook-form
* https://react-hook-form.com/get-started

```sh
npm install react-hook-form
```

## 배열에 radio 핸들링
src/App.js
```js
import { useForm, useFieldArray } from 'react-hook-form';

function App() {
  const form = useForm({
    defaultValues: {
      title: '',
      buckets: [
        { show: true },
        { show: false },
        { show: false }
      ]
    }
  });
  const { control, register } = form;
  const { fields } = useFieldArray({ control, name: 'buckets' });
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
