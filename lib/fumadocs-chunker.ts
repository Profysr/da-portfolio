import { writingSource, projectSource } from "@/lib/source";

export interface DocChunk {
  vectorText: string;
  metadata: {
    url: string;
    title: string;
    heading: string;
    text: string;
    category: "writing" | "project";
  };
}

// Helper to convert heading text to URL-friendly anchor slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function getFumadocsChunks(): Promise<DocChunk[]> {
  const collections = [
    { source: writingSource, category: "writing" as const },
    { source: projectSource, category: "project" as const },
  ];

  const chunks: DocChunk[] = [];

  for (const { source, category } of collections) {
    const pages = source.getPages();

    for (const page of pages) {
      const title = page.data.title;
      const baseUrl = page.url;
      const structured = page.data.structuredData;

      if (structured?.contents) {
        for (const item of structured.contents) {
          if (!item.content || item.content.trim().length < 20) continue;

          const heading = item.heading || "Overview";
          const slug = item.heading ? slugify(item.heading) : "";
          const sectionUrl = slug ? `${baseUrl}#${slug}` : baseUrl;

          const vectorText = `Type: ${category}\nPage: ${title}\nSection: ${heading}\n\nContent:\n${item.content}`;

          chunks.push({
            vectorText,
            metadata: {
              url: sectionUrl,
              title,
              heading,
              text: item.content,
              category,
            },
          });
        }
      }
    }
  }

  return chunks;
}
