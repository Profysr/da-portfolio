"use client";

import {
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconAlertOctagon,
  IconBulb,
  IconFlame,
} from "@tabler/icons-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const CALLOUT_CONFIGS = {
  info: {
    icon: IconInfoCircle,
    variant: "info",
  },
  tip: {
    icon: IconBulb,
    variant: "success",
  },
  warning: {
    icon: IconAlertTriangle,
    variant: "warning",
  },
  danger: {
    icon: IconAlertOctagon,
    variant: "destructive",
  },
  success: {
    icon: IconCircleCheck,
    variant: "success",
  },
  important: {
    icon: IconFlame,
    variant: "default",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
  ...props
}) {
  const config = CALLOUT_CONFIGS[type] || CALLOUT_CONFIGS.info;
  const Icon = config.icon;

  return (
    <Alert
      variant={config.variant}
      className={cn("my-6 shadow-xs", className)}
      {...props}
    >
      <Icon className="size-4" />
      {title && <AlertTitle className="font-semibold text-sm">{title}</AlertTitle>}
      <AlertDescription className="text-foreground/90 leading-relaxed text-sm [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export const Note = (props) => <Callout type="info" {...props} />;
export const Tip = (props) => <Callout type="tip" {...props} />;
export const Warning = (props) => <Callout type="warning" {...props} />;
export const Danger = (props) => <Callout type="danger" {...props} />;
export const Important = (props) => <Callout type="important" {...props} />;
