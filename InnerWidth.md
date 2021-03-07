# 창 넓이가 변할때 window.innerWidth 값을 state에 넣기

InnerWidth.js
```js
import { useState, useEffect } from 'react';

function InnerWidth() {
  const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
  useEffect(() => {
    const resize = function() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);
  return (
    <div>{innerWidth}</div>
  )
}

export default InnerWidth;
```
