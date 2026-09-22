import { useState } from "react";
import { useEffect } from "react";

export function useDebouncedValue(value, delay) {
  const [debounced, setDebounce] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return { debounced };
}
