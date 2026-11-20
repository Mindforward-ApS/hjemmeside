import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { landingPages } from "@/content/landingssider";
import { posts } from "@/lib/blog";

// Only pages that are live and answer 200 (Marco 2026-11-19). The template pages that redirect to the front page
// (next.config.ts) stay out: a sitemap that lists redirects tells Google the site is mostly duplicates.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  ...landingPages.map((p) => ({ path: `/${p.slug}`, priority: 0.9, changeFrequency: "weekly" as const })),
  { path: "/priser", priority: 0.7, changeFrequency: "weekly" },
  { path: "/venteliste", priority: 0.6, changeFrequency: "daily" },
  { path: "/kontakt", priority: 0.5, changeFrequency: "monthly" },
];

// Built with the site: a post is a file in the repo, so a new post always comes with a new build. No "now" timestamps
// on purpose: reading the clock would turn this into a per-request route that has to find the post files at runtime.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({ url: `${site.url}${path}`, changeFrequency, priority })),
    ...(posts.length > 0 ? [{ url: `${site.url}/blog`, changeFrequency: "daily" as const, priority: 0.8 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
