import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { landingPages } from "@/content/landingssider";
import { posts } from "@/lib/blog";

// Only pages with their own content. The template pages that redirect to the front page (next.config.ts) are left
// out on purpose: a sitemap that lists redirects tells Google the site is mostly duplicates.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  ...landingPages.map((p) => ({ path: `/${p.slug}`, priority: 0.9 })),
  { path: "/priser", priority: 0.8 },
  { path: "/kontakt", priority: 0.6 },
];

// Built with the site: a post is a file in the repo, so a new post always comes with a new build.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: `${site.url}${path}`, changeFrequency: "weekly" as const, priority })),
    ...(posts.length > 0 ? [{ url: `${site.url}/blog`, changeFrequency: "daily" as const, priority: 0.8 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
