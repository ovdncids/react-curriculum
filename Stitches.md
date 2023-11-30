# Stitches
* https://stitches.dev

## Swiper
* https://swiperjs.com/demos
* https://devinus.tistory.com/46
```js
import { styled, keyframes } from '@stitches/react';
import { useState } from 'react';

const items = [
  {
    title: 'A',
    backgroundColor: 'red',
    src: 'https://www.apple.com/kr/mac/home/bx/images/overview/consider/mac_ease__bvgkz2zdltxy_xlarge.jpg'
  },
  {
    title: 'B',
    backgroundColor: 'orange',
    src: 'https://www.apple.com/v/mac/home/bx/images/overview/consider/mac_performance__dh5hyac1zf8m_xlarge.jpg'
  },
  {
    title: 'C',
    backgroundColor: 'yellow',
    src: 'https://www.apple.com/kr/mac/home/bx/images/overview/consider/mac_iphone__gh1tblkt6bqm_xlarge.jpg'
  },
  {
    title: 'D',
    backgroundColor: 'green',
    src: 'https://www.apple.com/v/mac/home/bx/images/overview/consider/mac_compatibility__cu59oukz81ci_xlarge.jpg'
  }
];
const width = 300;
const SwiperStyled = styled('div', {
  width: `${width}px`,
  height: '300px',
  borderRadius: '8px',
  border: '3px solid white',
  backgroundColor: 'white',
  overflow: 'hidden',
  '& > div': {
    display: 'flex',
    position: 'relative'
  },
  '& > div > div': {
    minWidth: `${width}px`,
    minHeight: '300px'
  },
  '& > div > div > img': {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover'
  }
});

const animations = [];
items.forEach((_item, index) => {
  const left = ((items.length -1 + index) % items.length) * -width;
  animations.push(keyframes({
    from: {
      left: left
    },
    to: {
      left: index * -width
    }
  }));
});

const Swiper = () => {
  const [current, setCurrent] = useState({
    index: 0,
    left: 0,
    direction: null
  });

  let animation;
  if (current.direction) {
    animation = keyframes({
      from: {
        left: current.left
      },
      to: {
        // 방향에 따른 계산식: (아이템 크기 + 현재 index) % 아이템 크기 * -넓이
        left: (items.length + current.index) % items.length * -width
      }
    });
  }

  const move = (direction) => {
    const calcDirection = direction === 'next' ? 1 : -1;
    setCurrent({
      // 방향에 따른 계산식: (아이템 크기 + 방향 + 현재 index) % 아이템 크기
      index: (items.length + calcDirection + current.index) % items.length,
      left: current.index * -width,
      direction
    });
  };

  let touchPoint = 0;
  let mousePoint = 0;
  return (
    <>
      <SwiperStyled
        onTouchStart={(event) => touchPoint = event.touches[0].pageX}
        onTouchEnd={(event) => {
          if (touchPoint < event.changedTouches[0].pageX) {
            move('back');
          } else if (touchPoint > event.changedTouches[0].pageX) {
            move('next');
          }
        }}
        onMouseDown={(event) => mousePoint = event.pageX}
        onMouseUp={(event) => {
          if (mousePoint < event.pageX) {
            move('back');
          } else if (mousePoint > event.pageX) {
            move('next');
          }
        }}
      >
        <div style={{animation: `${animation ? `${animation} 1s forwards` : ''}`}}>
          {items.map((item, index) => (
            // <div key={index} style={{backgroundColor: item.backgroundColor}}>{item.title}</div>
            <div key={index}><img src={item.src} draggable={false} /></div>
          ))}
        </div>
      </SwiperStyled>
      <button
        onClick={() => move('back')}
      >Back</button>
      <button
        onClick={() => move('next')}
      >Next</button>
    </>
  );
};

export default Swiper;
```
