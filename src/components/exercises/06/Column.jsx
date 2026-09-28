import CardList from "./CardList";

export default function Column({ title, count = 0, cards }) {
  return (
    <section className="column">
      <div className="column-title">
        <h3>{title}</h3>
        <span className="muted text-sm">{count}</span>
      </div>
      <CardList cards={cards} />
    </section>
  );
}
