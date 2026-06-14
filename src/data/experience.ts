export type ExperienceItem = {
  id: string;
  title: string;
  organization: string;
  location?: string;
  dates?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
};

export const experience: ExperienceItem[] = [];
