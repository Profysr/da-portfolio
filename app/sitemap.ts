import { projectSource } from "@/lib/source";
import { writingSource } from "@/lib/source";

const BASE_URL = "https://da-portfolio.dev";

export default async function sitemap() {
  const projects = projectSource.getPages();
  const writings = writingSource.getPages();

  const projectUrls = projects.map((page) => {
    const pageData = page.data as { date?: string };
    return {
      url: `${BASE_URL}/projects/${page.url}`,
      lastModified: pageData.date ? new Date(pageData.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const writingUrls = writings.map((page) => {
    const pageData = page.data as { date?: string };
    return {
      url: `${BASE_URL}/writing/${page.url}`,
      lastModified: pageData.date ? new Date(pageData.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];

  return [...staticUrls, ...projectUrls, ...writingUrls];
}