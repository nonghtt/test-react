// 정적 버전. select의 value·onChange 와 오른쪽 숫자를 연결하는 것이 할 일.
// <option> 목록은 members 데이터로 map 한다.
export default function BoardHeader() {
  return (
    <header className="row row-between">
      <h1>팀 보드</h1>
      <div className="row">
        <label className="label" htmlFor="assignee">담당자</label>
        <select id="assignee" className="select select-auto" defaultValue="all">
          <option value="all">전체</option>
          <option value="1">김하늘</option>
          <option value="2">이준서</option>
          <option value="3">박서연</option>
          <option value="4">최민준</option>
          <option value="5">정유진</option>
        </select>
        <span className="muted text-sm">8장</span>
      </div>
    </header>
  );
}
