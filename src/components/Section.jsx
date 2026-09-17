import ProjectCard from "./ProjectCard";

export default function Section({ teams }) {
  return (
    <>
      <div className="row">
        <h2>{teams.name}</h2>
        <span className="muted text-sm">{teams.projects.length}개</span>
      </div>
      <div className="grid">
        {teams.projects.length === 0 ? (
          <div className="empty">진행 중인 프로젝트가 없습니다</div>
        ) : (
          teams.projects.map((project) => {
            return (
              <ProjectCard project={project} key={project.id}></ProjectCard>
            );
          })
        )}
      </div>
    </>
  );
}
