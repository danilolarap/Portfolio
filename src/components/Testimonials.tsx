import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Testimonials({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="testimonials" className="content-section section-testimonials">
      <div className="section-container">
        <SectionHeading {...copy.testimonials} />
        <div className="grid gap-5 md:grid-cols-3">
          {copy.testimonials.cards.map((label, index) => (
            <article className="content-card testimonial-card" key={label}>
              <span className="quote-shape" aria-hidden="true" />
              <span className="card-index">
                {String(index + 1).padStart(2, "0")} / 03
              </span>
              <h3>{label}</h3>
              <p>{copy.common.pendingDetail}</p>
              <div className="testimonial-person">
                <span className="person-placeholder" />
                <span className="pending-tag">{copy.common.pending}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="section-note">{copy.testimonials.note}</p>
      </div>
    </section>
  );
}
