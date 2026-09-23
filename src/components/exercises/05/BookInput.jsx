export default function BookInput({ ref, keyword, setKeyword }) {
  function handleDeleteBtn() {
    setKeyword("");
    ref.current.focus();
  }

  return (
    <div className="row">
      <input
        ref={ref}
        className="input"
        placeholder="제목이나 저자로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className="btn btn-ghost btn-sm"
        type="button"
        disabled={!keyword}
        onClick={() => handleDeleteBtn()}
      >
        지우기
      </button>
    </div>
  );
}
