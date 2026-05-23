export type NavigationItem = {
  label: string;
  href: string;
  type: "section" | "route" | "external";
  showInMobile: boolean;
  showInDesktop: boolean;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "About",
    href: "/#about",
    type: "section",
    showInMobile: true,
    showInDesktop: true,
  },
  {
    label: "Projects",
    href: "/#projects",
    type: "section",
    showInMobile: true,
    showInDesktop: true,
  },
  {
    label: "Skills",
    href: "/#skills",
    type: "section",
    showInMobile: true,
    showInDesktop: true,
  },
  {
    label: "Contact",
    href: "/#contact",
    type: "section",
    showInMobile: true,
    showInDesktop: true,
  },
];
