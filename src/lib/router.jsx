/**
 * Deprecated: We're not using it anymore but it can be used and helpful when you want to integrate breadcrumbs in your app dynamically. 
 */

import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";
import WritingDetail from "@/pages/WritingDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectChangelog from "@/pages/ProjectChangelog";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    element: <ReadingLayout />,
    children: [
      {
        path: "writing/:slug",
        element: <WritingDetail />,
      },
      {
        path: "projects/:slug/changelog",
        element: <ProjectChangelog />,
      },
      {
        path: "projects/:slug",
        element: <ProjectDetail />,
      },
    ],
  },
]);