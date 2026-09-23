import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";

export default function Board({ cards }) {
  return (
    <div className="container stack">
      <BoardHeader />
      <div className="board">
        {columns.map((column) => (
          <Column key={column.id} title={column.title} cards={cards}></Column>
        ))}
      </div>
    </div>
  );
}
