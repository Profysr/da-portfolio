"use client";

import React, { useState } from "react";
import {
  IconSparkles,
  IconSend,
  IconCopy,
  IconCheck,
  IconFileDownload,
  IconMail,
  IconReload,
  IconRobot,
  IconUser,
} from "@tabler/icons-react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { aiBotData, personal } from "@/data/idx";
import { downloadResume } from "@/lib/utils";

export function AssistantAi({ open, onOpenChange }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `👋 Hi! I'm Bilal's **AI Recruiter Copilot**. Click any quick question below or ask me directly about his engineering experience, stack, or impact metrics!`,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSelectPrompt = (prompt) => {
    const userMsg = { role: "user", text: prompt.label };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: prompt.answer }]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = "";

      if (lower.includes("experience") || lower.includes("kynoby") || lower.includes("work")) {
        responseText = `Bilal is currently **Software Development Lead** at **Kynoby** (previously RPA Engineer). He has **2.8+ years** of professional experience scaling automation, healthcare integrations, and full-stack software systems.`;
      } else if (lower.includes("stack") || lower.includes("python") || lower.includes("react") || lower.includes("tech") || lower.includes("mcp")) {
        responseText = `Bilal's primary daily drivers are **Python, Django, FastAPI, React 19, Next.js, PostgreSQL, Docker**, and **MCP (Model Context Protocol)** with **n8n & Power Automate** for AI agent workflows.`;
      } else if (lower.includes("education") || lower.includes("degree") || lower.includes("university") || lower.includes("gpa")) {
        responseText = `Bilal holds a **B.S. in Computer Science (Minor in Mathematics)** from the **University of Massachusetts, Lowell** with a **3.8 GPA** (Dean's Honor List).`;
      } else if (lower.includes("cert") || lower.includes("aws") || lower.includes("google")) {
        responseText = `Bilal is an **AWS Certified Solutions Architect** and holds the **Google Data Analytics Professional Certificate**.`;
      } else if (lower.includes("salary") || lower.includes("rate") || lower.includes("hire") || lower.includes("contact") || lower.includes("email")) {
        responseText = `You can reach Bilal directly at **[${personal.email}](mailto:${personal.email})** or review his full ATS Resume via the top button.`;
      } else {
        responseText = `Bilal is a Forward Deployed & Full-Stack Engineer specializing in Python, React, and MCP agentic automation. Feel free to explore the quick chips above or reach him at **${personal.email}**.`;
      }

      setMessages((prev) => [...prev, { role: "assistant", text: responseText }]);
      setIsTyping(false);
    }, 450);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        text: `👋 Hi! I'm Bilal's **AI Recruiter Copilot**. Click any quick question below or ask me directly about his engineering experience, stack, or impact metrics!`,
      },
    ]);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent className="bg-surface border-t border-border flex flex-col h-[85dvh]">
          <DrawerHeader className="border-b border-border/60 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shrink-0">
                  <IconSparkles className="size-5" />
                </div>
                <div>
                  <DrawerTitle className="text-base sm:text-lg flex items-center gap-2">
                    <span>AI Recruiter Assistant</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 font-mono">
                      Online
                    </span>
                  </DrawerTitle>
                  <DrawerDescription>
                    Trained on Bilal's engineering background, stack, and verified metrics.
                  </DrawerDescription>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IconReload className="size-3.5" />
                </button>
                <DrawerClose className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors text-xs" />
              </div>
            </div>
          </DrawerHeader>

          {/* Quick Prompt Chips */}
          <div className="shrink-0 px-4 pt-4 pb-2 space-y-2">
            <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              ⚡ Quick Recruiter Prompts
            </div>
            <div className="flex flex-wrap gap-1.5">
              {aiBotData.quickPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all text-left"
                >
                  <span>{prompt.icon}</span>
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10 shrink-0" />

          {/* Message History */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 space-y-3.5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/10 border-white/15 text-zinc-300"}`}
                >
                  {msg.role === "user" ? <IconUser className="size-3.5" /> : <IconRobot className="size-3.5" />}
                </div>

                <div
                  className={`group relative max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${msg.role === "user" ? "bg-primary/15 border border-primary/30 text-white" : "bg-white/[0.04] border border-white/10 text-zinc-200"}`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {msg.role === "assistant" && idx > 0 && (
                    <button
                      onClick={() => copyToClipboard(msg.text, idx)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-black/40 hover:bg-black/60 text-muted-foreground hover:text-white transition-all"
                      title="Copy text"
                    >
                      {copiedIndex === idx ? <IconCheck className="size-3 text-emerald-400" /> : <IconCopy className="size-3" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs pl-9">
                <span className="flex gap-1 items-center">
                  <span className="size-1.5 bg-primary rounded-full animate-bounce" />
                  <span className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
                <span>Copilot is formulating response...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="shrink-0 border-t border-white/10 px-4 pb-4 pt-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Bilal's architecture, healthcare integrations, or availability..."
                className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 pr-11 text-xs sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none transition-opacity"
              >
                <IconSend className="size-4" />
              </button>
            </div>
          </form>

          {/* Footer Quick Actions */}
          <DrawerFooter className="shrink-0 border-t border-border/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {personal.resumeUrl && (
                  <button
                    type="button"
                    onClick={() => downloadResume(personal.resumeUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10 hover:border-primary/40 transition-all"
                  >
                    <IconFileDownload className="size-3.5 text-primary" />
                    <span>Download ATS Resume</span>
                  </button>
                )}
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-muted-foreground hover:text-white transition-all"
                >
                  <IconMail className="size-3.5" />
                  <span>Email Bilal</span>
                </a>
              </div>

              <span className="text-[11px] font-mono text-muted-foreground/60">
                Powered by DA Copilot UI
              </span>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}