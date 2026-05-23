import { profile } from "./profile";

export type SocialLink = {
  key: "email" | "linkedin" | "github" | "leetcode" | "portfolio";
  label: string;
  value: string;
  href: string;
  iconKey: "mail" | "linkedin" | "github" | "code" | "external";
  external?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    iconKey: "mail",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/manuel-garnica-122233252",
    href: "https://www.linkedin.com/in/manuel-garnica-122233252/",
    iconKey: "linkedin",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/Manuelgrios",
    href: "https://github.com/Manuelgrios",
    iconKey: "github",
    external: true,
  },
];
