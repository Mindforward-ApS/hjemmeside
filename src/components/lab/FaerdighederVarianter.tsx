"use client";

// Færdigheder, round 3 (Marco 2026-11-05: "Jeg kan bedst lide vores nuværende, så det skal være noget i stil med
// det, og du skal lave 3 versioner"). All three keep the current carousel (N): wide cream cards with a coral chip,
// a Bebas title and the result as UI on a dotted sand panel, arrows and progress dots. Each sharpens one thing.
// 1 · Som nu, skarpere: before/after time + lesson link in every card, auto-advance with a progress fill, pause on hover.
// 2 · Stor scene: the active card is almost full width with a bigger UI, a 01 / 04 counter, drag or swipe.
// 3 · Mørk scene: the same carousel on a dark brown section, so it stands apart from the light section above.
import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { Icon } from "@/components/ui/Icon";
import { UiStage } from "@/components/lab/uiMotion";
import { PhotoOverride } from "@/components/lab/photoOverride";
import { skills, MiniUI } from "@/components/lab/Faerdigheder";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const times: Record<string, [number, number]> = { Mails: [20, 9], Møder: [30, 8], Excel: [25, 6], Data: [15, 4] };
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Head({ dark = false, onPrev, onNext }: { dark?: boolean; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
      <h2 className={`${h2} max-w-[18ch] ${dark ? "!text-white" : ""}`} style={dark ? undefined : { color: c.ink }}>Færdigheder, du kan bruge allerede i morgen.</h2>
      <div className="lg:justify-self-end">
        <p className={`max-w-[26rem] text-[1.0625rem] leading-relaxed ${dark ? "text-white/70" : ""}`} style={dark ? undefined : { color: c.muted }}>Ingen teori for teoriens skyld. Hvert kursus er bygget op om opgaver, du kender fra din egen arbejdsdag.</p>
        <div className="mt-5 flex gap-2">
          <button type="button" aria-label="Forrige" onClick={onPrev} className={`grid size-11 place-items-center rounded-full border transition ${dark ? "border-white/25 text-white hover:bg-white/10" : "hover:bg-white"}`} style={dark ? undefined : { borderColor: "rgba(32,22,19,0.15)", color: c.ink }}><Icon name="arrowLeft" size={16} /></button>
          <button type="button" aria-label="Næste" onClick={onNext} className="grid size-11 place-items-center rounded-full transition hover:brightness-110" style={{ background: c.coral, color: c.ink }}><Icon name="arrowRight" size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function Panel({ kind, dark = false, zoom = 1.15 }: { kind: (typeof skills)[number]["ui"]; dark?: boolean; zoom?: number }) {
  return (
    <div className="relative m-3 grid min-h-[15rem] place-items-center overflow-hidden rounded-[20px] p-6" style={{ background: dark ? "#3a2722" : c.sand }}>
      <div aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: `radial-gradient(${dark ? "rgba(246,201,182,0.18)" : "rgba(32,22,19,0.12)"} 1.1px, transparent 1.2px)`, backgroundSize: "14px 14px" }} />
      <div className="relative w-full max-w-[19rem]" style={{ zoom }}><MiniUI kind={kind} /></div>
    </div>
  );
}

/* ───── 1 · Som nu, skarpere ───── */
export function V1() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setI((x) => (x + d + skills.length) % skills.length);
  useEffect(() => {
    if (paused || reduced()) return;
    const id = setTimeout(() => go(1), 5000);
    return () => clearTimeout(id);
  }, [i, paused]);
  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={wrap}>
        <Head onPrev={() => go(-1)} onNext={() => go(1)} />
        <div className="mt-12 flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ transform: `translateX(calc(${-i} * (min(46rem, 85vw) + 1rem)))` }}>
          {skills.map((s, n) => {
            const [f, e] = times[s.k];
            return (
              <article key={s.k} className={`grid w-[min(46rem,85vw)] shrink-0 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-40px_rgba(32,22,19,0.45)] transition-opacity duration-500 md:h-[26rem] md:grid-cols-[1fr_1.15fr] ${n === i ? "" : "opacity-55"}`} style={{ background: c.cream }}>
                <div className="flex flex-col justify-between gap-6 p-7 sm:p-9">
                  <span className="w-fit rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>{s.k}</span>
                  <div>
                    <h3 className={`${display} text-[length:calc(var(--dz,1)*clamp(2.25rem,1.5rem+2vw,3.25rem))]`} style={{ color: c.ink }}>{s.t}</h3>
                    {/* Before → after, the same two bars in every card */}
                    <div className="mt-5 grid gap-1.5 text-[0.8125rem]" style={{ color: c.muted }}>
                      {([["Før", f, "#d9cec7"], ["Efter", e, c.coral]] as const).map(([k, v, col]) => (
                        <div key={k} className="grid grid-cols-[3rem_1fr_3.5rem] items-center gap-2"><span>{k}</span><span className="h-1.5 rounded-full bg-white"><span className="block h-full rounded-full" style={{ width: `${(v / 30) * 100}%`, background: col }} /></span><span className="text-right font-semibold" style={{ color: c.ink }}>{v} min</span></div>
                      ))}
                    </div>
                    <Link href="/kurser/ai-paa-arbejdet" className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold underline decoration-[rgba(32,22,19,0.25)] underline-offset-4 hover:decoration-current" style={{ color: c.ink }}>Se lektionen <Icon name="arrowRight" size={13} /></Link>
                  </div>
                </div>
                <Panel kind={s.ui} />
              </article>
            );
          })}
        </div>
        {/* Dots: the active one fills over 5 s, so you see when it moves on */}
        <div className="mt-6 flex gap-2">
          {skills.map((s, n) => (
            <button key={s.k} type="button" aria-label={s.k} onClick={() => setI(n)} className="relative h-1.5 overflow-hidden rounded-full transition-all" style={{ width: n === i ? 40 : 10, background: "#d9cec7" }}>
              {n === i && <span key={`${i}-${paused}`} className="absolute inset-y-0 left-0 rounded-full" style={{ background: c.ink, width: paused ? "100%" : undefined, animation: paused ? undefined : "fvFill 5s linear forwards" }} />}
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes fvFill { from { width: 0 } to { width: 100% } } @media (prefers-reduced-motion: reduce) { [style*="fvFill"] { animation: none !important; width: 100% !important; } }`}</style>
    </section>
  );
}

/* ───── 2 · Stor scene ───── */
export function V2() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => Math.min(skills.length - 1, Math.max(0, x + d)));
  const drag = useRef<number | null>(null);
  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className={wrap}>
        <Head onPrev={() => go(-1)} onNext={() => go(1)} />
        <div
          className="mt-12 flex cursor-grab touch-pan-y gap-5 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] active:cursor-grabbing"
          style={{ transform: `translateX(calc(${-i} * (min(68rem, 88vw) + 1.25rem)))` }}
          onPointerDown={(e) => { drag.current = e.clientX; }}
          onPointerUp={(e) => { if (drag.current === null) return; const dx = e.clientX - drag.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); drag.current = null; }}
          onPointerLeave={() => { drag.current = null; }}
        >
          {skills.map((s, n) => (
            <article key={s.k} className={`grid w-[min(68rem,88vw)] shrink-0 select-none overflow-hidden rounded-[32px] shadow-[0_30px_60px_-40px_rgba(32,22,19,0.45)] transition-[opacity,transform] duration-500 md:h-[32rem] md:grid-cols-[0.9fr_1.1fr] ${n === i ? "" : "scale-[0.97] opacity-45"}`} style={{ background: c.cream }}>
              <div className="flex flex-col justify-between gap-8 p-8 sm:p-11">
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[0.8125rem] font-semibold" style={{ background: c.coral, color: c.ink }}>{s.k}</span>
                  <span className={`${display} text-[length:calc(var(--dz,1)*1.75rem)]`} style={{ color: "#c9b9af" }}>0{n + 1}</span>
                </div>
                <h3 className={`${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.6rem+3vw,4.75rem))]`} style={{ color: c.ink }}>{s.t}</h3>
              </div>
              <Panel kind={s.ui} zoom={1.5} />
            </article>
          ))}
        </div>
        <div className="mt-7 flex items-center gap-4">
          <div className="flex gap-2">{skills.map((s, n) => <button key={s.k} type="button" aria-label={s.k} onClick={() => setI(n)} className="h-1.5 rounded-full transition-all" style={{ width: n === i ? 32 : 10, background: n === i ? c.ink : "#d9cec7" }} />)}</div>
          <span className="num text-[0.875rem] font-semibold" style={{ color: c.muted }}>0{i + 1} / 0{skills.length}</span>
        </div>
      </div>
    </section>
  );
}

/* ───── 3 · Mørk scene (chosen 2026-11-05) — with full photos in the cards ───── */
// Marco: "3 er bedst, men det skal så bare være med fulde billeder i kortene". Each card is a photo of someone doing
// that task (StockSnap, CC0, see public/img/stock/CREDITS-cc0.json); the result floats on the photo on the side away
// from the person, the chip and title sit bottom-left on a dark fade.
const photos: Record<string, { src: string; pos: string; ui: "left" | "right" }> = {
  Mails: { src: "/img/stock/typing-above.jpg", pos: "30% 50%", ui: "right" },
  Møder: { src: "/img/stock/writing-sun.jpg", pos: "40% 35%", ui: "right" },
  Excel: { src: "/img/stock/desk-warm.jpg", pos: "70% 50%", ui: "left" },
  Data: { src: "/img/stock/window-laptop.jpg", pos: "60% 40%", ui: "left" },
};

export function V3() {
  const [i, setI] = useState(0);
  const over = useContext(PhotoOverride);
  const go = (d: number) => setI((x) => (x + d + skills.length) % skills.length);
  return (
    <section className="overflow-hidden py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <Head dark onPrev={() => go(-1)} onNext={() => go(1)} />
        <div className="mt-12 flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ transform: `translateX(calc(${-i} * (min(46rem, 85vw) + 1rem)))` }}>
          {skills.map((s, n) => {
            const ph = over[s.k] ? { ...photos[s.k], ...over[s.k] } : photos[s.k];
            return (
              <article key={s.k} className={`relative h-[30rem] w-[min(46rem,85vw)] shrink-0 overflow-hidden rounded-[28px] ring-1 ring-white/10 transition-opacity duration-500 md:h-[26rem] ${n === i ? "" : "opacity-40"}`} style={{ background: c.dark2 }}>
                <img src={ph.src} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] ${n === i ? "scale-100" : "scale-105"}`} style={{ objectPosition: ph.pos }} />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(32,22,19,0.92) 0%, rgba(32,22,19,0.35) 45%, rgba(32,22,19,0.1) 100%)" }} />
                {/* The result, floating on the photo */}
                <div className={`absolute top-6 w-[min(19rem,calc(100%-3rem))] transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${ph.ui === "right" ? "right-6" : "left-6"} ${n === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: n === i ? "250ms" : "0ms" }}>
                  <UiStage active={n === i}><MiniUI kind={s.ui} /></UiStage>
                </div>
                <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9">
                  <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>{s.k}</span>
                  <h3 className={`${display} mt-4 max-w-[14ch] text-[length:calc(var(--dz,1)*clamp(2.25rem,1.5rem+2vw,3.25rem))] !text-white`}>{s.t}</h3>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex gap-2">{skills.map((s, n) => <button key={s.k} type="button" aria-label={s.k} onClick={() => setI(n)} className="h-1.5 rounded-full transition-all" style={{ width: n === i ? 32 : 10, background: n === i ? c.coral : "rgba(255,255,255,0.2)" }} />)}</div>
      </div>
    </section>
  );
}
