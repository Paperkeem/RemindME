import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { RxDragHandleDots2 } from "react-icons/rx";

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
        >
          <FlexWrapper>
            <a href={toDoUrl} rel="noreferrer" target="_blank">
              {toDoText}
            </a>
            <span {...magic.dragHandleProps}>
              <RxDragHandleDots2 />
            </span>
          </FlexWrapper>
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  margin-bottom: 6px;
  border-radius: 3px;
  border: 0.5px solid lightgray;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.2)" : null}; ;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default React.memo(DragableCard);
