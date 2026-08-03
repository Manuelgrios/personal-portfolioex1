import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { Tag } from "../ui/Tag";
import { ProjectActions } from "./ProjectActions";
import { ProjectMedia } from "./ProjectMedia";

type ProjectCardProps = {
  project: Project;
  variant?: "home" | "index";
};

export function ProjectCard({ project, variant = "index" }: ProjectCardProps) {
  const compact = variant === "home";

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden border bg-card-soft/42 transition hover:border-accent hover:bg-card-soft/70 ${
        compact ? "rounded-xl border-accent-dark/45 p-4" : "rounded-3xl border-border/80 p-5 shadow-[var(--theme-card-shadow)]"
      }`}
      data-project-card={variant}
      data-project-slug={project.slug}
    >
      <Link
        aria-label={`View ${project.title} project details`}
        className="block min-w-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
        to={`/projects/${project.slug}`}
      >
        <ProjectMedia project={project} />
        <div className={compact ? "pt-4" : "pt-5"}>
          {!compact ? (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {project.category}
            </p>
          ) : null}
          <div className="mt-2 flex min-w-0 items-start justify-between gap-3">
            <h3
              className={`${compact ? "text-lg" : "text-xl"} min-w-0 font-bold leading-snug text-text [overflow-wrap:anywhere]`}
              data-project-field="title"
              data-project-field-primary="true"
            >
              {project.title}
            </h3>
            <ArrowRight
              aria-hidden="true"
              className="mt-1 shrink-0 text-accent-dark opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100"
              size={17}
            />
          </div>
          <p
            className={`${compact ? "mt-3 text-sm leading-6" : "mt-4 leading-7"} text-muted [overflow-wrap:anywhere]`}
            data-project-field="shortDescription"
            data-project-field-primary="true"
          >
            {project.summary}
          </p>
          {project.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag
                  data-project-field="technologiesUsed"
                  data-project-field-occurrence="secondary"
                  key={tag}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
      <ProjectActions className="mt-auto pt-4" project={project} />
    </article>
  );
}
