// 03 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 주의: 스타터는 "모양 샘플"입니다. 아래에는 서로 배타적인 상태들이 한 화면에 전부 그려져 있습니다.
// 실제 화면에서는 그중 하나만 나옵니다. 무엇을 몇 개 보여줄지는 데이터(src/data/todos.js)와 요구사항이 기준입니다.
//
// 들어 있는 모양:
//   입력 폼   — 정상 / 빈 입력 오류(input invalid + help error)
//   필터 탭   — 선택된 탭(tab active) / 선택 안 된 탭
//   목록 줄   — 진행 중 / 완료(list-item done) / 편집 중(입력창 + 저장·취소)
//   하단 요약 — 완료 항목이 있을 때 / 없을 때(버튼 disabled)
//   빈 상태   — 할 일이 아예 없을 때 / 필터 결과만 비었을 때(진행중·완료)

export default function Starter03() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>할 일</h1>
        <button className="btn btn-sm" type="button">아침 루틴 추가</button>
      </header>

      {/* ── 입력 폼: 정상 ── */}
      <form className="stack-sm">
        <div className="row">
          <input className="input" placeholder="할 일을 입력하세요" defaultValue="" />
          <button className="btn btn-primary" type="submit">추가</button>
        </div>
      </form>

      {/* ── 입력 폼: 빈 입력으로 제출했을 때 ── */}
      <form className="stack-sm">
        <div className="row">
          <input className="input invalid" placeholder="할 일을 입력하세요" defaultValue="   " />
          <button className="btn btn-primary" type="submit">추가</button>
        </div>
        <p className="help error">할 일 내용을 입력해 주세요</p>
      </form>

      {/* ── 필터 탭: 개수는 항상 전체 기준 ── */}
      <div className="tabs">
        <button className="tab active" type="button">전체 3</button>
        <button className="tab" type="button">진행중 2</button>
        <button className="tab" type="button">완료 1</button>
      </div>

      {/* ── 목록 ── */}
      <ul className="list">
        {/* 진행 중인 줄 */}
        <li className="list-item">
          <input type="checkbox" />
          <span className="list-item-grow">우유 사기</span>
          <button className="btn btn-sm btn-ghost" type="button">수정</button>
          <button className="btn btn-sm btn-ghost text-danger" type="button">삭제</button>
        </li>

        {/* 완료된 줄 — list-item done, 체크박스 checked */}
        <li className="list-item done">
          <input type="checkbox" defaultChecked />
          <span className="list-item-grow">React 문서 읽기</span>
          <button className="btn btn-sm btn-ghost" type="button">수정</button>
          <button className="btn btn-sm btn-ghost text-danger" type="button">삭제</button>
        </li>

        {/* 편집 중인 줄 — 체크박스·수정·삭제 대신 입력창과 저장·취소 */}
        <li className="list-item">
          <span className="list-item-grow">
            <input className="input" defaultValue="03 실습 0단계 설계 쓰기" />
          </span>
          <button className="btn btn-sm btn-primary" type="button">저장</button>
          <button className="btn btn-sm btn-ghost" type="button">취소</button>
        </li>
      </ul>

      {/* ── 하단 요약: 완료 항목이 있을 때 ── */}
      <div className="row row-between">
        <span className="muted text-sm">3개 중 1개 완료</span>
        <button className="btn btn-sm btn-ghost" type="button">완료 항목 지우기</button>
      </div>

      <hr className="divider" />

      {/* ── 하단 요약: 완료 항목이 없을 때 — 버튼 disabled ── */}
      <div className="row row-between">
        <span className="muted text-sm">3개 중 0개 완료</span>
        <button className="btn btn-sm btn-ghost" type="button" disabled>완료 항목 지우기</button>
      </div>

      <hr className="divider" />

      {/* ── 빈 상태 3종: 목록(ul.list) 자리에 대신 들어갑니다 ── */}
      {/* 할 일이 아예 없을 때 */}
      <div className="empty">아직 할 일이 없습니다</div>
      {/* 「진행중」 탭인데 진행 중인 항목이 없을 때 */}
      <div className="empty">진행 중인 할 일이 없습니다</div>
      {/* 「완료」 탭인데 완료된 항목이 없을 때 */}
      <div className="empty">완료한 할 일이 없습니다</div>
    </div>
  )
}
