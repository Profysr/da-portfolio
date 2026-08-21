import { defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";

const writingDocs = defineDocs({
  dir: "content/writings",
});

const projectDocs = defineDocs({
  dir: "content/projects",
});

export const writingSource = loader({
  baseUrl: "/writing",
  source: writingDocs.toFumadocsSource(),
});
export const projectSource = loader({
  baseUrl: "/projects",
  source: projectDocs.toFumadocsSource(),
});
