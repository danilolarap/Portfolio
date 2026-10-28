"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameCanvas, { STATIONS, type Point } from "./GameCanvas";
import WorldDialog from "./WorldDialog";
import type { PortfolioContent, StationId } from "@/data/content";

export default function Hero({ copy }: { copy: PortfolioContent }) {
  const [activeStation, setActiveStation] = useState<StationId | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [visited, setVisited] = useState<StationId[]>([]);
  const [playerPosition, setPlayerPosition] = useState<Point>({
    x: 3.3,
    y: 4.2,
  });
  const [worldVisible, setWorldVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const openStation = useCallback((id: StationId) => {
    setActiveStation(id);
    setVisited((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }, []);
  const closeDialog = useCallback(() => {
    setActiveStation(null);
    setHelpOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setWorldVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
      if (
        worldVisible &&
        !activeStation &&
        !helpOpen &&
        /^[1-4]$/.test(event.key)
      )
        openStation(STATIONS[Number(event.key) - 1].id);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStation, closeDialog, helpOpen, openStation, worldVisible]);

  const moveTouch = (direction: "up" | "down" | "left" | "right") =>
    setPlayerPosition((point) => {
      const steps = {
        up: [-0.35, -0.35],
        down: [0.35, 0.35],
        left: [-0.25, 0.25],
        right: [0.25, -0.25],
      };
      const [dx, dy] = steps[direction];
      return {
        x: Math.max(0.6, Math.min(7.4, point.x + dx)),
        y: Math.max(0.6, Math.min(7.4, point.y + dy)),
      };
    });
  const interactTouch = () => {
    const nearest = STATIONS.reduce(
      (best, station) => {
        const distance = Math.hypot(
          playerPosition.x - station.x,
          playerPosition.y - station.y,
        );
        return distance < best.distance ? { id: station.id, distance } : best;
      },
      { id: null as StationId | null, distance: Infinity },
    );
    if (nearest.id && nearest.distance < 1.8) openStation(nearest.id);
  };

  return (
    <section id="home" ref={sectionRef} className="game-shell hero-section">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="intro">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          {copy.hero.eyebrow}
          <span className="eyebrow-line" />
        </div>
        <h1>
          {copy.hero.titleFirst}
          <br />
          <span>{copy.hero.titleSecond}</span>
        </h1>
        <p>{copy.hero.description}</p>
        <div className="hero-actions">
          <a className="primary-link" href="#about">
            {copy.hero.explore}
            <span className="button-arrow" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="secondary-link"
            disabled
            aria-describedby="cv-note"
          >
            {copy.hero.cvUnavailable}
          </button>
        </div>
        <p id="cv-note" className="cv-note">
          {copy.hero.cvNote}
        </p>
      </div>
      <div className="scene-frame">
        <div className="scene-topline">
          <span className="scene-live-dot" />
          {copy.world.title}
          <span className="scene-topline-right">V 1.0 / {copy.world.mode}</span>
          <button
            className="scene-help"
            type="button"
            onClick={() => setHelpOpen(true)}
            aria-label={copy.world.instructions}
            title={copy.world.instructions}
          >
            ?
          </button>
        </div>
        <GameCanvas
          onInteract={openStation}
          paused={Boolean(activeStation || helpOpen || !worldVisible)}
          playerPosition={playerPosition}
          onPlayerPosition={setPlayerPosition}
          visited={visited}
          world={copy.world}
        />
        <div className="scene-corner corner-tl" />
        <div className="scene-corner corner-tr" />
        <div className="scene-corner corner-bl" />
        <div className="scene-corner corner-br" />
        <div className="minimap" aria-label={copy.world.map}>
          <div className="minimap-head">
            <span>{copy.world.map}</span>
            <span>01 / 01</span>
          </div>
          <div className="minimap-art">
            <div className="mini-diamond" />
            {STATIONS.map((station) => (
              <span
                key={station.id}
                className={`mini-station mini-${station.id}`}
              />
            ))}
            <span
              className="mini-player"
              style={{
                left: `${50 + (playerPosition.x - playerPosition.y) * 5}%`,
                top: `${48 + (playerPosition.x + playerPosition.y - 8) * 2.5}%`,
              }}
            />
          </div>
        </div>
        <div className="scene-status">
          <span className="status-pulse" />
          {visited.length === 4
            ? copy.world.completed
            : `${visited.length} / 4 ${copy.world.discovered}`}
        </div>
      </div>
      <div className="bottom-ui">
        <div className="control-hint">
          <span className="keycap">W</span>
          <span className="keycap">A</span>
          <span className="keycap">S</span>
          <span className="keycap">D</span>
          <span className="hint-copy">{copy.world.move}</span>
          <span className="hint-divider" />
          <span className="keycap wide">E</span>
          <span className="hint-copy">{copy.world.interact}</span>
        </div>
        <div className="hotbar" aria-label={copy.world.title}>
          {STATIONS.map((station, index) => (
            <button
              key={station.id}
              type="button"
              className={`hotbar-slot ${activeStation === station.id ? "selected" : ""}`}
              onClick={() => openStation(station.id)}
              title={copy.world.stations[station.id]}
              aria-label={`${copy.world.open} ${copy.world.stations[station.id]}`}
            >
              <span className="slot-number">{index + 1}</span>
              <span className={`slot-icon ${station.id}`}>
                {copy.world.stations[station.id][0]}
              </span>
              {visited.includes(station.id) && (
                <span className="slot-visited" />
              )}
            </button>
          ))}
        </div>
        <div className="player-chip">
          <span className="player-avatar">D</span>
          <span>
            <strong>DANILO</strong>
            <small>{copy.world.playerRole}</small>
          </span>
        </div>
      </div>
      <div className="mobile-controls" aria-label={copy.world.move}>
        <div className="dpad">
          <button
            type="button"
            aria-label={copy.world.directions.up}
            onClick={() => moveTouch("up")}
          >
            <span className="dpad-arrow up" />
          </button>
          <div>
            <button
              type="button"
              aria-label={copy.world.directions.left}
              onClick={() => moveTouch("left")}
            >
              <span className="dpad-arrow left" />
            </button>
            <button
              type="button"
              aria-label={copy.world.directions.down}
              onClick={() => moveTouch("down")}
            >
              <span className="dpad-arrow down" />
            </button>
            <button
              type="button"
              aria-label={copy.world.directions.right}
              onClick={() => moveTouch("right")}
            >
              <span className="dpad-arrow right" />
            </button>
          </div>
        </div>
        <button
          type="button"
          className="interact-touch"
          onClick={interactTouch}
          aria-label={copy.world.interact}
        >
          E
        </button>
      </div>
      <div className="hero-footnote">{copy.world.touchHelp}</div>
      <WorldDialog
        stationId={activeStation}
        helpOpen={helpOpen}
        copy={copy}
        onClose={closeDialog}
      />
    </section>
  );
}
