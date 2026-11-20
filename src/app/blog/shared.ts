// Same categories as the Strapi enumeration on `blog-posts`.
const labels: Record<string, string> = { guide: "Guide", "case-story": "Case", "tech-dive": "Teknik", "business-case": "Forretning", compliance: "Regler", news: "Nyhed" };

export const categoryLabel = (category?: string) => (category ? labels[category] ?? category : "Guide");

// A fixed time zone, so the server and the browser always print the same day.
const fmt = new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Copenhagen" });
export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : fmt.format(d);
};
