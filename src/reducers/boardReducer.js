export function boardReducer(state, action) {
  switch (action.type) {
    case "card_moved": {
      return { ...state.cards };
    }

    case "filter_changed": {
      console.log(action)
      return {...state, filter: action.value}
    }      

    default:
      throw new Error(`알 수 없는 액션 ${action.type}`);
  }
}
