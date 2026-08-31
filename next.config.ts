import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Bundle optimizations (Phase 23) ─────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "@tabler/icons-react",
      "motion",
      "fumadocs-ui",
      "fumadocs-core",
    ],
  },

  // ── Image domains ────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── Compiler options for modern output ───────────────────────────────────
  compiler: {
    // Remove console.* in production (optional, helps bundle size)
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);