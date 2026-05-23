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

const school = "University of Washington Bothell";
const degrees = education.map((item) => item.degree);

export const profile: Profile = {
  name: siteConfig.brand.name,
  headline: "Aspiring Full-Stack Software Engineer.",
  subtitle: "Applied Computing and Data Visualization Student",
  school,
  degrees,
  location: "Seattle, Washington",
  email: "manuelgarios@outlook.com",
  bio:
    "I'm an aspiring software engineer based in Washington with an academic background in Applied Computing and Data Visualization at the University of Washington Bothell. My work focuses on building small but useful software tools, debugging systems, automating workflows, and using data visualization to make technical information easier to understand.",
  shortBio:
    "I'm an Applied Computing and Data Visualization student at the University of Washington Bothell. I build software tools, debug systems, automate workflows, and use visual explanations to make technical problems easier to understand.",
  focusAreas: [
    "Software engineering",
    "Data visualization",
    "Tools and automation",
    "Debugging",
  ],
  hero: {
    eyebrow: "Applied Computing + Data Visualization Student",
    headline: ["Data Science Analyst,", "Software Developer,"],
    highlightedHeadline: "Computer Science",
    body:
      "I'm an Applied Computing and Data Visualization student at the University of Washington Bothell. I build software tools, debug systems, automate workflows, and use visual explanations to make technical problems easier to understand.",
    primaryCta: { label: "View Projects", href: "/#projects" },
    secondaryCta: { label: "Contact Me", href: "/#contact" },
    image: {
      src: "assets/headshot.png",
      alt: "Professional headshot of Manuel Garnica",
    },
  },
  sections: {
    about: {
      eyebrow: "About Me",
      heading: "Hi there, my name is Manuel.",
      body: [
        "I'm an aspiring software engineer based in Washington with an academic background in Applied Computing and Data Visualization at the University of Washington Bothell. My work focuses on software tools, debugging, automation, and data visualization, with projects that help me practice writing cleaner code, testing edge cases, and explaining technical decisions clearly.",
      ],
      infoGroups: [
        {
          iconKey: "education",
          label: "Education",
          lines: degrees,
        },
        {
          iconKey: "code",
          label: "Technical Focus",
          lines: ["Software Engineering", "Automation & Debugging"],
        },
        {
          iconKey: "chart",
          label: "Data Focus",
          lines: ["Data Visualization", "Clear Technical Communication"],
        },
      ],
      enjoyHeading: "What I focus on",
      enjoyItems: [
        "Debugging problems until the cause is clear",
        "Building tools that reduce repeated manual work",
        "Writing code that is easier to test and update",
        "Explaining technical work through clear visuals and documentation",
      ],
    },
    projects: {
      eyebrow: "Projects",
      heading: "Things I've Built",
      indexHeading: "Project index",
      description:
        "Selected projects focused on software tools, automation, debugging, data structures, and data visualization.",
      viewAllLabel: "View All Projects",
    },
    skills: {
      eyebrow: "Skills",
      heading: "Technologies I Work With",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's Connect",
      pageHeading: "Get in touch",
      body:
        "I'm open to internships, project collaboration, and technical work involving software tools, automation, debugging, or data visualization.",
    },
  },
};
