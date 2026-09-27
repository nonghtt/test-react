import Board from "./components/exercises/06/Board";
import { useReducer } from "react";
import { boardReducer } from "./reducers/BoardReducer";
import { initialCards } from "./data/board";
import { members } from "./data/board";

// 06. Part A에서는 여기에 useReducer 가 들어오고, Part B에서 BoardProvider 로 감싼다.
export default function App() {
  // const [cards, setCards] = useState(initialCards);
const [cards, dispatch] = useReducer(boardReducer, {
  cards: initialCards,
  filter: [
    { id: "all", name: "전체" },
    ...members.map((member) => ({
      id: member.id,
      name: member.name,
    })),
  ],
});

  return <Board cards={cards.cards} />;
}
