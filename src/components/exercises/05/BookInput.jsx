export default function BookInput({ keyword, setKeyword }) {
  return (
    <input
      className="input"
      placeholder="제목이나 저자로 검색"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
