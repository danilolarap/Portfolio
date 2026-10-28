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
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(event.key)
      ) {
        keys.current.add(event.key);
        if (event.key.startsWith("Arrow")) event.preventDefault();
      }
      if (!paused && (event.key === "e" || event.key === "E")) {
        const p = positionRef.current;
        const station = STATIONS.find(
          (item) => Math.hypot(p.x - item.x, p.y - item.y) < 1.75,
        );
        if (station) onInteract(station.id);
      }
    };
    const keyUp = (event: KeyboardEvent) => keys.current.delete(event.key);
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", blur);
    const interval = window.setInterval(() => {
      if (paused) {
        setMoving(false);
        return;
      }
      const held = keys.current;
      const horizontal =
        Number(held.has("d") || held.has("ArrowRight")) -
        Number(held.has("a") || held.has("ArrowLeft"));
      const vertical =
        Number(held.has("s") || held.has("ArrowDown")) -
        Number(held.has("w") || held.has("ArrowUp"));
      if (!horizontal && !vertical) {
        setMoving(false);
        return;
      }
      setMoving(true);
      const normal = horizontal && vertical ? Math.SQRT1_2 : 1;
      const p = positionRef.current;
      const next = {
        x: Math.max(
          0.6,
          Math.min(7.4, p.x + (vertical * 0.075 + horizontal * 0.04) * normal),
        ),
        y: Math.max(
          0.6,
          Math.min(7.4, p.y + (vertical * 0.075 - horizontal * 0.04) * normal),
        ),
      };
      positionRef.current = next;
      onPlayerPosition(next);
    }, 25);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("blur", blur);
    };
  }, [onInteract, onPlayerPosition, paused]);

  const floorTiles: React.ReactNode[] = [];
  for (let x = 0; x < 8; x++)
    for (let y = 0; y < 8; y++) {
      const a = iso(x, y),
        b = iso(x + 1, y),
        c = iso(x + 1, y + 1),
        d = iso(x, y + 1);
      const color =
        (x + y) % 4 === 0
          ? "#c7d5d0"
          : (x * 3 + y) % 5 === 0
            ? "#b0c6c0"
            : "#bccfc8";
      floorTiles.push(
        <polygon
          key={`${x}-${y}`}
          points={points(a, b, c, d)}
          fill={color}
          stroke="#a3bcb5"
          strokeWidth="1.2"
        />,
      );
    }

  const entities = [
    {
      y: 2.2,
      node: (
        <Cube
          key="stone1"
          x={1.2}
          y={1}
          size={0.54}
          height={22}
          top="#9eb7b4"
          left="#668889"
          right="#557a80"
        />
      ),
    },
    { y: 3.7, node: <Sprout key="sprout1" x={0.7} y={3} /> },
    {
      y: 6.2,
      node: (
        <Cube
          key="ore1"
          x={0.55}
          y={5.7}
          size={0.48}
          height={15}
          top="#8dd3ce"
          left="#4d888d"
          right="#386b75"
        />
      ),
    },
    { y: 5.1, node: <Sprout key="sprout2" x={3.1} y={4.4} color="#5cb798" /> },
    {
      y: 1.9,
      node: (
        <Cube
          key="stone2"
          x={5.9}
          y={0.7}
          size={0.54}
          height={22}
          top="#a6c0bc"
          left="#668889"
          right="#557a80"
        />
      ),
    },
    {
      y: 3.8,
      node: <Sprout key="sprout3" x={7.15} y={3.15} color="#5da891" />,
    },
    {
      y: 7.4,
      node: (
        <Cube
          key="ore2"
          x={3.35}
          y={6.9}
          size={0.45}
          height={13}
          top="#f1d293"
          left="#a48665"
          right="#8f6e59"
        />
      ),
    },
    ...STATIONS.map((station) => ({
      y: station.x + station.y,
      node: (
        <Station
          key={station.id}
          station={station}
          label={world.stations[station.id]}
          openLabel={world.open}
          near={nearId === station.id}
          visited={visited.includes(station.id)}
          onClick={() => onInteract(station.id)}
        />
      ),
    })),
    {
      y: playerPosition.x + playerPosition.y,
      node: <Player key="player" position={playerPosition} moving={moving} />,
    },
  ].sort((a, b) => a.y - b.y);

  return (
    <svg
      className="game-world"
      viewBox="0 30 1200 565"
      role="group"
      aria-label={world.title}
    >
      <defs>
        <pattern
          id="world-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 28 0 H 0 V 28"
            fill="none"
            stroke="#417079"
            strokeWidth="1"
            opacity=".17"
          />
        </pattern>
        <radialGradient id="world-glow">
          <stop offset="0" stopColor="#3b7778" stopOpacity=".45" />
          <stop offset="1" stopColor="#173a44" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="1200" height="700" fill="#102e39" />
      <rect width="1200" height="700" fill="url(#world-grid)" />
      <ellipse cx="600" cy="372" rx="485" ry="310" fill="url(#world-glow)" />
      <g className="floating-specks" fill="#74c9c3" opacity=".45">
        <rect x="145" y="125" width="4" height="4" />
        <rect x="1040" y="190" width="3" height="3" />
        <rect x="922" y="586" width="4" height="4" />
        <rect x="224" y="572" width="3" height="3" />
        <rect x="352" y="120" width="2" height="2" />
        <rect x="845" y="100" width="3" height="3" />
      </g>
      <ellipse
        cx="600"
        cy="442"
        rx="430"
        ry="142"
        fill="#071f27"
        opacity=".38"
        filter="url(#soft-glow)"
      />
      <polygon
        points="208,345 600,545 992,345 992,373 600,575 208,373"
        fill="#416c72"
        stroke="#274b54"
        strokeWidth="6"
      />
      <polygon
        points="208,345 600,145 992,345 600,545"
        fill="#b9cdc6"
        stroke="#1d4650"
        strokeWidth="6"
      />
      {floorTiles}
      <polygon
        points="208,345 600,145 600,66 208,266"
        fill="#839fa0"
        stroke="#203e49"
        strokeWidth="7"
      />
      <polygon
        points="600,145 992,345 992,266 600,66"
        fill="#759499"
        stroke="#203e49"
        strokeWidth="7"
      />
      <path
        d="M 214 269 L 600 74 L 986 269"
        fill="none"
        stroke="#d0ddd2"
        strokeWidth="5"
        opacity=".75"
      />
      <path
        d="M 242 273 L 242 324 M 289 248 L 289 297 M 337 223 L 337 273 M 386 199 L 386 248 M 435 174 L 435 223 M 484 149 L 484 199 M 533 124 L 533 174 M 670 108 L 670 178 M 740 143 L 740 213 M 810 179 L 810 249 M 880 215 L 880 285 M 950 250 L 950 320"
        stroke="#54777d"
        strokeWidth="2"
        opacity=".5"
      />
      <path
        d="M 208 345 L 600 545 L 992 345"
        fill="none"
        stroke="#eff5e9"
        strokeWidth="4"
        opacity=".65"
      />
      <g className="wall-ornament">
        <rect
          x="558"
          y="78"
          width="85"
          height="24"
          fill="#21424b"
          stroke="#a4c9c1"
          strokeWidth="3"
        />
        <text
          x="600"
          y="94"
          textAnchor="middle"
          className="svg-room-title"
          fill="#e4f6e9"
        >
          WORLD 01
        </text>
      </g>
      {entities.map((entity) => entity.node)}
    </svg>
  );
}
