"use client";

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// COMPONENT: AutoResizeTextArea
// Dynamic height text input adjusting up to 160px based on content length.
// ============================================================================
export const AutoResizeTextArea = forwardRef(
  ({ value, onChange, onKeyDown, className, ...props }, ref) => {
    const textareaRef = useRef(null);

    useImperativeHandle(ref, () => textareaRef.current);

    // Synchronize height with content scroll height on value change
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "0px";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
      }
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows={1}
        className={cn(
          "w-full min-h-[56px] max-h-40 py-4 pl-3 pr-11 text-sm resize-none overflow-y-auto",
          "bg-background/50 hover:bg-background border border-border/40 focus:border-foreground/20 rounded-lg focus:outline-none transition-all",
          "placeholder:text-muted-foreground/60 disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

AutoResizeTextArea.displayName = "AutoResizeTextArea";
