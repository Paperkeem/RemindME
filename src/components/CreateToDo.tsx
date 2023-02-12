import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms/atoms";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...prev,
    ]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write your todo",
        })}
        type="text"
        placeholder="Write your Email"
      />
      <span>{errors?.toDo?.message as string}</span>
      <button>Add</button>
    </form>
  );
}
