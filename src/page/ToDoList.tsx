import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms/atoms";
import CreateToDo from "../components/todo/CreateToDo";
import TodoCard from "../components/todo/TodoCard";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const handleChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setCategory(value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select value={category} onChange={handleChangeCategory}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <TodoCard key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
