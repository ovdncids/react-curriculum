# nivo
* https://nivo.rocks
* https://github.com/plouc/nivo
```sh
npm install @nivo/core @nivo/pie
```
## Nivo Line Legend Dynamic Widths
* https://codesandbox.io/p/sandbox/zealous-currying-eg5sz?file=%2Fsrc%2FApp.js%3A13%2C1

## Next.js
```js
import dynamic from 'next/dynamic'
const ResponsivePie = dynamic(() => import('@nivo/pie').then(m => m.ResponsivePie), {ssr: false})

const NivoPie = () => {
  return (
    <div style={{width: 600, height: 600}}>
      <ResponsivePie
        data={[
          {
            id: 'A',
            label: 'A',
            value: 51
          },
          {
            id: 'B',
            value: 49
          }
        ]}
        valueFormat={value => value + '%'}
        margin={{top: 40, right: 100, bottom: 40, left: 100}}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        colors={{scheme: "purple_blue_green"}}
      />
    </div>
  )
}

export default NivoPie
```
* TS:
```ts
import { MayHaveLabel, PieSvgProps } from '@nivo/pie'
const ResponsivePie = dynamic(
  () => import('@nivo/pie').then(m => m.ResponsivePie), {ssr: false}
) as <RawDatum extends MayHaveLabel>(
  props: Omit<PieSvgProps<RawDatum>, 'height' | 'width'>
) => JSX.Element
```

## Next.js 13.4
```js
'use client'
import { ResponsivePie } from '@nivo/pie'
```
