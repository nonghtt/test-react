export function boardReducer(state, action) {
  switch (action.type) {
    case "card_moved": {
      return { ...state.cards };
    }

    default:
      throw new Error(`알 수 없는 액션 ${action.type}`);
  }
}
