import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import { writings, writingsMeta } from "@/.source/server";
import { projects, projectsMeta } from "@/.source/server";

export const writingSource = loader({
  baseUrl: "/writing",
  source: toFumadocsSource(writings, writingsMeta),
});

export const projectSource = loader({
  baseUrl: "/projects",
  source: toFumadocsSource(projects, projectsMeta),
});
