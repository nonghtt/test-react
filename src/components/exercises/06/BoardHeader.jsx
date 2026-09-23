// 정적 버전. select의 value·onChange 와 오른쪽 숫자를 연결하는 것이 할 일.
// <option> 목록은 members 데이터로 map 한다.
import { members } from "../../../data/members";
export default function BoardHeader() {
  const teamMember = members.map((member) => ({
    id: member.id,
    name: member.name,
  }));
  return (
    <header className="row row-between">
      <h1>팀 보드</h1>
      <div className="row">
        <label className="label" htmlFor="assignee">
          담당자
        </label>
        <select id="assignee" className="select select-auto" defaultValue="all">
          <option value="all">전체</option>
          {teamMember.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <span className="muted text-sm">8장</span>
      </div>
    </header>
  );
}
