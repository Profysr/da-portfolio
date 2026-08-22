import { projectSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { ProjectContent } from "../_components/ProjectContent";

export async function generateStaticParams() {
  return projectSource.generateParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = projectSource.getPage(slug);

  if (!page) {
    return { title: "Project Not Found" };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      publishedTime: page.data.date,
      tags: page.data.category ? [page.data.category] : [],
      images: page.data.thumbnail ? [page.data.thumbnail] : [],
    },
  };
}

function parseChangelog(content) {
  const changelogRegex = /## Changelog\s*\n([\s\S]*?)(?=\n## |\n# |$)/i;
  const match = content.match(changelogRegex);
  if (!match) return [];

  const changelogContent = match[1];
  const versionRegex = /###\s+(v[\d.]+)\s*-\s*([\d-]+)\s*\n([\s\S]*?)(?=\n### |\n## |\n# |$)/g;
  const entries = [];

  let versionMatch;
  while ((versionMatch = versionRegex.exec(changelogContent)) !== null) {
    const version = versionMatch[1].trim();
    const date = versionMatch[2].trim();
    const itemsText = versionMatch[3].trim();
    const items = itemsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-") || line.startsWith("*"))
      .map((line) => line.substring(1).trim())
      .filter(Boolean);

    entries.push({ version, date, items });
  }

  return entries;
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const page = projectSource.getPage(slug);

  if (!page) notFound();

  const meta = {
    title: page.data.title,
    description: page.data.description ?? "",
    date: page.data.date,
    category: page.data.category,
    industry: page.data.industry,
    access: page.data.access,
    strategies: page.data.strategies || [],
    tech: page.data.tech || [],
    github: page.data.github,
    live: page.data.live,
    thumbnail: page.data.thumbnail,
  };

  const MDXContent = page.data.body;
  const rawContent = page.data._meta?.source || "";
  const changelog = parseChangelog(rawContent);

  return (
    <ProjectContent meta={meta} changelog={changelog}>
      <MDXContent />
    </ProjectContent>
  );
}