import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-6xl w-[95vw]",
};

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full rounded-lg border border-white/10 bg-surface/50 backdrop-blur-xl p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-foreground z-10",
              sizeClasses[size],
              className
            )}
          >
            {/* Ambient Background Glow */}
            {/* <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" /> */}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all z-20"
              >
                <IconX className="size-4" />
              </button>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4 border-b border-white/10 pr-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-bold tracking-tight text-white", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function ModalDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs sm:text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function ModalBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("py-4 overflow-y-auto flex-1 custom-scrollbar", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-white/10 mt-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
