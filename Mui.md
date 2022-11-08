# Material UI
## Components
```sh
Backdrop: 배경 dimmed 처리 후 스피너
Clip: 버튼과 비슷한 모양의 라벨
Stepper: 단계를 표현 할때 사용
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
