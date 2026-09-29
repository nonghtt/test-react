import { NavLink, Link, Outlet } from "react-router";
// 정적 버전. 모든 페이지에 공통인 헤더와, 페이지가 들어갈 <main>.
// 지금은 <main> 안에 ProjectsPage 를 직접 그리고 있다.
export default function Layout() {
  return (
    <>
      <header className="header">
        <Link className="brand" to="/">
          Project Hub
        </Link>
        <nav className="nav">
          <NavLink className="nav-link" to="/projects">
            프로젝트
          </NavLink>
          <NavLink className="nav-link" to="/about">
            소개
          </NavLink>
        </nav>
      </header>
      <main className="container stack">
        <Outlet />
      </main>
    </>
  );
}
