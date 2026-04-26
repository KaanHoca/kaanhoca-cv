"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { CvData } from "@/lib/cv-schema";
import type { ThemeId } from "@/lib/themes";
import { formatDateRange } from "@/lib/format";
import { ensureFontsRegistered } from "@/components/pdf/fonts";

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
};

export function CvDocument({
  data,
  themeId,
}: {
  data: CvData;
  themeId: ThemeId;
}) {
  switch (themeId) {
    case "classic":
      return <ClassicDoc data={data} />;
    case "minimal":
      return <MinimalDoc data={data} />;
    case "creative":
      return <CreativeDoc data={data} />;
    default:
      return <ModernDoc data={data} />;
  }
}

function ModernDoc({ data }: { data: CvData }) {
  const p = PALETTES.modern;
  const styles = StyleSheet.create({
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
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
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

function ClassicDoc({ data }: { data: CvData }) {
  const p = PALETTES.classic;
  const styles = StyleSheet.create({
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
  });

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
      </Page>
    </Document>
  );
}

function MinimalDoc({ data }: { data: CvData }) {
  const p = PALETTES.minimal;
  const styles = StyleSheet.create({
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
  });

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

function CreativeDoc({ data }: { data: CvData }) {
  const p = PALETTES.creative;
  const styles = StyleSheet.create({
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
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              {data.profile.fullName && (
                <Text style={styles.name}>{data.profile.fullName}</Text>
              )}
              {data.profile.title && (
                <Text style={styles.title}>{data.profile.title}</Text>
              )}
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
