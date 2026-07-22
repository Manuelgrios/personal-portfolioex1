export function normalizeSkillLabel(value: string): string {
  return value.trim().replace(/[._/-]+/g, " ").replace(/\s+/g, " ").toLocaleLowerCase();
}

/** Render supporting text only when it adds meaning beyond the concise card label. */
export function shouldRenderSkillSupportingName(shortLabel: string, name: string): boolean {
  return normalizeSkillLabel(shortLabel) !== normalizeSkillLabel(name);
}
