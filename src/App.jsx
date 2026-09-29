import Layout from "./components/exercises/07/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import NotFoundPage from "./components/exercises/07/NotFoundPage";
import ProjectsPage from "./components/exercises/07/ProjectsPage";
import ProjectDetailPage from "./components/exercises/07/ProjectDetailPage";
import AboutPage from "./components/exercises/07/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/projects" replace />}></Route>
          <Route path="/projects" element={<ProjectsPage />}></Route>
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailPage />}
          ></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
