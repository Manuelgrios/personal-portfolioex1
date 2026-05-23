import type { Profile } from "../profile";

export const exampleProfile: Profile = {
  name: "Example Student",
  headline: "Building software. Explaining systems. Learning in public.",
  subtitle: "Computer Science Student",
  school: "Example University",
  degrees: ["Bachelor of Science in Computer Science"],
  location: "City, State",
  email: "example@example.com",
  bio:
    "I work on projects that make technical problems easier to understand, test, and communicate.",
  shortBio:
    "I'm a student focused on software tools, debugging, and clear technical communication.",
  focusAreas: ["Software engineering", "Automation", "Debugging"],
  hero: {
    eyebrow: "Computer Science Student",
    headline: ["Building tools.", "Explaining systems."],
    highlightedHeadline: "Learning by shipping.",
    body:
      "I'm a student focused on practical software projects, debugging, and clear technical communication.",
    primaryCta: { label: "View Projects", href: "/#projects" },
    secondaryCta: { label: "Contact Me", href: "/#contact" },
    image: {
      src: "assets/example-headshot.png",
      alt: "Professional headshot of Example Student",
    },
  },
  sections: {
    about: {
      eyebrow: "About Me",
      heading: "Practical. Curious. Clear.",
      body: [
        "I like projects with a clear technical question, a testable approach, and a result that can be explained simply.",
      ],
      infoGroups: [
        {
          iconKey: "education",
          label: "Example University",
          lines: ["Bachelor of Science in Computer Science"],
        },
      ],
      enjoyHeading: "What I enjoy",
      enjoyItems: [
        "Debugging unclear failures",
        "Building small tools",
        "Documenting technical decisions",
      ],
    },
    projects: {
      eyebrow: "Projects",
      heading: "Selected Work",
      indexHeading: "Project index",
      description: "Projects focused on software tools and technical learning.",
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
      body: "I'm open to internships, collaboration, and technical projects.",
    },
  },
};
