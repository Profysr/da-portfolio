import { websiteDomain } from "@/data/personal";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/private/"],
    },
    sitemap: `${websiteDomain}/sitemap.xml`,
    host: websiteDomain,
  };
}