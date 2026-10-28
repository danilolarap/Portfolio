import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Contact({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="contact" className="content-section section-contact">
      <div className="section-container">
        <SectionHeading {...copy.contact} />
        <div className="contact-grid">
          <a
            className="content-card contact-link"
            href="https://github.com/danilolarap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon" aria-hidden="true">
              <span />
            </span>
            <span>
              <strong>{copy.contact.github}</strong>
              <small>{copy.contact.githubDescription}</small>
            </span>
            <span className="contact-action">{copy.contact.openGithub}</span>
          </a>
          <div className="content-card contact-pending">
            <span className="card-index">02 / 02</span>
            <span>{copy.contact.otherChannels}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
