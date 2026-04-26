"use client";

import { useCvStore } from "@/lib/cv-store";
import { densityScale } from "@/lib/density";
import { ModernHtmlTheme } from "@/components/preview/themes/modern-html";
import { ClassicHtmlTheme } from "@/components/preview/themes/classic-html";
import { MinimalHtmlTheme } from "@/components/preview/themes/minimal-html";
import { CreativeHtmlTheme } from "@/components/preview/themes/creative-html";
import { ExecutiveHtmlTheme } from "@/components/preview/themes/executive-html";
import { TechHtmlTheme } from "@/components/preview/themes/tech-html";
import { AcademicHtmlTheme } from "@/components/preview/themes/academic-html";
import { PastelHtmlTheme } from "@/components/preview/themes/pastel-html";

export function CvPreview() {
  const data = useCvStore((s) => s.data);
  const themeId = useCvStore((s) => s.themeId);
  const density = useCvStore((s) => s.density);
  const scale = densityScale(density);

  let theme: React.ReactNode;
  switch (themeId) {
    case "classic":
      theme = <ClassicHtmlTheme data={data} />;
      break;
    case "minimal":
      theme = <MinimalHtmlTheme data={data} />;
      break;
    case "creative":
      theme = <CreativeHtmlTheme data={data} />;
      break;
    case "executive":
      theme = <ExecutiveHtmlTheme data={data} />;
      break;
    case "tech":
      theme = <TechHtmlTheme data={data} />;
      break;
    case "academic":
      theme = <AcademicHtmlTheme data={data} />;
      break;
    case "pastel":
      theme = <PastelHtmlTheme data={data} />;
      break;
    default:
      theme = <ModernHtmlTheme data={data} />;
  }

  if (scale === 1) return <>{theme}</>;

  return (
    <div
      style={{
        width: `calc(210mm * ${scale})`,
        height: `calc(297mm * ${scale})`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "210mm",
        }}
      >
        {theme}
      </div>
    </div>
  );
}
