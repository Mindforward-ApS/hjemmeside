"use client";

// Round 3 of "Øv på dine egne opgaver" (Marco 2026-11-03: "3 versioner af alle sektioner … flotte kort med grafer").
// All three keep Marco's laptop video (public/video/oevemiljoe.mp4). Heading and paragraph unchanged. Example data.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", sand: "#efe7e1", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#efe8e3" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Øv på dine egne opgaver";
const PARA = "Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.";
const tools = [{ n: "ChatGPT", s: "/logos/chatgpt.png" }, { n: "Copilot", s: "/logos/copilot.png" }, { n: "Claude", s: "/logos/claude.png" }];
const BROWN = "linear-gradient(155deg, #8a4e3b 0%, #6b3a2c 45%, #4a281f 100%)";

/* The laptop video: muted loop, plays only in view, pause button, poster under reduced motion. */
function Video({ className = "", onTime, btn = "bottom-4 right-4" }: { className?: string; onTime?: (t: number) => void; btn?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v); return () => io.disconnect();
  }, []);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); } else { v.dataset.userPaused = "1"; v.pause(); }
  };
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video ref={ref} className="block aspect-video w-full object-cover" src="/video/oevemiljoe.mp4" poster="/video/oevemiljoe-poster.webp" muted loop playsInline preload="metadata"
        onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onTimeUpdate={onTime ? (e) => onTime(e.currentTarget.currentTime) : undefined}
        aria-label="En medarbejder skriver en prompt i øvemiljøet og får scoren 86 ud af 100 med feedback" />
      <button type="button" onClick={toggle} aria-label={paused ? "Afspil video" : "Sæt video på pause"}
        className={`nf-focus absolute ${btn} grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65`}>
        {paused
          ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
          : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
      </button>
    </div>
  );
}

/* Score over five attempts at the same task: a small line chart on a white card. */
const tries = [48, 61, 70, 79, 86];
function ForsoegKort({ className = "" }: { className?: string }) {
  const W = 300, H = 96, lo = 40, hi = 100;
  const xy = tries.map((v, k) => [12 + k * ((W - 24) / (tries.length - 1)), 8 + (H - 16) * (1 - (v - lo) / (hi - lo))] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${xy[xy.length - 1][0]},${H} L${xy[0][0]},${H} Z`;
  return (
    <div className={`rounded-[24px] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(32,22,19,0.45)] ring-1 ring-black/[0.04] ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Opgave 3 · Svar til kunde</p>
          <p className="mt-0.5 text-[0.8125rem]" style={{ color: c.muted }}>Din score pr. forsøg</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold tabular-nums" style={{ background: c.coralSoft, color: "#b5452c" }}>▲ 38</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="mt-4 w-full" aria-label="Score steg fra 48 til 86 over fem forsøg">
        <defs><linearGradient id="v3o-a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={c.coral} stopOpacity="0.22" /><stop offset="1" stopColor={c.coral} stopOpacity="0" /></linearGradient></defs>
        {[60, 80].map((g) => { const y = 8 + (H - 16) * (1 - (g - lo) / (hi - lo)); return <line key={g} x1="0" x2={W} y1={y} y2={y} stroke={c.line} strokeDasharray="3 4" />; })}
        <path d={area} fill="url(#v3o-a)" />
        <path d={line} fill="none" stroke={c.coral} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {xy.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === xy.length - 1 ? 5 : 3} fill={i === xy.length - 1 ? c.coral : "#fff"} stroke={c.coral} strokeWidth="2" />)}
        {xy.map(([x], i) => <text key={i} x={x} y={H + 15} textAnchor="middle" fontSize="10" fill={c.muted}>{i + 1}.</text>)}
      </svg>
      <div className="mt-3 flex items-baseline justify-between border-t pt-3" style={{ borderColor: c.line }}>
        <p className="text-[0.8125rem]" style={{ color: c.muted }}>Seneste forsøg</p>
        <p className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: c.ink }}>86<span className="text-[0.8125rem] font-normal" style={{ color: c.muted }}> / 100</span></p>
      </div>
    </div>
  );
}

function FeedbackKort({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[24px] p-6 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/10 ${className}`} style={{ background: BROWN }}>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/60">Feedback</p>
      <ul className="mt-4 grid gap-3 text-[0.9375rem]">
        <li className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem]" style={{ background: "rgba(58,166,107,0.25)", color: "#9ee0bb" }}>✓</span>Klar opgave og modtager</li>
        <li className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem]" style={{ background: "rgba(58,166,107,0.25)", color: "#9ee0bb" }}>✓</span>Længde og tone angivet</li>
        <li className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem]" style={{ background: "rgba(246,201,182,0.2)", color: c.peach }}>↑</span>Sig, hvorfor leveringen er forsinket</li>
      </ul>
    </div>
  );
}

/* A · Video + resultat: heading row on top, the video big on the left, the score curve and feedback stacked on the right. */
export function A() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="max-w-[32rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <Video className="rounded-[28px] lg:h-full [&_video]:lg:h-full [&_video]:lg:aspect-auto" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ForsoegKort />
            <FeedbackKort />
          </div>
        </div>
      </div>
    </section>
  );
}

/* B · Trin følger videoen: three steps on the left light up in time with what happens on the laptop screen. */
const steps = [
  { k: "01", t: "Opgaven", d: "En kunde har ventet fem dage på en levering. Skriv et svar med en ny dato.", from: 0 },
  { k: "02", t: "Du skriver prompten", d: "Med dine egne ord, i ChatGPT, Copilot eller Claude.", from: 0.2 },
  { k: "03", t: "Score og feedback", d: "86 / 100, og et konkret råd til næste forsøg.", from: 7.6 },
];
export function B() {
  const [t, setT] = useState(0);
  const active = t >= 7.6 ? 2 : t >= 0.2 ? 1 : 0;
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <ol className="mt-10 grid gap-2">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.k} className={`relative flex gap-5 rounded-[18px] p-4 transition-colors duration-500 ${on ? "bg-white shadow-[0_20px_40px_-28px_rgba(32,22,19,0.45)]" : ""}`}>
                  <span className={`${display} text-[2.25rem] leading-none transition-colors duration-500`} style={{ color: on ? c.coral : "#cbbdb5" }}>{s.k}</span>
                  <span className="min-w-0">
                    <span className="block text-[1rem] font-semibold" style={{ color: on ? c.ink : "#8a7d77" }}>{s.t}</span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><span className="overflow-hidden"><span className="block pt-1 text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</span></span></span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="relative">
          <Video className="rounded-[28px] shadow-[0_60px_120px_-50px_rgba(32,22,19,0.55)]" onTime={setT} />
          <div className="absolute -bottom-6 left-5 flex items-center gap-1.5 rounded-full bg-white p-1.5 pr-4 shadow-[0_20px_40px_-20px_rgba(32,22,19,0.5)] sm:-bottom-7 sm:left-8">
            <span className="flex -space-x-1.5">{tools.map((x) => <span key={x.n} className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-white"><Image src={x.s} alt="" width={20} height={20} className="size-5 rounded-[5px]" /></span>)}</span>
            <span className="text-[0.8125rem] font-medium" style={{ color: c.ink }}>Samme øvelse i alle tre</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Før og efter: dark stage, the video in the middle, the first try and the try after feedback pinned to its corners. */
function PromptKort({ label, text, score, good, className = "" }: { label: string; text: string; score: number; good?: boolean; className?: string }) {
  return (
    <div className={`w-full max-w-[19rem] rounded-[22px] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em]" style={{ color: good ? c.coral : c.muted }}>{label}</p>
        <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: good ? c.coral : "#a1948e" }}>{score}</p>
      </div>
      <p className="mt-3 rounded-[12px] px-3.5 py-2.5 text-[0.8125rem] leading-relaxed" style={good ? { background: c.dark, color: "#fff" } : { background: c.sand, color: c.muted }}>{text}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: c.line }}><div className="h-full rounded-full" style={{ width: `${score}%`, background: good ? c.coral : "#bfb2ab" }} /></div>
    </div>
  );
}
export function C() {
  return (
    <section className="overflow-x-clip py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className={`${h2} !text-white`}>{HEAD}</h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/70">{PARA}</p>
        </div>
        <div className="relative mx-auto mt-14 max-w-[64rem] lg:mt-20">
          <Video className="rounded-[28px] ring-1 ring-white/10" btn="bottom-4 right-4 lg:left-4 lg:right-auto" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
            <PromptKort label="Første forsøg" text="Skriv et svar til en kunde om en levering." score={48} className="lg:absolute lg:-left-16 lg:top-10 lg:-rotate-2 xl:-left-24" />
            <PromptKort label="Efter feedback" text="Du er min assistent. Skriv et kort, venligt svar til Mette … Højst 120 ord." score={86} good className="lg:absolute lg:-bottom-10 lg:-right-16 lg:rotate-2 xl:-right-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
