"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import {
  IconRefresh,
  IconHome,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { personal } from "@/data/personal";

export default function Error({ error, reset }) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

  const copyDigest = () => {
    if (!errorDigest) return;
    navigator.clipboard.writeText(errorDigest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section className="py-12">
      <div className="max-w-lg mx-auto text-center px-4 flex flex-col justify-center gap-4">
        {/* Illustration Container with subtle glow */}
        <Image
          src="/500 Internal Server Error.svg"
          alt="Server Error Illustration"
          width={320}
          height={220}
          priority
          className="brightness-110 mx-auto"
        />

        <Heading variant="gradient" as="h1" className="text-3xl font-bold">
          Something went Wrong
        </Heading>

        <p className="text-muted-foreground text-center text-sm leading-relaxed">
          We encountered an unexpected error. You can try refreshing the page or
          head back to the home page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReset}
            disabled={isPending}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
            aria-label="Try again"
          >
            <IconRefresh
              className={`size-4 ${isPending ? "animate-spin" : ""}`}
            />
            <span>{isPending ? "Retrying..." : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded text-sm font-medium transition-all duration-200 border border-border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <IconHome className="size-4" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Footer Support Info */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            If this issue persists, please{" "}
            <a
              href={`mailto:${personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="text-primary hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>

          {errorDigest && (
            <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-md bg-muted/50 border border-border/40">
              <span className="font-mono text-[11px] text-muted-foreground">
                ID: {errorDigest}
              </span>
              <button
                onClick={copyDigest}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                title="Copy Error ID"
              >
                {copied ? (
                  <IconCheck className="size-3 text-emerald-500" />
                ) : (
                  <IconCopy className="size-3" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
