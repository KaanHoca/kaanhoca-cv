import { Font } from "@react-pdf/renderer";

let registered = false;

export function ensureFontsRegistered() {
  if (registered) return;
  registered = true;

  const src =
    typeof window === "undefined"
      ? `${process.cwd()}/public/fonts/Inter.ttf`
      : "/fonts/Inter.ttf";

  Font.register({
    family: "Inter",
    fonts: [
      { src, fontWeight: 400 },
      { src, fontWeight: 500 },
      { src, fontWeight: 600 },
      { src, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
}
