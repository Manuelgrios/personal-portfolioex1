import { Link, useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Tag } from "../components/ui/Tag";
import { projects } from "../data/projects";

export function ProjectDetail() {
  const { slug } = useParams();
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
    <article className="space-y-8">
      <SectionHeader
        eyebrow="Project"
        title={project.title}
        description={project.summary}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <DetailCard title="Overview" body={project.overview} />
        <DetailCard title="Challenge" body={project.challenge} />
        <DetailCard title="Approach" body={project.approach} />
        <ListCard title="Features" items={project.features} />
        <ListCard title="Workflow" items={project.workflow} />
        <ListCard title="Results" items={project.results} />
      </div>
      <Card>
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
      />
    </article>
  );
}

type DetailCardProps = {
  title: string;
  body?: string;
};

function DetailCard({ title, body }: DetailCardProps) {
  if (!body) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{body}</p>
    </Card>
  );
}

type ListCardProps = {
  title: string;
  items?: string[];
};

function ListCard({ title, items }: ListCardProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <ul className="mt-4 space-y-3 text-muted">
        {items.map((item) => (
          <li key={item} className="leading-7">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
