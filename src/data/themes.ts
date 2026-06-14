export type ThemeId =
  | "midnight-blue"
  | "executive-navy"
  | "data-slate"
  | "graphite-azure"
  | "violet-grid"
  | "clean-light-professional";

export type ThemeTokens = {
  background: string;
  backgroundSoft: string;
  card: string;
  cardHover: string;
  border: string;
  borderStrong: string;
  text: string;
  mutedText: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  grid: string;
  buttonPrimary: string;
  buttonPrimaryHover: string;
  buttonSecondary: string;
  focusRing: string;
};

export type ImageTreatment = {
  filter: string;
  glow: string;
  shadow: string;
  backgroundWash?: string;
};

export type PortfolioTheme = {
  id: ThemeId;
  name: string;
  description: string;
  tokens: ThemeTokens;
  imageTreatment: ImageTreatment;
};

export const themes: PortfolioTheme[] = [
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    description: "The default dark navy palette with electric blue accents.",
    tokens: {
      background: "#05070d",
      backgroundSoft: "#0b1020",
      card: "#08111d",
      cardHover: "#0d1928",
      border: "#22304a",
      borderStrong: "#2563eb",
      text: "#f8fafc",
      mutedText: "#94a3b8",
      accent: "#38bdf8",
      accentSoft: "#2563eb",
      accentGlow: "rgba(37, 99, 235, 0.28)",
      grid: "rgba(56, 189, 248, 0.045)",
      buttonPrimary: "#2563eb",
      buttonPrimaryHover: "#3b82f6",
      buttonSecondary: "rgba(5, 7, 13, 0.45)",
      focusRing: "rgba(56, 189, 248, 0.5)",
    },
    imageTreatment: {
      filter: "brightness(1.02) contrast(1.05) saturate(1.04)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(37, 99, 235, 0.58) 0%, rgba(37, 99, 235, 0.32) 30%, rgba(15, 23, 42, 0.10) 58%, transparent 74%)",
      shadow: "0 0 120px rgba(37, 99, 235, 0.35)",
      backgroundWash:
        "radial-gradient(circle at 50% 56%, rgba(37, 99, 235, 0.22) 0%, transparent 72%)",
    },
  },
  {
    id: "executive-navy",
    name: "Executive Navy",
    description: "A quieter blue palette with refined contrast and softer glow.",
    tokens: {
      background: "#050914",
      backgroundSoft: "#081528",
      card: "#071426",
      cardHover: "#0b1c33",
      border: "#243652",
      borderStrong: "#3b82f6",
      text: "#f8fafc",
      mutedText: "#a5b4c8",
      accent: "#60a5fa",
      accentSoft: "#3b82f6",
      accentGlow: "rgba(59, 130, 246, 0.22)",
      grid: "rgba(96, 165, 250, 0.035)",
      buttonPrimary: "#2563eb",
      buttonPrimaryHover: "#3b82f6",
      buttonSecondary: "rgba(8, 21, 40, 0.5)",
      focusRing: "rgba(96, 165, 250, 0.5)",
    },
    imageTreatment: {
      filter: "brightness(1.02) contrast(1.05) saturate(1.04)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(59, 130, 246, 0.42) 0%, rgba(30, 64, 175, 0.24) 34%, rgba(2, 6, 23, 0.08) 58%, transparent 74%)",
      shadow: "0 0 96px rgba(30, 64, 175, 0.28)",
      backgroundWash:
        "radial-gradient(circle at 50% 58%, rgba(96, 165, 250, 0.12) 0%, transparent 70%)",
    },
  },
  {
    id: "data-slate",
    name: "Data Slate",
    description: "Slate-black surfaces with cyan accents and analytical energy.",
    tokens: {
      background: "#050b11",
      backgroundSoft: "#09131c",
      card: "#08141d",
      cardHover: "#0d1f2b",
      border: "#244154",
      borderStrong: "#06b6d4",
      text: "#f8fafc",
      mutedText: "#9fb2c3",
      accent: "#22d3ee",
      accentSoft: "#0891b2",
      accentGlow: "rgba(6, 182, 212, 0.24)",
      grid: "rgba(34, 211, 238, 0.045)",
      buttonPrimary: "#0891b2",
      buttonPrimaryHover: "#06b6d4",
      buttonSecondary: "rgba(5, 11, 17, 0.5)",
      focusRing: "rgba(34, 211, 238, 0.48)",
    },
    imageTreatment: {
      filter: "brightness(1.02) contrast(1.05) saturate(1.04)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(6, 182, 212, 0.48) 0%, rgba(8, 145, 178, 0.26) 34%, rgba(2, 6, 23, 0.08) 58%, transparent 74%)",
      shadow: "0 0 104px rgba(6, 182, 212, 0.26)",
      backgroundWash:
        "radial-gradient(circle at 50% 58%, rgba(6, 182, 212, 0.14) 0%, transparent 70%)",
    },
  },
  {
    id: "graphite-azure",
    name: "Graphite Azure",
    description: "Graphite surfaces with a clear azure glow and crisp borders.",
    tokens: {
      background: "#04070c",
      backgroundSoft: "#090f18",
      card: "#09111c",
      cardHover: "#0f1b2a",
      border: "#27364d",
      borderStrong: "#60a5fa",
      text: "#f8fafc",
      mutedText: "#9caec3",
      accent: "#3b82f6",
      accentSoft: "#2563eb",
      accentGlow: "rgba(96, 165, 250, 0.24)",
      grid: "rgba(59, 130, 246, 0.038)",
      buttonPrimary: "#2563eb",
      buttonPrimaryHover: "#3b82f6",
      buttonSecondary: "rgba(9, 15, 24, 0.52)",
      focusRing: "rgba(96, 165, 250, 0.5)",
    },
    imageTreatment: {
      filter: "brightness(1.02) contrast(1.05) saturate(1.04)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(96, 165, 250, 0.48) 0%, rgba(37, 99, 235, 0.24) 34%, rgba(2, 6, 23, 0.08) 58%, transparent 74%)",
      shadow: "0 0 112px rgba(96, 165, 250, 0.30)",
      backgroundWash:
        "radial-gradient(circle at 50% 58%, rgba(59, 130, 246, 0.14) 0%, transparent 70%)",
    },
  },
  {
    id: "violet-grid",
    name: "Violet Grid",
    description: "A restrained violet variant with the same professional layout.",
    tokens: {
      background: "#070516",
      backgroundSoft: "#100b24",
      card: "#0d0920",
      cardHover: "#15102d",
      border: "#3a2d5c",
      borderStrong: "#8b5cf6",
      text: "#faf7ff",
      mutedText: "#b6a8cf",
      accent: "#c084fc",
      accentSoft: "#8b5cf6",
      accentGlow: "rgba(139, 92, 246, 0.3)",
      grid: "rgba(192, 132, 252, 0.05)",
      buttonPrimary: "#7c3aed",
      buttonPrimaryHover: "#8b5cf6",
      buttonSecondary: "rgba(13, 9, 32, 0.52)",
      focusRing: "rgba(192, 132, 252, 0.5)",
    },
    imageTreatment: {
      filter: "brightness(1.02) contrast(1.05) saturate(1.04)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(139, 92, 246, 0.48) 0%, rgba(124, 58, 237, 0.26) 34%, rgba(15, 23, 42, 0.10) 58%, transparent 74%)",
      shadow: "0 0 112px rgba(139, 92, 246, 0.32)",
      backgroundWash:
        "radial-gradient(circle at 50% 58%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
    },
  },
  {
    id: "clean-light-professional",
    name: "Clean Light Professional",
    description: "A bright professional option with restrained blue accents.",
    tokens: {
      background: "#f8fafc",
      backgroundSoft: "#eaf0f8",
      card: "#ffffff",
      cardHover: "#f1f5f9",
      border: "#cbd5e1",
      borderStrong: "#2563eb",
      text: "#0f172a",
      mutedText: "#475569",
      accent: "#2563eb",
      accentSoft: "#1d4ed8",
      accentGlow: "rgba(37, 99, 235, 0.16)",
      grid: "rgba(37, 99, 235, 0.055)",
      buttonPrimary: "#2563eb",
      buttonPrimaryHover: "#1d4ed8",
      buttonSecondary: "rgba(255, 255, 255, 0.72)",
      focusRing: "rgba(37, 99, 235, 0.35)",
    },
    imageTreatment: {
      filter: "brightness(1.01) contrast(1.03) saturate(1.02)",
      glow:
        "radial-gradient(circle at 50% 52%, rgba(37, 99, 235, 0.20) 0%, rgba(37, 99, 235, 0.12) 34%, rgba(255, 255, 255, 0.20) 58%, transparent 74%)",
      shadow: "0 20px 70px rgba(15, 23, 42, 0.18)",
      backgroundWash:
        "radial-gradient(circle at 50% 58%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
    },
  },
];

export const defaultTheme = themes[0];

export function getThemeById(themeId: string | undefined) {
  return themes.find((theme) => theme.id === themeId) ?? defaultTheme;
}
