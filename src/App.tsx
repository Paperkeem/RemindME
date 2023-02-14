import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";
import { dndState } from "./atoms/dnd";
import ToDoList from "./page/ToDoList";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  `;

export default function App() {
  const [toDos, setToDos] = useRecoilState(dndState);

  const onDragEnd = (args: any) => {
    if (!args.destination) return;
    const {
      draggableId,
      destination: { index: DIndex },
      source: { index: OriIndex },
    } = args;

    setToDos((oldToDos) => {
      // 1번째 방법
      // const meter = DIndex - OriIndex;
      // if (meter >= 0) {
      //   return [
      //     ...oldToDos.slice(0, OriIndex),
      //     ...oldToDos.slice(OriIndex + 1, DIndex + 1),
      //     draggableId,
      //     ...oldToDos.slice(DIndex + 1),
      //   ];
      // } else {
      //   return [
      //     ...oldToDos.slice(0, DIndex),
      //     draggableId,
      //     ...oldToDos.slice(DIndex, DIndex - meter),
      //     ...oldToDos.slice(OriIndex + 1),
      //   ];

      // 2번째 방법
      // let copyToDos = [...oldToDos];
      // copyToDos.splice(OriIndex, 1);

      // return [
      //   ...copyToDos.slice(0, OriIndex - 1),
      //   draggableId,
      //   ...copyToDos.slice(OriIndex - 1),
      // ];

      const copyToDos = [...oldToDos];
      copyToDos.splice(OriIndex, 1);
      copyToDos.splice(DIndex, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GlobalStyle />
      <Wrapper>
        <Boards>
          <Droppable droppableId="firstBoard">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, idx) => (
                  <Draggable key={toDo} draggableId={toDo} index={idx}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;
const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;
const Card = styled.div`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
