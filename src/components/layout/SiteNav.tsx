"use client";

import { usePathname } from "next/navigation";
import { NightNav } from "@/components/night/NightNav";
import { BlogNav } from "@/components/layout/BlogNav";

export function SiteNav() {
  const pathname = usePathname();
  // The home hero carries its own nav inside the warm stage.
  if (pathname === "/" || pathname === "/venteliste" || pathname.startsWith("/preview")) return null;
  // Marco 2026-11-25: the blog gets the front page's header and navigation.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return <BlogNav />;
  // Every page uses the Mindforward nav; MegaNav still describes the template product (Marco 2026-10-30).
  return <NightNav />;
}
