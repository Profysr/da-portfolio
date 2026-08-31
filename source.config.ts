import { defineDocs } from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

export const { docs: writings, meta: writingsMeta } = defineDocs({
  dir: "content/writings",
  docs: {
    schema: pageSchema.extend({
      date: z.string().optional(),
      readTime: z.string().optional(),
      tags: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
    }),
  },
});

export const { docs: projects, meta: projectsMeta } = defineDocs({
  dir: "content/projects",
  docs: {
    schema: pageSchema.extend({
      date: z.string().optional(),
      category: z.string().optional(),
      industry: z.string().optional(),
      access: z.string().optional(),
      strategies: z.array(z.string()).optional(),
      tech: z.array(z.string()).optional(),
      github: z.string().optional(),
      live: z.string().optional(),
      thumbnail: z.string().optional(),
    }),
  },
});
