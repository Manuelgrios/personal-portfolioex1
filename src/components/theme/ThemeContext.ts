import { createContext } from "react";
import type { PortfolioTheme, ThemeId } from "../../data/themes";

export type ThemeContextValue = {
  currentTheme: PortfolioTheme;
  themes: PortfolioTheme[];
  setTheme: (themeId: ThemeId) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
