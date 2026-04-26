"use client";

import { useCvStore } from "@/lib/cv-store";
import { ModernHtmlTheme } from "@/components/preview/themes/modern-html";
import { ClassicHtmlTheme } from "@/components/preview/themes/classic-html";
import { MinimalHtmlTheme } from "@/components/preview/themes/minimal-html";
import { CreativeHtmlTheme } from "@/components/preview/themes/creative-html";

export function CvPreview() {
  const data = useCvStore((s) => s.data);
  const themeId = useCvStore((s) => s.themeId);

  switch (themeId) {
    case "classic":
      return <ClassicHtmlTheme data={data} />;
    case "minimal":
      return <MinimalHtmlTheme data={data} />;
    case "creative":
      return <CreativeHtmlTheme data={data} />;
    default:
      return <ModernHtmlTheme data={data} />;
  }
}
