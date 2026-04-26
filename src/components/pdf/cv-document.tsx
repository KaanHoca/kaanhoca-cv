"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { CvData } from "@/lib/cv-schema";
import type { ThemeId } from "@/lib/themes";
import { formatDateRange } from "@/lib/format";
import { ensureFontsRegistered } from "@/components/pdf/fonts";
import { type Density, densityScale, scaleStyles } from "@/lib/density";

ensureFontsRegistered();

const FONT = "Inter";

type ThemePalette = {
  accent: string;
  accentBg: string;
  textPrimary: string;
  textMuted: string;
  divider: string;
};

const PALETTES: Record<ThemeId, ThemePalette> = {
  modern: {
    accent: "#0f766e",
    accentBg: "#0f766e",
    textPrimary: "#0f172a",
    textMuted: "#475569",
    divider: "#0f766e",
  },
  classic: {
    accent: "#1f2937",
    accentBg: "#1f2937",
    textPrimary: "#0f172a",
    textMuted: "#475569",
    divider: "#94a3b8",
  },
  minimal: {
    accent: "#111827",
    accentBg: "#111827",
    textPrimary: "#0f172a",
    textMuted: "#94a3b8",
    divider: "#e2e8f0",
  },
  creative: {
    accent: "#db2777",
    accentBg: "#fdf2f8",
    textPrimary: "#0f172a",
    textMuted: "#64748b",
    divider: "#db2777",
  },
  executive: {
    accent: "#1e3a8a",
    accentBg: "#1e3a8a",
    textPrimary: "#0f172a",
    textMuted: "#475569",
    divider: "#1e3a8a",
  },
  tech: {
    accent: "#10b981",
    accentBg: "#0f172a",
    textPrimary: "#0f172a",
    textMuted: "#64748b",
    divider: "#10b981",
  },
  academic: {
    accent: "#374151",
    accentBg: "#374151",
    textPrimary: "#0f172a",
    textMuted: "#64748b",
    divider: "#374151",
  },
  pastel: {
    accent: "#7c3aed",
    accentBg: "#f5f3ff",
    textPrimary: "#0f172a",
    textMuted: "#64748b",
    divider: "#a78bfa",
  },
};

export function CvDocument({
  data,
  themeId,
  density,
}: {
  data: CvData;
  themeId: ThemeId;
  density: Density;
}) {
  const scale = densityScale(density);
  switch (themeId) {
    case "classic":
      return <ClassicDoc data={data} scale={scale} />;
    case "minimal":
      return <MinimalDoc data={data} scale={scale} />;
    case "creative":
      return <CreativeDoc data={data} scale={scale} />;
    case "executive":
      return <ExecutiveDoc data={data} scale={scale} />;
    case "tech":
      return <TechDoc data={data} scale={scale} />;
    case "academic":
      return <AcademicDoc data={data} scale={scale} />;
    case "pastel":
      return <PastelDoc data={data} scale={scale} />;
    default:
      return <ModernDoc data={data} scale={scale} />;
  }
}

type DocProps = { data: CvData; scale: number };

function ModernDoc({ data, scale }: DocProps) {
  const p = PALETTES.modern;
  const styles = StyleSheet.create(scaleStyles({
    page: { flexDirection: "row", fontFamily: FONT, fontSize: 9.5 },
    sidebar: {
      width: "34%",
      backgroundColor: p.accentBg,
      color: "#fff",
      padding: 24,
    },
    main: { flex: 1, padding: 24 },
    name: { fontSize: 18, fontWeight: 700 },
    title: { fontSize: 11, marginTop: 2, opacity: 0.9 },
    sideHeader: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginTop: 16,
      marginBottom: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: "rgba(255,255,255,0.4)",
      paddingBottom: 3,
    },
    line: { marginBottom: 2 },
    blockTitle: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: p.accent,
      borderBottomWidth: 1.5,
      borderBottomColor: p.accent,
      paddingBottom: 3,
      marginBottom: 6,
      marginTop: 2,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 6,
    },
    bold: { fontWeight: 600 },
    accent: { color: p.accent, fontWeight: 500, fontSize: 10 },
    muted: { color: p.textMuted, fontSize: 8.5 },
    item: { marginBottom: 8 },
  }, scale));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                marginBottom: 12,
                objectFit: "cover",
              }}
            />
          ) : null}
          {data.profile.fullName && (
            <Text style={styles.name}>{data.profile.fullName}</Text>
          )}
          {data.profile.title && (
            <Text style={styles.title}>{data.profile.title}</Text>
          )}

          <Text style={styles.sideHeader}>İletişim</Text>
          {data.profile.email ? (
            <Text style={styles.line}>{data.profile.email}</Text>
          ) : null}
          {data.profile.phone ? (
            <Text style={styles.line}>{data.profile.phone}</Text>
          ) : null}
          {data.profile.location ? (
            <Text style={styles.line}>{data.profile.location}</Text>
          ) : null}
          {data.profile.website ? (
            <Text style={styles.line}>{data.profile.website}</Text>
          ) : null}
          {data.links.map((l) => (
            <Text key={l.id} style={styles.line}>
              {l.label}: {l.url}
            </Text>
          ))}

          {data.skills.length > 0 && (
            <>
              <Text style={styles.sideHeader}>Yetenekler</Text>
              {data.skills.map((s) => (
                <View
                  key={s.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Text>{s.name}</Text>
                  {s.level && (
                    <Text style={{ opacity: 0.75 }}>{s.level}</Text>
                  )}
                </View>
              ))}
            </>
          )}

          {data.languages.length > 0 && (
            <>
              <Text style={styles.sideHeader}>Diller</Text>
              {data.languages.map((l) => (
                <View
                  key={l.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Text>{l.name}</Text>
                  {l.level && <Text style={{ opacity: 0.75 }}>{l.level}</Text>}
                </View>
              ))}
            </>
          )}

          {data.certifications.length > 0 && (
            <>
              <Text style={styles.sideHeader}>Sertifikalar</Text>
              {data.certifications.map((c) => (
                <View key={c.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: 600 }}>{c.name}</Text>
                  {c.issuer ? (
                    <Text style={{ opacity: 0.9 }}>{c.issuer}</Text>
                  ) : null}
                  {c.date ? (
                    <Text style={{ opacity: 0.7, fontSize: 8.5 }}>
                      {c.date}
                    </Text>
                  ) : null}
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.main}>
          {data.profile.summary ? (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.blockTitle}>Özet</Text>
              <Text style={{ textAlign: "justify" }}>
                {data.profile.summary}
              </Text>
            </View>
          ) : null}

          {data.experiences.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.blockTitle}>İş Deneyimi</Text>
              {data.experiences.map((e) => (
                <View key={e.id} style={styles.item}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{e.position}</Text>
                    <Text style={styles.muted}>
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </Text>
                  </View>
                  <Text style={styles.accent}>
                    {e.company}
                    {e.location ? ` · ${e.location}` : ""}
                  </Text>
                  {e.description ? <Text>{e.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.education.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.blockTitle}>Eğitim</Text>
              {data.education.map((e) => (
                <View key={e.id} style={styles.item}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{e.school}</Text>
                    <Text style={styles.muted}>
                      {formatDateRange(e.startDate, e.endDate)}
                    </Text>
                  </View>
                  {(e.degree || e.field) && (
                    <Text style={{ color: p.accent }}>
                      {[e.degree, e.field].filter(Boolean).join(" — ")}
                    </Text>
                  )}
                  {e.description ? <Text>{e.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.additional.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.blockTitle}>Ek Deneyimler</Text>
              {data.additional.map((a) => (
                <View key={a.id} style={styles.item}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{a.title}</Text>
                    {a.date ? <Text style={styles.muted}>{a.date}</Text> : null}
                  </View>
                  {a.organization ? (
                    <Text style={styles.accent}>{a.organization}</Text>
                  ) : null}
                  {a.description ? <Text>{a.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.projects.length > 0 && (
            <View>
              <Text style={styles.blockTitle}>Projeler</Text>
              {data.projects.map((pr) => (
                <View key={pr.id} style={styles.item}>
                  <Text style={styles.bold}>{pr.name}</Text>
                  {pr.technologies ? (
                    <Text
                      style={{
                        color: p.accent,
                        
                        fontSize: 8.5,
                      }}
                    >
                      {pr.technologies}
                    </Text>
                  ) : null}
                  {pr.description ? <Text>{pr.description}</Text> : null}
                  {pr.url ? (
                    <Link
                      src={pr.url}
                      style={{ color: p.textMuted, fontSize: 8.5 }}
                    >
                      {pr.url}
                    </Link>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

function ClassicDoc({ data, scale }: DocProps) {
  const p = PALETTES.classic;
  const styles = StyleSheet.create(scaleStyles({
    page: { padding: 40, fontFamily: FONT, fontSize: 10, color: p.textPrimary },
    header: {
      borderBottomWidth: 1.5,
      borderBottomColor: p.textPrimary,
      paddingBottom: 10,
      marginBottom: 12,
      alignItems: "center",
    },
    name: { fontSize: 22, fontWeight: 700, letterSpacing: 1 },
    title: { fontSize: 12, marginTop: 2,  color: p.textMuted },
    contact: { fontSize: 9.5, marginTop: 6, color: p.textMuted },
    section: { marginBottom: 10 },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      borderBottomWidth: 0.5,
      borderBottomColor: p.divider,
      paddingBottom: 2,
      marginBottom: 5,
    },
    rowBetween: { flexDirection: "row", justifyContent: "space-between" },
    bold: { fontWeight: 600 },
    italic: {  color: p.textMuted },
    item: { marginBottom: 6 },
  }, scale));

  const contact = [
    data.profile.email,
    data.profile.phone,
    data.profile.location,
    data.profile.website,
  ]
    .filter(Boolean)
    .join("  •  ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 8,
                objectFit: "cover",
              }}
            />
          ) : null}
          {data.profile.fullName && (
            <Text style={styles.name}>{data.profile.fullName}</Text>
          )}
          {data.profile.title && (
            <Text style={styles.title}>{data.profile.title}</Text>
          )}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          {data.links.length > 0 && (
            <Text style={styles.contact}>
              {data.links.map((l) => `${l.label}: ${l.url}`).join("  •  ")}
            </Text>
          )}
        </View>

        {data.profile.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Özet</Text>
            <Text style={{ textAlign: "justify" }}>{data.profile.summary}</Text>
          </View>
        ) : null}

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>İş Deneyimi</Text>
            {data.experiences.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>
                    {e.position}
                    {e.company ? `, ${e.company}` : ""}
                  </Text>
                  <Text style={{ color: p.textMuted, fontSize: 9 }}>
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </Text>
                </View>
                {e.location ? (
                  <Text style={styles.italic}>{e.location}</Text>
                ) : null}
                {e.description ? <Text>{e.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {data.education.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>{e.school}</Text>
                  <Text style={{ color: p.textMuted, fontSize: 9 }}>
                    {formatDateRange(e.startDate, e.endDate)}
                  </Text>
                </View>
                {(e.degree || e.field) && (
                  <Text style={styles.italic}>
                    {[e.degree, e.field].filter(Boolean).join(", ")}
                  </Text>
                )}
                {e.description ? <Text>{e.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yetenekler</Text>
            <Text>{data.skills.map((s) => s.name).join(", ")}</Text>
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projeler</Text>
            {data.projects.map((pr) => (
              <View key={pr.id} style={styles.item}>
                <Text style={styles.bold}>
                  {pr.name}
                  {pr.technologies ? ` — ${pr.technologies}` : ""}
                </Text>
                {pr.description ? <Text>{pr.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sertifikalar</Text>
            {data.certifications.map((c) => (
              <Text key={c.id}>
                • {c.name}
                {c.issuer ? `, ${c.issuer}` : ""}
                {c.date ? ` (${c.date})` : ""}
              </Text>
            ))}
          </View>
        )}

        {data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diller</Text>
            <Text>
              {data.languages
                .map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`)
                .join(", ")}
            </Text>
          </View>
        )}

        {data.additional.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ek Deneyimler</Text>
            {data.additional.map((a) => (
              <View key={a.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>
                    {a.title}
                    {a.organization ? `, ${a.organization}` : ""}
                  </Text>
                  {a.date ? (
                    <Text style={{ color: p.textMuted, fontSize: 9 }}>
                      {a.date}
                    </Text>
                  ) : null}
                </View>
                {a.description ? <Text>{a.description}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

function MinimalDoc({ data, scale }: DocProps) {
  const p = PALETTES.minimal;
  const styles = StyleSheet.create(scaleStyles({
    page: { padding: 50, fontFamily: FONT, fontSize: 10, color: p.textPrimary },
    name: { fontSize: 24, fontWeight: 300, letterSpacing: -0.3 },
    title: { fontSize: 12, color: p.textMuted, marginTop: 2 },
    contact: { fontSize: 9, color: p.textMuted, marginTop: 6 },
    sectionTitle: {
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: p.textMuted,
      marginBottom: 8,
      marginTop: 16,
    },
    row: { flexDirection: "row", marginBottom: 8 },
    dateCol: { width: 90, fontSize: 9, color: p.textMuted },
    contentCol: { flex: 1 },
    bold: { fontWeight: 500 },
  }, scale));

  const contact = [
    data.profile.email,
    data.profile.phone,
    data.profile.location,
    data.profile.website,
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
          <View style={{ flex: 1 }}>
            {data.profile.fullName && (
              <Text style={styles.name}>{data.profile.fullName}</Text>
            )}
            {data.profile.title && (
              <Text style={styles.title}>{data.profile.title}</Text>
            )}
            {contact ? <Text style={styles.contact}>{contact}</Text> : null}
            {data.links.length > 0 && (
              <Text style={styles.contact}>
                {data.links.map((l) => `${l.label} ${l.url}`).join(" / ")}
              </Text>
            )}
          </View>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{ width: 70, height: 70, objectFit: "cover" }}
            />
          ) : null}
        </View>

        {data.profile.summary ? (
          <Text style={{ marginTop: 14, textAlign: "justify" }}>
            {data.profile.summary}
          </Text>
        ) : null}

        {data.experiences.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Deneyim</Text>
            {data.experiences.map((e) => (
              <View key={e.id} style={styles.row}>
                <Text style={styles.dateCol}>
                  {formatDateRange(e.startDate, e.endDate, e.current)}
                </Text>
                <View style={styles.contentCol}>
                  <Text style={styles.bold}>{e.position}</Text>
                  <Text style={{ color: p.textMuted }}>
                    {e.company}
                    {e.location ? ` — ${e.location}` : ""}
                  </Text>
                  {e.description ? (
                    <Text style={{ marginTop: 2 }}>{e.description}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {data.education.map((e) => (
              <View key={e.id} style={styles.row}>
                <Text style={styles.dateCol}>
                  {formatDateRange(e.startDate, e.endDate)}
                </Text>
                <View style={styles.contentCol}>
                  <Text style={styles.bold}>{e.school}</Text>
                  {(e.degree || e.field) && (
                    <Text style={{ color: p.textMuted }}>
                      {[e.degree, e.field].filter(Boolean).join(" — ")}
                    </Text>
                  )}
                  {e.description ? <Text>{e.description}</Text> : null}
                </View>
              </View>
            ))}
          </>
        )}

        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Yetenekler</Text>
            <Text>{data.skills.map((s) => s.name).join(" · ")}</Text>
          </>
        )}

        {data.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Projeler</Text>
            {data.projects.map((pr) => (
              <View key={pr.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>
                  {pr.name}
                  {pr.technologies ? ` · ${pr.technologies}` : ""}
                </Text>
                {pr.description ? <Text>{pr.description}</Text> : null}
              </View>
            ))}
          </>
        )}

        {data.additional.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ek Deneyimler</Text>
            {data.additional.map((a) => (
              <View key={a.id} style={styles.row}>
                <Text style={styles.dateCol}>{a.date ?? ""}</Text>
                <View style={styles.contentCol}>
                  <Text style={styles.bold}>{a.title}</Text>
                  {a.organization ? (
                    <Text style={{ color: p.textMuted }}>
                      {a.organization}
                    </Text>
                  ) : null}
                  {a.description ? <Text>{a.description}</Text> : null}
                </View>
              </View>
            ))}
          </>
        )}

        {(data.certifications.length > 0 || data.languages.length > 0) && (
          <View style={{ flexDirection: "row", marginTop: 12, gap: 24 }}>
            {data.certifications.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Sertifikalar</Text>
                {data.certifications.map((c) => (
                  <Text key={c.id}>
                    {c.name}
                    {c.issuer ? ` · ${c.issuer}` : ""}
                  </Text>
                ))}
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Diller</Text>
                {data.languages.map((l) => (
                  <Text key={l.id}>
                    {l.name}
                    {l.level ? ` — ${l.level}` : ""}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}

function CreativeDoc({ data, scale }: DocProps) {
  const p = PALETTES.creative;
  const styles = StyleSheet.create(scaleStyles({
    page: { fontFamily: FONT, fontSize: 9.5, color: p.textPrimary },
    header: { padding: 28, backgroundColor: p.accent, color: "#fff" },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    name: { fontSize: 24, fontWeight: 700 },
    title: { fontSize: 11, marginTop: 2, opacity: 0.9 },
    contact: { fontSize: 9, opacity: 0.95, textAlign: "right" },
    body: { padding: 28 },
    summaryBox: {
      padding: 12,
      backgroundColor: p.accentBg,
      borderRadius: 6,
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 9,
      fontWeight: 600,
      color: p.accent,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 3,
    },
    blockTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: p.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 6,
      marginTop: 10,
    },
    expItem: { marginBottom: 8, paddingLeft: 12 },
    bold: { fontWeight: 700 },
  }, scale));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {data.profile.photoDataUrl ? (
                <Image
                  src={data.profile.photoDataUrl}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    objectFit: "cover",
                  }}
                />
              ) : null}
              <View>
                {data.profile.fullName && (
                  <Text style={styles.name}>{data.profile.fullName}</Text>
                )}
                {data.profile.title && (
                  <Text style={styles.title}>{data.profile.title}</Text>
                )}
              </View>
            </View>
            <View>
              {data.profile.email ? (
                <Text style={styles.contact}>{data.profile.email}</Text>
              ) : null}
              {data.profile.phone ? (
                <Text style={styles.contact}>{data.profile.phone}</Text>
              ) : null}
              {data.profile.location ? (
                <Text style={styles.contact}>{data.profile.location}</Text>
              ) : null}
              {data.profile.website ? (
                <Text style={styles.contact}>{data.profile.website}</Text>
              ) : null}
              {data.links.map((l) => (
                <Text key={l.id} style={styles.contact}>
                  {l.label}: {l.url}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {data.profile.summary ? (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Hakkımda</Text>
              <Text style={{ textAlign: "justify" }}>
                {data.profile.summary}
              </Text>
            </View>
          ) : null}

          {data.experiences.length > 0 && (
            <View>
              <Text style={styles.blockTitle}>Deneyim</Text>
              {data.experiences.map((e) => (
                <View key={e.id} style={styles.expItem}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.bold}>{e.position}</Text>
                    <Text style={{ fontSize: 8.5, color: p.textMuted }}>
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </Text>
                  </View>
                  <Text style={{ color: p.accent, fontWeight: 500 }}>
                    {e.company}
                    {e.location ? ` · ${e.location}` : ""}
                  </Text>
                  {e.description ? <Text>{e.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          <View
            style={{ flexDirection: "row", gap: 20, marginTop: 10 }}
          >
            {data.education.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.blockTitle}>Eğitim</Text>
                {data.education.map((e) => (
                  <View key={e.id} style={{ marginBottom: 5 }}>
                    <Text style={styles.bold}>{e.school}</Text>
                    {(e.degree || e.field) && (
                      <Text>
                        {[e.degree, e.field].filter(Boolean).join(" — ")}
                      </Text>
                    )}
                    <Text style={{ fontSize: 8.5, color: p.textMuted }}>
                      {formatDateRange(e.startDate, e.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {data.skills.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.blockTitle}>Yetenekler</Text>
                <Text>{data.skills.map((s) => s.name).join(" · ")}</Text>
              </View>
            )}
          </View>

          {data.projects.length > 0 && (
            <View>
              <Text style={styles.blockTitle}>Projeler</Text>
              {data.projects.map((pr) => (
                <View
                  key={pr.id}
                  style={{
                    marginBottom: 5,
                    paddingLeft: 8,
                    borderLeftWidth: 2,
                    borderLeftColor: p.accent,
                  }}
                >
                  <Text style={styles.bold}>{pr.name}</Text>
                  {pr.technologies ? (
                    <Text style={{ color: p.accent }}>
                      {pr.technologies}
                    </Text>
                  ) : null}
                  {pr.description ? <Text>{pr.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.additional.length > 0 && (
            <View>
              <Text style={styles.blockTitle}>Ek Deneyimler</Text>
              {data.additional.map((a) => (
                <View
                  key={a.id}
                  style={{
                    marginBottom: 5,
                    paddingLeft: 8,
                    borderLeftWidth: 2,
                    borderLeftColor: p.accent,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.bold}>{a.title}</Text>
                    {a.date ? (
                      <Text style={{ fontSize: 8.5, color: p.textMuted }}>
                        {a.date}
                      </Text>
                    ) : null}
                  </View>
                  {a.organization ? (
                    <Text style={{ color: p.accent, fontWeight: 500 }}>
                      {a.organization}
                    </Text>
                  ) : null}
                  {a.description ? <Text>{a.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {(data.certifications.length > 0 || data.languages.length > 0) && (
            <View style={{ flexDirection: "row", gap: 20, marginTop: 6 }}>
              {data.certifications.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.blockTitle}>Sertifikalar</Text>
                  {data.certifications.map((c) => (
                    <Text key={c.id}>
                      {c.name}
                      {c.issuer ? ` · ${c.issuer}` : ""}
                    </Text>
                  ))}
                </View>
              )}
              {data.languages.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.blockTitle}>Diller</Text>
                  {data.languages.map((l) => (
                    <Text key={l.id}>
                      {l.name}
                      {l.level ? ` — ${l.level}` : ""}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

function ExecutiveDoc({ data, scale }: DocProps) {
  const p = PALETTES.executive;
  const styles = StyleSheet.create(scaleStyles({
    page: { padding: 50, fontFamily: FONT, fontSize: 10, color: p.textPrimary },
    header: {
      flexDirection: "row",
      gap: 16,
      borderBottomWidth: 3,
      borderBottomColor: p.accent,
      paddingBottom: 12,
      marginBottom: 14,
    },
    name: { fontSize: 22, fontWeight: 700, color: p.accent },
    title: { fontSize: 12, marginTop: 2, color: p.textMuted },
    contact: { fontSize: 9.5, marginTop: 6, color: p.textMuted },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: p.accent,
      borderBottomWidth: 0.5,
      borderBottomColor: p.accent,
      paddingBottom: 3,
      marginBottom: 6,
      marginTop: 4,
    },
    item: { marginBottom: 8 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between" },
    bold: { fontWeight: 700 },
    company: { fontWeight: 600, color: p.accent },
  }, scale));

  const contact = [
    data.profile.email,
    data.profile.phone,
    data.profile.location,
    data.profile.website,
  ]
    .filter(Boolean)
    .join("  |  ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{ width: 70, height: 70, objectFit: "cover" }}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            {data.profile.fullName && (
              <Text style={styles.name}>{data.profile.fullName}</Text>
            )}
            {data.profile.title && (
              <Text style={styles.title}>{data.profile.title}</Text>
            )}
            {contact ? <Text style={styles.contact}>{contact}</Text> : null}
            {data.links.length > 0 && (
              <Text style={styles.contact}>
                {data.links.map((l) => `${l.label}: ${l.url}`).join("  |  ")}
              </Text>
            )}
          </View>
        </View>

        {data.profile.summary ? (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>Profil Özeti</Text>
            <Text style={{ textAlign: "justify" }}>{data.profile.summary}</Text>
          </View>
        ) : null}

        {data.experiences.length > 0 && (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>Yönetsel Deneyim</Text>
            {data.experiences.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>{e.position}</Text>
                  <Text style={{ color: p.textMuted, fontSize: 9 }}>
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </Text>
                </View>
                <Text style={styles.company}>
                  {e.company}
                  {e.location ? ` · ${e.location}` : ""}
                </Text>
                {e.description ? <Text>{e.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {data.education.map((e) => (
              <View key={e.id} style={styles.rowBetween}>
                <View>
                  <Text style={styles.bold}>{e.school}</Text>
                  {(e.degree || e.field) && (
                    <Text style={{ color: p.textMuted }}>
                      {[e.degree, e.field].filter(Boolean).join(", ")}
                    </Text>
                  )}
                </View>
                <Text style={{ color: p.textMuted, fontSize: 9 }}>
                  {formatDateRange(e.startDate, e.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>Yetkinlik Alanları</Text>
            <Text>{data.skills.map((s) => s.name).join("  ·  ")}</Text>
          </View>
        )}

        {data.additional.length > 0 && (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>Ek Deneyimler</Text>
            {data.additional.map((a) => (
              <View key={a.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bold}>
                    {a.title}
                    {a.organization ? `, ${a.organization}` : ""}
                  </Text>
                  {a.date ? (
                    <Text style={{ color: p.textMuted, fontSize: 9 }}>
                      {a.date}
                    </Text>
                  ) : null}
                </View>
                {a.description ? <Text>{a.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {(data.certifications.length > 0 || data.languages.length > 0) && (
          <View style={{ flexDirection: "row", gap: 24 }}>
            {data.certifications.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Sertifikalar</Text>
                {data.certifications.map((c) => (
                  <Text key={c.id}>
                    {c.name}
                    {c.issuer ? ` · ${c.issuer}` : ""}
                  </Text>
                ))}
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Diller</Text>
                <Text>
                  {data.languages
                    .map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`)
                    .join(", ")}
                </Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}

function TechDoc({ data, scale }: DocProps) {
  const p = PALETTES.tech;
  const styles = StyleSheet.create(scaleStyles({
    page: { fontFamily: FONT, fontSize: 9.5, color: p.textPrimary },
    header: {
      backgroundColor: p.accentBg,
      color: "#e2e8f0",
      padding: 24,
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
    },
    name: { fontSize: 20, fontWeight: 700, color: "#e2e8f0" },
    title: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
    contact: { fontSize: 8.5, color: "#94a3b8", marginTop: 6 },
    body: { padding: 24, gap: 12 },
    sectionTitle: {
      fontSize: 10,
      color: p.accent,
      marginBottom: 5,
      marginTop: 4,
    },
    bold: { fontWeight: 600 },
    item: { marginBottom: 6 },
    accentText: { color: p.accent },
    muted: { color: p.textMuted, fontSize: 8.5 },
  }, scale));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{
                width: 60,
                height: 60,
                borderRadius: 4,
                objectFit: "cover",
              }}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            {data.profile.fullName && (
              <Text style={styles.name}>
                <Text style={{ color: p.accent }}>$ </Text>
                {data.profile.fullName}
              </Text>
            )}
            {data.profile.title && (
              <Text style={styles.title}>
                <Text style={{ color: p.accent }}>~/</Text>
                {data.profile.title}
              </Text>
            )}
            <Text style={styles.contact}>
              {[
                data.profile.email,
                data.profile.phone,
                data.profile.location,
                data.profile.website,
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </Text>
            {data.links.length > 0 && (
              <Text style={styles.contact}>
                {data.links.map((l) => `${l.label}=${l.url}`).join("  ·  ")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.body}>
          {data.profile.summary ? (
            <View>
              <Text style={styles.sectionTitle}>## readme.md</Text>
              <Text style={{ textAlign: "justify" }}>
                {data.profile.summary}
              </Text>
            </View>
          ) : null}

          {data.experiences.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>## experience</Text>
              {data.experiences.map((e) => (
                <View key={e.id} style={styles.item}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>
                      <Text style={styles.accentText}>▸ </Text>
                      <Text style={styles.bold}>{e.position}</Text>
                      <Text style={styles.muted}> @ </Text>
                      <Text style={styles.accentText}>{e.company}</Text>
                    </Text>
                    <Text style={styles.muted}>
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </Text>
                  </View>
                  {e.location ? (
                    <Text style={[styles.muted, { paddingLeft: 12 }]}>
                      {e.location}
                    </Text>
                  ) : null}
                  {e.description ? (
                    <Text style={{ paddingLeft: 12 }}>{e.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 16 }}>
            {data.skills.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>## stack.json</Text>
                <Text style={{ color: p.textMuted }}>{`{`}</Text>
                {data.skills.map((s, i) => (
                  <Text key={s.id} style={{ paddingLeft: 8 }}>
                    <Text style={styles.accentText}>&quot;{s.name}&quot;</Text>
                    {s.level ? (
                      <Text>: &quot;{s.level}&quot;</Text>
                    ) : null}
                    {i < data.skills.length - 1 ? "," : ""}
                  </Text>
                ))}
                <Text style={{ color: p.textMuted }}>{`}`}</Text>
              </View>
            )}
            {data.education.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>## education</Text>
                {data.education.map((e) => (
                  <View key={e.id} style={{ marginBottom: 4 }}>
                    <Text style={styles.bold}>{e.school}</Text>
                    {(e.degree || e.field) && (
                      <Text style={styles.accentText}>
                        {[e.degree, e.field].filter(Boolean).join(" — ")}
                      </Text>
                    )}
                    <Text style={styles.muted}>
                      {formatDateRange(e.startDate, e.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>## projects</Text>
              {data.projects.map((pr) => (
                <View key={pr.id} style={styles.item}>
                  <Text>
                    <Text style={styles.accentText}>▸ </Text>
                    <Text style={styles.bold}>{pr.name}</Text>
                  </Text>
                  {pr.technologies ? (
                    <Text style={[styles.accentText, { paddingLeft: 12 }]}>
                      {pr.technologies}
                    </Text>
                  ) : null}
                  {pr.description ? (
                    <Text style={{ paddingLeft: 12 }}>{pr.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.additional.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>## extras</Text>
              {data.additional.map((a) => (
                <View key={a.id} style={styles.item}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>
                      <Text style={styles.accentText}>▸ </Text>
                      <Text style={styles.bold}>{a.title}</Text>
                      {a.organization ? (
                        <Text style={styles.muted}> @ {a.organization}</Text>
                      ) : null}
                    </Text>
                    {a.date ? <Text style={styles.muted}>{a.date}</Text> : null}
                  </View>
                  {a.description ? (
                    <Text style={{ paddingLeft: 12 }}>{a.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {(data.certifications.length > 0 || data.languages.length > 0) && (
            <View style={{ flexDirection: "row", gap: 16 }}>
              {data.certifications.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>## certs</Text>
                  {data.certifications.map((c) => (
                    <Text key={c.id}>
                      <Text style={styles.accentText}>▸ </Text>
                      {c.name}
                      {c.issuer ? ` · ${c.issuer}` : ""}
                    </Text>
                  ))}
                </View>
              )}
              {data.languages.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>## lang</Text>
                  {data.languages.map((l) => (
                    <Text key={l.id}>
                      <Text style={styles.accentText}>▸ </Text>
                      {l.name}
                      {l.level ? ` — ${l.level}` : ""}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

function AcademicDoc({ data, scale }: DocProps) {
  const p = PALETTES.academic;
  const styles = StyleSheet.create(scaleStyles({
    page: { padding: 56, fontFamily: FONT, fontSize: 10, color: p.textPrimary, lineHeight: 1.5 },
    header: { alignItems: "center", marginBottom: 14 },
    name: { fontSize: 22, fontWeight: 400, letterSpacing: 1 },
    title: { fontSize: 11, marginTop: 2, color: p.textMuted },
    contact: { fontSize: 9.5, marginTop: 4, color: p.textMuted, textAlign: "center" },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: p.accent,
      borderBottomWidth: 0.5,
      borderBottomColor: p.accent,
      paddingBottom: 2,
      marginBottom: 6,
      marginTop: 8,
    },
    item: { marginBottom: 6 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between" },
    bold: { fontWeight: 700 },
    listItem: { marginBottom: 3, paddingLeft: 10 },
  }, scale));

  const contact = [
    data.profile.email,
    data.profile.phone,
    data.profile.location,
    data.profile.website,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.profile.photoDataUrl ? (
            <Image
              src={data.profile.photoDataUrl}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 8,
                objectFit: "cover",
              }}
            />
          ) : null}
          {data.profile.fullName && (
            <Text style={styles.name}>{data.profile.fullName}</Text>
          )}
          {data.profile.title && (
            <Text style={styles.title}>{data.profile.title}</Text>
          )}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          {data.links.length > 0 && (
            <Text style={styles.contact}>
              {data.links.map((l) => `${l.label}: ${l.url}`).join("  ·  ")}
            </Text>
          )}
        </View>

        {data.profile.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Araştırma Özeti</Text>
            <Text style={{ textAlign: "justify" }}>{data.profile.summary}</Text>
          </View>
        ) : null}

        {data.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {data.education.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text>
                    <Text style={styles.bold}>
                      {[e.degree, e.field].filter(Boolean).join(", ") ||
                        e.school}
                    </Text>
                    {(e.degree || e.field) && e.school ? `, ${e.school}` : ""}
                  </Text>
                  <Text style={{ color: p.textMuted, fontSize: 9 }}>
                    {formatDateRange(e.startDate, e.endDate)}
                  </Text>
                </View>
                {e.description ? (
                  <Text style={{ fontSize: 9.5 }}>{e.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.experiences.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Akademik & Profesyonel Deneyim</Text>
            {data.experiences.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text>
                    <Text style={styles.bold}>{e.position}</Text>, {e.company}
                    {e.location ? `, ${e.location}` : ""}
                  </Text>
                  <Text style={{ color: p.textMuted, fontSize: 9 }}>
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </Text>
                </View>
                {e.description ? <Text>{e.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.additional.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              Yayınlar, Konferanslar & Sunumlar
            </Text>
            {data.additional.map((a, idx) => (
              <View key={a.id} style={styles.listItem}>
                <Text>
                  {idx + 1}.{" "}
                  <Text style={styles.bold}>{a.title}</Text>
                  {a.organization ? `, ${a.organization}` : ""}
                  {a.date ? ` (${a.date})` : ""}
                </Text>
                {a.description ? (
                  <Text style={{ fontSize: 9.5 }}>{a.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.certifications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Sertifikalar & Ödüller</Text>
            {data.certifications.map((c) => (
              <Text key={c.id} style={styles.listItem}>
                • {c.name}
                {c.issuer ? `, ${c.issuer}` : ""}
                {c.date ? ` (${c.date})` : ""}
              </Text>
            ))}
          </View>
        )}

        {data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projeler</Text>
            {data.projects.map((pr) => (
              <View key={pr.id} style={styles.item}>
                <Text style={styles.bold}>{pr.name}</Text>
                {pr.technologies ? (
                  <Text style={{ color: p.textMuted, fontSize: 9.5 }}>
                    {pr.technologies}
                  </Text>
                ) : null}
                {pr.description ? <Text>{pr.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {(data.skills.length > 0 || data.languages.length > 0) && (
          <View style={{ flexDirection: "row", gap: 24 }}>
            {data.skills.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Yetkinlik Alanları</Text>
                <Text>{data.skills.map((s) => s.name).join(", ")}</Text>
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Diller</Text>
                <Text>
                  {data.languages
                    .map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`)
                    .join(", ")}
                </Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}

function PastelDoc({ data, scale }: DocProps) {
  const p = PALETTES.pastel;
  const SOFT = "#f5f3ff";
  const PINK = "#fce7f3";
  const styles = StyleSheet.create(scaleStyles({
    page: { fontFamily: FONT, fontSize: 9.5, color: p.textPrimary, padding: 24, backgroundColor: SOFT },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 22,
      gap: 12,
    },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 14 },
    name: { fontSize: 22, fontWeight: 700, color: p.accent },
    title: { fontSize: 11, color: p.textMuted, marginTop: 2 },
    contactBox: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      backgroundColor: SOFT,
      padding: 8,
      borderRadius: 10,
    },
    contactItem: { fontSize: 9, color: p.textMuted },
    sectionTitle: {
      fontSize: 9.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: p.accent,
      marginBottom: 5,
    },
    expCard: {
      backgroundColor: SOFT,
      borderRadius: 10,
      padding: 10,
      marginBottom: 6,
    },
    bold: { fontWeight: 600 },
    accentText: { color: p.accent, fontWeight: 500 },
    muted: { color: p.textMuted, fontSize: 8.5 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
    chip: {
      backgroundColor: PINK,
      color: p.accent,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      fontSize: 8.5,
      marginRight: 4,
      marginBottom: 4,
    },
  }, scale));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            {data.profile.photoDataUrl ? (
              <Image
                src={data.profile.photoDataUrl}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  objectFit: "cover",
                }}
              />
            ) : null}
            <View style={{ flex: 1 }}>
              {data.profile.fullName && (
                <Text style={styles.name}>{data.profile.fullName}</Text>
              )}
              {data.profile.title && (
                <Text style={styles.title}>{data.profile.title}</Text>
              )}
            </View>
          </View>

          <View style={styles.contactBox}>
            {data.profile.email ? (
              <Text style={styles.contactItem}>✉ {data.profile.email}</Text>
            ) : null}
            {data.profile.phone ? (
              <Text style={styles.contactItem}>☏ {data.profile.phone}</Text>
            ) : null}
            {data.profile.location ? (
              <Text style={styles.contactItem}>⌖ {data.profile.location}</Text>
            ) : null}
            {data.profile.website ? (
              <Text style={styles.contactItem}>↗ {data.profile.website}</Text>
            ) : null}
            {data.links.map((l) => (
              <Text key={l.id} style={styles.contactItem}>
                {l.label}: {l.url}
              </Text>
            ))}
          </View>

          {data.profile.summary ? (
            <View
              style={{
                backgroundColor: SOFT,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={styles.sectionTitle}>Hakkımda</Text>
              <Text style={{ textAlign: "justify" }}>
                {data.profile.summary}
              </Text>
            </View>
          ) : null}

          {data.experiences.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Deneyim</Text>
              {data.experiences.map((e) => (
                <View key={e.id} style={styles.expCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{e.position}</Text>
                    <Text style={styles.accentText}>
                      {formatDateRange(e.startDate, e.endDate, e.current)}
                    </Text>
                  </View>
                  <Text style={styles.accentText}>
                    {e.company}
                    {e.location ? ` · ${e.location}` : ""}
                  </Text>
                  {e.description ? <Text>{e.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 12 }}>
            {data.education.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Eğitim</Text>
                {data.education.map((e) => (
                  <View key={e.id} style={{ marginBottom: 4 }}>
                    <Text style={styles.bold}>{e.school}</Text>
                    {(e.degree || e.field) && (
                      <Text>
                        {[e.degree, e.field].filter(Boolean).join(" — ")}
                      </Text>
                    )}
                    <Text style={styles.muted}>
                      {formatDateRange(e.startDate, e.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {data.skills.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Yetkinlikler</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {data.skills.map((s) => (
                    <Text key={s.id} style={styles.chip}>
                      {s.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Projeler</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {data.projects.map((pr) => (
                  <View
                    key={pr.id}
                    style={{
                      width: "48%",
                      backgroundColor: PINK,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={styles.bold}>{pr.name}</Text>
                    {pr.technologies ? (
                      <Text style={styles.accentText}>{pr.technologies}</Text>
                    ) : null}
                    {pr.description ? <Text>{pr.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.additional.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Ek Deneyimler</Text>
              {data.additional.map((a) => (
                <View key={a.id} style={styles.expCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{a.title}</Text>
                    {a.date ? (
                      <Text style={styles.accentText}>{a.date}</Text>
                    ) : null}
                  </View>
                  {a.organization ? (
                    <Text style={styles.accentText}>{a.organization}</Text>
                  ) : null}
                  {a.description ? <Text>{a.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {(data.certifications.length > 0 || data.languages.length > 0) && (
            <View style={{ flexDirection: "row", gap: 12 }}>
              {data.certifications.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>Sertifikalar</Text>
                  {data.certifications.map((c) => (
                    <Text key={c.id}>
                      <Text style={styles.bold}>{c.name}</Text>
                      {c.issuer ? ` · ${c.issuer}` : ""}
                    </Text>
                  ))}
                </View>
              )}
              {data.languages.length > 0 && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>Diller</Text>
                  {data.languages.map((l) => (
                    <Text key={l.id}>
                      {l.name}
                      {l.level ? ` — ${l.level}` : ""}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
