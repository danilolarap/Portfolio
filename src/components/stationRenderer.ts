import type { StationId } from "@/data/content";

type Point = { x: number; y: number };
type Vertex = Point & { z: number };
type Material =
  | "wood"
  | "spruce"
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
  | "blue"
  | "screen"
  | "vest"
  | "skin"
  | "hair"
  | "shirt"
  | "chips"
  | "puffs"
  | "plantain"
  | "candy"
  | "leaf";
type Box = Vertex & { w: number; d: number; h: number; material: Material };
type Project = (x: number, y: number, z: number) => Point;

export const CHIMNEY = { x: -0.72, y: -0.46, z: 3.25 };
export const STATION_HEIGHT: Record<StationId, number> = {
  projects: 4.15,
  about: 3.75,
  contact: 3.4,
  skills: 3.45,
};

const palettes: Record<Material, string[]> = {
  wood: ["#8b6139", "#976c40", "#a57949", "#78522f"],
  spruce: ["#49301e", "#543923", "#62422a", "#3c271b"],
  log: ["#4e3423", "#62442b", "#745234", "#553924"],
  stone: ["#797e78", "#898e86", "#656d68", "#92958a"],
  roof: ["#a64f29", "#bb6332", "#934323", "#c87940"],
  glass: ["#458a97", "#66a8b1", "#347583", "#8cbfc1"],
  concrete: ["#cbcbbd", "#d1d0c2", "#c3c4b7", "#d8d6c8"],
  dark: ["#252e30", "#1c2428", "#343b3a", "#202b2e"],
  light: ["#ffd77b", "#ffe8a0", "#eeb65c", "#ffefba"],
  red: ["#d9483d", "#e85846", "#c73831", "#e66c53"],
  white: ["#ebe8d5", "#f6f0df", "#d9d6c6", "#f0e9d6"],
  green: ["#9bd84d", "#b0e45b", "#91c943", "#bce96a"],
  gold: ["#dbac43", "#f1ca61", "#bc8d2f", "#e5b94b"],
  steel: ["#b1c3c9", "#dce6e4", "#91a8b1", "#eaf0e7"],
  blue: ["#2167a1", "#2d7bb5", "#1b5488", "#388bc1"],
  screen: ["#80cdd2", "#a2e1db", "#5daebc", "#8ed5da"],
  vest: ["#c2f52e", "#d7ff54", "#a6d823", "#cafa38"],
  skin: ["#bd885d", "#d09b70", "#aa744e", "#c69165"],
  hair: ["#322a2a", "#423638", "#292326", "#554448"],
  shirt: ["#575066", "#696078", "#484354", "#60586f"],
  chips: ["#f7cf37", "#ffe681", "#d7a520", "#ffe05b"],
  puffs: ["#ed7624", "#ffa949", "#c9531e", "#ff8b30"],
  plantain: ["#72ad36", "#a3d64c", "#4f8426", "#8ec540"],
  candy: ["#c63548", "#e65c65", "#a62439", "#db4153"],
  leaf: ["#46763c", "#5e9448", "#3c6835", "#79a84f"],
};

const snackLabels: Partial<Record<Material, string>> = {
  chips: "PAPAS",
  puffs: "CHITOS",
  plantain: "PLATANO",
  candy: "DULCES",
};

function texture(material: Material, u: number, v: number, top: boolean) {
  const palette = palettes[material];
  const grain = (u * 13 + v * 23 + Math.floor(u / 3) * 7) % 17;
  if (snackLabels[material])
    return palette[
      u < 3 ? 2 : u > 27 ? 1 : (u + Math.floor(v / 8)) % 19 === 0 ? 3 : 0
    ];
  if (material === "skin" || material === "shirt")
    return palette[grain === 16 ? 3 : 0];
  if (material === "vest") {
    if (top) return palette[0];
    if (u % 12 === 5 || u % 12 === 6) return "#343241";
    if (u % 12 === 2 || u % 12 === 9 || v % 18 === 13 || v % 18 === 14)
      return "#e1ead2";
    return palette[grain === 16 ? 3 : 0];
  }
  if (material === "hair")
    return palette[(Math.floor(u / 3) + (top ? Math.floor(v / 4) : 0)) % 4];
  if (material === "wood" || material === "spruce") {
    const row = Math.floor(v / 8);
    const x = (u + (row % 2) * 12) % 24;
    if (v % 8 === 0 || x === 0)
      return material === "spruce" ? "#2f2017" : "#5d3d25";
    const knot = Math.abs(x - 14) + Math.abs((v % 8) - 4) * 2;
    if (row % 3 === 1 && knot < 4) return palette[knot % 2 ? 3 : 0];
    return palette[(Math.floor(u / 6) + v + (grain > 13 ? 1 : 0)) % 4];
  }
  if (material === "log") {
    if (top) {
      const ring = Math.floor(
        Math.max(Math.abs((u % 16) - 7.5), Math.abs((v % 16) - 7.5)),
      );
      return ["#805c37", "#a47b4a", "#91683e", "#67462c"][ring % 4];
    }
    return palette[(Math.floor(u / 2) + (v % 13 === 0 ? 1 : 0)) % 4];
  }
  if (material === "stone") {
    const row = Math.floor(v / 7),
      x = (u + (row % 2) * 5) % 11;
    if (v % 7 === 0 || x === 0) return "#48534e";
    const rock = (Math.floor((u + (row % 2) * 5) / 11) * 7 + row * 3) % 4;
    if (v % 7 === 1 || x === 1) return palette[1];
    if (grain === 16 && rock === 2) return "#66765a";
    return palette[grain > 13 ? (rock + 1) % 4 : rock];
  }
  if (material === "roof") {
    if (v % 6 === 0 || (u + Math.floor(v / 6) * 4) % 12 === 0) return "#74391f";
    return palette[grain < 12 ? 0 : grain < 15 ? 1 : 3];
  }
  if (material === "glass") {
    if (u % 6 === 0 || v % 5 === 0) return "#b5c9c4";
    if (u % 6 === 1) return "#89b8bd";
    return palette[(Math.floor(u / 6) + Math.floor(v / 5)) % 4];
  }
  if (material === "light")
    return v % 6 === 0 || u % 6 === 0 ? "#c18a3b" : "#ffe5a0";
  if (material === "red" || material === "white" || material === "green")
    return palette[grain > 14 ? 1 : 0];
  return palette[grain < 10 ? 0 : grain < 14 ? 1 : grain < 16 ? 2 : 3];
}

const materialTextures = new Map<string, HTMLCanvasElement>();

function materialTexture(
  material: Material,
  w: number,
  h: number,
  shade: number,
  top: boolean,
) {
  const snackLabel = snackLabels[material];
  const cols = Math.max(snackLabel ? 32 : 1, Math.round(w * 24)),
    rows = Math.max(snackLabel ? (top ? 12 : 44) : 1, Math.round(h * 24));
  const key = `${material}:${cols}:${rows}:${shade}:${top}`;
  const cached = materialTextures.get(key);
  if (cached) return cached;
  const image = document.createElement("canvas");
  image.width = cols;
  image.height = rows;
  const ctx = image.getContext("2d");
  if (!ctx) return null;
  for (let v = 0; v < rows; v++)
    for (let u = 0; u < cols; u++) {
      const color = texture(material, u, v, top);
      const rgb = [1, 3, 5].map((offset) =>
        Math.min(
          255,
          Math.round(parseInt(color.slice(offset, offset + 2), 16) * shade),
        ),
      );
      ctx.fillStyle = `rgb(${rgb.join(",")})`;
      ctx.fillRect(u, v, 1, 1);
    }
  if (snackLabel) {
    ctx.save();
    ctx.scale(cols / 32, rows / 44);
    // Crimped seals, folded foil edges and a bold label read as bags at game scale.
    ctx.fillStyle = "rgba(78, 39, 19, .25)";
    ctx.fillRect(0, 0, 32, 3);
    ctx.fillRect(0, 41, 32, 3);
    ctx.fillRect(0, 3, 3, 38);
    ctx.fillStyle = "rgba(255, 247, 193, .55)";
    for (let x = 2; x < 32; x += 4) {
      ctx.fillRect(x, 0, 1, 3);
      ctx.fillRect(x, 41, 1, 3);
    }
    ctx.fillRect(28, 5, 2, 32);
    if (!top) {
      ctx.fillStyle = "#f9f0d0";
      ctx.fillRect(3, 9, 26, 11);
      ctx.fillStyle = "#283958";
      ctx.font = "bold 6px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(snackLabel, 16, 15, 25);
      for (let i = 0; i < 3; i++) {
        const x = 7 + i * 7;
        const y = 26 + (i % 2) * 5;
        ctx.fillStyle = material === "puffs" ? "#ffdc56" : "#ffe59b";
        ctx.fillRect(x, y, 7, 5);
        ctx.fillRect(x + 2, y - 2, 4, 9);
        ctx.fillStyle = "#d49a38";
        ctx.fillRect(x + 2, y + 2, 3, 1);
      }
    }
    ctx.restore();
  }
  materialTextures.set(key, image);
  return image;
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
    // Upper storey, overhanging spruce roof and a timber balcony.
    box(-0.9, -0.78, 1.34, 1.8, 1.56, 0.6, "wood");
    for (const x of [-0.92, 0.77]) box(x, 0.72, 1.3, 0.16, 0.16, 0.76, "log");
    box(-0.36, 0.79, 1.43, 0.72, 0.06, 0.49, "log");
    box(-0.29, 0.86, 1.48, 0.58, 0.025, 0.4, "glass");
    box(-0.025, 0.89, 1.48, 0.05, 0.025, 0.4, "wood");
    box(-0.68, 0.82, 1.27, 1.36, 0.44, 0.12, "spruce");
    for (let i = 0; i < 7; i++)
      box(-0.63 + i * 0.2, 1.18, 1.38, 0.06, 0.065, 0.3, "wood");
    box(-0.68, 1.16, 1.64, 1.36, 0.11, 0.07, "wood");
    pitchedRoof("spruce", 1.93);
    box(-1.18, 0.68, 1.21, 0.5, 0.66, 0.15, "spruce");
    box(0.68, 0.68, 1.21, 0.5, 0.66, 0.15, "spruce");
    box(-0.07, 1.05, 2.2, 0.14, 0.14, 0.22, "light");
    box(-0.1, 1.02, 2.42, 0.2, 0.2, 0.045, "dark");
    box(-0.88, -0.62, 0.22, 0.34, 0.34, 2.91, "stone");
    box(-0.94, -0.68, 3.08, 0.46, 0.46, 0.16, "stone");
    box(-0.86, -0.6, 3.245, 0.3, 0.3, 0.015, "dark");
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
    // Blue street cart, exposed wheels and a cooler tucked under the counter.
    for (const x of [-1.02, 0.82])
      for (const y of [-0.55, 0.48]) {
        box(x, y, 0.02, 0.23, 0.28, 0.34, "dark");
        box(x - 0.012, y + 0.07, 0.1, 0.26, 0.13, 0.16, "steel");
      }
    box(-1.02, -0.42, 0.23, 2.04, 0.1, 0.11, "steel");
    box(-1.02, 0.6, 0.23, 2.04, 0.1, 0.11, "steel");
    box(-0.91, -0.64, 0.32, 1.82, 1.41, 0.61, "blue");
    for (const z of [0.36, 0.82])
      box(-0.94, 0.77, z, 1.88, 0.05, 0.055, "steel");
    box(-0.99, -0.71, 0.93, 1.98, 1.54, 0.1, "steel");
    box(-0.93, -0.65, 1.03, 1.86, 1.42, 0.045, "dark");
    box(-1.34, -0.37, 0.32, 0.42, 0.67, 0.44, "blue");
    box(-1.37, -0.4, 0.76, 0.48, 0.73, 0.09, "white");
    box(-1.37, -0.14, 0.59, 0.04, 0.21, 0.1, "steel");
    for (const y of [-0.47, 0.53])
      box(0.91, y, 0.73, 0.32, 0.06, 0.06, "steel");
    box(1.18, -0.47, 0.73, 0.06, 1.06, 0.06, "dark");

    // Offset blue parasol keeps the vendor's face and the display unobstructed.
    box(-0.63, -0.56, 1.04, 0.075, 0.075, 1.98, "steel");
    const packet = (
      x: number,
      y: number,
      z: number,
      material: Material,
      h = 0.46,
    ) => {
      box(x + 0.025, y + 0.025, z, 0.23, 0.13, 0.035, "gold");
      box(x, y, z + 0.035, 0.28, 0.18, h - 0.07, material);
      box(x + 0.025, y + 0.025, z + h - 0.035, 0.23, 0.13, 0.035, "gold");
    };
    // Two tiers of potato chips, cheese puffs, plantain chips and sweets.
    box(-0.88, -0.48, 1.07, 1.37, 0.25, 0.19, "blue");
    const snacks: Material[] = ["chips", "puffs", "plantain", "chips", "candy"];
    snacks.forEach((material, i) => {
      packet(-0.86 + i * 0.33, 0.44, 1.075, material, i % 2 ? 0.43 : 0.51);
      if (i < 4)
        packet(
          -0.85 + i * 0.34,
          -0.43,
          1.26,
          snacks[(i + 1) % snacks.length],
          0.5,
        );
    });
    // A small hanging rack on the exposed side of the cart.
    for (const y of [-0.34, 0.13]) {
      box(0.88, y, 1.04, 0.035, 0.035, 0.79, "steel");
      packet(0.8, y, 1.3, y < 0 ? "chips" : "puffs", 0.48);
    }
    box(0.88, -0.34, 1.81, 0.035, 0.5, 0.035, "steel");
    // Water bottles and a clear bakery case between the snack tiers.
    for (const x of [-0.79, -0.56]) {
      box(x, 0.04, 1.08, 0.15, 0.15, 0.34, "screen");
      box(x + 0.025, 0.065, 1.42, 0.1, 0.1, 0.06, "blue");
      box(x - 0.005, 0.035, 1.2, 0.16, 0.16, 0.09, "white");
    }
    box(-0.2, -0.09, 1.08, 0.58, 0.34, 0.07, "white");
    for (let i = 0; i < 4; i++)
      box(
        -0.16 + i * 0.13,
        -0.035,
        1.15,
        0.09,
        0.22,
        0.22 + (i % 2) * 0.05,
        "gold",
      );
    for (const x of [-0.21, 0.36])
      box(x, -0.1, 1.15, 0.025, 0.36, 0.32, "steel");
    box(-0.21, -0.1, 1.47, 0.6, 0.36, 0.025, "screen");

    // One upright feature phone retains the cart's original purpose.
    box(0.43, 0.13, 1.08, 0.24, 0.12, 0.37, "dark");
    box(0.46, 0.255, 1.26, 0.18, 0.018, 0.15, "screen");
    for (let key = 0; key < 6; key++)
      box(
        0.46 + (key % 3) * 0.06,
        0.255,
        1.12 + Math.floor(key / 3) * 0.055,
        0.035,
        0.018,
        0.03,
        "white",
      );

    // Vendor at the open side: jeans, purple blouse, neon vest and tied-up hair.
    const vx = 1.14,
      vy = -0.72;
    for (const x of [vx, vx + 0.25]) {
      box(x, vy + 0.02, 0.1, 0.2, 0.25, 0.72, "blue");
      box(x - 0.025, vy + 0.02, 0.02, 0.25, 0.36, 0.13, "dark");
    }
    box(vx - 0.035, vy, 0.82, 0.52, 0.34, 0.77, "vest");
    box(vx + 0.13, vy + 0.075, 1.55, 0.2, 0.17, 0.15, "skin");
    box(vx - 0.02, vy - 0.03, 1.69, 0.51, 0.43, 0.5, "skin");
    box(vx - 0.045, vy - 0.055, 2.08, 0.56, 0.46, 0.18, "hair");
    box(vx - 0.045, vy - 0.075, 1.76, 0.56, 0.12, 0.38, "hair");
    box(vx + 0.12, vy - 0.19, 2.15, 0.27, 0.24, 0.24, "hair");
    box(vx - 0.045, vy + 0.045, 1.94, 0.075, 0.32, 0.22, "hair");
    // Glasses, a small nose and a smile on the face toward the path.
    for (const x of [vx + 0.035, vx + 0.29]) {
      box(x, vy + 0.405, 1.94, 0.17, 0.025, 0.12, "dark");
      box(x + 0.025, vy + 0.434, 1.965, 0.11, 0.015, 0.065, "glass");
    }
    box(vx + 0.2, vy + 0.41, 1.985, 0.1, 0.025, 0.025, "dark");
    box(vx + 0.21, vy + 0.415, 1.87, 0.09, 0.06, 0.09, "skin");
    box(vx + 0.17, vy + 0.409, 1.78, 0.16, 0.02, 0.025, "red");
    // One hand rests toward the counter; the other holds a phone.
    box(vx - 0.23, vy + 0.015, 1.23, 0.19, 0.26, 0.3, "shirt");
    box(vx - 0.23, vy + 0.075, 1.14, 0.17, 0.43, 0.16, "skin");
    box(vx + 0.49, vy + 0.015, 1.23, 0.18, 0.26, 0.3, "shirt");
    box(vx + 0.49, vy + 0.075, 1.1, 0.16, 0.38, 0.19, "skin");
    box(vx + 0.48, vy + 0.39, 1.21, 0.18, 0.075, 0.28, "dark");
    box(vx + 0.505, vy + 0.469, 1.28, 0.13, 0.012, 0.17, "screen");

    // Fluorescent cloth banner sits below the bags, leaving the merchandise visible.
    box(-0.87, 0.82, 0.46, 1.6, 0.04, 0.57, "green");
    for (const x of [-0.82, 0.65])
      box(x, 0.81, 0.98, 0.04, 0.07, 0.12, "steel");
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

function drawCartUmbrella(ctx: CanvasRenderingContext2D, project: Project) {
  const center = { x: -0.36, y: -0.42 };
  const rim: Vertex[] = [
    [-1.3, -0.48],
    [-0.8, -0.94],
    [0.8, -0.94],
    [1.3, -0.48],
    [1.3, 0.48],
    [0.8, 0.94],
    [-0.8, 0.94],
    [-1.3, 0.48],
  ].map(([x, y]) => ({ x: center.x + x, y: center.y + y, z: 2.64 }));
  const peak = { ...center, z: 3.14 };
  const panelColors = [
    "#2167c4",
    "#2777db",
    "#3286e8",
    "#2274d5",
    "#1965c3",
    "#1d70d4",
    "#2b80e2",
    "#1c64bc",
  ];
  const polygon = (vertices: Vertex[], fill: string) => {
    ctx.beginPath();
    vertices.forEach((v, index) => {
      const p = project(v.x, v.y, v.z);
      if (index === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  };
  ctx.save();
  // A continuous eight-panel fabric canopy, with hanging trim and stitched seams.
  rim.forEach((a, i) => {
    const b = rim[(i + 1) % rim.length];
    polygon(
      [a, b, { ...b, z: b.z - 0.13 }, { ...a, z: a.z - 0.13 }],
      "#164d9a",
    );
  });
  rim.forEach((a, i) => {
    const b = rim[(i + 1) % rim.length];
    polygon([peak, a, b], panelColors[i]);
    const top = project(peak.x, peak.y, peak.z);
    const edge = project(a.x, a.y, a.z);
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(edge.x, edge.y);
    ctx.strokeStyle = "rgba(144, 193, 245, .32)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  ctx.restore();
}

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
  const ground = project(0, 0, 0);
  const unit = Math.abs(project(1, 0, 0).x - ground.x);
  ctx.save();
  ctx.translate(ground.x + unit * 0.22, ground.y + unit * 0.26);
  ctx.scale(1, 0.48);
  const shadow = ctx.createRadialGradient(0, 0, unit * 0.3, 0, 0, unit * 2.2);
  shadow.addColorStop(0, "rgba(12, 22, 17, .4)");
  shadow.addColorStop(1, "rgba(12, 22, 17, 0)");
  ctx.fillStyle = shadow;
  ctx.fillRect(-unit * 2.2, -unit * 2.2, unit * 4.4, unit * 4.4);
  ctx.restore();
  faces.sort((a, b) => a.depth - b.depth);
  for (const face of faces) {
    const image = materialTexture(
      face.material,
      face.w,
      face.h,
      face.shade,
      face.top,
    );
    if (!image) continue;
    const a = project(face.points[0].x, face.points[0].y, face.points[0].z);
    const b = project(face.points[1].x, face.points[1].y, face.points[1].z);
    const d = project(face.points[3].x, face.points[3].y, face.points[3].z);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.transform(
      (b.x - a.x) / image.width,
      (b.y - a.y) / image.width,
      (d.x - a.x) / image.height,
      (d.y - a.y) / image.height,
      a.x,
      a.y,
    );
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  if (id === "about") {
    for (const [x, y, z] of [
      [-0.81, 1.03, 0.87],
      [0.82, 1.03, 0.87],
      [0, 1.12, 2.3],
    ]) {
      const light = project(x, y, z),
        radius = unit * 0.48;
      const glow = ctx.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        radius,
      );
      glow.addColorStop(0, "rgba(255, 198, 82, .32)");
      glow.addColorStop(1, "rgba(255, 198, 82, 0)");
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = glow;
      ctx.fillRect(light.x - radius, light.y - radius, radius * 2, radius * 2);
      ctx.restore();
    }
  }
  if (id === "contact") {
    drawCartUmbrella(ctx, project);
    const origin = project(-0.87, 0.865, 1.03),
      right = project(0.73, 0.865, 1.03),
      bottom = project(-0.87, 0.865, 0.46);
    ctx.save();
    ctx.transform(
      (right.x - origin.x) / 160,
      (right.y - origin.y) / 160,
      (bottom.x - origin.x) / 72,
      (bottom.y - origin.y) / 72,
      origin.x,
      origin.y,
    );
    // Paint the entire sign face after the cart so its counter cannot cross the lettering.
    ctx.fillStyle = "#b0e45b";
    ctx.fillRect(0, 0, 160, 72);
    ctx.fillStyle = "#172818";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 27px Mojangles, monospace";
    ctx.fillText("MINUTOS", 80, 19);
    ctx.font = "bold 15px Mojangles, monospace";
    ctx.fillText("TODO OPERADOR", 80, 42);
    ctx.font = "bold 18px Mojangles, monospace";
    ctx.fillText("$150", 80, 60);
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
