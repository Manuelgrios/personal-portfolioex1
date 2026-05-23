import { siteConfig } from "../../data/siteConfig";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[1180px] px-5 py-7 text-center text-xs text-muted">
        <p>
          &copy; {siteConfig.copyrightYear} {siteConfig.brand.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
