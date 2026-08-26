"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconZoomIn, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ZoomImage({
  src,
  alt = "Documentation image",
  caption,
  className,
  width = 1200,
  height = 675,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const displayCaption = caption || (alt !== "Documentation image" ? alt : "");

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!src) return null;

  return (
    <>
      <figure className={cn("my-6 group/img block", className)}>
        <div
          onClick={() => setIsOpen(true)}
          className="relative rounded-xl border border-border/80 bg-surface/40 overflow-hidden cursor-zoom-in transition-all duration-200 hover:border-primary/50 hover:shadow-md"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-surface-muted">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
              loading="lazy"
              {...props}
            />
          </div>

          {/* Zoom Badge Indicator on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-background/80 backdrop-blur-md border border-border/80 rounded-lg px-2.5 py-1 text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-sm">
            <IconZoomIn className="size-3.5 text-primary" />
            <span>Click to zoom</span>
          </div>
        </div>

        {displayCaption && (
          <figcaption className="mt-2.5 text-center text-xs text-muted-foreground font-mono">
            {displayCaption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close image preview"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface border border-border text-foreground hover:bg-surface-hover hover:border-primary transition-colors cursor-pointer shadow-lg"
          >
            <IconX className="size-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center cursor-default"
          >
            <div className="relative w-full max-h-[80vh] flex items-center justify-center rounded-xl overflow-hidden border border-border bg-surface/50 shadow-2xl">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={900}
                className="w-auto h-auto max-h-[80vh] max-w-full object-contain"
                priority
              />
            </div>
            {displayCaption && (
              <p className="mt-3 text-xs sm:text-sm text-foreground/90 font-medium text-center bg-surface/80 border border-border/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {displayCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
