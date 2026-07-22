import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { Project } from "../../data/projects";
import { getIcon } from "../../lib/icons";

type ProjectMediaProps = {
  project: Project;
  className?: string;
};

const projectIcons = {
  apple: getIcon("apple"),
  box: getIcon("box"),
  chart: getIcon("chart"),
  code: getIcon("code"),
  flask: getIcon("flask"),
  terminal: getIcon("terminal"),
} satisfies Record<Project["icon"], ReturnType<typeof getIcon>>;

export function ProjectMedia({ project, className = "" }: ProjectMediaProps) {
  const [failedUrl, setFailedUrl] = useState("");
  const Icon = projectIcons[project.icon];
  const failed = Boolean(project.imageUrl) && failedUrl === project.imageUrl;
  const showImage = Boolean(project.imageUrl) && !failed;

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl border border-border/80 bg-surface-soft/70 ${className}`}
      data-project-media={showImage ? "image" : "fallback"}
    >
      {showImage ? (
        <img
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover"
          decoding="async"
          loading="lazy"
          referrerPolicy="no-referrer"
          src={project.imageUrl}
          onError={() => setFailedUrl(project.imageUrl ?? "")}
        />
      ) : (
        <div
          aria-label={`${project.title} project image unavailable`}
          className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,var(--color-surface-soft),transparent_72%)] text-accent-dark"
          role="img"
        >
          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-dark/35 bg-background/55">
            <Icon aria-hidden="true" size={30} />
            {failed ? (
              <ImageOff
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 rounded-full bg-card p-1 text-muted"
                size={22}
              />
            ) : null}
          </span>
        </div>
      )}
    </div>
  );
}
