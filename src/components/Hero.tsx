"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import GameCanvas, { STATIONS, type Point } from "./GameCanvas";
import WorldDialog from "./WorldDialog";
import type { PortfolioContent, StationId } from "@/data/content";

type Screen = "title" | "controls" | "game";

export default function Hero({ copy }: { copy: PortfolioContent }) {
  const [screen, setScreen] = useState<Screen>("title");
  const [activeStation, setActiveStation] = useState<StationId | null>(null);
  const [visited, setVisited] = useState<StationId[]>([]);
  const [nearby, setNearby] = useState<StationId | null>(null);
  const [touchVector, setTouchVector] = useState<Point>({ x: 0, y: 0 });
  const [actionVersion, setActionVersion] = useState(0);
  const joystickRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const openStation = useCallback((id: StationId) => {
    setActiveStation(id);
    setVisited((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }, []);
  const closeDialog = useCallback(() => setActiveStation(null), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeStation) closeDialog();
      else if (screen !== "title") setScreen("title");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStation, closeDialog, screen]);

  const updateJoystick = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const radius = bounds.width * 0.36;
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.max(1, Math.hypot(dx, dy));
    const scale = Math.min(radius, distance) / radius;
    setTouchVector({ x: (dx / distance) * scale, y: (dy / distance) * scale });
  };
  const stopJoystick = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    setTouchVector({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`game-shell hero-section game-screen-${screen}`}
    >
      <div className="world-stage">
        <GameCanvas
          active={screen === "game" && !activeStation}
          world={copy.world}
          touchVector={touchVector}
          actionVersion={actionVersion}
          onInteract={openStation}
          onNearbyChange={setNearby}
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
