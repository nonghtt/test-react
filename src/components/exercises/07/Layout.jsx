import ProjectsPage from "./ProjectsPage";

// 정적 버전. 모든 페이지에 공통인 헤더와, 페이지가 들어갈 <main>.
// 지금은 <main> 안에 ProjectsPage 를 직접 그리고 있다.
export default function Layout() {
  return (
    <>
      <header className="header">
        <a className="brand" href="/">
          Project Hub
        </a>
        <nav className="nav">
          <a className="nav-link active" href="/projects">
            프로젝트
          </a>
          <a className="nav-link" href="/about">
            소개
          </a>
        </nav>
      </header>
      <main className="container stack">
        <ProjectsPage />
      </main>
    </>
  );
}
