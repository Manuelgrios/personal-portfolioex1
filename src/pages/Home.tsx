import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/theme/useTheme";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Tag } from "../components/ui/Tag";
import { useRuntimeData } from "../data/runtimeData";
import { assetPath } from "../lib/assets";
import { getIcon } from "../lib/icons";

export function Home() {
  const { currentTheme } = useTheme();
  const { profile, projects, experience, skillItems, socialLinks, editorPlaceholders, editorPlaceholderPolicy } = useRuntimeData();
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 6);
  // Editor-only placeholders fill empty required fields in FolioDev workspace preview. They are display
  // hints, never real data: raw runtime values stay empty, nothing here is saved, published, or counted.
  const hasHeroHeadline = profile.hero.headline.length > 0;
  const imageTreatment = currentTheme.imageTreatment;

  return (
    <div className="space-y-4 md:space-y-5">
      <section className="grid min-h-[650px] min-w-0 gap-8 overflow-hidden pt-10 md:min-h-[700px] md:pt-8 lg:min-h-[735px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="relative z-20 min-w-0 pb-6 lg:pb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent [overflow-wrap:anywhere]">
            {profile.hero.eyebrow || (editorPlaceholders ? "Your headline" : "")}
          </p>
          <h1 className="mt-6 max-w-[760px] min-w-0 text-4xl font-black leading-[1.04] tracking-normal text-text [text-wrap:balance] sm:text-5xl md:text-[3.55rem] xl:text-[4rem]">
            {hasHeroHeadline ? (
              profile.hero.headline.map((line) => (
                <span
                  className="block min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]"
                  key={line}
                >
                  {line}
                </span>
              ))
            ) : editorPlaceholders ? (
              <span
                className="block min-w-0 whitespace-normal break-words text-muted/70 [overflow-wrap:anywhere]"
                data-editor-placeholder="name"
              >
                Your name
              </span>
            ) : null}
            {profile.hero.highlightedHeadline ? (
              <span className="block min-w-0 whitespace-normal break-words text-accent-dark [overflow-wrap:anywhere]">
                {profile.hero.highlightedHeadline}
              </span>
            ) : editorPlaceholders ? (
              <span
                className="block min-w-0 whitespace-normal break-words text-accent-dark/70 [overflow-wrap:anywhere]"
                data-editor-placeholder="headline"
              >
                Target role or headline
              </span>
            ) : null}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted [overflow-wrap:anywhere]">
            {profile.hero.body ? (
              profile.hero.body
            ) : editorPlaceholders ? (
              <span className="opacity-70" data-editor-placeholder="intro">
                Short introduction will appear here.
              </span>
            ) : null}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {profile.hero.primaryCta.href ? (
              <Button href={profile.hero.primaryCta.href}>
                {profile.hero.primaryCta.label}
                <ArrowRight size={18} />
              </Button>
            ) : null}
            {profile.hero.secondaryCta.href ? (
              <Button href={profile.hero.secondaryCta.href} variant="secondary">
                {profile.hero.secondaryCta.label}
                <Mail size={17} />
              </Button>
            ) : null}
          </div>
          {socialLinks.length > 0 ? (
            <div className="mt-8 flex items-center gap-8 text-muted">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.iconKey);

                return (
                  <a
                    key={link.key}
                    aria-label={link.label}
                    className="transition hover:text-accent"
                    href={link.href}
                    rel={link.external ? "noreferrer" : undefined}
                    target={link.external ? "_blank" : undefined}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        {profile.hero.image.src ? (
          <div
            className="relative -mt-8 flex min-h-[430px] items-end justify-center overflow-hidden md:min-h-[540px] lg:mt-0 lg:min-h-[720px] lg:self-end lg:overflow-visible"
            style={
              {
                "--active-image-glow": imageTreatment.glow,
                "--active-image-filter": imageTreatment.filter,
                "--active-image-wash":
                  imageTreatment.backgroundWash ?? "transparent",
                "--active-image-shadow": imageTreatment.shadow,
              } as CSSProperties
            }
          >
            <div className="absolute left-1/2 top-[48%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full [background:var(--active-image-wash)] md:h-[620px] md:w-[620px] lg:h-[760px] lg:w-[760px]" />
            <div className="absolute left-1/2 top-[50%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full [background:var(--active-image-glow)] md:h-[540px] md:w-[540px] lg:h-[650px] lg:w-[650px]" />
            <div className="absolute left-1/2 top-[49%] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-dark/20 md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]" />
            <div className="absolute left-1/2 top-[49%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 md:h-[390px] md:w-[390px] lg:h-[460px] lg:w-[460px]" />
            <img
              alt={profile.hero.image.alt}
              className="relative z-10 mx-auto h-[430px] w-full max-w-[460px] object-contain object-bottom transition-[filter] duration-300 ease-out md:h-[520px] md:max-w-[500px] lg:h-[700px] lg:max-w-[610px]"
              src={assetPath(profile.hero.image.src)}
              style={{ filter: "var(--active-image-filter)" }}
            />
          </div>
        ) : null}
      </section>

      <Card
        id="about"
        className="relative z-30 -mt-6 scroll-mt-24 p-6 md:-mt-20 md:p-8 lg:p-10"
      >
        <div className="grid gap-9 lg:grid-cols-[0.98fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {profile.sections.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">
              {profile.sections.about.heading}
            </h2>
            <div className="mt-4 h-px w-12 bg-accent-dark" />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted">
              {profile.sections.about.body.length > 0 ? (
                profile.sections.about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              ) : editorPlaceholders ? (
                <p className="opacity-70" data-editor-placeholder="about">
                  Add a short introduction about yourself, your focus, and what you are building.
                </p>
              ) : null}
            </div>
          </div>

          {profile.sections.about.enjoyItems.length > 0 ? (
            <div className="rounded-2xl border border-border/85 bg-background/25 p-6 md:p-7">
              <h3 className="text-lg font-semibold text-accent-dark">
                {profile.sections.about.enjoyHeading}
              </h3>
              <div className="mt-3 h-px w-12 bg-accent-dark" />
              <ul className="mt-6 space-y-5">
                {profile.sections.about.enjoyItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-text"
                  >
                    <CheckCircle2 className="text-accent" size={17} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {profile.sections.about.infoGroups.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
              {profile.sections.about.infoGroups.map((group) => {
                const Icon = getIcon(group.iconKey);

                return (
                  <InfoGroup
                    key={group.label}
                    icon={Icon}
                    label={group.label}
                    lines={group.lines}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </Card>

      {experience.length > 0 ? (
        <Card id="experience" className="scroll-mt-24 p-6 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {profile.sections.experience.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-text">
            {profile.sections.experience.heading}
          </h2>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {experience.map((entry) => (
              <article
                key={entry.id}
                className="min-w-0 rounded-xl border border-border/80 bg-background/30 p-5"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-text">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-accent-dark [overflow-wrap:anywhere]">
                      {entry.organization}
                    </p>
                  </div>
                  {[entry.dates, entry.location].filter(Boolean).length > 0 ? (
                    <p className="text-sm leading-6 text-muted [overflow-wrap:anywhere]">
                      {[entry.dates, entry.location].filter(Boolean).join(" | ")}
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted [overflow-wrap:anywhere]">
                  {entry.description}
                </p>
                {entry.highlights && entry.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {entry.highlights.slice(0, 3).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm leading-6 text-text"
                      >
                        <CheckCircle2 className="mt-1 shrink-0 text-accent" size={15} />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {entry.technologies && entry.technologies.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.technologies.map((technology) => (
                      <Tag key={technology}>{technology}</Tag>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Card>
      ) : null}

      {projects.length > 0 ? (
      <Card id="projects" className="scroll-mt-24 p-6 md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {profile.sections.projects.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-text">
              {profile.sections.projects.heading}
            </h2>
          </div>
          <Button href="/projects" variant="secondary" className="self-start">
            {profile.sections.projects.viewAllLabel}
            <ArrowRight size={18} />
          </Button>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => {
              const Icon = getIcon(project.icon);

              return (
                <Link key={project.slug} to={`/projects/${project.slug}`}>
                  <div className="group h-full rounded-xl border border-accent-dark/45 bg-card-soft/42 p-4 transition hover:border-accent hover:bg-card-soft/70">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft/80 text-accent">
                        <Icon size={25} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold leading-snug text-text">
                            {project.title}
                          </h3>
                          <ArrowRight
                            className="mt-1 text-accent-dark opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100"
                            size={16}
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {project.summary}
                        </p>
                        {project.tags.length > 0 ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </Card>
      ) : editorPlaceholders && editorPlaceholderPolicy.projects !== "hide-placeholder" ? (
        <Card id="projects" className="scroll-mt-24 p-6 md:p-7" data-editor-placeholder="projects">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {profile.sections.projects.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-text">{profile.sections.projects.heading}</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-full rounded-xl border border-dashed border-accent-dark/45 bg-card-soft/30 p-4 opacity-70">
              <h3 className="text-lg font-bold leading-snug text-text">Add a project</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Project description will appear here.</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card id="skills" className="scroll-mt-24 p-6 md:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {profile.sections.skills.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-text">
          {profile.sections.skills.heading}
        </h2>
        {profile.sections.skills.description ? (
          <p className="mt-3 text-sm leading-6 text-muted">
            {profile.sections.skills.description}
          </p>
        ) : null}
        {skillItems.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
            {skillItems.map((skill) => (
              <div
                key={`${skill.category}-${skill.name}`}
                className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border border-accent-dark/55 bg-background/36 px-3 py-3 text-center transition hover:border-accent"
              >
                <span className="text-xl font-black text-accent">
                  {skill.shortLabel}
                </span>
                <span className="text-xs font-medium text-text">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        ) : editorPlaceholders ? (
          <div
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            data-editor-placeholder="skills"
          >
            {["Add a skill group", "List your skills"].map((label) => (
              <div
                key={label}
                className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-accent-dark/45 bg-background/24 px-3 py-3 text-center text-xs font-medium text-muted opacity-70"
              >
                {label}
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <Card id="contact" className="scroll-mt-24 p-6 md:p-7">
        <div className="grid gap-7 lg:grid-cols-[0.42fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {profile.sections.contact.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-text">
              {profile.sections.contact.heading}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              {profile.sections.contact.body}
            </p>
          </div>
          {socialLinks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.iconKey);

                return (
                  <ContactCard
                    key={link.key}
                    href={link.href}
                    icon={Icon}
                    label={link.label}
                    value={link.value}
                    external={link.external}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

type InfoGroupProps = {
  icon: ReturnType<typeof getIcon>;
  label: string;
  lines: string[];
};

function InfoGroup({ icon: Icon, label, lines }: InfoGroupProps) {
  if (!label && lines.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/80 bg-background/28 p-5">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent-dark/35 bg-accent-dark/15 text-accent-dark">
          <Icon size={24} />
        </span>
        <div>
          {label ? (
            <h3 className="text-base font-bold leading-6 text-accent-dark">
              {label}
            </h3>
          ) : null}
          {lines.map((line) => (
            <p key={line} className="mt-1 text-sm leading-6 text-text">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

type ContactCardProps = {
  href: string;
  icon: ReturnType<typeof getIcon>;
  label: string;
  value: string;
  external?: boolean;
};

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  external,
}: ContactCardProps) {
  if (!href || !value) {
    return null;
  }

  return (
    <a
      className="flex items-center gap-4 rounded-xl border border-border/80 bg-background/30 p-5 transition hover:border-accent"
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <Icon className="shrink-0 text-accent-dark" size={25} />
      <span>
        <span className="block text-sm font-bold text-text">{label}</span>
        <span className="mt-1 block break-all text-xs text-muted">
          {value}
        </span>
      </span>
    </a>
  );
}
