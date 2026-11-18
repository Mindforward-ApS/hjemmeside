"use client";

// Erhverv / Privat chosen in the top bar, shared with the rest of the page (pricing follows it). Marco 2026-11-11.
import { useSyncExternalStore } from "react";

export type SiteMode = "virksomhed" | "privat";
let mode: SiteMode = "virksomhed";
const subs = new Set<() => void>();

export function setSiteMode(m: SiteMode) {
  mode = m;
  subs.forEach((f) => f());
}
export function useSiteMode() {
  return useSyncExternalStore(
    (cb) => { subs.add(cb); return () => subs.delete(cb); },
    () => mode,
    () => "virksomhed" as SiteMode,
  );
}
