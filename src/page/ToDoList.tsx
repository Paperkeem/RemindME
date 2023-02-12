import React from "react";
import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms/atoms";
import CreateToDo from "../components/CreateToDo";
import TodoCard from "../components/TodoCard";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <TodoCard key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
