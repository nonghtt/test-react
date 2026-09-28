// 정적 버전. 첫 열(할 일) 카드의 버튼 줄 — ← 만 disabled.
//   가운데 열: 둘 다 활성 / 끝 열(완료): → 만 disabled
//   「담당자 ▸」 버튼은 Part B에서 주석을 푼다.
import { members, columns } from "../../../data/board";
import { useBoardDispatch } from "../../../hooks/useBoardDispatch";
import { useRenderCount } from "../../../hooks/useRenderCount";
import { memo } from "react";

function CardActions({ card }) {
  const dispatch = useBoardDispatch();
  const columnIndex = columns.findIndex((c) => c.id === card.status);
  const isFirst = columnIndex === 0;
  const isLast = columnIndex === columns.length - 1;
  useRenderCount("CardActions");

  function changeAssignee(id) {
    const currentAssigneeIndex = members.findIndex(
      (member) => member.id === card.assigneeId,
    );
    if (currentAssigneeIndex === members.length - 1) {
      dispatch({ type: "assignee_changed", id, assigneeId: null });
    } else {
      const newAssignee = members[currentAssigneeIndex + 1];
      dispatch({ type: "assignee_changed", id, assigneeId: newAssignee.id });
    }
  }

  return (
    <div className="card-footer">
      <button
        className="btn btn-sm"
        type="button"
        disabled={isFirst}
        onClick={() =>
          dispatch({
            type: "card_moved",
            id: card.id,
            status: columns[columnIndex - 1].id,
          })
        }
      >
        ←
      </button>
      <button
        className="btn btn-sm"
        type="button"
        disabled={isLast}
        onClick={() =>
          dispatch({
            type: "card_moved",
            id: card.id,
            status: columns[columnIndex + 1].id,
          })
        }
      >
        →
      </button>
      <button
        className="btn btn-sm btn-ghost"
        type="button"
        onClick={() => changeAssignee(card.id)}
      >
        담당자 ▸
      </button>
      <button
        className="btn btn-sm btn-danger push-right"
        type="button"
        onClick={() => dispatch({ type: "card_deleted", id: card.id })}
      >
        삭제
      </button>
    </div>
  );
}

export default memo(CardActions);
