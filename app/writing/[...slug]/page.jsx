import { writingSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { WritingContent } from "../_components/WritingContent";
import { generateBlogPostingSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import Script from "next/script";
import { websiteDomain } from "@/data/personal";

export async function generateStaticParams() {
  return writingSource.generateParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = writingSource.getPage([slug]);

  if (!page) {
    return { title: "Writing Not Found" };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      publishedTime: page.data.date,
      tags: page.data.tags || [],
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

export default async function WritingPage({ params }) {
  const { slug } = await params;
  const page = writingSource.getPage([slug]);

  if (!page) notFound();

  const meta = {
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    readTime: page.data.readTime,
    tags: page.data.tags || [],
    thumbnail: page.data.thumbnail,
    slug,
  };

  const MDXContent = page.data.body;

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema({
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    thumbnail: page.data.thumbnail,
    tags: page.data.tags,
    slug,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: websiteDomain },
    { name: "Writing", url: `${websiteDomain}/#activity-writings` },
    { name: page.data.title, url: `${websiteDomain}/writing/${slug}` },
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
      <WritingContent meta={meta}>
        <MDXContent />
      </WritingContent>
    </>
  );
}
