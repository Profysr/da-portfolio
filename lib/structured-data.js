/**
 * Structured Data (JSON-LD) utilities for SEO
 * Generates schema.org markup for Person, WebSite, BlogPosting, etc.
 */

import { personal, socials, websiteDomain } from "@/data/idx";

/**
 * Person schema for the portfolio owner
 */
export function generatePersonSchema() {
  const sameAs = socials
    .filter((s) => s.url && s.url.startsWith("http"))
    .map((s) => s.url);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.tagline,
    description: personal.bio,
    url: typeof window !== "undefined" ? window.location.origin : websiteDomain,
    email: personal.email,
    sameAs,
    knowsAbout: [
      "Software Engineering",
      "Forward Deployed Engineering",
      "System Architecture",
      "Full-Stack Development",
      "AI/ML Engineering",
      "Automation",
      "DevOps",
      "Clinical RPA",
    ],
    worksFor: {
      "@type": "Organization",
      name: "DA Portfolio",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "COMSATS University Islamabad",
    },
  };
}

/**
 * WebSite schema for the portfolio site
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bilal Ahmad — Portfolio",
    url: typeof window !== "undefined" ? window.location.origin : websiteDomain,
    description: "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
    publisher: {
      "@type": "Person",
      name: personal.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${typeof window !== "undefined" ? window.location.origin : websiteDomain}/#projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BlogPosting schema for writing pages
 */
export function generateBlogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.thumbnail,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: personal.name,
      url: typeof window !== "undefined" ? window.location.origin : websiteDomain,
    },
    publisher: {
      "@type": "Person",
      name: personal.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${typeof window !== "undefined" ? window.location.origin : websiteDomain}/writing/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: "Engineering",
  };
}

/**
 * Project schema for project pages
 */
export function generateProjectSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: "Cloud",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      name: personal.name,
    },
    publisher: {
      "@type": "Person",
      name: personal.name,
    },
    url: project.live && project.live !== "#" ? project.live : project.github,
    codeRepository: project.github && project.github !== "#" ? project.github : undefined,
    keywords: project.tech?.join(", "),
    featureList: project.strategies?.join(", "),
  };
}

/**
 * BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
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