# Material UI & React Hook Form
* https://mui.com
* https://react-hook-form.com/

```sh
npm install @mui/material @emotion/react @emotion/styled
```

## Components
```sh
Backdrop: 배경 dimmed 처리 후 스피너
Clip: 버튼과 비슷한 모양의 라벨
Stepper: 단계를 표현 할때 사용
```

## TextField
```js
<TextField
  inputProps={{maxLength: 100}}
  InputLabelProps={{shrink: true}}
></TextField>
```
```js
<TextField
  onBlur={() => {
    form.setValue('name', form.getValues('name').trim());
    form.trigger('name');  // name만 Validation 검사
  }}
/>
```

## Select
* https://react-hook-form.com/api/usecontroller/controller
```js
import {Controller} from 'react-hook-form';

<FormControl variant="standard">
  <InputLabel id="status-label">상태</InputLabel>
  <Controller
    control={control}
    name="status"
    render={({field}) => (
      <Select
        {...field}
        labelId="status-label"
        id="status-id"
        style={{backgroundColor: 'unset'}}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="menu">메뉴</MenuItem>
      </Select>
    )}
  />
</FormControl>
```

## Progress bar
```js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(true));
    router.events.on('routeChangeComplete', () => setOpen(false));
    router.events.on('routeChangeError', () => setOpen(false));
  }, [router.events]);
  return (
    <Box sx={{width: '100%', minWidth: '1942px', position: 'absolute'}}>
      {open && <LinearProgress />}
    </Box>
  );
};

export default ProgressBar;
```
* ProgressBar 컴포넌트를 `최상위` index.js나 app.js에 넣어 준다.

## Slider
```js
<Slider onChangeCommitted={() => {}}></Slider>
```
* `onChangeCommitted` 슬라이더가 이동 완료 되면 실행됨

## Checkbox (배열, 쿼리스트링)
* https://ultimatecourses.com/blog/navigate-to-url-query-strings-search-params-react-router
```js
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const categories = searchParams.getAll('categories');
  const categoriesJSON = JSON.stringify(categories);

  const categoriesCheck = (category) => {
    if (categories.includes(category)) {
      categories.splice(categories.findIndex((_category) => _category === category), 1);
    } else {
      categories.push(category);
    }
    navigate({
      pathname: '/categories',
      search: '?' + createSearchParams({
        page: 1,
        categories
      })
    })
  };

  const categoriesChecked = (category) => {
    return categories.includes(category);
  };

  useEffect(() => {
    setProducts(JSON.parse(categoriesJSON));
  }, [categoriesJSON, location.search]);
  return (
    <>
      <div>
        <FormControlLabel control={<Checkbox onClick={() => categoriesCheck('jacket')} checked={categoriesChecked('jacket')} />} label="자켓"/>
        <FormControlLabel control={<Checkbox onClick={() => categoriesCheck('hood')} checked={categoriesChecked('hood')} />} label="후드"/>
        <FormControlLabel control={<Checkbox onClick={() => categoriesCheck('sweatshirt')} checked={categoriesChecked('sweatshirt')}/>} label="스웨트셔츠"/>
        <FormControlLabel control={<Checkbox onClick={() => categoriesCheck('neat')} checked={categoriesChecked('neat')}/>} label="니트웨어"/>
      </div>
      <div>
        {products.map((product, index) => (
          <div key={index}>{product}</div>
        ))}
      </div>
    </>
  );
}

export default Categories;
```
```diff
- setProducts(JSON.parse(categoriesJSON));
+ categoriesGet();
```
```js
const categoriesGet = () => {
  axios.get('http://localhost:3100/api/v1/products', {
    params: createSearchParams({
      page: 1,
      categories
    })
  }).then((response) => {
    setProducts(response.data);
  });
};
```
* ❕ `React Hook useEffect has a missing dependency: 'categoriesGet'.` 피하려면 컴포넌트 상단에 `categoriesGet` 받을 객체를 하나 만든다.
```diff
window.categoriesGet = categoriesGet;

- categoriesGet()
+ window.categoriesGet();
```

### 무한 스크롤 (Infinite Scroll)
```js
const paging = {
  page: 1,
  categoriesGet: null,
  isLoading: false
};
function Categories() {
```
* 컴포넌트 위에 `paging` 오브젝트 선언 

```js
paging.categoriesGet = categoriesGet;
useEffect(() => {
  const infiniteScroll = () => {
    // if (window.innerHeight + window.scrollY >= document.getElementById('root').offsetHeight) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      paging.categoriesGet();
    }
  };
  window.addEventListener('scroll', infiniteScroll);
  return () => {
    window.removeEventListener('scroll', infiniteScroll);
  };
}, []);
```
* ❕ useEffect에서 바로 `categoriesGet();`를 사용 한다면 categoriesGet 함수 호출시 products는 항상 처음 렌더링 할때 초기값 `[]`을 가리키므로 concat은 `[]`을 추가 한다.
* 렌더링 될때 마다 `categoriesGet` 함수도 다시 선언되고 컴포넌트 안의 변수들도 새롭게 할당 된다.

```js
const makeSearchParams = (params) => {
  const _params = {
    categories
  };
  if (params.page) _params.page = params.page;
  return createSearchParams(_params);
};

const categoriesGet = () => {
  if (paging.isLoading) return;
  paging.isLoading = true;
  axios.get('http://localhost:8081/api/v1/products', {
    params: makeSearchParams({
      page: paging.page
    })
  }).then((response) => {
    if (paging.page === 1) {
      setProducts(response.data);
    } else if (paging.page < 5) {
      setProducts([].concat(products, response.data));
    }
  }).finally(() => {
    paging.page++;
    paging.isLoading = false;
  });
};
```
* `createSearchParams` 함수는 양쪽에서 쓰이므로 공용 함수 `makeSearchParams`를 선언 한다.

```js
useEffect(() => {
  paging.page = 1;
  paging.categoriesGet();
}, [location.search]);
```
* 쿼리스트링이 변경 될 경우 `page = 1`

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
### 기본
Users.js
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
  const user = userForm.getValues();
  const usersForm = useForm({
    defaultValues: {
      users: []
    }
  });
  const usersFieldArray = useFieldArray({ control: usersForm.control, name: 'users' });
  const { register: usersRegister } = usersForm;
  const users = usersForm.getValues('users');
  console.log(user, users);
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
            {users.map((user, index) => (
              <tr key={index}>
                <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.name`)} /></td>
                <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.age`)} /></td>
                <td>
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

### FormProvider
Users.js
```js
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import UsersRead from './UsersRead.js';

return (
  <FormProvider userForm={userForm} usersForm={usersForm}>
    <div ...
      <UsersRead />
  </FormProvider>
);
```

UsersRead.js
```js
import { useFormContext, useFieldArray } from 'react-hook-form';

function UsersRead() {
  const { usersForm } = useFormContext();
  const usersFieldArray = useFieldArray({ control: usersForm.control, name: 'users' });
  const { register: usersRegister } = usersForm;
  const users = usersForm.getValues('users');
  return (
    <tbody>
      {/* usersFieldArray.fields.map을 사용하는 경우, 자식 컴포넌트에서는 렌더링이 되지 않는다. */}
      {users.map((user, index) => (
        <tr key={index}>
          <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.name`)} /></td>
          <td><input type="text" placeholder="Name" {...usersRegister(`users.${index}.age`)} /></td>
          <td>
            <button onClick={() => usersFieldArray.update(index, usersForm.getValues(`users.${index}`))}>Update</button>
            <button onClick={() => usersFieldArray.remove(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default UsersRead;
```

### handleSubmit
Users.js
```js
const userFormSubmit = userForm.handleSubmit(() => {});
const usersCreate = async () => {
  userForm.clearErrors();
  await userFormSubmit();
  if (Object.keys(userForm.formState.errors).length) return; 
  usersFieldArray.append(userForm.getValues());
};

<input type="text" placeholder="Name" {...userRegister('name', { required: true, pattern: /^[a-zA-Z]/ })} />
{userForm.formState.errors.name ? userForm.formState.errors.name.type : ''}
<button onClick={usersCreate}>Create</button>
```
* `errors` 처리를 위해 `Material UI`를 사용하자.

### yup
* https://velog.io/@jamieecode/react-hook-form-yup%EC%9C%BC%EB%A1%9C-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0
```sh
npm install yup @hookform/resolvers
```
```js
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const userForm = useForm({
  defaultValues: {
    name: '홍길동',
    age: 39
  },
  resolver: yupResolver(yup.object().shape({
    name: yup.string().min(3).max(8).required("name is required."),
    age: yup.number().required("age is required.")
  }))
});

<input type="text" placeholder="Name" {...userRegister('name')} />
```