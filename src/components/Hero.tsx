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
  const touchVector = useRef<Point>({ x: 0, y: 0 });
  const joystickKnobRef = useRef<HTMLSpanElement>(null);
  const [actionVersion, setActionVersion] = useState(0);

  const resetJoystick = useCallback(() => {
    touchVector.current = { x: 0, y: 0 };
    if (joystickKnobRef.current)
      joystickKnobRef.current.style.transform = "translate(0px, 0px)";
  }, []);
  const openStation = useCallback(
    (id: StationId) => {
      resetJoystick();
      setActiveStation(id);
      setVisited((current) =>
        current.includes(id) ? current : [...current, id],
      );
    },
    [resetJoystick],
  );
  const closeDialog = useCallback(() => setActiveStation(null), []);

  useEffect(() => {
    if (screen !== "game") resetJoystick();
  }, [screen, resetJoystick]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeStation) closeDialog();
      else if (screen !== "title") setScreen("title");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStation, closeDialog, screen]);

  const setTouchVector = (vector: Point) => {
    touchVector.current = vector;
    if (joystickKnobRef.current)
      joystickKnobRef.current.style.transform = `translate(${vector.x * 27}px, ${vector.y * 27}px)`;
  };

  const updateJoystick = (event: PointerEvent<HTMLDivElement>) => {
    if (screen !== "game" || activeStation) return;
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
      className={`game-shell hero-section game-screen-${screen}`}
    >
      <div className="world-stage">
        <GameCanvas
          active={screen === "game" && !activeStation}
          suspended={Boolean(activeStation)}
          world={copy.world}
          touchVector={touchVector}
          actionVersion={actionVersion}
          onInteract={openStation}
          onNearbyChange={setNearby}
        />
        <div className="game-vignette" aria-hidden="true" />

        {screen === "game" ? (
          <>
            <div className="game-hud-top">
              <div className="hud-world-title">
                <span className="hud-live-dot" />
                <span>{copy.world.title}</span>
                <small>{copy.world.mode}</small>
              </div>
              <div className="hud-progress">
                <span>
                  {visited.length === 4
                    ? copy.world.completed
                    : `${visited.length} / 4 ${copy.world.discovered}`}
                </span>
                <span className="hud-progress-track">
                  <span style={{ width: `${visited.length * 25}%` }} />
                </span>
              </div>
              <button
                className="hud-menu-button"
                type="button"
                onClick={() => setScreen("title")}
              >
                {copy.world.exit}
              </button>
            </div>

            <div className="game-hud-bottom">
              <div className="game-player-card">
                <span className="tiny-player" aria-hidden="true">
                  <i />
                </span>
                <span>
                  <strong>{copy.playerName}</strong>
                  <small>{copy.world.playerRole}</small>
                </span>
              </div>
              <div className="game-key-hints">
                <span>
                  <kbd>W</kbd>
                  <kbd>A</kbd>
                  <kbd>S</kbd>
                  <kbd>D</kbd>
                  <small>{copy.world.move}</small>
                </span>
                <span>
                  <kbd>E</kbd>
                  <small>{copy.world.interact}</small>
                </span>
              </div>
              <div className="game-hotbar" aria-label={copy.world.title}>
                {STATIONS.map((station, index) => (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => openStation(station.id)}
                    aria-label={`${copy.world.open} ${copy.world.stations[station.id]}`}
                    title={copy.world.stations[station.id]}
                  >
                    <small>{index + 1}</small>
                    <span className={`hotbar-glyph glyph-${station.id}`} />
                    {visited.includes(station.id) && <i />}
                  </button>
                ))}
              </div>
            </div>

            <div className="touch-game-controls">
              <div
                className="virtual-joystick"
                role="group"
                aria-label={copy.welcome.joystickLabel}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  updateJoystick(event);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    updateJoystick(event);
                }}
                onPointerUp={stopJoystick}
                onPointerCancel={stopJoystick}
                onLostPointerCapture={resetJoystick}
              >
                <span className="joystick-ring" />
                <span ref={joystickKnobRef} className="joystick-knob" />
              </div>
              <button
                className="touch-action-button"
                type="button"
                onClick={() => setActionVersion((value) => value + 1)}
                aria-label={copy.welcome.actionLabel}
              >
                <span className="action-key">E</span>
                <small>{copy.world.interact}</small>
              </button>
            </div>
            <p className="world-touch-hint">
              {nearby
                ? `${copy.world.open}: ${copy.world.stations[nearby]}`
                : copy.world.tapHint}
            </p>
          </>
        ) : (
          <div className="game-menu-layer">
            {screen === "title" ? (
              <section className="login-panel" aria-labelledby="welcome-title">
                <div className="game-wordmark">
                  <strong>MINEFOLIO</strong>
                </div>
                <p className="login-version">
                  {copy.playerName} <span>·</span> PORTFOLIO EDITION
                </p>
                <p className="login-profile">{copy.playerSubtitle}</p>
                <h1 id="welcome-title">{copy.welcome.title}</h1>
                <p className="login-subtitle">{copy.welcome.subtitle}</p>
                <div className="login-divider">
                  <span />
                  <i />
                  <span />
                </div>
                <button
                  className="login-play-button"
                  type="button"
                  onClick={() => setScreen("game")}
                >
                  <span>{copy.welcome.play}</span>
                  <i aria-hidden="true" />
                </button>
                <button
                  className="login-controls-button"
                  type="button"
                  onClick={() => setScreen("controls")}
                >
                  {copy.welcome.controls}
                </button>
                <p className="login-footnote">{copy.welcome.menuFooter}</p>
              </section>
            ) : (
              <section
                className="controls-panel"
                aria-labelledby="controls-title"
              >
                <div className="controls-panel-head">
                  <span>WORLD GUIDE / 01</span>
                  <span className="pixel-status" />
                </div>
                <h1 id="controls-title">{copy.welcome.controls}</h1>
                <p>{copy.welcome.objective}</p>
                <div className="controls-columns">
                  <div className="controls-column">
                    <h2>{copy.welcome.keyboardTitle}</h2>
                    <div className="control-row">
                      <span className="key-cluster">
                        <kbd>W</kbd>
                        <kbd>A</kbd>
                        <kbd>S</kbd>
                        <kbd>D</kbd>
                      </span>
                      <span>{copy.world.move}</span>
                    </div>
                    <div className="control-row">
                      <kbd>E</kbd>
                      <span>{copy.world.interact}</span>
                    </div>
                    <div className="control-row">
                      <kbd>ESC</kbd>
                      <span>{copy.welcome.returnToTitle}</span>
                    </div>
                  </div>
                  <div className="controls-column touch-instructions">
                    <h2>{copy.welcome.mobileTitle}</h2>
                    <div className="control-row">
                      <span className="control-symbol joystick-symbol" />
                      <span>{copy.world.move}</span>
                    </div>
                    <div className="control-row">
                      <span className="control-symbol action-symbol">E</span>
                      <span>{copy.world.interact}</span>
                    </div>
                    <div className="control-row">
                      <span className="control-symbol tap-symbol" />
                      <span>{copy.world.tapHint}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="login-play-button controls-back-button"
                  type="button"
                  onClick={() => setScreen("title")}
                >
                  <span>{copy.welcome.back}</span>
                  <i aria-hidden="true" />
                </button>
              </section>
            )}
          </div>
        )}
      </div>
      <WorldDialog
        stationId={activeStation}
        helpOpen={false}
        copy={copy}
        onClose={closeDialog}
      />
    </section>
  );
}
