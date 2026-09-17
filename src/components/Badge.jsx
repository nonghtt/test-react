export default function Badge({ tag }) {
  const statusConfig = {
    active: {
      label: "진행 중",
      className: "badge-primary",
    },
    delayed: {
      label: "지연",
      className: "badge-danger",
    },
    done: {
      label: "완료",
      className: "badge-success",
    },
  };

  const config = statusConfig[tag] || { label: tag, className: "" };

  return (
    <>
      <span className={`badge ${config.className}`}>{config.label}</span>
    </>
  );
}
