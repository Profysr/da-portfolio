"use client";

import { useSyncExternalStore } from "react";

function subscribeToBreakpoint(callback, breakpoint = 1024) {
  const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(breakpoint = 1024) {
  return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
}

export function useIsMobile(breakpoint = 1024) {
  return useSyncExternalStore(
    (callback) => subscribeToBreakpoint(callback, breakpoint),
    () => getSnapshot(breakpoint),
    () => false,
  );
}