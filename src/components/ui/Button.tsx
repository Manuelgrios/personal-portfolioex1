import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

const styles: Record<ButtonVariant, string> = {
  primary:
    "border-accent-dark bg-[var(--color-button-primary)] text-white shadow-[0_0_22px_var(--theme-accent-glow)] hover:bg-[var(--color-button-primary-hover)]",
  secondary:
    "border-border bg-[var(--color-button-secondary)] text-text hover:border-accent/70 hover:bg-surface-soft",
};

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]";

  if (typeof props.href === "string") {
    const { "aria-label": ariaLabel, href, rel, target } = props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          aria-label={ariaLabel}
          href={href}
          rel={rel}
          target={target}
          className={`${base} ${styles[variant]} ${className}`}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        aria-label={ariaLabel}
        to={href}
        rel={rel}
        target={target}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
