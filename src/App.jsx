import { members } from "./data/members";
import MemberCard from "./components/MemberCard";

export default function App() {
  const totalMembersCounts = members.length;

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>팀원 목록</h1>
        <span className="muted">총 {totalMembersCounts}명</span>
      </header>
      <div className="grid">
        {members.map((member) => {
          return <MemberCard key={member.id} member={member}></MemberCard>;
        })}
      </div>
    </div>
  );
}
