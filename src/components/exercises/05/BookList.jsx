import BookItem from "./BookItem";
import BottomText from "../../ui/BottomText";
import { useRenderCount } from "../../../hooks/useRenderCount";
import Tab from "../../ui/Tab";
import { memo } from "react";

function BookList({ books, sortBy, onSortChange }) {
  const tabs = [
    { id: "title", label: "제목순" },
    { id: "year", label: "연도순" },
  ];

  function handleTabClick(id) {
    onSortChange(id);
  }

  useRenderCount("BookList");

  return (
    <>
      <Tab
        tabs={tabs}
        activeTabId={sortBy}
        handleTabBtnClick={(id) => handleTabClick(id)}
      ></Tab>
      {books.length === 0 ? (
        <BottomText>검색 결과가 없습니다.</BottomText>
      ) : (
        <ul className="list">
          {books.map((book) => {
            return <BookItem book={book} key={book.id}></BookItem>;
          })}
        </ul>
      )}
    </>
  );
}

export default memo(BookList);
