// Fictional demo wordmarks (no real customers yet). Monochrome, currentColor, so every variant can tint them.
import type { ReactNode } from "react";

type Logo = { name: string; mark: ReactNode; text: ReactNode };

const s = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;

export const demoLogos: Logo[] = [
  {
    name: "Nordhavn Logistik",
    mark: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 17l9-12 9 12z" fill="currentColor" /></svg>,
    text: <span className="font-bold tracking-[-0.03em]">nordhavn</span>,
  },
  {
    name: "Kvist & Co",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="8" {...s} /><path d="M12 4v16" {...s} /></svg>,
    text: <span className="font-medium tracking-[0.02em]">Kvist &amp; Co</span>,
  },
  {
    name: "Bølge",
    mark: <svg viewBox="0 0 28 24" width="26" height="22"><path d="M2 14c4-6 8-6 12 0s8 6 12 0" {...s} strokeWidth={2.6} strokeLinecap="round" /></svg>,
    text: <span className="font-semibold tracking-[-0.02em]">Bølge</span>,
  },
  {
    name: "Havnø Energi",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" /><path d="M13 7l-4 6h4l-2 4" stroke="var(--bg)" strokeWidth="1.8" fill="none" strokeLinejoin="round" /></svg>,
    text: <span className="font-semibold uppercase tracking-[0.12em] text-[0.82em]">Havnø</span>,
  },
  {
    name: "Lund Arkitekter",
    mark: null,
    text: <span className="font-serif text-[1.3em] italic tracking-[-0.01em]">Lund Arkitekter</span>,
  },
  {
    name: "Tårnby Revision",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 20V9l6-5 6 5v11" {...s} /><path d="M10 20v-5h4v5" {...s} /></svg>,
    text: <span className="font-medium tracking-[-0.01em]">Tårnby Revision</span>,
  },
  {
    name: "Mølle",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 12L12 3M12 12l9 0M12 12l0 9M12 12l-9 0" {...s} strokeWidth={3} strokeLinecap="round" /></svg>,
    text: <span className="font-extrabold tracking-[-0.04em]">mølle</span>,
  },
  {
    name: "Fyrtårn",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="9" fill="currentColor" /><circle cx="12" cy="12" r="3.5" fill="var(--bg)" /></svg>,
    text: <span className="font-semibold tracking-[-0.02em]">Fyrtårn</span>,
  },
];

// Marco's own brands, OK'd for the hero carousel (2026-11-07). Leadline = its bold wordmark, Hværk = the H mark in a
// rounded square + word (from ~/Downloads/sjak), Over = a temporary wordmark with a cross until the real logo file exists.
export const ownLogos: Logo[] = [
  {
    name: "Leadline",
    mark: null,
    text: <span className="font-sans font-bold tracking-[-0.03em]">Leadline</span>,
  },
  {
    name: "Hværk",
    mark: <svg viewBox="0 0 24 24" width="22" height="22"><rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" /><path d="M8 6.5v11M16 6.5v11M8 12h8" stroke="var(--bg)" strokeWidth="2.6" strokeLinecap="round" fill="none" /></svg>,
    text: <span className="font-sans font-bold tracking-[-0.03em]">Hværk</span>,
  },
  {
    name: "Over",
    mark: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 5l14 14M19 5L5 19" {...s} strokeWidth={3} strokeLinecap="round" /></svg>,
    text: <span className="font-sans font-extrabold uppercase tracking-[0.06em]">Over</span>,
  },
];

export function DemoLogo({ logo, className = "" }: { logo: Logo; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap font-display text-[1.0625rem] leading-none sm:text-[1.25rem] ${className}`} aria-label={logo.name} role="img">
      {logo.mark && <span className="flex shrink-0">{logo.mark}</span>}
      {logo.text}
    </span>
  );
}
