import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";

export default function Board({
  cards,
  filter,
  onMove,
  onDelete,
  onFilterChange,
}) {
  const isAllType = filter === "all";
  const selectedBoardCount = isAllType
    ? cards.length
    : cards.filter((card) => String(card.assigneeId) === filter).length;

  return (
    <div className="container stack">
      <BoardHeader
        onFilterChange={onFilterChange}
        filter={filter}
        count={selectedBoardCount}
      />
      <div className="board">
        {columns.map((column) => {
          let filteredCards = cards.filter((card) => card.status === column.id);

          if (!isAllType) {
            filteredCards = filteredCards.filter(
              (card) => String(card.assigneeId) === filter,
            );
          }

          return (
            <Column
              key={column.id}
              title={column.title}
              count={filteredCards.length}
              cards={filteredCards}
              onMove={onMove}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
