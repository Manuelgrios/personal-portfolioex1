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
    category: "Skill group one",
    items: [
      { name: "Skill one", shortLabel: "S1", category: "Skill group one" },
      { name: "Skill two", shortLabel: "S2", category: "Skill group one" },
      { name: "Skill three", shortLabel: "S3", category: "Skill group one" },
    ],
  },
  {
    category: "Skill group two",
    items: [
      { name: "Skill four", shortLabel: "S4", category: "Skill group two" },
      { name: "Skill five", shortLabel: "S5", category: "Skill group two" },
      { name: "Skill six", shortLabel: "S6", category: "Skill group two" },
    ],
  },
  {
    category: "Skill group three",
    items: [
      { name: "Skill seven", shortLabel: "S7", category: "Skill group three" },
      { name: "Skill eight", shortLabel: "S8", category: "Skill group three" },
    ],
  },
];

export const skillItems: SkillItem[] = skillCategories.flatMap(
  (category) => category.items,
);
