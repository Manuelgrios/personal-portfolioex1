import { useEffect, useState } from "react";
import {
  createPreviewErrorMessage,
  createPreviewLinkClickMessage,
  createPreviewReadyMessage,
  FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM,
  FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM,
  isFolioDevTemplatePreviewMessage,
  type FolioDevTemplatePreviewLinkClickReason,
} from "./previewMessages";
import {
  normalizePreviewData,
  type TemplateRuntimeData,
} from "../data/previewNormalization";
import { isFolioDevPreviewLocation } from "./previewActivation";
import { startFolioDevPreviewReadyRetry } from "./previewReadyRetry";

function isPreviewRoute() {
  if (typeof window === "undefined") {
    return false;
  }

  return isFolioDevPreviewLocation(window.location);
}

function readPreviewConnection() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const params = new URLSearchParams(window.location.search);
  const channelId = params.get(FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM);
  const parentOrigin = params.get(FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM);

  if (!channelId || !parentOrigin) {
    return undefined;
  }

  try {
    return {
      channelId,
      parentOrigin: new URL(parentOrigin).origin,
    };
  } catch {
    return undefined;
  }
}

function postToParent(message: unknown, parentOrigin: string) {
  if (typeof window === "undefined" || window.parent === window) {
    return;
  }

  window.parent.postMessage(message, parentOrigin);
}

function closestAnchor(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
}

function isValidMailto(href: string) {
  const email = href.replace(/^mailto:/i, "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function classifyPreviewLink(anchor: HTMLAnchorElement): {
  href: string;
  valid: boolean;
  reason: FolioDevTemplatePreviewLinkClickReason;
} {
  const href = anchor.getAttribute("href")?.trim() ?? "";

  if (!href || /\s/.test(href)) {
    return { href, valid: false, reason: "invalid_url" };
  }

  const schemeMatch = /^[a-zA-Z][a-zA-Z\d+.-]*:/.exec(href);
  const scheme = schemeMatch?.[0].toLowerCase() ?? "";

  if (["javascript:", "data:", "file:", "blob:", "chrome:", "about:"].includes(scheme)) {
    return { href, valid: false, reason: "invalid_url" };
  }

  if (scheme === "mailto:") {
    return { href, valid: isValidMailto(href), reason: isValidMailto(href) ? "mailto_link" : "invalid_url" };
  }

  if (scheme && scheme !== "http:" && scheme !== "https:") {
    return { href, valid: false, reason: "invalid_url" };
  }

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return { href, valid: false, reason: "invalid_url" };
  }

  if (anchor.hasAttribute("download")) {
    return { href, valid: true, reason: "download_link" };
  }

  if (href.startsWith("#") || url.origin === window.location.origin) {
    return { href, valid: true, reason: "internal_anchor" };
  }

  return { href, valid: true, reason: "external_link" };
}

export function useFolioDevPreviewData() {
  const [isPreviewMode] = useState(isPreviewRoute);
  const [previewConnection] = useState(readPreviewConnection);
  const [previewData, setPreviewData] = useState<TemplateRuntimeData | null>(null);

  useEffect(() => {
    if (!isPreviewMode || !previewConnection || typeof window === "undefined") {
      return;
    }

    const connection = previewConnection;
    const readyRetry = startFolioDevPreviewReadyRetry({
      postReady: () =>
        postToParent(
          createPreviewReadyMessage(connection.channelId),
          connection.parentOrigin,
        ),
      setTimer: window.setTimeout.bind(window),
      clearTimer: window.clearTimeout.bind(window),
    });

    function handleMessage(event: MessageEvent) {
      if (
        event.origin !== connection.parentOrigin ||
        !isFolioDevTemplatePreviewMessage(event.data, connection.channelId)
      ) {
        return;
      }

      try {
        readyRetry.stop();
        setPreviewData(normalizePreviewData(event.data.data));
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Unable to apply preview data.";
        postToParent(
          createPreviewErrorMessage(connection.channelId, reason),
          connection.parentOrigin,
        );
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      readyRetry.stop();
      window.removeEventListener("message", handleMessage);
    };
  }, [isPreviewMode, previewConnection]);

  useEffect(() => {
    if (!isPreviewMode || !previewConnection || typeof window === "undefined") {
      return;
    }

    const connection = previewConnection;

    function handlePreviewLinkClick(event: MouseEvent) {
      const anchor = closestAnchor(event.target);

      if (!anchor) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const classification = classifyPreviewLink(anchor);
      const label = anchor.textContent?.trim() || anchor.getAttribute("aria-label") || undefined;

      postToParent(
        createPreviewLinkClickMessage({
          ...classification,
          channelId: connection.channelId,
          label,
        }),
        connection.parentOrigin,
      );
    }

    document.addEventListener("click", handlePreviewLinkClick, true);

    return () => {
      document.removeEventListener("click", handlePreviewLinkClick, true);
    };
  }, [isPreviewMode, previewConnection]);

  return { isPreviewMode, previewData };
}
