"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteMode } from "@/lib/siteMode";

// Announcement bar above the header (Marco 2026-11-23, after his Black Friday reference): offer on the left,
// a live countdown to launch (1 January 2027, same moment as the waitlist) and a button.
// Privat: the first 100 customers get 50 % off the first year. Erhverv: the first 20 companies.
const LAUNCH = new Date("2027-01-01T09:00:00+01:00").getTime();
const KEY = "mf-launchbar-closed";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export function LaunchBar({ mode }: { mode: SiteMode }) {
  const [now, setNow] = useState<number | null>(null);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem(KEY) === "1") setClosed(true); } catch {}
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (closed || (now !== null && now >= LAUNCH)) return null;
  const privat = mode === "privat";
  const [d, h, m, s] = now === null ? [null, null, null, null] : parts(LAUNCH - now);
  const close = () => { setClosed(true); try { localStorage.setItem(KEY, "1"); } catch {} };
  const tiles: [number | null, string][] = [[d, "Dage"], [h, "Timer"], [m, "Min"], [s, "Sek"]];
  return (
    <div role="region" aria-label="Lanceringstilbud" className="relative z-30 text-white" style={{ background: "#0a0a0b" }}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-2 py-2.5 pl-4 pr-11 lg:px-12 lg:py-3.5">
        <p className="w-full text-center text-[0.8125rem] lg:w-auto lg:text-[0.9375rem]">
          De første {privat ? "100 kunder" : "20 virksomheder"} får <span className="text-[0.9375rem] font-bold lg:text-[1.125rem]" style={{ color: "#fb970a" }}>50 % rabat</span> det første år.
        </p>
        <div className="flex items-center gap-2 lg:contents">
        <div className="flex items-center gap-1 lg:gap-2" aria-label="Tid til lancering">
          {tiles.map(([v, l]) => (
            <div key={l} className="grid w-[40px] place-items-center rounded-[8px] border py-1 lg:w-[58px] lg:rounded-[10px] lg:py-2" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
              <span className="text-[0.875rem] font-semibold tabular-nums leading-none lg:text-[1.25rem]" suppressHydrationWarning>{v === null ? "--" : String(v).padStart(2, "0")}</span>
              <span className="mt-0.5 text-[0.625rem] text-white/55 lg:mt-1 lg:text-[0.75rem]">{l}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/venteliste" className="nf-focus inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[0.8125rem] lg:gap-2 lg:px-5 lg:text-[0.875rem] font-semibold text-white transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #fb970a, #f8400a)" }}>
            Sikr din plads
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <span className="hidden whitespace-nowrap text-[0.8125rem] text-white/55 sm:inline">Kun {privat ? "100" : "20"} pladser</span>
        </div>
        </div>
      </div>
      <button type="button" onClick={close} aria-label="Luk tilbuddet" className="nf-focus absolute right-2 top-2 grid size-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white lg:right-5 lg:top-1/2 lg:-translate-y-1/2">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}
