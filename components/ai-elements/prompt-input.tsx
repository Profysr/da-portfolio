"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ChatStatus } from "ai";
import {
  IconCornerDownLeft,
  IconPlus,
  IconSend2,
  IconSquare,
  IconX,
} from "@tabler/icons-react";
import type {
  ComponentProps,
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================================
// Context & Types
// ============================================================================

export interface TextInputContext {
  value: string;
  setInput: (v: string) => void;
  clear: () => void;
}

export interface PromptInputControllerProps {
  textInput: TextInputContext;
}

const PromptInputController = createContext<PromptInputControllerProps | null>(
  null,
);

export const usePromptInputController = () => {
  const ctx = useContext(PromptInputController);
  if (!ctx) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use usePromptInputController().",
    );
  }
  return ctx;
};

const useOptionalPromptInputController = () =>
  useContext(PromptInputController);

export type PromptInputProviderProps = PropsWithChildren<{
  initialInput?: string;
}>;

export const PromptInputProvider = ({
  initialInput: initialTextInput = "",
  children,
}: PromptInputProviderProps) => {
  const [textInput, setTextInput] = useState(initialTextInput);
  const clearInput = useCallback(() => setTextInput(""), []);

  const controller = useMemo<PromptInputControllerProps>(
    () => ({
      textInput: {
        clear: clearInput,
        setInput: setTextInput,
        value: textInput,
      },
    }),
    [textInput, clearInput],
  );

  return (
    <PromptInputController.Provider value={controller}>
      {children}
    </PromptInputController.Provider>
  );
};

// ============================================================================
// PromptInputMessage (text only)
// ============================================================================

export interface PromptInputMessage {
  text: string;
}

// ============================================================================
// PromptInput Component
// ============================================================================

export type PromptInputProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
};

export const PromptInput = ({
  className,
  onSubmit,
  children,
  ...props
}: PromptInputProps) => {
  const controller = useOptionalPromptInputController();
  const usingProvider = !!controller;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const text = usingProvider
        ? controller.textInput.value
        : ((formData) => (formData.get("message") as string) || "")(
            new FormData(form),
          );

      if (!usingProvider) form.reset();

      try {
        const result = onSubmit({ text }, event);
        if (result instanceof Promise) {
          try {
            await result;
            if (usingProvider) controller.textInput.clear();
          } catch {
            /* don't clear on error */
          }
        } else {
          if (usingProvider) controller.textInput.clear();
        }
      } catch {
        /* don't clear on error */
      }
    },
    [usingProvider, controller, onSubmit],
  );

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={handleSubmit}
      ref={formRef}
      {...props}
    >
      <InputGroup className="overflow-hidden">{children}</InputGroup>
    </form>
  );
};

// ============================================================================
// Sub-components
// ============================================================================

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>;
export const PromptInputBody = ({
  className,
  ...props
}: PromptInputBodyProps) => (
  <div className={cn("contents", className)} {...props} />
);

export type PromptInputTextareaProps = ComponentProps<
  typeof InputGroupTextarea
>;

interface ControlledTextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

interface UncontrolledTextareaProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptInputTextarea = ({
  onChange,
  onKeyDown,
  className,
  placeholder = "What would you like to know?",
  ...props
}: PromptInputTextareaProps) => {
  const controller = useOptionalPromptInputController();
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === "Enter" && !e.shiftKey) {
        if (isComposing || e.nativeEvent.isComposing) return;
        e.preventDefault();
        const submitButton = e.currentTarget.form?.querySelector(
          'button[type="submit"]',
        ) as HTMLButtonElement | null;
        if (submitButton?.disabled) return;
        e.currentTarget.form?.requestSubmit();
      }
    },
    [onKeyDown, isComposing],
  );

  const controlledProps: ControlledTextareaProps | UncontrolledTextareaProps =
    controller
      ? {
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            controller.textInput.setInput(e.currentTarget.value);
            onChange?.(e);
          },
          value: controller.textInput.value,
        }
      : { onChange };

  return (
    <InputGroupTextarea
      className={cn("field-sizing-content max-h-48 min-h-16", className)}
      name="message"
      onCompositionEnd={() => setIsComposing(false)}
      onCompositionStart={() => setIsComposing(true)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
      {...controlledProps}
    />
  );
};

export type PromptInputHeaderProps = Omit<
  ComponentProps<typeof InputGroupAddon>,
  "align"
>;
export const PromptInputHeader = ({
  className,
  ...props
}: PromptInputHeaderProps) => (
  <InputGroupAddon
    align="block-end"
    className={cn("order-first flex-wrap gap-1", className)}
    {...props}
  />
);

export type PromptInputFooterProps = Omit<
  ComponentProps<typeof InputGroupAddon>,
  "align"
>;
export const PromptInputFooter = ({
  className,
  ...props
}: PromptInputFooterProps) => (
  <InputGroupAddon
    align="block-end"
    className={cn("justify-between gap-1", className)}
    {...props}
  />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;
export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn("flex min-w-0 items-center gap-1", className)}
    {...props}
  />
);

export type PromptInputButtonTooltip =
  | string
  | {
      content: ReactNode;
      shortcut?: string;
      side?: ComponentProps<typeof TooltipContent>["side"];
    };
export type PromptInputButtonProps = ComponentProps<typeof InputGroupButton> & {
  tooltip?: PromptInputButtonTooltip;
};

export const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  tooltip,
  ...props
}: PromptInputButtonProps) => {
  const newSize =
    size ?? (Children.count(props.children) > 1 ? "sm" : "icon-sm");
  const button = (
    <InputGroupButton
      className={cn(className)}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
  if (!tooltip) return button;
  const content = typeof tooltip === "string" ? tooltip : tooltip.content;
  const shortcut = typeof tooltip === "string" ? undefined : tooltip.shortcut;
  const side = typeof tooltip === "string" ? "top" : (tooltip.side ?? "top");
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={side}>
        {content}
        {shortcut && (
          <span className="ml-2 text-muted-foreground">{shortcut}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export type PromptInputActionMenuProps = ComponentProps<typeof Tooltip>;
export const PromptInputActionMenu = (props: PromptInputActionMenuProps) => (
  <Tooltip {...props} />
);

export type PromptInputActionMenuTriggerProps = PromptInputButtonProps;

export const PromptInputActionMenuTrigger = ({
  className,
  children,
  ...props
}: PromptInputActionMenuTriggerProps) => (
  <TooltipTrigger asChild>
    <PromptInputButton className={className} {...props}>
      {children ?? <IconPlus className="size-4" />}
    </PromptInputButton>
  </TooltipTrigger>
);

export type PromptInputActionMenuContentProps = ComponentProps<
  typeof TooltipContent
>;
export const PromptInputActionMenuContent = ({
  className,
  ...props
}: PromptInputActionMenuContentProps) => (
  <TooltipContent className={cn(className)} {...props} />
);

export type PromptInputSubmitProps = ComponentProps<typeof InputGroupButton> & {
  status?: ChatStatus;
  onStop?: () => void;
};

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  onStop,
  onClick,
  children,
  ...props
}: PromptInputSubmitProps) => {
  const isGenerating = status === "submitted" || status === "streaming";
  let Icon = <IconSend2 className="size-4 text-background" />;
  if (status === "submitted") Icon = <Spinner />;
  else if (status === "streaming") Icon = <IconSquare className="size-4" />;
  else if (status === "error") Icon = <IconX className="size-4" />;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isGenerating && onStop) {
        e.preventDefault();
        onStop();
        return;
      }
      onClick?.(e);
    },
    [isGenerating, onStop, onClick],
  );

  return (
    <InputGroupButton
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn(className)}
      onClick={handleClick}
      size={size}
      type={isGenerating && onStop ? "button" : "submit"}
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </InputGroupButton>
  );
};

// ============================================================================
// Stub exports for compatibility (return null)
// ============================================================================

export const PromptInputActionAddAttachments = () => null;
export const PromptInputSelect = (props: ComponentProps<"select">) => (
  <select {...props} />
);
export const PromptInputSelectTrigger = (props: ComponentProps<"button">) => (
  <button {...props} />
);
export const PromptInputSelectContent = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputSelectItem = (props: ComponentProps<"option">) => (
  <option {...props} />
);
export const PromptInputSelectValue = (props: ComponentProps<"span">) => (
  <span {...props} />
);
export const PromptInputHoverCard = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputHoverCardTrigger = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputHoverCardContent = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputTabsList = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputTab = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputTabLabel = (props: ComponentProps<"h3">) => (
  <h3 {...props} />
);
export const PromptInputTabBody = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputTabItem = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommand = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommandInput = (props: ComponentProps<"input">) => (
  <input {...props} />
);
export const PromptInputCommandList = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommandEmpty = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommandGroup = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommandItem = (props: ComponentProps<"div">) => (
  <div {...props} />
);
export const PromptInputCommandSeparator = (props: ComponentProps<"div">) => (
  <div {...props} />
);
