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
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { QuickActions } from "@/components/chatbot/QuickActions";

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
            <Conversation>
              <ConversationContent>
                {messages.length === 0 && !isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-80 pt-10">
                    <IconSparkles className="size-10 text-muted-foreground/50 mb-2" />
                    <p className="text-sm font-semibold text-foreground">
                      Ask me about Bilal's work
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Projects, experience, tech stack, or contact info
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, i) => (
                      <MessageBranch defaultBranch={0} key={i}>
                        <MessageBranchContent>
                          <Message from={msg.role} className="gap-3">
                            <MessageContent>
                              <MessageResponse>{msg.content}</MessageResponse>
                            </MessageContent>
                          </Message>
                        </MessageBranchContent>
                      </MessageBranch>
                    ))}
                    {isLoading && (
                      <MessageBranch defaultBranch={0} key="loading">
                        <MessageBranchContent>
                          <Message from="assistant" className="gap-3">
                            <MessageContent>
                              <Shimmer
                                as="span"
                                className="text-sm text-muted-foreground"
                                duration={2}
                              >
                                Thinking...
                              </Shimmer>
                            </MessageContent>
                          </Message>
                        </MessageBranchContent>
                      </MessageBranch>
                    )}
                    {error && (
                      <p className="text-xs text-destructive px-1">{error}</p>
                    )}
                  </>
                )}
                <ConversationScrollButton />
              </ConversationContent>
            </Conversation>

            <div className="border-t border-border p-2 bg-surface/50">
              {messages.length === 0 && !isLoading && (
                <QuickActions onActionClick={handleSend} disabled={isLoading} />
              )}

              <PromptInput
                onSubmit={(message) => handleSend(message.text)}
                className="w-full"
              >
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder={
                      isLoading
                        ? "Assistant is responding..."
                        : "Reply to assistant..."
                    }
                    disabled={isLoading}
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools />
                  <PromptInputSubmit
                    status={isLoading ? "submitted" : "ready"}
                  />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
