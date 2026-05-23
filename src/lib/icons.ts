import {
  Apple,
  BarChart3,
  Box,
  Code2,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Mail,
  SquareTerminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconMap = {
  apple: Apple,
  box: Box,
  chart: BarChart3,
  code: Code2,
  education: GraduationCap,
  external: ExternalLink,
  flask: FlaskConical,
  github: Code2,
  linkedin: GraduationCap,
  mail: Mail,
  terminal: SquareTerminal,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconMap;

export function getIcon(iconKey?: string): LucideIcon {
  if (iconKey && iconKey in iconMap) {
    return iconMap[iconKey as IconKey];
  }

  return Code2;
}
