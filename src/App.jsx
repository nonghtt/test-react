import BookInput from "./components/exercises/04/BookInput";
import { useEffect } from "react";
import { useState } from "react";

import { fetchBooks } from "./api/booksApi";
import BookResult from "./components/exercises/04/BookResult";
import Spinner from "./components/ui/Spinner";

export default function App() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bookCount = books.length;

  async function load(query, controller = {}) {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchBooks(query, controller);
      const sorted = [...result].sort((a, b) => a.title.localeCompare(b.title));
      setBooks(sorted);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      setError(error);
      setError(error.message);
    } finally {
      if (!controller?.signal?.aborted) {
        setLoading(false);
      }
      console.log("성공이든 실패든 마지막에 한 번");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    // oxlint-disable-next-line react/set-state-in-effect -- 데이터 페칭 자체가 목적인 이펙트라 loading/error를 여기서 동기적으로 갱신하는 게 의도된 동작(외부 시스템과 동기화하는 경우).
    load(keyword, controller);

    return () => {
      controller.abort();
    };
  }, [keyword]);

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>도서 검색</h1>
        <span className="muted text-sm">{`${bookCount}권`}</span>
      </header>
      <BookInput
        keyword={keyword}
        setKeyword={setKeyword}
        onSubmit={load}
      ></BookInput>
      <hr className="divider" />
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <BookResult
          error={error}
          books={books}
          onSearch={() => load(keyword)}
        ></BookResult>
      )}
    </div>
  );
}
