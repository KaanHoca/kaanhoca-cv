"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#a78bfa";
const ACCENT_DARK = "#7c3aed";
const SOFT_BG = "#f5f3ff";
const PINK = "#fce7f3";

export function PastelHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: `linear-gradient(135deg, ${SOFT_BG} 0%, ${PINK} 100%)`,
      }}
      className="text-[10pt] text-slate-800 leading-snug font-sans p-8"
    >
      <div className="rounded-2xl bg-white/80 backdrop-blur p-8 shadow-sm space-y-5">
        <header className="flex items-center gap-5">
          {profile.photoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoDataUrl}
              alt={profile.fullName || "Profil"}
              className="h-24 w-24 rounded-full object-cover shrink-0"
              style={{ border: `3px solid ${ACCENT}` }}
            />
          )}
          <div className="flex-1">
            {profile.fullName && (
              <h1
                className="text-[24pt] font-bold leading-tight"
                style={{ color: ACCENT_DARK }}
              >
                {profile.fullName}
              </h1>
            )}
            {profile.title && (
              <p className="text-[12pt] text-slate-600 mt-0.5">
                {profile.title}
              </p>
            )}
          </div>
        </header>

        <div
          className="flex flex-wrap gap-x-3 gap-y-1 text-[9.5pt] text-slate-600 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: SOFT_BG }}
        >
          {profile.email && <span>✉ {profile.email}</span>}
          {profile.phone && <span>☏ {profile.phone}</span>}
          {profile.location && <span>⌖ {profile.location}</span>}
          {profile.website && <span>↗ {profile.website}</span>}
          {data.links.map((l) => (
            <span key={l.id}>
              {l.label}: {l.url}
            </span>
          ))}
        </div>

        {profile.summary && (
          <Pill title="Hakkımda">
            <p className="text-justify">{profile.summary}</p>
          </Pill>
        )}

        {data.experiences.length > 0 && (
          <Section title="Deneyim">
            <div className="space-y-3">
              {data.experiences.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: SOFT_BG }}
                >
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{e.position}</p>
                    <span
                      className="text-[9pt] whitespace-nowrap"
                      style={{ color: ACCENT_DARK }}
                    >
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  <p className="font-medium" style={{ color: ACCENT_DARK }}>
                    {e.company}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                  {e.description && (
                    <p className="mt-1 whitespace-pre-line">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid grid-cols-2 gap-4">
          {data.education.length > 0 && (
            <Section title="Eğitim">
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
            </Section>
          )}

          {data.skills.length > 0 && (
            <Section title="Yetkinlikler">
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1 rounded-full text-[9pt] font-medium"
                    style={{
                      backgroundColor: PINK,
                      color: ACCENT_DARK,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {data.projects.length > 0 && (
          <Section title="Projeler">
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: PINK }}
                >
                  <p className="font-semibold">{p.name}</p>
                  {p.technologies && (
                    <p
                      className="text-[9pt]"
                      style={{ color: ACCENT_DARK }}
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
          </Section>
        )}

        {data.additional.length > 0 && (
          <Section title="Ek Deneyimler">
            <div className="space-y-2">
              {data.additional.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: SOFT_BG }}
                >
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{a.title}</p>
                    {a.date && (
                      <span
                        className="text-[9pt]"
                        style={{ color: ACCENT_DARK }}
                      >
                        {a.date}
                      </span>
                    )}
                  </div>
                  {a.organization && (
                    <p className="font-medium" style={{ color: ACCENT_DARK }}>
                      {a.organization}
                    </p>
                  )}
                  {a.description && <p>{a.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {(data.certifications.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-4">
            {data.certifications.length > 0 && (
              <Section title="Sertifikalar">
                {data.certifications.map((c) => (
                  <p key={c.id} className="mb-0.5">
                    <span className="font-medium">{c.name}</span>
                    {c.issuer ? ` · ${c.issuer}` : ""}
                  </p>
                ))}
              </Section>
            )}
            {data.languages.length > 0 && (
              <Section title="Diller">
                {data.languages.map((l) => (
                  <p key={l.id} className="mb-0.5">
                    {l.name}
                    {l.level ? ` — ${l.level}` : ""}
                  </p>
                ))}
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-[10pt] font-bold uppercase tracking-widest mb-2"
        style={{ color: ACCENT_DARK }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Pill({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl p-4"
      style={{
        background: `linear-gradient(135deg, ${SOFT_BG} 0%, ${PINK} 100%)`,
      }}
    >
      <h2
        className="text-[10pt] font-bold uppercase tracking-widest mb-1.5"
        style={{ color: ACCENT_DARK }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
