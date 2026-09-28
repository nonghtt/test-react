import Card from "./Card";

export default function CardList({ cards }) {
  return (
    <>
      {cards.length !== 0 ? (
        cards.map((card) => <Card key={card.id} card={card}></Card>)
      ) : (
        <div className="empty">카드 없음</div>
      )}

      {}
    </>
  );
}
