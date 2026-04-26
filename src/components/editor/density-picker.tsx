"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rows3 } from "lucide-react";
import { useCvStore } from "@/lib/cv-store";
import { DENSITY_OPTIONS, type Density } from "@/lib/density";

export function DensityPicker() {
  const density = useCvStore((s) => s.density);
  const setDensity = useCvStore((s) => s.setDensity);

  return (
    <div className="flex items-center gap-2">
      <Rows3 className="h-4 w-4 text-muted-foreground" />
      <Select value={density} onValueChange={(v) => setDensity(v as Density)}>
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DENSITY_OPTIONS.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
