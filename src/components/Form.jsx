import { useState } from "react";

export default function Form({ cart, initializeCart }) {
  const [text, setText] = useState("");
  const maxLength = 50;
  const isOverLimit = text.length > maxLength;

  const cartItems = Object.values(cart);
  const totalPay = cartItems.reduce((sum, item) => {
    return sum + item.qty * item.price;
  }, 0);

  function handleSubmit(e) {
    e.preventDefault();
    initializeCart();
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
        <p className={`help ${isOverLimit && "error"}`}>
          {text.length} / 50자 {isOverLimit && " 50자 이하로 줄여 주세요"}
        </p>
      </div>

      <div className="row row-between">
        <strong>{`합계 ${totalPay.toLocaleString()}원`}</strong>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isOverLimit}
        >
          주문하기
        </button>
      </div>
    </form>
  );
}
