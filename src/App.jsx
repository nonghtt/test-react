import BookInput from "./components/exercises/05/BookInput";
import { useMemo, useState } from "react";
import { useBooks } from "./hooks/useBooks";
import BookResult from "./components/exercises/05/BookResult";
import Spinner from "./components/ui/Spinner";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useRef } from "react";
import { useEffect } from "react";
import { useRenderCount } from "./hooks/useRenderCount";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const { debounced } = useDebouncedValue(keyword, 500);

  const { books, loading, error, retry } = useBooks(debounced);
  const inputRef = useRef(null);

  const bookCount = books.length;

  const [sortBy, setSortBy] = useState("title");

  const sorted = useMemo(
    () =>
      [...books].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === "string" && typeof valB === "string") {
          return valA.localeCompare(valB, undefined, { numeric: true });
        }

        return valA - valB;
      }),
    [books, sortBy],
  );

  useRenderCount("App");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>도서 검색</h1>
        <span className="muted text-sm">{`${bookCount}권`}</span>
      </header>
      <BookInput
        ref={inputRef}
        keyword={keyword}
        setKeyword={setKeyword}
      ></BookInput>
      <hr className="divider" />
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <BookResult
          error={error}
          books={sorted}
          onSearch={() => retry()}
          sortBy={sortBy}
          setSortBy={setSortBy}
        ></BookResult>
      )}
    </div>
  );
}
