import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";
import { useBoardState } from "../../../hooks/useBoardState";
import { useRenderCount } from "../../../hooks/useRenderCount";

export default function Board() {
  const boards = useBoardState();
  const cards = boards.cards;
  const filter = boards.filter;
  const isAllType = filter === "all";
  useRenderCount("Board");

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
