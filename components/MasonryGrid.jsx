"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function useColumnCount() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

export function MasonryGrid({ items, renderItem, className }) {
  const cols = useColumnCount();

  // Distribute items round-robin across columns (Left-to-Right)
  const columnBuckets = Array.from({ length: cols }, () => []);
  items.forEach((item, index) => {
    columnBuckets[index % cols].push({ item, originalIndex: index });
  });

  return (
    <div
      className={cn("grid gap-3.5 w-full items-start", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {columnBuckets.map((bucket, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3.5 w-full">
          {bucket.map(({ item, originalIndex }) =>
            renderItem(item, originalIndex),
          )}
        </div>
      ))}
    </div>
  );
}
