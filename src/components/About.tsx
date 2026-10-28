import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function About({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="about" className="content-section section-about">
      <div className="section-container">
        <SectionHeading {...copy.about} />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="content-card about-feature">
            <div className="avatar-illustration" aria-hidden="true">
              <div className="avatar-head" />
              <div className="avatar-body" />
            </div>
            <div>
              <span className="card-index">DANILO / 01</span>
              <h3>{copy.about.featureTitle}</h3>
              <p>{copy.about.featureText}</p>
              <span className="pending-tag">{copy.common.pending}</span>
            </div>
          </div>
          <div className="about-facts">
            {copy.about.facts.map((fact, index) => (
              <div className="fact-row" key={fact}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{fact}</strong>
                <span className="fact-mark" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
