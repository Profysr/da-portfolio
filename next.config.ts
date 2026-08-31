import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Bundle optimizations (Phase 23) ─────────────────────────────────────
  // Tree-shake icon/component libraries at the package level so only the imported symbols end up in the bundle (instead of the full library).
  experimental: {
    optimizePackageImports: [
      "@tabler/icons-react",
      "motion",
      "fumadocs-ui",
      "fumadocs-core",
    ],
  },

  // ── Modern JS target (Phase 24) ──────────────────────────────────────────
  // Avoid transpiling for legacy browsers — saves ~13 KiB and reduces parse/compile time.
  // Targets ES2017 (supported by all modern browsers since 2018).
  transpilePackages: [],

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