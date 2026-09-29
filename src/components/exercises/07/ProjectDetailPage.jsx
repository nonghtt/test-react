import Badge from "../../ui/Badge";
import CommentBox from "./CommentBox";

// 정적 버전. /projects/12 (첫 프로젝트) 화면이 하드코딩되어 있다.
// 다른 상태의 마크업은 아래 주석에 있다.
//   참여자 없음 — 참여자 row 대신 <p className="muted text-sm">참여자 없음</p>
//   태그 없음   — tag-list 를 그리지 않는다
//   끝 프로젝트 — 「← 이전」이 링크, 「다음 →」이 <button disabled>
//   없는 프로젝트 — 이 화면 전체 대신:
//     <div className="stack">
//       <div className="alert alert-error">프로젝트를 찾을 수 없습니다. (id: 999)</div>
//       <a className="text-sm" href="/projects">← 목록으로</a>
//     </div>
export default function ProjectDetailPage() {
  return (
    <div className="stack">
      <a className="text-sm" href="/projects">
        ← 목록으로
      </a>
      <div className="row row-between">
        <h1>디자인 시스템 개편</h1>
        <Badge tone="primary">진행 중</Badge>
      </div>
      <p className="card-desc">버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.</p>
      <div className="row row-wrap">
        <span className="muted text-sm">마감 2026-10-15</span>
        <div className="tag-list">
          <Badge>React</Badge>
          <Badge>CSS</Badge>
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
      </div>

      <CommentBox />

      <div className="card-footer">
        <button className="btn btn-sm" type="button" disabled>
          ← 이전 프로젝트
        </button>
        <a className="btn btn-sm" href="/projects/15">
          다음 프로젝트 →
        </a>
        <button className="btn btn-sm btn-danger push-right" type="button">
          삭제
        </button>
      </div>
    </div>
  );
}
