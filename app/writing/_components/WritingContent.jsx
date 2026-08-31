"use client";

import { ReadingLayout } from "@/components/layout/ReadingLayout";

export function WritingContent({ meta, toc = [], similarPosts = [], children }) {
  return (
    <ReadingLayout
      type="writing"
      meta={meta}
      toc={toc}
      similarItems={similarPosts}
      currentSlug={meta?.slug}
    >
      {children}
    </ReadingLayout>
  );
}

export default WritingContent;
