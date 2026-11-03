export const CHARACTERS = [
  { id: "steve", name: "Steve", accent: "#22b9bc" },
  { id: "alex", name: "Alex", accent: "#a6c871" },
  { id: "dragon", name: "Dragón del End", accent: "#dd45ff" },
  { id: "purple", name: "Viajero púrpura", accent: "#9d44ed" },
] as const;

export type CharacterId = (typeof CHARACTERS)[number]["id"];
type Vec = { x: number; y: number; z: number };
type Part = "head" | "body" | "arm" | "leg" | "horn" | "snout";
type Face = "front" | "back" | "left" | "right" | "bottom" | "top";

// Broad, connected locks of hair. The head uses authored pixels rather than
// the procedural fabric noise, which made the scalp look like a checkerboard.
const HAIR = [
  "11122211",
  "11222211",
  "01221100",
  "00111000",
  "01100110",
  "11100111",
  "11001111",
  "10001110",
];

function hairColor(alex: boolean, u: number, v: number) {
  const palette = alex
    ? ["#ad581f", "#bb6425", "#c7752d"]
    : ["#382519", "#402b1c", "#493020"];
  return palette[Number(HAIR[v % 8][u % 8])];
}

export function isCharacterId(value: unknown): value is CharacterId {
  return CHARACTERS.some((character) => character.id === value);
}

function skin(id: CharacterId, part: Part, face: Face, u: number, v: number) {
  if (part === "horn") return "#b9bcb5";
  if (part === "snout")
    return v > 1 && face === "front" ? "#db17ef" : "#191b1d";
  if (id === "dragon") {
    if (
      part === "head" &&
      face === "front" &&
      v >= 3 &&
      v <= 4 &&
      (u === 1 || u === 2 || u === 5 || u === 6)
    )
      return v === 3 ? "#e478ff" : "#bd18ef";
    return part === "head" ? "#222426" : "#202224";
  }
  if (id === "purple") {
    if (part === "head")
      return ["#7014be", "#841bcd", "#9527dc", "#6713a9"][
        (u * 3 + v * 7 + Math.floor(v / 2)) % 4
      ];
    if (part === "arm")
      return v > 8
        ? "#8c21d7"
        : v === 3 || v === 9
          ? "#73727f"
          : v > 6
            ? "#1c1d28"
            : "#383846";
    if (part === "leg")
      return v > 8 ? (v === 10 ? "#6d6b74" : "#191b22") : "#373744";
    return face === "front" && (u === 3 || u === 4) && v < 6
      ? v % 2
        ? "#77727f"
        : "#24242e"
      : "#3b3b49";
  }
  const alex = id === "alex";
  const flesh = alex ? "#f0c997" : "#bc885e";
  const hair = hairColor(alex, u, v);
  const shirt = alex ? "#8eaf59" : "#16a5ac";
  if (part === "head") {
    if (face === "top" || face === "back") return hair;
    if (face === "left" || face === "right") {
      const fromBack = face === "left" ? u : 7 - u;
      const hairline = alex
        ? fromBack < 5
          ? 8
          : fromBack === 5
            ? 5
            : 2
        : fromBack < 5
          ? 5
          : fromBack === 5
            ? 4
            : 2;
      return v < hairline ? hair : flesh;
    }
    if (face === "front") {
      if (v < 2 || (alex && ((v === 2 && u < 3) || (v === 3 && u === 0))))
        return hair;
      if (v === 4 && (u === 1 || u === 2 || u === 5 || u === 6))
        return u === 2 || u === 5 ? (alex ? "#3a7432" : "#405bad") : "#f1eee0";
      if (!alex && v >= 6 && u >= 2 && u <= 5)
        return v === 6 && (u === 3 || u === 4) ? "#b77b59" : "#51301f";
      if (alex && v === 6 && (u === 3 || u === 4)) return "#ce8070";
      if (v === 5 && (u === 3 || u === 4)) return alex ? "#e3b382" : "#a86d48";
    }
    return flesh;
  }
  if (part === "arm") return v < (alex ? 3 : 4) ? shirt : flesh;
  if (part === "leg")
    return v > 9
      ? alex
        ? "#393333"
        : "#3b4146"
      : alex
        ? "#69402c"
        : "#343f94";
  if (alex && face === "front" && u >= 5 && v < 8) return hair;
  if (face === "front" && v < 2 && u >= 3 && u <= 4) return flesh;
  if (alex && v === 10) return "#344c29";
  return shirt;
}

// Orthographic cuboids, with skin pixels mapped onto each face. Limbs rotate
// around their actual shoulder/hip pivots rather than sliding across the body.
export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  {
    id,
    x,
    y,
    scale = 2,
    yaw = -0.3,
    phase = 0,
    movement = 0,
    time = 0,
    reducedMotion = false,
  }: {
    id: CharacterId;
    x: number;
    y: number;
    scale?: number;
    yaw?: number;
    phase?: number;
    movement?: number;
    time?: number;
    reducedMotion?: boolean;
  },
) {
  const faces: {
    points: Vec[];
    part: Part;
    face: Face;
    w: number;
    h: number;
    light: number;
    depth: number;
  }[] = [];
  const stride = reducedMotion ? 0 : Math.sin(phase) * 0.65 * movement;
  const breath = reducedMotion ? 0 : Math.sin(time * 0.0025) * 0.035;
  const bob = reducedMotion ? 0 : Math.abs(Math.sin(phase)) * 0.65 * movement;
  const add = (
    part: Part,
    cx: number,
    bottom: number,
    cz: number,
    w: number,
    h: number,
    d: number,
    angle = 0,
  ) => {
    const transform = (px: number, py: number, pz: number): Vec => {
      const dy = py - (bottom + h);
      const ly = bottom + h + dy * Math.cos(angle) - pz * Math.sin(angle) + bob;
      const lz = cz + dy * Math.sin(angle) + pz * Math.cos(angle);
      const lx = cx + px;
      return {
        x: lx * Math.cos(yaw) + lz * Math.sin(yaw),
        y: ly,
        z: -lx * Math.sin(yaw) + lz * Math.cos(yaw),
      };
    };
    const corners = [
      [-w / 2, bottom, -d / 2],
      [w / 2, bottom, -d / 2],
      [w / 2, bottom + h, -d / 2],
      [-w / 2, bottom + h, -d / 2],
      [-w / 2, bottom, d / 2],
      [w / 2, bottom, d / 2],
      [w / 2, bottom + h, d / 2],
      [-w / 2, bottom + h, d / 2],
    ].map(([px, py, pz]) => transform(px, py, pz));
    const definitions: [number[], Face, number, number, number][] = [
      [[7, 6, 5, 4], "front", w, h, 1],
      [[2, 3, 0, 1], "back", w, h, 0.72],
      [[3, 7, 4, 0], "left", d, h, 0.68],
      [[6, 2, 1, 5], "right", d, h, 0.8],
      [[3, 2, 6, 7], "top", w, d, 1.12],
      [[4, 5, 1, 0], "bottom", w, d, 0.55],
    ];
    for (const [indices, face, fw, fh, light] of definitions) {
      const points = indices.map((i) => corners[i]);
      const a = points[0],
        b = points[1],
        c = points[2];
      const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
      const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
      const normal = {
        x: ab.y * ac.z - ab.z * ac.y,
        y: ab.z * ac.x - ab.x * ac.z,
        z: ab.x * ac.y - ab.y * ac.x,
      };
      if (normal.x + normal.y * 1.6 + normal.z >= 0) continue;
      faces.push({
        points,
        part,
        face,
        w: Math.round(fw),
        h: Math.round(fh),
        light,
        depth: points.reduce((sum, p) => sum + p.x + p.z + p.y * 0.8, 0) / 4,
      });
    }
  };
  add("leg", -2, 0, 0, 4, 12, 4, stride);
  add("leg", 2, 0, 0, 4, 12, 4, -stride);
  add("body", 0, 12, 0, 8, 12, 4);
  const armWidth = id === "alex" ? 3 : 4;
  add(
    "arm",
    -4 - armWidth / 2,
    12,
    0,
    armWidth,
    12,
    4,
    -stride * 0.85 + breath,
  );
  add("arm", 4 + armWidth / 2, 12, 0, armWidth, 12, 4, stride * 0.85 - breath);
  add("head", 0, 24, 0, 8, 8, 8);
  if (id === "dragon") {
    add("horn", -2.6, 32, -1, 1.5, 2, 1.5);
    add("horn", 2.6, 32, -1, 1.5, 2, 1.5);
    add("snout", 0, 24, 5, 6, 3, 3);
  }
  const project = (p: Vec) => ({
    x: x + (p.x - p.z) * 0.866 * scale,
    y: y + ((p.x + p.z) * 0.35 - p.y) * scale,
  });
  ctx.save();
  ctx.fillStyle = "rgba(4, 15, 13, .3)";
  ctx.beginPath();
  ctx.ellipse(x, y + scale, 8 * scale, 2.8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  faces.sort((a, b) => a.depth - b.depth);
  for (const face of faces) {
    const [a, b, , d] = face.points;
    const at = (u: number, v: number) =>
      project({
        x: a.x + (b.x - a.x) * u + (d.x - a.x) * v,
        y: a.y + (b.y - a.y) * u + (d.y - a.y) * v,
        z: a.z + (b.z - a.z) * u + (d.z - a.z) * v,
      });
    for (let v = 0; v < face.h; v++)
      for (let u = 0; u < face.w; u++) {
        const base = skin(id, face.part, face.face, u, v);
        const noise = (((u * 17 + v * 31 + face.w * 7) % 11) - 5) * 1.4;
        const rgb = [1, 3, 5].map((offset) =>
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                parseInt(base.slice(offset, offset + 2), 16) * face.light +
                  noise,
              ),
            ),
          ),
        );
        ctx.fillStyle = `rgb(${rgb.join(",")})`;
        const points = [
          at(u / face.w, v / face.h),
          at((u + 1.015) / face.w, v / face.h),
          at((u + 1.015) / face.w, (v + 1.015) / face.h),
          at(u / face.w, (v + 1.015) / face.h),
        ];
        ctx.beginPath();
        points.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
        );
        ctx.closePath();
        ctx.fill();
      }
  }
  ctx.restore();
}