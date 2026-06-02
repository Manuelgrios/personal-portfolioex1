import { useEffect } from "react";
import { useRuntimeData } from "../../data/runtimeData";

export function SiteMetadata() {
  const { siteConfig } = useRuntimeData();

  useEffect(() => {
    document.title = siteConfig.siteTitle;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (description) {
      description.content = siteConfig.seoDescription;
    }
  }, [siteConfig.seoDescription, siteConfig.siteTitle]);

  return null;
}
