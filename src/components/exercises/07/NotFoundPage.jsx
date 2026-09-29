// 정적 버전. 「처음으로」가 <a> 로 되어 있다.
export default function NotFoundPage() {
  return (
    <div className="empty stack-sm">
      <p>페이지를 찾을 수 없습니다 (404)</p>
      <a href="/">처음으로</a>
    </div>
  );
}
