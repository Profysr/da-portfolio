import type { Metadata } from "next";
import { socials, websiteDomain } from "@/data/personal";

/**
 * Metadata factory — single source of truth for all route metadata.
 *
 * Why this exists: Next.js does a FULL REPLACE of `openGraph`/`twitter` from
 * child segments (no deep merge with layout). Every page must therefore emit
 * complete OG + Twitter objects. This factory guarantees that.
 *
 * Ref: Context7 /vercel/next.js metadata-resolution internals.
 */

const SITE_NAME = "Bilal Ahmad";

/** Default share card. User-supplied banner lands at public/og-image.png (1200×630). */
const DEFAULT_OG_IMAGE = "/og-image.png";

const twitterCreator =
  socials.find((s) => s.platform === "x")?.handle ?? "@_BilalAhme";

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type OgImageInput = string | OgImage;

export interface CreateMetadataOptions {
  /** Page title (layout title template still applies: "%s | Bilal Ahmad") */
  title: string;
  /** Unique per-page description — required so no duplicate descriptions ship */
  description: string;
  /** Root-relative canonical path, e.g. "/projects/my-app" or "/" */
  path: string;
  /** "article" enables publishedTime/authors/tags OG fields */
  type?: "website" | "article";
  /** ISO date — article pages only */
  publishedTime?: string;
  /** ISO date — article pages only; defaults to publishedTime */
  modifiedTime?: string;
  /** Article tags/keywords */
  tags?: string[];
  /**
   * OG/Twitter images, first = primary. The default site banner is emitted
   * with known 1200×630 dimensions; thumbnails pass as strings (no dims).
   */
  images?: OgImageInput[];
  /** true → robots noindex/nofollow (utility pages) */
  noIndex?: boolean;
}

/**
 * Normalizes image inputs to consistent OgImage objects.
 * Default banner gets explicit 1200×630 dims (crawlers prefer known dims).
 * Thumbnails pass through without dims (unknown size).
 */
function normalizeImages(images: OgImageInput[] | undefined, alt: string): OgImage[] {
  return (images?.length ? images : [DEFAULT_OG_IMAGE]).map((img) => {
    if (typeof img !== "string") return { alt, ...img };
    return img === DEFAULT_OG_IMAGE
      ? { url: img, width: 1200, height: 630, alt }
      : { url: img, alt };
  });
}

/**
 * Creates complete Metadata object for a route.
 * Emits FULL openGraph + twitter objects (no partial merges — Next.js replaces).
 * Includes canonical URL, article OG fields, and image fallback chain.
 */
export function createMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  images,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const resolvedImages = normalizeImages(images, title);
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "");

  const articleFields =
    type === "article"
      ? {
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
          authors: [SITE_NAME],
          ...(tags?.length ? { tags } : {}),
        }
      : {};

  return {
    title,
    description,
    ...(tags?.length ? { keywords: tags } : {}),
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      images: resolvedImages,
      ...articleFields,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages,
      creator: twitterCreator,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Absolute URL helper for schema/OG contexts that require full URLs.
 * Used by structured-data generators and any consumer needing absolute URLs.
 */
export function absoluteUrl(path: string): string {
  return path.startsWith("http")
    ? path
    : `${websiteDomain}${path.startsWith("/") ? path : `/${path}`}`;
}
