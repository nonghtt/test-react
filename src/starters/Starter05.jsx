// 05 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 04 화면에 세 가지가 추가됐습니다.
//   검색창 옆 「지우기」 버튼  — row grow 로 입력창이 남는 폭을 차지. 검색어가 비어 있으면 disabled
//   정렬 탭                   — tabs / tab active (제목순 · 연도순). 목록 위에 붙는다
//   (렌더 횟수 로그는 콘솔에만 찍으므로 화면 요소가 없다)
//
// 주의: 스타터는 "모양 샘플"입니다. 서로 배타적인 상태(로딩 / 에러 / 목록 / 빈 결과)가
// 한 화면에 전부 그려져 있습니다. 실제 화면에는 그중 하나만 나옵니다.

export default function Starter05() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>도서 검색</h1>
        <span className="muted text-sm">14권</span>
      </header>

      {/* ── 검색창 + 지우기 ── */}
      <div className="row">
        <input className="input grow" placeholder="제목이나 저자로 검색" defaultValue="리액트" />
        <button className="btn btn-ghost btn-sm" type="button">지우기</button>
      </div>

      {/* 검색어가 비어 있을 때: 버튼에 disabled 만 붙는다 */}
      <div className="row">
        <input className="input grow" placeholder="제목이나 저자로 검색" defaultValue="" />
        <button className="btn btn-ghost btn-sm" type="button" disabled>지우기</button>
      </div>

      <hr className="divider" />

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

      {/* ── 성공: 정렬 탭 + 목록 ── */}
      <div className="stack-sm">
        <div className="tabs">
          <button className="tab active" type="button">제목순</button>
          <button className="tab" type="button">연도순</button>
        </div>
        <ul className="list">
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
              <div>클린 코드</div>
              <div className="muted text-sm">로버트 마틴 · 2013</div>
            </div>
            <div className="tag-list">
              <span className="badge">설계</span>
            </div>
          </li>
        </ul>
      </div>

      <hr className="divider" />

      {/* ── 결과 없음 (탭은 그대로 두고 목록 자리에만) ── */}
      <div className="stack-sm">
        <div className="tabs">
          <button className="tab active" type="button">제목순</button>
          <button className="tab" type="button">연도순</button>
        </div>
        <div className="empty">검색 결과가 없습니다</div>
      </div>
    </div>
  )
}
