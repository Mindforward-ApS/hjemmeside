"use client";

// Three versions of "Øv på dine egne opgaver" (Marco 2026-11-03). No photos (too many photos on the page already).
// Heading and paragraph are unchanged. Example data.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Øv på dine egne opgaver";
const PARA = "Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.";
const tools = [{ n: "ChatGPT", s: "/logos/chatgpt.png" }, { n: "Copilot", s: "/logos/copilot.png" }, { n: "Claude", s: "/logos/claude.png" }];
const PROMPT = "Du er min assistent. Skriv et kort, venligt svar til Mette, der har ventet fem dage på sin levering. Giv en ny dato og lyd som mig. Højst 120 ord.";

/* The app screen inside P's laptop: browser chrome + øvemiljø. Also rendered alone at /preview/oevemiljoe-skaerm for the video. */
export function OevemiljoeSkaerm({ n, step, className = "" }: { n: number; step: number; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[8px] bg-white ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-black/5 bg-[#f4f1ef] px-3.5 pb-2 pt-2.5">
        <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((col) => <i key={col} className="size-2.5 rounded-full" style={{ background: col }} />)}</span>
        <span className="flex items-center gap-2 rounded-t-[8px] bg-white px-3 py-1.5 text-[0.6875rem] font-medium" style={{ color: c.ink }}><span className="size-3 rounded-[3px]" style={{ background: c.coral }} />Øvemiljø · Mindforward</span>
      </div>
      <div className="flex items-center gap-2 border-b border-black/5 bg-white px-3.5 py-2">
        <span className="flex gap-2 text-[#9a908c]"><Icon name="arrowLeft" size={13} /><Icon name="arrowRight" size={13} /></span>
        <span className="flex flex-1 items-center gap-2 rounded-full bg-[#f4f1ef] px-3 py-1 text-[0.6875rem] text-[#6e625d]"><Icon name="lock" size={11} />app.mindforward.dk/oevemiljoe/opgave-3</span>
      </div>
      {/* App bar */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ background: c.dark }}>
        <p className="text-[0.8125rem] text-white/80">Øvemiljø · Opgave 3 af 5</p>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.75rem] text-white"><Image src={tools[1].s} alt="" width={16} height={16} className="size-4 rounded-[4px]" />{tools[1].n}</span>
      </div>
    <div className="grid gap-4 bg-white p-5 md:grid-cols-[1.3fr_1fr]">
      <div className="grid content-start gap-3">
        <p className="rounded-[12px] p-3.5 text-[0.875rem]" style={{ background: c.coralSoft, color: c.ink }}><b>Opgave:</b> En kunde har ventet fem dage på en levering. Skriv et svar med en ny dato.</p>
        <div className="ml-auto min-h-[5.5rem] max-w-[95%] rounded-[14px] rounded-br-[4px] px-4 py-3 text-[0.875rem] leading-relaxed text-white" style={{ background: c.dark }}>
          {PROMPT.slice(0, n)}{n < PROMPT.length && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white" />}
        </div>
        <div className={`max-w-[95%] rounded-[14px] rounded-bl-[4px] px-4 py-3 text-[0.875rem] leading-relaxed transition-all duration-500 ${step >= 1 ? "opacity-100" : "translate-y-2 opacity-0"}`} style={{ background: c.cream, color: c.ink }}>
          Hej Mette, tak for din tålmodighed, og undskyld ventetiden. Din ordre bliver leveret <b>torsdag den 6. november</b>. Skriv endelig, hvis tidspunktet ikke passer.
        </div>
      </div>
      <div className={`grid content-start gap-3 rounded-[16px] p-5 transition-all duration-700 ${step >= 2 ? "opacity-100" : "translate-y-3 opacity-0"}`} style={{ background: c.cream }}>
        <p className="text-[0.8125rem]" style={{ color: c.muted }}>Din score</p>
        <p className="flex items-baseline gap-1"><span className="text-[3.5rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.875rem]" style={{ color: c.muted }}>/ 100</span></p>
        <ul className="grid gap-2 text-[0.8125rem]" style={{ color: c.ink }}>
          <li className="flex gap-2"><span style={{ color: c.green }}>✓</span>Klar opgave og modtager</li>
          <li className="flex gap-2"><span style={{ color: c.green }}>✓</span>Længde og tone angivet</li>
          <li className="flex gap-2"><span style={{ color: c.coral }}>↑</span>Sig, hvorfor leveringen er forsinket</li>
        </ul>
      </div>
    </div>
    </div>
  );
}

/* P · Øvemiljøet live: Marco's laptop video with the øvemiljø filmed onto the screen (prompt types, answer, score 86).
   Made in scratchpad/vid from /preview/oevemiljoe-skaerm. Muted loop, pauses off-screen, poster only under reduced motion. */
export function P() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  // Video clock in seconds; starts at the end so a still poster (reduced motion) highlights the score step.
  const [time, setTime] = useState(9);
  // Steps follow the film: the task is on screen first, the prompt types until ~7 s, the score lands at ~8 s.
  const active = time < 1.2 ? 0 : time < 7.6 ? 1 : 2;
  const steps = ["En opgave fra din hverdag", "Du skriver prompten selv", "Score og feedback med det samme"];
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
    <section id="saadan" className="scroll-mt-6 overflow-x-clip py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          {/* Marco 2026-11-04: three steps that light up in time with the film */}
          <ol className="mt-9 grid gap-2">
            {steps.map((t, k) => (
              <li key={t} className="flex items-center gap-4 rounded-[16px] px-4 py-3.5 transition-[background-color,box-shadow] duration-500" style={k === active ? { background: "#fff", boxShadow: "0 14px 30px -18px rgba(32,22,19,0.35)" } : undefined}>
                <span className="font-[family-name:var(--font-bebas)] text-[1.75rem] leading-none transition-colors duration-500" style={{ color: k === active ? c.coral : "rgba(32,22,19,0.3)" }}>0{k + 1}</span>
                <span className="text-[1.0625rem] font-semibold transition-colors duration-500" style={{ color: k === active ? c.ink : "rgba(32,22,19,0.5)" }}>{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative">
        <div className="relative overflow-hidden rounded-[28px] shadow-[0_60px_120px_-50px_rgba(32,22,19,0.6)]">
          <video ref={ref} className="block aspect-video w-full object-cover" src="/video/oevemiljoe.mp4" poster="/video/oevemiljoe-poster.webp" muted loop playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            aria-label="En medarbejder skriver en prompt i øvemiljøet og får scoren 86 ud af 100 med feedback" />
          <button type="button" onClick={toggle} aria-label={paused ? "Afspil video" : "Sæt video på pause"}
            className="nf-focus absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65">
            {paused
              ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
              : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
          </button>
        </div>
          {/* The result, readable without watching: floats over the film's corner and lifts when the score lands */}
          <div className="absolute -bottom-8 -left-6 hidden w-[15.5rem] rounded-[18px] bg-white p-5 shadow-[0_30px_60px_-25px_rgba(32,22,19,0.45)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:block lg:-left-10" style={{ transform: `translateY(${active === 2 ? -6 : 0}px) scale(${active === 2 ? 1.03 : 1})` }}>
            <p className="text-[0.8125rem]" style={{ color: c.muted }}>Din score</p>
            <p className="mt-1 flex items-baseline gap-1"><span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.875rem]" style={{ color: c.muted }}>/ 100</span></p>
            <ul className="mt-3 grid gap-1.5 text-[0.8125rem]" style={{ color: c.ink }}>
              <li className="flex gap-2"><span style={{ color: c.green }}>✓</span>Klar opgave og modtager</li>
              <li className="flex gap-2"><span style={{ color: c.green }}>✓</span>Længde og tone angivet</li>
              <li className="flex gap-2"><span style={{ color: c.coral }}>↑</span>Sig, hvorfor leveringen er forsinket</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Q · Tre trin: Opgave → Din prompt → Feedback as three white cards in a row on cream, with arrows between. */
export function Q() {
  const steps = [
    { k: "1 · Opgaven", body: <p className="text-[0.9375rem] leading-relaxed" style={{ color: c.ink }}>En kunde har ventet fem dage på en levering. Skriv et svar med en ny dato.</p>, tag: "Fra din hverdag" },
    { k: "2 · Din prompt", body: <p className="rounded-[12px] px-3.5 py-3 text-[0.875rem] leading-relaxed text-white" style={{ background: c.dark }}>{PROMPT}</p>, tag: "Du skriver selv" },
    { k: "3 · Feedback", body: <div><p className="flex items-baseline gap-1"><span className="text-[3rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.875rem]" style={{ color: c.muted }}>/ 100</span></p><p className="mt-2 text-[0.875rem]" style={{ color: c.ink }}>Godt. Sig også, hvorfor leveringen er forsinket.</p></div>, tag: "Med det samme" },
  ];
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
          {steps.map((s, i) => (
            <div key={s.k} className="contents">
              <article className="flex flex-col gap-4 rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(32,22,19,0.4)]">
                <div className="flex items-center justify-between"><p className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>{s.k}</p><span className="rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold" style={{ background: c.cream, color: c.muted }}>{s.tag}</span></div>
                <div className="flex-1">{s.body}</div>
              </article>
              {i < 2 && <span className="hidden place-self-center lg:grid"><span className="grid size-10 place-items-center rounded-full text-white" style={{ background: c.coral }}><Icon name="arrowRight" size={16} /></span></span>}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.875rem]" style={{ color: c.muted }}>Du øver i {tools.map((t) => <span key={t.n} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-medium" style={{ color: c.ink }}><Image src={t.s} alt="" width={16} height={16} className="size-4 rounded-[4px]" />{t.n}</span>)}</div>
      </div>
    </section>
  );
}

/* R · Før og efter prompten: dark stage, the same task with a weak prompt (34) and a strong one (86) side by side. */
export function R() {
  return (
    <section className="py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <h2 className={`${h2} !text-white`}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/70 lg:justify-self-end">{PARA}</p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {[
            { k: "Før kurset", p: "skriv et svar til kunden", a: "Kære kunde. Tak for din henvendelse. Vi beklager ulejligheden og vender tilbage hurtigst muligt.", s: 34, hot: false },
            { k: "Efter kurset", p: PROMPT, a: "Hej Mette, tak for din tålmodighed, og undskyld ventetiden. Din ordre bliver leveret torsdag den 6. november.", s: 86, hot: true },
          ].map((x) => (
            <article key={x.k} className="flex flex-col gap-4 rounded-[24px] p-7" style={{ background: x.hot ? "#fff" : c.dark2 }}>
              <div className="flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold" style={{ background: x.hot ? c.coral : "rgba(255,255,255,0.1)", color: x.hot ? c.ink : "rgba(255,255,255,0.75)" }}>{x.k}</span>
                <p className="flex items-baseline gap-1"><span className={`${display} text-[length:calc(var(--dz,1)*3.5rem)]`} style={{ color: x.hot ? c.coral : "rgba(255,255,255,0.35)" }}>{x.s}</span><span className={`text-[length:calc(var(--dz,1)*0.8125rem)] ${x.hot ? "" : "text-white/40"}`} style={x.hot ? { color: c.muted } : undefined}>/100</span></p>
              </div>
              <div className={`rounded-[14px] px-4 py-3 text-[0.9375rem] leading-relaxed ${x.hot ? "text-white" : "text-white/70"}`} style={{ background: x.hot ? c.dark : "rgba(255,255,255,0.06)" }}>{x.p}</div>
              <div className={`rounded-[14px] px-4 py-3 text-[0.9375rem] leading-relaxed ${x.hot ? "" : "text-white/55"}`} style={x.hot ? { background: c.cream, color: c.ink } : { background: "rgba(255,255,255,0.03)" }}>{x.a}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
