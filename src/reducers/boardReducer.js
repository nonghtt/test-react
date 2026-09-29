import { columns, members } from "../data/board";

// 담당자 순환 순서: 없음 → members[0] → … → 마지막 → 없음
const assigneeOrder = [null, ...members.map((member) => member.id)];

function nextColumnId(status, direction) {
  const step = direction === "left" ? -1 : 1;
  const index = columns.findIndex((column) => column.id === status);
  const next = columns[index + step];
  return next ? next.id : status;
}

function nextAssigneeId(assigneeId) {
  const index = assigneeOrder.indexOf(assigneeId);
  return assigneeOrder[(index + 1) % assigneeOrder.length];
}

function updateCard(cards, id, update) {
  return cards.map((card) => (card.id === id ? update(card) : card));
}

export function boardReducer(state, action) {
  switch (action.type) {
    case "card_moved": {
      return {
        ...state,
        cards: updateCard(state.cards, action.id, (card) => ({
          ...card,
          status: nextColumnId(card.status, action.direction),
        })),
      };
    }

    case "card_deleted": {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
      };
    }

    case "assignee_cycled": {
      return {
        ...state,
        cards: updateCard(state.cards, action.id, (card) => ({
          ...card,
          assigneeId: nextAssigneeId(card.assigneeId),
        })),
      };
    }

    case "filter_changed": {
      return { ...state, filter: action.value };
    }

    default:
      throw new Error(`알 수 없는 액션 ${action.type}`);
  }
}
