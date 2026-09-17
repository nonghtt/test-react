import AvatarGroup from "./AvatarGroup";
import Badge from "./Badge";

export default function ProjectCard({ project }) {
  return (
    <div className="card stack-sm">
      <div className="row row-between">
        <div className="card-title">{project.name}</div>
        <Badge tag={project.status}></Badge>
      </div>
      <p className="card-desc">{project.description}</p>
      <div className="tag-list">
        {project.tags.map((tag) => {
          return <Badge tag={tag} key={tag}></Badge>;
        })}
      </div>
      <div className="card-footer">
        {project.members.map((member) => {
          return <AvatarGroup member={member} key={member.id}></AvatarGroup>;
        })}
        {project.dueDate ? (
          <span className="muted text-sm push-right">{project.dueDate}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
