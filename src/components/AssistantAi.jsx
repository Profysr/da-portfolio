"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { aiBotData } from "@/data/idx";
import { sendMessage } from "@/lib/botApi";
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
  IconCopy,
  IconCheck,
  IconArrowUp,
  IconCornerDownLeft,
} from "@tabler/icons-react";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./ui/shimmer-button";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const INITIAL_MESSAGE = {
  id: "init",
  role: "assistant",
  content: `👋 Hi! I'm Bilal's **AI Recruiter Assistant**. Ask me anything about his engineering experience, tech stack, key achievements, or availability!`,
};

// __ Components_________________________________
export function ChatHeader() {
  return (
    <>
      {/* Top Drag Handle Bar */}
      <div className="w-full flex items-center justify-center py-1 shrink-0">
        <div className="w-32 h-1.5 rounded-full bg-white/25" />
      </div>

      {/* Header Container */}
      <div className="flex flex-col items-start px-6 py-2 shrink-0 border-b border-border bg-surface/80">
        <DrawerTitle className="text-base font-semibold text-foreground">
          <span className="font-bold bg-primary px-1 py-0.5 rounded text-zinc-900">
            AI
          </span>{" "}
          Assistant
        </DrawerTitle>
        <p className="text-xs text-muted-foreground/70 mt-0.5">
          Trained on Bilal's engineering background & verified metrics
        </p>
      </div>
    </>
  );
}

export function ChatMessageList({ messages, isTyping, copiedId, onCopy }) {
  return (
    <Conversation>
      <ConversationContent className="gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="w-full">
            {msg.role === "assistant" ? (
              <div className="flex items-start gap-3 w-full max-w-[95%]">
                {/* <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-high border border-border/80 text-primary shadow-xs mt-0.5">
                  <IconRobot className="size-4.5" />
                </div> */}

                <Message from="assistant" className="flex-1 min-w-0">
                  <div className="relative group">
                    <MessageContent className="text-xs sm:text-sm leading-relaxed text-justify">
                      <MessageResponse>{msg.content}</MessageResponse>
                    </MessageContent>

                    {/* <button
                      onClick={() => onCopy(msg.content, msg.id)}
                      className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:opacity-100 bg-surface border border-border text-muted-foreground hover:text-white transition-all shadow-xs cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <IconCheck className="size-3.5 text-emerald-400" />
                      ) : (
                        <IconCopy className="size-3.5" />
                      )}
                    </button> */}
                  </div>
                </Message>
              </div>
            ) : (
              <div className="flex items-start justify-end gap-3 w-full ml-auto max-w-[85%]">
                <Message from="user" className="flex-1 min-w-0">
                  <MessageContent className="rounded! py-1.5! text-xs sm:text-sm leading-relaxed">
                    <MessageResponse>{msg.content}</MessageResponse>
                  </MessageContent>
                </Message>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2.5 w-full max-w-[92%]">
            <ShimmerButton
              borderRadius="4px"
              shimmerSize="0.04em"
              shimmerDuration="2.5s"
              shimmerColor="var(--primary, #3b82f6)"
              background="var(--surface-high, rgba(255, 255, 255, 0.05))"
              className="px-2.5 py-1 text-[11px] font-mono font-medium text-muted-foreground cursor-default border-border pointer-events-none"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-primary animate-pulse" />
                Thinking...
              </span>
            </ShimmerButton>
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}

export function ChatInputArea({
  input,
  setInput,
  textareaRef,
  onKeyDown,
  onSend,
  isTyping,
  quickPrompts,
}) {
  return (
    <div className="shrink-0 px-4 py-2 bg-surface space-y-3">
      {/* Quick Suggestions */}
      <Suggestions className="gap-2 pb-1 no-scrollbar overflow-x-auto">
        {quickPrompts.map((prompt) => (
          <Suggestion
            key={prompt.id}
            suggestion={prompt.label}
            onClick={(lbl) => onSend(lbl)}
            // className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-surface-high/60 hover:bg-surface-high hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer disabled:opacity-50"
            variant="ghost"
            size="sm"
          >
            <span className="text-xs">{prompt.icon}</span>
            <span>{prompt.label}</span>
          </Suggestion>
        ))}
      </Suggestions>

      {/* Simplified Textarea Container */}
      <div className="relative flex items-end gap-2 rounded border border-border bg-surface-high p-2 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isTyping}
          rows={2}
          placeholder="Ask about Bilal's architecture, healthcare RPA, stack, or availability..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 resize-none outline-none min-h-20 max-h-30 leading-relaxed py-1 px-1"
        />

        <button
          type="button"
          onClick={() => onSend(input)}
          disabled={!input.trim() || isTyping}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer",
            input.trim() && !isTyping
              ? "bg-primary text-primary-foreground hover:scale-105 shadow-sm"
              : "bg-surface text-muted-foreground/30 border border-border/50 cursor-not-allowed",
          )}
        >
          <IconArrowUp className="size-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Replaced Footer with Shortcut Hint */}
      <div className="flex justify-center pt-0.5">
        <span className="text-[11px] text-muted-foreground/60 font-mono flex items-center gap-1.5">
          <IconCornerDownLeft className="size-3 text-muted-foreground/50" />
          Press{" "}
          <kbd className="px-1 py-0.5 rounded bg-surface-high border border-border text-[10px]">
            Shift + Enter
          </kbd>{" "}
          for new line
        </span>
      </div>
    </div>
  );
}

// __ Main Component_________________________________
export function AssistantAi({ open, onOpenChange }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const textareaRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleSendText = useCallback(
    async (textToSend) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isTyping) return;

      const userMsg = {
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
        const response = await sendMessage(trimmed, [
          ...messagesRef.current,
          userMsg,
        ]);
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
            content:
              "Sorry, something went wrong while connecting to the assistant backend.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText(input);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        {/* <DrawerOverlay className="bg-black/75 backdrop-blur-md" /> */}
        <DrawerContent className="bg-surface flex flex-col max-w-4xl mx-auto h-[95vh] overflow-hidden">
          <ChatHeader />
          <ChatMessageList
            messages={messages}
            isTyping={isTyping}
            copiedId={copiedId}
            onCopy={copyToClipboard}
          />
          <ChatInputArea
            input={input}
            setInput={setInput}
            textareaRef={textareaRef}
            onKeyDown={handleKeyDown}
            onSend={handleSendText}
            isTyping={isTyping}
            quickPrompts={aiBotData.quickPrompts}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
