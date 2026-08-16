import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";

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