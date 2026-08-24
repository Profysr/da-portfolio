"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { personal } from "@/data/idx";
import Image from "next/image";
import { AnimatedShinyText } from "./ui/animated-shiny-text";

/* ============================================================
 *  Timezone Helper (GMT+5:00 - Islamabad / Karachi)
 * ============================================================ */
const getStatus = () => {
  if (typeof window === "undefined")
    return { status: "Online", dotColor: "green" };

  try {
    const hour = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi", // GMT+5:00
        hour: "numeric",
        hour12: false,
      }).format(new Date()),
      10,
    );

    // Online between 9:00 AM and 11:00 PM (GMT+5)
    if (hour >= 9 && hour < 23) {
      return { status: "Online", dotColor: "green" };
    }
    return { status: "Away", dotColor: "amber" };
  } catch {
    return { status: "Online", dotColor: "green" };
  }
};

/* ============================================================
 *  1. Avatar & Status Badge (dashed-ring avatar + status chip)
 * ============================================================ */
export function AvatarStatus() {
  const [statusInfo, setStatusInfo] = useState({
    status: "Online",
    dotColor: "green",
  });

  // Always start in the syncing state on page mount/reload
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    // Run the syncing animation for 5 seconds on every reload
    const timer = setTimeout(() => {
      setIsSyncing(false);
      setStatusInfo(getStatus());
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const { status, dotColor } = statusInfo;
  const isGreen = dotColor === "green";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Avatar with dashed primary ring */}
      <Image
        src={personal?.avatar || "/avatar.jpg"}
        alt={personal?.name || "Avatar"}
        width={120}
        height={120}
        className="object-cover rounded-full p-1 border-2 border-dashed border-primary"
        priority
      />

      {/* Status Badge */}
      <div className="group inline-flex items-center justify-center rounded-md border transition-all duration-300 ease-out">
        {isSyncing ? (
          /* --- SYNCING STATE --- */
          <div className="inline-flex items-center justify-center gap-2 px-2.5 py-1 transition ease-out">
            <IconLoader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide capitalize text-muted-foreground/80">
              Syncing...
            </span>
          </div>
        ) : (
          /* --- LOADED STATE --- */
          <AnimatedShinyText className="inline-flex items-center justify-center gap-2 px-2.5 py-1 transition ease-out hover:text-foreground hover:duration-300">
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                  isGreen ? "bg-emerald-400" : "bg-amber-400",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  isGreen ? "bg-emerald-500" : "bg-amber-500",
                )}
              />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide capitalize text-muted-foreground/80">
              {status}
            </span>
            <IconArrowRight className="size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        )}
      </div>
    </div>
  );
}
