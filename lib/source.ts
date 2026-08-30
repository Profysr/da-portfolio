import { defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";

const writingDocs = defineDocs({
  dir: "content/writings",
  docs: {
    mdxOptions: {
      providerImportSource: "@/mdx-components",
    },
  },
});

const projectDocs = defineDocs({
  dir: "content/projects",
  docs: {
    mdxOptions: {
      providerImportSource: "@/mdx-components",
    },
  },
});

export const writingSource = loader({
  baseUrl: "/writing",
  source: writingDocs.toFumadocsSource(),
});
export const projectSource = loader({
  baseUrl: "/projects",
  source: projectDocs.toFumadocsSource(),
});
