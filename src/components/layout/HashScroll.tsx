import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "../../lib/hashNavigation";

export function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    let timeoutId: number | undefined;
    let attempts = 0;

    const tryScroll = () => {
      attempts += 1;

      if (scrollToHash(hash)) {
        return;
      }

      if (attempts < 12) {
        timeoutId = window.setTimeout(tryScroll, 50);
      }
    };

    const frameId = window.requestAnimationFrame(tryScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hash, pathname]);

  return null;
}
