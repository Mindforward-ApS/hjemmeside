"use client";

// "Øv på dine egne opgaver", round 3 (Marco 2026-11-05). Three versions in the style of the current one (P): the
// practice-environment film is the visual, the three steps light up in time with it, the score is readable without
// watching. Heading and paragraph unchanged. Example data; the film is the placeholder øvemiljø clip.
// 1 · Videoen fylder: the film runs full width as a big image; text and steps sit on it over a dark fade
//     (same grip as the photo cards in Færdigheder above).
// 2 · Som nu med tidslinje: the current layout; the steps become a timeline with a progress bar that follows the
//     film, and the score card gets a ring that fills to 86.
// 3 · Stor score: the film big on the left, on the right a huge 86 / 100 and the criteria ticking off with the film.
import { useEffect, useRef, useState } from "react";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", coralSoft: "#fbe1d7" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Øv på dine egne opgaver";
const PARA = "Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.";
const steps = [
  { t: "En opgave fra din hverdag", at: 0 },
  { t: "Du skriver prompten selv", at: 1.2 },
  { t: "Score og feedback med det samme", at: 7.6 },
];
const criteria = [
  { t: "Klar opgave og modtager", ok: true, at: 8.0 },
  { t: "Længde og tone angivet", ok: true, at: 8.4 },
  { t: "Sig, hvorfor leveringen er forsinket", ok: false, at: 8.8 },
];
const LEN = 10; // film length in seconds

// Plays the film while it is on screen, exposes its clock; under reduced motion it shows the poster at the end state.
function useFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(9.5);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v); return () => io.disconnect();
  }, []);
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); } else { v.dataset.userPaused = "1"; v.pause(); } };
  const active = time < steps[1].at ? 0 : time < steps[2].at ? 1 : 2;
  const props = { ref, src: "/video/oevemiljoe.mp4", poster: "/video/oevemiljoe-poster.webp", muted: true, loop: true, playsInline: true, preload: "metadata" as const, onPlay: () => setPaused(false), onPause: () => setPaused(true), onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => setTime(e.currentTarget.currentTime), "aria-label": "En medarbejder skriver en prompt i øvemiljøet og får scoren 86 ud af 100 med feedback" };
  return { props, time, paused, toggle, active };
}

function PlayButton({ paused, onClick, className = "" }: { paused: boolean; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={paused ? "Afspil video" : "Sæt video på pause"} className={`grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 ${className}`}>
      {paused ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg> : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
    </button>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return ok
    ? <span className="grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: c.dark }}>✓</span>
    : <span className="grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ boxShadow: `inset 0 0 0 2px ${c.coral}`, color: c.coral }}>!</span>;
}

/* ───── 1 · Videoen fylder ───── */
export function O1() {
  const f = useFilm();
  return (
    <section className="py-16 lg:py-20" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="relative overflow-hidden rounded-[32px] bg-[#201613]">
          <video {...f.props} className="block aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[21/10]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(32,22,19,0.92) 0%, rgba(32,22,19,0.7) 35%, rgba(32,22,19,0.1) 70%), linear-gradient(0deg, rgba(32,22,19,0.6), transparent 40%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 lg:justify-center lg:p-14">
            <h2 className={`${h2} max-w-[12ch] !text-white`}>{HEAD}</h2>
            <p className="mt-4 max-w-[28rem] text-[1.0625rem] leading-relaxed text-white/75">{PARA}</p>
            <ol className="mt-8 grid max-w-[26rem] gap-1.5">
              {steps.map((s, k) => (
                <li key={s.t} className="flex items-center gap-4 rounded-[14px] px-4 py-3 transition-[background-color] duration-500" style={{ background: k === f.active ? "rgba(255,255,255,0.12)" : "transparent" }}>
                  <span className={`${display} text-[1.75rem] leading-none transition-colors duration-500`} style={{ color: k === f.active ? c.coral : "rgba(255,255,255,0.35)" }}>0{k + 1}</span>
                  <span className="text-[1.0625rem] font-semibold transition-colors duration-500" style={{ color: k === f.active ? "#fff" : "rgba(255,255,255,0.55)" }}>{s.t}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Score on the film's right side, it lifts when the score lands */}
          <div className="absolute bottom-8 right-8 hidden w-[16rem] rounded-[18px] bg-white p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] transition-[transform,opacity] duration-500 lg:block" style={{ opacity: f.active === 2 ? 1 : 0.0, transform: `translateY(${f.active === 2 ? 0 : 12}px)` }}>
            <p className="text-[0.8125rem]" style={{ color: c.muted }}>Din score</p>
            <p className="mt-1 flex items-baseline gap-1"><span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.875rem]" style={{ color: c.muted }}>/ 100</span></p>
            <ul className="mt-3 grid gap-1.5 text-[0.8125rem]" style={{ color: c.ink }}>{criteria.map((k) => <li key={k.t} className="flex items-center gap-2"><Mark ok={k.ok} />{k.t}</li>)}</ul>
          </div>
          <PlayButton paused={f.paused} onClick={f.toggle} className="absolute right-5 top-5" />
        </div>
      </div>
    </section>
  );
}

/* ───── 2 · Som nu med tidslinje ───── */
export function O2() {
  const f = useFilm();
  const C = 2 * Math.PI * 26;
  const score = f.active === 2 ? 86 : 0;
  return (
    <section className="overflow-x-clip py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          {/* Timeline: a rail that fills with the film, each step lights up when the film reaches it */}
          <ol className="relative mt-9 grid gap-5 pl-8">
            <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-[2px] rounded-full" style={{ background: "#e4d8cf" }} />
            <span aria-hidden className="absolute left-[9px] top-2 w-[2px] rounded-full transition-[height] duration-300" style={{ background: c.coral, height: `calc(${Math.min(1, f.time / LEN) * 100}% - 1rem)` }} />
            {steps.map((s, k) => (
              <li key={s.t} className="relative">
                <span aria-hidden className="absolute -left-8 top-1 size-5 rounded-full border-[3px] transition-colors duration-300" style={{ borderColor: c.cream, background: k <= f.active ? c.coral : "#d9cec7" }} />
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em]" style={{ color: c.muted }}>0:{String(Math.floor(s.at)).padStart(2, "0")}</p>
                <p className="mt-0.5 text-[1.125rem] font-semibold transition-colors duration-500" style={{ color: k === f.active ? c.ink : "rgba(32,22,19,0.45)" }}>{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_60px_120px_-50px_rgba(32,22,19,0.6)]">
            <video {...f.props} className="block aspect-video w-full object-cover" />
            <PlayButton paused={f.paused} onClick={f.toggle} className="absolute bottom-4 right-4" />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-[16.5rem] rounded-[18px] bg-white p-5 shadow-[0_30px_60px_-25px_rgba(32,22,19,0.45)] sm:block lg:-left-10">
            <div className="flex items-center gap-3">
              <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden><circle cx="32" cy="32" r="26" fill="none" stroke={c.sand} strokeWidth="6" /><circle cx="32" cy="32" r="26" fill="none" stroke={c.coral} strokeWidth="6" strokeLinecap="round" transform="rotate(-90 32 32)" strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)" }} /></svg>
              <div><p className="text-[0.8125rem]" style={{ color: c.muted }}>Din score</p><p className="flex items-baseline gap-1"><span className="text-[2rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.ink }}>{score || "–"}</span><span className="text-[0.8125rem]" style={{ color: c.muted }}>/ 100</span></p></div>
            </div>
            <ul className="mt-3 grid gap-1.5 text-[0.8125rem]" style={{ color: c.ink }}>{criteria.map((k) => <li key={k.t} className="flex items-center gap-2"><Mark ok={k.ok} />{k.t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 3 · Stor score ───── */
export function O3() {
  const f = useFilm();
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative overflow-hidden rounded-[28px]">
            <video {...f.props} className="block aspect-video h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-4">
              {steps.map((s, k) => (
                <span key={s.t} className="flex-1 rounded-full px-3 py-2 text-center text-[0.8125rem] font-semibold backdrop-blur transition-colors duration-500" style={{ background: k === f.active ? "#fff" : "rgba(32,22,19,0.55)", color: k === f.active ? c.ink : "rgba(255,255,255,0.8)" }}>0{k + 1}<span className="hidden sm:inline"> · {s.t}</span></span>
              ))}
            </div>
            <PlayButton paused={f.paused} onClick={f.toggle} className="absolute right-4 top-4" />
          </div>
          <div className="flex flex-col justify-between rounded-[28px] p-7 sm:p-9" style={{ background: c.dark }}>
            <p className="text-[0.875rem] text-white/60">Din score</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className={`${display} text-[clamp(7rem,4rem+8vw,11rem)] leading-[0.8] transition-colors duration-500`} style={{ color: f.active === 2 ? c.coral : "rgba(255,255,255,0.18)" }}>86</span>
              <span className="text-[1.125rem] text-white/50">/ 100</span>
            </p>
            <ul className="mt-8 grid gap-3 text-[1rem] text-white">
              {criteria.map((k) => {
                const shown = f.time >= k.at;
                return (
                  <li key={k.t} className="flex items-center gap-3 transition-opacity duration-500" style={{ opacity: shown ? 1 : 0.3 }}>
                    {k.ok ? <span className="grid size-6 shrink-0 place-items-center rounded-full text-[12px] font-bold" style={{ background: c.cream, color: c.ink }}>✓</span> : <span className="grid size-6 shrink-0 place-items-center rounded-full text-[12px] font-bold" style={{ boxShadow: `inset 0 0 0 2px ${c.coral}`, color: c.coral }}>!</span>}
                    {k.t}
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 border-t border-white/10 pt-5 text-[0.9375rem] leading-relaxed text-white/70">Næste gang: forklar kort, hvorfor leveringen er forsinket.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
