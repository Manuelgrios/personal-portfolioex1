import { useEffect } from "react";
import { siteConfig } from "../../data/siteConfig";

export function SiteMetadata() {
  useEffect(() => {
    document.title = siteConfig.siteTitle;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (description) {
      description.content = siteConfig.seoDescription;
    }
  }, []);

  return null;
}
