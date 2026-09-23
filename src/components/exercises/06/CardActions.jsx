// 정적 버전. 첫 열(할 일) 카드의 버튼 줄 — ← 만 disabled.
//   가운데 열: 둘 다 활성 / 끝 열(완료): → 만 disabled
//   「담당자 ▸」 버튼은 Part B에서 주석을 푼다.
export default function CardActions() {
  return (
    <div className="card-footer">
      <button className="btn btn-sm" type="button" disabled>←</button>
      <button className="btn btn-sm" type="button">→</button>
      {/* <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button> */}
      <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
    </div>
  );
}
