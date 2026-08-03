import type { ThemeId } from "./themes";

export const siteConfig = {
  siteTitle: "Portfolio",
  seoDescription:
    "Personal portfolio template. Replace this placeholder content with your own profile, projects, and skills.",
  copyrightYear: 2026,
  brand: {
    initials: "YN",
    name: "Your name",
    logoText: "YN",
  },
  theme: {
    activeTheme: "midnight-blue" satisfies ThemeId,
    name: "Dark navy / electric blue",
    sectionLabelStyle: "uppercase blue text",
  },
  resume: {
    label: "Resume",
    path: "",
    download: false,
  },
};
