export default function Badge({ tone = "", children }) {
  const color = {
    primary: "badge-primary",
    success: "badge-success",
    warn: "badge-warn",
    danger: "badge-danger",
  };

  return (
    <span className={`badge${color[tone] ? ` ${color[tone]}` : ""}`}>
      {children}
    </span>
  );
}
