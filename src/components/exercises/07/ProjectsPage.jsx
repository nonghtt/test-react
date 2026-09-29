import Tab from "../../ui/Tab";
import ProjectCard from "./ProjectCard";
import { projects } from "../../../data/projects";
import { useState } from "react";
import { statusInfo } from "../../../data/projects";
// 정적 버전. 「전체」 탭이 골라진 상태, 카드 한 장이 하드코딩되어 있다.
// 빈 상태 — 걸러진 카드가 0개면 grid 대신 <div className="empty">이 상태의 프로젝트가 없습니다</div>
export default function ProjectsPage() {
  const [activeTabId, setActiveTabId] = useState("all");

  const statusArray = Object.keys(statusInfo);

  const tabs = [
    { id: "all", label: "전체", count: projects.length },
    ...statusArray.map((status) => ({
      id: status,
      label: statusInfo[status].label,
      count: projects.filter((project) => project.status === status).length,
    })),
  ];

  const isAllType = activeTabId === "all";

  const filteredProject = isAllType
    ? projects
    : projects.filter((project) => project.status === activeTabId);

  return (
    <>
      <h1>프로젝트</h1>
      <Tab
        tabs={tabs}
        activeTabId={activeTabId}
        handleTabBtnClick={(id) => {
          setActiveTabId(id);
        }}
      />

      {filteredProject.length === 0 ? (
        <div className="empty">이 상태의 프로젝트가 없습니다</div>
      ) : (
        <div className="grid">
          {filteredProject.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      )}
    </>
  );
}
