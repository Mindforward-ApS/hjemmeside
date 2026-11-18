"use client";

// "Sådan kommer I i gang" as four even cards on white (Marco 2026-11-10): centred heading and text, four cards
// with a small product visual on a soft tint at the top and the step below, one button under the row.
// Sand background so it reads as its own section after the white video section (Marco: "Du glemte sektion skift").
// Copy is the approved copy from StartCalendly; the numbers in the visuals are example data.
import Link from "next/link";
import { appLinks } from "@/lib/app";

const c = { ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", dark: "#201613", sand: "#efe7e1" };

function Rings({ children, tint }: { children: React.ReactNode; tint: string }) {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden rounded-[14px]" style={{ background: tint }}>
      <span aria-hidden className="absolute size-[15rem] rounded-full border border-white/70" />
      <span aria-hidden className="absolute size-[10.5rem] rounded-full bg-white/35" />
      <span aria-hidden className="absolute size-[6.5rem] rounded-full bg-white/55" />
      {children}
    </div>
  );
}

function Orbit({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`absolute grid size-8 place-items-center rounded-full bg-white text-[0.6875rem] font-semibold shadow-[0_6px_16px_-6px_rgba(32,22,19,0.35)] ${className}`} style={{ color: c.ink }}>{children}</span>;
}

const VisInviter = (
  <Rings tint="radial-gradient(circle at 50% 55%, #fbe1d7 0%, #fdf1ec 70%)">
    <span className="relative grid size-14 place-items-center rounded-full text-white shadow-[0_10px_24px_-8px_rgba(232,102,74,0.8)]" style={{ background: c.coral }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    </span>
    <Orbit className="left-[22%] top-[22%]">MK</Orbit>
    <Orbit className="right-[20%] top-[14%]">JB</Orbit>
    <Orbit className="right-[17%] top-[58%]">SL</Orbit>
    <Orbit className="left-[16%] top-[62%]">+9</Orbit>
  </Rings>
);

// Thin bars in a wave, like a learning-time chart.
const wave = Array.from({ length: 34 }, (_, i) => Math.round(46 + 22 * Math.sin(i / 3.2) + 12 * Math.sin(i / 1.7 + 1)));
const VisLaer = (
  <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] px-4 pt-3.5" style={{ background: "linear-gradient(180deg,#fdf6f2 0%,#fbe1d7 100%)" }}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[0.75rem]" style={{ color: c.muted }}>Læringstid</p>
        <p className="text-[1.25rem] font-semibold tabular-nums" style={{ color: c.ink }}>3 t 11 m</p>
      </div>
      <span className="text-[0.6875rem] font-semibold" style={{ color: "#2f8f5f" }}>↗ +18 %</span>
    </div>
    <div className="mt-auto flex h-[62%] items-end gap-[3px]">
      {wave.map((h, i) => <span key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: "linear-gradient(180deg,#e8664a 0%,rgba(232,102,74,0.25) 100%)" }} />)}
    </div>
  </div>
);

const VisOev = (
  <Rings tint="radial-gradient(circle at 50% 55%, #f6dccf 0%, #faf1ea 75%)">
    <span className="relative grid size-[4.5rem] place-items-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(32,22,19,0.4)]">
      <span className="text-center leading-none"><span className="block text-[1.375rem] font-semibold tabular-nums" style={{ color: c.ink }}>86</span><span className="text-[0.625rem]" style={{ color: c.muted }}>/ 100</span></span>
    </span>
    <span className="absolute left-[14%] top-[24%] rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-medium shadow-sm" style={{ color: c.muted }}>Mail</span>
    <span className="absolute right-[13%] top-[30%] rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-medium shadow-sm" style={{ color: c.muted }}>Excel</span>
    <span className="absolute bottom-[16%] right-[24%] rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-medium shadow-sm" style={{ color: c.muted }}>Tilbud</span>
  </Rings>
);

const bars = [38, 72, 46, 48, 66, 52, 86];
const VisFoelg = (
  <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] px-4 pt-3.5" style={{ background: "linear-gradient(180deg,#faf6f3 0%,#efe7e1 100%)" }}>
    <span className="self-end text-[0.6875rem] font-semibold" style={{ color: "#2f8f5f" }}>↗ +12 %</span>
    <div className="relative mt-auto flex h-[74%] items-end justify-between gap-3 px-1">
      {bars.map((h, i) => (
        <span key={i} className="relative flex-1 rounded-t-[4px]" style={{ height: `${h}%`, background: i === 4 ? "linear-gradient(180deg,#e8664a,#f6c9b6)" : "linear-gradient(180deg,#8a6a5e,#d9c3b6)" }}>
          {i === 4 && <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.625rem] font-semibold text-white" style={{ background: c.coral }}>9 af 12</span>}
        </span>
      ))}
    </div>
  </div>
);

const steps = [
  { t: "Inviter", d: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget.", vis: VisInviter },
  { t: "Lær", d: "Ti minutter om dagen på dansk, i det værktøj I bruger.", vis: VisLaer },
  { t: "Øv", d: "Hver lektion slutter med en opgave fra jeres egen hverdag.", vis: VisOev },
  { t: "Følg op", d: "Du ser holdets fremskridt, og alle får et kursusbevis.", vis: VisFoelg },
];

export function StartKort() {
  return (
    <section className="py-16 sm:py-24" style={{ background: c.sand }}>
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className="text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: c.ink }}>Fra invitation til første score på en uge</h2>
          <p className="mx-auto mt-3 max-w-[36rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>
            AI-træning plejer at drukne i hverdagen. Mindforward deler den op i fire små trin, så hele holdet kommer i gang uden kursusdage og uden at nogen skal installere noget.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {steps.map((s) => (
            <li key={s.t} data-reveal className="rounded-[18px] bg-white p-2 shadow-[0_12px_40px_-18px_rgba(32,22,19,0.28)] ring-1 ring-black/[0.05]">
              <div className="h-[11.5rem]">{s.vis}</div>
              <div className="px-3 pb-4 pt-4">
                <h3 className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>{s.t}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href={appLinks.startBusiness} className="nf-focus nf-press group inline-flex h-11 items-center gap-3 rounded-full py-1 pl-5 pr-1 text-[0.9375rem] font-medium text-white" style={{ background: c.dark }}>
            Start et kursus
            <span className="grid size-9 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: c.ink }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
