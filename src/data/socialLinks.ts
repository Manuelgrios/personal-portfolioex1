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
    value: "Your LinkedIn profile",
    href: "https://www.linkedin.com/",
    iconKey: "linkedin",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    value: "Your GitHub profile",
    href: "https://github.com/",
    iconKey: "github",
    external: true,
  },
];
