import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDragable {
  toDoID: number;
  toDoText: string;
  toDoUrl: string;
  idx: number;
}

function DragableCard({ toDoID, toDoText, toDoUrl, idx }: IDragable) {
  return (
    <Draggable key={toDoID} draggableId={toDoID + ""} index={idx}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.2)" : null}; ;
`;

export default React.memo(DragableCard);
