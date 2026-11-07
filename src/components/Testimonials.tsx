"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import type { PortfolioContent } from "@/data/content";

export default function Testimonials({ copy }: { copy: PortfolioContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = copy.testimonials.cards.length;
  const move = (direction: number) =>
    setActiveIndex((current) => (current + direction + total) % total);

  return (
    <section id="testimonials" className="content-section section-testimonials">
      <div className="section-container">
        <SectionHeading {...copy.testimonials} />
        <div
          className="testimonial-carousel"
          role="region"
          aria-label={copy.testimonials.title}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <button
            className="testimonial-arrow testimonial-arrow-previous"
            type="button"
            onClick={() => move(-1)}
            aria-label={copy.testimonials.previous}
            aria-controls="testimonial-slides"
            disabled={total < 2}
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              shapeRendering="crispEdges"
            >
              <path d="M6 2h3v3h5v6H9v3H6v-3H3V9H1V7h2V5h3z" />
            </svg>
          </button>
          <div
            className="testimonials-list"
            id="testimonial-slides"
            aria-live="polite"
            aria-atomic="true"
          >
            {copy.testimonials.cards.map((person, index) => (
              <article
                className="content-card testimonial-card"
                key={person.name}
                hidden={index !== activeIndex}
                aria-label={`${index + 1} / ${total}`}
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
          <button
            className="testimonial-arrow testimonial-arrow-next"
            type="button"
            onClick={() => move(1)}
            aria-label={copy.testimonials.next}
            aria-controls="testimonial-slides"
            disabled={total < 2}
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              shapeRendering="crispEdges"
            >
              <path d="M6 2h3v3h5v6H9v3H6v-3H3V9H1V7h2V5h3z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
