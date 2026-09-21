import { useState } from "react";

export default function Form({ totalPay, isCartEmpty, sendOrders }) {
  const [text, setText] = useState("");
  const maxLength = 50;
  const isOverLimit = text.length > maxLength;

  function initializeForm() {
    setText("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    initializeForm();
    sendOrders();
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="memo">
          요청사항 {isOverLimit && "(초과상태)"}
        </label>
        <textarea
          id="memo"
          className={`textarea ${isOverLimit ? "invalid" : ""}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className={`help ${isOverLimit ? "error" : ""}`}>
          {text.length} / 50자 {isOverLimit && " 50자 이하로 줄여 주세요"}
        </p>
      </div>

      <div className="row row-between">
        <strong>{`합계 ${totalPay.toLocaleString()}원`}</strong>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isOverLimit || isCartEmpty}
        >
          주문하기
        </button>
      </div>
    </form>
  );
}
