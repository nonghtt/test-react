export default function BookInput({ keyword, setKeyword, onSubmit }) {
  function handleKeyDown(e) {
    if (e.key !== "Enter" || e.repeat) {
      return;
    }
    onSubmit(keyword);
  }
  return (
    <input
      className="input"
      placeholder="제목이나 저자로 검색"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
