import { Badge } from "@/components/ui/badge";
import { GradientHeading } from "@/components/ui/Heading";
import { getProjectBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconCalendar } from "@tabler/icons-react";
import { Section } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Streamdown } from "streamdown";

export default function ProjectChangelog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProjectBySlug(slug)
      .then((p) => {
        if (!cancelled) {
          if (p) setProject(p);
          else setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Direct reference to the array provided by your data source
  const entries = project?.changelog ?? [];

  if (error) {
    return (
      <Section className="py-24">
        <div className="max-w-md mx-auto text-center border border-border/60 bg-surface-high/30 p-8 rounded-2xl backdrop-blur-sm">
          <GradientHeading as="h1" className="text-2xl mb-2">
            Project Not Found
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            The project &ldquo;{slug}&rdquo; doesn&apos;t exist or has no
            changelog available.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <IconArrowLeft className="size-4" />
            Go Back
          </button>
        </div>
      </Section>
    );
  }

  if (!project) {
    return (
      <Section className="py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-6 w-28 rounded-lg bg-surface-high/50 animate-pulse" />
          <div className="h-10 w-1/2 rounded-xl bg-surface-high/50 animate-pulse" />
          <div className="space-y-4 pt-6">
            <div className="h-32 w-full rounded-2xl bg-surface-high/30 animate-pulse" />
            <div className="h-32 w-full rounded-2xl bg-surface-high/30 animate-pulse" />
          </div>
        </div>
      </Section>
    );
  }

  if (!entries.length) {
    return (
      <Section className="py-24">
        <div className="max-w-md mx-auto text-center border border-border/60 bg-surface-high/30 p-8 rounded-2xl backdrop-blur-sm">
          <GradientHeading as="h1" className="text-2xl mb-2">
            No Updates Yet
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            <span className="text-foreground font-medium">{project.title}</span>{" "}
            doesn&apos;t have a published changelog.
          </p>
          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-surface-high text-foreground hover:text-white transition-colors"
          >
            <IconArrowLeft className="size-4" />
            Back to Project
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-8 md:py-16" noFade>
      <div className="max-w-3xl mx-auto px-4">
        {/* Timeline loop works out of the box */}
        <div className="relative pl-6 sm:pl-8 border-l border-border/80 space-y-10">
          {entries.map((entry, index) => {
            const isLatest = index === 0;

            return (
              <div key={entry.version} className="relative group">
                {/* Timeline dot */}
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

                {/* Entry Card */}
                <div className="p-5 sm:p-6 rounded-2xl border border-border/60 bg-surface-high/30 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-mono font-bold text-foreground">
                        v{entry.version}
                      </span>
                      {isLatest && (
                        <Badge
                          variant="light"
                          className="text-[10px] px-2 py-0.5"
                        >
                          Latest Release
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                      <IconCalendar className="size-3.5 opacity-70" />
                      <time>{entry.date}</time>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm">
                    <Streamdown>{entry.body}</Streamdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
