"use client";

import { forwardRef, useCallback, useState } from "react";
import Image from "next/image";
import { IconPhotoOff } from "@tabler/icons-react";
import { Skeleton } from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";

const OptimizedImage = forwardRef(function OptimizedImage(
  {
    src,
    alt,
    priority = false,
    fill = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    quality = 85,
    className,
    imgClassName,
    onError,
    ...props
  },
  ref
) {
  const [status, setStatus] = useState("loading");

  const handleLoad = useCallback(() => setStatus("loaded"), []);
  const handleError = useCallback(
    (event) => {
      setStatus("error");
      onError?.(event);
    },
    [onError]
  );

  return (
    <span
      ref={ref}
      data-status={status}
      className={cn(
        "grid",
        fill && "absolute inset-0",
        className
      )}
    >
      {status === "loading" && (
        <Skeleton className="[grid-area:1/1]" />
      )}

      {status === "error" ? (
        <span
          role="img"
          aria-label={alt}
          className="flex items-center justify-center bg-muted text-muted-foreground [grid-area:1/1]"
        >
          <IconPhotoOff
            className="h-8 w-8 opacity-40"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
          placeholder="empty"
          quality={quality}
          sizes={sizes}
          fill={fill}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "[grid-area:1/1]",
            fill && "object-cover",
            "transition-opacity duration-500 ease-out-expo",
            status === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName
          )}
          {...props}
        />
      )}
    </span>
  );
});

OptimizedImage.displayName = "OptimizedImage";
export default OptimizedImage;
