const MONTHS_TR = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];

export function formatYearMonth(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{4})-(\d{1,2})$/);
  if (!match) return trimmed;
  const year = match[1];
  const month = parseInt(match[2], 10);
  if (month < 1 || month > 12) return trimmed;
  return `${MONTHS_TR[month - 1]} ${year}`;
}

export function formatDateRange(
  start: string | undefined,
  end: string | undefined,
  current?: boolean,
): string {
  const s = formatYearMonth(start);
  const e = current ? "Devam ediyor" : formatYearMonth(end);
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}
