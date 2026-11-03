"use client";

import { useEffect, useRef } from "react";
import { drawCharacter, type CharacterId } from "./characterRenderer";

export default function CharacterPreview({
  character,
  large = false,
}: {
  character: CharacterId;
  large?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const width = large ? 240 : 120;
    const height = large ? 230 : 130;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);
    drawCharacter(ctx, {
      id: character,
      x: width / 2,
      y: height - 18,
      scale: large ? 5.4 : 2.9,
      yaw: -0.25,
    });
  }, [character, large]);
  return (
    <canvas
      ref={ref}
      className={large ? "character-preview-large" : "character-preview"}
      aria-hidden="true"
    />
  );
}
