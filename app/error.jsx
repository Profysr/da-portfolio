"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { IconRefresh, IconHome } from "@tabler/icons-react";
import { personal } from "@/data/personal";

export default function Error({ error, reset }) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Log error to an error reporting service (e.g., Sentry)
    console.error("[Global Error Boundary]", error);
  }, [error]);

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };

  const errorMessage = error?.message || "An unexpected error occurred.";
  const errorDigest = error?.digest;

  const mailtoSubject = encodeURIComponent("Error Report");
  const mailtoBody = encodeURIComponent(
    `Error: ${errorMessage}${errorDigest ? `\nDigest ID: ${errorDigest}` : ""}`,
  );

  return (
    <Section className="py-20">
      <div className="max-w-md mx-auto text-center">
        <Image
          src="/500 Internal Server Error.svg"
          alt="Server Error Illustration"
          width={320}
          height={240}
          priority
          className="mx-auto mb-6 h-auto"
        />
        <Heading variant="gradient" as="h1" className="text-2xl mb-3">
          Something went wrong
        </Heading>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          We encountered an unexpected error. The development team has been
          notified. Please try refreshing the page or navigate back to the
          homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReset}
            disabled={isPending}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-border/80 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
            aria-label="Try again"
          >
            <IconRefresh
              className={`size-4 ${isPending ? "animate-spin" : ""}`}
            />
            <span>{isPending ? "Retrying..." : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-border bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <IconHome className="size-4" />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground/60 mb-3">
            If this keeps happening, please{" "}
            <a
              href={`mailto:${personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
            {errorDigest && (
              <>
                <br />
                <span className="font-mono text-[10px] text-muted-foreground/50">
                  Error ID: {errorDigest}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}
