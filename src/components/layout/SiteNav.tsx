"use client";

import { usePathname } from "next/navigation";
import { MegaNav } from "@/components/nav/MegaNav";
import { NightNav } from "@/components/night/NightNav";

// Pages converted to the "night" design (light theme) use NightNav; the rest keep menu B until converted.
const nightPages = ["/", "/priser", "/platform"];
const isNight = (p: string) => nightPages.includes(p) || p.startsWith("/loesninger/") || p.startsWith("/kurser/");
export function SiteNav() {
  const pathname = usePathname();
  // The home hero carries its own nav inside the warm stage.
  if (pathname === "/" || pathname.startsWith("/preview")) return null;
  return isNight(pathname) ? <NightNav /> : <MegaNav variant="docebo" />;
}
