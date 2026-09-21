// 04 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 주의: 스타터는 "모양 샘플"입니다. 아래에는 서로 배타적인 상태(로딩 / 에러 / 목록 /
// 빈 결과)가 한 화면에 전부 그려져 있습니다. 실제 화면에는 그중 하나만 나옵니다.
// 목록도 3줄만 있지만 실제 데이터(src/data/books.js)는 14권입니다.
//
// 들어 있는 모양:
//   검색창    — 입력 하나
//   로딩      — loading + spinner
//   에러      — alert alert-error + 「다시 시도」 버튼
//   목록      — list / list-item (제목 · 저자 · 연도 · 태그 배지)
//   빈 결과   — empty 상자
//   결과 개수 — 헤더 오른쪽 muted text-sm

export default function Starter04() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>도서 검색</h1>
        <span className="muted text-sm">14권</span>
      </header>

      <input className="input" placeholder="제목이나 저자로 검색" defaultValue="" />

      {/* ── 요청 중 ── */}
      <div className="loading">
        <div className="spinner" /> 불러오는 중…
      </div>

      <hr className="divider" />

      {/* ── 실패 ── */}
      <div className="stack-sm">
        <div className="alert alert-error">책 목록을 불러오지 못했습니다</div>
        <button className="btn btn-sm" type="button">다시 시도</button>
      </div>

      <hr className="divider" />

      {/* ── 성공 ── */}
      <ul className="list">
        <li className="list-item">
          <div className="list-item-grow">
            <div>모던 자바스크립트 Deep Dive</div>
            <div className="muted text-sm">이웅모 · 2020</div>
          </div>
          <div className="tag-list">
            <span className="badge">자바스크립트</span>
            <span className="badge">기초</span>
          </div>
        </li>
        <li className="list-item">
          <div className="list-item-grow">
            <div>리액트를 다루는 기술</div>
            <div className="muted text-sm">김민준 · 2019</div>
          </div>
          <div className="tag-list">
            <span className="badge">리액트</span>
          </div>
        </li>
        <li className="list-item">
          <div className="list-item-grow">
            <div>클린 코드</div>
            <div className="muted text-sm">로버트 마틴 · 2013</div>
          </div>
          <div className="tag-list">
            <span className="badge">설계</span>
          </div>
        </li>
      </ul>

      <hr className="divider" />

      {/* ── 결과 없음 ── */}
      <div className="empty">검색 결과가 없습니다</div>
    </div>
  )
}
