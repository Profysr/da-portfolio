"use client";

import { cn } from "@/lib/utils";
import {
  IconCode,
  IconBriefcase,
  IconStack,
  IconMail,
} from "@tabler/icons-react";

const QUICK_ACTIONS = [
  {
    id: "projects",
    label: "Projects",
    icon: IconCode,
    query: "What projects have you built?",
  },
  {
    id: "experience",
    label: "Experience",
    icon: IconBriefcase,
    query: "Tell me about your work experience",
  },
  {
    id: "stack",
    label: "Tech Stack",
    icon: IconStack,
    query: "What's your tech stack?",
  },
  {
    id: "contact",
    label: "Contact",
    icon: IconMail,
    query: "How can I contact you?",
  },
];

export function QuickActions({ onActionClick, disabled }) {
  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className="flex flex-wrap gap-2 p-2"
    >
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          disabled={disabled}
          onClick={() => onActionClick(action.query)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            "border border-border bg-surface text-muted-foreground",
            "hover:bg-surface-hover hover:text-foreground hover:border-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
        >
          <action.icon className="size-3.5 shrink-0" aria-hidden />
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}