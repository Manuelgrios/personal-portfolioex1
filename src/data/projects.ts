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
    slug: "chrome-extension-deployment-workflow",
    title: "Chrome Extension Deployment Workflow",
    category: "Automation",
    summary:
      "Designed a GitHub Actions workflow for building, packaging, and preparing a Chrome extension release. The project focused on reducing manual deployment steps and making the release process easier to review.",
    description:
      "A release workflow project focused on turning a manual Chrome extension deployment path into a repeatable process.",
    tags: ["JavaScript", "GitHub Actions", "Semantic Versioning"],
    icon: "code",
    featured: true,
    overview:
      "Designed a GitHub Actions workflow for a Chrome extension build process, with versioning, packaging, and deployment checks separated into repeatable steps.",
    challenge:
      "The extension release process depended on manual build, packaging, and versioning steps that were easy to skip or apply inconsistently.",
    approach:
      "Separated release behavior into smaller workflow steps so the build path could be reviewed, repeated, and adjusted without relying on memory.",
    workflow: [
      "Prepare extension build artifacts",
      "Run packaging checks",
      "Keep versioning and release preparation visible in the workflow",
    ],
    results: [
      "Reduced the number of manual release steps by moving the process into a repeatable workflow.",
      "Made release behavior easier to audit before publishing.",
    ],
    technologies: ["JavaScript", "GitHub Actions", "Semantic Versioning"],
    interviewTalkingPoints: [
      "Why deployment steps should be separated and named clearly",
      "How CI workflows reduce release mistakes",
      "What should be checked before packaging a browser extension",
    ],
  },
  {
    slug: "unity-mcp-shader-integration",
    title: "Unity MCP + Shader Integration",
    category: "Tools",
    summary:
      "Configured a Unity MCP workflow to inspect scenes, update materials, and test shader changes through external tool calls. The main work was debugging the MCP connection and making shader iteration more repeatable.",
    description:
      "A Unity tooling project focused on connecting MCP actions to scene inspection, material updates, and shader iteration.",
    tags: ["C#", "Unity", "MCP", "Shaders"],
    icon: "box",
    featured: true,
    overview:
      "Configured a Unity MCP workflow to inspect scenes, update materials, and test shader changes through external tool calls.",
    challenge:
      "Unity and MCP needed a reliable connection before external tool calls could inspect scene objects, update materials, or support shader testing.",
    approach:
      "Debugged startup, dependency, and handshake behavior before validating which Unity actions could be controlled externally.",
    workflow: [
      "Start and verify the MCP connection",
      "Inspect available Unity scene and material actions",
      "Update materials and test shader changes through tool calls",
    ],
    results: [
      "Made shader iteration easier to explain and repeat.",
      "Clarified the setup steps needed before MCP actions can control Unity behavior.",
    ],
    technologies: ["C#", "Unity", "MCP", "Shaders"],
    interviewTalkingPoints: [
      "How external tool calls can fit into a game-engine workflow",
      "How to debug startup and connection issues",
      "Why repeatable shader iteration matters during experimentation",
    ],
  },
  {
    slug: "flask-login-external-post-debugging",
    title: "Flask Login + External POST Debugging",
    category: "Backend Debugging",
    summary:
      "Built a Flask login flow and traced request failures across routes, HTTP methods, form data, and external POST calls. The project focused on separating backend logic errors from endpoint and network configuration issues.",
    description:
      "A backend debugging project focused on authentication routes, request handling, and external POST behavior.",
    tags: ["Python", "Flask", "MySQL", "ngrok"],
    icon: "flask",
    featured: true,
    overview:
      "Built a Flask login flow and traced request failures across routes, HTTP methods, form data, and external POST calls.",
    challenge:
      "The backend needed clearer debugging around GET and POST behavior, form data, external POST requests, and HTTP versus HTTPS or port mismatches.",
    approach:
      "Read route behavior and logs separately from endpoint configuration so 404, 500, SSL, and request-formatting errors could be diagnosed in the right layer.",
    features: [
      "Flask route handling",
      "Login form processing",
      "External POST request testing",
      "Local endpoint exposure through ngrok",
    ],
    results: [
      "Made the debugging process easier by separating routing, request formatting, and endpoint configuration issues.",
      "Clarified when failures came from backend logic versus network or URL configuration.",
    ],
    technologies: ["Python", "Flask", "MySQL", "ngrok"],
    interviewTalkingPoints: [
      "How to debug HTTP method mismatches",
      "How logs help separate 404, 500, and SSL issues",
      "Why local tunneling changes endpoint assumptions",
    ],
  },
  {
    slug: "sorted-linked-list-dynamic-memory",
    title: "Sorted Linked List with Dynamic Memory",
    category: "Data Structures",
    summary:
      "Implemented a sorted C++ linked list with deep-copy ownership, duplicate rejection, and an O(n+m) merge path using pointer splicing. Testing focused on memory safety, sorted order, and edge-case behavior.",
    description:
      "A C++ data structures project focused on manual ownership, sorted insertion, and safe linked-list operations.",
    tags: ["C++", "Data Structures", "Pointers", "Memory Safety"],
    icon: "terminal",
    featured: true,
    overview:
      "Implemented a sorted C++ linked list with deep-copy ownership, duplicate rejection, and an O(n+m) merge path using pointer splicing.",
    challenge:
      "The data structure needed sorted insert behavior, duplicate rejection, deep-copy ownership, and safe cleanup without relying on container abstractions.",
    approach:
      "Implemented ownership behavior directly, including the Rule of Three, then tested sorted order and edge cases where pointer mistakes are most likely.",
    features: [
      "Sorted insertion",
      "Duplicate rejection",
      "Deep copy ownership",
      "O(n+m) merge by pointer splicing",
    ],
    results: [
      "Validated memory behavior with targeted tests and sanitizer-style checks.",
      "Kept merge behavior linear by splicing existing nodes instead of rebuilding the list.",
    ],
    technologies: ["C++", "Data Structures", "Pointers", "Memory Safety"],
    interviewTalkingPoints: [
      "Why the Rule of Three matters for owning raw pointers",
      "How pointer splicing changes merge complexity",
      "How to test edge cases in linked structures",
    ],
  },
  {
    slug: "apple-developer-hiring-research",
    title: "Apple Developer Hiring Research",
    category: "Research",
    summary:
      "Analyzed Apple's developer hiring process, including interview structure, compensation signals, work expectations, and fairness concerns. The research organized scattered hiring information into practical candidate guidance.",
    description:
      "A research project focused on organizing public hiring information into practical guidance for developer candidates.",
    tags: ["Research", "Technical Interviews", "Career Analysis"],
    icon: "apple",
    featured: true,
    overview:
      "Analyzed Apple's developer hiring process, including interview structure, compensation signals, work expectations, and fairness concerns.",
    challenge:
      "Information about developer hiring can be scattered across job posts, interview reports, compensation discussions, and candidate advice.",
    approach:
      "Grouped research by hiring stage and topic so candidate preparation advice could be separated from speculation or unsupported claims.",
    results: [
      "Organized scattered hiring information into practical candidate guidance.",
      "Organized the research around interview structure, work expectations, compensation signals, and fairness considerations.",
    ],
    technologies: ["Research", "Technical Interviews", "Career Analysis"],
    interviewTalkingPoints: [
      "How to evaluate hiring information from mixed sources",
      "How fairness concerns affect candidate preparation",
      "Why research findings should be separated from personal advice",
    ],
  },
  {
    slug: "data-visualization-portfolio-direction",
    title: "Data Visualization Portfolio Direction",
    category: "Data Visualization",
    summary:
      "Defined the structure for a data visualization portfolio focused on readable charts, clear metrics, and practical analysis. The goal was to frame future projects around decisions, not just visuals.",
    description:
      "A planning project that defines how future data visualization work should be selected, structured, and explained.",
    tags: ["Python", "Data Visualization", "Pandas", "Matplotlib"],
    icon: "chart",
    featured: true,
    overview:
      "Defined the structure for a data visualization portfolio focused on readable charts, clear metrics, and practical analysis.",
    challenge:
      "Future analytics work needed a consistent structure for choosing datasets, selecting chart types, and explaining what each visualization helps someone decide.",
    approach:
      "Framed future projects around decisions and analysis questions before choosing visuals, so charts support an explanation instead of acting as decoration.",
    results: [
      "Created a direction for portfolio projects centered on readable charts and clear metrics.",
      "Established a practical structure for explaining what each visualization helps evaluate.",
    ],
    technologies: ["Python", "Data Visualization", "Pandas", "Matplotlib"],
    interviewTalkingPoints: [
      "How to choose chart types based on the question being answered",
      "Why readable visuals matter more than decorative complexity",
      "How to connect visualizations to decisions",
    ],
  },
];
