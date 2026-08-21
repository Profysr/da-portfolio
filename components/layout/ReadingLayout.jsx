"use client";

import { Section } from "./Section";
import { Footer } from "./Footer";
import TopBar from "./TopBar";

function ReadingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar isVisible={true} />
      <Section className="flex-1 py-8 md:py-12" noFade>
        <div className="max-w-7xl mx-auto">{children}</div>
      </Section>
      <Footer />
    </div>
  );
}

export default ReadingLayout;
