import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";
import { useBoard } from "../../../hooks/useBoard";

export default function Board() {
  const { boards } = useBoard();
  const cards = boards.cards;
  const filter = boards.filter;
  const isAllType = filter === "all";

  const selectedBoardCount = isAllType
    ? cards.length
    : cards.filter((card) => String(card.assigneeId) === filter).length;

  return (
    <div className="container stack">
      <BoardHeader count={selectedBoardCount} />
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
            />
          );
        })}
      </div>
    </div>
  );
}
