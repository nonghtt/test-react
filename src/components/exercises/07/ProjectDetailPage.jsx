import Badge from "../../ui/Badge";
import CommentBox from "./CommentBox";
import { Link, useParams } from "react-router";
import { projects } from "../../../data/projects";
import { statusInfo } from "../../../data/projects";

// 정적 버전. /projects/12 (첫 프로젝트) 화면이 하드코딩되어 있다.
// 다른 상태의 마크업은 아래 주석에 있다.
//   참여자 없음 — 참여자 row 대신 <p className="muted text-sm">참여자 없음</p>
//   태그 없음   — tag-list 를 그리지 않는다
//   끝 프로젝트 — 「← 이전」이 링크, 「다음 →」이 <button disabled>
//   없는 프로젝트 — 이 화면 전체 대신:

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((project) => projectId === String(project.id));
  const projectIndex = projects.findIndex(
    (project) => String(project.id) === projectId,
  );

  const isFirst = projectIndex === 0;
  const isLast = projectIndex === projects.length - 1;

  if (!project) {
    return (
      <div className="stack">
        <div className="alert alert-error">
          프로젝트를 찾을 수 없습니다. (id: {projectId})
        </div>
        <Link className="text-sm" to="/projects">
          ← 목록으로
        </Link>
      </div>
    );
  } else {
    return (
      <div className="stack">
        <Link className="text-sm" to="/projects">
          ← 목록으로
        </Link>
        <div className="row row-between">
          <h1>{project.name}</h1>
          <Badge tone={statusInfo[project.status].tone} key={project.status}>
            {statusInfo[project.status].label}
          </Badge>
        </div>
        <p className="card-desc">{project.description}</p>
        <div className="row row-wrap">
          <span className="muted text-sm">{`마감 ${project.dueDate}`}</span>
          {project.tags.length === 0 ? (
            ""
          ) : (
            <div className="tag-list">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        <div className="stack-sm">
          <h3>참여자</h3>
          {project.members.length !== 0 ? (
            <div className="row row-wrap">
              {project.members.map((member) => (
                <div className="row" key={member.id}>
                  <img
                    className="avatar avatar-sm"
                    src={member.avatar}
                    alt={member.name}
                  />
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted text-sm">참여자 없음</p>
          )}
        </div>

        <CommentBox />

        <div className="card-footer">
          {isFirst ? (
            <button className="btn btn-sm" type="button" disabled>
              ← 이전 프로젝트
            </button>
          ) : (
            <Link
              className="btn btn-sm"
              type="button"
              disabled={isFirst}
              to={`/projects/${projects[projectIndex - 1].id}`}
            >
              ← 이전 프로젝트
            </Link>
          )}
          {isLast ? (
            <button className="btn btn-sm" type="button" disabled>
              다음 프로젝트 →
            </button>
          ) : (
            <Link
              className="btn btn-sm"
              type="button"
              disabled={isFirst}
              to={`/projects/${projects[projectIndex + 1].id}`}
            >
              다음 프로젝트 →
            </Link>
          )}
          <button className="btn btn-sm btn-danger push-right" type="button">
            삭제
          </button>
        </div>
      </div>
    );
  }
}
