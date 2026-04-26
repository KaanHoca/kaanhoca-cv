"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Trash2, FileDown } from "lucide-react";
import { useCvStore } from "@/lib/cv-store";
import { ProfileForm } from "@/components/editor/profile-form";
import {
  CertificationSection,
  EducationSection,
  ExperienceSection,
  LanguageSection,
  LinkSection,
  ProjectSection,
  SkillSection,
} from "@/components/editor/sections";
import { CvPreview } from "@/components/preview/cv-preview";
import { ThemePicker } from "@/components/editor/theme-picker";
import { DownloadButton } from "@/components/editor/download-button";

const sections = [
  { id: "profile", label: "Profil", node: <ProfileForm /> },
  { id: "links", label: "Bağlantılar", node: <LinkSection /> },
  { id: "experience", label: "İş Deneyimi", node: <ExperienceSection /> },
  { id: "education", label: "Eğitim", node: <EducationSection /> },
  { id: "skills", label: "Yetenekler", node: <SkillSection /> },
  { id: "projects", label: "Projeler", node: <ProjectSection /> },
  { id: "certifications", label: "Sertifikalar", node: <CertificationSection /> },
  { id: "languages", label: "Diller", node: <LanguageSection /> },
];

export function EditorShell() {
  const [mounted, setMounted] = useState(false);
  const loadSample = useCvStore((s) => s.loadSample);
  const reset = useCvStore((s) => s.reset);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] place-items-center text-muted-foreground">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 lg:grid-cols-[minmax(420px,1fr)_minmax(0,1.4fr)]">
      <div className="border-r bg-muted/30 flex flex-col">
        <div className="flex items-center justify-between gap-2 border-b bg-background/60 px-4 py-2.5 backdrop-blur">
          <h2 className="text-sm font-medium">Bilgilerinizi Doldurun</h2>
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={loadSample}
            >
              <Sparkles className="h-4 w-4" />
              Örnek
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (confirm("Tüm CV verisi silinecek, emin misiniz?")) reset();
              }}
            >
              <Trash2 className="h-4 w-4" />
              Sıfırla
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-4 py-3">
            <Accordion
              defaultValue={["profile", "experience"]}
              className="space-y-2"
            >
              {sections.map((s) => (
                <AccordionItem
                  key={s.id}
                  value={s.id}
                  className="rounded-lg border bg-background px-3 last:border-b"
                >
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {s.label}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">{s.node}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col bg-muted/10">
        <div className="flex items-center justify-between gap-2 border-b bg-background/60 px-4 py-2 backdrop-blur">
          <ThemePicker />
          <DownloadButton />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex justify-center p-6">
            <Card className="overflow-hidden bg-white shadow-md">
              <CvPreview />
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export { FileDown };
