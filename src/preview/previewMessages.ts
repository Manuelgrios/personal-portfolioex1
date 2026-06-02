export const FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID = "personal-portfolioex1" as const;
export const FOLIODEV_TEMPLATE_PREVIEW_VERSION = "1" as const;

export type FolioDevTemplatePreviewData = {
  siteConfig: unknown;
  profile: unknown;
  projects: unknown[];
  skills: unknown;
  education: unknown[];
  socialLinks: unknown;
  navigation: unknown[];
};

export type FolioDevTemplatePreviewMessage = {
  type: "foliodev:preview:update";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  data: FolioDevTemplatePreviewData;
};

export type FolioDevTemplatePreviewReadyMessage = {
  type: "foliodev:preview:ready";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
};

export type FolioDevTemplatePreviewErrorMessage = {
  type: "foliodev:preview:error";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  reason: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isFolioDevTemplatePreviewMessage(value: unknown): value is FolioDevTemplatePreviewMessage {
  if (
    !isRecord(value) ||
    value.type !== "foliodev:preview:update" ||
    value.version !== FOLIODEV_TEMPLATE_PREVIEW_VERSION ||
    value.templateId !== FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID ||
    !isRecord(value.data)
  ) {
    return false;
  }

  return (
    isRecord(value.data.siteConfig) &&
    isRecord(value.data.profile) &&
    Array.isArray(value.data.projects) &&
    isRecord(value.data.skills) &&
    Array.isArray(value.data.education) &&
    isRecord(value.data.socialLinks) &&
    Array.isArray(value.data.navigation)
  );
}

export function createPreviewReadyMessage(): FolioDevTemplatePreviewReadyMessage {
  return {
    type: "foliodev:preview:ready",
    version: FOLIODEV_TEMPLATE_PREVIEW_VERSION,
    templateId: FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID,
  };
}

export function createPreviewErrorMessage(reason: string): FolioDevTemplatePreviewErrorMessage {
  return {
    type: "foliodev:preview:error",
    version: FOLIODEV_TEMPLATE_PREVIEW_VERSION,
    templateId: FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID,
    reason,
  };
}
