import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";
import ReadingDemo from "@/components/ReadingDemo";
import WritingDetail from "@/pages/WritingDetail";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    element: <ReadingLayout />,
    handle: { breadcrumb: "Reading" },
    children: [
      {
        path: "reading-demo",
        element: <ReadingDemo />,
        handle: { breadcrumb: "Demo" },
      },
      {
        path: "writing/:slug",
        element: <WritingDetail />,
        handle: { breadcrumb: "Writing" },
      },
    ],
  },
]);