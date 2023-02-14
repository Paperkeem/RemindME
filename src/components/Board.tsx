import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragableCard from "./DragableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{boardId}</Title>

          {toDos.map((toDo, idx) => (
            <DragableCard key={toDo} toDo={toDo} idx={idx} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}
const Title = styled.h3`
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;
