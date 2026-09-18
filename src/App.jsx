import { teams } from "./data/teams";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";

export default function App() {
  const totalProjectCount = teams.reduce(
    (sum, team) => sum + team.projects.length,
    0,
  );

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>프로젝트 현황</h1>
        <span className="muted">{`총 ${totalProjectCount}개`}</span>
      </header>
      {teams.map((team) => {
        return (
          <Section title={team.name} count={team.projects.length} key={team.id}>
            {team.projects.length === 0 ? (
              <div className="empty">진행 중인 프로젝트가 없습니다</div>
            ) : (
              <div className="grid">
                {team.projects.map((project) => {
                  return (
                    <ProjectCard
                      project={project}
                      key={project.id}
                    ></ProjectCard>
                  );
                })}
              </div>
            )}
          </Section>
        );
      })}
    </div>
  );
}
