import { projectsSource, changelogsSource } from "@/lib/source";
import { mdxComponents } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/TechPill";
import { ExtendedLink } from "@/components/ExtendedLink";
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconCalendar,
  IconCheck,
  IconRocket,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const actionBtnClass = cn(
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
  "border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5",
);

export async function generateStaticParams() {
  return projectsSource.generateParams();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = projectsSource.getPage([resolvedParams.slug]);
  if (!page) return { title: "Project Not Found" };

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "website",
    },
  };
}

function sortVersionsDesc(a, b) {
  // Sort by semantic version descending (newest first)
  const parseVersion = (v) => (v ? v.split(".").map(Number) : []);
  const aParts = parseVersion(a.data.version);
  const bParts = parseVersion(b.data.version);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;
    if (aVal !== bVal) return bVal - aVal;
  }
  return 0;
}

function ProjectContent({ projectPage, changelogEntries }) {
  const project = projectPage.data;
  const ProjectMDX = projectPage.data.body;

  // Sort changelog entries by version (newest first)
  const sortedEntries = [...changelogEntries].sort(sortVersionsDesc);

  return (
    <Section className="py-8 md:py-16" noFade>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ExtendedLink
          href="/#projects"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <IconArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </ExtendedLink>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-xs px-2.5 py-0.5 rounded-md font-medium"
            >
              {project.category}
            </Badge>
            {project.industry && (
              <Badge
                variant="secondary"
                className="text-xs px-2.5 py-0.5 rounded-md font-medium"
              >
                {project.industry}
              </Badge>
            )}
            {project.access && (
              <Badge
                variant="destructive"
                className="text-xs px-2.5 py-0.5 rounded-md font-medium"
              >
                {project.access}
              </Badge>
            )}
          </div>

          <GradientHeading
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {project.title}
          </GradientHeading>

          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.live && project.live !== "#" && (
              <ExtendedLink
                href={project.live}
                className={actionBtnClass}
                newTab
              >
                <IconRocket className="size-4 text-primary" />
                Live Product
                <IconExternalLink className="size-3.5 opacity-60" />
              </ExtendedLink>
            )}
            {project.github && project.github !== "#" && (
              <ExtendedLink
                href={project.github}
                className={actionBtnClass}
                newTab
              >
                <IconBrandGithub className="size-4" />
                Source Code
              </ExtendedLink>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <main className="lg:col-span-8">
            <article className="prose prose-invert prose-slate max-w-none">
              <ProjectMDX components={mdxComponents} />
            </article>
          </main>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            {project.tech?.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/60 bg-surface-high/20 backdrop-blur-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Tech Stack &amp; Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechPill key={t} name={t} size="sm" className="" />
                  ))}
                </div>
              </div>
            )}

            {project.strategies?.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/60 bg-surface-high/20 backdrop-blur-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {project.strategies.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                    >
                      <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                        <IconCheck className="size-3.5" />
                      </div>
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {sortedEntries.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">Project Changelog</h2>
            <div className="relative pl-6 sm:pl-8 border-l border-border/80 space-y-10">
              {sortedEntries.map((entry, index) => {
                const isLatest = index === 0;
                const EntryMDX = entry.data.body;
                return (
                  <div key={entry.data.version} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 size-4 rounded-full border-2 flex items-center justify-center">
                      <div
                        className={cn(
                          "size-1.5 rounded-full",
                          isLatest
                            ? "bg-primary animate-pulse"
                            : "bg-muted-foreground/40",
                        )}
                      />
                    </div>
                    <div className="p-5 sm:p-6 rounded-2xl border border-border/60 bg-surface-high/30 backdrop-blur-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-border/50 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-mono font-bold text-foreground">
                            v{entry.data.version}
                          </span>
                          {isLatest && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-2 py-0.5"
                            >
                              Latest Release
                            </Badge>
                          )}
                          {entry.data.tags?.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              {entry.data.tags.map((tag, i) => (
                                <Badge
                                  key={i}
                                  variant="ghost"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                          <IconCalendar className="size-3.5 opacity-70" />
                          <time>{entry.data.date}</time>
                        </div>
                      </div>
                      <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm">
                        <EntryMDX components={mdxComponents} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Section>
  );
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const projectPage = projectsSource.getPage([resolvedParams.slug]);

  if (!projectPage) notFound();

  // Fetch all changelog entries for this project
  const allChangelogEntries = changelogsSource
    .getPages()
    .filter((entry) => entry.data.project === resolvedParams.slug);

  return (
    <ProjectContent
      projectPage={projectPage}
      changelogEntries={allChangelogEntries}
    />
  );
}
