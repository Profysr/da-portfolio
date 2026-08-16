import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import { IconArrowRight } from "@tabler/icons-react";
import { personal } from "@/data/idx";

/* ============================================================
 *  Timezone Helper (GMT+5:00 - Islamabad / Karachi)
 * ============================================================ */
const getStatus = () => {
  if (typeof window === "undefined") return { status: "Available", dotColor: "green" };

  try {
    const hour = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi", // GMT+5:00
        hour: "numeric",
        hour12: false,
      }).format(new Date()),
      10
    );

    // Available between 9:00 AM and 11:00 PM (GMT+5)
    if (hour >= 9 && hour < 23) {
      return { status: "Available", dotColor: "green" };
    }
    return { status: "Away", dotColor: "amber" };
  } catch {
    return { status: "Available", dotColor: "green" };
  }
};

/* ============================================================
 *  1. Avatar & Status Badge Sub-component
 * ============================================================ */
export function AvatarStatus() {
  const { status, dotColor } = getStatus();
  const isGreen = dotColor === "green";

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Profile Avatar */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full p-0.5 bg-linear-to-br from-primary/70 via-primary/30 to-transparent shadow-xl">
        <img
          src={personal.avatar || "/avatar.jpg"}
          alt={personal.name || "Avatar"}
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div
        className={cn(
          "group rounded-full mt-4 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center gap-1.5 px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                isGreen ? "bg-emerald-400" : "bg-amber-400"
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                isGreen ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
          </span>
          <span>{status}</span>
          <IconArrowRight className="size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
}