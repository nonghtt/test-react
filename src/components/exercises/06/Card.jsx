import CardActions from "./CardActions";

// 정적 버전. 「펼친 카드 + 담당자 있음」 상태가 하드코딩되어 있다.
// 다른 상태의 마크업은 아래 주석에 있다.
//   접힌 카드   — <p className="card-desc"> 를 그리지 않고, 버튼 글자는 「펼치기」
//   담당자 없음 — <img>와 이름 대신 <span className="muted text-sm">담당자 없음</span> 하나
export default function Card() {
  return (
    <div className="card stack-sm">
      <div className="row row-between">
        <div className="card-title">로그인 페이지 리뉴얼</div>
        <button className="btn btn-sm btn-ghost" type="button">접기</button>
      </div>
      <p className="card-desc">소셜 로그인 버튼 추가, 비밀번호 찾기 흐름 정리</p>
      <div className="row">
        <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
        <span className="muted text-sm">김하늘</span>
      </div>
      {/* 담당자 없음:
      <div className="row">
        <span className="muted text-sm">담당자 없음</span>
      </div>
      */}
      <CardActions />
    </div>
  );
}
