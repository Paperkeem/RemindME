import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dndState, IState } from "../atoms/dnd";
import DragableCard from "./DragableCard";
import ModalFrame from "./ModalFrame";
import { BiAddToQueue } from "react-icons/bi";

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
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => {
    setIsModal((prev) => !prev);
  };
  const { register, handleSubmit, reset } = useForm<IFrom>();
  const onSubmit = (data: IFrom) => {
    const newItem = { ...data, id: Date.now() };

    setDnds((oldList) => {
      const copyList = [...oldList[boardId], newItem];
      return { ...oldList, [boardId]: copyList };
    });
    reset();
    setIsModal(false);
  };
  return (
    <Wrapper>
      <FlexWrapper>
        <Title>{boardId}</Title>
        <Adding
          onClick={() => {
            setIsModal(true);
          }}
        >
          <BiAddToQueue />
        </Adding>
      </FlexWrapper>

      {isModal && (
        <ModalFrame handleModal={handleModal}>
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
        </ModalFrame>
      )}

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
  font-weight: bold;
  flex-grow: 1;
`;
const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  input {
    font-size: 1.2rem;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  button {
    border: none;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.bgColor};
    color: white;
    border-radius: 5px;
  }
`;
const Adding = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;
