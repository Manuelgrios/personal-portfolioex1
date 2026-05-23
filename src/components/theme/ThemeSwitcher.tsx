import { Check, ChevronDown, Palette } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { PortfolioTheme } from "../../data/themes";
import { useTheme } from "./useTheme";

type ThemeSwitcherProps = {
  className?: string;
  inlineMenu?: boolean;
  menuClassName?: string;
  onThemeChange?: () => void;
};

export function ThemeSwitcher({
  className = "",
  inlineMenu = false,
  menuClassName = "",
  onThemeChange,
}: ThemeSwitcherProps) {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        switcherRef.current &&
        event.target instanceof Node &&
        !switcherRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function handleSelect(themeId: PortfolioTheme["id"]) {
    setTheme(themeId);
    setIsOpen(false);
    onThemeChange?.();
  }

  return (
    <div ref={switcherRef} className={`relative ${className}`}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-[var(--color-button-secondary)] px-3 text-sm font-semibold text-text transition hover:border-accent/70 hover:bg-surface-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <Palette size={16} />
        <span className="hidden lg:inline">Theme</span>
        <span className="max-w-32 truncate text-accent">{currentTheme.name}</span>
        <ChevronDown
          className={`transition ${isOpen ? "rotate-180" : ""}`}
          size={15}
        />
      </button>

      <div
        className={[
          inlineMenu
            ? "static mt-2 w-full"
            : "absolute right-0 z-[70] mt-2 w-72",
          "rounded-2xl border border-border bg-card/95 p-2 shadow-[0_22px_70px_rgb(0_0_0_/_0.35)] backdrop-blur-xl transition",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
          menuClassName,
        ].join(" ")}
        hidden={!isOpen}
        id={menuId}
        role="menu"
      >
        {themes.map((theme) => {
          const isActive = theme.id === currentTheme.id;

          return (
            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-surface-soft focus:outline-none focus-visible:bg-surface-soft"
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              role="menuitemradio"
              aria-checked={isActive}
              type="button"
            >
              <span className="flex shrink-0 items-center -space-x-1">
                <ThemeDot color={theme.tokens.background} />
                <ThemeDot color={theme.tokens.card} />
                <ThemeDot color={theme.tokens.accent} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-text">
                  {theme.name}
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted">
                  {theme.description}
                </span>
              </span>
              <Check
                className={isActive ? "text-accent opacity-100" : "opacity-0"}
                size={17}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ThemeDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 rounded-full border border-border"
      style={{ backgroundColor: color }}
    />
  );
}

