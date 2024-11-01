# Slider Componenet

An overview of the Slider component logic and props with examples.


## Usage


#### Simple usage:

```tsx
  <Slider>
     { children }
  </Slider>
```

```ts
  children: Array<ReactElement>
```

#### Add config:

```tsx
 <Slider config={ config } >
     { children }
 </Slider>
```

```ts
 config: {
   infinite?: boolean
   isCenter?: boolean
   activeScaleUp?: boolean
   autoPlay?: boolean
   interval?: number
   showCount?: number
   animateDuration?: number
   minMove?: number
   moveCount?: number
   sliderWidth?: number
   gap?: number
   width?: number
   offset?: number
   rtl?: boolean
}
```


#### Add extra css classes:

```tsx
 <Slider 
     className={rootClassName} 
     wrapperClasssName={listClassName}
     itemClassName={slideClassName} 
 >
     { children }
 </Slider>
```

```ts
 - className?: string
 - wrapperClasssName?: string
 - itemClassName?: string
```

## Infinite Slider

- set ```infinite=true``` to have infinity.
- If you need the center mode set ```isCenter=true```.
- To scale up of the active slide you should use ```activeScaleUp=true```.

```tsx
 <Slider
      config={ {
        infinite: true,
        isCenter: true,
        activeScaleUp: true,
      } }
  >
     { children }
 </Slider>
```

## Auto play

- Use ```autoPlay=true``` to move automatically on each 5000ms.
- If you need the change the interval time set ```interval=YOUR_INTERVAL_NUM```. The unit is millisecond and it recommended to be bigger than 1000ms.
- To change the moving direction on interval you should set ```rtl=true```.

```tsx
 <Slider
      config={ {
        autoPlay: true,
        interval: 15000,
        rtl: true,
      } }
  >
     { children }
 </Slider>
```

## Sliding effect

- The default animation duration of the changing slide is 400ms, which you can change it by ```animateDuration=YOUR_INTERVAL_NUM```. The unit is millisecond and it recommended to be less than 1000ms.

- There is a 50px default threshold to prevent small touchs to changing slide, which you can change it by ```minMove=YOUR_THRESHOLD```. The unit is px and it recommended to be bigger than 30px.

- The default count of slide changing is 1, which you can change it by ```moveCount=YOUR_COUNT```.

```tsx
 <Slider
      config={ {
        animateDuration: 400,
        minMove: 100,
        moveCount: 2,
      } }
  >
     { children }
 </Slider>
```


## Sizing
There are 3 ways to render slides:
- 1. Don't define any config and allow the Slider to use children size and styles.

- 2. Set ```showCount``` , ```gap```, and ```offset``` to compute the width of children by it's parrent and show count value.

- 3. Set specific ```width```, ```gap```, and ```offset```.

- ```gap``` is the gap between slides.
- ```offset``` is the first and last gap of items.

```tsx
 <Slider
      config={ {
        showCount: 1,
        offset: 40 ,
        gap: 20,
      } }
  >
     { children }
 </Slider>
```

## Full config sample

```tsx
 <Slider
      config={ {
        autoPlay: true,
        interval: 15000,
        rtl: false,
        infinite: true,
        isCenter: true,
        activeScaleUp: true,
        animateDuration: 500,
        minMove: 100,
        moveCount: 1,
        showCount: 3,
        offset: 40,
        gap: 20,
      } }
  >
     { children }
 </Slider>
```
