import { createContext, useContext, type ReactNode } from "react";
import {
  education as staticEducation,
  type EducationItem,
} from "./education";
import { navigationItems as staticNavigationItems, type NavigationItem } from "./navigation";
import { profile as staticProfile, type CtaLink, type Profile } from "./profile";
import {
  projects as staticProjects,
  type Project,
  type ProjectLink,
} from "./projects";
import { siteConfig as staticSiteConfig } from "./siteConfig";
import { skillCategories as staticSkillCategories, skillItems as staticSkillItems, type SkillCategory, type SkillItem } from "./skills";
import { socialLinks as staticSocialLinks, type SocialLink } from "./socialLinks";
import type { FolioDevTemplatePreviewData } from "../preview/previewMessages";

type RuntimeSiteConfig = {
  siteTitle: string;
  seoDescription: string;
  copyrightYear: number;
  brand: {
    initials: string;
    name: string;
    logoText: string;
  };
  theme: {
    activeTheme: string;
    name: string;
    sectionLabelStyle: string;
  };
  resume: {
    label: string;
    path: string;
    download: boolean;
  };
};

export type TemplateRuntimeData = {
  siteConfig: RuntimeSiteConfig;
  profile: Profile;
  projects: Project[];
  skillCategories: SkillCategory[];
  skillItems: SkillItem[];
  education: EducationItem[];
  socialLinks: SocialLink[];
  navigationItems: NavigationItem[];
};

type RecordLike = Record<string, unknown>;
type AboutInfoIconKey = Profile["sections"]["about"]["infoGroups"][number]["iconKey"];
type ProjectIcon = Project["icon"];

const aboutInfoIconKeys = new Set<AboutInfoIconKey>(["education", "code", "chart"]);
const projectIcons = new Set<ProjectIcon>(["code", "box", "flask", "terminal", "apple", "chart"]);

const staticRuntimeData: TemplateRuntimeData = {
  siteConfig: staticSiteConfig,
  profile: staticProfile,
  projects: staticProjects,
  skillCategories: staticSkillCategories,
  skillItems: staticSkillItems,
  education: staticEducation,
  socialLinks: staticSocialLinks,
  navigationItems: staticNavigationItems,
};

const RuntimeDataContext = createContext<TemplateRuntimeData>(staticRuntimeData);

function isRecord(value: unknown): value is RecordLike {
  return typeof value === "object" && value !== null;
}

function asRecord(value: unknown): RecordLike {
  return isRecord(value) ? value : {};
}

function text(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  return "";
}

function textArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(text).filter(Boolean);
}

function recordArray(value: unknown): RecordLike[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

function booleanValue(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function numberValue(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 1900 ? parsed : fallback;
}

function normalizeUrl(value: unknown): string {
  const url = text(value);

  if (!url) {
    return "";
  }

  if (/^(https?:|mailto:|\/|#)/i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function displayUrl(value: string): string {
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function shortLabel(value: string): string {
  const uppercaseLetters = value.replace(/[^A-Z0-9+#]/g, "").slice(0, 4);

  if (uppercaseLetters.length >= 2) {
    return uppercaseLetters;
  }

  return (
    value
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 4)
      .toUpperCase() || "SK"
  );
}

function normalizeAboutInfoIcon(value: unknown): AboutInfoIconKey {
  const iconKey = text(value);
  return aboutInfoIconKeys.has(iconKey as AboutInfoIconKey)
    ? (iconKey as AboutInfoIconKey)
    : "code";
}

function normalizeProjectIcon(value: unknown): ProjectIcon {
  const iconKey = text(value);
  return projectIcons.has(iconKey as ProjectIcon) ? (iconKey as ProjectIcon) : "code";
}

function normalizeCta(value: unknown, fallback: CtaLink): CtaLink {
  const record = asRecord(value);
  return {
    label: text(record.label) || fallback.label,
    href: text(record.href) || fallback.href,
  };
}

function normalizeSiteConfig(value: unknown): RuntimeSiteConfig {
  const record = asRecord(value);
  const brand = asRecord(record.brand);
  const resume = asRecord(record.resume);
  const theme = asRecord(record.theme);
  const resumePath = normalizeUrl(resume.path);

  return {
    siteTitle: text(record.siteTitle) || text(record.title) || staticSiteConfig.siteTitle,
    seoDescription:
      text(record.seoDescription) ||
      text(record.description) ||
      staticSiteConfig.seoDescription,
    copyrightYear: numberValue(record.copyrightYear, staticSiteConfig.copyrightYear),
    brand: {
      initials: text(brand.initials) || staticSiteConfig.brand.initials,
      name: text(brand.name) || staticSiteConfig.brand.name,
      logoText:
        text(brand.logoText) ||
        text(brand.initials) ||
        staticSiteConfig.brand.logoText,
    },
    theme: {
      activeTheme: text(theme.activeTheme) || staticSiteConfig.theme.activeTheme,
      name: text(theme.name) || staticSiteConfig.theme.name,
      sectionLabelStyle:
        text(theme.sectionLabelStyle) || staticSiteConfig.theme.sectionLabelStyle,
    },
    resume: {
      label: text(resume.label) || staticSiteConfig.resume.label,
      path: resumePath,
      download: booleanValue(resume.download, Boolean(resumePath)),
    },
  };
}

function normalizeEducation(value: unknown): EducationItem[] {
  const mapped = recordArray(value)
    .map((entry) => {
      const school = text(entry.school);
      const degree = text(entry.degree);
      const major = text(entry.major);
      const graduationYear = text(entry.graduationYear);
      const notes = text(entry.notes);
      const degreeLabel = [degree, major].filter(Boolean).join(" in ") || degree || major;

      return {
        school,
        degree: degreeLabel,
        timeline: graduationYear ? `Expected ${graduationYear}` : "",
        details: notes ? [notes] : [],
      };
    })
    .filter((entry) => entry.school || entry.degree);

  return mapped.length > 0 ? mapped : staticEducation;
}

function normalizeProfile(
  value: unknown,
  siteConfig: RuntimeSiteConfig,
  education: EducationItem[],
): Profile {
  const record = asRecord(value);
  const hero = asRecord(record.hero);
  const heroImage = asRecord(hero.image);
  const sections = asRecord(record.sections);
  const aboutSection = asRecord(sections.about);
  const projectsSection = asRecord(sections.projects);
  const skillsSection = asRecord(sections.skills);
  const contactSection = asRecord(sections.contact);
  const name = text(record.name) || text(record.fullName) || siteConfig.brand.name;
  const school = text(record.school) || staticProfile.school;
  const major = text(record.major);
  const shortBio = text(record.shortBio) || staticProfile.shortBio;
  const focusAreas = textArray(record.focusAreas);
  const heroHeadline = textArray(hero.headline);
  const aboutBody = textArray(aboutSection.body);
  const enjoyItems = textArray(aboutSection.enjoyItems);
  const aboutInfoGroups = recordArray(aboutSection.infoGroups).map((group) => ({
    iconKey: normalizeAboutInfoIcon(group.iconKey),
    label: text(group.label),
    lines: textArray(group.lines),
  }));

  return {
    name,
    headline: text(record.headline) || staticProfile.headline,
    subtitle:
      text(record.subtitle) ||
      [major, school].filter(Boolean).join(" at ") ||
      staticProfile.subtitle,
    school,
    degrees: education.map((entry) => entry.degree).filter(Boolean),
    location: text(record.location) || staticProfile.location,
    email: text(record.email) || staticProfile.email,
    bio: text(record.bio) || staticProfile.bio,
    shortBio,
    focusAreas: focusAreas.length > 0 ? focusAreas : staticProfile.focusAreas,
    hero: {
      eyebrow:
        text(hero.eyebrow) ||
        [major, school].filter(Boolean).join(" at ") ||
        staticProfile.hero.eyebrow,
      headline: heroHeadline.length > 0 ? heroHeadline : staticProfile.hero.headline,
      highlightedHeadline:
        text(hero.highlightedHeadline) ||
        major ||
        staticProfile.hero.highlightedHeadline,
      body: text(hero.body) || shortBio || staticProfile.hero.body,
      primaryCta: normalizeCta(hero.primaryCta, staticProfile.hero.primaryCta),
      secondaryCta: normalizeCta(hero.secondaryCta, staticProfile.hero.secondaryCta),
      image: {
        src: text(heroImage.src),
        alt: text(heroImage.alt) || `Headshot of ${name}`,
      },
    },
    sections: {
      about: {
        eyebrow: text(aboutSection.eyebrow) || staticProfile.sections.about.eyebrow,
        heading:
          text(aboutSection.heading) ||
          `Hi there, my name is ${name}.`,
        body: aboutBody.length > 0 ? aboutBody : staticProfile.sections.about.body,
        infoGroups:
          aboutInfoGroups.length > 0
            ? aboutInfoGroups
            : staticProfile.sections.about.infoGroups,
        enjoyHeading:
          text(aboutSection.enjoyHeading) ||
          staticProfile.sections.about.enjoyHeading,
        enjoyItems:
          enjoyItems.length > 0 ? enjoyItems : staticProfile.sections.about.enjoyItems,
      },
      projects: {
        eyebrow:
          text(projectsSection.eyebrow) || staticProfile.sections.projects.eyebrow,
        heading:
          text(projectsSection.heading) || staticProfile.sections.projects.heading,
        indexHeading:
          text(projectsSection.indexHeading) ||
          staticProfile.sections.projects.indexHeading,
        description:
          text(projectsSection.description) ||
          staticProfile.sections.projects.description,
        viewAllLabel:
          text(projectsSection.viewAllLabel) ||
          staticProfile.sections.projects.viewAllLabel,
      },
      skills: {
        eyebrow: text(skillsSection.eyebrow) || staticProfile.sections.skills.eyebrow,
        heading: text(skillsSection.heading) || staticProfile.sections.skills.heading,
        description:
          text(skillsSection.description) ||
          staticProfile.sections.skills.description,
      },
      contact: {
        eyebrow:
          text(contactSection.eyebrow) || staticProfile.sections.contact.eyebrow,
        heading:
          text(contactSection.heading) || staticProfile.sections.contact.heading,
        pageHeading:
          text(contactSection.pageHeading) ||
          staticProfile.sections.contact.pageHeading,
        body: text(contactSection.body) || staticProfile.sections.contact.body,
      },
    },
  };
}

function normalizeProjects(value: unknown): Project[] {
  const mapped = recordArray(value)
    .map((project, index): Project => {
      const title = text(project.title) || `Project ${index + 1}`;
      const summary =
        text(project.summary) ||
        text(project.description) ||
        "Project details coming soon.";
      const description = text(project.description) || summary;
      const technologies = textArray(project.technologies);
      const tags = textArray(project.tags);
      const githubUrl = normalizeUrl(project.githubUrl);
      const liveDemoUrl = normalizeUrl(project.liveDemoUrl);
      const links = [
        githubUrl ? { label: "GitHub", href: githubUrl } : undefined,
        liveDemoUrl ? { label: "Live Demo", href: liveDemoUrl } : undefined,
      ].filter((link): link is ProjectLink => Boolean(link));
      const outcome = text(project.outcome);
      const results = textArray(project.results);

      return {
        slug: text(project.slug) || slugify(title, `project-${index + 1}`),
        title,
        category: text(project.category) || "Project",
        summary,
        description,
        tags: tags.length > 0 ? tags : technologies,
        icon: normalizeProjectIcon(project.icon),
        featured: booleanValue(project.featured, index < 3),
        links,
        overview: text(project.overview) || description,
        challenge: text(project.challenge) || text(project.problemSolved),
        approach: text(project.approach),
        features: textArray(project.features),
        workflow: textArray(project.workflow),
        results: results.length > 0 ? results : outcome ? [outcome] : [],
        technologies,
        interviewTalkingPoints: textArray(project.interviewTalkingPoints),
      };
    })
    .filter((project) => project.title || project.summary);

  return mapped.length > 0 ? mapped : staticProjects;
}

function normalizeSkills(value: unknown) {
  const record = asRecord(value);
  const groups = recordArray(record.groups)
    .map((group): SkillCategory => {
      const category = text(group.category) || "Skills";
      const items = recordArray(group.items)
        .map((item): SkillItem => {
          const name = text(item.name);
          const iconKey = text(item.iconKey);

          return {
            name,
            shortLabel: text(item.shortLabel) || shortLabel(name),
            category: text(item.category) || category,
            ...(iconKey ? { iconKey } : {}),
          };
        })
        .filter((item) => item.name);

      return { category, items };
    })
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) {
    return {
      skillCategories: staticSkillCategories,
      skillItems: staticSkillItems,
    };
  }

  return {
    skillCategories: groups,
    skillItems: groups.flatMap((group) => group.items),
  };
}

function normalizeSocialLinks(value: unknown): SocialLink[] {
  const record = asRecord(value);
  const email = text(record.email).replace(/^mailto:/i, "");
  const github = normalizeUrl(record.github);
  const linkedIn = normalizeUrl(record.linkedIn) || normalizeUrl(record.linkedin);
  const personalWebsite =
    normalizeUrl(record.personalWebsite) ||
    normalizeUrl(record.portfolio) ||
    normalizeUrl(record.website);
  const links: SocialLink[] = [];

  if (email) {
    links.push({
      key: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      iconKey: "mail",
    });
  }

  if (linkedIn) {
    links.push({
      key: "linkedin",
      label: "LinkedIn",
      value: displayUrl(linkedIn),
      href: linkedIn,
      iconKey: "linkedin",
      external: true,
    });
  }

  if (github) {
    links.push({
      key: "github",
      label: "GitHub",
      value: displayUrl(github),
      href: github,
      iconKey: "github",
      external: true,
    });
  }

  if (personalWebsite) {
    links.push({
      key: "portfolio",
      label: "Website",
      value: displayUrl(personalWebsite),
      href: personalWebsite,
      iconKey: "external",
      external: true,
    });
  }

  return links.length > 0 ? links : staticSocialLinks;
}

function normalizeNavigation(value: unknown): NavigationItem[] {
  const mapped = recordArray(value)
    .filter((item) => item.enabled !== false)
    .map((item) => {
      const href = text(item.href) || "/";

      return {
        label: text(item.label) || "Section",
        href,
        type: href.startsWith("http") ? "external" : href.includes("#") ? "section" : "route",
        showInMobile: true,
        showInDesktop: true,
      } satisfies NavigationItem;
    })
    .filter((item) => item.label && item.href);

  return mapped.length > 0 ? mapped : staticNavigationItems;
}

export function normalizePreviewData(data: FolioDevTemplatePreviewData): TemplateRuntimeData {
  const siteConfig = normalizeSiteConfig(data.siteConfig);
  const education = normalizeEducation(data.education);
  const skills = normalizeSkills(data.skills);

  return {
    siteConfig,
    profile: normalizeProfile(data.profile, siteConfig, education),
    projects: normalizeProjects(data.projects),
    skillCategories: skills.skillCategories,
    skillItems: skills.skillItems,
    education,
    socialLinks: normalizeSocialLinks(data.socialLinks),
    navigationItems: normalizeNavigation(data.navigation),
  };
}

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
