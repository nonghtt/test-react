import { useContext } from "react";
import { BoardDispatchContext } from "../contexts/BoardContext";

export function useBoardDispatch() {
  const ctx = useContext(BoardDispatchContext);
  if (ctx === null)
    throw new Error("useBoardDispatch는 BoardContext 안에서만 사용할 수 있다.");
  return ctx;
}
