export const markdownScales = {
  doc: {
    p: "text-[15px] sm:text-base leading-[1.75] text-foreground/90 mb-6 font-normal tracking-[-0.01em]",
    ul: "my-5 space-y-2 list-disc pl-6 marker:text-primary text-[15px] sm:text-base leading-relaxed text-foreground/90",
    ol: "my-5 space-y-2 list-decimal pl-6 marker:text-primary marker:font-mono text-[15px] sm:text-base leading-relaxed text-foreground/90",
    li: "leading-relaxed pl-1",
    blockquote:
      "my-6 relative border-l-3 border-primary bg-surface/50 pl-5 pr-4 py-3.5 rounded-r-xl italic text-foreground/90 text-[15px] sm:text-base font-normal shadow-2xs leading-relaxed",
    code: "relative rounded-md bg-surface-muted border border-border/80 px-1.5 py-0.5 text-[13px] font-mono text-primary font-medium tracking-tight shadow-2xs",
    strong: "font-semibold text-foreground",
    em: "italic text-foreground/90",
    hr: "my-10 border-border/60",
    tableWrap: "my-6 w-full overflow-x-auto rounded-xl border border-border/70 bg-surface/40 shadow-xs",
    table: "w-full border-collapse text-left text-sm",
    th: "border-b border-border/80 p-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground bg-surface-muted/80",
    td: "border-b border-border/40 p-3.5 text-sm text-foreground/90 leading-relaxed",
  },
  chat: {
    p: "text-sm leading-relaxed mb-2.5 last:mb-0",
    ul: "text-sm mb-2.5 space-y-1 list-disc pl-5 marker:text-primary/70",
    ol: "text-sm mb-2.5 space-y-1 list-decimal pl-5 marker:text-primary font-mono",
    li: "leading-relaxed [&>p]:mb-0",
    blockquote: "my-2 border-l-2 border-primary/60 pl-3 italic text-muted-foreground",
    code: "rounded-md bg-surface-muted border border-border/60 px-1.5 py-0.5 text-xs font-mono text-foreground font-medium",
    strong: "font-semibold text-foreground",
    em: "italic text-foreground/90",
    hr: "border-border/60 my-3",
    tableWrap: "overflow-x-auto my-2.5 rounded-lg border border-border/60",
    table: "w-full border-collapse text-left text-xs",
    th: "border-b border-border/60 px-2.5 py-1.5 font-semibold text-[11px] uppercase tracking-wider text-muted-foreground bg-surface-muted/70",
    td: "border-b border-border/40 px-2.5 py-1.5 text-xs text-foreground/90 leading-relaxed",
  },
};

export function createMarkdownElements(scale = "doc") {
  const s = markdownScales[scale] || markdownScales.doc;
  return {
    p: ({ children, className, ...props }) => (
      <p className={scale === "doc" ? `${s.p} ${className || ""}`.trim() : `${s.p} ${className || ""}`.trim()} {...props}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul className={`${s.ul} ${className || ""}`.trim()} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ol className={`${s.ol} ${className || ""}`.trim()} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }) => (
      <li className={`${s.li} ${className || ""}`.trim()} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote className={`${s.blockquote} ${className || ""}`.trim()} {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => (
      <code className={`${s.code} ${className || ""}`.trim()} {...props}>
        {children}
      </code>
    ),
    strong: ({ children, className, ...props }) => (
      <strong className={`${s.strong} ${className || ""}`.trim()} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, className, ...props }) => (
      <em className={`${s.em} ${className || ""}`.trim()} {...props}>
        {children}
      </em>
    ),
    hr: ({ className, ...props }) => (
      <hr className={`${s.hr} ${className || ""}`.trim()} {...props} />
    ),
    table: ({ children, className, ...props }) => (
      <div className={s.tableWrap}>
        <table className={`${s.table} ${className || ""}`.trim()} {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, className, ...props }) => (
      <th className={`${s.th} ${className || ""}`.trim()} {...props}>
        {children}
      </th>
    ),
    td: ({ children, className, ...props }) => (
      <td className={`${s.td} ${className || ""}`.trim()} {...props}>
        {children}
      </td>
    ),
  };
}