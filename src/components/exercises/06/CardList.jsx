import Card from "./Card";

// 정적 버전. 카드 2장이 하드코딩되어 있다.
// 카드가 없을 때는 아래 주석의 empty 상자 하나만 그린다 (열 안에 바로 들어간다).
export default function CardList() {
  return (
    <>
      <Card />
      <Card />
      {/* <div className="empty">카드 없음</div> */}
    </>
  );
}
