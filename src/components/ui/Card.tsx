import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-3xl border border-border/80 bg-card/82 p-6 shadow-[var(--theme-card-shadow)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}
