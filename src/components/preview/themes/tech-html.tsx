"use client";

import type { CvData } from "@/lib/cv-schema";
import { formatDateRange } from "@/lib/format";

const ACCENT = "#10b981";
const BG_DARK = "#0f172a";

export function TechHtmlTheme({ data }: { data: CvData }) {
  const { profile } = data;
  return (
    <div
      style={{ width: "210mm", minHeight: "297mm" }}
      className="bg-white text-[10pt] text-slate-800 leading-snug font-sans"
    >
      <header
        className="px-10 py-7 flex items-center gap-5"
        style={{ backgroundColor: BG_DARK, color: "#e2e8f0" }}
      >
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoDataUrl}
            alt={profile.fullName || "Profil"}
            className="h-20 w-20 rounded-md object-cover shrink-0"
            style={{ border: `2px solid ${ACCENT}` }}
          />
        )}
        <div className="flex-1">
          {profile.fullName && (
            <h1 className="text-[22pt] font-bold leading-tight font-mono">
              <span style={{ color: ACCENT }}>$</span> {profile.fullName}
            </h1>
          )}
          {profile.title && (
            <p className="text-[11pt] mt-0.5 font-mono opacity-80">
              <span style={{ color: ACCENT }}>~/</span>{profile.title}
            </p>
          )}
          <p className="mt-2 text-[9pt] font-mono opacity-75 break-all">
            {[profile.email, profile.phone, profile.location, profile.website]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
          {data.links.length > 0 && (
            <p className="text-[9pt] font-mono opacity-75 break-all">
              {data.links.map((l) => `${l.label}=${l.url}`).join("  ·  ")}
            </p>
          )}
        </div>
      </header>

      <div className="px-10 py-7 space-y-5">
        {profile.summary && (
          <Block label="readme.md">
            <p className="text-justify">{profile.summary}</p>
          </Block>
        )}

        {data.experiences.length > 0 && (
          <Block label="experience">
            <div className="space-y-3">
              {data.experiences.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">
                      <span style={{ color: ACCENT }} className="font-mono">▸</span>{" "}
                      {e.position} <span className="text-slate-500 font-mono">@</span>{" "}
                      <span style={{ color: ACCENT }}>{e.company}</span>
                    </p>
                    <span className="font-mono text-[9pt] text-slate-500">
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  {e.location && (
                    <p className="text-[9pt] text-slate-500 ml-4">{e.location}</p>
                  )}
                  {e.description && (
                    <p className="ml-4 mt-1 whitespace-pre-line">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <Block label="stack.json">
              <div className="font-mono text-[9.5pt]">
                <p className="text-slate-500">{`{`}</p>
                {data.skills.map((s, i) => (
                  <p key={s.id} className="ml-3">
                    <span style={{ color: ACCENT }}>&quot;{s.name}&quot;</span>
                    {s.level && (
                      <>
                        : <span className="text-slate-700">&quot;{s.level}&quot;</span>
                      </>
                    )}
                    {i < data.skills.length - 1 ? "," : ""}
                  </p>
                ))}
                <p className="text-slate-500">{`}`}</p>
              </div>
            </Block>
          )}

          {data.education.length > 0 && (
            <Block label="education">
              <div className="space-y-2">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <p className="font-semibold">{e.school}</p>
                    {(e.degree || e.field) && (
                      <p className="text-[9.5pt]" style={{ color: ACCENT }}>
                        {[e.degree, e.field].filter(Boolean).join(" — ")}
                      </p>
                    )}
                    <p className="font-mono text-[9pt] text-slate-500">
                      {formatDateRange(e.startDate, e.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          )}
        </div>

        {data.projects.length > 0 && (
          <Block label="projects">
            <div className="space-y-3">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold">
                    <span style={{ color: ACCENT }} className="font-mono">▸</span>{" "}
                    {p.name}
                  </p>
                  {p.technologies && (
                    <p className="ml-4 font-mono text-[9pt]" style={{ color: ACCENT }}>
                      {p.technologies}
                    </p>
                  )}
                  {p.description && <p className="ml-4">{p.description}</p>}
                  {p.url && (
                    <p className="ml-4 font-mono text-[9pt] text-slate-500 break-all">
                      {p.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}

        {data.additional.length > 0 && (
          <Block label="extras">
            <div className="space-y-2">
              {data.additional.map((a) => (
                <div key={a.id}>
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">
                      <span style={{ color: ACCENT }} className="font-mono">▸</span>{" "}
                      {a.title}
                      {a.organization && (
                        <span className="font-normal text-slate-600"> @ {a.organization}</span>
                      )}
                    </p>
                    {a.date && (
                      <span className="font-mono text-[9pt] text-slate-500">{a.date}</span>
                    )}
                  </div>
                  {a.description && <p className="ml-4">{a.description}</p>}
                </div>
              ))}
            </div>
          </Block>
        )}

        {(data.certifications.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {data.certifications.length > 0 && (
              <Block label="certs">
                {data.certifications.map((c) => (
                  <p key={c.id}>
                    <span style={{ color: ACCENT }} className="font-mono">▸</span>{" "}
                    {c.name}
                    {c.issuer ? ` · ${c.issuer}` : ""}
                  </p>
                ))}
              </Block>
            )}
            {data.languages.length > 0 && (
              <Block label="lang">
                {data.languages.map((l) => (
                  <p key={l.id}>
                    <span style={{ color: ACCENT }} className="font-mono">▸</span>{" "}
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
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-mono text-[10pt] mb-2" style={{ color: ACCENT }}>
        ## {label}
      </h2>
      {children}
    </section>
  );
}
