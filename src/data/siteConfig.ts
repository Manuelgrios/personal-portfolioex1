import { assetPath } from "../lib/assets";
import type { ThemeId } from "./themes";

export const siteConfig = {
  siteTitle: "Manuel Garnica | Portfolio",
  seoDescription:
    "Personal portfolio for Manuel Garnica, Applied Computing and Data Visualization student at University of Washington Bothell.",
  copyrightYear: 2026,
  brand: {
    initials: "MG",
    name: "Manuel Garnica",
    logoText: "MG",
  },
  theme: {
    activeTheme: "midnight-blue" satisfies ThemeId,
    name: "Dark navy / electric blue",
    sectionLabelStyle: "uppercase blue text",
  },
  resume: {
    label: "Resume",
    path: assetPath("assets/resume/Manuel_Garnica_Resume.docx"),
    download: true,
  },
};
