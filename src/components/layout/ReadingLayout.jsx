"use client";

import { Outlet, useLocation } from "react-router-dom";
import { Section } from "./Section";
import { Footer } from "./Footer";
import { ReadingNav } from "./ReadingNav";
import { ScrollToTop } from "@/components/ScrollToTop";

function ReadingLayout() {
  const { pathname } = useLocation();

  const title = pathname.startsWith("/projects")
    ? "Projects"
    : pathname.startsWith("/writing")
      ? "Writing"
      : "Reading";

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <ReadingNav title={title} />
        <Section className="flex-1 py-8 md:py-12" noFade>
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </Section>
        <Footer />
      </div>
    </>
  );
}

export default ReadingLayout;