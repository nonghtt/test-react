import CardActions from "./CardActions";
import { members } from "../../../data/members";
import { useState } from "react";

export default function Card({ card }) {
  const assignee = members.find((member) => member.id === card.assigneeId);
  const [isOpen, setIsOpen] = useState(true);

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
      <CardActions id={card.id} status={card.status} />
    </div>
  );
}
