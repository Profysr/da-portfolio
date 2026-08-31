"use client";

import { QuickActions } from "./QuickActions";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { MessageItem } from "./ChatConversation";

interface ChatPromptProps {
  messages: MessageItem[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export function ChatPrompt({ messages, isLoading, onSend }: ChatPromptProps) {
  return (
    <div className="border-t border-border p-2 bg-surface/50">
      {messages.length === 0 && !isLoading && (
        <QuickActions onActionClick={onSend} disabled={isLoading} />
      )}

      <PromptInput
        onSubmit={(message) => onSend(message.text)}
        className="w-full"
      >
        <PromptInputBody>
          <PromptInputTextarea
            placeholder={
              isLoading ? "Assistant is responding..." : "Reply to assistant..."
            }
            disabled={isLoading}
          />
        </PromptInputBody>
        <PromptInputFooter className="border-none">
          <PromptInputTools />
          <PromptInputSubmit status={isLoading ? "submitted" : "ready"} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
