export default function Card({ menu, onSelect, children }) {
  return (
    <div className="card stack-sm">
      <div className="emoji-lg">{menu.emoji}</div>

      {children ? (
        <div className="row row-between">
          <div className="card-title">{menu.name}</div>
          {children}
        </div>
      ) : (
        <div className="card-title">{menu.name}</div>
      )}
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
