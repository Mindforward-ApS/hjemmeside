import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies, posts, useCases } from "@/content/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/platform", "/priser", "/kunder", "/blog", "/om-os", "/kontakt", "/sikkerhed", "/privatliv", "/vilkaar"];
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r}` })),
    ...useCases.map((u) => ({ url: `${site.url}/loesninger/${u.slug}` })),
    ...caseStudies.map((c) => ({ url: `${site.url}/kunder/${c.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
