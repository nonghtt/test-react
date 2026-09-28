import Board from "./components/exercises/06/Board";
import { useReducer } from "react";
import { boardReducer } from "./reducers/boardReducer";
import { initialCards } from "./data/board";

// 06. Part A에서는 여기에 useReducer 가 들어오고, Part B에서 BoardProvider 로 감싼다.
export default function App() {
  const [boards, dispatch] = useReducer(boardReducer, {
    cards: initialCards,
    filter: "all",
  });

  function onMove(id, status) {
    dispatch({ type: "card_moved", id, status });
  }

  function onFilterChange(value) {
    dispatch({ type: "filter_changed", value });
  }

  function onDelete(id) {
    dispatch({ type: "card_deleted", id });
  }

  return (
    <Board
      cards={boards.cards}
      filter={boards.filter}
      onMove={onMove}
      onDelete={onDelete}
      onFilterChange={onFilterChange}
    />
  );
}
