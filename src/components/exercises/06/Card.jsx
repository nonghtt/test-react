import CardActions from "./CardActions";
import { members } from "../../../data/members";

export default function Card({ card }) {
  const assignee = members.find((member) => member.id === card.assigneeId);
  return (
    <div className="card stack-sm">
      <div className="row row-between">
        <div className="card-title">{card.title}</div>
        <button className="btn btn-sm btn-ghost" type="button">
          접기
        </button>
      </div>
      <p className="card-desc">{card.description}</p>
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
      <CardActions />
    </div>
  );
}
