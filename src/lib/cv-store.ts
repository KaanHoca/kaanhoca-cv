"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CvData, emptyCv, sampleCv } from "@/lib/cv-schema";
import { type ThemeId, defaultThemeId } from "@/lib/themes";

type CvStore = {
  data: CvData;
  themeId: ThemeId;
  setData: (data: CvData) => void;
  patchData: (patch: Partial<CvData>) => void;
  setTheme: (id: ThemeId) => void;
  loadSample: () => void;
  reset: () => void;
};

export const useCvStore = create<CvStore>()(
  persist(
    (set) => ({
      data: emptyCv,
      themeId: defaultThemeId,
      setData: (data) => set({ data }),
      patchData: (patch) => set((state) => ({ data: { ...state.data, ...patch } })),
      setTheme: (themeId) => set({ themeId }),
      loadSample: () => set({ data: sampleCv }),
      reset: () => set({ data: emptyCv }),
    }),
    {
      name: "kaanhoca-cv-store-v1",
    },
  ),
);

export function newId(prefix = "x") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
