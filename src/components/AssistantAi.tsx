"use client";

import { useRef, useCallback, useState } from "react";
import {
  IconSparkles,
  IconCopy,
  IconCheck,
  IconFileDownload,
  IconMail,
  IconReload,
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
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Suggestion,
  Suggestions,
} from "@/components/ai-elements/suggestion";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { aiBotData, personal } from "@/data/idx";
import { downloadResume } from "@/lib/utils";
import { sendMessage } from "@/lib/botApi";

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
  content: `👋 Hi! I'm Bilal's **AI Recruiter Assistant**. Ask me anything about his experience, stack, projects, or background — or tap a quick prompt below!`,
};

interface AssistantAiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssistantAi({ open, onOpenChange }: AssistantAiProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleReset = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
  }, []);

  const handleSubmit = useCallback(
    async (message: PromptInputMessage) => {
      if (!message.text.trim()) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: message.text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const response = await sendMessage(message.text.trim(), [...messagesRef.current, userMsg]);
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
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [],
  );

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: suggestion,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      sendMessage(suggestion, [...messagesRef.current, userMsg])
        .then((response) => {
          setMessages((prev) => [
            ...prev,
            { id: uid(), role: "assistant", content: response.content },
          ]);
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: uid(),
              role: "assistant",
              content: "Sorry, something went wrong. Please try again.",
            },
          ]);
        })
        .finally(() => setIsTyping(false));
    },
    [],
  );

  const submitStatus = isTyping ? "streaming" : "ready";

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
                    Trained on Bilal's engineering background, stack, and verified
                    metrics.
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
            <Suggestions>
              {aiBotData.quickPrompts.map((prompt) => (
                <Suggestion
                  key={prompt.id}
                  suggestion={prompt.label}
                  onClick={handleSuggestion}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{prompt.icon}</span>
                    <span>{prompt.label}</span>
                  </span>
                </Suggestion>
              ))}
            </Suggestions>
          </div>

          <div className="h-px bg-white/10 shrink-0" />

          {/* Message History */}
          <Conversation>
            <ConversationContent>
              {messages.map((msg) => (
                <Message from={msg.role} key={msg.id}>
                  <MessageContent className="relative group/msg">
                    <MessageResponse>{msg.content}</MessageResponse>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover/msg:opacity-100 hover:opacity-100 bg-black/40 hover:bg-black/60 text-muted-foreground hover:text-white transition-all"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <IconCheck className="size-3 text-emerald-400" />
                        ) : (
                          <IconCopy className="size-3" />
                        )}
                      </button>
                    )}
                  </MessageContent>
                </Message>
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
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Input Form */}
          <PromptInput
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-white/10 px-4 pb-4 pt-3"
          >
            <PromptInputBody>
              <PromptInputTextarea
                disabled={isTyping}
                placeholder="Ask about Bilal's architecture, healthcare integrations, or availability..."
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputSubmit
                disabled={isTyping}
                status={submitStatus}
              />
            </PromptInputFooter>
          </PromptInput>

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