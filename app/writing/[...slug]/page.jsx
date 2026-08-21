import { writingSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { WritingContent } from "../_components/WritingContent";

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
  };
}

export default async function WritingPage({ params }) {
  const { slug } = await params;
  const page = writingSource.getPage([slug]);

  if (!page) notFound();

  // Extract page meta for client header, keeping MDX component server-side ready
  const meta = {
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    readTime: page.data.readTime,
    tags: page.data.tags || [],
    thumbnail: page.data.thumbnail,
  };

  // MDX body is a React component created by Fumadocs
  const MDXContent = page.data.body;

  return (
    <WritingContent meta={meta}>
      <MDXContent />
    </WritingContent>
  );
}
