import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";
import ReadingDemo from "@/components/ReadingDemo";
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
      // {
      //   path: "reading-demo",
      //   element: <ReadingDemo />,
      // },
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