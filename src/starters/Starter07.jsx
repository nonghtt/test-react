// 07 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 같은 마크업이 src/components/exercises/07/ 에 이미 나뉘어 있습니다.
//
// 이 스타터는 "화면 모음"입니다. 실제 앱에서는 주소마다 아래 화면 중 하나만 헤더 밑에 나옵니다.
//   /projects               — 프로젝트 목록 (상태 탭 · 카드 그리드 · 빈 상태)
//   /projects/12            — 프로젝트 상세 (이전/다음 · 삭제 · 댓글 입력창)
//   /projects/999           — 없는 프로젝트 (상세 페이지 안에서 그림)
//   /about                  — 소개
//   /nope                   — 없는 주소 (404 페이지)
//
// 시각 상태
//   내비 링크 활성          — nav-link active
//   탭 활성                 — tab active
//   목록 빈 상태            — empty (걸러진 카드가 0개일 때만. 카드 그리드와 같이 나오지 않음)
//   이전/다음 비활성        — 첫/끝 프로젝트에서 <a> 대신 <button disabled>
//   참여자 없음 / 태그 없음 — 「참여자 없음」 문구 / tag-list 자체를 그리지 않음
//   상태 배지 색            — 진행 중 badge-primary · 지연 badge-warn · 완료 badge-success

function ScreenLabel({ children }) {
  return (
    <p className="muted text-sm" style={{ fontFamily: 'var(--mono)' }}>
      ── 화면: {children} ──
    </p>
  )
}

export default function Starter07() {
  return (
    <>
      <header className="header">
        <a className="brand" href="/">
          Project Hub
        </a>
        <nav className="nav">
          <a className="nav-link active" href="/projects">
            프로젝트
          </a>
          <a className="nav-link" href="/about">
            소개
          </a>
        </nav>
      </header>

      <main className="container stack">
        {/* ───────── /projects ───────── */}
        <ScreenLabel>/projects</ScreenLabel>
        <h1>프로젝트</h1>
        <div className="tabs">
          <button className="tab active" type="button">
            전체 7
          </button>
          <button className="tab" type="button">
            진행 중 3
          </button>
          <button className="tab" type="button">
            지연 2
          </button>
          <button className="tab" type="button">
            완료 2
          </button>
        </div>
        <div className="grid">
          <div className="card">
            <div className="card-title">
              <a href="/projects/12">디자인 시스템 개편</a>
            </div>
            <p className="card-desc">버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.</p>
            <div className="card-footer">
              <span className="badge badge-primary">진행 중</span>
              <div className="avatar-group">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=5" alt="박서연" />
              </div>
              <span className="muted text-sm push-right">~ 2026-10-15</span>
            </div>
          </div>
          <div className="card">
            <div className="card-title">
              <a href="/projects/15">결제 페이지 리뉴얼</a>
            </div>
            <p className="card-desc">간편결제 버튼을 추가하고 결제 실패 화면을 정리한다.</p>
            <div className="card-footer">
              <span className="badge badge-warn">지연</span>
              <div className="avatar-group">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=12" alt="이준서" />
              </div>
              <span className="muted text-sm push-right">~ 2026-09-01</span>
            </div>
          </div>
          <div className="card">
            <div className="card-title">
              <a href="/projects/41">사내 위키 이전</a>
            </div>
            <p className="card-desc">옛 위키 문서를 새 도구로 옮긴다.</p>
            <div className="card-footer">
              {/* 참여자가 없으면 avatar-group 을 그리지 않는다 (ui/AvatarGroup 이 알아서 함) */}
              <span className="badge badge-success">완료</span>
              <span className="muted text-sm push-right">~ 2026-07-31</span>
            </div>
          </div>
        </div>
        {/* 빈 상태 — 걸러진 카드가 0개일 때 grid 대신 */}
        <div className="empty">이 상태의 프로젝트가 없습니다</div>

        <hr className="divider" />

        {/* ───────── /projects/12 ───────── */}
        <ScreenLabel>/projects/12 (첫 프로젝트)</ScreenLabel>
        <div className="stack">
          <a className="text-sm" href="/projects">
            ← 목록으로
          </a>
          <div className="row row-between">
            <h1>디자인 시스템 개편</h1>
            <span className="badge badge-primary">진행 중</span>
          </div>
          <p className="card-desc">버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.</p>
          <div className="row row-wrap">
            <span className="muted text-sm">마감 2026-10-15</span>
            <div className="tag-list">
              <span className="badge">React</span>
              <span className="badge">CSS</span>
            </div>
          </div>

          <div className="stack-sm">
            <h3>참여자</h3>
            <div className="row row-wrap">
              <div className="row">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
                <span className="text-sm">김하늘</span>
              </div>
              <div className="row">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=5" alt="박서연" />
                <span className="text-sm">박서연</span>
              </div>
            </div>
            {/* 참여자 없음: <p className="muted text-sm">참여자 없음</p> */}
          </div>

          <div className="field">
            <label className="label" htmlFor="comment">
              댓글
            </label>
            <textarea id="comment" className="textarea" placeholder="이 프로젝트에 남길 말" />
            <p className="help">0 / 200</p>
          </div>

          <div className="card-footer">
            {/* 첫 프로젝트라 이전이 없다 → 링크가 아니라 비활성 버튼 */}
            <button className="btn btn-sm" type="button" disabled>
              ← 이전 프로젝트
            </button>
            <a className="btn btn-sm" href="/projects/15">
              다음 프로젝트 →
            </a>
            {/* 끝 프로젝트면 반대로:
            <a className="btn btn-sm" href="/projects/34">← 이전 프로젝트</a>
            <button className="btn btn-sm" type="button" disabled>다음 프로젝트 →</button>
            */}
            <button className="btn btn-sm btn-danger push-right" type="button">
              삭제
            </button>
          </div>
        </div>

        <hr className="divider" />

        {/* ───────── /projects/999 ───────── */}
        <ScreenLabel>/projects/999 (없는 프로젝트)</ScreenLabel>
        <div className="stack">
          <div className="alert alert-error">프로젝트를 찾을 수 없습니다. (id: 999)</div>
          <a className="text-sm" href="/projects">
            ← 목록으로
          </a>
        </div>

        <hr className="divider" />

        {/* ───────── /about ───────── */}
        <ScreenLabel>/about</ScreenLabel>
        <div className="stack-sm">
          <h1>소개</h1>
          <p className="muted">React 실습 07 · 라우팅용 프로젝트 허브입니다.</p>
        </div>

        <hr className="divider" />

        {/* ───────── /nope ───────── */}
        <ScreenLabel>/nope (없는 주소)</ScreenLabel>
        <div className="empty stack-sm">
          <p>페이지를 찾을 수 없습니다 (404)</p>
          <a href="/">처음으로</a>
        </div>
      </main>
    </>
  )
}
