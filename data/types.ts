export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  industry: string | null;
  access: "Open Source" | "Private" | "Hosted" | null;
  status: "live" | "in-progress";
  features: string[];
  strategies: string[];
  github: string | null;
  live: string | null;
  image: string | null;
  thumbnail: string | null;
  featured: boolean;
  isActivity: boolean;
  /** External link URL (for non-detail-page projects) */
  link: string | null;
  /** Whether the project links externally instead of to /projects/{slug} */
  isExternal: boolean;
  /** Single tag string used by older Activity components */
  tag: string | null;
  /** Optional terminal snippet shown as media fallback */
  terminalSnippet: string | null;
  /** Optional architecture diagram for detail pages */
  archDiagram: {
    label: string;
    nodes: string[];
  } | null;
}

export interface Writing {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string | null;
  thumbnail: string | null;
  category: string;
}

export interface ContributionStat {
  label: string;
  value: number;
  suffix: string;
  icon: null;
  badge: string;
  spanClass: string;
}

export interface Contributions {
  heading: string;
  subheading: string;
  githubUsername: string;
  heatmapWeeks: number;
  stats: ContributionStat[];
}
