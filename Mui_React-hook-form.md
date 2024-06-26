# Material UI & React Hook Form & Tailwind & CKEditor 5
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

## Popper (부모에 종속되는 자식 레이어 팝업)
* `Popper`는 기본적으로 토글 형식이므로 `ESC키`로 닫고 싶을 경우 `Popover`를 사용한다.
```tsx
const ref = useRef(null)
<Button ref={ref}>버튼</Button>
<Popper
  sx={{zIndex: 1}}
  open={true}
  anchorEl={ref}
  nonce={undefined}
  onResize={undefined}
  onResizeCapture={undefined}
>
  <Paper>
    <ClickAwayListener
      onClickAway={() => {}}
    />
      <MenuList>
        <MenuItem></MenuItem>
      </MenuList>
    </ClickAwayListener>
  </Paper>
</Popper>
```

## Select
* https://react-hook-form.com/api/usecontroller/controller
```js
import {Controller} from 'react-hook-form';

<FormControl variant="standard">
  <InputLabel shrink id="status-label">상태</InputLabel>
  <Controller
    control={control}
    name="status"
    render={({field}) => (
      <Select
        {...field}
        labelId="status-label"
        id="status-id"
        style={{backgroundColor: 'unset'}}
        onChange={(event) => field.onChange(event)}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="menu">메뉴</MenuItem>
      </Select>
    )}
  />
</FormControl>
```
* ❕ `select`, `checkbox`, `radio`는 `<Controller />`를 사용해야 불필요한 오류를 만나지 않는다.

### Select shrink outlined 경우 라벨이 보더가 가리는 경우
* https://github.com/mui/material-ui/issues/21394
```js
<FormControl variant="outlined">
  <InputLabel shrink>{label}</InputLabel>
  <Select input={<OutlinedInput notched label={label} />} />
</FormControl>
```

## Radio
```js
<Controller
  control={control}
  name="radio"
  render={({field}) => (
    <RadioGroup {...field} row>
      <FormControlLabel
        label="ON"
        control={
          <Radio
            value={true}
            onClick=(() => {
              setTimeout(() => {
                form.setValue('radio', true)
              })
            })
        }
      />
      <FormControlLabel
        label="OFF"
        control={
          <Radio
            value={false}
            onClick=(() => {
              setTimeout(() => {
                form.setValue('radio', false)
              })
            })
        }
      />
    </RadioGroup>
  )}
/>
```
* ❕ `setTimeout`을 사용해야만 `'true', 'false'`가 아닌 정상인 `true, false` 값을 넣을 수 있다.

## Autocomplete
```js
const options = [
  {label: 'A', id: 1},
  {label: 'B', id: 2}
];

<Controller
  control={control}
  name="autocomplete"
  render={({field: {onChange, value}}) => (
    <Autocomplete
      value={value}
      onChange={(event, id) => {
        onChange(id)
      }}
      options={options.map((option) => option.id)}
      getOptionLabel={(id) => options.find(option) => option.id === id)}
      renderInput={(params) => <TextField {...params} label="Select box" />}
    />
  )}
/>
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

## Dialog
```js
<Dialog
  // Dialog 화면 출력 후 실행
  TransitionProps={{onEntered: () => {}}}
><<Dialog>
```

## Checkbox (Checked)
```js
<Controller
  control={control}
  name="is_main"
  render={({field}) => (
    <FormControlLabel control={
      <Checkbox {...field} checked={field.value} />
    } label="라벨" />
  )}
/>
```

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
* 쿼리스트링이 변경될 경우 `page = 1`

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
* ❕ 모달창의 form을 핸들링하는 경우 close보다는 open할때 `form.reset();` 하는 편이 좋은 경우도 있다.

## isDirty
```js
const { formState: {isDirty} } = form;
```
* `value`가 수정 되면 `true`, 수정 후 다시 처음과 같아지면 `false`

## DefaultValues
```js
console.log(form.formState.defaultValues);
```
* form 생성시의 `defaultValues`값을 가진다.

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
            {/* <button onClick={() => usersFieldArray.update(index, {name: '', age: 0})}>Update</button> */}
            <button onClick={() => usersForm.setValue(`users.${index}`, {name: '', age: 0})}>Update</button>
            <button onClick={() => usersFieldArray.remove(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default UsersRead;
```
* ❕ `usersFieldArray.update(index`를 사용하면 부모 컴포넌트는 랜더링되지만 화면이 변하지 않는다.
* ❕ `usersForm.setValue(`users.${index}`를 사용하면 부모 컴포넌트는 랜더링 안되고 화면이 변한다.
* 에러: `{usersForm.formState.errors.users?.[index]?.name ? usersForm.formState.errors.users?.[index]?.name : ''}`
* TS: `FormProvider`에 여러개 `form` 넘기기
```ts
const forms: any = {
  userForm,
  usersForm
};
<FormProvider {...forms}>
```
```ts
const { userForm, usersForm } = useFormContext() as unknown as {
  userForm: UseFormReturn<User>,
  usersForm: UseFormReturn<{users: User[]}>
};
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
    // yup.mixed<number | string>().required()
  }))
});

<input type="text" placeholder="Name" {...userRegister('name')} />
```

## Material UI & Tailwind & Next.js
### 설정
* https://levelup.gitconnected.com/using-material-ui-with-next-js-13-and-tailwind-css-part-2-72d7e034baa9

tailwind.config.js
```js
{
  corePlugins: {
    // MUI의 버튼색을 transparent로 덮어씌움 방지
    preflight: false
  },
  // Next.js npm run build 후에 tailwind css 우선순위 낮아지는 문제 해결
  important: '#___next'
}
```

_document.tsx
```diff
- <body>
+ <body id="___next">
```
* ❕ `__next` __2개는 next에서 사용중이므로 `___next` ___3개를 사용하자.

# Tailwind
## background-color
```css
className='bg-[#e6f3fa]'
```

## font-family
```css
className="font-['NanumGothic']"
```

## 이미지 가로 세로 비율 맞추기
* https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
```css
className="w-auto aspect-square"
```

## 자식 태그에 클래스 적용
```css
className="[&>h2]:text-2xl"
```

## React Material UI Carousel
* https://github.com/Learus/react-material-ui-carousel
* 이미지 크기가 서로 다른 Carousel (`object-fit: cover;` 가로세로 크기가 우선 고정 되면 해당 크기에 이미지를 맞춤)
```css
<img className="object-cover" ... />
```

# CKEditor 5
* https://ckeditor.com/ckeditor-5
* [파일 업로드 테스트](https://ckeditor.com/docs/ckeditor5/latest/features/file-management/ckfinder.html)
```sh
npm install @ckeditor/ckeditor5-build-decoupled-document
```
```js
useEffect(() => {
  const DecoupledEditor = require('@ckeditor/ckeditor5-build-decoupled-document')
  DecoupledEditor
    .create(document.querySelector('#editor'), {
      ckfinder: {
        uploadUrl: '/api/ckeditor5/upload-images'
      },
      mediaEmbed: {
        previewsInData: true
      }
    })
    .then((editor: any) => {
      const toolbarContainer: any = document.querySelector('#toolbar-container')
      toolbarContainer.appendChild(editor.ui.view.toolbar.element)
      contentsEditor = editor
    })
    .catch((error: unknown) => {
      console.error(error)
    })
}, [])
<div id="toolbar-container"></div>
<div
  id="editor"
  className="h-[800px] [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
  dangerouslySetInnerHTML={{__html: productForm.getValues('contents')}}
></div>
```
* [mediaEmbed - YouTube 링크 사용 가능](https://stackoverflow.com/questions/57490383/ckeditor5-how-to-insert-youtube-video)

/api/ckeditor5/upload-images
```js
{
  fileName: 'fileName.png',
  uploaded: 1,
  url: 'https://ckeditor.com/apps/ckfinder/userfiles/files/fileName.jpeg'
}
```

## 사용자 페이지
* [CKEditor 5 스타일 적용](https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html)
* <details><summary>content-styles.css</summary>

  ```css
  /*
   * CKEditor 5 (v40.2.0) content styles.
   * Generated on Fri, 22 Dec 2023 08:39:34 GMT.
   * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html
   */
  
   :root {
    --ck-color-image-caption-background: hsl(0, 0%, 97%);
    --ck-color-image-caption-text: hsl(0, 0%, 20%);
    --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
    --ck-color-mention-text: hsl(341, 100%, 30%);
    --ck-color-selector-caption-background: hsl(0, 0%, 97%);
    --ck-color-selector-caption-text: hsl(0, 0%, 20%);
    --ck-highlight-marker-blue: hsl(201, 97%, 72%);
    --ck-highlight-marker-green: hsl(120, 93%, 68%);
    --ck-highlight-marker-pink: hsl(345, 96%, 73%);
    --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
    --ck-highlight-pen-green: hsl(112, 100%, 27%);
    --ck-highlight-pen-red: hsl(0, 85%, 49%);
    --ck-image-style-spacing: 1.5em;
    --ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
    --ck-todo-list-checkmark-size: 16px;
  }
  
  /* @ckeditor/ckeditor5-table/theme/tablecolumnresize.css */
  .ck-content .table .ck-table-resized {
    table-layout: fixed;
  }
  /* @ckeditor/ckeditor5-table/theme/tablecolumnresize.css */
  .ck-content .table table {
    overflow: hidden;
  }
  /* @ckeditor/ckeditor5-table/theme/tablecolumnresize.css */
  .ck-content .table td,
  .ck-content .table th {
    overflow-wrap: break-word;
    position: relative;
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content .table {
    margin: 0.9em auto;
    display: table;
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content .table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    height: 100%;
    border: 1px double hsl(0, 0%, 70%);
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content .table table td,
  .ck-content .table table th {
    min-width: 2em;
    padding: .4em;
    border: 1px solid hsl(0, 0%, 75%);
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content .table table th {
    font-weight: bold;
    background: hsla(0, 0%, 0%, 5%);
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content[dir="rtl"] .table th {
    text-align: right;
  }
  /* @ckeditor/ckeditor5-table/theme/table.css */
  .ck-content[dir="ltr"] .table th {
    text-align: left;
  }
  /* @ckeditor/ckeditor5-table/theme/tablecaption.css */
  .ck-content .table > figcaption {
    display: table-caption;
    caption-side: top;
    word-break: break-word;
    text-align: center;
    color: var(--ck-color-selector-caption-text);
    background-color: var(--ck-color-selector-caption-background);
    padding: .6em;
    font-size: .75em;
    outline-offset: -1px;
  }
  /* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break {
    position: relative;
    clear: both;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break::after {
    content: '';
    position: absolute;
    border-bottom: 2px dashed hsl(0, 0%, 77%);
    width: 100%;
  }
  /* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break__label {
    position: relative;
    z-index: 1;
    padding: .3em .6em;
    display: block;
    text-transform: uppercase;
    border: 1px solid hsl(0, 0%, 77%);
    border-radius: 2px;
    font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
    font-size: 0.75em;
    font-weight: bold;
    color: hsl(0, 0%, 20%);
    background: hsl(0, 0%, 100%);
    box-shadow: 2px 2px 1px hsla(0, 0%, 0%, 0.15);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* @ckeditor/ckeditor5-media-embed/theme/mediaembed.css */
  .ck-content .media {
    clear: both;
    margin: 0.9em 0;
    display: block;
    min-width: 15em;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list {
    list-style: none;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list li {
    position: relative;
    margin-bottom: 5px;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list li .todo-list {
    margin-top: 5px;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label > input {
    -webkit-appearance: none;
    display: inline-block;
    position: relative;
    width: var(--ck-todo-list-checkmark-size);
    height: var(--ck-todo-list-checkmark-size);
    vertical-align: middle;
    border: 0;
    left: -25px;
    margin-right: -15px;
    right: 0;
    margin-left: 0;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content[dir=rtl] .todo-list .todo-list__label > input {
  left: 0;
  margin-right: 0;
  right: -25px;
  margin-left: -15px;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label > input::before {
    display: block;
    position: absolute;
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 100%;
    border: 1px solid hsl(0, 0%, 20%);
    border-radius: 2px;
    transition: 250ms ease-in-out box-shadow;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label > input::after {
    display: block;
    position: absolute;
    box-sizing: content-box;
    pointer-events: none;
    content: '';
    left: calc( var(--ck-todo-list-checkmark-size) / 3 );
    top: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
    width: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
    height: calc( var(--ck-todo-list-checkmark-size) / 2.6 );
    border-style: solid;
    border-color: transparent;
    border-width: 0 calc( var(--ck-todo-list-checkmark-size) / 8 ) calc( var(--ck-todo-list-checkmark-size) / 8 ) 0;
    transform: rotate(45deg);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label > input[checked]::before {
    background: hsl(126, 64%, 41%);
    border-color: hsl(126, 64%, 41%);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label > input[checked]::after {
    border-color: hsl(0, 0%, 100%);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label .todo-list__label__description {
    vertical-align: middle;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-content .todo-list .todo-list__label.todo-list__label_without-description input[type=checkbox] {
    position: absolute;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > input,
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input {
    cursor: pointer;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > input:hover::before, .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input:hover::before {
    box-shadow: 0 0 0 5px hsla(0, 0%, 0%, 0.1);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input {
    -webkit-appearance: none;
    display: inline-block;
    position: relative;
    width: var(--ck-todo-list-checkmark-size);
    height: var(--ck-todo-list-checkmark-size);
    vertical-align: middle;
    border: 0;
    left: -25px;
    margin-right: -15px;
    right: 0;
    margin-left: 0;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content[dir=rtl] .todo-list .todo-list__label > span[contenteditable=false] > input {
    left: 0;
    margin-right: 0;
    right: -25px;
    margin-left: -15px;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input::before {
    display: block;
    position: absolute;
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 100%;
    border: 1px solid hsl(0, 0%, 20%);
    border-radius: 2px;
    transition: 250ms ease-in-out box-shadow;
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input::after {
    display: block;
    position: absolute;
    box-sizing: content-box;
    pointer-events: none;
    content: '';
    left: calc( var(--ck-todo-list-checkmark-size) / 3 );
    top: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
    width: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
    height: calc( var(--ck-todo-list-checkmark-size) / 2.6 );
    border-style: solid;
    border-color: transparent;
    border-width: 0 calc( var(--ck-todo-list-checkmark-size) / 8 ) calc( var(--ck-todo-list-checkmark-size) / 8 ) 0;
    transform: rotate(45deg);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input[checked]::before {
    background: hsl(126, 64%, 41%);
    border-color: hsl(126, 64%, 41%);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input[checked]::after {
    border-color: hsl(0, 0%, 100%);
  }
  /* @ckeditor/ckeditor5-list/theme/todolist.css */
  .ck-editor__editable.ck-content .todo-list .todo-list__label.todo-list__label_without-description input[type=checkbox] {
    position: absolute;
  }
  /* @ckeditor/ckeditor5-image/theme/imageresize.css */
  .ck-content img.image_resized {
    height: auto;
  }
  /* @ckeditor/ckeditor5-image/theme/imageresize.css */
  .ck-content .image.image_resized {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
  }
  /* @ckeditor/ckeditor5-image/theme/imageresize.css */
  .ck-content .image.image_resized img {
    width: 100%;
  }
  /* @ckeditor/ckeditor5-image/theme/imageresize.css */
  .ck-content .image.image_resized > figcaption {
    display: block;
  }
  /* @ckeditor/ckeditor5-image/theme/imagecaption.css */
  .ck-content .image > figcaption {
    display: table-caption;
    caption-side: bottom;
    word-break: break-word;
    color: var(--ck-color-image-caption-text);
    background-color: var(--ck-color-image-caption-background);
    padding: .6em;
    font-size: .75em;
    outline-offset: -1px;
  }
  /* @ckeditor/ckeditor5-image/theme/image.css */
  .ck-content .image {
    display: table;
    clear: both;
    text-align: center;
    margin: 0.9em auto;
    min-width: 50px;
  }
  /* @ckeditor/ckeditor5-image/theme/image.css */
  .ck-content .image img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    min-width: 100%;
    height: auto;
  }
  /* @ckeditor/ckeditor5-image/theme/image.css */
  .ck-content .image-inline {
    /*
     * Normally, the .image-inline would have "display: inline-block" and "img { width: 100% }" (to follow the wrapper while resizing).;
     * Unfortunately, together with "srcset", it gets automatically stretched up to the width of the editing root.
     * This strange behavior does not happen with inline-flex.
     */
    display: inline-flex;
    max-width: 100%;
    align-items: flex-start;
  }
  /* @ckeditor/ckeditor5-image/theme/image.css */
  .ck-content .image-inline picture {
    display: flex;
  }
  /* @ckeditor/ckeditor5-image/theme/image.css */
  .ck-content .image-inline picture,
  .ck-content .image-inline img {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 100%;
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .marker-yellow {
    background-color: var(--ck-highlight-marker-yellow);
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .marker-green {
    background-color: var(--ck-highlight-marker-green);
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .marker-pink {
    background-color: var(--ck-highlight-marker-pink);
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .marker-blue {
    background-color: var(--ck-highlight-marker-blue);
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .pen-red {
    color: var(--ck-highlight-pen-red);
    background-color: transparent;
  }
  /* @ckeditor/ckeditor5-highlight/theme/highlight.css */
  .ck-content .pen-green {
    color: var(--ck-highlight-pen-green);
    background-color: transparent;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ol {
    list-style-type: decimal;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ol ol {
    list-style-type: lower-latin;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ol ol ol {
    list-style-type: lower-roman;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ol ol ol ol {
    list-style-type: upper-latin;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ol ol ol ol ol {
    list-style-type: upper-roman;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ul {
    list-style-type: disc;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ul ul {
    list-style-type: circle;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ul ul ul {
    list-style-type: square;
  }
  /* @ckeditor/ckeditor5-list/theme/list.css */
  .ck-content ul ul ul ul {
    list-style-type: square;
  }
  /* @ckeditor/ckeditor5-block-quote/theme/blockquote.css */
  .ck-content blockquote {
    overflow: hidden;
    padding-right: 1.5em;
    padding-left: 1.5em;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    border-left: solid 5px hsl(0, 0%, 80%);
  }
  /* @ckeditor/ckeditor5-block-quote/theme/blockquote.css */
  .ck-content[dir="rtl"] blockquote {
    border-left: 0;
    border-right: solid 5px hsl(0, 0%, 80%);
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-block-align-left,
  .ck-content .image-style-block-align-right {
    max-width: calc(100% - var(--ck-image-style-spacing));
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-align-left,
  .ck-content .image-style-align-right {
    clear: none;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-side {
    float: right;
    margin-left: var(--ck-image-style-spacing);
    max-width: 50%;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-align-left {
    float: left;
    margin-right: var(--ck-image-style-spacing);
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-align-center {
    margin-left: auto;
    margin-right: auto;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-align-right {
    float: right;
    margin-left: var(--ck-image-style-spacing);
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-block-align-right {
    margin-right: 0;
    margin-left: auto;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-style-block-align-left {
    margin-left: 0;
    margin-right: auto;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content p + .image-style-align-left,
  .ck-content p + .image-style-align-right,
  .ck-content p + .image-style-side {
    margin-top: 0;
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-inline.image-style-align-left,
  .ck-content .image-inline.image-style-align-right {
    margin-top: var(--ck-inline-image-style-spacing);
    margin-bottom: var(--ck-inline-image-style-spacing);
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-inline.image-style-align-left {
    margin-right: var(--ck-inline-image-style-spacing);
  }
  /* @ckeditor/ckeditor5-image/theme/imagestyle.css */
  .ck-content .image-inline.image-style-align-right {
    margin-left: var(--ck-inline-image-style-spacing);
  }
  /* @ckeditor/ckeditor5-basic-styles/theme/code.css */
  .ck-content code {
    background-color: hsla(0, 0%, 78%, 0.3);
    padding: .15em;
    border-radius: 2px;
  }
  /* @ckeditor/ckeditor5-font/theme/fontsize.css */
  .ck-content .text-tiny {
    font-size: .7em;
  }
  /* @ckeditor/ckeditor5-font/theme/fontsize.css */
  .ck-content .text-small {
    font-size: .85em;
  }
  /* @ckeditor/ckeditor5-font/theme/fontsize.css */
  .ck-content .text-big {
    font-size: 1.4em;
  }
  /* @ckeditor/ckeditor5-font/theme/fontsize.css */
  .ck-content .text-huge {
    font-size: 1.8em;
  }
  /* @ckeditor/ckeditor5-mention/theme/mention.css */
  .ck-content .mention {
    background: var(--ck-color-mention-background);
    color: var(--ck-color-mention-text);
  }
  /* @ckeditor/ckeditor5-horizontal-line/theme/horizontalline.css */
  .ck-content hr {
    margin: 15px 0;
    height: 4px;
    background: hsl(0, 0%, 87%);
    border: 0;
  }
  /* @ckeditor/ckeditor5-code-block/theme/codeblock.css */
  .ck-content pre {
    padding: 1em;
    color: hsl(0, 0%, 20.8%);
    background: hsla(0, 0%, 78%, 0.3);
    border: 1px solid hsl(0, 0%, 77%);
    border-radius: 2px;
    text-align: left;
    direction: ltr;
    tab-size: 4;
    white-space: pre-wrap;
    font-style: normal;
    min-width: 200px;
  }
  /* @ckeditor/ckeditor5-code-block/theme/codeblock.css */
  .ck-content pre code {
    background: unset;
    padding: 0;
    border-radius: 0;
  }
  @media print {
    /* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
    .ck-content .page-break {
        padding: 0;
    }
    /* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
    .ck-content .page-break::after {
        display: none;
    }
  }
   ```
</details>


```js
<div
  className="ck-content [&>h2]:text-2xl [&>h3]:text-xl [&>h4]:text-lg"
  dangerouslySetInnerHTML={{__html: product.contents}}
></div>
```

# React 자식에 추가 속성 넣기
```tsx
<Parent>
  <button onClick={() => {}}></button>
</Parent>

export const Parent = ({children}: {
  children: React.ReactElement<{onClick: Function}>
}) => {
  const click = () => {}
  return (
    <div>
      {React.cloneElement(children, {
        onClick: () => {
          children.props.onClick?.()
          click()
        }
      })}
    </div>
  )
}
```
