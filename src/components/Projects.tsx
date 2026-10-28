import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Projects({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="projects" className="content-section section-projects">
      <div className="section-container">
        <SectionHeading {...copy.projects} />
        <div className="grid gap-5 md:grid-cols-3">
          {copy.projects.cards.map((project) => (
            <article className="content-card project-card" key={project.index}>
              <div className="project-preview" aria-hidden="true">
                <div className="preview-block preview-block-one" />
                <div className="preview-block preview-block-two" />
                <div className="preview-block preview-block-three" />
              </div>
              <div className="project-body">
                <span className="card-index">SLOT {project.index}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="pending-tag">{copy.common.pending}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
