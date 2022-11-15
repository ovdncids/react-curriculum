# Material UI
* https://mui.com
```sh
npm install @mui/material @emotion/react @emotion/styled
```

## Components
```sh
Backdrop: 배경 dimmed 처리 후 스피너
Clip: 버튼과 비슷한 모양의 라벨
Stepper: 단계를 표현 할때 사용
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
  }, []);
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
  console.log('렌더링', location.search);

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
    console.log('유즈 이펙트');
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
```js
paging.categoriesGet = categoriesGet;
useEffect(() => {
  const infiniteScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // 바로 categoriesGet();를 사용 한다면 categoriesGet 함수 호출시 products는 항상 처음 렌더링 할때 초기값 []을 가리키므로 concat은 []을 추가 한다.
      // 렌더링 될때 마다 categoriesGet 함수도 다시 선언되고 컴포넌트 안의 변수들도 새롭게 할당 된다.
      paging.categoriesGet();
    }
  };
  window.addEventListener('scroll', infiniteScroll);
  return () => {
    window.removeEventListener('scroll', infiniteScroll);
  };
}, []);
```
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
