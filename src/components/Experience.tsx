import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Experience({ copy }: { copy: PortfolioContent }) {
  const groups = [
    { title: copy.experience.academic, entries: copy.experience.academicItems },
    { title: copy.experience.work, entries: copy.experience.workItems },
  ];
  return (
    <section id="experience" className="content-section section-experience">
      <div className="section-container">
        <SectionHeading {...copy.experience} />
        <div className="experience-groups">
          {groups.map((group) => (
            <section className="experience-group" key={group.title}>
              <h3 className="experience-group-title">{group.title}</h3>
              <div className="experience-list">
                {group.entries.map((entry, index) => (
                  <article
                    className="content-card experience-card"
                    key={entry.organization}
                  >
                    <span className="experience-node" aria-hidden="true" />
                    <span className="card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4>{entry.title}</h4>
                      <p>{entry.organization}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
