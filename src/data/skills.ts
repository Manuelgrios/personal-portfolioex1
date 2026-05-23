export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

export type SkillItem = {
  name: string;
  shortLabel: string;
  category: string;
  iconKey?: string;
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", shortLabel: "Py", category: "Languages" },
      { name: "JavaScript", shortLabel: "JS", category: "Languages" },
      { name: "TypeScript", shortLabel: "TS", category: "Languages" },
      { name: "C++", shortLabel: "C++", category: "Languages" },
      { name: "C#", shortLabel: "C#", category: "Languages" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", shortLabel: "React", category: "Frontend" },
      { name: "HTML/CSS", shortLabel: "</>", category: "Frontend" },
    ],
  },
  {
    category: "Tools and Frameworks",
    items: [
      { name: "Flask", shortLabel: "Fl", category: "Tools and Frameworks" },
      { name: "Git", shortLabel: "Git", category: "Tools and Frameworks" },
      {
        name: "GitHub Actions",
        shortLabel: "GA",
        category: "Tools and Frameworks",
      },
      { name: "Unity", shortLabel: "U", category: "Tools and Frameworks" },
    ],
  },
  {
    category: "Data and Analysis",
    items: [
      {
        name: "Data Visualization",
        shortLabel: "Viz",
        category: "Data and Analysis",
      },
      { name: "Pandas", shortLabel: "Pd", category: "Data and Analysis" },
      { name: "Matplotlib", shortLabel: "Mpl", category: "Data and Analysis" },
      { name: "Debugging", shortLabel: "Debug", category: "Data and Analysis" },
    ],
  },
];

export const skillItems: SkillItem[] = skillCategories.flatMap(
  (category) => category.items,
);
