"use client";

import dynamic from "next/dynamic";
import { Skeleton, SkeletonShapes } from "@/components/common/Skeleton";

// 1. Named Exports — Keep .then((m) => ({ default: m.ComponentName }))
export const LazyAIAssistant = dynamic(
  () =>
    import("@/components/chatbot/AIAssistant").then((m) => ({
      default: m.AIAssistant,
    })),
  { ssr: true, loading: () => SkeletonShapes.chatDrawer },
);

export const LazyHorizontalScroll = dynamic(
  () =>
    import("@/components/ui/HorizontalScroll").then((m) => ({
      default: m.ScrollWrapper,
    })),
  { ssr: true, loading: () => <Skeleton className="h-48 w-full bg-muted" /> },
);

export const LazyContentCarousel = dynamic(
  () =>
    import("@/components/common/ContentCarousel").then((m) => ({
      default: m.ContentCarousel,
    })),
  { ssr: true, loading: () => SkeletonShapes.card },
);

export const LazyViewOnMap = dynamic(
  () =>
    import("@/components/common/ViewOnMap").then((m) => ({
      default: m.ViewOnMap,
    })),
  { ssr: true, loading: () => SkeletonShapes.mapModal },
);

export const LazyNumberSlider = dynamic(
  () =>
    import("@/components/common/NumberSlider").then((m) => ({
      default: m.NumberSlider,
    })),
  {
    ssr: true,
    loading: () => <Skeleton className="h-10 w-full bg-muted rounded-lg" />,
  },
);

export const LazyTabs = dynamic(
  () =>
    import("@/components/common/Tabs").then((m) => ({
      default: m.ContinuousTabs,
    })),
  {
    ssr: true,
    loading: () => <Skeleton className="h-10 w-full bg-muted flex gap-2" />,
  },
);

export const LazyTimeline = dynamic(
  () => import("@/components/Timeline").then((m) => ({ default: m.Timeline })),
  { ssr: true, loading: () => <Skeleton className="h-64 w-full bg-muted" /> },
);

// 2. Default Exports — Simplified (No .then required)
export const LazyHeatmap = dynamic(() => import("@/components/Heatmap"), {
  ssr: true,
  loading: () => SkeletonShapes.heatmap,
});

export const LazyProjectCard = dynamic(
  () => import("@/app/(home)/_components/ProjectCard"),
  { ssr: true, loading: () => SkeletonShapes.card },
);
