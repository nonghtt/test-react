import CardActions from "./CardActions";
import { members } from "../../../data/members";
import { columns } from "../../../data/board";
import { useState } from "react";

export default function Card({ card, onMove }) {
  const assignee = members.find((member) => member.id === card.assigneeId);
  const columnIndex = columns.findIndex((c) => c.id === card.status);
  const isFirst = columnIndex === 0;
  const isLast = columnIndex === columns.length - 1;
  const [isOpen, setIsOpen] = useState(true);

  function moveLeft() {
    const newStatus = columns[columnIndex - 1].id;
    onMove(card.id, newStatus);
  }

  function moveRight() {
    const newStatus = columns[columnIndex + 1].id;
    onMove(card.id, newStatus);
  }

  return (
    <div className="card stack-sm">
      <div className="row row-between">
        <div className="card-title">{card.title}</div>
        <button
          className="btn btn-sm btn-ghost"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "접기" : "펼치기"}
        </button>
      </div>
      {/* <p className="card-desc">{card.description}</p> */}
      {isOpen && <p className="card-desc">{card.description}</p>}
      {assignee ? (
        <div className="row">
          <img
            className="avatar avatar-sm"
            src={assignee.avatar}
            alt={assignee.name}
          />
          <span className="muted text-sm">{assignee.name}</span>
        </div>
      ) : (
        <div className="row">
          <span className="muted text-sm">담당자 없음</span>
        </div>
      )}
      <CardActions
        isFirst={isFirst}
        isLast={isLast}
        moveLeft={moveLeft}
        moveRight={moveRight}
      />
    </div>
  );
}
