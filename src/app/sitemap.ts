import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Only pages that are live and answer 200 (Marco 2026-11-19): the template pages redirect and stay out until launch.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/priser`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/venteliste`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${site.url}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
