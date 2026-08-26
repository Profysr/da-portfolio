"use client";

import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { nav } from "@/data/navigation";
import Image from "next/image";

export default function NotFound() {
  return (
    <Section className="py-20">
      <div className="max-w-md mx-auto text-center">
        <Image
          src="/404 error.svg"
          alt="Page Not Found"
          width={320}
          height={220}
          className="mx-auto mb-6"
        />
        <Heading variant="gradient" as="h1" className="text-2xl mb-3">
          Page Not Found
        </Heading>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          It might have been a typing error or the page was removed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-border/80 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/#projects"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-border bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <IconSearch className="size-4" />
            <span>View Projects</span>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground/60 mb-4">Quick links</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-border bg-surface-high/40 hover:bg-surface-high"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
