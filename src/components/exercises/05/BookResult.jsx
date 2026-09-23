import BookList from "./BookList";
import FailText from "../../ui/FailText";

export default function BookResult({
  error,
  books,
  onSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <>
      {error ? (
        <FailText text={error}>
          {
            <button
              className="btn btn-sm"
              type="button"
              onClick={() => onSearch()}
            >
              다시 시도
            </button>
          }
        </FailText>
      ) : (
        <BookList
          books={books}
          sortBy={sortBy}
          onSortChange={setSortBy}
        ></BookList>
      )}
    </>
  );
}
