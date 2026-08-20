/**
 * Route registry — single source of truth for all detail-page URLs.
 *
 * Each entry defines:
 *   pattern  – URL pattern (matched against pathname)
 *   section  – top-level section label (Projects / Writing)
 *   baseHref – where the "breadcrumb home" link goes
 *   getTitle – async function that resolves the title from params
 *
 * Add new sections here and the rest follows for free.
 */
export const ROUTES = [
  {
    pattern: "projects/:slug",
    section: "Projects",
    baseHref: "/",
    getTitle: async (params) => {
      const { getProjectBySlug } = await import("@/lib/content");
      const project = await getProjectBySlug(params.slug);
      return project?.title ?? params.slug;
    },
  },
  {
    pattern: "writing/:slug",
    section: "Writing",
    baseHref: "/",
    getTitle: async (params) => {
      const { getWritingBySlug } = await import("@/lib/content");
      const writing = await getWritingBySlug(params.slug);
      return writing?.title ?? params.slug;
    },
  },
];

/** Find a route config matching the given pathname, or null. */
export function matchRoute(pathname) {
  return ROUTES.find(({ pattern }) => {
    const regex = new RegExp(`^${pattern.replace(/:[\w]+/g, "([^/]+)")}$`);
    return regex.test(pathname);
  }) ?? null;
}

/** Extract the params map from pathname + pattern. */
export function extractParams(pattern, pathname) {
  const regex = new RegExp(`^${pattern.replace(/:[\w]+/g, "([^/]+)")}$`);
  const match = pathname.match(regex);
  if (!match) return {};
  const paramNames = [...pattern.matchAll(/:(\w+)/g)].map((m) => m[1]);
  const params = {};
  paramNames.forEach((name, i) => {
    params[name] = match[i + 1];
  });
  return params;
}