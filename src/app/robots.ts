import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// AI crawlers are allowed on purpose (PLAN.md). The internal style guide is not indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/design-system"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
