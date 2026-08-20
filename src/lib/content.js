import { projects, writings } from "@/data/idx";

/* ------------------------------------------------------------------ */
/*  Lazy markdown loaders                                              */
/*                                                                     */
/*  `import.meta.glob` without `eager: true` returns a map of        */
/*  lazy-loaders: { path: () => Promise<string> }. Each .md file       */
/*  becomes its own JS chunk, fetched only when the loader is called.  */
/*  Initial bundle stays small; detail-page content loads on demand.   */
/* ------------------------------------------------------------------ */

const projectContentLoaders = import.meta.glob("../data/projects/**/*.md", {
  query: "?raw",
  import: "default",
});

const writingContentLoaders = import.meta.glob("../data/writings/*.md", {
  query: "?raw",
  import: "default",
});

async function loadContent(loaders, path) {
  if (!path) return undefined;
  const loader = loaders[path];
  return loader ? await loader() : undefined;
}

/* ------------------------------------------------------------------ */
/*  Lookups                                                            */
/*                                                                     */
/*  Each helper returns the manifest entry merged with its rendered   */
/*  markdown content (and changelog, if present). Unknown slugs       */
/*  return undefined so callers can render a 404.                     */
/*                                                                     */
/*  These are async because they trigger the dynamic chunk fetch.     */
/* ------------------------------------------------------------------ */

export async function getProjectBySlug(slug) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return undefined;
  const [content, changelog] = await Promise.all([
    loadContent(projectContentLoaders, project.contentPath),
    loadContent(projectContentLoaders, project.changelogPath),
  ]);
  return {
    ...project,
    content: content ?? "",
    changelog,
  };
}

export async function getWritingBySlug(slug) {
  const writing = writings.find((w) => w.slug === slug);
  if (!writing) return undefined;
  const content = await loadContent(writingContentLoaders, writing.contentPath);
  return {
    ...writing,
    content: content ?? "",
  };
}
