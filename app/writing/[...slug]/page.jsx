import { writingSource } from "@/lib/source";
import { notFound } from "next/navigation";
import WritingContent from "../_components/WritingContent";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";
import Script from "next/script";
import { websiteDomain } from "@/data/personal";
import { getMDXComponents } from "@/mdx-components";

// --- Helper Functions & Modular Logic ---

function resolveSlug(paramsSlug) {
  const slugParam = Array.isArray(paramsSlug) ? paramsSlug : [paramsSlug];
  return {
    slugParam,
    slugStr: slugParam.join("/"),
  };
}

/**
 * Finds similar posts efficiently without sorting/filtering the entire dataset if exact/strong matches exist.
 */
function getSimilarPosts(
  allPages,
  currentSlugStr,
  currentTagsArray = [],
  limit = 3,
) {
  const currentTags = new Set(currentTagsArray);
  const candidates = [];

  for (const p of allPages) {
    const pageSlugStr = p.slugs.join("/");
    if (pageSlugStr === currentSlugStr) continue;

    const tags = p.data.tags || [];
    let sharedCount = 0;
    for (const tag of tags) {
      if (currentTags.has(tag)) sharedCount++;
    }

    if (sharedCount > 0) {
      candidates.push({
        slug: pageSlugStr,
        title: p.data.title,
        description: p.data.description,
        date: p.data.date,
        readTime: p.data.readTime,
        tags,
        thumbnail: p.data.thumbnail,
        score: sharedCount,
      });
    }
  }

  // If we have tag matches, return them sorted
  if (candidates.length > 0) {
    return candidates
      .sort(
        (a, b) =>
          b.score - a.score || new Date(b.date || 0) - new Date(a.date || 0),
      )
      .slice(0, limit);
  }

  // Fallback: show most recent posts
  return allPages
    .filter((p) => p.slugs.join("/") !== currentSlugStr)
    .map((p) => ({
      slug: p.slugs.join("/"),
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      readTime: p.data.readTime,
      tags: p.data.tags || [],
      thumbnail: p.data.thumbnail,
      score: 0,
    }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, limit);
}

function generateSchemas(pageData, slugStr) {
  const blogPostingSchema = generateBlogPostingSchema({
    title: pageData.title,
    description: pageData.description,
    date: pageData.date,
    thumbnail: pageData.thumbnail,
    tags: pageData.tags,
    slug: slugStr,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: websiteDomain },
    { name: "Writing", url: `${websiteDomain}/#writings` },
    { name: pageData.title, url: `${websiteDomain}/writing/${slugStr}` },
  ]);

  return { blogPostingSchema, breadcrumbSchema };
}

// --- Next.js Route Exports ---
export async function generateStaticParams() {
  return writingSource.generateParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { slugParam, slugStr } = resolveSlug(slug);
  const page = writingSource.getPage(slugParam);

  if (!page) {
    return { title: "Writing Not Found" };
  }

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    path: `/writing/${slugStr}`,
    type: "article",
    publishedTime: page.data.date,
    tags: page.data.tags || [],
    images: page.data.thumbnail ? [page.data.thumbnail] : undefined,
  });
}

export default async function WritingPage({ params }) {
  const { slug } = await params;
  const { slugParam, slugStr } = resolveSlug(slug);
  const page = writingSource.getPage(slugParam);

  if (!page) notFound();

  const allPages = writingSource.getPages();
  const similarPosts = getSimilarPosts(
    allPages,
    slugStr,
    page.data.tags || [],
    4,
  );

  const meta = {
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    readTime: page.data.readTime,
    tags: page.data.tags || [],
    thumbnail: page.data.thumbnail,
    slug: slugStr,
  };

  const { blogPostingSchema, breadcrumbSchema } = generateSchemas(
    page.data,
    slugStr,
  );
  const MDXContent = page.data.body;
  const toc = page.data.toc || [];

  return (
    <>
      <Script
        id="json-ld-blog-posting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WritingContent meta={meta} toc={toc} similarPosts={similarPosts}>
        <MDXContent components={getMDXComponents()} />
      </WritingContent>
    </>
  );
}
