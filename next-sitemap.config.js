/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://da-portfolio.dev",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    "/_not-found",
    "/api/*",
    "/writing/[...slug]",
    "/projects/[...slug]",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    additionalSitemaps: [
      "https://da-portfolio.dev/sitemap.xml",
    ],
  },
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date().toISOString(),
  transform: async (config, path) => {
    // Skip API routes and internal pages
    if (path.startsWith("/api/") || path.startsWith("/_next/")) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.lastmod,
    };
  },
};