import { useContext } from "react";
import { BoardStateContext } from "../contexts/BoardContext";

export function useBoardState() {
  const ctx = useContext(BoardStateContext);
  if (ctx === null)
    throw new Error("useBoardState는 BoardContext 안에서만 사용할 수 있다.");
  return ctx;
}
