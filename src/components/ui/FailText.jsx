export default function FailText({ text = "", children }) {
  return (
    <div className="stack-sm">
      <div className="alert alert-error">{text}</div>
      {children}
    </div>
  );
}
