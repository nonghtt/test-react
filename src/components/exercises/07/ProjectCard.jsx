import AvatarGroup from "../../ui/AvatarGroup";
import Badge from "../../ui/Badge";
import { Link } from "react-router";
import { statusInfo } from "../../../data/projects";

export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card-title">
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      </div>
      <p className="card-desc">{project.description}</p>
      <div className="card-footer">
        {
          <Badge tone={statusInfo[project.status].tone} key={project.status}>
            {statusInfo[project.status].label}
          </Badge>
        }
        <AvatarGroup members={project.members} />
        <span className="muted text-sm push-right">{`~ ${project.dueDate}`}</span>
      </div>
    </div>
  );
}
