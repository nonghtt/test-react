import BookItem from "./BookItem";
import BottomText from "../../ui/BottomText";

export default function BookList({ books }) {
  return books.length === 0 ? (
    <BottomText>검색 결과가 없습니다.</BottomText>
  ) : (
    <ul className="list">
      {books.map((book) => {
        return <BookItem book={book} key={book.id}></BookItem>;
      })}
    </ul>
  );
}
