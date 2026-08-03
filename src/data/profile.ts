import { education } from "./education";
import { siteConfig } from "./siteConfig";

export type CtaLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  headline: string;
  subtitle: string;
  school: string;
  degrees: string[];
  location: string;
  email: string;
  bio: string;
  shortBio: string;
  focusAreas: string[];
  hero: {
    eyebrow: string;
    headline: string[];
    highlightedHeadline: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    image: {
      src: string;
      alt: string;
    };
  };
  sections: {
    about: {
      eyebrow: string;
      heading: string;
      body: string[];
      infoGroups: Array<{
        iconKey: "education" | "code" | "chart";
        label: string;
        lines: string[];
      }>;
      enjoyHeading: string;
      enjoyItems: string[];
    };
    projects: {
      eyebrow: string;
      heading: string;
      indexHeading: string;
      description: string;
      viewAllLabel: string;
    };
    experience: {
      eyebrow: string;
      heading: string;
    };
    skills: {
      eyebrow: string;
      heading: string;
      description?: string;
    };
    contact: {
      eyebrow: string;
      heading: string;
      pageHeading: string;
      body: string;
    };
  };
};

const school = "Your school";
const degrees = education.map((item) => item.degree);

export const profile: Profile = {
  name: siteConfig.brand.name,
  headline: "Target role or headline",
  subtitle: "Your program or focus area",
  school,
  degrees,
  location: "Your location",
  email: "you@example.com",
  bio: "Short introduction will appear here.",
  shortBio: "Short introduction will appear here.",
  focusAreas: [
    "Your focus area",
    "Another focus area",
    "One more focus area",
  ],
  hero: {
    eyebrow: "Your headline",
    headline: ["Your name"],
    highlightedHeadline: "Target role or headline",
    body: "Short introduction will appear here.",
    primaryCta: { label: "View Projects", href: "/#projects" },
    secondaryCta: { label: "Contact Me", href: "/#contact" },
    image: {
      src: "assets/headshot-placeholder.svg",
      alt: "Your headshot",
    },
  },
  sections: {
    about: {
      eyebrow: "About Me",
      heading: "About",
      body: [
        "Add a short introduction about yourself, your focus, and what you are building.",
      ],
      infoGroups: [
        {
          iconKey: "education",
          label: "Education",
          lines: degrees,
        },
        {
          iconKey: "code",
          label: "Focus",
          lines: ["Your focus area", "Another focus area"],
        },
        {
          iconKey: "chart",
          label: "Interests",
          lines: ["Your area of interest", "Another area of interest"],
        },
      ],
      enjoyHeading: "What I focus on",
      enjoyItems: [
        "Your focus area",
        "Another focus area",
        "One more focus area",
        "Something you want to learn next",
      ],
    },
    projects: {
      eyebrow: "Projects",
      heading: "Things I've Built",
      indexHeading: "Project index",
      description: "Your selected projects will appear here.",
      viewAllLabel: "View All Projects",
    },
    experience: {
      eyebrow: "Experience",
      heading: "Where I've Worked",
    },
    skills: {
      eyebrow: "Skills",
      heading: "Technologies I Work With",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's Connect",
      pageHeading: "Get in touch",
      body: "Add a short note about the work you are open to.",
    },
  },
};
