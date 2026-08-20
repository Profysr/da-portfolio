import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";
import WritingDetail from "@/pages/WritingDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectChangelog from "@/pages/ProjectChangelog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<ReadingLayout />}>
          <Route path="/writing/:slug" element={<WritingDetail />} />
          <Route
            path="/projects/:slug/changelog"
            element={<ProjectChangelog />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}