import { projectSource } from "@/lib/source";
import { notFound } from "next/navigation";
import ProjectContent from "../_components/ProjectContent";
import { mdxCustomComponents } from "@/components/docs/mdx-custom-components";
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import Script from "next/script";
import { websiteDomain } from "@/data/personal";

export async function generateStaticParams() {
  return projectSource.generateParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugParam = Array.isArray(slug) ? slug : [slug];
  const page = projectSource.getPage(slugParam);

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
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: page.data.thumbnail ? [page.data.thumbnail] : [],
    },
  };
}

function parseChangelog(content) {
  if (!content) return [];
  const changelogRegex = /## Changelog\s*\n([\s\S]*?)(?=\n## |\n# |$)/i;
  const match = content.match(changelogRegex);
  if (!match) return [];

  const changelogContent = match[1];
  const versionRegex =
    /###\s+(v[\d.]+)\s*-\s*([\d-]+)\s*\n([\s\S]*?)(?=\n### |\n## |\n# |$)/g;
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
  const slugParam = Array.isArray(slug) ? slug : [slug];
  const slugStr = slugParam.join("/");
  const page = projectSource.getPage(slugParam);

  if (!page) notFound();

  const allProjects = projectSource.getPages();
  const currentCategory = page.data.category;
  const currentTech = new Set(page.data.tech || []);

  const similarProjects = allProjects
    .filter((p) => p.slugs.join("/") !== slugStr)
    .map((p) => {
      let score = 0;
      if (p.data.category === currentCategory) score += 3;
      if (p.data.industry === page.data.industry) score += 2;
      const sharedTech = (p.data.tech || []).filter((t) =>
        currentTech.has(t),
      ).length;
      score += sharedTech;

      return {
        slug: p.slugs.join("/"),
        title: p.data.title,
        description: p.data.description,
        date: p.data.date,
        category: p.data.category,
        industry: page.data.industry,
        access: p.data.access,
        tech: p.data.tech || [],
        thumbnail: p.data.thumbnail,
        score,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.date || 0) - new Date(a.date || 0),
    )
    .slice(0, 6);

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
    slug: slugStr,
  };

  const MDXContent = page.data.body;
  const rawContent = page.data._meta?.source || "";
  const changelog = parseChangelog(rawContent);
  const toc = page.data.toc || [];

  // Generate structured data
  const projectSchema = generateProjectSchema({
    title: page.data.title,
    description: page.data.description,
    category: page.data.category,
    industry: page.data.industry,
    tech: page.data.tech,
    strategies: page.data.strategies,
    github: page.data.github,
    live: page.data.live,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: websiteDomain },
    { name: "Projects", url: `${websiteDomain}/#projects` },
    { name: page.data.title, url: `${websiteDomain}/projects/${slugStr}` },
  ]);

  return (
    <>
      <Script
        id="json-ld-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectContent
        meta={meta}
        changelog={changelog}
        toc={toc}
        similarProjects={similarProjects}
      >
        <MDXContent components={mdxCustomComponents} />
      </ProjectContent>
    </>
  );
}
