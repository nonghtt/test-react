import { useRef } from "react";
import { useEffect } from "react";
export function useRenderCount(name) {
  const count = useRef(0);

  useEffect(() => {
    count.current++;
    console.log(`[render] ${name} ${count.current}회`);
  });
}
