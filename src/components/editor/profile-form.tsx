"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCvStore } from "@/lib/cv-store";
import type { Profile } from "@/lib/cv-schema";
import { PhotoUpload } from "@/components/editor/photo-upload";

const fields: Array<{
  key: keyof Profile;
  label: string;
  type?: string;
  placeholder?: string;
  full?: boolean;
}> = [
  { key: "fullName", label: "Ad Soyad", placeholder: "Ayşe Yılmaz" },
  { key: "title", label: "Ünvan", placeholder: "Senior Frontend Developer" },
  { key: "email", label: "E-posta", type: "email", placeholder: "ayse@example.com" },
  { key: "phone", label: "Telefon", placeholder: "+90 555 ..." },
  { key: "location", label: "Konum", placeholder: "İstanbul, Türkiye" },
  { key: "website", label: "Web sitesi", placeholder: "https://..." },
];

export function ProfileForm() {
  const profile = useCvStore((s) => s.data.profile);
  const patch = useCvStore((s) => s.patchData);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    patch({ profile: { ...profile, [key]: value } });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <PhotoUpload />
      {fields.map((f) => (
        <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
          <Label htmlFor={`profile-${f.key}`}>{f.label}</Label>
          <Input
            id={`profile-${f.key}`}
            type={f.type ?? "text"}
            placeholder={f.placeholder}
            value={(profile[f.key] as string) ?? ""}
            onChange={(e) => update(f.key, e.target.value as Profile[typeof f.key])}
            className="mt-1.5"
          />
        </div>
      ))}
      <div className="sm:col-span-2">
        <Label htmlFor="profile-summary">Özet</Label>
        <Textarea
          id="profile-summary"
          placeholder="Kendinizi 2-3 cümle ile tanıtın..."
          value={profile.summary ?? ""}
          onChange={(e) => update("summary", e.target.value)}
          rows={4}
          className="mt-1.5"
        />
      </div>
    </div>
  );
}
