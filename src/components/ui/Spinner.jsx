export default function Spinner({ children = "불러오는중" }) {
  return (
    <div className="loading">
      <div className="spinner" /> {children}
    </div>
  );
}
