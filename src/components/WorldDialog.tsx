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
          ) : (
            <div className="panel-note">{copy.common.pendingDetail}</div>
          )}
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
