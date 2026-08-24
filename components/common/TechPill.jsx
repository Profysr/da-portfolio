import { getTechIcon } from "@/data/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SIZE_CLASSES = {
  sm: "gap-1 px-1.5 py-0.5 text-[9.5px] sm:text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-2 px-3 py-1.5 text-sm",
  xl: "gap-2.5 px-4 py-2 text-base",
};

const IMG_SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-5",
  lg: "size-6.5",
  xl: "size-8",
};

// Icon-only pills (hideName) get a wider 3:2-ish box so wide logo
// banners (NHS, SystmOne, EMIS...) render at meaningful size instead
// of letterboxing inside a square.
const ICON_ONLY_CLASSES = {
  sm: "w-6 h-4",
  md: "w-8 h-5",
  lg: "w-10 h-6",
  xl: "w-12 h-8",
};

export function TechPill({ name, className, size = "md" }) {
  const config = getTechIcon(name);
  const showImage = Boolean(config?.img);
  // Show name if: no image, OR image exists but hideName is not set
  const showName = !showImage || !config?.hideName;

  const iconWrapClass = config?.lightBg ? "rounded bg-foreground p-0.5" : "";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface-muted",
        "text-foreground hover:border-primary/40 hover:text-primary transition-all",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {showImage && (
        <span
          className={cn(
            "shrink-0 flex items-center justify-center",
            showName ? IMG_SIZE_CLASSES[size] : ICON_ONLY_CLASSES[size],
            iconWrapClass,
          )}
        >
          <Image
            src={config?.img}
            alt={name}
            width={showName ? 32 : 48}
            height={showName ? 24 : 32}
            loading="lazy"
            className="size-full object-contain"
          />
        </span>
      )}
      {showName && <span className="font-medium">{name}</span>}
    </span>
  );
}
