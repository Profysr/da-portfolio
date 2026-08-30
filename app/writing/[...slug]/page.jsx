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

export async function generateStaticParams() {
  return writingSource.generateParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugParam = Array.isArray(slug) ? slug : [slug];
  const page = writingSource.getPage(slugParam);

  if (!page) {
    return { title: "Writing Not Found" };
  }

  const slugStr = slugParam.join("/");

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
  const slugParam = Array.isArray(slug) ? slug : [slug];
  const slugStr = slugParam.join("/");
  const page = writingSource.getPage(slugParam);

  if (!page) notFound();
  // Extracting all the sources in the memory and filtering similar posts
  const allPages = writingSource.getPages();
  const currentTags = new Set(page.data.tags || []);
  const similarPosts = allPages
    .filter((p) => p.slugs.join("/") !== slugStr)
    .map((p) => {
      const sharedCount = (p.data.tags || []).filter((t) =>
        currentTags.has(t)
      ).length;
      return {
        slug: p.slugs.join("/"),
        title: p.data.title,
        description: p.data.description,
        date: p.data.date,
        readTime: p.data.readTime,
        tags: p.data.tags || [],
        thumbnail: p.data.thumbnail,
        score: sharedCount,
      };
    })
    .sort((a, b) => b.score - a.score || new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 3);

  const meta = {
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    readTime: page.data.readTime,
    tags: page.data.tags || [],
    thumbnail: page.data.thumbnail,
    slug: slugStr,
  };

  const MDXContent = page.data.body;
  const toc = page.data.toc || [];

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema({
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    thumbnail: page.data.thumbnail,
    tags: page.data.tags,
    slug: slugStr,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: websiteDomain },
    { name: "Writing", url: `${websiteDomain}/#writings` },
    { name: page.data.title, url: `${websiteDomain}/writing/${slugStr}` },
  ]);

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
      <WritingContent
        meta={meta}
        toc={toc}
        similarPosts={similarPosts}
      >
        <MDXContent />
      </WritingContent>
    </>
  );
}
