"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const subscribeToMotionPreference = (callback) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function useGSAP(callback, dependencies = []) {
  const ctxRef = useRef(null);

  useEffect(() => {
    if (typeof callback !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => callback({ gsap, ScrollTrigger }), ctxRef);

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ctxRef;
}

export { gsap, ScrollTrigger };
