import Board from "./components/exercises/06/Board";
import BoardProvider from "./contexts/BoardProvider";

// 06. Part A에서는 여기에 useReducer 가 들어오고, Part B에서 BoardProvider 로 감싼다.
export default function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}
