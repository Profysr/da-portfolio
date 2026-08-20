"use client";

import {
  useRef,
  useCallback,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { aiBotData } from "@/data/idx";
import { sendMessage } from "@/lib/botApi";
import { IconArrowUp, IconCornerDownLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./ui/shimmer-button";

// __ Lazy-Loaded Heavy UI Components _________________________________
const Conversation = lazy(() =>
  import("@/components/ai-elements/conversation").then((m) => ({
    default: m.Conversation,
  })),
);
const ConversationContent = lazy(() =>
  import("@/components/ai-elements/conversation").then((m) => ({
    default: m.ConversationContent,
  })),
);
const ConversationScrollButton = lazy(() =>
  import("@/components/ai-elements/conversation").then((m) => ({
    default: m.ConversationScrollButton,
  })),
);

const Message = lazy(() =>
  import("@/components/ai-elements/message").then((m) => ({
    default: m.Message,
  })),
);
const MessageContent = lazy(() =>
  import("@/components/ai-elements/message").then((m) => ({
    default: m.MessageContent,
  })),
);
const MessageResponse = lazy(() =>
  import("@/components/ai-elements/message").then((m) => ({
    default: m.MessageResponse,
  })),
);

const Suggestion = lazy(() =>
  import("@/components/ai-elements/suggestion").then((m) => ({
    default: m.Suggestion,
  })),
);
const Suggestions = lazy(() =>
  import("@/components/ai-elements/suggestion").then((m) => ({
    default: m.Suggestions,
  })),
);

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const INITIAL_MESSAGE = {
  id: "init",
  role: "assistant",
  content: `👋 Hi! I'm Bilal's **AI Recruiter Assistant**. Ask me anything about his engineering experience, tech stack, key achievements, or availability!`,
};

// __ Skeleton Loaders _________________________________
export function ChatHeaderSkeleton() {
  return (
    <div className="animate-pulse shrink-0">
      <div className="w-full flex items-center justify-center py-1">
        <div className="w-32 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="flex flex-col items-start px-6 py-2 border-b border-border bg-surface/80 gap-2">
        <div className="h-5 w-32 bg-surface-high rounded" />
        <div className="h-3 w-64 bg-surface-high/60 rounded" />
      </div>
    </div>
  );
}

export function ChatMessageListSkeleton() {
  return (
    <div className="flex-1 p-6 space-y-4 animate-pulse overflow-hidden">
      <div className="flex items-start gap-3 w-[75%]">
        <div className="h-16 w-full bg-surface-high/80 rounded-lg" />
      </div>
      <div className="flex items-start justify-end gap-3 w-[60%] ml-auto">
        <div className="h-10 w-full bg-primary/20 rounded-lg" />
      </div>
      <div className="flex items-start gap-3 w-[85%]">
        <div className="h-24 w-full bg-surface-high/80 rounded-lg" />
      </div>
    </div>
  );
}

export function ChatInputAreaSkeleton() {
  return (
    <div className="shrink-0 px-4 py-2 bg-surface space-y-3 animate-pulse">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <div className="h-7 w-24 bg-surface-high/60 rounded-xl shrink-0" />
        <div className="h-7 w-28 bg-surface-high/60 rounded-xl shrink-0" />
        <div className="h-7 w-20 bg-surface-high/60 rounded-xl shrink-0" />
      </div>
      <div className="h-20 w-full bg-surface-high/80 rounded-md" />
      <div className="flex justify-center">
        <div className="h-3 w-36 bg-surface-high/40 rounded" />
      </div>
    </div>
  );
}

// __ Sub-Components _________________________________
export function ChatHeader() {
  return (
    <>
      <div className="w-full flex items-center justify-center py-1 shrink-0">
        <div className="w-32 h-1.5 rounded-full bg-white/25" />
      </div>
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

export function ChatMessageList({ messages, isTyping }) {
  return (
    <Conversation>
      <ConversationContent className="gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="w-full">
            {msg.role === "assistant" ? (
              <div className="flex items-start gap-3 w-full max-w-[95%]">
                <Message from="assistant" className="flex-1 min-w-0">
                  <div className="relative group">
                    <MessageContent className="text-xs sm:text-sm leading-relaxed text-justify">
                      <MessageResponse>{msg.content}</MessageResponse>
                    </MessageContent>
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

export function ChatInputArea({ onSend, isTyping, quickPrompts }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea height as content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = (textToSend) => {
    const message = textToSend || input;
    if (!message.trim() || isTyping) return;

    onSend(message.trim());
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 px-4 py-2 bg-surface space-y-3">
      <Suggestions className="gap-2 pb-1 no-scrollbar overflow-x-auto">
        {quickPrompts.map((prompt) => (
          <Suggestion
            key={prompt.id}
            suggestion={prompt.label}
            onClick={(lbl) => handleSend(lbl)}
            variant="ghost"
            size="sm"
          >
            <span className="text-xs">{prompt.icon}</span>
            <span>{prompt.label}</span>
          </Suggestion>
        ))}
      </Suggestions>

      <div className="relative flex items-end gap-2 rounded border border-border bg-surface-high p-2 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          rows={2}
          placeholder="Ask about Bilal's architecture, healthcare RPA, stack, or availability..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 resize-none outline-none min-h-20 max-h-30 leading-relaxed py-1 px-1"
        />

        <button
          type="button"
          onClick={() => handleSend()}
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

// __ Internal Dynamic Layout Chunk _________________________________
const LazyChatBody = lazy(async () => ({
  default: function ChatBody({
    messages,
    isTyping,
    // copiedId,
    // copyToClipboard,
    input,
    setInput,
    textareaRef,
    handleKeyDown,
    handleSendText,
  }) {
    return (
      <>
        <Suspense fallback={<ChatHeaderSkeleton />}>
          <ChatHeader />
        </Suspense>
        <Suspense fallback={<ChatMessageListSkeleton />}>
          <ChatMessageList
            messages={messages}
            isTyping={isTyping}
            // copiedId={copiedId}
            // onCopy={copyToClipboard}
          />
        </Suspense>
        <Suspense fallback={<ChatInputAreaSkeleton />}>
          <ChatInputArea
            input={input}
            setInput={setInput}
            textareaRef={textareaRef}
            onKeyDown={handleKeyDown}
            onSend={handleSendText}
            isTyping={isTyping}
            quickPrompts={aiBotData.quickPrompts}
          />
        </Suspense>
      </>
    );
  },
}));

// __ Main Component _________________________________
export function AssistantAi({ open, onOpenChange }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // const [copiedId, setCopiedId] = useState(null);

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

  // const copyToClipboard = useCallback((text, id) => {
  //   navigator.clipboard.writeText(text);
  //   setCopiedId(id);
  //   setTimeout(() => setCopiedId(null), 2000);
  // }, []);

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
        <DrawerContent className="bg-surface flex flex-col max-w-4xl mx-auto h-[95vh] overflow-hidden">
          {open && (
            <Suspense
              fallback={
                <div className="flex flex-col h-full">
                  <ChatHeaderSkeleton />
                  <ChatMessageListSkeleton />
                  <ChatInputAreaSkeleton />
                </div>
              }
            >
              <LazyChatBody
                messages={messages}
                isTyping={isTyping}
                // copiedId={copiedId}
                // copyToClipboard={copyToClipboard}
                input={input}
                setInput={setInput}
                textareaRef={textareaRef}
                handleKeyDown={handleKeyDown}
                handleSendText={handleSendText}
              />
            </Suspense>
          )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
