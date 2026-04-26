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

const STORE_VERSION = 2;

function ensureCvShape(data: Partial<CvData> | undefined): CvData {
  return {
    profile: { ...emptyCv.profile, ...(data?.profile ?? {}) },
    links: data?.links ?? [],
    experiences: data?.experiences ?? [],
    education: data?.education ?? [],
    skills: data?.skills ?? [],
    projects: data?.projects ?? [],
    certifications: data?.certifications ?? [],
    languages: data?.languages ?? [],
    additional: data?.additional ?? [],
  };
}

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
      version: STORE_VERSION,
      migrate: (persistedState) => {
        const s = (persistedState ?? {}) as Partial<CvStore>;
        return {
          ...s,
          data: ensureCvShape(s.data),
          themeId: (s.themeId as ThemeId) ?? defaultThemeId,
        } as CvStore;
      },
      onRehydrateStorage: () => (state) => {
        if (state) state.data = ensureCvShape(state.data);
      },
    },
  ),
);

export function newId(prefix = "x") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
