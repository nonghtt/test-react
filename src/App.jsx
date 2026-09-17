import { teams } from "./data/teams";
import Section from "./components/Section";

export default function App() {
  let totalProjectCount = 0;
  // let totalProjectCount = teams.reduce(
  //   (sum, team) => sum + team.projects.length,
  //   0,
  // );

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>프로젝트 현황</h1>
        <span className="muted">총 {totalProjectCount}개</span>
      </header>
      <section className="stack">
        {teams.map((team) => {
          return <Section teams={team} key={team.id}></Section>;
        })}
      </section>
    </div>
  );
}
