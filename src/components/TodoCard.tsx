import React from "react";
import { useRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms/atoms";
import { BsTrash } from "react-icons/bs";

export default function TodoCard({ id, text, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setToDos((oldTodo) => {
      const copyToDos = [...oldTodo];
      const targetIndex = oldTodo.findIndex((toDo) => toDo.id === id);
      const newToDos = { text, id, category: name as any };
      copyToDos[targetIndex] = newToDos;
      return copyToDos;
    });
  };

  const handleDelete = () => {
    setToDos((oldTodo) => {
      const newTodo = oldTodo.filter((toDo) => toDo.id !== id);
      return newTodo;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={handleClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={handleClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={handleClick}>
          Done
        </button>
      )}
      <BsTrash onClick={handleDelete} />
    </li>
  );
}
