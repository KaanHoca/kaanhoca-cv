import type { ComponentType } from "react";
import type { CvData } from "@/lib/cv-schema";

export type ThemeId = "modern" | "classic" | "minimal" | "creative";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  description: string;
  accent: string;
};

export const themes: ThemeMeta[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Sol tarafta renkli kenar çubuğu, sağda zaman çizelgesi.",
    accent: "#0f766e",
  },
  {
    id: "classic",
    name: "Klasik",
    description: "Geleneksel, ATS dostu tek kolon düzeni.",
    accent: "#1f2937",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Tipografi odaklı, sadelik öncelikli.",
    accent: "#111827",
  },
  {
    id: "creative",
    name: "Kreatif",
    description: "Renkli başlıklar ve modern grid yapısı.",
    accent: "#db2777",
  },
];

export const defaultThemeId: ThemeId = "modern";

export function getTheme(id: string | undefined): ThemeMeta {
  return themes.find((t) => t.id === id) ?? themes[0];
}

export type CvDocumentProps = { data: CvData; theme: ThemeMeta };
export type CvDocumentComponent = ComponentType<CvDocumentProps>;
