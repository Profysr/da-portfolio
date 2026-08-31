import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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

  // ── Image domains ────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

const withMDX = createMDX();
export default withBundleAnalyzer(withMDX(nextConfig));