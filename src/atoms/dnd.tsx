import { atom } from "recoil";

interface IToDoState {
  [key: string]: IState[];
}
export interface IState {
  id: number;
  text: string;
  url: string;
}

export const dndState = atom<IToDoState>({
  key: "DND",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
