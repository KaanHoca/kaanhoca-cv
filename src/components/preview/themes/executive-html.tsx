"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#1e3a8a";

export function ExecutiveHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10.5pt] text-slate-900 leading-snug font-serif px-14 py-12 space-y-6"
    >
      <header className="flex items-start gap-6 border-b-4 pb-5" style={{ borderColor: ACCENT }}>
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="h-24 w-24 rounded-sm object-cover shrink-0"
          />
        )}
        <div className="flex-1">
          {profile.fullName && (
            <h1 className="text-[26pt] font-bold tracking-tight" style={{ color: ACCENT }}>
              {profile.fullName}
            </h1>
          )}
          {profile.title && (
            <p className="text-[12pt] mt-1 text-slate-700 italic">
              {profile.title}
            </p>
          )}
          <p className="mt-3 text-[10pt] text-slate-700">
            {[profile.email, profile.phone, profile.location, profile.website]
              .filter(Boolean)
              .join("  |  ")}
          </p>
          {data.links.length > 0 && (
            <p className="text-[10pt] text-slate-700">
              {data.links.map((l) => `${l.label}: ${l.url}`).join("  |  ")}
            </p>
          )}
        </div>
      </header>

      {profile.summary && (
        <section>
          <SectionTitle>Profil Özeti</SectionTitle>
          <p className="text-justify">{profile.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section>
          <SectionTitle>Yönetsel Deneyim</SectionTitle>
          <div className="space-y-4">
            {data.experiences.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[11pt]">{e.position}</p>
                  <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <p className="font-semibold" style={{ color: ACCENT }}>
                  {e.company}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.description && (
                  <p className="mt-1 whitespace-pre-line">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionTitle>Eğitim</SectionTitle>
          <div className="space-y-2">
            {data.education.map((e) => (
              <div key={e.id} className="flex justify-between gap-3">
                <div>
                  <p className="font-bold">{e.school}</p>
                  {(e.degree || e.field) && (
                    <p className="italic text-slate-700">
                      {[e.degree, e.field].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
                <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                  {formatDateRange(e.startDate, e.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionTitle>Yetkinlik Alanları</SectionTitle>
          <p>{data.skills.map((s) => s.name).join("  ·  ")}</p>
        </section>
      )}

      {data.additional.length > 0 && (
        <section>
          <SectionTitle>Ek Deneyimler</SectionTitle>
          <div className="space-y-2">
            {data.additional.map((a) => (
              <div key={a.id} className="flex justify-between gap-3">
                <div>
                  <p className="font-bold">
                    {a.title}
                    {a.organization ? `, ${a.organization}` : ""}
                  </p>
                  {a.description && <p>{a.description}</p>}
                </div>
                {a.date && (
                  <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                    {a.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {data.certifications.length > 0 && (
            <section>
              <SectionTitle>Sertifikalar</SectionTitle>
              {data.certifications.map((c) => (
                <p key={c.id}>
                  {c.name}
                  {c.issuer ? ` · ${c.issuer}` : ""}
                </p>
              ))}
            </section>
          )}
          {data.languages.length > 0 && (
            <section>
              <SectionTitle>Diller</SectionTitle>
              <p>
                {data.languages
                  .map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`)
                  .join(", ")}
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11pt] font-bold uppercase tracking-[0.15em] mb-2 pb-0.5 border-b"
      style={{ color: ACCENT, borderColor: ACCENT }}
    >
      {children}
    </h2>
  );
}
