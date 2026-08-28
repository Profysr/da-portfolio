"use client";

import { useEffect, useState, useRef } from "react";

export function useActiveHeading(items) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;

    const headingElements = items
      .map((item) => {
        const id = item.url.replace(/^#/, "");
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!headingElements.length) return;

    const callback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: [0, 1],
    });

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  return activeId;
}