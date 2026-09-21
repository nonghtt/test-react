export default function CartItems({ cart, addItem, deleteItem }) {
  const cartItems = Object.values(cart);

  if (cartItems.length === 0) {
    return <div className="empty">아직 담은 메뉴가 없습니다</div>;
  }

  return (
    <ul className="list">
      {cartItems.map((item) => {
        return (
          <li className="list-item" key={item.id}>
            <span className="list-item-grow">{item.name}</span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => deleteItem(item)}
            >
              −
            </button>
            <span className="qty">{item.qty}</span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => addItem(item)}
            >
              +
            </button>
            <span className="muted text-sm">{`${(item.qty * item.price).toLocaleString()} 원`}</span>
          </li>
        );
      })}
    </ul>
  );
}
