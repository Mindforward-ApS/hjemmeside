import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { site } from "@/content/site";
import { landingPages } from "@/content/landingssider";
import { getBlogPosts } from "@/lib/strapi";

// Only pages with their own content. The template pages that redirect to the front page (next.config.ts) are left
// out on purpose: a sitemap that lists redirects tells Google the site is mostly duplicates.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  ...landingPages.map((p) => ({ path: `/${p.slug}`, priority: 0.9 })),
  { path: "/priser", priority: 0.8 },
  { path: "/kontakt", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The sitemap must update itself when an article is published in Strapi, without a deploy. Waiting for the request
  // keeps it out of the build output; the Strapi calls have their own short cache in src/lib/strapi.ts.
  await connection();

  // A sitemap without articles is better than a 500 for the crawler.
  const posts = await getBlogPosts().catch(() => []);

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: `${site.url}${path}`, changeFrequency: "weekly" as const, priority })),
    ...(posts.length > 0 ? [{ url: `${site.url}/blog`, changeFrequency: "daily" as const, priority: 0.8 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt || p.publishedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
