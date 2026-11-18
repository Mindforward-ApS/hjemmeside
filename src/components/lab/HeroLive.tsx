"use client";

// Hero cards, direction A "Levende produkt" (Marco 2026-11-04: the old cards "ligner ai slop"). Same sizes and places
// as before; each card now shows a real moment from Mindforward that plays on a loop. Example data.
// Motion rules: transform/opacity only, ease-out curves, nothing moves under prefers-reduced-motion (final frame).
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const c = { dark: "#201613", ink: "#201613", muted: "#6e625d", line: "#efe8e3", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6", green: "#3aa66b" };
const ease = "cubic-bezier(0.16,1,0.3,1)";

const reduceMq = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => { const mq = window.matchMedia(reduceMq); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); };
function useReduced() { return useSyncExternalStore(subscribe, () => window.matchMedia(reduceMq).matches, () => true); }

/* A clock that ticks every `ms` while motion is allowed. */
function useTick(ms: number, reduce: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setT((x) => x + 1), ms);
    return () => clearInterval(id);
  }, [ms, reduce]);
  return t;
}

/* ───── Øvemiljø: the prompt types itself, then the score ring fills to 86 and the feedback lands. 10 s loop. ───── */
const PROMPT = "Du er min assistent. Skriv et kort, venligt svar til Mette med en ny leveringsdato. Lyd som mig. Højst 120 ord.";
export function KortOevelse({ fill = false, privat = false }: { fill?: boolean; privat?: boolean }) {
  const reduce = useReduced();
  const tick = useTick(50, reduce);
  const L = 200; // 10 s
  const t = reduce ? 160 : tick % L;
  const typed = Math.max(0, Math.min(PROMPT.length, (t - 8) * 2));
  const scoreOn = t >= 70;
  const p = Math.min(1, Math.max(0, (t - 72) / 22)); // ring fill 0 → 1
  const ringP = 1 - Math.pow(1 - p, 3);
  const score = Math.round(86 * ringP);
  const out = t >= 188; // short fade before the loop restarts
  return (
    <div className={`@container flex w-full flex-col rounded-[24px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] ${fill ? "h-full" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>Øvemiljø</p>
          <p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>{privat ? "Din opgave · 3 af 5" : "Opgave 3 af 5"}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] font-medium" style={{ borderColor: c.line, color: c.ink }}>
          <Image src="/logos/copilot.png" alt="" width={16} height={16} className="size-4 rounded-[4px]" />Copilot
        </span>
      </div>
      <div className="mt-4 grid gap-2.5 transition-opacity duration-500" style={{ opacity: out ? 0 : 1 }}>
        <p className="rounded-[12px] px-3 py-2.5 text-[0.75rem] leading-snug" style={{ background: c.coralSoft, color: c.ink }}><b>Opgave:</b> En kunde har ventet fem dage. Skriv et svar med en ny dato.</p>
        <p className="ml-auto min-h-[4.6rem] w-[92%] rounded-[14px] rounded-br-[4px] px-3.5 py-2.5 text-[0.75rem] leading-snug text-white" style={{ background: c.dark }}>
          {PROMPT.slice(0, typed)}
          {typed < PROMPT.length && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-white/80" />}
        </p>
      </div>
      {/* Score: fades up when the prompt is sent, the ring fills and the number counts with it */}
      <div className="mt-auto flex items-center gap-4 border-t pt-4" style={{ borderColor: c.line, opacity: scoreOn && !out ? 1 : 0, transform: `translateY(${scoreOn && !out ? 0 : 8}px)`, transition: `opacity 500ms ${ease}, transform 600ms ${ease}` }}>
        <span className="relative grid size-14 shrink-0 place-items-center">
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="20" fill="none" stroke={c.line} strokeWidth="5" />
            <circle cx="24" cy="24" r="20" fill="none" stroke={c.coral} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${0.86 * ringP * 125.7} 125.7`} />
          </svg>
          <span className="text-[1rem] font-semibold tabular-nums" style={{ color: c.ink }}>{score}</span>
        </span>
        <div className="min-w-0 text-[0.75rem] leading-snug">
          <p className="font-semibold" style={{ color: c.ink }}>Score 86 / 100</p>
          <p className="mt-0.5 flex items-center gap-1" style={{ color: c.green }}>✓ Klar opgave og modtager</p>
          <p className="flex items-center gap-1" style={{ color: c.coral }}>↑ Sig, hvorfor den er forsinket</p>
        </div>
      </div>
    </div>
  );
}

/* ───── Lederens dag: notifications slide in at the top every 3.2 s, the oldest leaves at the bottom. ───── */
type Note = { who: string; img: string; what: string; badge: string; tone: "coral" | "green" | "ink" };
const team: Note[] = [
  { who: "Sofie Lund", img: "/img/people/mette-krogh.webp", what: "bestod Opgave 3", badge: "92", tone: "coral" },
  { who: "Mads Holm", img: "/img/people/jonas-bak.webp", what: "fik sit kursusbevis", badge: "Bevis", tone: "green" },
  { who: "Ida Brandt", img: "/img/people/line-vestergaard.webp", what: "startede Lektion 4", badge: "Ny", tone: "ink" },
  { who: "Jonas Bak", img: "/img/people/ali-yilmaz.webp", what: "forbedrede sin score", badge: "+18", tone: "green" },
  { who: "Holdet", img: "", what: "12 af 12 har øvet i denne uge", badge: "✓", tone: "green" },
];
const mine: Note[] = [
  { who: "Du", img: "", what: "bestod Opgave 3", badge: "92", tone: "coral" },
  { who: "Du", img: "", what: "fik dit kursusbevis", badge: "Bevis", tone: "green" },
  { who: "Du", img: "", what: "startede Lektion 4", badge: "Ny", tone: "ink" },
  { who: "Du", img: "", what: "forbedrede din score", badge: "+18", tone: "green" },
];
function Row({ n }: { n: Note }) {
  const tone = n.tone === "coral" ? { background: c.coralSoft, color: "#b8432a" } : n.tone === "green" ? { background: "#dcefe3", color: "#2f7a4f" } : { background: "#f3ede9", color: c.ink };
  return (
    <div className="flex h-full items-center gap-3 rounded-[14px] bg-white px-3 shadow-[0_8px_24px_-14px_rgba(32,22,19,0.35)]">
      {n.img ? (
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full"><Image src={n.img} alt="" fill sizes="32px" className="object-cover object-top" /></span>
      ) : (
        <span className="grid size-8 shrink-0 place-items-center rounded-full text-[0.6875rem] font-semibold text-white" style={{ background: c.dark }}>{n.who === "Du" ? "Du" : "12"}</span>
      )}
      <p className="min-w-0 flex-1 truncate text-[0.8125rem]" style={{ color: c.ink }}><b className="font-semibold">{n.who}</b> {n.what}</p>
      <span className="shrink-0 rounded-full px-2 py-0.5 text-[0.75rem] font-semibold tabular-nums" style={tone}>{n.badge}</span>
    </div>
  );
}
function Feed({ notes, rowH }: { notes: Note[]; rowH: number }) {
  const reduce = useReduced();
  const k = useTick(3200, reduce);
  const gap = 8;
  // Absolute indices k-1 … k+3 stay mounted under stable keys, so moving between slots animates.
  const items = [-1, 0, 1, 2, 3].map((d) => k + d);
  return (
    <div className="relative" style={{ height: rowH * 3 + gap * 2 }}>
      {items.map((n) => {
        const slot = k + 2 - n; // newest (k+2) on top
        const shown = slot >= 0 && slot <= 2;
        return (
          <div key={n} className="absolute inset-x-0" style={{ height: rowH, transform: `translateY(${slot * (rowH + gap)}px) scale(${shown ? 1 : 0.96})`, opacity: shown ? 1 : 0, transition: `transform 700ms ${ease}, opacity 500ms ${ease}` }}>
            <Row n={notes[((n % notes.length) + notes.length) % notes.length]} />
          </div>
        );
      })}
    </div>
  );
}

// `wide`: the hero version (700 design px), same outer shape as the old profile card so nothing on the page moves.
export function LederFeed({ wide = false, privat = false }: { wide?: boolean; privat?: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.75)] ${wide ? "" : "max-w-[30rem]"}`}>
      <div className={`relative overflow-hidden ${wide ? "aspect-[2.7]" : "aspect-[5/4]"}`} style={{ background: "#f5ece4" }}>
        <Image src="/img/leder-cut.webp" alt="Leder, der følger holdet på sin telefon" width={1189} height={1400} className={`absolute bottom-0 h-[96%] w-auto max-w-none -translate-x-1/2 ${wide ? "left-[80%]" : "left-[78%]"}`} />
        <div className={`absolute ${wide ? "left-7 top-6 w-[60%]" : "left-4 top-4 w-[72%]"}`}>
          <p className="flex items-center gap-2 text-[0.8125rem] font-semibold" style={{ color: "#5c3328" }}>
            <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full motion-reduce:hidden" style={{ background: c.green, opacity: 0.5 }} /><span className="relative size-2 rounded-full" style={{ background: c.green }} /></span>
            {privat ? "Din uge" : "Lederen · i dag"}
          </p>
          <div className="mt-3"><Feed notes={privat ? mine : team} rowH={wide ? 46 : 40} /></div>
        </div>
      </div>
      <div className={wide ? "flex items-center gap-10 px-9 py-5" : "p-6"} style={{ background: "linear-gradient(150deg, #fbe2d4 0%, #f8d6c4 45%, #eeb79f 100%)" }}>
        <p className={`shrink-0 font-semibold uppercase tracking-[0.16em] ${wide ? "text-[0.875rem]" : "text-[0.6875rem]"}`} style={{ color: "rgba(32,22,19,0.75)" }}>{privat ? "Privat · 69 kr. pr. måned" : "Teamleder · Kundeservice"}</p>
        <div className={`grid flex-1 grid-cols-3 ${wide ? "" : "mt-5 border-t pt-5"}`} style={{ borderColor: "rgba(32,22,19,0.15)" }}>
          {(privat ? [["10 min", "pr. lektion"], ["86", "din score"], ["7/9", "moduler"]] : [["12", "på holdet"], ["86", "holdets score"], ["9/9", "moduler"]]).map(([v, l], i) => (
            <div key={l} className={`text-center ${i ? "border-l" : ""}`} style={{ borderColor: "rgba(32,22,19,0.15)" }}>
              <p className={`font-semibold tracking-[-0.03em] tabular-nums ${wide ? "text-[2rem]" : "text-[1.5rem]"}`} style={{ color: c.ink }}>{v}</p>
              <p className={wide ? "text-[0.9375rem]" : "text-[0.75rem]"} style={{ color: "rgba(32,22,19,0.75)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
