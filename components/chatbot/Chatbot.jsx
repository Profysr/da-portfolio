"use client";

import React, { useState, useCallback } from "react";
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
import { ChatMessagesContainer } from "./Message"
import { ChatInputForm } from "./ChatInputForm";

let msgIdCounter = 0;
function uniqueId() {
  return `${Date.now()}-${++msgIdCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

// ============================================================================
// COMPONENT: ChatHeader
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
// COMPONENT: Chatbot
// Main container managing stream payloads and application state.
// ============================================================================
export function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Stream processing implementation
  const processRealStream = useCallback(
    async (userText, currentPath) => {
      setIsStreaming(true);
      const msgId = uniqueId();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: msgId, sources: [] },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Send user messages only (prevents empty assistant array index mismatch)
            messages: [...messages, { role: "user", content: userText }],
            currentPath,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const sourcesHeader = res.headers.get("X-Sources");
        let sources = [];
        try {
          sources = sourcesHeader ? JSON.parse(sourcesHeader) : [];
        } catch {
          sources = [];
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, content: fullText, sources } : m,
            ),
          );
        }
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  content:
                    "Sorry, I ran into an issue connecting to the assistant server.",
                  sources: [],
                }
              : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages],
  );

  const handleSend = (text) => {
    if (!text.trim() || isStreaming) return;
    const userText = text.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText, id: uniqueId() },
    ]);
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    processRealStream(userText, currentPath);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => !val && onClose()}
      direction="bottom"
    >
      <DrawerPortal>
        <DrawerOverlay className="bg-background/50 backdrop-blur-sm" />
        <DrawerContent className="w-full mx-auto max-w-2xl bg-surface rounded-t-2xl border-t border-border focus:outline-none flex flex-col h-[85dvh]">
          <ChatHeader />
          <ChatMessagesContainer
            messages={messages}
            isStreaming={isStreaming}
          />
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
