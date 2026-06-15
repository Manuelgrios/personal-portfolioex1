export const FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID = "personal-portfolioex1" as const;
export const FOLIODEV_TEMPLATE_PREVIEW_VERSION = "1" as const;
export const FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM = "foliodevPreviewChannel" as const;
export const FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM = "foliodevPreviewParentOrigin" as const;

export type FolioDevTemplatePreviewData = {
  siteConfig: unknown;
  profile: unknown;
  projects: unknown[];
  skills: unknown;
  education: unknown[];
  experience: unknown[];
  socialLinks: unknown;
  navigation: unknown[];
  metadata?: unknown;
};

export type FolioDevTemplatePreviewMessage = {
  type: "foliodev:preview:update";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  channelId: string;
  data: FolioDevTemplatePreviewData;
};

export type FolioDevTemplatePreviewReadyMessage = {
  type: "foliodev:preview:ready";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  channelId: string;
};

export type FolioDevTemplatePreviewErrorMessage = {
  type: "foliodev:preview:error";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  channelId: string;
  reason: string;
};

export type FolioDevTemplatePreviewLinkClickReason =
  | "invalid_url"
  | "external_link"
  | "download_link"
  | "mailto_link"
  | "internal_anchor";

export type FolioDevTemplatePreviewLinkClickMessage = {
  type: "foliodev:preview:link-click";
  version: typeof FOLIODEV_TEMPLATE_PREVIEW_VERSION;
  templateId: typeof FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID;
  channelId: string;
  href: string;
  label?: string;
  valid: boolean;
  reason?: FolioDevTemplatePreviewLinkClickReason;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isFolioDevTemplatePreviewMessage(
  value: unknown,
  expectedChannelId: string,
): value is FolioDevTemplatePreviewMessage {
  if (
    !isRecord(value) ||
    value.type !== "foliodev:preview:update" ||
    value.version !== FOLIODEV_TEMPLATE_PREVIEW_VERSION ||
    value.templateId !== FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID ||
    value.channelId !== expectedChannelId ||
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
    Array.isArray(value.data.experience) &&
    isRecord(value.data.socialLinks) &&
    Array.isArray(value.data.navigation) &&
    (typeof value.data.metadata === "undefined" || isRecord(value.data.metadata))
  );
}

export function createPreviewReadyMessage(channelId: string): FolioDevTemplatePreviewReadyMessage {
  return {
    type: "foliodev:preview:ready",
    version: FOLIODEV_TEMPLATE_PREVIEW_VERSION,
    templateId: FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID,
    channelId,
  };
}

export function createPreviewErrorMessage(channelId: string, reason: string): FolioDevTemplatePreviewErrorMessage {
  return {
    type: "foliodev:preview:error",
    version: FOLIODEV_TEMPLATE_PREVIEW_VERSION,
    templateId: FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID,
    channelId,
    reason,
  };
}

export function createPreviewLinkClickMessage({
  channelId,
  href,
  label,
  valid,
  reason,
}: {
  channelId: string;
  href: string;
  label?: string;
  valid: boolean;
  reason?: FolioDevTemplatePreviewLinkClickReason;
}): FolioDevTemplatePreviewLinkClickMessage {
  return {
    type: "foliodev:preview:link-click",
    version: FOLIODEV_TEMPLATE_PREVIEW_VERSION,
    templateId: FOLIODEV_TEMPLATE_PREVIEW_TEMPLATE_ID,
    channelId,
    href,
    ...(label ? { label } : {}),
    valid,
    ...(reason ? { reason } : {}),
  };
}
