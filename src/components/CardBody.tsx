import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IState } from "../atoms/dnd";
import DragableCard from "./DragableCard";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface CardProps {
  toDos: IState[];
  boardId: string;
}

export default function CardBody({ toDos, boardId }: CardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic, snapshot) => (
        <Area
          isDraggingOver={snapshot.isDraggingOver}
          isDraggingFromThis={!!snapshot.draggingFromThisWith}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {toDos.map((toDo, idx) => (
            <DragableCard
              key={toDo.id}
              toDoID={toDo.id}
              toDoText={toDo.text}
              toDoUrl={toDo.url}
              idx={idx}
            />
          ))}
          {magic.placeholder}
        </Area>
      )}
    </Droppable>
  );
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
