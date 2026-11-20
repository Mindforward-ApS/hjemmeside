// Minimal markdown → JSX for blog articles (ported from the AIK site so the same writing rules apply).
// Supports: ## to ###### headings, paragraphs, - / * and 1. lists, **bold**, *italic*, [links](url), `code`,
// > quotes and images on their own line: ![alt](url "caption"). No tables, code fences, raw HTML or nested lists.
import Image from "next/image";
import Link from "next/link";
import { createElement, type ReactNode } from "react";

// Images in the body must come from Strapi's media library (same hosts as next.config.ts).
const IMAGE_LINE = /^!\[([^\]]*)\]\((https:\/\/[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;
function isAllowedImage(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".strapiapp.com");
  } catch {
    return false;
  }
}

const linkClass = "font-medium text-heading underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-accent";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[3];
      parts.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className={linkClass}>{m[2]}</Link>
        ) : (
          <a key={key++} href={href} className={linkClass} target="_blank" rel="noopener noreferrer">{m[2]}</a>
        ),
      );
    } else if (m[4]) parts.push(<strong key={key++} className="font-semibold text-heading">{m[5]}</strong>);
    else if (m[6]) parts.push(<em key={key++}>{m[7]}</em>);
    else if (m[8]) parts.push(<code key={key++} className="rounded bg-[var(--tile-deep)] px-1.5 py-0.5 font-mono text-[0.9em] text-heading">{m[9]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const headingClass: Record<number, string> = {
  1: "mt-14 mb-5 text-[clamp(1.75rem,1.3rem+1.4vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] text-heading",
  2: "mt-14 mb-4 text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] font-semibold leading-tight tracking-[-0.02em] text-heading",
  3: "mt-10 mb-3 text-[1.3125rem] font-semibold leading-snug tracking-[-0.01em] text-heading",
  4: "mt-8 mb-2 text-[1.125rem] font-semibold text-heading",
  5: "mt-6 mb-2 text-[1rem] font-semibold text-heading",
  6: "mt-6 mb-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-heading",
};

export function renderMarkdown(source: string): ReactNode {
  if (!source?.trim()) return null;
  const blocks: ReactNode[] = [];
  const lines = source.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const img = line.trim().match(IMAGE_LINE);
    if (img) {
      const [, alt, src, caption] = img;
      if (isAllowedImage(src)) {
        blocks.push(
          <figure key={key++} className="my-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[var(--tile-deep)]">
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            </div>
            {caption && <figcaption className="mt-3 text-[0.875rem] text-muted">{caption}</figcaption>}
          </figure>,
        );
      }
      i++;
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      // The page title is the only h1, so a stray "# " in the body is rendered as h2.
      const level = Math.max(2, h[1].length);
      blocks.push(createElement(`h${level}`, { key: key++, className: headingClass[h[1].length] }, inline(h[2])));
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(<li key={items.length} className="mb-2 pl-1">{inline(lines[i].replace(/^[-*]\s+/, ""))}</li>); i++; }
      blocks.push(<ul key={key++} className="my-5 list-disc pl-6 marker:text-[var(--accent)]">{items}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(<li key={items.length} className="mb-2 pl-1">{inline(lines[i].replace(/^\d+\.\s+/, ""))}</li>); i++; }
      blocks.push(<ol key={key++} className="my-5 list-decimal pl-6 marker:font-semibold marker:text-[var(--accent)]">{items}</ol>);
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) { quote.push(lines[i].replace(/^>\s?/, "")); i++; }
      blocks.push(<blockquote key={key++} className="my-8 border-l-[3px] border-[var(--accent)] pl-5 text-[1.125rem] italic text-heading">{inline(quote.join(" "))}</blockquote>);
      continue;
    }

    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^[#>\-*]|^\d+\.|^!\[/.test(lines[i])) { paragraph.push(lines[i]); i++; }
    blocks.push(<p key={key++} className="mb-5">{inline(paragraph.join(" "))}</p>);
  }

  return <>{blocks}</>;
}

/** Plain text of an inline markdown string (for JSON-LD). */
function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

/**
 * Questions and answers from the article's FAQ section: a "## Ofte stillede spørgsmål" heading followed by one
 * "### question" per item. Used for FAQPage JSON-LD, so the writers never have to write structured data by hand.
 */
export function extractFaq(source: string): { q: string; a: string }[] {
  const lines = (source ?? "").split("\n");
  const start = lines.findIndex((l) => /^##\s+.*(ofte stillede spørgsmål|faq)/i.test(l));
  if (start === -1) return [];
  const items: { q: string; a: string }[] = [];
  let q: string | null = null;
  let a: string[] = [];
  const flush = () => { if (q && a.length) items.push({ q, a: plain(a.join(" ")) }); };
  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line)) break;
    const h = line.match(/^###\s+(.*)/);
    if (h) { flush(); q = plain(h[1]); a = []; }
    else if (q && line.trim()) a.push(line.replace(/^[-*]\s+|^\d+\.\s+|^>\s?/, "").trim());
  }
  flush();
  return items;
}
