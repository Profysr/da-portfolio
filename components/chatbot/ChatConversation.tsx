"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  MessageBranch,
  MessageBranchContent,
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { IconSparkles } from "@tabler/icons-react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { Spinner } from "../ui/spinner";

export interface MessageItem {
  role: "user" | "assistant";
  content: string;
}

interface ChatConversationProps {
  messages: MessageItem[];
  isLoading: boolean;
  error?: string | null;
}

export function ChatConversation({
  messages,
  isLoading,
  error,
}: ChatConversationProps) {
  return (
    <Conversation className="flex-1 overflow-hidden">
      <ConversationContent>
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-80 pt-10">
            <IconSparkles className="size-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm font-semibold text-foreground">
              Ask me about Bilal&apos;s work
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
                      <div className="inline-flex items-center gap-2.5 rounded-full border bg-muted/50 px-3.5 py-1.5">
                        <Spinner className="size-4 text-muted-foreground" />
                        <AnimatedShinyText
                          shimmerWidth={60}
                          className="text-sm text-muted-foreground"
                        >
                          Thinking...
                        </AnimatedShinyText>
                      </div>
                    </MessageContent>
                  </Message>
                </MessageBranchContent>
              </MessageBranch>
            )}

            {error && <p className="text-xs text-destructive px-1">{error}</p>}
          </>
        )}
        <ConversationScrollButton />
      </ConversationContent>
    </Conversation>
  );
}
