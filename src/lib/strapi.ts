// Strapi v5 client for the blog. Same content model and API as the AIK site (collection `blog-posts`), so the
// publishing agents work the same way: POST to Strapi and the article is live without a build or a deploy.
//
// Set STRAPI_API_URL and STRAPI_API_TOKEN (read-only token is enough) on the hosting. Without them the blog is empty.
import { cacheLife, cacheTag } from "next/cache";

const STRAPI_URL = (process.env.STRAPI_API_URL ?? "").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

/** Strapi's own upper limit for `pagination[pageSize]`. Higher numbers are silently lowered. */
const MAX_PAGE_SIZE = 100;

export type StrapiImage = { id: number; url: string; alternativeText?: string | null; width?: number; height?: number };

export type BlogPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  featuredImage?: StrapiImage | null;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  readingTime?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Page<T> = { data: T; meta?: { pagination?: { page: number; pageCount: number } } };

async function strapiFetch<T>(endpoint: string): Promise<Page<T>> {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}) },
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} (${endpoint})`);
  return (await res.json()) as Page<T>;
}

/** Absolute URL for Strapi media (Strapi returns relative paths for local uploads). */
export function strapiImageUrl(image: StrapiImage | null | undefined): string | null {
  if (!image?.url) return null;
  return image.url.startsWith("http") ? image.url : `${STRAPI_URL}${image.url}`;
}

/**
 * All published posts, newest first. Strapi returns 25 per page by default and at most 100, so the pages are walked:
 * a missing post is an article neither Google nor a reader can find.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blog");
  if (!STRAPI_URL) return [];

  const all: BlogPost[] = [];
  for (let page = 1; ; page += 1) {
    const query = new URLSearchParams({ populate: "*", "sort[0]": "publishedAt:desc", "pagination[page]": String(page), "pagination[pageSize]": String(MAX_PAGE_SIZE) });
    const { data, meta } = await strapiFetch<BlogPost[]>(`blog-posts?${query.toString()}`);
    all.push(...data);
    if (data.length === 0 || page >= (meta?.pagination?.pageCount ?? 1)) break;
  }
  return all;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blog", `blog-${slug}`);
  if (!STRAPI_URL) return null;

  const query = new URLSearchParams({ populate: "*", "filters[slug][$eq]": slug });
  const { data } = await strapiFetch<BlogPost[]>(`blog-posts?${query.toString()}`);
  return data[0] ?? null;
}
