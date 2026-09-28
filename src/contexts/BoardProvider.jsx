import { useReducer } from "react";
import { boardReducer } from "../reducers/boardReducer";
import { initialCards } from "../data/board";
import { BoardStateContext, BoardDispatchContext } from "./BoardContext";

export default function BoardProvider({ children }) {
  const [boards, dispatch] = useReducer(boardReducer, {
    cards: initialCards,
    filter: "all",
  });

  return (
    <BoardStateContext value={boards}>
      <BoardDispatchContext value={dispatch}>{children}</BoardDispatchContext>
    </BoardStateContext>
  );
}
