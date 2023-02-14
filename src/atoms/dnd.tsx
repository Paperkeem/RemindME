import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const dndState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "c", "d"],
    Doing: ["e", "f"],
    Done: ["g"],
  },
});
