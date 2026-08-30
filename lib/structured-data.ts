import { personal, socials, websiteDomain } from "@/data/personal";
import { experiences } from "@/data/experience";
import { absoluteUrl } from "@/lib/seo";

interface BlogPostingInput {
  title: string;
  description: string;
  thumbnail?: string;
  date: string;
  modifiedDate?: string;
  tags?: string[];
  slug: string;
}

interface ProjectSchemaInput {
  title: string;
  description: string;
  category?: string;
  thumbnail?: string;
  live?: string;
  github?: string;
  tech?: string[];
  strategies?: string[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * JSON-LD generators — typed, server-only, entity-grounded.
 *
 * Key fixes from legacy .js:
 * - Dead `typeof window !== "undefined"` ternaries removed (server-only SSG)
 * - WebSite SearchAction removed (no search endpoint; Google deprecated)
 * - Person: @id anchor, worksFor from current role, image, alternateName
 * - Cross-refs: articles/projects author/publisher use Person @id
 * - BlogPosting stays (valid Article subtype per Google)
 * - ProfilePage added for home (LLMO entity grounding)
 */

const PERSON_ID = `${websiteDomain}/#person`;
const WEBSITE_ID = `${websiteDomain}/#website`;

const sameAs = socials
  .filter((s) => s.url && s.url.startsWith("http"))
  .map((s) => s.url);

const currentExp = experiences.find((e) => e.isCurrent);
const currentRole = currentExp?.roles.find((r) => !r.endDate);

/**
 * Person schema — the entity anchor for LLMO.
 * @id provides stable cross-document identity; worksFor/jobTitle stay current via experience data.
 * alumniOf includes both institutions from botKnowledge corpus for citation consistency.
 */
export function generatePersonSchema() {
  const alumniOf = [
    {
      "@type": "EducationalOrganization",
      name: "COMSATS University Islamabad",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Massachusetts, Lowell",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: personal.name,
    alternateName: personal.githubUsername, // LLMO: stable handle across citations
    jobTitle: currentRole?.title ?? personal.tagline, // dynamic from current role
    description: personal.bio,
    url: websiteDomain,
    image: absoluteUrl(personal.avatar), // absolute for crawler consumption
    email: personal.email,
    sameAs, // verified social profiles only
    knowsAbout: [
      "Software Engineering",
      "Forward Deployed Engineering",
      "System Architecture",
      "Full-Stack Development",
      "AI/ML Engineering",
      "Automation",
      "HealthTech Developer",
    ],
    worksFor: currentExp
      ? {
          "@type": "Organization",
          name: currentExp.company,
          url: currentExp.url,
        }
      : undefined,
    alumniOf,
  };
}

/**
 * WebSite schema — site-level entity with publisher cross-ref to Person.
 * SearchAction removed (no search endpoint; Google deprecated sitelinks search box 2024).
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Bilal Ahmad — Portfolio",
    url: websiteDomain,
    description:
      "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
    publisher: { "@id": PERSON_ID }, // entity link for LLMO knowledge graph
    inLanguage: "en-US",
  };
}

/**
 * ProfilePage — root entity page schema for LLMO grounding (home only).
 * Google documents ProfilePage for "About Me" pages; mainEntity @id links to Person.
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${personal.name} — ${personal.tagline}`,
    url: websiteDomain,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en-US",
  };
}

/**
 * BlogPosting schema for writing pages — valid Article subtype per Google.
 * author/publisher use Person @id for entity cross-referencing (GEO/LLMO).
 * dateModified separate from datePublished for AEO freshness signals.
 */
export function generateBlogPostingSchema(post: BlogPostingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? absoluteUrl(post.thumbnail) : undefined,
    datePublished: post.date,
    dateModified: post.modifiedDate ?? post.date,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: personal.name,
      url: websiteDomain,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: personal.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/writing/${post.slug}`),
    },
    keywords: post.tags?.join(", "),
    articleSection: "Engineering",
  };
}

/**
 * SoftwareApplication schema for project pages.
 * author/publisher @id cross-refs; image from thumbnail for rich results.
 * codeRepository + url for Google Software App features.
 */
export function generateProjectSchema(project: ProjectSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: "Cloud",
    image: project.thumbnail ? absoluteUrl(project.thumbnail) : undefined,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: personal.name,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: personal.name,
    },
    url: project.live && project.live !== "#" ? project.live : project.github,
    codeRepository: project.github && project.github !== "#" ? project.github : undefined,
    keywords: project.tech?.join(", "),
    featureList: project.strategies?.join(", "),
  };
}

/**
 * BreadcrumbList schema — required for SEO site structure.
 * Items must have absolute URLs (callers already provide them).
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}