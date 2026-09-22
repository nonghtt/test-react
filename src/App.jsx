import BookInput from "./components/exercises/05/BookInput";
import { useState } from "react";
import { useBooks } from "./hooks/useBooks";
import BookResult from "./components/exercises/05/BookResult";
import Spinner from "./components/ui/Spinner";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const { debounced } = useDebouncedValue(keyword, 500);

  const { books, loading, error, retry } = useBooks(debounced);

  const bookCount = books.length;
  const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>도서 검색</h1>
        <span className="muted text-sm">{`${bookCount}권`}</span>
      </header>
      <BookInput keyword={keyword} setKeyword={setKeyword}></BookInput>
      <hr className="divider" />
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <BookResult
          error={error}
          books={sorted}
          onSearch={() => retry()}
        ></BookResult>
      )}
    </div>
  );
}
