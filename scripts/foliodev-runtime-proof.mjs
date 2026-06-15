// Proof for the strict FolioDev preview normalization contract (T0302).
//
// Verifies that normalizePreviewData (FolioDev preview mode) never revives the template's static
// example data: empty user data stays empty, malformed entries are dropped, and no static
// projects/skills/social/education/experience/about/nav content leaks. Also verifies the standalone
// template example data still exists (the standalone demo is unaffected).
//
// No real user data, no secrets, no network. Pure transpile-and-assert.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "../node_modules/typescript/lib/typescript.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

let failures = 0;
function assert(condition, label) {
  if (condition) {
    console.log(`  ok  ${label}`);
  } else {
    failures += 1;
    console.error(`  FAIL ${label}`);
  }
}

function transpile(source) {
  return ts
    .transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace(/from "(\.\.?\/[^"]+)"/g, 'from "$1.js"');
}

const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "foliodev-template-proof-"));
await fs.writeFile(path.join(tempRoot, "package.json"), JSON.stringify({ type: "module" }));

async function emit(relPath) {
  const source = await fs.readFile(path.join(repoRoot, "src", relPath), "utf8");
  const outPath = path.join(tempRoot, relPath.replace(/\.tsx?$/, ".js"));
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, transpile(source));
}

for (const relPath of [
  "data/education.ts",
  "data/experience.ts",
  "data/navigation.ts",
  "data/profile.ts",
  "data/projects.ts",
  "data/siteConfig.ts",
  "data/skills.ts",
  "data/socialLinks.ts",
  "data/themes.ts",
  "preview/previewMessages.ts",
  "data/previewNormalization.ts",
]) {
  await emit(relPath);
}

// Stub the Vite-only asset helper (import.meta.env) so siteConfig loads in plain Node.
await fs.mkdir(path.join(tempRoot, "lib"), { recursive: true });
await fs.writeFile(path.join(tempRoot, "lib", "assets.js"), "export function assetPath(value) {\n  return value;\n}\n");

const normalizationModule = await import(
  pathToFileURL(path.join(tempRoot, "data", "previewNormalization.js")).href
);
const staticProfileModule = await import(pathToFileURL(path.join(tempRoot, "data", "profile.js")).href);
const staticProjectsModule = await import(pathToFileURL(path.join(tempRoot, "data", "projects.js")).href);
const staticSkillsModule = await import(pathToFileURL(path.join(tempRoot, "data", "skills.js")).href);

const { normalizePreviewData } = normalizationModule;
const staticProfile = staticProfileModule.profile;
const staticProjects = staticProjectsModule.projects;
const staticSkillItems = staticSkillsModule.skillItems;

function emptyPreview(overrides = {}) {
  return {
    siteConfig: { brand: {}, theme: {}, resume: {} },
    profile: {
      sections: { about: {}, projects: {}, experience: {}, skills: {}, contact: {} },
      hero: { image: {} },
    },
    projects: [],
    skills: { groups: [] },
    education: [],
    experience: [],
    socialLinks: {},
    navigation: [],
    ...overrides,
  };
}

function navLabels(runtimeData) {
  return runtimeData.navigationItems.map((item) => item.label).join(",");
}

console.log("FolioDev strict preview normalization proof");

// 2-6, 11. Empty FolioDev payload renders nothing static.
const empty = normalizePreviewData(emptyPreview());
assert(empty.projects.length === 0, "empty projects -> []");
assert(empty.experience.length === 0, "empty experience -> []");
assert(empty.skillItems.length === 0 && empty.skillCategories.length === 0, "empty skills -> no tiles");
assert(empty.socialLinks.length === 0, "empty social links -> []");
assert(empty.education.length === 0, "empty education -> []");
assert(empty.navigationItems.length === 0, "empty navigation -> [] (no static nav)");
assert(empty.profile.sections.about.body.length === 0, "empty about body -> no paragraphs");
assert(empty.profile.sections.about.enjoyItems.length === 0, "empty about enjoy -> none");
assert(empty.profile.headline === "" && empty.profile.bio === "" && empty.profile.shortBio === "", "empty profile text -> empty");
assert(empty.profile.focusAreas.length === 0, "empty focus areas -> []");
assert(empty.profile.location === "" && empty.profile.email === "", "empty location/email -> empty");
assert(empty.profile.hero.headline.length === 0, "empty hero headline -> []");
assert(empty.profile.hero.eyebrow === "", "empty hero eyebrow -> empty");
assert(empty.profile.hero.highlightedHeadline === "", "empty hero highlight -> empty");
assert(empty.profile.hero.image.src === "", "empty hero image -> no image");
assert(empty.profile.hero.primaryCta.href === "" && empty.profile.hero.secondaryCta.href === "", "empty CTAs -> no buttons");

// Editor placeholders: FolioDev preview enables the display-only placeholder layer, but the flag must
// never mutate the strict empty data above (the placeholders live only in Home.tsx rendering).
assert(empty.editorPlaceholders === true, "FolioDev preview enables editorPlaceholders for empty data");
assert(empty.editorPlaceholderPolicy.projects === "show-editor-placeholder", "empty preview keeps project placeholders enabled");
assert(
  empty.projects.length === 0 && empty.skillItems.length === 0 && empty.profile.hero.headline.length === 0,
  "editorPlaceholders flag does not create real projects/skills/name data",
);

const hiddenProjectPlaceholderPolicy = normalizePreviewData(
  emptyPreview({
    metadata: { curation: { emptySections: { projects: "hide-placeholder" } } },
  }),
);
assert(
  hiddenProjectPlaceholderPolicy.editorPlaceholderPolicy.projects === "hide-placeholder",
  "curation metadata can hide project editor placeholder card",
);

// 12 (no static revival). Static demo content is NOT revived for empty FolioDev data.
assert(staticProjects.length > 0 && empty.projects.length === 0, "static demo projects exist but are not revived");
assert(staticSkillItems.length > 0 && empty.skillItems.length === 0, "static demo skills exist but are not revived");
assert(empty.profile.headline !== staticProfile.headline, "profile headline is not the static demo headline");
assert(JSON.stringify(empty.profile.bio) !== JSON.stringify(staticProfile.bio), "profile bio is not the static demo bio");
assert(JSON.stringify(empty.socialLinks) !== JSON.stringify(staticProfile), "social links are not static demo links");

// 7. Malformed project dropped instead of generating "Project 1" / "coming soon".
const malformedProjects = normalizePreviewData(
  emptyPreview({ projects: [{ technologies: ["React"] }, { description: "No title here." }, { title: "Only Title" }] }),
);
assert(malformedProjects.projects.length === 0, "malformed projects dropped (no Project 1 / coming soon)");
const serializedMalformed = JSON.stringify(malformedProjects);
assert(!serializedMalformed.includes("Project 1") && !serializedMalformed.includes("coming soon"), "no synthesized project placeholder text");

const rawProgramProfile = normalizePreviewData(
  emptyPreview({
    profile: {
      major: "Applied Computing B.A. + Data Visualization B.S.",
      school: "University of Washington Bothell",
      sections: { about: {}, projects: {}, experience: {}, skills: {}, contact: {} },
      hero: { image: {} },
    },
  }),
);
assert(
  rawProgramProfile.profile.hero.eyebrow === "" && rawProgramProfile.profile.hero.highlightedHeadline === "",
  "preview mode does not synthesize hero eyebrow/highlight from raw major",
);

// Valid project kept with its real title.
const validProject = normalizePreviewData(
  emptyPreview({ projects: [{ title: "Accessibility Dashboard", summary: "Tracked review status." }] }),
);
assert(validProject.projects.length === 1 && validProject.projects[0].title === "Accessibility Dashboard", "valid project kept with real title");

// 3. Empty skill groups -> no static tiles; valid skill kept.
assert(normalizePreviewData(emptyPreview({ skills: { groups: [] } })).skillItems.length === 0, "empty skill groups -> no static tiles");
const validSkills = normalizePreviewData(emptyPreview({ skills: { groups: [{ category: "Web", items: [{ name: "React" }] }] } }));
assert(validSkills.skillItems.length === 1 && validSkills.skillItems[0].name === "React", "valid skill group kept");

// 4. Empty social -> none; valid link kept.
assert(normalizePreviewData(emptyPreview({ socialLinks: {} })).socialLinks.length === 0, "empty social -> no static icons");
const validSocial = normalizePreviewData(emptyPreview({ socialLinks: { github: "https://github.com/real-student" } }));
assert(validSocial.socialLinks.length === 1 && validSocial.socialLinks[0].key === "github", "valid social link kept");

// 5. Empty education -> []; valid education kept.
assert(normalizePreviewData(emptyPreview({ education: [] })).education.length === 0, "empty education -> []");
const validEducation = normalizePreviewData(emptyPreview({ education: [{ school: "Example University", degree: "B.S." }] }));
assert(validEducation.education.length === 1, "valid education kept");

// 8, 10. Empty/malformed experience dropped and Experience nav hidden.
assert(normalizePreviewData(emptyPreview({ experience: [] })).experience.length === 0, "empty experience -> []");
const malformedExperience = normalizePreviewData(emptyPreview({ experience: [{ title: "Engineer" }] }));
assert(malformedExperience.experience.length === 0, "malformed experience dropped");
assert(
  !malformedExperience.navigationItems.some((item) => item.href === "/#experience"),
  "malformed experience keeps Experience nav hidden",
);

const validExperienceEntry = {
  title: "Software Intern",
  organization: "Example Labs",
  description: "Built accessible components.",
};

const noExperienceEmptyNav = normalizePreviewData(emptyPreview({ experience: [], navigation: [] }));
assert(noExperienceEmptyNav.navigationItems.length === 0, "hasExperience false + empty navigation -> []");

const validExperienceEmptyNav = normalizePreviewData(
  emptyPreview({ experience: [validExperienceEntry], navigation: [] }),
);
assert(
  navLabels(validExperienceEmptyNav) === "Experience",
  "hasExperience true + empty navigation -> [Experience]",
);

const validExperienceInsertedNav = normalizePreviewData(
  emptyPreview({
    experience: [validExperienceEntry],
    navigation: [
      { label: "About", href: "/#about", enabled: true },
      { label: "Projects", href: "/#projects", enabled: true },
    ],
  }),
);
assert(
  navLabels(validExperienceInsertedNav) === "About,Experience,Projects",
  "hasExperience true + [About, Projects] -> [About, Experience, Projects]",
);

const noExperienceWithExperienceNav = normalizePreviewData(
  emptyPreview({
    experience: [],
    navigation: [
      { label: "Experience", href: "/#experience", enabled: true },
      { label: "About", href: "/#about", enabled: true },
    ],
  }),
);
assert(
  navLabels(noExperienceWithExperienceNav) === "About",
  "hasExperience false + navigation containing Experience removes Experience",
);

const validExperienceMalformedNav = normalizePreviewData(
  emptyPreview({ experience: [validExperienceEntry], navigation: ["bad", null] }),
);
assert(
  navLabels(validExperienceMalformedNav) === "Experience",
  "hasExperience true + malformed navigation -> [Experience]",
);

const validExperienceDisabledNav = normalizePreviewData(
  emptyPreview({
    experience: [validExperienceEntry],
    navigation: [{ label: "Experience", href: "/#experience", enabled: false }],
  }),
);
assert(
  navLabels(validExperienceDisabledNav) === "Experience",
  "hasExperience true + disabled Experience nav still shows Experience",
);

// 9, 11. Valid experience renders, Experience nav present; FolioDev nav owns the rest.
const validExperience = normalizePreviewData(
  emptyPreview({
    experience: [validExperienceEntry],
    navigation: [
      { label: "About", href: "/#about", enabled: true },
      { label: "Experience", href: "/#experience", enabled: true },
      { label: "Projects", href: "/#projects", enabled: false },
      { label: "Skills", href: "/#skills", enabled: false },
      { label: "Contact", href: "/#contact", enabled: true },
    ],
  }),
);
assert(validExperience.experience.length === 1, "valid experience kept");
assert(
  validExperience.navigationItems.some((item) => item.href === "/#experience"),
  "Experience nav present when FolioDev sent experience + enabled nav",
);
assert(
  !validExperience.navigationItems.some((item) => item.href === "/#projects"),
  "disabled Projects nav filtered out",
);

// 11. No static navigation items added in FolioDev mode.
const noNav = normalizePreviewData(emptyPreview({ navigation: [] }));
assert(noNav.navigationItems.length === 0, "no static navigation added when FolioDev sent none");

// Stale or unsupported themes fall back to the supported default and do not revive static content.
const staleTheme = normalizePreviewData(
  emptyPreview({ siteConfig: { brand: {}, theme: { activeTheme: "enterprise-gradient" }, resume: {} } }),
);
assert(
  staleTheme.siteConfig.theme.activeTheme === "midnight-blue",
  "stale enterprise-gradient theme id falls back to midnight-blue",
);
assert(
  staleTheme.projects.length === 0 && staleTheme.skillItems.length === 0 && staleTheme.socialLinks.length === 0,
  "empty user data stays empty with stale theme selected",
);

if (failures > 0) {
  console.error(`\nFolioDev strict preview normalization proof FAILED with ${failures} assertion(s).`);
  process.exit(1);
}

console.log("\nFolioDev strict preview normalization proof passed.");
