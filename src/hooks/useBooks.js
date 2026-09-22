import { useEffect } from "react";
import { useState } from "react";
import { fetchBooks } from "../api/booksApi";

export function useBooks(keyword) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  async function load(controller = {}) {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchBooks(keyword, controller);
      setBooks(result);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      setError(error.message);
    } finally {
      if (!controller?.signal?.aborted) {
        setLoading(false);
      }
      console.log("성공이든 실패든 마지막에 한 번");
    }
  }

  function retry() {
    setReloadKey((prev) => prev + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    // oxlint-disable-next-line react/set-state-in-effect -- 데이터 페칭 자체가 목적인 이펙트라 loading/error를 여기서 동기적으로 갱신하는 게 의도된 동작(외부 시스템과 동기화하는 경우).
    load(controller);

    return () => {
      controller.abort();
    };
  }, [keyword, reloadKey]);

  return { books, loading, error, retry };
}
