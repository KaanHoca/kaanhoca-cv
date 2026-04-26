"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";
import { useCvStore } from "@/lib/cv-store";
import { themes, type ThemeId } from "@/lib/themes";

export function ThemePicker() {
  const themeId = useCvStore((s) => s.themeId);
  const setTheme = useCvStore((s) => s.setTheme);

  return (
    <div className="flex items-center gap-2">
      <Palette className="h-4 w-4 text-muted-foreground" />
      <Select value={themeId} onValueChange={(v) => setTheme(v as ThemeId)}>
        <SelectTrigger className="h-8 w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {themes.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
