export type EducationItem = {
  school: string;
  degree: string;
  timeline?: string;
  details?: string[];
};

export const education: EducationItem[] = [
  {
    school: "University of Washington Bothell",
    degree: "Bachelor of Arts in Applied Computing",
  },
  {
    school: "University of Washington Bothell",
    degree: "Bachelor of Science in Data Visualization",
  },
];
