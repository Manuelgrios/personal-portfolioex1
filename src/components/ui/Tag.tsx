import type { HTMLAttributes, ReactNode } from "react";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Tag({ children, className = "", ...props }: TagProps) {
  return (
    <span
      {...props}
      className={`inline-flex rounded-md border border-border/60 bg-surface-soft/90 px-3 py-1 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}
