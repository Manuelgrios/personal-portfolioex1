import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useRuntimeData } from "../data/runtimeData";

export function Projects() {
  const { profile, projects } = useRuntimeData();

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow={profile.sections.projects.eyebrow}
        title={profile.sections.projects.indexHeading}
        description={profile.sections.projects.description}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
