# 📮 URL 정리를 위한 Kanban Board, RemindME
## [🔖 배포 사이트](https://paper-remindme.netlify.app/)

<div align="center">

   <br />
   
⭐️내가 만든 **URL 카드를 드래그 앤 드롭**하여 자유롭게 위치시켜 보세요.
<br />
**보드의 위치도 드래그 앤 드롭**하여 자유롭게 변경할 수 있습니다.⭐️
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314655-8a134c3b-c5b2-4833-a41b-2ddaa7fed255.gif"/>

   <br />
   
⭐️카드 이름과 URL 주소를 적어 **URL 카드를 만들어 보세요.**
<br />
URL 카드를 **쓰레기통으로 드래그**하면, URL 카드가 **삭제**됩니다.⭐️
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314411-4833f86e-9b05-4f8c-b96a-1e71457f6077.gif"/>

   <br />
   
⭐️**URL 카드를 클릭**하여 내가 저장한 주소로 편하게 이동해보세요!⭐️
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/220314466-c344aea3-d273-4610-bdd9-a53cff01b604.gif"/>

<br />
   
##### 🗓 구현 일정 : 2023.02.10 - 2023.02.21
   
</div>

<br />

## 목차

1. [프로젝트 실행 방법](#프로젝트-실행-방법)
2. [구현사항](#구현사항)

</br>

## 프로젝트 실행 방법

<br>

```bash
npm install
```

```bash
npm start
```

<br>

## 기술스택

> React, TypeScript, recoil, react-beautiful-dnd, react-hook-form, styled-components

<br>

## 구현사항

#### 1. react-beautiful-dnd를 이용한 드래그 앤 드롭 기능 구현

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L101-L135
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/DragableCard.tsx#L15-L32

- [x] 카드 간 드래그 앤 드롭
      <br />
  - 동일 보드 간 이동, 다른 보드 간 이동할 때의 로직을 구분하여 구현
  - URL Card의 key와 draggableId를 Date.now()로 생성하여 `onDragEnd` 함수에서 filter 함수로 색인할 수 있게끔 구현

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L190-L210
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L93-L100

- [x] 보드 간 드래그 앤 드롭
      <br />
  - 보드간 이동이 가능하기 위해서 `Droppable 영역`을 할당, type과 direction 방향을 설정
  - `onDragEnd` 함수에서 `type === "COLUMN"`일 시에 보드 이동임을 판단하게끔 구현
  - map 함수를 이용, 보드 배열의 element를 cards 객체의 key로 할당해, 배열로 이루어진 cards의 value를 props에 전달, `cards={cards[boardId]}`
  
- [x] DND 시 컴포넌트 렌더링 최적화
  - Recat.memo로 컴포넌트를 감싸 메모이제이션, 드래그와 관련된 컴포넌트가 아닐 시 재렌더링 되지 않도록 구현
      
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Trash.tsx#L6-L16
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L136-L146

- [x] 카드 삭제 기능
      <br />
  - **쓰레기통 아이콘에 카드를 드래그하면 삭제**하는 기능을 구현하기 위해서 `Droppable 영역`을 할당, droppableId는 trash로 설정
  - `onDragEnd` 함수에서 `droppableId가 trash`라면 `splice` 함수를 이용해 삭제되도록 구현
      
#### 2. react-hook-form을 이용한 추가 기능 구현

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Board.tsx#L61-L77
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/components/Board.tsx#L27-L36

- [x] 카드 추가 기능
      <br />
  - react-hook-form을 이용해 재렌더링 최소화

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L155-L167
https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/App.tsx#L179-L188

- [x] 보드 추가 기능
      <br />
- 모달 프레임 컴포넌트를 구현하고, children으로 합성하는 방식으로 모달을 구현
- 보드를 추가할 때, 보드 name 배열과 카드 객체에 각각 저장


#### 3. recoil을 통해 전역 상태 관리, 로컬 스토리지 저장 기능 구현

https://github.com/Paperkeem/RemindME/blob/8c7ea9b3aecc15553478726ff54da68bf518d3f1/src/atoms/dnd.tsx#L12-L39

- [x] 로컬 스토리지 저장
      <br />
  - **board의 순서를 기억하는 배열**과, board안의 **카드의 순서들을 기억하는 객체**를 나누어 저장
  - recoil atom의 effects 옵션을 이용해 로컬스토리지에 저장 구현

<br />
      
## 추후 구현사항
- [ ] 카드 수정 기능
      <br />
