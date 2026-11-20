// The file format of a blog post, shared by the site (src/lib/blog.ts) and the check the writers run before they
// push (scripts/blog-check.mjs). Plain JavaScript on purpose, so the check runs with `node` and no install.
//
// A post is content/blog/<slug>.md: a front matter block between two "---" lines, then the article in markdown.

export const CATEGORIES = ["guide", "news", "case-story", "tech-dive", "business-case", "compliance"];

/** The layout adds " · Mindforward" (14 characters) to the title, and Google shows about 60. */
export const SEO_TITLE_MAX = 46;

/**
 * @typedef {object} BlogPost
 * @property {string} slug
 * @property {string} title
 * @property {string} date ISO date (YYYY-MM-DD) the post was published
 * @property {string} [updated] ISO date of the last real change
 * @property {string} excerpt
 * @property {string} category
 * @property {string} author
 * @property {string} [seoTitle]
 * @property {string} [seoDescription]
 * @property {string[]} keywords
 * @property {number} [readingTime]
 * @property {string} [image] Path under /blog/ in public
 * @property {string} [imageAlt]
 * @property {string} [imageCredit]
 * @property {string} content Markdown, starting with a "## " heading
 */

const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(new Date(v).getTime());

/** "key: value" lines. Values are plain text, a quoted string, a number or a JSON array on one line. */
function parseFrontMatter(block, errors) {
  /** @type {Record<string, unknown>} */
  const data = {};
  for (const line of block.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const m = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!m) { errors.push(`front matter: kan ikke læse linjen "${line.trim().slice(0, 60)}"`); continue; }
    const raw = m[2].trim();
    if (raw.startsWith("[") || raw.startsWith('"')) {
      try { data[m[1]] = JSON.parse(raw); } catch { errors.push(`front matter: "${m[1]}" er ikke gyldig JSON (brug dobbelte anførselstegn)`); }
    } else if (/^\d+$/.test(raw)) data[m[1]] = Number(raw);
    else data[m[1]] = raw.replace(/^'(.*)'$/, "$1");
  }
  return data;
}

/** Image paths used in the body: lines of the form ![alt](/blog/... "caption"). */
export function bodyImages(content) {
  return [...content.matchAll(/^!\[[^\]]*\]\(([^)\s]+)/gm)].map((m) => m[1]);
}

/**
 * @param {string} slug File name without .md
 * @param {string} raw File contents
 * @returns {{ post: BlogPost | null, errors: string[] }}
 */
export function parsePost(slug, raw) {
  const errors = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push("filnavnet skal være kebab-case uden æøå, fx hvad-koster-et-copilot-kursus.md");

  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { post: null, errors: [...errors, 'filen skal starte med et front matter-felt mellem to linjer med "---"'] };
  const d = parseFrontMatter(m[1], errors);
  const content = m[2].trim();
  const str = (k) => (typeof d[k] === "string" && d[k].trim() ? d[k].trim() : undefined);

  const title = str("title");
  const excerpt = str("excerpt");
  const date = str("date");
  const updated = str("updated");
  const category = str("category") ?? "guide";
  const seoTitle = str("seoTitle");
  const seoDescription = str("seoDescription");
  const image = str("image");
  const imageAlt = str("imageAlt");

  if (!title) errors.push("title mangler");
  else if (title.length > 100) errors.push(`title er ${title.length} tegn (højst 100)`);
  if (!excerpt) errors.push("excerpt mangler");
  else if (excerpt.length > 300) errors.push(`excerpt er ${excerpt.length} tegn (højst 300)`);
  if (!isDate(date)) errors.push("date mangler eller er ikke på formen YYYY-MM-DD");
  if (updated && !isDate(updated)) errors.push("updated er ikke på formen YYYY-MM-DD");
  if (!CATEGORIES.includes(category)) errors.push(`category "${category}" findes ikke (brug: ${CATEGORIES.join(", ")})`);
  if (seoTitle && seoTitle.length > SEO_TITLE_MAX) errors.push(`seoTitle er ${seoTitle.length} tegn (højst ${SEO_TITLE_MAX})`);
  if (seoDescription && seoDescription.length > 160) errors.push(`seoDescription er ${seoDescription.length} tegn (højst 160)`);
  if (d.keywords !== undefined && !(Array.isArray(d.keywords) && d.keywords.every((k) => typeof k === "string"))) errors.push('keywords skal være en liste: ["et", "to"]');
  if (d.readingTime !== undefined && !(Number.isInteger(d.readingTime) && d.readingTime > 0)) errors.push("readingTime skal være et helt tal (minutter)");
  if (image && !image.startsWith("/blog/")) errors.push("image skal være en sti under /blog/ (filen ligger i public/blog/)");
  if (image && !imageAlt) errors.push("imageAlt mangler (beskriv billedet på dansk)");

  if (!content) errors.push("artiklen er tom");
  else {
    if (!content.startsWith("## ")) errors.push('artiklen skal starte med en "## "-overskrift (sidens H1 er title)');
    if (/^#\s/m.test(content)) errors.push('brug ikke "# " i artiklen - sidens H1 er title');
    if (/^```/m.test(content)) errors.push("kodeblokke med ``` vises ikke - fjern dem");
    if (/^\|.*\|\s*$/m.test(content)) errors.push("tabeller vises ikke - skriv det som en liste");
    if (/^---\s*$/m.test(content)) errors.push('"---" som skillelinje vises ikke - fjern den');
    if (/<\/?[a-z][a-z0-9]*(\s[^>]*)?>/i.test(content)) errors.push("rå HTML vises ikke - brug markdown");
    if (/\*\*\[[^\]]+\]\([^)]+\)\*\*|\[\*\*[^\]]+\*\*\]\([^)]+\)/.test(content)) errors.push("fed og link i samme udtryk går i stykker - hold dem adskilt");
    for (const src of bodyImages(content)) if (!src.startsWith("/blog/")) errors.push(`billedet ${src} skal ligge under /blog/ (public/blog/) - hotlink aldrig`);
  }

  if (errors.length > 0 || !title || !excerpt || !date) return { post: null, errors };
  return {
    post: {
      slug, title, date, updated, excerpt, category,
      author: str("author") ?? "Mindforward",
      seoTitle, seoDescription,
      keywords: Array.isArray(d.keywords) ? d.keywords : [],
      readingTime: typeof d.readingTime === "number" ? d.readingTime : undefined,
      image, imageAlt, imageCredit: str("imageCredit"),
      content,
    },
    errors,
  };
}
