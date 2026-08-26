"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar({ className = "" }) {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(3)) * 100
        );
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className={`fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent pointer-events-none ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary transition-all duration-75 ease-out shadow-[0_0_8px_rgba(var(--primary-rgb,255,255,255),0.5)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
