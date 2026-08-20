import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";
import { Spinner } from "@/components/PageLoader";
import { NotFound } from "@/components/NotFound";

// Lazy-loaded detail pages — each ships as its own chunk
const WritingDetail = lazy(() => import("@/pages/WritingDetail"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const ProjectChangelog = lazy(() => import("@/pages/ProjectChangelog"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Reading-layout routes — lazy-loaded detail pages */}
        <Route element={<ReadingLayout />}>
          <Route
            path="/writing/:slug"
            element={
              <Suspense fallback={<Spinner />}>
                <WritingDetail />
              </Suspense>
            }
          />
          <Route
            path="/projects/:slug/changelog"
            element={
              <Suspense fallback={<Spinner />}>
                <ProjectChangelog />
              </Suspense>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<Spinner />}>
                <ProjectDetail />
              </Suspense>
            }
          />
        </Route>

        {/* Catch-all 404 route - MUST be at the end */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
