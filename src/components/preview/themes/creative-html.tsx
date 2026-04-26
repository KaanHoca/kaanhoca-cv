"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#db2777";
const ACCENT_BG = "#fdf2f8";

export function CreativeHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10pt] text-slate-800 leading-snug font-sans"
    >
      <header
        className="px-10 py-8"
        style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, #7c3aed 100%)`,
          color: "white",
        }}
      >
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            {profile.photoDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoDataUrl}
                alt={profile.fullName || "Profil"}
                className="h-24 w-24 rounded-full border-2 border-white/40 object-cover shrink-0"
              />
            )}
            <div>
              {profile.fullName && (
                <h1 className="text-[28pt] font-extrabold leading-none">
                  {profile.fullName}
                </h1>
              )}
              {profile.title && (
                <p className="text-[12pt] mt-1 opacity-90">{profile.title}</p>
              )}
            </div>
          </div>
          <div className="text-right text-[9.5pt] opacity-95 space-y-0.5">
            {profile.email && <p>{profile.email}</p>}
            {profile.phone && <p>{profile.phone}</p>}
            {profile.location && <p>{profile.location}</p>}
            {profile.website && <p>{profile.website}</p>}
            {data.links.map((l) => (
              <p key={l.id}>
                {l.label}: {l.url}
              </p>
            ))}
          </div>
        </div>
      </header>

      <div className="px-10 py-8 space-y-6">
        {profile.summary && (
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: ACCENT_BG }}
          >
            <p
              className="text-[10pt] font-semibold uppercase tracking-wider mb-1"
              style={{ color: ACCENT }}
            >
              Hakkımda
            </p>
            <p className="text-justify">{profile.summary}</p>
          </div>
        )}

        {data.experiences.length > 0 && (
          <Block title="Deneyim" accent={ACCENT}>
            <div className="space-y-4">
              {data.experiences.map((e) => (
                <div key={e.id} className="relative pl-5">
                  <span
                    className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <div className="flex justify-between gap-2">
                    <p className="font-bold">{e.position}</p>
                    <span className="text-[9pt] text-slate-500 whitespace-nowrap">
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  <p style={{ color: ACCENT }} className="font-medium">
                    {e.company}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                  {e.description && (
                    <p className="mt-1 whitespace-pre-line">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <Block title="Eğitim" accent={ACCENT}>
              <div className="space-y-2">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <p className="font-semibold">{e.school}</p>
                    {(e.degree || e.field) && (
                      <p className="text-[9.5pt]">
                        {[e.degree, e.field].filter(Boolean).join(" — ")}
                      </p>
                    )}
                    <p className="text-[9pt] text-slate-500">
                      {formatDateRange(e.startDate, e.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.skills.length > 0 && (
            <Block title="Yetenekler" accent={ACCENT}>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 rounded-full text-[9pt]"
                    style={{
                      backgroundColor: ACCENT_BG,
                      color: ACCENT,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Block>
          )}
        </div>

        {data.projects.length > 0 && (
          <Block title="Projeler" accent={ACCENT}>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border-l-4 p-3 bg-slate-50"
                  style={{ borderLeftColor: ACCENT }}
                >
                  <p className="font-semibold">{p.name}</p>
                  {p.technologies && (
                    <p
                      className="text-[9pt] italic"
                      style={{ color: ACCENT }}
                    >
                      {p.technologies}
                    </p>
                  )}
                  {p.description && (
                    <p className="text-[9.5pt]">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}

        {(data.certifications.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {data.certifications.length > 0 && (
              <Block title="Sertifikalar" accent={ACCENT}>
                {data.certifications.map((c) => (
                  <p key={c.id} className="mb-1">
                    <span className="font-medium">{c.name}</span>
                    {c.issuer ? ` · ${c.issuer}` : ""}
                  </p>
                ))}
              </Block>
            )}
            {data.languages.length > 0 && (
              <Block title="Diller" accent={ACCENT}>
                {data.languages.map((l) => (
                  <p key={l.id} className="mb-1">
                    {l.name}
                    {l.level ? ` — ${l.level}` : ""}
                  </p>
                ))}
              </Block>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Block({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <section>
      <h2
        className="text-[11pt] font-bold uppercase tracking-widest mb-2"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
