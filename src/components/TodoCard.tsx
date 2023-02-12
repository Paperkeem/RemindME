import React from "react";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms/atoms";

export default function TodoCard({ id, text, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setToDos((oldTodo) => {
      const targetIndex = oldTodo.findIndex((toDo) => toDo.id === id);
      const newToDos = { text, id, category: name as any };

      const copyToDos = [...oldTodo];
      copyToDos[targetIndex] = newToDos;

      return copyToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={handleClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={handleClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={handleClick}>
          Done
        </button>
      )}
    </li>
  );
}
