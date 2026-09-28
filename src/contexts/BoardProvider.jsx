import { useReducer } from "react";
import { boardReducer } from "../reducers/boardReducer";
import { initialCards } from "../data/board";
import { BoardContext } from "./BoardContext";

export default function BoardProvider({ children }) {
  const [boards, dispatch] = useReducer(boardReducer, {
    cards: initialCards,
    filter: "all",
  });

  return <BoardContext value={{ boards, dispatch }}>{children}</BoardContext>;
}
