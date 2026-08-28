"use client";

import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { cn } from "@/lib/utils";

export const CODE_SHIKI_THEME = ["github-light", "github-dark"];

function nodeToText(node) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && node.props && node.props.children !== undefined) {
    return nodeToText(node.props.children);
  }
  return "";
}

export function MarkdownPre({ children, className }) {
  const child = Array.isArray(children) ? children[0] : children;
  const childClass =
    child && typeof child === "object" && typeof child.props?.className === "string"
      ? child.props.className
      : "";
  const language = childClass.match(/language-([\w+-]+)/)?.[1] || "";
  const raw = nodeToText(child && typeof child === "object" ? child.props?.children : children);

  if (!raw.trim()) {
    return <pre className={className}>{children}</pre>;
  }

  const fence = `\`\`\`${language}\n${raw.replace(/\n$/, "")}\n\`\`\``;

  return (
    <div className={cn("markdown-code my-6", className)}>
      <Streamdown mode="static" plugins={{ code }} shikiTheme={CODE_SHIKI_THEME}>
        {fence}
      </Streamdown>
    </div>
  );
}
