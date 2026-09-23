import Board from "./components/exercises/06/Board";
import { useReducer } from "react";
import { boardReducer } from "./reducers/BoardReducer";
import { initialCards } from "./data/board";
import { useState } from "react";
// 06. Part A에서는 여기에 useReducer 가 들어오고, Part B에서 BoardProvider 로 감싼다.
export default function App() {
  const [cards, setCards] = useState(initialCards);
  // const [state, dispatch] = useReducer(boardReducer, initialCards);
  // dispatch({ type: "card_moved", id: "c1", direction: "right" });
  return <Board cards={cards} />;
}
