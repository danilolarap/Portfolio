import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Testimonials({ copy }: { copy: PortfolioContent }) {
  return (
    <section id="testimonials" className="content-section section-testimonials">
      <div className="section-container">
        <SectionHeading {...copy.testimonials} />
        <div className="testimonials-list">
          {copy.testimonials.cards.map((person, index) => (
            <article
              className="content-card testimonial-card"
              key={person.name}
            >
              <a
                className="testimonial-photo-link"
                href={person.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={person.name}
              >
                <img
                  className="testimonial-photo"
                  src={person.image}
                  alt={person.name}
                  width={400}
                  height={300}
                  loading="lazy"
                  style={{ objectPosition: person.imagePosition }}
                />
              </a>
              <div className="testimonial-content">
                <div
                  className="testimonial-rating"
                  role="img"
                  aria-label={`${person.rating} ${copy.testimonials.ratingLabel}`}
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <img
                      key={star}
                      src="/icons/nether-star.svg"
                      alt=""
                      width={24}
                      height={24}
                      className={
                        star < person.rating
                          ? "nether-star"
                          : "nether-star is-empty"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote>
                  <p>“{person.quote}”</p>
                </blockquote>
                <div className="testimonial-person">
                  <h3>{person.name}</h3>
                  <span aria-hidden="true">·</span>
                  <span className="testimonial-role">{person.role}</span>
                </div>
              </div>
              <span className="testimonial-number" aria-hidden="true">
                {index + 1}/{copy.testimonials.cards.length}
              </span>
              <span className="testimonial-quote" aria-hidden="true">
                “
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
