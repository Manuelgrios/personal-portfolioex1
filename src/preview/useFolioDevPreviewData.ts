import { useEffect, useState } from "react";
import {
  createPreviewErrorMessage,
  createPreviewReadyMessage,
  isFolioDevTemplatePreviewMessage,
} from "./previewMessages";
import {
  normalizePreviewData,
  type TemplateRuntimeData,
} from "../data/runtimeData";

function isPreviewRoute() {
  if (typeof window === "undefined") {
    return false;
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

  return { isPreviewMode, previewData };
}
