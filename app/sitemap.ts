import { websiteDomain } from "@/data/personal";
import { projectSource } from "@/lib/source";
import { writingSource } from "@/lib/source";

export default async function sitemap() {
  const projects = projectSource.getPages();
  const writings = writingSource.getPages();

  const projectUrls = projects.map((page) => {
    const pageData = page.data as { date?: string };
    return {
      url: `${websiteDomain}/projects/${page.url}`,
      lastModified: pageData.date ? new Date(pageData.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const writingUrls = writings.map((page) => {
    const pageData = page.data as { date?: string };
    return {
      url: `${websiteDomain}/writing/${page.url}`,
      lastModified: pageData.date ? new Date(pageData.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const staticUrls = [
    {
      url: websiteDomain,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];

  return [...staticUrls, ...projectUrls, ...writingUrls];
}