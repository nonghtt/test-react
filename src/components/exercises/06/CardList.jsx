import Card from "./Card";

export default function CardList({ cards, onMove }) {
  return (
    <>
      {cards.length !== 0 ? (
        cards.map((card) => (
          <Card key={card.id} card={card} onMove={onMove}></Card>
        ))
      ) : (
        <div className="empty">카드 없음</div>
      )}

      {}
    </>
  );
}
