"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#374151";

export function AcademicHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10.5pt] text-slate-900 leading-relaxed font-serif px-16 py-14 space-y-7"
    >
      <header className="text-center space-y-1">
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="mx-auto mb-3 h-24 w-24 rounded-full object-cover"
          />
        )}
        {profile.fullName && (
          <h1 className="text-[24pt] font-normal tracking-wide">
            {profile.fullName}
          </h1>
        )}
        {profile.title && (
          <p className="text-[12pt] italic text-slate-700">{profile.title}</p>
        )}
        <p className="text-[10pt] text-slate-700 pt-1">
          {[profile.email, profile.phone, profile.location, profile.website]
            .filter(Boolean)
            .join("  ·  ")}
        </p>
        {data.links.length > 0 && (
          <p className="text-[10pt] text-slate-700">
            {data.links.map((l) => `${l.label}: ${l.url}`).join("  ·  ")}
          </p>
        )}
      </header>

      {profile.summary && (
        <section>
          <SectionTitle>Araştırma Özeti</SectionTitle>
          <p className="text-justify leading-loose">{profile.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionTitle>Eğitim</SectionTitle>
          <div className="space-y-3">
            {data.education.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold">
                    {[e.degree, e.field].filter(Boolean).join(", ")}
                    {(e.degree || e.field) ? ", " : ""}
                    <span className="font-normal italic">{e.school}</span>
                  </p>
                  <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                    {formatDateRange(e.startDate, e.endDate)}
                  </span>
                </div>
                {e.description && (
                  <p className="text-[10pt] mt-0.5">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section>
          <SectionTitle>Akademik & Profesyonel Deneyim</SectionTitle>
          <div className="space-y-3">
            {data.experiences.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold">
                    {e.position}
                    <span className="font-normal italic">
                      , {e.company}
                      {e.location ? `, ${e.location}` : ""}
                    </span>
                  </p>
                  <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                {e.description && (
                  <p className="text-[10pt] mt-0.5 whitespace-pre-line">
                    {e.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.additional.length > 0 && (
        <section>
          <SectionTitle>Yayınlar, Konferanslar & Sunumlar</SectionTitle>
          <ol className="space-y-1.5 list-decimal pl-5">
            {data.additional.map((a) => (
              <li key={a.id}>
                <span className="font-semibold">{a.title}</span>
                {a.organization && (
                  <span className="italic">, {a.organization}</span>
                )}
                {a.date && <span className="text-slate-600"> ({a.date})</span>}
                {a.description && <p className="text-[10pt]">{a.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.certifications.length > 0 && (
        <section>
          <SectionTitle>Sertifikalar & Ödüller</SectionTitle>
          <ul className="space-y-1 list-disc pl-5">
            {data.certifications.map((c) => (
              <li key={c.id}>
                {c.name}
                {c.issuer ? <span className="italic">, {c.issuer}</span> : ""}
                {c.date && <span className="text-slate-600"> ({c.date})</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <SectionTitle>Projeler</SectionTitle>
          <div className="space-y-2">
            {data.projects.map((p) => (
              <div key={p.id}>
                <p className="font-bold">{p.name}</p>
                {p.technologies && (
                  <p className="italic text-[10pt] text-slate-700">
                    {p.technologies}
                  </p>
                )}
                {p.description && <p className="text-[10pt]">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.skills.length > 0 || data.languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <SectionTitle>Yetkinlik Alanları</SectionTitle>
              <p>{data.skills.map((s) => s.name).join(", ")}</p>
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
      className="text-[11pt] font-bold tracking-wider uppercase border-b mb-2 pb-1"
      style={{ color: ACCENT, borderColor: ACCENT }}
    >
      {children}
    </h2>
  );
}
