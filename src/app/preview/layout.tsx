import { notFound } from "next/navigation";
import type { ReactNode } from "react";

// Internal design previews: never part of mindforward.dk (Marco 2026-10-30).
export default function PreviewLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production" && process.env.VIS_PREVIEW !== "1") notFound();
  return children;
}
