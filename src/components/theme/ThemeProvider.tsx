import {
  useEffect,
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
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const storedThemeId = readStoredThemeId();
    return getThemeById(storedThemeId ?? siteConfig.theme.activeTheme).id;
  });

  const currentTheme = getThemeById(themeId);

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
        storeThemeId(nextTheme.id);
      },
    }),
    [currentTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

