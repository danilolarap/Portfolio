import type { StationId } from "@/data/content";

type Point = { x: number; y: number };
type Vertex = Point & { z: number };
type Material =
  | "wood"
  | "log"
  | "stone"
  | "roof"
  | "glass"
  | "concrete"
  | "dark"
  | "light"
  | "red"
  | "white"
  | "green"
  | "gold"
  | "steel"
  | "leaf";
type Box = Vertex & { w: number; d: number; h: number; material: Material };
type Project = (x: number, y: number, z: number) => Point;

export const CHIMNEY = { x: -0.72, y: -0.46, z: 2.65 };
export const STATION_HEIGHT: Record<StationId, number> = {
  projects: 4.15,
  about: 3.15,
  contact: 2.5,
  skills: 3.45,
};

const palettes: Record<Material, string[]> = {
  wood: ["#a47840", "#b88a4b", "#c79a57", "#956836"],
  log: ["#614126", "#76512d", "#8b6336", "#6b4828"],
  stone: ["#777c79", "#959b91", "#696f6e", "#858e87"],
  roof: ["#c15f2c", "#d77535", "#b75225", "#e18a44"],
  glass: ["#458a97", "#66a8b1", "#347583", "#8cbfc1"],
  concrete: ["#d3ceba", "#c5c2b0", "#e0dbc7", "#b9b8a8"],
  dark: ["#252e30", "#1c2428", "#343b3a", "#202b2e"],
  light: ["#ffd77b", "#ffe8a0", "#eeb65c", "#ffefba"],
  red: ["#d9483d", "#e85846", "#c73831", "#e66c53"],
  white: ["#ebe8d5", "#f6f0df", "#d9d6c6", "#f0e9d6"],
  green: ["#9bd84d", "#b0e45b", "#91c943", "#bce96a"],
  gold: ["#dbac43", "#f1ca61", "#bc8d2f", "#e5b94b"],
  steel: ["#b1c3c9", "#dce6e4", "#91a8b1", "#eaf0e7"],
  leaf: ["#46763c", "#5e9448", "#3c6835", "#79a84f"],
};

function texture(material: Material, u: number, v: number, top: boolean) {
  const palette = palettes[material];
  if (material === "glass") {
    if (u % 4 === 0 || v % 3 === 0) return "#afc9c5";
    return palette[(Math.floor(u / 4) + Math.floor(v / 3)) % 4];
  }
  if (material === "wood" && v % 3 === 0) return "#7e552e";
  if (material === "log" && !top) return palette[u % 4];
  if (
    material === "stone" &&
    (v % 4 === 0 || (u + Math.floor(v / 4) * 2) % 5 === 0)
  )
    return "#5c6461";
  const seed = (u * 13 + v * 23 + Math.floor(u / 3) * 7) % 17;
  return palette[seed < 8 ? 0 : seed < 12 ? 1 : seed < 15 ? 2 : 3];
}

function model(id: StationId) {
  const boxes: Box[] = [];
  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number,
    material: Material,
  ) => boxes.push({ x, y, z, w, d, h, material });
  const pitchedRoof = (material: Material, base: number) => {
    for (let i = 0; i < 5; i++) {
      // Timber fills the stepped gable; overhanging slabs remain separate.
      box(
        -0.92 + i * 0.2,
        -0.8,
        base + i * 0.16,
        1.84 - i * 0.4,
        1.6,
        0.16,
        "wood",
      );
      box(
        -1.13 + i * 0.21,
        -1,
        base + i * 0.16 + 0.08,
        2.26 - i * 0.42,
        2.08,
        0.13,
        material,
      );
    }
  };
  return boxes;
}

const models = new Map<StationId, Box[]>();

export function drawStation(
  ctx: CanvasRenderingContext2D,
  id: StationId,
  project: Project,
) {
  let boxes = models.get(id);
  if (!boxes) {
    boxes = model(id);
    models.set(id, boxes);
  }
  const faces: {
    points: Vertex[];
    material: Material;
    w: number;
    h: number;
    shade: number;
    top: boolean;
    depth: number;
  }[] = [];
  for (const b of boxes) {
    const p = (x: number, y: number, z: number): Vertex => ({ x, y, z });
    const a = p(b.x, b.y, b.z + b.h),
      c = p(b.x + b.w, b.y + b.d, b.z + b.h);
    const definitions: [Vertex[], number, number, number, boolean][] = [
      [
        [p(b.x, b.y + b.d, b.z + b.h), c, p(c.x, c.y, b.z), p(b.x, c.y, b.z)],
        b.w,
        b.h,
        0.88,
        false,
      ],
      [
        [c, p(c.x, b.y, c.z), p(c.x, b.y, b.z), p(c.x, c.y, b.z)],
        b.d,
        b.h,
        0.71,
        false,
      ],
      [[a, p(c.x, a.y, c.z), c, p(a.x, c.y, c.z)], b.w, b.d, 1.06, true],
    ];
    for (const [points, w, h, shade, top] of definitions)
      faces.push({
        points,
        material: b.material,
        w,
        h,
        shade,
        top,
        depth: points.reduce((sum, v) => sum + v.x + v.y + v.z * 0.9, 0) / 4,
      });
  }
  faces.sort((a, b) => a.depth - b.depth);
  for (const face of faces) {
    const [a, b, , d] = face.points;
    const point = (u: number, v: number) =>
      project(
        a.x + (b.x - a.x) * u + (d.x - a.x) * v,
        a.y + (b.y - a.y) * u + (d.y - a.y) * v,
        a.z + (b.z - a.z) * u + (d.z - a.z) * v,
      );
    const cols = Math.max(1, Math.round(face.w * 10)),
      rows = Math.max(1, Math.round(face.h * 10));
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        const color = texture(face.material, col, row, face.top);
        const rgb = [1, 3, 5].map((offset) =>
          Math.round(
            parseInt(color.slice(offset, offset + 2), 16) * face.shade,
          ),
        );
        ctx.fillStyle = `rgb(${rgb.join(",")})`;
        const points = [
          point(col / cols, row / rows),
          point((col + 1.012) / cols, row / rows),
          point((col + 1.012) / cols, (row + 1.012) / rows),
          point(col / cols, (row + 1.012) / rows),
        ];
        ctx.beginPath();
        points.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
        );
        ctx.closePath();
        ctx.fill();
      }
  }
  if (id === "contact") {
    const origin = project(-0.75, 0.86, 0.69),
      right = project(0.75, 0.86, 0.69),
      bottom = project(-0.75, 0.86, 0.29);
    ctx.save();
    ctx.transform(
      (right.x - origin.x) / 150,
      (right.y - origin.y) / 150,
      (bottom.x - origin.x) / 40,
      (bottom.y - origin.y) / 40,
      origin.x,
      origin.y,
    );
    ctx.fillStyle = "#172818";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 14px monospace";
    ctx.fillText("MINUTOS $150", 75, 12);
    ctx.font = "bold 8px monospace";
    ctx.fillText("TODO DESTINO", 75, 29);
    ctx.restore();
  }
}

