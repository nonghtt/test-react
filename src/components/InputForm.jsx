import { useState } from "react";

export default function InputForm({ addTodo }) {
  const [text, setText] = useState("");
  const [textEmpty, setTextEmpty] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!text) {
      setTextEmpty(true);
      return;
    }

    if (text.replaceAll(" ", "") === "") {
      setTextEmpty(true);
      return;
    }

    addTodo(text);
    setText("");
  }

  return (
    <form className="stack-sm" onSubmit={handleSubmit}>
      <div className="row">
        <input
          className={`input ${textEmpty ? "invalid" : ""}`}
          placeholder="할 일을 입력하세요"
          value={text}
          onChange={(e) => {
            if (textEmpty) {
              setTextEmpty(false);
            }
            setText(e.target.value);
          }}
        />
        <button className="btn btn-primary" type="submit">
          추가
        </button>
      </div>
      {textEmpty ? (
        <p className="help error">할 일 내용을 입력해 주세요</p>
      ) : (
        ""
      )}
    </form>
  );
}
