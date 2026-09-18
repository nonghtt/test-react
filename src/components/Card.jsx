export default function Card({ menu, onSelect }) {
  return (
    <div className="card stack-sm">
      <div className="emoji-lg">{menu.emoji}</div>
      <div className="card-title">{menu.name}</div>
      <p className="card-desc">{menu.description}</p>
      <div className="card-footer">
        <span className="muted text-sm">{menu.price}</span>
        <button
          className="btn btn-sm push-right"
          onClick={() => {
            onSelect(menu);
          }}
        >
          담기
        </button>
      </div>
    </div>
  );
}
