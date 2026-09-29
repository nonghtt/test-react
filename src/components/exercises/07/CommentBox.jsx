// 정적 버전. 빈 입력창과 글자 수가 하드코딩되어 있다.
// 등록 버튼은 없다 — 이번 실습에서는 입력 중인 글(초안)만 다룬다.
export default function CommentBox() {
  return (
    <div className="field">
      <label className="label" htmlFor="comment">
        댓글
      </label>
      <textarea id="comment" className="textarea" placeholder="이 프로젝트에 남길 말" />
      <p className="help">0 / 200</p>
    </div>
  );
}
