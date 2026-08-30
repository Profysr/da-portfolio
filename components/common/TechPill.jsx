import { getTechIcon } from "@/data/skills";
import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "gap-1 px-1.5 py-0.5 text-[9.5px] sm:text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-2 px-3 py-1.5 text-sm",
  xl: "gap-2.5 px-4 py-2 text-base",
  responsive:
    "gap-2 px-3 py-1.5 text-sm xl:gap-2.5 xl:px-4 xl:py-2 xl:text-base",
};

const ICON_SIZE_CLASSES = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
  responsive: "size-6",
};

export function TechPill({ name, className, size = "md" }) {
  const config = getTechIcon(name);
  const showImage = Boolean(config?.img);
  const showName = !showImage || !config?.hideName;

  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
  const iconSize = ICON_SIZE_CLASSES[size] ?? ICON_SIZE_CLASSES.md;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface-muted",
        "text-foreground hover:border-primary/40 hover:text-primary transition-all",
        sizeClass,
        className,
      )}
    >
      {showImage && (
        <img
          src={config.img}
          alt={name}
          loading="lazy"
          className={cn("shrink-0 object-contain", iconSize)}
        />
      )}
      {showName && <span className="font-medium">{name}</span>}
    </span>
  );
}
