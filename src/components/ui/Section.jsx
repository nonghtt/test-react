export default function Section({ title, count, children }) {
  return (
    <section className="stack">
      <div className="row">
        <h2>{title}</h2>
        {count > 0 && <span className="muted text-sm">{count}개</span>}
      </div>
      {children}
    </section>
  );
}
