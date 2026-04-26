export type Density = "comfortable" | "normal" | "tight";

export const DENSITY_OPTIONS: Array<{ id: Density; name: string; hint: string }> = [
  { id: "comfortable", name: "Rahat", hint: "Geniş aralıklı, varsayılan" },
  { id: "normal", name: "Normal", hint: "Bir miktar sıkıştırılmış" },
  { id: "tight", name: "Sıkı", hint: "Tek sayfaya sığdırmak için" },
];

export const defaultDensity: Density = "comfortable";

export function densityScale(d: Density | undefined): number {
  switch (d) {
    case "tight":
      return 0.85;
    case "normal":
      return 0.93;
    default:
      return 1;
  }
}

const SCALE_KEYS = new Set([
  "fontSize",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingHorizontal",
  "paddingVertical",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "gap",
  "rowGap",
  "columnGap",
]);

export function scaleStyles<T>(styles: T, scale: number): T {
  if (scale === 1) return styles;
  const src = styles as Record<string, Record<string, unknown>>;
  const out: Record<string, Record<string, unknown>> = {};
  for (const k of Object.keys(src)) {
    const inner = src[k];
    const next: Record<string, unknown> = {};
    for (const ik of Object.keys(inner)) {
      const v = inner[ik];
      next[ik] =
        typeof v === "number" && SCALE_KEYS.has(ik) ? v * scale : v;
    }
    out[k] = next;
  }
  return out as unknown as T;
}
