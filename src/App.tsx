import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";

/**
 * App — router root.
 *
 * AppShell renders the chrome once (TopBar, Dock, CommandPalette).
 * Each page is responsible for wrapping its own content in <Layout>
 * to get consistent width, padding, and spacing.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/blog" element={<BlogPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;