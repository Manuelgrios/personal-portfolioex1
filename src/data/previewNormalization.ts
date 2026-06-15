import { type EducationItem } from "./education";
import { type ExperienceItem } from "./experience";
import { type NavigationItem } from "./navigation";
import { profile as staticProfile, type CtaLink, type Profile } from "./profile";
import { type Project, type ProjectLink } from "./projects";
import { siteConfig as staticSiteConfig } from "./siteConfig";
import { type SkillCategory, type SkillItem } from "./skills";
import { type SocialLink } from "./socialLinks";
import { getThemeById } from "./themes";
import type { FolioDevTemplatePreviewData } from "../preview/previewMessages";

/**
 * Strict FolioDev preview normalization.
 *
 * This module owns the FolioDev-preview data contract. When the template renders a FolioDev preview
 * message, EVERY rendered value must come from FolioDev. Empty user data stays empty: no demo projects,
 * skills, links, education, experience, about copy, or hero/profile content is ever revived from the
 * template's static example data. Malformed entries are dropped, never turned into "Project 1" /
 * "Project details coming soon".
 *
 * The template's standalone example site is unaffected: it is served by `staticRuntimeData` in
 * `runtimeData.tsx` (the RuntimeDataProvider default), which never calls this module.
 *
 * The only static values referenced here are harmless UI chrome that never impersonate user data:
 * section labels (eyebrow/heading text such as "About", "Projects") and siteConfig chrome (theme,
 * copyright, document title). User identity and content fields have no static fallback.
 */

type RecordLike = Record<string, unknown>;
type AboutInfoIconKey = Profile["sections"]["about"]["infoGroups"][number]["iconKey"];
type ProjectIcon = Project["icon"];

const aboutInfoIconKeys = new Set<AboutInfoIconKey>(["education", "code", "chart"]);
const projectIcons = new Set<ProjectIcon>(["code", "box", "flask", "terminal", "apple", "chart"]);

export type RuntimeSiteConfig = {
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
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  skillItems: SkillItem[];
  education: EducationItem[];
  socialLinks: SocialLink[];
  navigationItems: NavigationItem[];
  editorPlaceholderPolicy: {
    projects: "hide-placeholder" | "show-editor-placeholder";
  };
  /**
   * Editor-only flag: true only in FolioDev workspace preview (normalizePreviewData). It lets the
   * template render neutral display-only placeholders for empty required fields. It never affects the
   * real data above (which stays strictly empty), is never set on the standalone or published runtime,
   * and is never serialized into generated portfolio files.
   */
  editorPlaceholders: boolean;
};

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

function hasValidDomain(hostname: string) {
  const normalizedHost = hostname.toLowerCase();

  if (normalizedHost === "localhost") {
    return true;
  }

  if (!normalizedHost.includes(".")) {
    return false;
  }

  return normalizedHost
    .split(".")
    .every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label));
}

function isValidMailto(value: string) {
  const email = value.replace(/^mailto:/i, "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return hasValidDomain(url.hostname) ? value : "";
  } catch {
    return "";
  }
}

function normalizeUrl(value: unknown): string {
  const url = text(value);

  if (!url) {
    return "";
  }

  if (/\s/.test(url)) {
    return "";
  }

  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  if (url.startsWith("#")) {
    return url;
  }

  const schemeMatch = /^[a-zA-Z][a-zA-Z\d+.-]*:/.exec(url);
  const scheme = schemeMatch?.[0].toLowerCase() ?? "";

  if (["javascript:", "data:", "file:", "blob:", "chrome:", "about:"].includes(scheme)) {
    return "";
  }

  if (scheme === "mailto:") {
    return isValidMailto(url) ? url : "";
  }

  if (scheme === "http:" || scheme === "https:") {
    return normalizeHttpUrl(url);
  }

  if (scheme) {
    return "";
  }

  return normalizeHttpUrl(`https://${url}`);
}

function displayUrl(value: string): string {
  const linkedInHandle = value.match(/linkedin\.com\/in\/([^/?#]+)/i)?.[1];
  if (linkedInHandle) {
    return linkedInHandle;
  }
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function normalizeEditorPlaceholderPolicy(value: unknown): TemplateRuntimeData["editorPlaceholderPolicy"] {
  const metadata = asRecord(value);
  const curation = asRecord(metadata.curation);
  const emptySections = asRecord(curation.emptySections);
  const projectPolicy = text(emptySections.projects);

  return {
    projects: projectPolicy === "hide-placeholder" ? "hide-placeholder" : "show-editor-placeholder",
  };
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

/** Strict CTA: label/href come only from FolioDev. An empty CTA renders no button (Home hides it). */
function normalizeCta(value: unknown): CtaLink {
  const record = asRecord(value);
  return {
    label: text(record.label),
    href: normalizeUrl(record.href),
  };
}

function normalizeSiteConfig(value: unknown): RuntimeSiteConfig {
  const record = asRecord(value);
  const brand = asRecord(record.brand);
  const resume = asRecord(record.resume);
  const theme = asRecord(record.theme);
  const resumePath = normalizeUrl(resume.path);
  const brandName = text(brand.name);
  const brandInitials = text(brand.initials);
  const selectedTheme = getThemeById(text(theme.activeTheme) || staticSiteConfig.theme.activeTheme);

  return {
    // Document title / SEO description / copyright / theme are harmless chrome and may keep a safe default.
    siteTitle: text(record.siteTitle) || text(record.title) || staticSiteConfig.siteTitle,
    seoDescription:
      text(record.seoDescription) ||
      text(record.description) ||
      staticSiteConfig.seoDescription,
    copyrightYear: numberValue(record.copyrightYear, new Date().getFullYear()),
    // Brand is user identity (shown as the person's name/initials) and has no demo fallback.
    brand: {
      initials: brandInitials,
      name: brandName,
      logoText: text(brand.logoText) || brandInitials,
    },
    theme: {
      activeTheme: selectedTheme.id,
      name: selectedTheme.name,
      sectionLabelStyle:
        text(theme.sectionLabelStyle) || staticSiteConfig.theme.sectionLabelStyle,
    },
    // Resume CTA/download only when FolioDev supplied a real resume path.
    resume: {
      label: text(resume.label) || "Resume",
      path: resumePath,
      download: booleanValue(resume.download, Boolean(resumePath)),
    },
  };
}

function normalizeEducation(value: unknown): EducationItem[] {
  // Strict: empty FolioDev education stays empty; no static demo education is revived.
  return recordArray(value)
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
  const experienceSection = asRecord(sections.experience);
  const skillsSection = asRecord(sections.skills);
  const contactSection = asRecord(sections.contact);
  const name = text(record.name) || text(record.fullName) || siteConfig.brand.name;
  const school = text(record.school);
  const major = text(record.major);
  const shortBio = text(record.shortBio);
  const subtitleFallback = [major, school].filter(Boolean).join(" at ");
  const focusAreas = textArray(record.focusAreas);
  const heroHeadline = textArray(hero.headline);
  const aboutBody = textArray(aboutSection.body);
  const enjoyItems = textArray(aboutSection.enjoyItems);
  const aboutInfoGroups = recordArray(aboutSection.infoGroups)
    .map((group) => ({
      iconKey: normalizeAboutInfoIcon(group.iconKey),
      label: text(group.label),
      lines: textArray(group.lines),
    }))
    .filter((group) => group.label || group.lines.length > 0);

  return {
    // User identity / content fields: FolioDev-only, no static demo fallback.
    name,
    headline: text(record.headline),
    subtitle: text(record.subtitle) || subtitleFallback,
    school,
    degrees: education.map((entry) => entry.degree).filter(Boolean),
    location: text(record.location),
    email: text(record.email),
    bio: text(record.bio),
    shortBio,
    focusAreas,
    hero: {
      eyebrow: text(hero.eyebrow),
      headline: heroHeadline,
      highlightedHeadline: text(hero.highlightedHeadline),
      body: text(hero.body) || shortBio,
      primaryCta: normalizeCta(hero.primaryCta),
      secondaryCta: normalizeCta(hero.secondaryCta),
      image: {
        src: text(heroImage.src),
        alt: text(heroImage.alt) || (name ? `Headshot of ${name}` : ""),
      },
    },
    sections: {
      about: {
        // Section labels are harmless UI chrome and may keep a default.
        eyebrow: text(aboutSection.eyebrow) || staticProfile.sections.about.eyebrow,
        heading: text(aboutSection.heading) || (name ? `Hi there, my name is ${name}.` : "About"),
        body: aboutBody,
        infoGroups: aboutInfoGroups,
        enjoyHeading: text(aboutSection.enjoyHeading) || staticProfile.sections.about.enjoyHeading,
        enjoyItems,
      },
      projects: {
        eyebrow: text(projectsSection.eyebrow) || staticProfile.sections.projects.eyebrow,
        heading: text(projectsSection.heading) || staticProfile.sections.projects.heading,
        indexHeading: text(projectsSection.indexHeading) || staticProfile.sections.projects.indexHeading,
        description: text(projectsSection.description) || staticProfile.sections.projects.description,
        viewAllLabel: text(projectsSection.viewAllLabel) || staticProfile.sections.projects.viewAllLabel,
      },
      experience: {
        eyebrow: text(experienceSection.eyebrow) || staticProfile.sections.experience.eyebrow,
        heading: text(experienceSection.heading) || staticProfile.sections.experience.heading,
      },
      skills: {
        eyebrow: text(skillsSection.eyebrow) || staticProfile.sections.skills.eyebrow,
        heading: text(skillsSection.heading) || staticProfile.sections.skills.heading,
        description: text(skillsSection.description),
      },
      contact: {
        eyebrow: text(contactSection.eyebrow) || staticProfile.sections.contact.eyebrow,
        heading: text(contactSection.heading) || staticProfile.sections.contact.heading,
        pageHeading: text(contactSection.pageHeading) || staticProfile.sections.contact.pageHeading,
        body: text(contactSection.body),
      },
    },
  };
}

function normalizeProjects(value: unknown): Project[] {
  // Strict: drop malformed entries (no real title or summary). Never synthesize "Project N" /
  // "Project details coming soon", and never revive static demo projects.
  return recordArray(value)
    .map((project, index): Project | null => {
      const title = text(project.title);
      const summary = text(project.summary) || text(project.description);

      if (!title || !summary) {
        return null;
      }

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
    .filter((project): project is Project => project !== null);
}

function normalizeExperience(value: unknown): ExperienceItem[] {
  // Strict: drop malformed entries; empty FolioDev experience stays empty (no static demo experience).
  return recordArray(value)
    .map((entry, index): ExperienceItem => {
      const title = text(entry.title);
      const organization = text(entry.organization);
      const dates = text(entry.dates) || text(entry.timeline);

      return {
        id: text(entry.id) || slugify([title, organization].filter(Boolean).join("-"), `experience-${index + 1}`),
        title,
        organization,
        location: text(entry.location),
        dates,
        description: text(entry.description),
        highlights: textArray(entry.highlights),
        technologies: textArray(entry.technologies),
      };
    })
    .filter((entry) => entry.title && entry.organization && entry.description);
}

function normalizeSkills(value: unknown) {
  // Strict: empty FolioDev skill groups stay empty; no static demo skill tiles are revived.
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

  return {
    skillCategories: groups,
    skillItems: groups.flatMap((group) => group.items),
  };
}

function normalizeSocialLinks(value: unknown): SocialLink[] {
  // Strict: no links from FolioDev means no social row; no static demo links are revived.
  const record = asRecord(value);
  const email = text(record.email).replace(/^mailto:/i, "");
  const github = normalizeUrl(record.github);
  const linkedIn = normalizeUrl(record.linkedIn) || normalizeUrl(record.linkedin);
  const personalWebsite =
    normalizeUrl(record.personalWebsite) ||
    normalizeUrl(record.portfolio) ||
    normalizeUrl(record.website);
  const links: SocialLink[] = [];

  if (email && isValidMailto(`mailto:${email}`)) {
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

  return links;
}

function normalizeNavigation(
  value: unknown,
  options: { hasExperience?: boolean } = {},
): NavigationItem[] {
  // Strict: use FolioDev-provided navigation only; filter unsafe/empty items but never add static nav.
  const experienceItem: NavigationItem = {
    label: "Experience",
    href: "/#experience",
    type: "section",
    showInMobile: true,
    showInDesktop: true,
  };
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
    .filter((item) => item.label && item.href)
    .filter((item) => {
      const href = item.href.toLowerCase();
      const label = item.label.toLowerCase();
      return options.hasExperience || (href !== "/#experience" && label !== "experience");
    });

  return options.hasExperience && !mapped.some((item) => item.href.toLowerCase() === "/#experience")
    ? mapped.length > 0
      ? [mapped[0], experienceItem, ...mapped.slice(1)]
      : [experienceItem]
    : mapped;
}

/**
 * Normalize a FolioDev preview payload into strict runtime data. This is the FolioDev-preview path:
 * every value comes from FolioDev, and empty user data stays empty.
 */
export function normalizePreviewData(data: FolioDevTemplatePreviewData): TemplateRuntimeData {
  const siteConfig = normalizeSiteConfig(data.siteConfig);
  const education = normalizeEducation(data.education);
  const skills = normalizeSkills(data.skills);
  const experience = normalizeExperience(data.experience);

  return {
    siteConfig,
    profile: normalizeProfile(data.profile, siteConfig, education),
    projects: normalizeProjects(data.projects),
    experience,
    skillCategories: skills.skillCategories,
    skillItems: skills.skillItems,
    education,
    socialLinks: normalizeSocialLinks(data.socialLinks),
    navigationItems: normalizeNavigation(data.navigation, {
      hasExperience: experience.length > 0,
    }),
    editorPlaceholderPolicy: normalizeEditorPlaceholderPolicy(data.metadata),
    // FolioDev workspace preview: enable editor-only placeholders for empty required fields. This is a
    // display hint only; the normalized data above remains strictly empty.
    editorPlaceholders: true,
  };
}
