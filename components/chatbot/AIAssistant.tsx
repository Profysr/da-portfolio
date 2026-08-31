"use client";

import { useCallback, useState } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { IconSparkles } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { ConversationSkeleton, PromptSkeleton } from "./Skeletons";

const LazyChatConversation = dynamic(
  () =>
    import("./ChatConversation").then((m) => ({ default: m.ChatConversation })),
  { ssr: true, loading: () => <ConversationSkeleton /> },
);

const LazyChatPrompt = dynamic(
  () => import("./ChatPrompt").then((m) => ({ default: m.ChatPrompt })),
  { ssr: true, loading: () => <PromptSkeleton /> },
);

/** Mirrors the plain { role, content } shape /api/chat now expects. */
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function AIAssistant({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: text };
      // Send full history + the new turn so the model has conversational
      // context, and so the backend's "guard the last user message" logic
      // has prior turns to distinguish from.
      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Something went wrong");
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text },
        ]);
      } catch (err) {
        console.error("Chat error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to get a response",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading],
  );

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => !val && onClose()}
      direction="bottom"
    >
      <DrawerPortal>
        <DrawerOverlay className="bg-background/50 backdrop-blur-sm" />
        <DrawerContent className="w-full mx-auto max-w-3xl bg-surface rounded-t-2xl border-t border-border focus:outline-none flex flex-col h-[90dvh]">
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

          <div className="flex-1 overflow-hidden flex flex-col">
            <LazyChatConversation
              messages={messages}
              isLoading={isLoading}
              error={error}
            />

            <LazyChatPrompt
              messages={messages}
              isLoading={isLoading}
              onSend={handleSend}
            />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
