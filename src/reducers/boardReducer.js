export function boardReducer(state, action) {
  switch (action.type) {
    case "card_moved": {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.id ? { ...card, status: action.status } : card,
        ),
      };
    }

    case "card_deleted": {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
      };
    }
    // case "card_deleted": {
    //   return {
    //     ...state,
    //     cards: state.cards.map((card) =>
    //       card.id === action.id ? { ...card, status: action.status } : card,
    //     ),
    //   };
    // }

    case "filter_changed": {
      return { ...state, filter: action.value };
    }

    default:
      throw new Error(`알 수 없는 액션 ${action.type}`);
  }
}
