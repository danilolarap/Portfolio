"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import type { PortfolioContent, StationId } from "@/data/content";

export interface Point {
  x: number;
  y: number;
}

export const STATIONS: { id: StationId; x: number; y: number }[] = [
  { id: "projects", x: 3, y: 3 },
  { id: "skills", x: 9, y: 3 },
  { id: "about", x: 3, y: 9 },
  { id: "contact", x: 9, y: 9 },
];

interface GameCanvasProps {
  active: boolean;
  world: PortfolioContent["world"];
  touchVector: Point;
  actionVersion: number;
  onInteract: (id: StationId) => void;
  onNearbyChange: (id: StationId | null) => void;
}

const colors = {
  grass: ["#588c32", "#63983a", "#527f2d", "#6a9b3b"],
  path: ["#b99a61", "#c6a96e", "#ae8d56"],
  water: ["#3c8b91", "#4b9da0"],
};

function polygon(
  context: CanvasRenderingContext2D,
  points: Point[],
  fill: string,
  stroke?: string,
) {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) context.lineTo(point.x, point.y);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  if (stroke) {
    context.strokeStyle = stroke;
    context.lineWidth = 1;
    context.stroke();
  }
}

export default function GameCanvas({
  active,
  world,
  touchVector,
  actionVersion,
  onInteract,
  onNearbyChange,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerStartRef = useRef<Point | null>(null);
  const positionRef = useRef<Point>({ x: 6, y: 6 });
  const velocityRef = useRef<Point>({ x: 0, y: 0 });
  const walkPhaseRef = useRef(0);
  const movementRef = useRef(0);
  const facingRef = useRef<"front" | "back" | "left" | "right">("front");
  const keysRef = useRef(new Set<string>());
  const touchRef = useRef(touchVector);
  const nearbyRef = useRef<StationId | null>(null);
  const lastActionRef = useRef(actionVersion);
  const callbacksRef = useRef({ onInteract, onNearbyChange });
  const worldRef = useRef(world);

  touchRef.current = touchVector;
  callbacksRef.current = { onInteract, onNearbyChange };
  worldRef.current = world;

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "e",
        ].includes(key)
      ) {
        event.preventDefault();
        keysRef.current.add(key);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key.toLowerCase());
    };
    const clearKeys = () => keysRef.current.clear();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearKeys);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearKeys);
      clearKeys();
      velocityRef.current = { x: 0, y: 0 };
      movementRef.current = 0;
    };
  }, [active]);

  useEffect(() => {
    if (!active || actionVersion === lastActionRef.current) return;
    lastActionRef.current = actionVersion;
    if (nearbyRef.current) callbacksRef.current.onInteract(nearbyRef.current);
  }, [actionVersion, active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let frame = 0;
    let animation = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let tile = 44;
    let nearbyId: StationId | null = null;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      tile = Math.max(27, Math.min(76, Math.min(width / 11.5, height / 7.7)));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const project = (x: number, y: number, z = 0): Point => ({
      x: width * 0.5 + (x - y) * tile * 0.5,
      y: height * 0.54 + (x + y) * tile * 0.25 - z,
    });

    const drawTile = (
      x: number,
      y: number,
      type: "grass" | "path" | "water",
    ) => {
      const center = project(
        x - positionRef.current.x,
        y - positionRef.current.y,
      );
      const halfW = tile * 0.5;
      const halfH = tile * 0.25;
      const palette =
        type === "grass"
          ? colors.grass
          : type === "path"
            ? colors.path
            : colors.water;
      const fill = palette[(x * 5 + y * 7) % palette.length];
      polygon(
        context!,
        [
          { x: center.x, y: center.y - halfH },
          { x: center.x + halfW, y: center.y },
          { x: center.x, y: center.y + halfH },
          { x: center.x - halfW, y: center.y },
        ],
        fill,
        "rgba(28, 62, 34, .28)",
      );
      if (type === "grass" && (x * 13 + y * 3) % 11 === 0) {
        context!.fillStyle = "rgba(164, 202, 89, .65)";
        context!.fillRect(center.x - 2, center.y - 1, 4, 3);
      }
      if (type === "water") {
        context!.fillStyle = "rgba(180, 230, 206, .3)";
        context!.fillRect(center.x - 4, center.y - 1, 8, 2);
      }
    };

    const block = (
      x: number,
      y: number,
      top: string,
      left: string,
      right: string,
      size = 0.9,
      elevation = 13,
    ) => {
      const a = project(
        x - positionRef.current.x,
        y - positionRef.current.y,
        elevation,
      );
      const b = project(
        x + size - positionRef.current.x,
        y - positionRef.current.y,
        elevation,
      );
      const c = project(
        x + size - positionRef.current.x,
        y + size - positionRef.current.y,
        elevation,
      );
      const d = project(
        x - positionRef.current.x,
        y + size - positionRef.current.y,
        elevation,
      );
      const b0 = project(
        x + size - positionRef.current.x,
        y - positionRef.current.y,
      );
      const c0 = project(
        x + size - positionRef.current.x,
        y + size - positionRef.current.y,
      );
      const d0 = project(
        x - positionRef.current.x,
        y + size - positionRef.current.y,
      );
      polygon(context!, [d, c, c0, d0], left);
      polygon(context!, [b, c, c0, b0], right);
      polygon(context!, [a, b, c, d], top, "rgba(27, 51, 35, .45)");
    };

    const drawTree = (x: number, y: number, variant: number) => {
      const point = project(
        x - positionRef.current.x,
        y - positionRef.current.y,
      );
      block(x - 0.1, y - 0.1, "#795234", "#62402b", "#503722", 0.24, 18);
      block(
        x - 0.54,
        y - 0.45,
        variant ? "#558d3d" : "#4c8538",
        "#376a31",
        "#315d2d",
        0.95,
        34,
      );
      block(x - 0.34, y - 0.28, "#69a447", "#477d36", "#396b31", 0.58, 50);
      context!.fillStyle = "rgba(12, 38, 22, .28)";
      context!.fillRect(point.x - 9, point.y + 5, 19, 4);
    };

    const drawChest = (x: number, y: number) => {
      block(x, y, "#bd8741", "#8e552c", "#754325", 0.58, 11);
      const point = project(
        x + 0.3 - positionRef.current.x,
        y - positionRef.current.y,
        20,
      );
      context!.fillStyle = "#f0c36a";
      context!.fillRect(point.x - 2, point.y + 4, 4, 3);
      context!.fillStyle = "#593a25";
      context!.fillRect(point.x - 1, point.y + 4, 2, 2);
    };

    const drawBuilding = (
      station: (typeof STATIONS)[number],
      index: number,
    ) => {
      const palettes = [
        ["#4ca99b", "#287a72", "#22635e", "#193e3a"],
        ["#a779c2", "#79539d", "#60437f", "#3b3158"],
        ["#d0a75d", "#9b7139", "#79552f", "#573b28"],
        ["#cf7262", "#9c4c45", "#783c3a", "#502c31"],
      ][index];
      const x = station.x - 0.75;
      const y = station.y - 0.9;
      block(x, y, palettes[0], palettes[1], palettes[2], 1.55, 20);
      block(x + 0.22, y + 0.08, palettes[0], palettes[1], palettes[2], 1.1, 53);
      block(x + 0.12, y + 0.05, palettes[3], palettes[3], palettes[3], 0.3, 43);
      block(x + 0.68, y + 0.06, palettes[3], palettes[3], palettes[3], 0.3, 43);
      block(x + 0.42, y - 0.1, palettes[0], palettes[1], palettes[2], 0.45, 75);
      const sign = project(
        station.x - positionRef.current.x,
        station.y - 1.45 - positionRef.current.y,
        54,
      );
      context!.fillStyle = "#142b29";
      context!.fillRect(sign.x - 40, sign.y - 7, 80, 15);
      context!.strokeStyle = "#c4dca2";
      context!.strokeRect(sign.x - 40, sign.y - 7, 80, 15);
      context!.fillStyle = "#edf1d6";
      context!.font = `bold ${Math.max(7, tile * 0.2)}px monospace`;
      context!.textAlign = "center";
      context!.textBaseline = "middle";
      context!.fillText(
        worldRef.current.stations[station.id],
        sign.x,
        sign.y + 0.5,
        74,
      );
      drawChest(station.x + 0.75, station.y + 0.63);
    };

    const drawPlayer = () => {
      const center = project(0, 0);
      const motion = movementRef.current;
      const idleBreath = Math.sin(frame * 0.055) * 0.45;
      const bob =
        Math.abs(Math.sin(walkPhaseRef.current * 2)) * 2.2 * motion +
        idleBreath;
      const stride = Math.sin(walkPhaseRef.current) * 4.2 * motion;
      const oppositeStride = -stride;
      const scale = Math.max(0.72, Math.min(1.15, tile / 46));

      context!.save();
      context!.translate(center.x, center.y + bob);
      context!.scale(scale, scale);
      context!.fillStyle = "rgba(14, 39, 33, .42)";
      context!.beginPath();
      context!.ellipse(0, 17, 13 - motion * 1.5, 4, 0, 0, Math.PI * 2);
      context!.fill();

      context!.fillStyle = "#1b2934";
      context!.fillRect(-9 + stride, 12 + Math.max(0, -stride) * 0.25, 8, 4);
      context!.fillRect(
        1 + oppositeStride,
        12 + Math.max(0, stride) * 0.25,
        8,
        4,
      );
      context!.fillStyle = "#31567a";
      context!.fillRect(-8 + stride, 2 + Math.max(0, -stride) * 0.3, 7, 12);
      context!.fillRect(
        1 + oppositeStride,
        2 + Math.max(0, stride) * 0.3,
        7,
        12,
      );

      const armSwing = -stride * 0.8;
      context!.fillStyle = "#157f8c";
      context!.fillRect(-14, -9 + armSwing, 5, 13);
      context!.fillRect(9, -9 - armSwing, 5, 13);
      context!.fillStyle = "#dca775";
      context!.fillRect(-14, 2 + armSwing, 5, 5);
      context!.fillRect(9, 2 - armSwing, 5, 5);

      context!.fillStyle = "#176f7a";
      context!.fillRect(-10, -12, 20, 17);
      context!.fillStyle = "#28aeb5";
      context!.fillRect(-9, -12, 17, 14);
      context!.fillStyle = "#8fe1d1";
      context!.fillRect(-7, -10, 4, 5);

      context!.fillStyle = "#bf875e";
      context!.fillRect(-9, -29, 18, 18);
      context!.fillStyle = "#dca775";
      context!.fillRect(-7, -29, 14, 16);
      context!.fillStyle = "#315f8c";
      context!.fillRect(-10, -32, 20, 7);
      context!.fillRect(-8, -36, 15, 5);
      context!.fillStyle = "#447ba4";
      context!.fillRect(-5, -35, 8, 3);

      if (facingRef.current === "front") {
        context!.fillStyle = "#e9e4c7";
        context!.fillRect(-5, -23, 4, 4);
        context!.fillRect(3, -23, 4, 4);
        context!.fillStyle = "#293642";
        context!.fillRect(-3, -22, 2, 3);
        context!.fillRect(5, -22, 2, 3);
      } else if (facingRef.current === "left") {
        context!.fillStyle = "#e9e4c7";
        context!.fillRect(-6, -23, 4, 4);
        context!.fillStyle = "#293642";
        context!.fillRect(-6, -22, 2, 3);
      } else if (facingRef.current === "right") {
        context!.fillStyle = "#e9e4c7";
        context!.fillRect(2, -23, 4, 4);
        context!.fillStyle = "#293642";
        context!.fillRect(4, -22, 2, 3);
      }
      context!.restore();

      context!.font = `bold ${Math.max(8, tile * 0.22)}px monospace`;
      context!.textAlign = "center";
      context!.fillStyle = "#f2f2d8";
      context!.fillText(
        worldRef.current.playerRole.split(" /")[0],
        center.x,
        center.y - 43 * scale + bob,
      );
    };

    const draw = (time: number) => {
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;
      previousTime = time;
      if (active) {
        const keys = keysRef.current;
        const sx =
          Number(keys.has("d") || keys.has("arrowright")) -
          Number(keys.has("a") || keys.has("arrowleft"));
        const sy =
          Number(keys.has("s") || keys.has("arrowdown")) -
          Number(keys.has("w") || keys.has("arrowup"));
        const touch = touchRef.current;
        const moveX = sx || touch.x;
        const moveY = sy || touch.y;
        const inputLength = Math.hypot(moveX, moveY);
        const inputStrength = Math.min(1, inputLength);
        const targetVelocity =
          inputLength > 0.08
            ? {
                x:
                  (((moveX + moveY) * 0.707) / inputLength) *
                  2.45 *
                  inputStrength,
                y:
                  (((moveY - moveX) * 0.707) / inputLength) *
                  2.45 *
                  inputStrength,
              }
            : { x: 0, y: 0 };
        const response = Math.min(1, delta * (inputStrength > 0.08 ? 11 : 13));
        velocityRef.current.x +=
          (targetVelocity.x - velocityRef.current.x) * response;
        velocityRef.current.y +=
          (targetVelocity.y - velocityRef.current.y) * response;

        if (inputStrength > 0.08) {
          if (Math.abs(moveX) > Math.abs(moveY))
            facingRef.current = moveX < 0 ? "left" : "right";
          else facingRef.current = moveY < 0 ? "back" : "front";
        }

        const next = {
          x: positionRef.current.x + velocityRef.current.x * delta,
          y: positionRef.current.y + velocityRef.current.y * delta,
        };
        const outsideWorld =
          next.x <= 0.45 ||
          next.x >= 11.55 ||
          next.y <= 0.45 ||
          next.y >= 11.55;
        const blockedByStation = STATIONS.some(
          (station) =>
            Math.hypot(next.x - station.x, next.y - station.y) < 1.02,
        );
        if (outsideWorld || blockedByStation)
          velocityRef.current = { x: 0, y: 0 };
        else positionRef.current = next;

        movementRef.current = Math.min(
          1,
          Math.hypot(velocityRef.current.x, velocityRef.current.y) / 2.45,
        );
        if (movementRef.current > 0.04)
          walkPhaseRef.current += delta * (8 + movementRef.current * 7);

        if (keys.has("e")) {
          if (nearbyRef.current)
            callbacksRef.current.onInteract(nearbyRef.current);
          keys.delete("e");
        }
      }

      context!.clearRect(0, 0, width, height);
      const backdrop = context!.createLinearGradient(0, 0, 0, height);
      backdrop.addColorStop(0, "#25485a");
      backdrop.addColorStop(1, "#172e39");
      context!.fillStyle = backdrop;
      context!.fillRect(0, 0, width, height);
      for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 12; x++) {
          const inPath =
            ((x === 5 || x === 6) && y > 1 && y < 11) ||
            ((y === 5 || y === 6) && x > 1 && x < 11);
          const water =
            (x === 0 && y > 7) || (x === 1 && y > 9) || (x === 11 && y < 3);
          drawTile(x, y, water ? "water" : inPath ? "path" : "grass");
        }
      }

      const props = [
        { x: 1, y: 2, type: "tree" },
        { x: 10, y: 1, type: "tree" },
        { x: 1, y: 7, type: "tree" },
        { x: 10, y: 10, type: "tree" },
        { x: 2, y: 10, type: "tree" },
        { x: 8, y: 1, type: "tree" },
        { x: 2, y: 4, type: "rock" },
        { x: 9, y: 7, type: "rock" },
        { x: 7, y: 10, type: "rock" },
      ];
      for (const prop of props) {
        if (prop.type === "tree")
          drawTree(prop.x, prop.y, (prop.x + prop.y) % 2);
        else block(prop.x, prop.y, "#a6aaa0", "#727f78", "#596c68", 0.55, 14);
      }
      STATIONS.forEach((station, index) => drawBuilding(station, index));

      const closest = STATIONS.reduce<{
        id: StationId | null;
        distance: number;
      }>(
        (best, station) => {
          const distance = Math.hypot(
            positionRef.current.x - station.x,
            positionRef.current.y - station.y,
          );
          return distance < best.distance ? { id: station.id, distance } : best;
        },
        { id: null, distance: Infinity },
      );
      nearbyId = closest.distance < 2.1 ? closest.id : null;
      if (nearbyId !== nearbyRef.current) {
        nearbyRef.current = nearbyId;
        callbacksRef.current.onNearbyChange(nearbyId);
      }
      drawPlayer();
      if (nearbyId) {
        const label = worldRef.current.open;
        const point = project(0, 0);
        context!.fillStyle = "rgba(12, 29, 31, .88)";
        context!.fillRect(point.x - 58, point.y + 24, 116, 20);
        context!.strokeStyle = "#d4d8a1";
        context!.strokeRect(point.x - 58, point.y + 24, 116, 20);
        context!.fillStyle = "#f0f0d3";
        context!.font = "bold 10px monospace";
        context!.textAlign = "center";
        context!.textBaseline = "middle";
        context!.fillText(
          `${label}: ${worldRef.current.stations[nearbyId]}`,
          point.x,
          point.y + 34,
          108,
        );
      }
      frame++;
      animation = window.requestAnimationFrame(draw);
    };

    animation = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(animation);
      observer.disconnect();
    };
  }, [active]);

  const selectStationAtPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!active) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const tileSize = Math.max(
      27,
      Math.min(76, Math.min(bounds.width / 11.5, bounds.height / 7.7)),
    );
    const targetX = event.clientX - bounds.left;
    const targetY = event.clientY - bounds.top;
    const selected = STATIONS.map((station) => ({
      id: station.id,
      x:
        bounds.width * 0.5 +
        (station.x -
          positionRef.current.x -
          (station.y - positionRef.current.y)) *
          tileSize *
          0.5,
      y:
        bounds.height * 0.54 +
        (station.x -
          positionRef.current.x +
          (station.y - positionRef.current.y)) *
          tileSize *
          0.25 -
        37,
    })).map((station) => ({
      ...station,
      distance: Math.hypot(station.x - targetX, station.y - targetY),
    }));
    const nearest = selected.sort(
      (first, second) => first.distance - second.distance,
    )[0];
    if (nearest.distance < tileSize * 1.8)
      callbacksRef.current.onInteract(nearest.id);
  };

  const startPointerSelection = (event: PointerEvent<HTMLCanvasElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };
  const finishPointerSelection = (event: PointerEvent<HTMLCanvasElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) < 12
    )
      selectStationAtPoint(event);
  };

  return (
    <canvas
      ref={canvasRef}
      className="game-world"
      onPointerDown={startPointerSelection}
      onPointerUp={finishPointerSelection}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
      aria-label={world.title}
      role="img"
    />
  );
}
