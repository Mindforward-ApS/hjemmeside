"use client";

import { usePathname } from "next/navigation";
import { NightNav } from "@/components/night/NightNav";

export function SiteNav() {
  const pathname = usePathname();
  // The home hero carries its own nav inside the warm stage.
  if (pathname === "/" || pathname === "/venteliste" || pathname.startsWith("/preview")) return null;
  // Every page uses the Mindforward nav; MegaNav still describes the template product (Marco 2026-10-30).
  return <NightNav />;
}
