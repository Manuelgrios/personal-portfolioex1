import {
  FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM,
  FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM,
} from "./previewMessages";

export const FOLIODEV_TEMPLATE_PREVIEW_MODE_PARAM = "foliodevPreview" as const;

function isFolioDevPreviewRuntimeBuild() {
  return import.meta.env?.VITE_FOLIODEV_PREVIEW_RUNTIME === "true";
}

export function isFolioDevPreviewSearch(search: string) {
  const params = new URLSearchParams(search);

  return (
    params.get(FOLIODEV_TEMPLATE_PREVIEW_MODE_PARAM) === "1" ||
    params.has(FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM) ||
    params.has(FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM)
  );
}

export function isFolioDevPreviewLocation(
  location: Pick<Location, "pathname" | "search">,
  previewRuntimeBuild = isFolioDevPreviewRuntimeBuild(),
) {
  return (
    previewRuntimeBuild ||
    location.pathname.endsWith("/foliodev-preview") ||
    isFolioDevPreviewSearch(location.search)
  );
}
