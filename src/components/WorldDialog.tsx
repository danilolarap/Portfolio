"use client";

import { useEffect, useRef } from "react";
import type { PortfolioContent, StationId } from "@/data/content";

interface WorldDialogProps {
  stationId: StationId | null;
  helpOpen: boolean;
  copy: PortfolioContent;
  onClose: () => void;
}

export default function WorldDialog({
  stationId,
  helpOpen,
  copy,
  onClose,
}: WorldDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (stationId || helpOpen) closeButtonRef.current?.focus();
  }, [stationId, helpOpen]);
  if (!stationId && !helpOpen) return null;

  const title = stationId
    ? copy.world.stationTitles[stationId]
    : copy.world.helpTitle;

  const stationContent = () => {
    if (stationId === "about") {
      return (
        <div className="station-about-content">
          <p>{copy.about.featureText}</p>
          <ul>
            {copy.about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (stationId === "projects") {
      return (
        <div className="station-project-list">
          {copy.projects.cards.map((project) => (
            <article className="station-project" key={project.index}>
              <div>
                <span className="station-project-index">{project.index}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="station-project-links">
                {project.production && (
                  <a
                    href={project.production}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.projects.openProduction}
                  </a>
                )}
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.projects.openRepository}
                </a>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (stationId === "skills") {
      return (
        <div className="station-skill-list">
          {copy.skills.categories.map((skill, index) => (
            <div className="station-skill" key={skill}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{skill}</strong>
            </div>
          ))}
        </div>
      );
    }

    if (stationId === "contact") {
      return (
        <div className="station-contact-list">
          <a
            href="https://github.com/danilolarap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{copy.contact.github}</span>
            <strong>@danilolarap</strong>
          </a>
          <a href={`mailto:${copy.contact.emailAddress}`}>
            <span>{copy.contact.email}</span>
            <strong>{copy.contact.emailAddress}</strong>
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`panel ${stationId ? `panel-${stationId}` : "help-panel"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="world-dialog-title"
      >
        <div className="panel-head">
          <span className="panel-label">
            {stationId
              ? `${copy.common.section} / ${copy.world.stations[stationId]}`
              : copy.world.instructions}
          </span>
          <button
            ref={closeButtonRef}
            className="panel-close"
            type="button"
            onClick={onClose}
            aria-label={copy.world.close}
          >
            X
          </button>
        </div>
        <div className="panel-content">
          <span className="panel-kicker">DANILO.DEV / WORLD 01</span>
          <h2 id="world-dialog-title">{title}</h2>
          <p className="panel-description">
            {stationId
              ? copy.world.stationDescriptions[stationId]
              : copy.world.helpDescription}
          </p>
          {helpOpen ? (
            <div className="help-rows">
              {copy.world.helpRows.map((row, index) => (
                <div key={row}>
                  <span className="help-keys">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{row}</span>
                </div>
              ))}
            </div>
          ) : stationId ? (
            stationContent()
          ) : null}
          {stationId ? (
            <a
              className="start-button"
              href={`#${stationId}`}
              onClick={onClose}
            >
              {copy.world.enterSection}
              <span aria-hidden="true" className="button-arrow" />
            </a>
          ) : (
            <button className="start-button" type="button" onClick={onClose}>
              {copy.world.start}
              <span aria-hidden="true" className="button-arrow" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
