"use client";

import { usePathname } from "next/navigation";

// The waitlist home page has its own small footer (Marco 2026-11-19), so the site footer is hidden there.
export function FooterGate({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? null : <>{children}</>;
}
