import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Experience({ copy }: { copy: PortfolioContent }) {
  const entries = [
    {
      title: copy.experience.academic,
      description: copy.experience.academicText,
    },
    { title: copy.experience.work, description: copy.experience.workText },
  ];
  return (
    <section id="experience" className="content-section section-experience">
      <div className="section-container">
        <SectionHeading {...copy.experience} />
        <div className="experience-list">
          {entries.map((entry, index) => (
            <article className="content-card experience-card" key={entry.title}>
              <span className="experience-node" aria-hidden="true" />
              <span className="card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
              <span className="pending-tag">{copy.common.pending}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
