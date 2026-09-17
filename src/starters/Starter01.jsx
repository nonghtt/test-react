// 01 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 주의: 스타터는 "모양 샘플"입니다. 여기엔 팀 2개·카드 3장만 있지만
// 실제 데이터(src/data/teams.js)는 팀 3개·프로젝트 6개입니다. 무엇을 몇 개 보여줄지는 데이터가 기준입니다.
//
// 들어 있는 모양:
//   섹션  — 프로젝트가 있는 팀(제목 옆에 개수) / 프로젝트가 없는 팀(개수 표시 없음 + 빈 상태 상자)
//   카드  — 전부 다 있는 카드 / 설명·태그·담당자가 없는 카드 / 마감일이 없는 카드
//   배지  — 진행 중(badge-primary) / 지연(badge-danger) / 완료(badge-success) / 태그(색 없는 기본 badge)

export default function Starter01() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>프로젝트 현황</h1>
        <span className="muted">총 3개</span>
      </header>

      {/* 섹션: 프로젝트가 있는 팀 */}
      <section className="stack">
        <div className="row">
          <h2>웹 팀</h2>
          <span className="muted text-sm">3개</span>
        </div>

        <div className="grid">
          {/* 카드: 설명·태그·담당자·마감일 전부 있음 */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">디자인 시스템 개편</div>
              <span className="badge badge-primary">진행 중</span>
            </div>
            <p className="card-desc">버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.</p>
            <div className="tag-list">
              <span className="badge">React</span>
              <span className="badge">CSS</span>
            </div>
            <div className="card-footer">
              <div className="avatar-group">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=5" alt="박서연" />
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=9" alt="정유진" />
              </div>
              <span className="muted text-sm push-right">마감 2026-10-15</span>
            </div>
          </div>

          {/* 카드: 설명 없음, 태그 없음(tag-list 자체가 없음), 담당자 없음(avatar-group 자체가 없음) */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">결제 페이지 리뉴얼</div>
              <span className="badge badge-danger">지연</span>
            </div>
            <div className="card-footer">
              <span className="muted text-sm push-right">마감 2026-09-01</span>
            </div>
          </div>

          {/* 카드: 마감일 없음 */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">관리자 대시보드</div>
              <span className="badge badge-success">완료</span>
            </div>
            <p className="card-desc">주문·회원 통계를 한 화면에서 본다.</p>
            <div className="tag-list">
              <span className="badge">차트</span>
            </div>
            <div className="card-footer">
              <div className="avatar-group">
                <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=12" alt="이준서" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션: 프로젝트가 없는 팀 — 제목 옆 개수 표시가 없고, 그리드 대신 빈 상태 상자 */}
      <section className="stack">
        <div className="row">
          <h2>데이터 팀</h2>
        </div>

        <div className="empty">진행 중인 프로젝트가 없습니다</div>
      </section>
    </div>
  )
}
