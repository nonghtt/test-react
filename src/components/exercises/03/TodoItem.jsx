import { useState } from "react";

export default function TodoItem({
  todo,
  toggleTodoStatus,
  onEditBtn,
  onDeleteBtn,
  editInputId,
  setEditInputId,
}) {
  const [text, setText] = useState("");

  function goToEditMode(text, id) {
    setText(text);
    setEditInputId(id);
  }

  return (
    <li className={`list-item ${todo.done ? "done" : ""} `}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          toggleTodoStatus(todo.id);
        }}
      />

      <span className="list-item-grow">
        {editInputId === todo.id ? (
          <input
            className="input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        ) : (
          <span className="list-item-grow">{todo.text}</span>
        )}
      </span>

      {editInputId === todo.id ? (
        <>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => {
              if (text.replaceAll(" ", "")) {
                onEditBtn(todo.id, text);
              }
              setEditInputId(null);
            }}
          >
            저장
          </button>
          <button
            className="btn btn-sm btn-ghost"
            type="button"
            onClick={() => setEditInputId(null)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-sm btn-ghost"
            type="button"
            onClick={() => {
              goToEditMode(todo.text, todo.id);
            }}
          >
            수정
          </button>
          <button
            className="btn btn-sm btn-ghost text-danger"
            type="button"
            onClick={() => {
              onDeleteBtn(todo.id);
            }}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}
