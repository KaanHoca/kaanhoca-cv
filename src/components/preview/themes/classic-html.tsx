"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

export function ClassicHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10.5pt] text-slate-900 leading-snug font-serif px-12 py-10 space-y-5"
    >
      <header className="text-center border-b-2 border-slate-900 pb-4">
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="mx-auto mb-3 h-24 w-24 rounded-full object-cover"
          />
        )}
        {profile.fullName && (
          <h1 className="text-[22pt] font-bold tracking-wide">
            {profile.fullName}
          </h1>
        )}
        {profile.title && (
          <p className="text-[12pt] mt-1 italic text-slate-700">
            {profile.title}
          </p>
        )}
        <p className="mt-2 text-[10pt] text-slate-600">
          {[profile.email, profile.phone, profile.location, profile.website]
            .filter(Boolean)
            .join("  •  ")}
        </p>
        {data.links.length > 0 && (
          <p className="mt-1 text-[10pt] text-slate-600">
            {data.links.map((l) => `${l.label}: ${l.url}`).join("  •  ")}
          </p>
        )}
      </header>

      {profile.summary && (
        <Section title="Özet">
          <p className="text-justify">{profile.summary}</p>
        </Section>
      )}

      {data.experiences.length > 0 && (
        <Section title="İş Deneyimi">
          <div className="space-y-3">
            {data.experiences.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold">
                    {e.position}
                    {e.company ? `, ${e.company}` : ""}
                  </p>
                  <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                {e.location && (
                  <p className="italic text-slate-600 text-[10pt]">
                    {e.location}
                  </p>
                )}
                {e.description && (
                  <p className="mt-1 whitespace-pre-line">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Eğitim">
          <div className="space-y-2">
            {data.education.map((e) => (
              <div key={e.id} className="flex justify-between gap-3">
                <div>
                  <p className="font-semibold">{e.school}</p>
                  {(e.degree || e.field) && (
                    <p className="italic">
                      {[e.degree, e.field].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {e.description && (
                    <p className="text-[10pt]">{e.description}</p>
                  )}
                </div>
                <span className="text-[9.5pt] text-slate-600 whitespace-nowrap">
                  {formatDateRange(e.startDate, e.endDate)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title="Yetenekler">
          <p>{data.skills.map((s) => s.name).join(", ")}</p>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Projeler">
          <div className="space-y-2">
            {data.projects.map((p) => (
              <div key={p.id}>
                <p className="font-semibold">
                  {p.name}
                  {p.technologies ? (
                    <span className="font-normal italic">
                      {" "}— {p.technologies}
                    </span>
                  ) : null}
                </p>
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title="Sertifikalar">
          <ul className="list-disc pl-5">
            {data.certifications.map((c) => (
              <li key={c.id}>
                {c.name}
                {c.issuer ? `, ${c.issuer}` : ""}
                {c.date ? ` (${c.date})` : ""}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title="Diller">
          <p>
            {data.languages
              .map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`)
              .join(", ")}
          </p>
        </Section>
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
      <h2 className="text-[12pt] font-bold uppercase tracking-widest border-b border-slate-400 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
