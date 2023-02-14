import { atom } from "recoil";

export const dndState = atom<string[]>({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
