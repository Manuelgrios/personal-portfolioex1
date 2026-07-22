import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "../../data/projects";

type ProjectActionsProps = {
  project: Project;
  className?: string;
};

export function ProjectActions({ project, className = "" }: ProjectActionsProps) {
  if (!project.links?.length) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      data-project-actions
      data-project-slug={project.slug}
    >
      {project.links.map((link) => {
        const Icon = link.label === "GitHub" ? Code2 : ExternalLink;

        return (
          <a
            aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background/50 px-3 text-sm font-semibold text-text transition hover:border-accent hover:text-accent-dark focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
            data-project-field={link.label === "GitHub" ? "githubUrl" : "liveDemoUrl"}
            data-project-field-primary="true"
            href={link.href}
            key={`${link.label}-${link.href}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" size={16} />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
