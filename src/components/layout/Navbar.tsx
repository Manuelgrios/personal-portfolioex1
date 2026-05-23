import { Download, Menu, X } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../../data/navigation";
import { siteConfig } from "../../data/siteConfig";
import { scrollToHash } from "../../lib/hashNavigation";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  function handleHashClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setIsMenuOpen(false);
    const hash = href.slice(href.indexOf("#"));

    if (location.pathname === "/") {
      event.preventDefault();
      navigate({ pathname: "/", hash });
      window.requestAnimationFrame(() => scrollToHash(hash));
      return;
    }

    event.preventDefault();
    navigate({ pathname: "/", hash });
  }

  function handleNavigationClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    type: "section" | "route" | "external",
  ) {
    if (type === "section") {
      handleHashClick(event, href);
      return;
    }

    setIsMenuOpen(false);
  }

  function closeMobileMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        navRef.current &&
        event.target instanceof Node &&
        !navRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/82 backdrop-blur-xl">
      <nav ref={navRef} className="relative mx-auto max-w-[1360px] px-5">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-normal text-accent-dark">
              {siteConfig.brand.logoText}
            </span>
            <span className="text-base font-semibold text-text">
              {siteConfig.brand.name}
            </span>
          </Link>
          <div className="hidden items-center gap-7 lg:flex">
            {navigationItems.filter((item) => item.showInDesktop).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(event) =>
                  handleNavigationClick(event, item.href, item.type)
                }
                className="text-sm font-medium text-text transition hover:text-accent focus:outline-none focus-visible:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <ThemeSwitcher className="w-56" />
            {siteConfig.resume.path ? (
              <a
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-accent-dark bg-[var(--color-button-primary)] px-4 text-sm font-semibold text-white shadow-[0_0_18px_var(--theme-accent-glow)] transition hover:bg-[var(--color-button-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                download={siteConfig.resume.download}
                href={siteConfig.resume.path}
              >
                <Download size={16} />
                {siteConfig.resume.label}
              </a>
            ) : (
              <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-muted">
                {siteConfig.resume.label} coming soon
              </span>
            )}
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition hover:border-accent/70 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={[
            "absolute inset-x-5 top-[calc(100%+0.5rem)] overflow-visible rounded-2xl border border-border/80 bg-background/95 shadow-[0_20px_60px_rgb(2_6_23_/_0.45)] backdrop-blur-xl transition lg:hidden",
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          ].join(" ")}
          hidden={!isMenuOpen}
        >
          <div className="flex flex-col p-2">
            {navigationItems.filter((item) => item.showInMobile).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(event) =>
                  handleNavigationClick(event, item.href, item.type)
                }
                className="min-h-12 rounded-xl px-4 py-3 text-sm font-semibold text-text transition hover:bg-surface-soft hover:text-accent focus:outline-none focus-visible:bg-surface-soft focus-visible:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <ThemeSwitcher
              inlineMenu
              className="mt-2"
              onThemeChange={closeMobileMenu}
            />
            {siteConfig.resume.path ? (
              <a
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-accent-dark bg-[var(--color-button-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-button-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                download={siteConfig.resume.download}
                href={siteConfig.resume.path}
                onClick={closeMobileMenu}
              >
                <Download size={16} />
                {siteConfig.resume.label}
              </a>
            ) : (
              <span className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold text-muted">
                {siteConfig.resume.label} coming soon
              </span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
