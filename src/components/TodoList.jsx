import TodoItem from "../components/TodoItem";
import BottomText from "../components/BottomText";
import { useState } from "react";

export default function TodoList({
  todos,
  activeTabStatus,
  toggleTodoStatus,
  onEditBtn,
  onDeleteBtn,
}) {
  const [editInputId, setEditInputId] = useState(null);

  const activeTodos = getActiveTodos(todos);
  const text = getText(activeTabStatus);

  function getActiveTodos(todos) {
    if (activeTabStatus === "doing") {
      return todos.filter((todo) => todo.done === false);
    } else if (activeTabStatus === "completed") {
      return todos.filter((todo) => todo.done === true);
    } else {
      return todos;
    }
  }

  function getText(activeTabStatus) {
    if (todos.length === 0) {
      return "아직 할 일이 없습니다";
    }

    if (activeTabStatus === "all") {
      return "아직 할 일이 없습니다";
    } else if (activeTabStatus === "doing") {
      return "진행 중인 할 일이 없습니다";
    } else if (activeTabStatus === "completed") {
      return "완료한 할 일이 없습니다";
    }
  }

  return activeTodos.length === 0 ? (
    <BottomText>{text}</BottomText>
  ) : (
    <ul className="list">
      {activeTodos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            toggleTodoStatus={toggleTodoStatus}
            onEditBtn={onEditBtn}
            onDeleteBtn={onDeleteBtn}
            editInputId={editInputId}
            setEditInputId={setEditInputId}
            key={todo.id}
          ></TodoItem>
        );
      })}
    </ul>
  );
}
