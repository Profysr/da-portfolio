"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconX,
  IconSend,
  IconSparkles,
  IconLoader2,
} from "@tabler/icons-react";
import { Message, WelcomeMessage } from "./Message";
import { QuickActions } from "./QuickActions";
import { cn } from "@/lib/utils";

/* Curated responses — single source of truth for Bilal's portfolio */
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
  if (lower.includes("project") || lower.includes("built") || lower.includes("portfolio")) return RESPONSES.projects;
  if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("career")) return RESPONSES.experience;
  if (lower.includes("stack") || lower.includes("tech") || lower.includes("technology") || lower.includes("language")) return RESPONSES.stack;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("hire")) return RESPONSES.contact;
  return `I can help with:\n▸ **Projects** — 8 engineering projects\n▸ **Experience** — Kynoby, Simplamo\n▸ **Tech Stack** — TypeScript, React, Python, PostgreSQL\n▸ **Contact** — bilal@profysr.dev\n\nWhat would you like to know?`;
}

/* Streaming simulation — character-by-character */
function* streamText(text, chunkSize = 2) {
  for (let i = 0; i < text.length; i += chunkSize) {
    yield text.slice(0, i + chunkSize);
  }
}

export function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamQueue, setStreamQueue] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const previousActiveRef = useRef(null);

  /* Focus trap + restore on close */
  useEffect(() => {
    if (isOpen) {
      previousActiveRef.current = document.activeElement;
      panelRef.current?.focus();
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveRef.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Focus trap inside panel */
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "Tab") {
      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /* Auto-scroll to bottom */
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages, isStreaming]);

  /* Streaming generator */
  const processStream = useCallback(async (text) => {
    setIsStreaming(true);
    setMessages(prev => [...prev, { role: "assistant", content: "", id: Date.now() }]);
    for await (const chunk of streamText(text)) {
      setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: chunk } : m));
      await new Promise(r => setTimeout(r, 12));
    }
    setIsStreaming(false);
  }, []);

  /* Send message */
  const handleSend = (text) => {
    if (!text.trim() || isStreaming) return;
    const userText = text.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userText, id: Date.now() }]);
    const response = matchResponse(userText);
    processStream(response);
  };

  /* Quick action click */
  const handleQuickAction = (query) => { handleSend(query); };

  /* Minimize animation */
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen && !isMinimized) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed bottom-20 right-4 z-50 w-full max-w-sm",
            "bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden",
            "flex flex-col"
          )}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Bilal's assistant"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <IconSparkles className="size-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Bilal's Assistant</p>
                <p className="text-xs text-muted-foreground">AI-powered · Streaming responses</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="size-8 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors"
              aria-label="Close chat"
            >
              <IconX className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]"
            role="log"
            aria-live="polite"
            aria-label="Conversation"
          >
            <WelcomeMessage />
            {messages.map((msg) => (
              <Message
                key={msg.id}
                content={msg.content}
                role={msg.role}
                isStreaming={isStreaming && messages[messages.length - 1]?.id === msg.id && msg.role === "assistant"}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {!isStreaming && messages.length <= 1 && (
            <QuickActions onActionClick={handleQuickAction} disabled={isStreaming} />
          )}

          {/* Input */}
          <div className="border-t border-border bg-surface/80 backdrop-blur-sm p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, experience, stack..."
                disabled={isStreaming}
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                aria-label="Chat input"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className={cn(
                  "size-10 rounded-xl flex items-center justify-center transition-colors",
                  "bg-primary text-primary-foreground hover:bg-primary-hover",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                aria-label={isStreaming ? "Streaming response" : "Send message"}
              >
                {isStreaming ? (
                  <IconLoader2 className="size-4 animate-spin" />
                ) : (
                  <IconSend className="size-4" />
                )}
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground/60 text-center mt-2 font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd> to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}