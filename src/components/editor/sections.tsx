"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCvStore, newId } from "@/lib/cv-store";
import { ListSection } from "@/components/editor/list-section";
import type {
  Additional,
  Certification,
  Education,
  Experience,
  Language,
  Link as CvLink,
  Project,
  Skill,
} from "@/lib/cv-schema";

const NO_LEVEL = "__none__";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function ExperienceSection() {
  const items = useCvStore((s) => s.data.experiences);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Experience>
      items={items}
      addLabel="Deneyim Ekle"
      emptyLabel="Henüz iş deneyimi eklemediniz."
      onAdd={() =>
        patch({
          experiences: [
            ...items,
            {
              id: newId("e"),
              company: "",
              position: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            },
          ],
        })
      }
      onRemove={(id) =>
        patch({ experiences: data.experiences.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          experiences: data.experiences.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Pozisyon">
            <Input
              value={item.position}
              onChange={(e) => update({ position: e.target.value })}
            />
          </Field>
          <Field label="Şirket">
            <Input
              value={item.company}
              onChange={(e) => update({ company: e.target.value })}
            />
          </Field>
          <Field label="Başlangıç (YYYY-MM)">
            <Input
              value={item.startDate ?? ""}
              placeholder="2022-03"
              onChange={(e) => update({ startDate: e.target.value })}
            />
          </Field>
          <Field label="Bitiş (boş = devam)">
            <Input
              value={item.endDate ?? ""}
              placeholder="2024-01"
              onChange={(e) =>
                update({ endDate: e.target.value, current: !e.target.value })
              }
            />
          </Field>
          <Field label="Konum" className="col-span-2">
            <Input
              value={item.location ?? ""}
              onChange={(e) => update({ location: e.target.value })}
            />
          </Field>
          <Field label="Açıklama" className="col-span-2">
            <Textarea
              rows={3}
              value={item.description ?? ""}
              onChange={(e) => update({ description: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}

export function EducationSection() {
  const items = useCvStore((s) => s.data.education);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Education>
      items={items}
      addLabel="Eğitim Ekle"
      emptyLabel="Henüz eğitim eklemediniz."
      onAdd={() =>
        patch({
          education: [
            ...items,
            {
              id: newId("ed"),
              school: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        })
      }
      onRemove={(id) =>
        patch({ education: data.education.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          education: data.education.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Okul" className="col-span-2">
            <Input
              value={item.school}
              onChange={(e) => update({ school: e.target.value })}
            />
          </Field>
          <Field label="Derece">
            <Input
              value={item.degree ?? ""}
              placeholder="Lisans"
              onChange={(e) => update({ degree: e.target.value })}
            />
          </Field>
          <Field label="Bölüm">
            <Input
              value={item.field ?? ""}
              placeholder="Bilgisayar Müh."
              onChange={(e) => update({ field: e.target.value })}
            />
          </Field>
          <Field label="Başlangıç">
            <Input
              value={item.startDate ?? ""}
              placeholder="2015-09"
              onChange={(e) => update({ startDate: e.target.value })}
            />
          </Field>
          <Field label="Bitiş">
            <Input
              value={item.endDate ?? ""}
              placeholder="2019-06"
              onChange={(e) => update({ endDate: e.target.value })}
            />
          </Field>
          <Field label="Notlar" className="col-span-2">
            <Textarea
              rows={2}
              value={item.description ?? ""}
              onChange={(e) => update({ description: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}

const SKILL_LEVELS: Skill["level"][] = [
  "başlangıç",
  "orta",
  "ileri",
  "uzman",
];

export function SkillSection() {
  const items = useCvStore((s) => s.data.skills);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Skill>
      items={items}
      addLabel="Yetenek Ekle"
      emptyLabel="Henüz yetenek eklemediniz."
      onAdd={() =>
        patch({
          skills: [
            ...items,
            { id: newId("s"), name: "", category: "" },
          ],
        })
      }
      onRemove={(id) =>
        patch({ skills: data.skills.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          skills: data.skills.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-3 gap-3">
          <Field label="Yetenek">
            <Input
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </Field>
          <Field label="Kategori">
            <Input
              value={item.category ?? ""}
              placeholder="Frontend"
              onChange={(e) => update({ category: e.target.value })}
            />
          </Field>
          <Field label="Seviye (opsiyonel)">
            <Select
              value={item.level ?? NO_LEVEL}
              onValueChange={(v) =>
                update({
                  level:
                    v === NO_LEVEL ? undefined : (v as Skill["level"]),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Belirtme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_LEVEL}>Belirtme</SelectItem>
                {SKILL_LEVELS.map((lvl) => (
                  <SelectItem key={lvl} value={lvl as string}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      )}
    />
  );
}

export function ProjectSection() {
  const items = useCvStore((s) => s.data.projects);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Project>
      items={items}
      addLabel="Proje Ekle"
      emptyLabel="Henüz proje eklemediniz."
      onAdd={() =>
        patch({
          projects: [
            ...items,
            {
              id: newId("p"),
              name: "",
              url: "",
              description: "",
              technologies: "",
            },
          ],
        })
      }
      onRemove={(id) =>
        patch({ projects: data.projects.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          projects: data.projects.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Proje Adı">
            <Input
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </Field>
          <Field label="Bağlantı">
            <Input
              value={item.url ?? ""}
              placeholder="https://..."
              onChange={(e) => update({ url: e.target.value })}
            />
          </Field>
          <Field label="Teknolojiler" className="col-span-2">
            <Input
              value={item.technologies ?? ""}
              placeholder="React, TypeScript"
              onChange={(e) => update({ technologies: e.target.value })}
            />
          </Field>
          <Field label="Açıklama" className="col-span-2">
            <Textarea
              rows={2}
              value={item.description ?? ""}
              onChange={(e) => update({ description: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}

export function CertificationSection() {
  const items = useCvStore((s) => s.data.certifications);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Certification>
      items={items}
      addLabel="Sertifika Ekle"
      emptyLabel="Henüz sertifika eklemediniz."
      onAdd={() =>
        patch({
          certifications: [
            ...items,
            { id: newId("c"), name: "", issuer: "", date: "", url: "" },
          ],
        })
      }
      onRemove={(id) =>
        patch({
          certifications: data.certifications.filter((x) => x.id !== id),
        })
      }
      onChange={(id, p) =>
        patch({
          certifications: data.certifications.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Sertifika">
            <Input
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </Field>
          <Field label="Veren Kurum">
            <Input
              value={item.issuer ?? ""}
              onChange={(e) => update({ issuer: e.target.value })}
            />
          </Field>
          <Field label="Tarih">
            <Input
              value={item.date ?? ""}
              placeholder="2024-01"
              onChange={(e) => update({ date: e.target.value })}
            />
          </Field>
          <Field label="Bağlantı">
            <Input
              value={item.url ?? ""}
              placeholder="https://..."
              onChange={(e) => update({ url: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}

const LANGUAGE_LEVELS: Language["level"][] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Anadil",
];

export function LanguageSection() {
  const items = useCvStore((s) => s.data.languages);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Language>
      items={items}
      addLabel="Dil Ekle"
      emptyLabel="Henüz dil eklemediniz."
      onAdd={() =>
        patch({
          languages: [
            ...items,
            { id: newId("lng"), name: "", level: "B2" },
          ],
        })
      }
      onRemove={(id) =>
        patch({ languages: data.languages.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          languages: data.languages.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Dil">
            <Input
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </Field>
          <Field label="Seviye">
            <Select
              value={item.level ?? "B2"}
              onValueChange={(v) =>
                update({ level: v as Language["level"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_LEVELS.map((lvl) => (
                  <SelectItem key={lvl} value={lvl as string}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      )}
    />
  );
}

export function AdditionalSection() {
  const items = useCvStore((s) => s.data.additional);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<Additional>
      items={items}
      addLabel="Ek Deneyim Ekle"
      emptyLabel="Henüz ek deneyim eklemediniz. Konferanslar, gönüllü çalışmalar, ödüller, yayınlar burada yer alabilir."
      onAdd={() =>
        patch({
          additional: [
            ...items,
            {
              id: newId("ad"),
              title: "",
              organization: "",
              date: "",
              description: "",
            },
          ],
        })
      }
      onRemove={(id) =>
        patch({ additional: data.additional.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          additional: data.additional.map((x) =>
            x.id === id ? { ...x, ...p } : x,
          ),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Başlık" className="col-span-2">
            <Input
              value={item.title}
              placeholder="Konferans Konuşmacısı"
              onChange={(e) => update({ title: e.target.value })}
            />
          </Field>
          <Field label="Kurum / Etkinlik">
            <Input
              value={item.organization ?? ""}
              placeholder="DevFest İstanbul"
              onChange={(e) => update({ organization: e.target.value })}
            />
          </Field>
          <Field label="Tarih">
            <Input
              value={item.date ?? ""}
              placeholder="2024-11"
              onChange={(e) => update({ date: e.target.value })}
            />
          </Field>
          <Field label="Açıklama" className="col-span-2">
            <Textarea
              rows={2}
              value={item.description ?? ""}
              onChange={(e) => update({ description: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}

export function LinkSection() {
  const items = useCvStore((s) => s.data.links);
  const patch = useCvStore((s) => s.patchData);
  const data = useCvStore((s) => s.data);

  return (
    <ListSection<CvLink>
      items={items}
      addLabel="Bağlantı Ekle"
      emptyLabel="Henüz bağlantı eklemediniz."
      onAdd={() =>
        patch({
          links: [...items, { id: newId("l"), label: "", url: "" }],
        })
      }
      onRemove={(id) =>
        patch({ links: data.links.filter((x) => x.id !== id) })
      }
      onChange={(id, p) =>
        patch({
          links: data.links.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })
      }
      renderItem={(item, update) => (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Etiket">
            <Input
              value={item.label}
              placeholder="LinkedIn"
              onChange={(e) => update({ label: e.target.value })}
            />
          </Field>
          <Field label="URL">
            <Input
              value={item.url}
              placeholder="https://..."
              onChange={(e) => update({ url: e.target.value })}
            />
          </Field>
        </div>
      )}
    />
  );
}
