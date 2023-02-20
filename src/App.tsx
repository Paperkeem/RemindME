import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { dndState } from "./atoms/dnd";
import Board from "./components/Board";
import { AiOutlineFolderAdd } from "react-icons/ai";
import ModalFrame from "./components/ModalFrame";
import { useForm } from "react-hook-form";

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
  const [cards, setCards] = useRecoilState(dndState);
  const [isModal, setIsModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onDragEnd = (info: DropResult) => {
    if (!info.destination) return;
    const {
      draggableId,
      destination,
      destination: { index: DIndex },
      source,
      source: { index: OriIndex },
    } = info;

    if (destination.droppableId === source.droppableId) {
      setCards((allBoards) => {
        const boardID = destination.droppableId;
        const copyBoard = [...allBoards[boardID]];

        const Item = allBoards[boardID].filter((el) => el.id === +draggableId);

        copyBoard.splice(OriIndex, 1);
        copyBoard.splice(DIndex, 0, Item[0]);
        return { ...allBoards, [boardID]: copyBoard };
      });
    } else {
      setCards((allBoards) => {
        const fromBoard = source.droppableId;
        const toBoard = destination.droppableId;

        const Item = allBoards[fromBoard].filter(
          (el) => el.id === +draggableId
        );

        const copyFromBoard = [...allBoards[fromBoard]];
        const copyToBoard = [...allBoards[toBoard]];
        copyFromBoard.splice(OriIndex, 1);
        copyToBoard.splice(DIndex, 0, Item[0]);
        return {
          ...allBoards,
          [fromBoard]: copyFromBoard,
          [toBoard]: copyToBoard,
        };
      });
    }
  };

  const handleMakeBoard = () => {
    setIsModal(true);
  };
  const handleModal = () => {
    setIsModal((prev) => !prev);
  };
  const handleAddBoard = (data: Record<string, string>) => {
    setCards((allBoard) => {
      return {
        ...allBoard,
        [data.board]: [],
      };
    });
    reset();
    setIsModal(false);
  };

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Folder onClick={handleMakeBoard}>
            <AiOutlineFolderAdd />
          </Folder>

          {isModal && (
            <ModalFrame handleModal={handleModal}>
              <h1>Adding URL Board</h1>
              <hr />
              <Form onSubmit={handleSubmit(handleAddBoard)}>
                <input type="text" {...register("board")} />
                <button>보드 등록</button>
              </Form>
            </ModalFrame>
          )}

          <Boards>
            {Object.keys(cards).map((boardId) => (
              <Board toDos={cards[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
const Folder = styled.span`
  position: fixed;
  top: 3%;
  right: 3%;
  font-size: 1.3rem;
  cursor: pointer;
  color: white;
`;
const Form = styled.form`
  display: flex;
  margin-top: 20px;
  input {
    font-size: 1.2rem;
    padding: 10px 20px;
    border: 1px solid lightgray;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  button {
    border: none;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.bgColor};
    color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
