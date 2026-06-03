import type { PortfolioTheme } from "../data/themes";

const storageKey = "portfolio-theme";
const isFolioDevPreviewRuntime = import.meta.env.VITE_FOLIODEV_PREVIEW_RUNTIME === "true";

export const themeStorageKey = storageKey;

export function canUseBrowserStorage() {
  if (isFolioDevPreviewRuntime) {
    return false;
  }

  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

export function readStoredThemeId() {
  if (!canUseBrowserStorage()) {
    return undefined;
  }

  try {
    return window.localStorage.getItem(storageKey) ?? undefined;
  } catch {
    return undefined;
  }
}

export function storeThemeId(themeId: string) {
  if (!canUseBrowserStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, themeId);
  } catch {
    // Preview iframes can run in an opaque origin, where storage access throws.
  }
}

export function applyThemeVariables(theme: PortfolioTheme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  const { imageTreatment, tokens } = theme;

  root.dataset.theme = theme.id;
  root.style.setProperty("--color-background", tokens.background);
  root.style.setProperty("--color-surface", tokens.backgroundSoft);
  root.style.setProperty("--color-surface-soft", tokens.cardHover);
  root.style.setProperty("--color-card", tokens.card);
  root.style.setProperty("--color-card-soft", tokens.cardHover);
  root.style.setProperty("--color-border", tokens.border);
  root.style.setProperty("--color-accent", tokens.accent);
  root.style.setProperty("--color-accent-dark", tokens.accentSoft);
  root.style.setProperty("--color-accent-strong", tokens.borderStrong);
  root.style.setProperty("--color-text", tokens.text);
  root.style.setProperty("--color-muted", tokens.mutedText);
  root.style.setProperty("--color-button-primary", tokens.buttonPrimary);
  root.style.setProperty("--color-button-primary-hover", tokens.buttonPrimaryHover);
  root.style.setProperty("--color-button-secondary", tokens.buttonSecondary);
  root.style.setProperty("--color-focus-ring", tokens.focusRing);
  root.style.setProperty("--theme-accent-glow", tokens.accentGlow);
  root.style.setProperty("--theme-grid", tokens.grid);
  root.style.setProperty("--theme-card-shadow", `0 0 48px ${tokens.accentGlow}`);
  root.style.setProperty("--theme-hero-image-filter", imageTreatment.filter);
  root.style.setProperty("--theme-hero-image-glow", imageTreatment.glow);
  root.style.setProperty("--theme-hero-image-shadow", imageTreatment.shadow);
  root.style.setProperty(
    "--theme-hero-image-wash",
    imageTreatment.backgroundWash ?? "transparent",
  );
}

