import type { HTMLAttributes } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectActions } from "../components/projects/ProjectActions";
import { ProjectMedia } from "../components/projects/ProjectMedia";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Tag } from "../components/ui/Tag";
import { useRuntimeData } from "../data/runtimeData";

export function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useRuntimeData();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Project"
          title="Project not found"
          description="The requested project is not available yet. Return to the project index to view current work."
        />
        <Link className="text-sm font-semibold text-accent" to="/projects">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-8" data-project-slug={project.slug}>
      <SectionHeader
        descriptionAttributes={{
          "data-project-field": "shortDescription",
          "data-project-field-primary": "true",
        } as HTMLAttributes<HTMLParagraphElement>}
        eyebrow="Project"
        title={project.title}
        description={project.summary}
        titleAttributes={{
          "data-project-field": "title",
          "data-project-field-primary": "true",
        } as HTMLAttributes<HTMLHeadingElement>}
      />
      <Card className="overflow-hidden p-4 md:p-5">
        <ProjectMedia project={project} />
        <ProjectActions className="mt-5" project={project} />
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        <DetailCard title="Overview" body={project.overview} />
        <DetailCard title="Challenge" body={project.challenge} projectField="problemSolved" primary />
        <DetailCard title="Approach" body={project.approach} projectField="whatYouBuilt" primary />
        <ListCard title="Features" items={project.features} projectField="whatYouBuilt" />
        <ListCard title="Workflow" items={project.workflow} projectField="whatYouBuilt" />
        <ListCard title="Results" items={project.results} projectField="outcome" primary />
      </div>
      <Card data-project-field="technologiesUsed" data-project-field-primary="true">
        <h2 className="text-lg font-semibold text-text">Technologies</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
      </Card>
      <ListCard
        title="Interview Talking Points"
        items={project.interviewTalkingPoints}
        itemProjectField={(item) => {
          if (item === project.challenge) return "problemSolved";
          if (item === project.approach) return "whatYouBuilt";
          if (project.results?.includes(item)) return "outcome";
          return undefined;
        }}
      />
    </article>
  );
}

type DetailCardProps = {
  title: string;
  body?: string;
  projectField?: string;
  primary?: boolean;
};

function DetailCard({ title, body, projectField, primary = false }: DetailCardProps) {
  if (!body) {
    return null;
  }

  return (
    <Card
      data-project-field={projectField}
      data-project-field-occurrence={projectField && !primary ? "secondary" : undefined}
      data-project-field-primary={projectField && primary ? "true" : undefined}
    >
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{body}</p>
    </Card>
  );
}

type ListCardProps = {
  title: string;
  items?: string[];
  projectField?: string;
  primary?: boolean;
  itemProjectField?: (item: string) => string | undefined;
};

function ListCard({ title, items, projectField, primary = false, itemProjectField }: ListCardProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Card
      data-project-field={projectField}
      data-project-field-occurrence={projectField && !primary ? "secondary" : undefined}
      data-project-field-primary={projectField && primary ? "true" : undefined}
    >
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <ul className="mt-4 space-y-3 text-muted">
        {items.map((item) => (
          <li
            className="leading-7"
            data-project-field={itemProjectField?.(item)}
            data-project-field-occurrence={itemProjectField?.(item) ? "secondary" : undefined}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
