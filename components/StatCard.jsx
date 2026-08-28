"use client";

import { Suspense } from "react";
import { BentoCard } from "./ui/bento-grid";
import { LazyNumberTicker } from "@/components/common/lazy";

const NumberTicker = ({ value, ...props }) => (
  <Suspense
    fallback={
      <span className="inline-flex items-center text-white" {...props}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
    }
  >
    <LazyNumberTicker value={value} {...props} />
  </Suspense>
);

/* ─────────────────────────────────────────────────────────────
 *  Reusable Stat Card Component
 * ───────────────────────────────────────────────────────────── */
export function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  isCompact = false,
}) {
  // Helper to extract numeric values and prefix/suffix strings (e.g. "1,500+" -> 1500, "", "+")
  const parseValue = (val) => {
    if (typeof val === "number") return { num: val, prefix: "", suffix: "" };
    const strVal = String(val);
    const numMatch = strVal.match(/[\d,.]+/);
    if (!numMatch) return { num: 0, prefix: strVal, suffix: "" };

    const num = parseFloat(numMatch[0].replace(/,/g, ""));
    const parts = strVal.split(numMatch[0]);
    return { num, prefix: parts[0] || "", suffix: parts[1] || "" };
  };

  const { num, prefix, suffix } = parseValue(value);

  // Compact layout (for 1-row stat cards without subtext)
  if (isCompact || !subtext) {
    return (
      <BentoCard className="h-full flex items-center justify-between p-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">{title}</span>
          <span className="text-lg font-bold text-white font-mono flex items-center gap-0.5">
            {prefix}
            <NumberTicker value={num} className="text-white" />
            {suffix}
          </span>
        </div>
        {Icon && <Icon className="h-4 w-4 text-primary/70 shrink-0" />}
      </BentoCard>
    );
  }

  // Full layout (for multi-row stat cards with subtext)
  return (
    <BentoCard className="h-full flex flex-col justify-between p-3.5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-medium">{title}</span>
        {Icon && <Icon className="h-3.5 w-3.5 text-primary/70 shrink-0" />}
      </div>
      <div className="my-auto">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono leading-none flex items-center gap-0.5">
          {prefix}
          <NumberTicker value={num} className="text-white" />
          {suffix}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground/70 font-mono">
        {subtext}
      </span>
    </BentoCard>
  );
}
