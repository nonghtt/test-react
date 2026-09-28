import Board from "./components/exercises/06/Board";
import BoardProvider from "./contexts/BoardProvider";
export default function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}
