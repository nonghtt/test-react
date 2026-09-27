import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";

export default function Board({ cards, filter, handleFilterChange }) {

  return (
    <div className="container stack">
      <BoardHeader filter={filter} handleFilterChange={handleFilterChange}/>
      <div className="board">
        {columns.map((column) => {
          const filteredCards = cards.filter(
            (card) => card.status === column.id
          );
          return (
            <Column
              key={column.id}
              title={column.title}
              count={filteredCards.length}
              cards={filteredCards}
            />
          );
        })}
      </div>
    </div>
  );
}