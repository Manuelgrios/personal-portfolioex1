import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { getIcon } from "../lib/icons";

export function Contact() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={profile.sections.contact.eyebrow}
        title={profile.sections.contact.pageHeading}
        description={profile.sections.contact.body}
      />
      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text">{profile.name}</h2>
          <p className="mt-2 text-muted">{profile.shortBio}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {socialLinks.map((link) => {
            const Icon = getIcon(link.iconKey);

            return (
              <a
                key={link.key}
                className="flex items-center gap-4 rounded-xl border border-border/80 bg-background/30 p-5 transition hover:border-accent"
                href={link.href}
                rel={link.external ? "noreferrer" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                <Icon className="shrink-0 text-accent-dark" size={24} />
                <span>
                  <span className="block text-sm font-bold text-text">
                    {link.label}
                  </span>
                  <span className="mt-1 block break-all text-xs text-muted">
                    {link.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
