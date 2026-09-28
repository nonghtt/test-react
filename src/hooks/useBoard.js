import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (ctx === null)
    throw new Error("useBoard는 BoardContext 안에서만 사용할 수 있다.");
  return ctx;
}
