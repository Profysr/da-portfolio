import { cn } from "@/lib/utils";

const INTENSITY = {
  subtle: "opacity-70",
  medium: "opacity-85",
  strong: "opacity-100",
};

export function AmbientBackground({
  variant = "orb",
  intensity = "subtle",
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      data-intensity={intensity}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        INTENSITY[intensity],
        className
      )}
    >
      {variant === "orb" && (
        <>
          <span className="ambient-orb ambient-orb-a" />
          <span className="ambient-orb ambient-orb-b" />
          <span className="ambient-orb ambient-orb-c" />
        </>
      )}

      {variant === "grid" && (
        <div className="ambient-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      )}
    </div>
  );
}

export function GrainOverlay({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={cn("ambient-grain pointer-events-none fixed inset-0 z-[60]", className)}
    />
  );
}

export default AmbientBackground;
