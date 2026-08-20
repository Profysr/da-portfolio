"use client";

import { Outlet } from "react-router-dom";
import { Section } from "./Section";
import { Footer } from "./Footer";
import { TopBar } from "./AppShell";

function ReadingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar isVisible={true} />
      <Section className="flex-1 py-8 md:py-12" noFade>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Section>
      <Footer />
    </div>
  );
}

export default ReadingLayout;
