import BoardHeader from "./BoardHeader";
import Column from "./Column";
import { columns } from "../../../data/board";
import { useState } from "react";

export default function Board({ cards }) {
  const [selectedMember, setSelectedMember] = useState("all");

  return (
    <div className="container stack">
      <BoardHeader setSelectedMember={setSelectedMember} />
      <div className="board">
        {columns.map((column) => {
          const filteredCards = cards.filter(
            (card) => card.status === column.id
          );
          return (
            <Column
              key={column.id}
              title={column.title}
              cards={filteredCards}
            />
          );
        })}
      </div>
    </div>
  );
}