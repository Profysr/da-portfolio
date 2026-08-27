import { getTechIcon } from "@/data/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SIZE_CLASSES = {
  sm: "gap-1 px-1.5 py-0.5 text-[9.5px] sm:text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-2 px-3 py-1.5 text-sm",
  xl: "gap-2.5 px-4 py-2 text-base",
  responsive:
    "gap-2 px-3 py-1.5 text-sm xl:gap-2.5 xl:px-4 xl:py-2 xl:text-base",
};

const ICON_SIZE_VARIANTS = {
  sm: { name: "size-4", default: "size-5" },
  md: { name: "size-5", default: "size-6" },
  lg: { name: "size-6", default: "size-7" },
  xl: { name: "size-7", default: "size-8" },
  responsive: { name: "size-6", default: "size-8" },
  
};

export function TechPill({ name, className, size = "md" }) {
  const config = getTechIcon(name);
  const showImage = Boolean(config?.img);
  // Show name if: no image, OR image exists but hideName is not set
  const showName = !showImage || !config?.hideName;

  // const iconWrapClass = config?.lightBg ? "rounded bg-foreground p-0.5" : "";

  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
const sizeVariant = ICON_SIZE_VARIANTS[size] || ICON_SIZE_VARIANTS.sm;
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
        <span
          className={cn(
            "shrink-0 flex items-center justify-center relative",
            showName ? sizeVariant.name : sizeVariant.default,
            // iconWrapClass,
          )}
        >
          <Image
            src={config?.img}
            alt={name}
            fill
            loading="lazy"
            sizes="32px"
            className="object-contain"
          />
        </span>
      )}
      {showName && <span className="font-medium">{name}</span>}
    </span>
  );
}
