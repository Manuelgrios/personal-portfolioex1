import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Tag } from "../components/ui/Tag";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { getIcon } from "../lib/icons";

export function Projects() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow={profile.sections.projects.eyebrow}
        title={profile.sections.projects.indexHeading}
        description={profile.sections.projects.description}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {/* Project cards are generated from src/data/projects.ts. */}
        {projects.map((project) => {
          const Icon = getIcon(project.icon);

          return (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <Card className="h-full transition hover:border-accent/70">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft text-accent">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {project.category}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-text">
                      {project.title}
                    </h2>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-muted">{project.summary}</p>
                {project.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                ) : null}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
