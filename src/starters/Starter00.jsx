// 00 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
// 카드 3장에 필요한 모든 모양이 들어 있습니다: 온라인 / 오프라인(배지 없음) / 선택된 상태.

export default function Starter00() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>팀원 목록</h1>
        <span className="muted">총 3명</span>
      </header>

      <div className="grid">
        {/* 온라인 + 선택 안 됨 */}
        <div className="card stack-sm">
          <img
            className="avatar avatar-lg"
            src="https://i.pravatar.cc/80?img=1"
            alt=""
          />
          <div className="card-title">김하늘</div>
          <p className="card-desc">프론트엔드</p>
          <span className="badge badge-success">온라인</span>
          <div className="card-footer">
            <button className="btn btn-sm">선택</button>
          </div>
        </div>

        {/* 오프라인 — 배지가 아예 없음 */}
        <div className="card stack-sm">
          <img
            className="avatar avatar-lg"
            src="https://i.pravatar.cc/80?img=12"
            alt=""
          />
          <div className="card-title">이준서</div>
          <p className="card-desc">백엔드</p>
          <div className="card-footer">
            <button className="btn btn-sm">선택</button>
          </div>
        </div>

        {/* 온라인 + 선택됨 — card에 selected, 버튼은 btn-primary + 글자 변경 */}
        <div className="card selected stack-sm">
          <img
            className="avatar avatar-lg"
            src="https://i.pravatar.cc/80?img=5"
            alt=""
          />
          <div className="card-title">박서연</div>
          <p className="card-desc">디자이너</p>
          <span className="badge badge-success">온라인</span>
          <div className="card-footer">
            <button className="btn btn-sm btn-primary">선택 해제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
