import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Skills({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="skills" className="content-section section-skills">
      <div className="section-container">
        <SectionHeading {...copy.skills} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.skills.categories.map((category, index) => (
            <div className="content-card skill-card" key={category}>
              <span className="skill-block" aria-hidden="true" />
              <span className="card-index">
                INVENTORY / {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
