import {
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "../../data/siteConfig";
import {
  getThemeById,
  themes,
  type ThemeId,
} from "../../data/themes";
import { applyThemeVariables, readStoredThemeId, storeThemeId } from "../../lib/theme";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";
const useBrowserLayoutEffect =
  typeof window === "undefined" ? () => undefined : useLayoutEffect;

type ThemeProviderProps = {
  children: ReactNode;
  disableStorage?: boolean;
  previewThemeId?: string;
};

export function ThemeProvider({
  children,
  disableStorage = false,
  previewThemeId,
}: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const storedThemeId = disableStorage ? undefined : readStoredThemeId();
    return getThemeById(previewThemeId ?? storedThemeId ?? siteConfig.theme.activeTheme).id;
  });

  const currentTheme = getThemeById(previewThemeId ?? themeId);

  useBrowserLayoutEffect(() => {
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      currentTheme,
      themes,
      setTheme(nextThemeId) {
        const nextTheme = getThemeById(nextThemeId);
        setThemeId(nextTheme.id);

        if (!disableStorage && !previewThemeId) {
          storeThemeId(nextTheme.id);
        }
      },
    }),
    [currentTheme, disableStorage, previewThemeId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

