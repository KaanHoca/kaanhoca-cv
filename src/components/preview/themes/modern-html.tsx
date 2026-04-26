"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#0f766e";

export function ModernHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10pt] text-slate-800 leading-snug font-sans flex"
    >
      <aside
        className="w-[34%] p-8 text-white"
        style={{ backgroundColor: ACCENT }}
      >
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="mb-4 h-28 w-28 rounded-full border-2 border-white/40 object-cover"
          />
        )}
        {profile.fullName && (
          <h1 className="text-[18pt] font-bold leading-tight">
            {profile.fullName}
          </h1>
        )}
        {profile.title && (
          <p className="mt-1 text-[11pt] opacity-90">{profile.title}</p>
        )}

        <Section title="İletişim" light>
          {profile.email && <Line>{profile.email}</Line>}
          {profile.phone && <Line>{profile.phone}</Line>}
          {profile.location && <Line>{profile.location}</Line>}
          {profile.website && <Line>{profile.website}</Line>}
          {data.links.map((l) => (
            <Line key={l.id}>
              {l.label}: {l.url}
            </Line>
          ))}
        </Section>

        {data.skills.length > 0 && (
          <Section title="Yetenekler" light>
            <ul className="space-y-1">
              {data.skills.map((s) => (
                <li key={s.id} className="flex justify-between gap-2">
                  <span>{s.name}</span>
                  {s.level && (
                    <span className="opacity-75 capitalize">{s.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {data.languages.length > 0 && (
          <Section title="Diller" light>
            <ul className="space-y-1">
              {data.languages.map((l) => (
                <li key={l.id} className="flex justify-between">
                  <span>{l.name}</span>
                  {l.level && <span className="opacity-75">{l.level}</span>}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {data.certifications.length > 0 && (
          <Section title="Sertifikalar" light>
            {data.certifications.map((c) => (
              <div key={c.id} className="mb-2">
                <p className="font-semibold">{c.name}</p>
                {c.issuer && <p className="opacity-90">{c.issuer}</p>}
                {c.date && <p className="opacity-75 text-[9pt]">{c.date}</p>}
              </div>
            ))}
          </Section>
        )}
      </aside>

      <main className="flex-1 p-8 space-y-5">
        {profile.summary && (
          <Block title="Özet" accent={ACCENT}>
            <p className="text-justify">{profile.summary}</p>
          </Block>
        )}

        {data.experiences.length > 0 && (
          <Block title="İş Deneyimi" accent={ACCENT}>
            <div className="space-y-3.5">
              {data.experiences.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{e.position}</p>
                    <span className="text-[9pt] text-slate-600 whitespace-nowrap">
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  <p
                    className="text-[10pt] font-medium"
                    style={{ color: ACCENT }}
                  >
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

        {data.education.length > 0 && (
          <Block title="Eğitim" accent={ACCENT}>
            <div className="space-y-3">
              {data.education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{e.school}</p>
                    <span className="text-[9pt] text-slate-600 whitespace-nowrap">
                      {formatDateRange(e.startDate, e.endDate)}
                    </span>
                  </div>
                  {(e.degree || e.field) && (
                    <p style={{ color: ACCENT }}>
                      {[e.degree, e.field].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  {e.description && <p>{e.description}</p>}
                </div>
              ))}
            </div>
          </Block>
        )}

        {data.additional.length > 0 && (
          <Block title="Ek Deneyimler" accent={ACCENT}>
            <div className="space-y-3">
              {data.additional.map((a) => (
                <div key={a.id}>
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{a.title}</p>
                    {a.date && (
                      <span className="text-[9pt] text-slate-600 whitespace-nowrap">
                        {a.date}
                      </span>
                    )}
                  </div>
                  {a.organization && (
                    <p style={{ color: ACCENT }}>{a.organization}</p>
                  )}
                  {a.description && <p>{a.description}</p>}
                </div>
              ))}
            </div>
          </Block>
        )}

        {data.projects.length > 0 && (
          <Block title="Projeler" accent={ACCENT}>
            <div className="space-y-3">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold">{p.name}</p>
                  {p.technologies && (
                    <p
                      className="text-[9pt] italic"
                      style={{ color: ACCENT }}
                    >
                      {p.technologies}
                    </p>
                  )}
                  {p.description && <p>{p.description}</p>}
                  {p.url && (
                    <p className="text-[9pt] text-slate-500">{p.url}</p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  children,
  light,
}: {
  title: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mt-6">
      <h2
        className={`text-[11pt] font-semibold uppercase tracking-wider mb-2 ${
          light ? "text-white border-b border-white/30 pb-1" : ""
        }`}
      >
        {title}
      </h2>
      <div className="text-[9.5pt] space-y-1">{children}</div>
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <p className="break-words">{children}</p>;
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
        className="text-[12pt] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
        style={{ color: accent, borderColor: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
