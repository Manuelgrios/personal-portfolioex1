import { Navigate, Route, Routes } from "react-router-dom";
import { HashScroll } from "./components/layout/HashScroll";
import { PageShell } from "./components/layout/PageShell";
import { SiteMetadata } from "./components/layout/SiteMetadata";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Projects } from "./pages/Projects";

export default function App() {
  return (
    <PageShell>
      <SiteMetadata />
      <HashScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageShell>
  );
}
