"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconCalendar, IconClock, IconSparkles } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/common/TechPill";
import { cn } from "@/lib/utils";

export function SimilarContent({
  items = [],
  type = "writing",
  currentSlug = "",
}) {
  if (!items || items.length === 0) return null;

  const isProject = type === "project" || type === "projects";
  const sectionTitle = isProject ? "Related Projects" : "Related Writing";
  const sectionSubtitle = isProject
    ? "Explore other systems, tools, and architectures."
    : "More articles, guides, and engineering notes.";

  return (
    <section className="mt-16 pt-10 border-t border-border/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconSparkles className="size-4 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground m-0">
              {sectionTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground m-0">
            {sectionSubtitle}
          </p>
        </div>

        <Link
          href={isProject ? "/#projects" : "/#writings"}
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
        >
          <span>View all</span>
          <IconArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => {
          const href = isProject
            ? `/projects/${item.slug}`
            : `/writing/${item.slug}`;

          const formattedDate = item.date
            ? new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null;

          return (
            <Link
              key={item.slug}
              href={href}
              className="group flex flex-col justify-between rounded-xl border border-border/80 bg-surface/50 hover:bg-surface-hover/70 hover:border-primary/40 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 no-underline"
            >
              <div>
                {/* Thumbnail / Header if available */}
                {item.thumbnail && (
                  <div className="relative aspect-[16/9] w-full mb-3.5 rounded-lg overflow-hidden bg-surface-muted border border-border/50 flex items-center justify-center">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Badges / Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  {isProject ? (
                    <>
                      {item.category && (
                        <Badge variant="outline" className="text-[10px] uppercase font-mono px-2 py-0.5">
                          {item.category}
                        </Badge>
                      )}
                      {item.access && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                          {item.access}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <>
                      {item.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Footer Meta */}
              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground mt-auto">
                <div className="flex items-center gap-2">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1">
                      <IconCalendar className="size-3" />
                      {formattedDate}
                    </span>
                  )}
                  {item.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <IconClock className="size-3" />
                      {item.readTime}
                    </span>
                  )}
                </div>

                <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read <IconArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
