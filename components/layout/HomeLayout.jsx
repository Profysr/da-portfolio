"use client";

import { useState, useEffect, Suspense } from "react";
import { Footer } from "./Footer";
import { AIAssistant } from "@/components/chatbot/AIAssistant";
import BottomDock from "@/components/layout/BottomDock";
import TopBar from "@/components/layout/TopBar";
import { GlowEffect } from "../common/top-glow";

/* ------------------------------------------------------------------ */
/*  HomeLayout — Master Application Shell with Continuous Dual-Tone Layout */
/* ------------------------------------------------------------------ */
function HomeLayout({ children }) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Automatically hide near the bottom so Dock never collides with Footer/CTAs
      const isNearBottom =
        windowHeight + currentScrollY >= documentHeight - 380;

      if (isNearBottom) {
        setIsNavVisible(false);
      } else if (currentScrollY <= 60) {
        setIsNavVisible(true);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between overflow-x-clip">
      {/* Top Sunshine Lightning Glow Effect */}
      <GlowEffect position="top" />
      <TopBar isVisible={isNavVisible} />

      {/* Main Content Area — pb-28 ensures Dock never occludes bottom content */}
      <div className="relative z-10 w-full flex-1">
        <Suspense fallback={null}>{children}</Suspense>
      </div>

      <BottomDock
        isVisible={isNavVisible}
        onAIClick={() => setIsAIOpen(true)}
      />
      <AIAssistant open={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer />
    </div>
  );
}

export default HomeLayout;
