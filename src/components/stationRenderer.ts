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
  if (id === "about") {
    box(-1.03, -0.92, 0, 2.06, 2.08, 0.22, "stone");
    box(-0.92, -0.8, 0.22, 1.84, 1.6, 1.12, "wood");
    for (const x of [-0.94, 0.77])
      for (const y of [-0.82, 0.69]) box(x, y, 0.2, 0.18, 0.18, 1.22, "log");
    box(-0.24, 0.805, 0.23, 0.48, 0.04, 0.86, "log");
    box(0.1, 0.85, 0.62, 0.055, 0.04, 0.07, "gold");
    for (const x of [-0.73, 0.38]) {
      box(x - 0.045, 0.81, 0.62, 0.43, 0.07, 0.43, "log");
      box(x, 0.86, 0.66, 0.34, 0.035, 0.34, "light");
      box(x + 0.15, 0.9, 0.66, 0.035, 0.025, 0.34, "wood");
      box(x, 0.9, 0.81, 0.34, 0.025, 0.035, "wood");
    }
    box(0.925, -0.33, 0.65, 0.025, 0.55, 0.38, "light");
    box(0.96, -0.1, 0.65, 0.035, 0.04, 0.38, "log");
    pitchedRoof("wood", 1.33);
    box(-0.88, -0.62, 0.22, 0.34, 0.34, 2.31, "stone");
    box(-0.94, -0.68, 2.48, 0.46, 0.46, 0.16, "stone");
    box(-0.86, -0.6, 2.645, 0.3, 0.3, 0.015, "dark");
    box(-0.43, 0.97, 0.05, 0.86, 0.42, 0.12, "stone");
    for (const x of [-0.87, 0.76]) {
      box(x, 0.98, 0.22, 0.12, 0.12, 0.7, "log");
      box(x - 0.035, 0.94, 0.75, 0.19, 0.19, 0.24, "light");
      box(x - 0.055, 0.92, 0.99, 0.23, 0.23, 0.045, "dark");
    }
    for (const x of [-0.73, 0.47]) {
      box(x, 1.05, 0.22, 0.33, 0.22, 0.18, "log");
      box(x - 0.04, 1.02, 0.38, 0.4, 0.28, 0.16, "leaf");
    }
  } else if (id === "projects") {
    box(-1.25, -0.95, 0, 2.5, 1.9, 0.18, "stone");
    box(-1.13, -0.75, 0.18, 2.26, 1.5, 0.36, "concrete");
    box(-0.99, -0.47, 0.54, 1.98, 0.68, 3.05, "glass");
    box(-1.07, -0.49, 0.52, 0.13, 0.73, 3.14, "concrete");
    box(0.95, -0.49, 0.52, 0.13, 0.73, 3.14, "concrete");
    box(-1.08, -0.5, 3.6, 2.16, 0.76, 0.1, "concrete");
    box(-0.32, -0.28, 3.7, 0.64, 0.3, 0.12, "steel");
    box(-0.7, 0.76, 0.21, 1.4, 0.035, 0.3, "glass");
    box(-0.83, 0.7, 0.52, 1.66, 0.36, 0.08, "concrete");
    for (const x of [-0.65, 0.6])
      box(x, 0.82, 0.18, 0.055, 0.055, 0.36, "steel");
    for (const x of [-1.03, 0.72]) {
      box(x, 0.77, 0.18, 0.32, 0.25, 0.12, "concrete");
      box(x + 0.025, 0.79, 0.3, 0.27, 0.21, 0.15, "leaf");
    }
  } else if (id === "contact") {
    box(-1.08, -0.87, 0, 2.16, 1.9, 0.12, "stone");
    box(-0.85, -0.5, 0.12, 1.7, 1.3, 0.65, "gold");
    box(-0.96, -0.57, 0.76, 1.92, 1.44, 0.12, "wood");
    box(-0.75, 0.81, 0.29, 1.5, 0.04, 0.4, "green");
    for (const x of [-0.85, 0.78])
      box(x, -0.42, 0.85, 0.075, 0.075, 0.85, "steel");
    // Block-built red and white parasol, with a stepped square silhouette.
    for (let level = 0; level < 3; level++) {
      const size = 2.3 - level * 0.62;
      for (let stripe = 0; stripe < 4; stripe++)
        box(
          -size / 2 + (stripe * size) / 4,
          -size / 2,
          1.6 + level * 0.14,
          size / 4,
          size,
          0.12,
          stripe % 2 ? "white" : "red",
        );
    }
    box(-0.06, -0.06, 1.99, 0.12, 0.12, 0.12, "steel");
    for (let i = 0; i < 3; i++) {
      box(-0.56 + i * 0.4, 0.31, 0.88, 0.23, 0.31, 0.045, "dark");
      box(-0.53 + i * 0.4, 0.37, 0.93, 0.17, 0.17, 0.012, "glass");
    }
  } else {
    box(-1.05, -0.93, 0, 2.1, 1.93, 0.18, "stone");
    box(-0.9, -0.8, 0.18, 1.8, 1.6, 1.12, "stone");
    for (const x of [-0.94, 0.77])
      for (const y of [-0.81, 0.68]) box(x, y, 0.18, 0.18, 0.18, 1.2, "log");
    box(-0.26, 0.805, 0.19, 0.52, 0.04, 0.88, "dark");
    box(-0.31, 0.84, 0.18, 0.075, 0.07, 1, "wood");
    box(0.24, 0.84, 0.18, 0.075, 0.07, 1, "wood");
    box(-0.31, 0.84, 1.12, 0.625, 0.07, 0.08, "wood");
    pitchedRoof("roof", 1.31);
    for (const x of [-0.68, 0.66]) {
      box(x - 0.23, 0.86, 0.37, 0.46, 0.1, 0.5, "wood");
      box(x - 0.2, 0.965, 0.4, 0.4, 0.025, 0.44, "white");
      box(x - 0.15, 0.995, 0.45, 0.3, 0.025, 0.34, "red");
      box(x - 0.095, 1.025, 0.505, 0.19, 0.025, 0.23, "white");
      box(x - 0.045, 1.055, 0.565, 0.09, 0.025, 0.11, "red");
    }
    // Two diagonal pixel blades cross over the roof ridge.
    for (const direction of [-1, 1]) {
      for (let i = 0; i < 7; i++)
        box(
          direction * (-0.48 + i * 0.14) - 0.07,
          -0.04,
          2.08 + i * 0.13,
          0.15,
          0.13,
          0.17,
          "steel",
        );
      box(direction * -0.58 - 0.08, -0.04, 1.94, 0.14, 0.13, 0.2, "log");
      box(direction * -0.46 - 0.2, -0.07, 2.08, 0.4, 0.18, 0.08, "gold");
    }
  }
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

export function drawChimneySmoke(
  ctx: CanvasRenderingContext2D,
  project: Project,
  time: number,
  reducedMotion: boolean,
) {
  ctx.save();
  for (let i = 0; i < 5; i++) {
    const life = reducedMotion ? i / 5 : (time / 3500 + i / 5) % 1;
    const drift = life * 0.42 + Math.sin(life * 5) * 0.08;
    const p = project(CHIMNEY.x + drift, CHIMNEY.y, CHIMNEY.z + life * 1.25);
    const edge = project(
      CHIMNEY.x + drift + 0.13 + life * 0.2,
      CHIMNEY.y,
      CHIMNEY.z + life * 1.25,
    );
    const size = Math.max(3, Math.abs(edge.x - p.x) * 1.8);
    ctx.fillStyle = `rgba(221, 226, 214, ${0.52 * (1 - life)})`;
    ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
    ctx.fillRect(p.x - size * 0.15, p.y - size * 0.8, size * 0.65, size * 0.6);
  }
  ctx.restore();
}
