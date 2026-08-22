import { Spinner } from "@/components/ui/spinner";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <Section className={cn("flex items-center justify-center min-h-[60vh]")}>
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10" />
        {/* <span className="text-sm font-mono text-muted-foreground/70">
          Loading…
        </span> */}
      </div>
    </Section>
  );
}