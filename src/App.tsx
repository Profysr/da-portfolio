import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import ReadingLayout from "@/components/layout/ReadingLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/blog" element={<BlogPage />} /> */}
        </Route>
        <Route element={<ReadingLayout />}>
          <Route
            path="/reading-demo"
            element={
              <div className="py-20 text-center text-muted-foreground">
                Reading layout is working. This is the demo page.
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;