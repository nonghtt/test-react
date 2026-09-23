import CardList from "./CardList";

// 정적 버전. 열 제목과 숫자가 하드코딩되어 있다.
export default function Column() {
  return (
    <section className="column">
      <div className="column-title">
        <h3>할 일</h3>
        <span className="muted text-sm">3</span>
      </div>
      <CardList />
    </section>
  );
}
