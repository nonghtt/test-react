import AvatarGroup from "./AvatarGroup";
import Badge from "./Badge";

export default function ProjectCard({ project }) {
  const statusConfig = {
    active: {
      label: "진행 중",
      tone: "primary",
    },
    delayed: {
      label: "지연",
      tone: "danger",
    },
    done: {
      label: "완료",
      tone: "success",
    },
  };

  const status = statusConfig[project.status];

  return (
    <div className="card stack-sm">
      <div className="row row-between">
        <div className="card-title">{project.name}</div>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
      {project.description ? (
        <p className="card-desc">{project.description}</p>
      ) : (
        ""
      )}

      {project.tags.length !== 0 ? (
        <div className="tag-list">
          {project.tags.map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
        </div>
      ) : (
        ""
      )}
      <div className="card-footer">
        <AvatarGroup members={project.members}></AvatarGroup>
        {project.dueDate ? (
          <span className="muted text-sm push-right">
            마감 {project.dueDate}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
