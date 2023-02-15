import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dndState, IState } from "../atoms/dnd";
import DragableCard from "./DragableCard";

interface IBoardProps {
  toDos: IState[];
  boardId: string;
}
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IFrom {
  text: string;
  url: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const setDnds = useSetRecoilState(dndState);
  const { register, handleSubmit, reset } = useForm<IFrom>();
  const onSubmit = (data: IFrom) => {
    const newItem = { ...data, id: Date.now() };

    setDnds((oldList) => {
      const copyList = [...oldList[boardId], newItem];
      return { ...oldList, [boardId]: copyList };
    });

    reset();
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text", { required: true })}
          type="text"
          placeholder={`Add Name in ${boardId}`}
        />
        <input
          {...register("url", { required: true })}
          type="text"
          placeholder={`Add URL in ${boardId}`}
        />
        <button>Save</button>
      </Form>
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
    </Wrapper>
  );
}

const Title = styled.h3`
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
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
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
