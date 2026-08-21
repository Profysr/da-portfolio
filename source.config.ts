import { defineCollections } from "fumadocs-mdx/config";
import { z } from "zod";

export const writings = defineCollections({
  type: "doc",
  dir: "content/writings",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    readTime: z.string().optional(),
  }),
});

export const projects = defineCollections({
  type: "doc",
  dir: "content/projects",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    industry: z.string().optional(),
    tech: z.array(z.string()).optional(),
    github: z.string().optional(),
    live: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const changelogs = defineCollections({
  type: "doc",
  dir: "content/changelogs",
  schema: z.object({
    version: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    project: z.string(),
    projectTitle: z.string(),
  }),
});