import { writingsSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { WritingContent } from "./WritingContent";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return writingsSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = writingsSource.getPage([slug]);

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
      tags: page.data.tags,
      images: page.data.thumbnail ? [page.data.thumbnail] : [],
    },
  };
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = writingsSource.getPage([slug]);

  if (!page) notFound();

  return <WritingContent page={page} />;
}