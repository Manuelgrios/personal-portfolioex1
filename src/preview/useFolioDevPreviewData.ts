import { useEffect, useState } from "react";
import {
  createPreviewErrorMessage,
  createPreviewLinkClickMessage,
  createPreviewReadyMessage,
  isFolioDevTemplatePreviewMessage,
  type FolioDevTemplatePreviewLinkClickReason,
} from "./previewMessages";
import {
  normalizePreviewData,
  type TemplateRuntimeData,
} from "../data/runtimeData";

const isFolioDevPreviewRuntime = import.meta.env.VITE_FOLIODEV_PREVIEW_RUNTIME === "true";

function isPreviewRoute() {
  if (typeof window === "undefined") {
    return false;
  }

  if (isFolioDevPreviewRuntime) {
    return true;
  }

  return (
    window.location.pathname.endsWith("/foliodev-preview") ||
    window.location.search.includes("foliodevPreview=1")
  );
}

function postToParent(message: unknown) {
  if (typeof window === "undefined" || window.parent === window) {
    return;
  }

  window.parent.postMessage(message, "*");
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
  const [previewData, setPreviewData] = useState<TemplateRuntimeData | null>(null);

  useEffect(() => {
    if (!isPreviewMode || typeof window === "undefined") {
      return;
    }

    function handleMessage(event: MessageEvent) {
      if (!isFolioDevTemplatePreviewMessage(event.data)) {
        return;
      }

      try {
        setPreviewData(normalizePreviewData(event.data.data));
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Unable to apply preview data.";
        postToParent(createPreviewErrorMessage(reason));
      }
    }

    window.addEventListener("message", handleMessage);
    postToParent(createPreviewReadyMessage());

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isPreviewMode]);

  useEffect(() => {
    if (!isPreviewMode || typeof window === "undefined") {
      return;
    }

    function handlePreviewLinkClick(event: MouseEvent) {
      const anchor = closestAnchor(event.target);

      if (!anchor) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const classification = classifyPreviewLink(anchor);
      const label = anchor.textContent?.trim() || anchor.getAttribute("aria-label") || undefined;

      postToParent(createPreviewLinkClickMessage({ ...classification, label }));
    }

    document.addEventListener("click", handlePreviewLinkClick, true);

    return () => {
      document.removeEventListener("click", handlePreviewLinkClick, true);
    };
  }, [isPreviewMode]);

  return { isPreviewMode, previewData };
}
