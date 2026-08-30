"use client";

import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
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
import { ChatMessagesContainer } from "./Message";
import { ChatInputForm } from "./ChatInputForm";

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

export function Chatbot({ open, onClose }) {
  // 1. Manage input state locally since useChat no longer does
  const [input, setInput] = useState("");

  // 2. Destructure the updated useChat return values
  const { messages, status, sendMessage } = useChat({
    api: "/api/chat",
    body: {
      currentPath:
        typeof window !== "undefined" ? window.location.pathname : "/",
    },
    onError: (err) => console.error("Chat error:", err),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // 3. Replace `append` with `sendMessage({ text: ... })`
  const handleQuickAction = async (promptText) => {
    setInput("");
    await sendMessage({
      text: promptText,
    });
  };

  // 4. Create a submission wrapper for your ChatInputForm
  const handleChatSubmit = async (cleanedText) => {
    setInput("");
    await sendMessage({
      text: cleanedText,
    });
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => !val && onClose()}
      direction="bottom"
    >
      <DrawerPortal>
        <DrawerOverlay className="bg-background/50 backdrop-blur-sm" />
        <DrawerContent className="w-full mx-auto max-w-3xl bg-surface rounded-t-2xl border-t border-border focus:outline-none flex flex-col h-[85dvh]">
          <ChatHeader />
          <ChatMessagesContainer
            messages={messages}
            isStreaming={isStreaming}
          />
          <ChatInputForm
            input={input}
            setInput={setInput}
            onSubmit={handleChatSubmit} // Passes to your new wrapper function
            isStreaming={isStreaming}
            isOpen={open}
            showQuickActions={!isStreaming}
            onQuickAction={handleQuickAction}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}