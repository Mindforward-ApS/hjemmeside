import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// AI crawlers are allowed on purpose (PLAN.md). The internal style guide, previews and API routes are not indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/design-system", "/preview", "/api"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
