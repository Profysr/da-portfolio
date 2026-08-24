"use client";

import { useState, useMemo, type FC, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface NumberSliderProps {
  label?: string;
  unit?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  layout?: "col" | "row";
  className?: string;
}

export const NumberSlider: FC<NumberSliderProps> = ({
  label = "Value",
  unit = "",
  value,
  min = 12,
  max = 52,
  step = 2,
  defaultValue = 30,
  onChange,
  layout = "col",
  className,
}) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);

  const current = value ?? internalValue;
  const percentage = ((current - min) / (max - min)) * 100;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    onChange?.(val);
  };

  const dots = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="z-30 h-1.5 w-1.5 rounded-lg bg-muted-foreground/40"
        />
      )),
    [],
  );

  const isRow = layout === "row";

  return (
    <div
      className={cn(
        "flex select-none transition-colors",
        isRow ? "flex-row items-center gap-4" : "flex-col gap-2",
        className,
      )}
    >
      {/* Label and Value Header / Side Display */}
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          isRow ? "shrink-0 min-w-30" : "w-full",
        )}
      >
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <AnimatedText
            value={current.toString()}
            className="overflow-hidden text-2xl font-bold tracking-tight text-foreground"
          />
          {unit && (
            <span className="text-sm font-semibold text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Slider Track Container */}
      <div
        className={cn(
          "group bg-muted relative flex h-10 items-center overflow-hidden rounded-md",
          isRow ? "w-full flex-1" : "w-full",
        )}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          {dots}
        </div>

        <motion.div
          className="pointer-events-none absolute top-0 left-0 h-full"
          style={{
            background: "var(--color-primary)",
          }}
          animate={{
            width: `calc((${percentage} / 100) * (100% - 40px) + 40px)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleSliderChange}
          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
        />

        <motion.div
          className="pointer-events-none absolute top-0 z-40 flex h-10 w-10 items-center justify-center"
          animate={{
            left: `calc((${percentage} / 100) * (100% - 40px))`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="bg-background shadow-inset-highlight size-8 rounded-md" />
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedText = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex tracking-tight will-change-transform", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {value.split("").map((char, index) => {
          const displayChar = char === " " ? "\u00A0" : char;

          return (
            <motion.span
              key={char + index}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 0, scale: 1, transition: { duration: 0 } }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NumberSlider;
