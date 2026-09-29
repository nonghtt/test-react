import Tab from "../../ui/Tab";
import ProjectCard from "./ProjectCard";
import { projects } from "../../../data/projects";
import { statusInfo } from "../../../data/projects";
import { useSearchParams } from "react-router";
export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabId =
    searchParams.get("status") in statusInfo
      ? searchParams.get("status")
      : "all";

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

  function handleTabBtnClick(status) {
    if (status in statusInfo) {
      setSearchParams({ status });
    } else {
      setSearchParams({});
    }
  }

  return (
    <>
      <h1>프로젝트</h1>
      <Tab
        tabs={tabs}
        activeTabId={activeTabId}
        handleTabBtnClick={(id) => {
          handleTabBtnClick(id);
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
