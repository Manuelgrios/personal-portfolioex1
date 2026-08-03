export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  icon: "code" | "box" | "flask" | "terminal" | "apple" | "chart";
  featured: boolean;
  links?: ProjectLink[];
  overview?: string;
  challenge?: string;
  approach?: string;
  features?: string[];
  workflow?: string[];
  results?: string[];
  technologies: string[];
  interviewTalkingPoints?: string[];
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project one",
    category: "Your category",
    summary: "Project description will appear here.",
    description: "Project description will appear here.",
    tags: ["Tool one", "Tool two"],
    icon: "code",
    featured: true,
    overview: "Project description will appear here.",
    challenge: "Describe the problem this project solved.",
    approach: "Describe how you approached the work.",
    features: ["Feature one", "Feature two", "Feature three"],
    results: ["Describe the outcome of this project."],
    technologies: ["Tool one", "Tool two"],
    interviewTalkingPoints: [
      "Add a talking point for this project.",
      "Add another talking point.",
    ],
  },
  {
    slug: "project-two",
    title: "Project two",
    category: "Your category",
    summary: "Project description will appear here.",
    description: "Project description will appear here.",
    tags: ["Tool three", "Tool four"],
    icon: "box",
    featured: true,
    overview: "Project description will appear here.",
    challenge: "Describe the problem this project solved.",
    approach: "Describe how you approached the work.",
    workflow: ["Step one", "Step two", "Step three"],
    results: ["Describe the outcome of this project."],
    technologies: ["Tool three", "Tool four"],
    interviewTalkingPoints: [
      "Add a talking point for this project.",
      "Add another talking point.",
    ],
  },
  {
    slug: "project-three",
    title: "Project three",
    category: "Your category",
    summary: "Project description will appear here.",
    description: "Project description will appear here.",
    tags: ["Tool five", "Tool six"],
    icon: "chart",
    featured: true,
    overview: "Project description will appear here.",
    challenge: "Describe the problem this project solved.",
    approach: "Describe how you approached the work.",
    features: ["Feature one", "Feature two"],
    results: ["Describe the outcome of this project."],
    technologies: ["Tool five", "Tool six"],
    interviewTalkingPoints: [
      "Add a talking point for this project.",
      "Add another talking point.",
    ],
  },
];
