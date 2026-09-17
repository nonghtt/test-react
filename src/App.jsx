import { useState } from "react";
import { members } from "./data/members";
import MemberCard from "./Components/MemberCard";

export default function App() {
  const [totalMembers] = useState(members);
  const teamRoles = ["프론트엔드", "백엔드", "디자이너"];

  const teamMembers = totalMembers.filter((member) => {
    return teamRoles.includes(member.role);
  });

  const teamMembersCounts = teamMembers.length;

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>팀원 목록</h1>
        <span className="muted">총 {teamMembersCounts}명</span>
      </header>
      <div className="grid">
        {teamMembers.map((member) => {
          return <MemberCard key={member.id} member={member}></MemberCard>;
        })}
      </div>
    </div>
  );
}
