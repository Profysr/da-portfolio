// lib/source.ts
import { writings, projects, changelogs } from "@/.source";
import { loader } from "fumadocs-core/source";

// Create loaders for each collection you defined
export const writingsSource = loader({
  baseUrl: "/writings",
  source: writings.toFumadocsSource(),
});

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projects.toFumadocsSource(),
});

export const changelogsSource = loader({
  baseUrl: "/changelogs",
  source: changelogs.toFumadocsSource(),
});
