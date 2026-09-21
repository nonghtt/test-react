import InputForm from "./components/exercises/03/InputForm";
import { initialTodos, morningRoutine } from "./data/todos";
import Tab from "./components/ui/Tab";
import TodoList from "./components/exercises/03/TodoList";
import { useState } from "react";

let nextId = 4;

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const totalTodosCount = todos.length;
  const waitingTodosCount = todos.filter((todo) => todo.done === false).length;
  const doneTodosCount = todos.filter((todo) => todo.done === true).length;

  const tabs = [
    { id: 1, label: "전체", status: "all", count: totalTodosCount },
    { id: 2, label: "진행 중", status: "doing", count: waitingTodosCount },
    { id: 3, label: "완료", status: "completed", count: doneTodosCount },
  ];
  const [activeTabId, setActiveTabId] = useState(1);
  const activeTabStatus = tabs.find((tab) => tab.id === activeTabId).status;

  function addMorningRoutine() {
    morningRoutine.forEach((routine) => {
      addTodo(routine);
    });
  }

  function addTodo(todoInput) {
    setTodos((prev) => [
      ...prev,
      {
        id: `t${nextId++}`,
        text: todoInput,
        done: false,
      },
    ]);
  }

  function handleTabBtnClick(id) {
    setActiveTabId(id);
  }

  function toggleTodoStatus(id) {
    setTodos((prev) => {
      return prev.map((todo) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      });
    });
  }

  function onEditBtn(id, text) {
    setTodos((todos) => {
      return todos.map((todo) => {
        return todo.id === id ? { ...todo, text } : todo;
      });
    });
  }

  function onDeleteBtn(id) {
    setTodos((todos) => {
      return todos.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  function handleCompletedTodos() {
    setTodos((prev) => {
      return prev.filter((todo) => todo.done === false);
    });
  }

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>할 일</h1>
        <button
          className="btn btn-sm"
          type="button"
          onClick={addMorningRoutine}
        >
          아침 루틴 추가
        </button>
      </header>
      <InputForm addTodo={addTodo}></InputForm>
      <Tab
        tabs={tabs}
        activeTabId={activeTabId}
        handleTabBtnClick={handleTabBtnClick}
      ></Tab>
      <TodoList
        todos={todos}
        activeTabStatus={activeTabStatus}
        toggleTodoStatus={toggleTodoStatus}
        onEditBtn={onEditBtn}
        onDeleteBtn={onDeleteBtn}
      ></TodoList>
      <div className="row row-between">
        <span className="muted text-sm">{`${totalTodosCount}개 중 ${doneTodosCount}개 완료`}</span>
        <button
          className="btn btn-sm btn-ghost"
          type="button"
          disabled={doneTodosCount === 0}
          onClick={handleCompletedTodos}
        >
          완료 항목 지우기
        </button>
      </div>
      <hr className="divider" />
    </div>
  );
}
