import { useState } from "react";

export default function MemberCard({ member }) {
  let [selected, setSelected] = useState(false);

  function toggleSelect() {
    setSelected(!selected);
  }

  return (
    <div className={`card stack-sm ${selected ? "selected" : ""}`}>
      <img className="avatar avatar-lg" src={member.avatar} alt={member.name} />
      <div className="card-title">{member.name}</div>
      <p className="card-desc">{member.role}</p>
      {member.online ? <span className="badge badge-success">온라인</span> : ""}
      <div className="card-footer">
        <button
          className={`btn btn-sm ${selected ? "btn-primary" : ""}`}
          onClick={toggleSelect}
        >
          {selected ? "선택해제" : "선택"}
        </button>
      </div>
    </div>
  );
}
