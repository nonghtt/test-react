import BoardHeader from "./BoardHeader";
import Column from "./Column";

// 정적 버전. 열 3개가 하드코딩되어 있다 — columns 데이터로 map 하는 것부터 시작.
export default function Board() {
  return (
    <div className="container stack">
      <BoardHeader />
      <div className="board">
        <Column />
        <Column />
        <Column />
      </div>
    </div>
  );
}
