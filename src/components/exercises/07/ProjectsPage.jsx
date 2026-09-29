import Tab from "../../ui/Tab";
import ProjectCard from "./ProjectCard";
import { projects } from "../../../data/projects";
// 정적 버전. 「전체」 탭이 골라진 상태, 카드 한 장이 하드코딩되어 있다.
// 빈 상태 — 걸러진 카드가 0개면 grid 대신 <div className="empty">이 상태의 프로젝트가 없습니다</div>
export default function ProjectsPage() {
  const tabs = [
    { id: "all", label: "전체", count: 7 },
    { id: "active", label: "진행 중", count: 3 },
    { id: "delayed", label: "지연", count: 2 },
    { id: "done", label: "완료", count: 2 },
  ];

  return (
    <>
      <h1>프로젝트</h1>
      <Tab tabs={tabs} activeTabId="all" handleTabBtnClick={() => {}} />
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}
