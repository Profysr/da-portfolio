"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  IconCopy,
  IconCheck,
  IconArrowUp,
  IconUser,
  IconRobot,
  IconBotId,
} from "@tabler/icons-react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { aiBotData } from "@/data/idx";
import { sendMessage } from "@/lib/botApi";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "assistant",
  content: `👋 Hi! I'm Bilal's **AI Recruiter Assistant**. Ask me anything about his engineering experience, tech stack, key achievements, or availability!`,
};

interface AssistantAiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssistantAi({ open, onOpenChange }: AssistantAiProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // const handleReset = useCallback(() => {
  //   setMessages([INITIAL_MESSAGE]);
  // }, []);

  const handleSendText = useCallback(
    async (textToSend: string) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isTyping) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const response = await sendMessage(trimmed, [...messagesRef.current, userMsg]);
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "assistant", content: response.content },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: "Sorry, something went wrong while connecting to the assistant backend.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText(input);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <DrawerOverlay className="bg-black/70 backdrop-blur-sm" />
        <DrawerContent className="bg-surface border-t border-border flex flex-col h-[90dvh] max-w-3xl mx-auto rounded-t-2xl shadow-2xl">
          
          {/* ── Top Swipe Bar ────────────────────────────────────────── */}
          <div className="w-full flex items-center justify-center pt-2.5 pb-1 shrink-0">
            <div className="w-12 h-1 rounded-full bg-white/15" />
          </div>

          {/* ── Minimal Header (Claude Style) ────────────────────────── */}
          <div className="flex items-center justify-between px-5 py-3 shrink-0 border-b border-border/50">
            <div className="flex items-center gap-3">
              {/* Avatar Icon */}
              <div className="relative flex p-1.5 items-center justify-center rounded bg-primary/10 text-primary">
                <IconBotId />
              </div>

              <div>
                <DrawerTitle className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                  <span>AI Assistant</span>
                </DrawerTitle>
                <p className="text-[11px] text-muted-foreground/70">
                  Trained on Bilal's engineering background & verified metrics
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            {/* <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                >
                  <IconTrash className="size-4" />
                </button>
              )}

              <DrawerClose className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                <IconX className="size-4.5" />
              </DrawerClose>
            </div> */}
          </div>

          {/* ── Chat Messages Container ─────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold mt-0.5 shadow-xs",
                    msg.role === "user"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-surface-high border border-border text-primary"
                  )}
                >
                  {msg.role === "user" ? (
                    <IconUser className="size-4" />
                  ) : (
                    <IconRobot className="size-4 text-primary" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "relative group max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed transition-all",
                    msg.role === "user"
                      ? "bg-primary/10 border border-primary/20 text-white rounded-tr-xs"
                      : "bg-surface-high/60 border border-border/80 text-foreground/90 rounded-tl-xs"
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Copy action for assistant */}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:opacity-100 bg-surface border border-border text-muted-foreground hover:text-white transition-all shadow-xs"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <IconCheck className="size-3 text-emerald-400" />
                      ) : (
                        <IconCopy className="size-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-high border border-border text-primary">
                  <IconRobot className="size-4" />
                </div>
                <div className="rounded-xl rounded-tl-xs bg-surface-high/60 border border-border/80 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 bg-primary rounded-full animate-bounce" />
                    <span className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Prompt Suggestions + Claude-style Input Area ────────── */}
          <div className="shrink-0 p-4 sm:p-5 border-t border-border/40 bg-surface/90 space-y-3">
            
            {/* Quick Prompts Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {aiBotData.quickPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendText(prompt.label)}
                  disabled={isTyping}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface-high/50 hover:bg-surface-high hover:border-primary/40 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  <span className="text-xs">{prompt.icon}</span>
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>

            {/* Main Input Box (Claude-Style Rounded Container) */}
            <div className="relative flex flex-col rounded border border-border bg-surface-high p-2 transition-all duration-200 shadow-md">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                rows={1}
                placeholder="Ask about Bilal's architecture, healthcare RPA, stack, or availability..."
                className="w-full bg-transparent text-xs sm:text-sm text-foreground resize-none outline-none pr-10 min-h-[36px] max-h-[120px] leading-relaxed"
              />

              {/* Circular Send Button positioned nicely at bottom-right */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleSendText(input)}
                  disabled={!input.trim() || isTyping}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg transition-all duration-200 cursor-pointer",
                    input.trim() && !isTyping
                      ? "bg-primary text-primary-foreground hover:scale-105 shadow-sm"
                      : "bg-surface-high text-muted-foreground/40 border border-border/50 cursor-not-allowed"
                  )}
                >
                  <IconArrowUp className="size-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Minimal Footer Tagline */}
            <div className="flex justify-center pt-0.5">
              <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                Powered by UI
              </span>
            </div>

          </div>

        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}