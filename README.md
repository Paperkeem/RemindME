# ๐ฎ URL ์ ๋ฆฌ๋ฅผ ์ํ Kanban Board, RemindME
## [๐ ๋ฐฐํฌ ์ฌ์ดํธ](https://paper-remindme.netlify.app/)

<div align="center">

   <br />
   
โญ๏ธ ๋ด๊ฐ ๋ง๋  **URL ์นด๋๋ฅผ ๋๋๊ทธ ์ค ๋๋กญ**ํ์ฌ ์์ ๋กญ๊ฒ ์์น์์ผ ๋ณด์ธ์.
<br />
**๋ณด๋์ ์์น๋ ๋๋๊ทธ ์ค ๋๋กญ**ํ์ฌ ์์ ๋กญ๊ฒ ๋ณ๊ฒฝํ  ์ ์์ต๋๋ค. โญ๏ธ
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314655-8a134c3b-c5b2-4833-a41b-2ddaa7fed255.gif"/>

   <br />
   
โญ๏ธ ์นด๋ ์ด๋ฆ๊ณผ URL ์ฃผ์๋ฅผ ์ ์ด **URL ์นด๋๋ฅผ ๋ง๋ค์ด ๋ณด์ธ์.**
<br />
URL ์นด๋๋ฅผ **์ฐ๋ ๊ธฐํต์ผ๋ก ๋๋๊ทธ**ํ๋ฉด, URL ์นด๋๊ฐ **์ญ์ **๋ฉ๋๋ค. โญ๏ธ
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314411-4833f86e-9b05-4f8c-b96a-1e71457f6077.gif"/>

   <br />
   
โญ๏ธ **URL ์นด๋๋ฅผ ํด๋ฆญ**ํ์ฌ ๋ด๊ฐ ์ ์ฅํ ์ฃผ์๋ก ํธํ๊ฒ ์ด๋ํด๋ณด์ธ์! โญ๏ธ
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314466-c344aea3-d273-4610-bdd9-a53cff01b604.gif"/>

<br />
   
##### ๐ ๊ตฌํ ์ผ์  : 2023.02.10 - 2023.02.21
   
</div>

<br />

## ๋ชฉ์ฐจ

1. [ํ๋ก์ ํธ ์คํ ๋ฐฉ๋ฒ](#ํ๋ก์ ํธ-์คํ-๋ฐฉ๋ฒ)
2. [๊ตฌํ์ฌํญ](#๊ตฌํ์ฌํญ)

</br>

## ํ๋ก์ ํธ ์คํ ๋ฐฉ๋ฒ

<br>

```bash
npm install
```

```bash
npm start
```

<br>

## ๊ธฐ์ ์คํ

> React, TypeScript, recoil, react-beautiful-dnd, react-hook-form, styled-components

<br>

## ๊ตฌํ์ฌํญ

#### 1. react-beautiful-dnd๋ฅผ ์ด์ฉํ ๋๋๊ทธ ์ค ๋๋กญ ๊ธฐ๋ฅ ๊ตฌํ

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L101-L135
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/DragableCard.tsx#L15-L32

- [x] ์นด๋ ๊ฐ ๋๋๊ทธ ์ค ๋๋กญ
- ๋์ผ ๋ณด๋ ๊ฐ ์ด๋, ๋ค๋ฅธ ๋ณด๋ ๊ฐ ์ด๋ํ  ๋์ ๋ก์ง์ ๊ตฌ๋ถํ์ฌ ๊ตฌํ
- URL Card์ key์ draggableId๋ฅผ Date.now()๋ก ์์ฑํ์ฌ `onDragEnd` ํจ์์์ filter ํจ์๋ก ์์ธํ  ์ ์๊ฒ๋ ๊ตฌํ

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L190-L210
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L93-L100

- [x] ๋ณด๋ ๊ฐ ๋๋๊ทธ ์ค ๋๋กญ
- ๋ณด๋๊ฐ ์ด๋ ๊ตฌํ์ ์ํด `Droppable ์์ญ`์ ํ ๋น, type๊ณผ direction ๋ฐฉํฅ์ ์ค์ 
- `onDragEnd` ํจ์์์ `type === "COLUMN"`์ผ ์์ ๋ณด๋ ์ด๋์์ ํ๋จํ๊ฒ๋ ๊ตฌํ
- map ํจ์๋ฅผ ์ด์ฉํ์ฌ ๋ณด๋ ๋ฐฐ์ด์ element๋ฅผ cards ๊ฐ์ฒด์ key๋ก ํ ๋น, ๋ฐฐ์ด๋ก ์ด๋ฃจ์ด์ง cards์ value๋ฅผ props์ ์ ๋ฌ `cards={cards[boardId]}`

<br />

- [x] DND ์ ์ปดํฌ๋ํธ ๋ ๋๋ง ์ต์ ํ
- Recat.memo๋ก ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ธ ๋ฉ๋ชจ์ด์ ์ด์, ๋๋๊ทธ์ ๊ด๋ จ๋ ์ปดํฌ๋ํธ๊ฐ ์๋ ์ ์ฌ๋ ๋๋ง ๋์ง ์๋๋ก ๊ตฌํ
      
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Trash.tsx#L6-L16
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L136-L146

- [x] ์นด๋ ์ญ์  ๊ธฐ๋ฅ
- **์ฐ๋ ๊ธฐํต ์์ด์ฝ์ ์นด๋๋ฅผ ๋๋๊ทธํ๋ฉด ์ญ์ **ํ๋ ๊ธฐ๋ฅ์ ๊ตฌํํ๊ธฐ ์ํด์ `Droppable` ์์ญ์ ํ ๋น, droppableId๋ trash๋ก ์ค์ 
- `onDragEnd` ํจ์์์ `droppableId๊ฐ trash`๋ผ๋ฉด `splice` ํจ์๋ฅผ ์ด์ฉํด ์ญ์ ๋๋๋ก ๊ตฌํ
      
#### 2. react-hook-form์ ์ด์ฉํ ์ถ๊ฐ ๊ธฐ๋ฅ ๊ตฌํ

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Board.tsx#L61-L77
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Board.tsx#L27-L36

- [x] ์นด๋ ์ถ๊ฐ ๊ธฐ๋ฅ
- react-hook-form์ ์ด์ฉํด ์ฌ๋ ๋๋ง ์ต์ํ

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L155-L167
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L179-L188

- [x] ๋ณด๋ ์ถ๊ฐ ๊ธฐ๋ฅ
- ๋ชจ๋ฌ ํ๋ ์ ์ปดํฌ๋ํธ๋ฅผ ๊ตฌํํ๊ณ , children์ผ๋ก ํฉ์ฑํ๋ ๋ฐฉ์์ผ๋ก ๋ชจ๋ฌ์ ๊ตฌํ
- ๋ณด๋๋ฅผ ์ถ๊ฐ ์, ์๋ก์ด name์ ๋ณด๋ name ๋ฐฐ์ด๊ณผ ์นด๋ ๊ฐ์ฒด์ ๊ฐ๊ฐ ์ ์ฅ


#### 3. recoil์ ํตํด ์ ์ญ ์ํ ๊ด๋ฆฌ, ๋ก์ปฌ ์คํ ๋ฆฌ์ง ์ ์ฅ ๊ธฐ๋ฅ ๊ตฌํ

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/atoms/dnd.tsx#L12-L39

- [x] ๋ก์ปฌ ์คํ ๋ฆฌ์ง ์ ์ฅ
- **board์ ์์๋ฅผ ๊ธฐ์ตํ๋ ๋ฐฐ์ด**๊ณผ, board์์ **์นด๋์ ์์๋ค์ ๊ธฐ์ตํ๋ ๊ฐ์ฒด**๋ฅผ ๋๋์ด ์ ์ฅ
- recoil atom์ effects ์ต์์ ์ด์ฉํด ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ์ ์ฅ ๊ตฌํ

<br />
      
## ์ถํ ๊ตฌํ์ฌํญ
- [ ] ์นด๋ ์์  ๊ธฐ๋ฅ
      <br />
