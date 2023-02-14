import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDragable {
  toDo: string;
  idx: number;
}

function DragableCard({ toDo, idx }: IDragable) {
  console.log(toDo + "render");
  return (
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
  );
}

const Card = styled.div`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

export default React.memo(DragableCard);
