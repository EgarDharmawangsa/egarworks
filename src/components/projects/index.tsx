import Image from "next/image";
import {
  ArrowUpRight,
  Boxes,
  CloudSun,
  Code2,
  FileScan,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Utensils,
} from "lucide-react";
import projects from "@/data/projects/projectsData.json";

const icons = {
  academic: GraduationCap,
  inventory: Boxes,
  scan: FileScan,
  ai: Sparkles,
  forum: MessageSquare,
  weather: CloudSun,
  recipe: Utensils,
};
const colors = new Set([
  "indigo",
  "amber",
  "blue",
  "violet",
  "green",
  "sky",
  "orange",
]);

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = icons[project.icon as keyof typeof icons] ?? Code2;
  const color = colors.has(project.color) ? project.color : "blue";
  const publicLink = /^https?:\/\//i.test(project.link) ? project.link : null;

  return (
    <article className={`project-card project-${color}`}>
      <div className="project-preview">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="project-image"
          />
        ) : (
          <>
            <span className="project-preview-type">{project.category}</span>
            <div className="project-emblem">
              <Icon size={34} strokeWidth={1.4} />
            </div>
            <span className="project-index">
              {String(index + 1).padStart(2, "0")}
            </span>
          </>
        )}
      </div>
      <div className="project-body">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          {publicLink && (
            <a
              href={publicLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="project-arrow"
            >
              <ArrowUpRight size={19} />
            </a>
          )}
        </div>
        <p>{project.description}</p>
        <div className="project-bottom">
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {!publicLink && (
            <span className="private-project">Demo unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="shell section" id="projects">
      <div className="section-heading heading-row">
        <div>
          <span className="eyebrow">03 / SELECTED WORK</span>
          <h2>
            Ideas, brought to life<span className="blue-dot">.</span>
          </h2>
        </div>
        <span className="count-badge">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
