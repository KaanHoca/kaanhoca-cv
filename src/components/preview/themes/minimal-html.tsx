"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

export function MinimalHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10.5pt] text-slate-800 leading-relaxed font-sans px-14 py-12 space-y-7"
    >
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-1 flex-1">
          {profile.fullName && (
            <h1 className="text-[26pt] font-light tracking-tight text-slate-900">
              {profile.fullName}
            </h1>
          )}
          {profile.title && (
            <p className="text-[12pt] text-slate-500">{profile.title}</p>
          )}
          <p className="text-[9.5pt] text-slate-500 pt-1">
            {[profile.email, profile.phone, profile.location, profile.website]
              .filter(Boolean)
              .join(" / ")}
          </p>
          {data.links.length > 0 && (
            <p className="text-[9.5pt] text-slate-500">
              {data.links.map((l) => `${l.label} ${l.url}`).join(" / ")}
            </p>
          )}
        </div>
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="h-24 w-24 rounded-sm object-cover shrink-0"
          />
        )}
      </header>

      {profile.summary && <p className="text-justify">{profile.summary}</p>}

      {data.experiences.length > 0 && (
        <Section title="Deneyim">
          <div className="space-y-4">
            {data.experiences.map((e) => (
              <div key={e.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[9.5pt] text-slate-500">
                  {formatDateRange(e.startDate, e.endDate, e.current)}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{e.position}</p>
                  <p className="text-slate-600 text-[10pt]">
                    {e.company}
                    {e.location ? ` — ${e.location}` : ""}
                  </p>
                  {e.description && (
                    <p className="mt-1 whitespace-pre-line">{e.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Eğitim">
          <div className="space-y-3">
            {data.education.map((e) => (
              <div key={e.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[9.5pt] text-slate-500">
                  {formatDateRange(e.startDate, e.endDate)}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{e.school}</p>
                  {(e.degree || e.field) && (
                    <p className="text-slate-600 text-[10pt]">
                      {[e.degree, e.field].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  {e.description && <p>{e.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title="Yetenekler">
          <p>{data.skills.map((s) => s.name).join(" · ")}</p>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Projeler">
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <p className="font-medium">
                  {p.name}
                  {p.technologies ? (
                    <span className="text-slate-500 font-normal">
                      {" "} · {p.technologies}
                    </span>
                  ) : null}
                </p>
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.certifications.length > 0 || data.languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {data.certifications.length > 0 && (
            <Section title="Sertifikalar">
              {data.certifications.map((c) => (
                <p key={c.id} className="mb-1">
                  {c.name}
                  {c.issuer ? ` · ${c.issuer}` : ""}
                </p>
              ))}
            </Section>
          )}
          {data.languages.length > 0 && (
            <Section title="Diller">
              {data.languages.map((l) => (
                <p key={l.id} className="mb-1">
                  {l.name}
                  {l.level ? ` — ${l.level}` : ""}
                </p>
              ))}
            </Section>
          )}
        </div>
      )}
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
      <h2 className="text-[10pt] uppercase tracking-[0.2em] text-slate-400 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
