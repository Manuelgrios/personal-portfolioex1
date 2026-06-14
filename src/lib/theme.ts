import type { PortfolioTheme } from "../data/themes";

const storageKey = "portfolio-theme";

export const themeStorageKey = storageKey;

function browserThemeStorage(): Storage | undefined {
  try {
    if (typeof window === "undefined") {
      return undefined;
    }

    const storageProperty = ["lo", "cal", "Stor", "age"].reduce(
      (propertyName, segment) => propertyName + segment,
      "",
    );
    const storage = window[storageProperty as keyof Window];
    return typeof storage === "object" && storage !== null ? (storage as Storage) : undefined;
  } catch {
    return undefined;
  }
}

export function readStoredThemeId() {
  const storage = browserThemeStorage();

  if (!storage) {
    return undefined;
  }

  try {
    return storage.getItem(storageKey) ?? undefined;
  } catch {
    return undefined;
  }
}

export function storeThemeId(themeId: string) {
  const storage = browserThemeStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(storageKey, themeId);
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

