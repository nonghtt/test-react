import { columns } from "../../../data/board";
import { useBoardDispatch } from "../../../hooks/useBoardDispatch";
import { useRenderCount } from "../../../hooks/useRenderCount";
import { memo } from "react";

function CardActions({ id, status }) {
  useRenderCount("CardActions");
  const dispatch = useBoardDispatch();
  const isFirst = status === columns[0].id;
  const isLast = status === columns[columns.length - 1].id;

  function move(direction) {
    dispatch({ type: "card_moved", id, direction });
  }

  return (
    <div className="card-footer">
      <button
        className="btn btn-sm"
        type="button"
        disabled={isFirst}
        onClick={() => move("left")}
      >
        ←
      </button>
      <button
        className="btn btn-sm"
        type="button"
        disabled={isLast}
        onClick={() => move("right")}
      >
        →
      </button>
      <button
        className="btn btn-sm btn-ghost"
        type="button"
        onClick={() => dispatch({ type: "assignee_cycled", id })}
      >
        담당자 ▸
      </button>
      <button
        className="btn btn-sm btn-danger push-right"
        type="button"
        onClick={() => dispatch({ type: "card_deleted", id })}
      >
        삭제
      </button>
    </div>
  );
}

export default memo(CardActions);
