import { getTechIcon } from "@/data/skills";
import { cn } from "@/lib/utils";

interface TechPillProps {
  name: string;
  subCategory?: string | null;
  className?: string;
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: "gap-1 px-1.5 py-0.5 text-[9.5px] sm:text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
};

const IMG_SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-5",
};

export function TechPill({
  name,
  subCategory = null,
  className,
  size = "md",
}: TechPillProps) {
  const config = getTechIcon(name);
  const showImage = Boolean(config?.img);
  // Show name if: no image, OR image exists but hideName is not set
  const showName = !showImage || !config?.hideName;

  const iconWrapClass = config?.lightBg
    ? "rounded bg-white/90 dark:bg-white/15 p-0.5"
    : "";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface-high/40",
        "text-zinc-200 hover:border-primary/40 hover:text-white transition-all",
        SIZE_CLASSES[size],
        className
      )}
    >
      {showImage && (
        <span className={cn("shrink-0 flex items-center justify-center", IMG_SIZE_CLASSES[size], iconWrapClass)}>
          <img
            src={config!.img}
            alt={name}
            className="object-contain size-full"
          />
        </span>
      )}
      {showName && (
        <span className="font-medium">{name}</span>
      )}
      {subCategory && showName && (
        <span className="text-muted-foreground/70 font-mono border-l border-border pl-1 opacity-70">
          {subCategory}
        </span>
      )}
    </span>
  );
}