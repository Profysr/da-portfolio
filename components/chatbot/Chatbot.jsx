"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { IconSparkles, IconArrowUp, IconLoader2 } from "@tabler/icons-react";
import { Message, WelcomeMessage } from "./Message";
import { QuickActions } from "./QuickActions";
import { cn } from "@/lib/utils";

// ============================================================================
// DATA & UTILITIES
// ============================================================================

const RESPONSES = {
  projects: `I've built 8 projects spanning open source, healthcare automation, and developer tooling:

▸ **Data Pipeline Toolkit** — Open Source ETL CLI with AST-driven job inference, async worker pools, multi-tenant schema isolation (Python, Docker, ClickHouse)

▸ **RPA Clinical Automation Suite** — Private NHS integration with SystmOne, EMIS, Docman; OCR extraction, queue-based retries, HIPAA/GDPR compliant (Power Automate, Python, AutoHotkey)

▸ **Agency Portfolio Platform** — WebGL globe (cobe), deterministic contribution heatmap, edge-cached static export <100ms TTFB (React, Motion, Tailwind)

▸ **Da Profiler** (in progress) — Python REST API profiler & N+1 query workbench with CLI + JSON reporting

▸ **JCN Engine** (in progress) — Multi-tenant SaaS project management with RBAC, team workspaces, subscription scaffolding (TypeScript, PostgreSQL)

▸ **Clinical RPA Core** (in progress) — Reusable automation hooks for SystmOne & EMIS, local-first credential handling

▸ **Agentic CLI Coder** (in progress) — Terminal refactoring agent powered by local LLMs, repo-aware context indexing`,

  experience: `**Current:** Software Development Lead @ Kynoby (Mar 2026–present)
Leading engineering team, architecting healthcare integrations, driving technical direction across automation platforms. Stack: React, Next.js, Django, PostgreSQL, Redis, Celery, Docker.

**Previous:** Senior Frontend Developer @ Simplamo (Oct 2022–Jan 2026)
Led frontend architecture, built component libraries, optimized application performance. React Native, Next.js, Tailwind CSS, Agile.`,

  stack: `**Core Languages:** TypeScript, Python, JavaScript
**Frontend:** React, Next.js, Motion, Tailwind CSS, shadcn/ui (Radix)
**Backend:** Node.js, Django, PostgreSQL, Redis, Celery, ClickHouse
**Infra:** Docker, AWS/GCP, GitHub Actions
**Data/ML:** SQL, ETL pipelines, AST parsing, local LLMs
**Tools:** VS Code, Git, Linear, Figma`,

  contact: `**Email:** bilal@profysr.dev
**GitHub:** github.com/Profysr
**LinkedIn:** linkedin.com/in/bilalahmad
**Location:** London, UK (Remote)
**Open to:** Senior/Lead roles, healthcare tech, developer tooling, open source collaboration`,
};

function matchResponse(input) {
  const lower = input.toLowerCase();
  if (
    lower.includes("project") ||
    lower.includes("built") ||
    lower.includes("portfolio")
  )
    return RESPONSES.projects;
  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("career")
  )
    return RESPONSES.experience;
  if (
    lower.includes("stack") ||
    lower.includes("tech") ||
    lower.includes("technology") ||
    lower.includes("language")
  )
    return RESPONSES.stack;
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("reach") ||
    lower.includes("hire")
  )
    return RESPONSES.contact;
  return `I can help with:\n▸ **Projects** — 8 engineering projects\n▸ **Experience** — Kynoby, Simplamo\n▸ **Tech Stack** — TypeScript, React, Python, PostgreSQL\n▸ **Contact** — bilal@profysr.dev\n\nWhat would you like to know?`;
}

let msgIdCounter = 0;
function uniqueId() {
  return `${Date.now()}-${++msgIdCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

// ============================================================================
// COMPONENT: ChatHeader (Smaller text, minimal padding, no close icon)
// ============================================================================

function ChatHeader() {
  return (
    <DrawerHeader className="py-2 px-3 border-b border-border">
      <div className="flex items-center gap-1.5">
        <IconSparkles className="size-3.5 text-muted-foreground" />
        <DrawerTitle className="text-sm! font-semibold tracking-tight text-foreground">
          AI Assistant
        </DrawerTitle>
      </div>
      <DrawerDescription className="text-[11px] text-muted-foreground/80 mt-0.5 text-left">
        Ask about projects, experience, or tech stack
      </DrawerDescription>
    </DrawerHeader>
  );
}

// ============================================================================
// COMPONENT: ChatMessagesContainer
// ============================================================================

function ChatMessagesContainer({ messages, isStreaming }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  return (
    <div
      className="flex-1 overflow-y-auto px-2 py-3 space-y-4 w-full"
      role="log"
      aria-live="polite"
      aria-label="Conversation history"
    >
      <WelcomeMessage />

      {messages.map((msg, index) => (
        <Message
          key={msg.id}
          content={msg.content}
          role={msg.role}
          isStreaming={
            isStreaming &&
            index === messages.length - 1 &&
            msg.role === "assistant"
          }
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

// ============================================================================
// COMPONENT: ChatInputForm (Includes QuickActions on top + increased input height)
// ============================================================================

function ChatInputForm({
  input,
  setInput,
  onSubmit,
  isStreaming,
  isOpen,
  showQuickActions,
  onQuickAction,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <DrawerFooter className="p-2 gap-2 bg-background/50 backdrop-blur-md border-t border-border/40 flex flex-col items-center">
      {/* Quick actions in a single-line horizontally scrollable container */}
      {showQuickActions && (
        <QuickActions onActionClick={onQuickAction} disabled={isStreaming} />
      )}

      {/* Main Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(input);
        }}
        className="relative flex items-center w-full"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to assistant..."
          disabled={isStreaming}
          className="w-full h-14 pl-3 pr-11 text-sm bg-muted/30 hover:bg-muted/50 border border-border/40 focus:border-foreground/20 rounded-lg focus:outline-none transition-all placeholder:text-muted-foreground/60 disabled:opacity-50"
          aria-label="Chat input"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className={cn(
            "absolute right-2 size-8 rounded-md flex items-center justify-center transition-all",
            input.trim() && !isStreaming
              ? "bg-foreground text-background hover:opacity-90 scale-100"
              : "bg-muted text-muted-foreground opacity-40 cursor-not-allowed scale-95",
          )}
          aria-label={isStreaming ? "Streaming response" : "Send message"}
        >
          {isStreaming ? (
            <IconLoader2 className="size-4 animate-spin" />
          ) : (
            <IconArrowUp className="size-4 stroke-[2.5]" />
          )}
        </button>
      </form>

      {/* Centered text below the input field */}
      <p className="text-[11px] text-muted-foreground/60 text-center select-none pt-0.5">
        AI responses are generated based on portfolio details and may vary.
      </p>
    </DrawerFooter>
  );
}

// ============================================================================
// MAIN COMPONENT: Chatbot (Height updated to 85dvh)
// ============================================================================

export function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  /* Streaming generator */
  const processStream = useCallback(async (text) => {
    setIsStreaming(true);
    const msgId = uniqueId();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", id: msgId },
    ]);

    for (let i = 0; i < text.length; i += 2) {
      const chunk = text.slice(0, i + 2);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, content: chunk } : m)),
      );
      await new Promise((r) => setTimeout(r, 12));
    }
    setIsStreaming(false);
  }, []);

  /* Send handler */
  const handleSend = (text) => {
    if (!text.trim() || isStreaming) return;
    const userText = text.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText, id: uniqueId() },
    ]);
    processStream(matchResponse(userText));
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => !val && onClose()}
      direction="bottom"
    >
      <DrawerPortal>
        <DrawerOverlay className="bg-black/40 backdrop-blur-xs" />
        <DrawerContent className="w-full mx-auto max-w-2xl bg-background rounded-t-2xl border-t border-border focus:outline-none flex flex-col h-[85dvh]">
          {/* Header without Close Button and minimal padding */}
          <ChatHeader />

          {/* Messages Scroll Area */}
          <ChatMessagesContainer
            messages={messages}
            isStreaming={isStreaming}
          />

          {/* Input Area containing Quick Actions directly on top */}
          <ChatInputForm
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isStreaming={isStreaming}
            isOpen={open}
            showQuickActions={!isStreaming}
            onQuickAction={handleSend}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
