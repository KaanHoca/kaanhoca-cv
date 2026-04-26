"use client";

import { useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCvStore } from "@/lib/cv-store";

const MAX_BYTES = 1024 * 1024;

export function PhotoUpload() {
  const profile = useCvStore((s) => s.data.profile);
  const patch = useCvStore((s) => s.patchData);
  const inputRef = useRef<HTMLInputElement>(null);

  function setPhoto(dataUrl: string) {
    patch({ profile: { ...profile, photoDataUrl: dataUrl } });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > MAX_BYTES) {
      alert("Dosya boyutu en fazla 1 MB olabilir.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") setPhoto(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="sm:col-span-2">
      <Label className="block">Profil fotoğrafı (opsiyonel)</Label>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border bg-muted">
          {profile.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoDataUrl}
              alt="Profil"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-muted-foreground">
              <Camera className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            {profile.photoDataUrl ? "Değiştir" : "Yükle"}
          </Button>
          {profile.photoDataUrl && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-destructive"
              onClick={() => setPhoto("")}
            >
              <Trash2 className="h-4 w-4" />
              Kaldır
            </Button>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        JPG/PNG/WEBP, en fazla 1 MB. Tarayıcıda saklanır, sunucuya gönderilmez.
      </p>
    </div>
  );
}
