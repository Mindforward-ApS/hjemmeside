"use client";

// "Holdets score" card, three proposals (Marco 2026-11-02, one card at a time). Each after one Dribbble reference
// (design/references/score-kort/), in the same white style as the chosen Holdet card (A · Rangliste). Example data.
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { KortRangliste } from "@/components/lab/HoldetKort";

const c = { ink: "#201613", muted: "#6e625d", line: "#efe8e3", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6", brown: "#8a4e3b" };
const card = "w-full max-w-[30rem] rounded-[24px] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]";

/* A · Måler (after Diana Larussa "Sleep Score") */
export function ScoreMaaler() {
  const score = 86, ticks = 44, sweep = 260, start = -130;
  const rows = [{ l: "Klar opgave", v: 94 }, { l: "Kontekst", v: 78 }, { l: "Format", v: 88 }, { l: "Tjek af svaret", v: 81 }];
  return (
    <div className={card}>
      <div className="flex items-center justify-between">
        <p className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>Holdets score</p>
        <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: "#b8432a" }}>▲ +12 denne måned</span>
      </div>
      <div className="relative mx-auto mt-4 aspect-square w-[15rem]">
        <svg viewBox="-100 -100 200 200" className="size-full" aria-hidden>
          {Array.from({ length: ticks }, (_, i) => {
            const a = ((start + (sweep / (ticks - 1)) * i) * Math.PI) / 180;
            const on = i / (ticks - 1) <= score / 100;
            return <line key={i} x1={Math.sin(a) * 70} y1={-Math.cos(a) * 70} x2={Math.sin(a) * 88} y2={-Math.cos(a) * 88} stroke={on ? (i / (ticks - 1) > 0.7 ? c.coral : c.ink) : c.line} strokeWidth="4.2" strokeLinecap="round" />;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div><p className="text-[4rem] font-semibold leading-none tracking-[-0.04em] tabular-nums" style={{ color: c.ink }}>{score}</p><p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>ud af 100</p></div>
        </div>
      </div>
      <p className="mx-auto mt-1 max-w-[19rem] text-center text-[0.875rem]" style={{ color: c.muted }}>Holdet skriver <b style={{ color: c.ink }}>klarere prompts</b> end sidste måned.</p>
      <ul className="mt-6 grid gap-3 border-t pt-5" style={{ borderColor: c.line }}>
        {rows.map((r) => (
          <li key={r.l} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-[0.8125rem]">
            <span style={{ color: c.muted }}>{r.l}</span>
            <span className="h-1.5 overflow-hidden rounded-full" style={{ background: c.line }}><span className="block h-full rounded-full" style={{ width: `${r.v}%`, background: c.ink }} /></span>
            <span className="text-right font-semibold tabular-nums" style={{ color: c.ink }}>{r.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* B · Søjler (after Kelviq "Lifetime paid") */
export function ScoreSoejler() {
  const weeks = [52, 58, 61, 63, 68, 71, 74, 77, 79, 83, 84, 86];
  return (
    <div className={card}>
      <p className="text-[0.9375rem]" style={{ color: c.muted }}>Holdets score</p>
      <p className="mt-2 text-[3.5rem] font-semibold leading-none tracking-[-0.04em] tabular-nums" style={{ color: c.ink }}>86<span className="ml-1 text-[1.125rem] font-medium tracking-normal" style={{ color: c.muted }}>/ 100</span></p>
      <p className="mt-2 text-[0.9375rem]" style={{ color: c.muted }}>Siden start 1. september</p>
      <div className="mt-8 flex h-24 items-end gap-1.5">
        {weeks.map((v, i) => {
          const h = ((v - 40) / 60) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col justify-end gap-1" style={{ height: `${h}%` }}>
              <span className="rounded-[4px]" style={{ flex: 5, background: i === weeks.length - 1 ? c.coral : c.ink }} />
              <span className="rounded-[4px]" style={{ flex: 3, background: i === weeks.length - 1 ? c.peach : "#cbbab1" }} />
              <span className="rounded-[4px]" style={{ flex: 2, background: c.line }} />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[0.6875rem]" style={{ color: c.muted }}><span>Uge 36</span><span>Nu</span></div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-[0.8125rem]" style={{ borderColor: c.line, color: c.muted }}>
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-[3px]" style={{ background: c.ink }} />Opgaver</span>
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-[3px]" style={{ background: "#cbbab1" }} />Quiz</span>
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-[3px]" style={{ background: c.line }} />Feedback</span>
      </div>
    </div>
  );
}

/* C · Kurve (after Sasha Balandina "1,834 views"). Marco 2026-11-02: chosen, brown, and it switches by itself
   between Uge, Måned and År. Example data. */
const periods = [
  { id: "Uge", pts: [80, 81, 81, 83, 84, 85, 86], labels: ["Man", "Ons", "Fre", "Søn"], delta: 6 },
  { id: "Måned", pts: [48, 52, 55, 61, 60, 66, 70, 74, 73, 79, 83, 86], labels: ["Sep", "Okt", "Nov"], delta: 38 },
  { id: "År", pts: [30, 34, 33, 39, 44, 48, 55, 61, 66, 74, 80, 86], labels: ["Jan", "Apr", "Jul", "Okt"], delta: 56 },
];
const N = 12;
function resample(src: number[]) {
  return Array.from({ length: N }, (_, i) => {
    const t = (i / (N - 1)) * (src.length - 1), k = Math.floor(t), f = t - k;
    return src[k] + ((src[Math.min(k + 1, src.length - 1)] ?? src[k]) - src[k]) * f;
  });
}

export function ScoreKurve({ fill = false, privat = false }: { fill?: boolean; privat?: boolean }) {
  const [pi, setPi] = useState(1);
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => { if (document.visibilityState === "visible") setPi((x) => (x + 1) % periods.length); }, 3200);
    return () => clearInterval(id);
  }, [reduce]);
  const per = periods[pi];
  const pts = resample(per.pts);
  const lo = Math.min(...per.pts) - 6, hi = 100;
  const W = 300, H = 110, xy = pts.map((v, k) => [k * (W / (N - 1)), H - ((v - lo) / (hi - lo)) * H] as const);
  const path = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = xy[N - 1];
  const tr = { transition: "d 700ms cubic-bezier(0.16,1,0.3,1)" } as const;
  return (
    <div className={`@container w-full max-w-[30rem] rounded-[24px] p-5 text-white ${fill ? "flex h-full flex-col" : ""} shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 @[24rem]:p-7`} style={{ background: "linear-gradient(155deg, #8a4e3b 0%, #6b3a2c 45%, #4a281f 100%)" }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="flex items-baseline gap-2 text-[2.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums @[24rem]:text-[2.75rem]">86 <span key={per.id} className="nf-fade rounded-full px-2 py-0.5 text-[0.75rem] font-semibold tracking-normal" style={{ background: "rgba(255,255,255,0.14)", color: c.peach }}>▲ {per.delta}</span></p>
          <p className="mt-2 text-[0.875rem] text-white/70">{privat ? "Din score" : "Holdets score"}</p>
        </div>
        <div className="relative flex rounded-full bg-black/15 p-1 text-[0.75rem]" role="tablist" aria-label="Periode">
          <span aria-hidden className="absolute inset-y-1 rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ left: 4, width: "calc((100% - 8px) / 3)", transform: `translateX(${pi * 100}%)` }} />
          {periods.map((p, i) => <button key={p.id} type="button" role="tab" aria-selected={i === pi} onClick={() => setPi(i)} className={`relative w-[2.9rem] rounded-full py-1 text-center transition-colors @[24rem]:w-[3.6rem] ${i === pi ? "text-white" : "text-white/60"}`}>{p.id}</button>)}
        </div>
      </div>
      <div className={`relative ${fill ? "mt-auto pt-4" : "mt-6"}`}>
        <svg viewBox={`0 -14 ${W} ${H + 24}`} className={`w-full overflow-visible ${fill ? "h-36" : "h-32 @[24rem]:h-40"}`} preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="kv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f6c9b6" stopOpacity="0.4" /><stop offset="1" stopColor="#f6c9b6" stopOpacity="0" /></linearGradient></defs>
          {[0, 0.5, 1].map((g) => <line key={g} x1="0" x2={W} y1={g * H} y2={g * H} stroke="rgba(255,255,255,0.1)" vectorEffect="non-scaling-stroke" />)}
          <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#kv)" style={tr} />
          <path d={path} fill="none" stroke={c.peach} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={tr} />
          <line x1={lx} x2={lx} y1={ly} y2={H} stroke="rgba(255,255,255,0.4)" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute right-0 translate-x-[10%] -translate-y-full rounded-[10px] bg-white px-2.5 py-1.5 text-center text-[0.75rem] font-semibold leading-tight shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-[top] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ color: c.ink, top: `calc(${((ly + 14) / (H + 24)) * 100}% - 8px)` }}>86<br /><span className="font-normal" style={{ color: c.muted }}>i dag</span></span>
      </div>
      <div key={per.id} className="nf-fade mt-3 flex justify-between text-[0.6875rem] text-white/55">{per.labels.map((l) => <span key={l}>{l}</span>)}</div>
      <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[0.8125rem]">
        <span className="text-white/70">{privat ? "Dit forløb · 9 moduler" : "12 personer på holdet"}</span>
        <span className="flex items-center gap-1.5 font-medium">Se rapport <Icon name="arrowRight" size={13} /></span>
      </div>
      <style>{`@keyframes nfFade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}.nf-fade{animation:nfFade 420ms cubic-bezier(0.16,1,0.3,1)}@media (prefers-reduced-motion:reduce){.nf-fade{animation:none}}`}</style>
    </div>
  );
}

export function ScoreKortPreview() {
  const items: { id: string; title: string; ref: string; node: ReactNode }[] = [
    { id: "a", title: "A · Måler", ref: "Efter Diana Larussa · Sleep Score", node: <ScoreMaaler /> },
    { id: "b", title: "B · Søjler", ref: "Efter Kelviq · Lifetime paid", node: <ScoreSoejler /> },
    { id: "c", title: "C · Kurve", ref: "Efter Sasha Balandina · Views", node: <ScoreKurve /> },
  ];
  return (
    <div className="min-h-[100svh] px-5 py-14 sm:px-10" style={{ background: "radial-gradient(70% 60% at 50% 0%, #3a2722 0%, #201613 70%)" }}>
      <div className="mx-auto max-w-[1500px]">
        <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-white">Holdets score · 3 forslag</h1>
        <p className="mt-2 text-white/60">Kort nr. 2. Vælg det, du synes er flottest. Alt er eksempeldata.</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {items.map((it) => (
            <section key={it.id} className="grid content-start justify-items-center gap-5">
              <div className="text-center"><p className="text-[1.125rem] font-semibold text-white">{it.title}</p><p className="text-[0.8125rem] text-white/50">{it.ref}</p></div>
              {it.node}
            </section>
          ))}
        </div>
        <div className="mt-20 grid justify-items-center gap-5 border-t border-white/10 pt-12">
          <p className="text-[1.125rem] font-semibold text-white">Valgt Holdet-kort (A · Rangliste) til sammenligning</p>
          <KortRangliste />
        </div>
      </div>
    </div>
  );
}
