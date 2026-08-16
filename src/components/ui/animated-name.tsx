"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;
export const SWAP_REVEAL_MS = 600;
export const HOLD_MS = 5000;

const GRADIENT_TEXT =
    "bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent";

const CLIP_REVEALED = "inset(0 0% 0 0)";
const CLIP_CLIPPED = "inset(0 100% 0 0)";

export type Phase = "initial" | "hold" | "exit" | "enter";
export type Suffix = string;

interface AnimatedNameProps {
    name?: string;
    suffixes?: [Suffix, Suffix];
    phase: Phase;
    suffix: Suffix;
    onExitComplete?: () => void;
    className?: string;
}

export function AnimatedName({
    name = "Shiv",
    suffixes = ["y", "am"],
    phase,
    suffix,
    onExitComplete,
    className,
}: AnimatedNameProps) {
    const [suffixA, suffixB] = suffixes;
    const [suffixWidths, setSuffixWidths] = useState<{
        [key: string]: number;
    } | null>(null);

    useLayoutEffect(() => {
        const measure = () => {
            const elA = document.getElementById("anim-name-suffix-a");
            const elB = document.getElementById("anim-name-suffix-b");
            if (elA && elB) {
                setSuffixWidths({
                    [suffixA]: elA.getBoundingClientRect().width,
                    [suffixB]: elB.getBoundingClientRect().width,
                });
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [suffixA, suffixB]);

    useEffect(() => {
        if (!document.fonts?.ready) return;
        document.fonts.ready.then(() => {
            const elA = document.getElementById("anim-name-suffix-a");
            const elB = document.getElementById("anim-name-suffix-b");
            if (elA && elB) {
                setSuffixWidths({
                    [suffixA]: elA.getBoundingClientRect().width,
                    [suffixB]: elB.getBoundingClientRect().width,
                });
            }
        });
    }, [suffixA, suffixB]);

    const measureClass = cn(
        "absolute left-[-9999px] top-0 invisible whitespace-pre pointer-events-none",
        className,
    );

    if (phase === "initial") {
        return (
            <>
                <motion.span
                    initial={{ clipPath: CLIP_CLIPPED }}
                    animate={{ clipPath: CLIP_REVEALED }}
                    transition={{
                        duration: INITIAL_REVEAL_MS / 1000,
                        ease: [0.6, 0.05, 0.3, 1],
                    }}
                    className={cn("inline-block", GRADIENT_TEXT, className)}
                >
                    {name}
                    {suffix}
                </motion.span>
                <span
                    id="anim-name-suffix-a"
                    aria-hidden="true"
                    className={measureClass}
                >
                    {suffixA}
                </span>
                <span
                    id="anim-name-suffix-b"
                    aria-hidden="true"
                    className={measureClass}
                >
                    {suffixB}
                </span>
            </>
        );
    }

    const restWidth = suffixWidths?.[suffix] ?? 0;

    const slotInitial = phase === "enter" ? 0 : restWidth;
    const slotTarget = phase === "exit" ? 0 : restWidth;

    const innerInitialClip =
        phase === "enter" ? CLIP_CLIPPED : CLIP_REVEALED;
    const innerTargetClip =
        phase === "exit" ? CLIP_CLIPPED : CLIP_REVEALED;

    const slotMotionProps = suffixWidths
        ? {
              initial: { width: slotInitial },
              animate: { width: slotTarget },
          }
        : {};

    return (
        <span className={cn("inline-block", className)}>
            {name}
            <motion.span
                key={phase}
                {...slotMotionProps}
                transition={{
                    duration: SWAP_REVEAL_MS / 1000,
                    ease: "easeInOut",
                }}
                onAnimationComplete={() => {
                    if (phase === "exit") onExitComplete?.();
                }}
                style={{
                    display: "inline-block",
                    verticalAlign: "baseline",
                    whiteSpace: "pre",
                }}
            >
                <motion.span
                    initial={{ clipPath: innerInitialClip }}
                    animate={{ clipPath: innerTargetClip }}
                    transition={{
                        duration: SWAP_REVEAL_MS / 1000,
                        ease: "easeInOut",
                    }}
                    style={{ display: "inline-block" }}
                    className={GRADIENT_TEXT}
                >
                    {suffix}
                </motion.span>
            </motion.span>
        </span>
    );
}