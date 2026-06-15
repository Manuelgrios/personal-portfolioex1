import { createContext, useContext, type ReactNode } from "react";
import { education as staticEducation } from "./education";
import { experience as staticExperience } from "./experience";
import { navigationItems as staticNavigationItems } from "./navigation";
import { profile as staticProfile } from "./profile";
import { projects as staticProjects } from "./projects";
import { siteConfig as staticSiteConfig } from "./siteConfig";
import { skillCategories as staticSkillCategories, skillItems as staticSkillItems } from "./skills";
import { socialLinks as staticSocialLinks } from "./socialLinks";
import { type TemplateRuntimeData } from "./previewNormalization";

/**
 * Standalone template example site. This is the demo data used when the template runs on its own (no
 * FolioDev preview payload). FolioDev preview mode never uses this — it is normalized strictly by
 * `normalizePreviewData` so empty user data stays empty.
 */
const staticRuntimeData: TemplateRuntimeData = {
  siteConfig: staticSiteConfig,
  profile: staticProfile,
  projects: staticProjects,
  experience: staticExperience,
  skillCategories: staticSkillCategories,
  skillItems: staticSkillItems,
  education: staticEducation,
  socialLinks: staticSocialLinks,
  navigationItems: staticNavigationItems,
  editorPlaceholderPolicy: {
    projects: "show-editor-placeholder",
  },
  // Standalone and published runtimes never show editor placeholders.
  editorPlaceholders: false,
};

const RuntimeDataContext = createContext<TemplateRuntimeData>(staticRuntimeData);

type RuntimeDataProviderProps = {
  children: ReactNode;
  data?: TemplateRuntimeData | null;
};

export function RuntimeDataProvider({ children, data }: RuntimeDataProviderProps) {
  return (
    <RuntimeDataContext.Provider value={data ?? staticRuntimeData}>
      {children}
    </RuntimeDataContext.Provider>
  );
}

export function useRuntimeData() {
  return useContext(RuntimeDataContext);
}
