export type EducationItem = {
  school: string;
  degree: string;
  timeline?: string;
  details?: string[];
};

export const education: EducationItem[] = [
  {
    school: "Your school",
    degree: "Your degree",
  },
];
