"use client";

// "Få hele teamet i gang" — the closing CTA, three versions that each copy one real closing section
// (captures in design/references/cta/). Copy unchanged: heading, "Start i dag, eller tag 15 minutter med os først.",
// Start et kursus + Book 15 min.
// K1 · Calendly: centred heading and button; below, a row of gradient cards with cut-out people breaking out of the
//      top edge and UI chips across the middle card; the side cards bleed off the screen.
// K2 · Granola: a full-bleed photo with a big cream "window" card on it holding the heading and buttons.
// K3 · Linear: dark, quiet, centred two-line statement with two pill buttons.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { UiStage } from "@/components/lab/uiMotion";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", cream: "#f7f2ee" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const HEAD = "Få hele teamet i gang";
const SUB = "Start i dag, eller tag 15 minutter med os først.";

function Buttons({ dark = false, center = false }: { dark?: boolean; center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={appLinks.startBusiness} data-btn="primary" className="group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={dark ? { background: c.cream, color: c.ink } : { background: c.dark, color: "#fff" }}>
        Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link href="/kontakt" data-btn="ghost" className={`inline-flex h-12 items-center rounded-full px-6 text-[0.9375rem] font-medium ring-1 transition-colors ${dark ? "text-white ring-white/20 hover:bg-white/5" : "hover:bg-black/5"}`} style={dark ? undefined : { color: c.ink, ["--tw-ring-color" as string]: "rgba(32,22,19,0.3)" }}>Book 15 min</Link>
    </div>
  );
}

/* ───── K1 · Calendly ───── */
// Grainy warm gradient like Calendly's card backgrounds, in our palette.
const grad = (a: string) => ({ background: `radial-gradient(120% 90% at ${a}, #fde9df 0%, transparent 60%), linear-gradient(170deg, #f6c3ae 0%, #f3a688 45%, #fbe1d7 100%)` });
const Chip = ({ children, icon = false }: { children: React.ReactNode; icon?: boolean }) => (
  <span className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-white px-3.5 text-[1rem] font-semibold shadow-[0_10px_24px_-12px_rgba(32,22,19,0.4)] sm:h-14 sm:rounded-[14px] sm:px-5 sm:text-[1.5rem]" style={{ color: c.ink }}>
    {icon && <span className="grid size-6 place-items-center rounded-full sm:size-8" style={{ background: c.coralSoft, color: c.coral }}><Icon name="check" size={14} /></span>}{children}
  </span>
);
// Marco 2026-11-05: "1, men så må det gerne være en karussel". The cards slide sideways every few seconds like
// Calendly's: the active card is centred and full size with its chips; the neighbours are smaller and bleed off the
// edges. Endless: the list is rendered three times and the index jumps back to the middle copy without animating.
const slides = [
  { src: "/img/people/cut/mette-krogh.webp", w: 448, h: 562, chips: ["Kursus", "Bestået"] },
  { src: "/img/people/cut/ali-yilmaz.webp", w: 463, h: 525, chips: ["Excel", "Klaret på 10 min"] },
  { src: "/img/people/cut/line-vestergaard.webp", w: 510, h: 641, chips: ["Mails", "Svar klar"] },
  { src: "/img/people/cut/jonas-bak.webp", w: 535, h: 653, chips: ["Møder", "Opsummeret"] },
];
const origins = ["30% 20%", "70% 30%", "20% 30%", "60% 15%"];
function useCarousel(n: number) {
  const [i, setI] = useState(n);
  const [anim, setAnim] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || hover || !seen) return;
    const t = setInterval(() => { setAnim(true); setI((x) => x + 1); }, 3200);
    return () => clearInterval(t);
  }, [playing, hover, seen]);
  // After sliding into the first or last copy, jump back to the middle copy without a transition.
  const onEnd = () => { if (i >= 2 * n || i < n) { setAnim(false); setI(n + (((i - n) % n) + n) % n); } };
  useEffect(() => { if (!anim) { const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true))); return () => cancelAnimationFrame(r); } }, [anim]);
  const go = (d: number) => { setAnim(true); setI((x) => x + d); };
  return { ref, i, anim, playing, setPlaying, setHover, onEnd, go };
}
export function K1() {
  const n = slides.length;
  const k = useCarousel(n);
  const all = [...slides, ...slides, ...slides];
  return (
    <section id="virksomheder" className="overflow-hidden pt-24 lg:pt-32" style={{ background: c.cream }}>
      <div className="px-5 text-center">
        <h2 className={`${display} text-[length:calc(var(--dz,1)*clamp(3rem,1.8rem+4vw,5.5rem))]`} style={{ color: c.ink }}>{HEAD}</h2>
        <p className="mx-auto mt-5 max-w-[30rem] text-[1.125rem] leading-relaxed" style={{ color: c.muted }}>{SUB}</p>
        <div className="mt-8"><Buttons center /></div>
      </div>
      <div ref={k.ref} className="relative mt-16 h-[22rem] [--g:1rem] [--w:78vw] sm:h-[27rem] sm:[--g:2rem] sm:[--w:30rem] lg:mt-20 lg:h-[30rem] lg:[--g:2.5rem] lg:[--w:38rem]"
        onMouseEnter={() => k.setHover(true)} onMouseLeave={() => k.setHover(false)} aria-roledescription="karussel" aria-label="Medarbejdere i gang med Mindforward">
        <ul className="absolute bottom-0 left-1/2 flex items-end gap-[var(--g)]" onTransitionEnd={(e) => { if (e.target === e.currentTarget) k.onEnd(); }}
          style={{ transform: `translateX(calc(var(--w) / -2 - ${k.i} * (var(--w) + var(--g))))`, transition: k.anim ? "transform 900ms cubic-bezier(0.65,0,0.35,1)" : "none" }}>
          {all.map((s, j) => {
            const on = j === k.i;
            return (
              <li key={j} aria-hidden={!on} className="relative h-[17rem] w-[var(--w)] shrink-0 origin-bottom sm:h-[21rem] lg:h-[24rem]"
                style={{ transform: on ? "scale(1)" : "scale(0.86)", transition: k.anim ? "transform 900ms cubic-bezier(0.65,0,0.35,1)" : "none" }}>
                <div className="absolute inset-0 rounded-t-[28px]" style={grad(origins[j % n])} />
                <Image src={s.src} alt="" width={s.w} height={s.h} className="absolute bottom-0 left-1/2 h-[118%] w-auto max-w-none -translate-x-1/2" />
                <div className="absolute inset-x-0 top-[52%] flex flex-wrap items-center justify-center gap-2 transition-[opacity,transform] duration-500"
                  style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px)", transitionDelay: on ? "450ms" : "0ms" }}>
                  <UiStage active={on} className="flex flex-wrap items-center justify-center gap-2">
                    <span className="ui-pop inline-block" style={{ ["--d" as string]: "500ms" }}><Chip icon>{s.chips[0]}</Chip></span>
                    <span className="ui-badge inline-block" style={{ ["--d" as string]: "1.1s" }}><Chip>{s.chips[1]}</Chip></span>
                  </UiStage>
                </div>
              </li>
            );
          })}
        </ul>
        {/* Controls: previous / pause / next (WCAG 2.2.2: anything that moves on its own can be paused) */}
        <div className="absolute bottom-5 right-5 z-10 flex gap-2 sm:right-[3.5vw]">
          {[
            { l: "Forrige", i: "arrowLeft" as const, f: () => k.go(-1) },
            { l: k.playing ? "Pause" : "Afspil", i: (k.playing ? "pause" : "play") as "pause" | "play", f: () => k.setPlaying(!k.playing) },
            { l: "Næste", i: "arrowRight" as const, f: () => k.go(1) },
          ].map((b) => (
            <button key={b.l} type="button" onClick={b.f} aria-label={b.l} className="grid size-11 place-items-center rounded-full bg-white/90 shadow-[0_8px_20px_-10px_rgba(32,22,19,0.5)] backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2" style={{ color: c.ink, outlineColor: c.coral }}>
              <Icon name={b.i} size={16} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── K2 · Granola ───── */
export function K2() {
  return (
    <section id="virksomheder" className="relative overflow-hidden" style={{ background: c.dark }}>
      <Image src="/img/unsplash/team.jpg" alt="" fill sizes="100vw" className="object-cover object-[40%_15%]" />
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(32,22,19,0.15)" }} />
      <div className="relative flex min-h-[40rem] items-center px-5 py-20 sm:px-[3.5vw] lg:min-h-[46rem] lg:justify-center lg:py-24">
        <div className="w-full max-w-[44rem] rounded-[20px] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-12 lg:ml-[18%]" style={{ background: "#fbf7f3" }}>
          <div className="flex gap-2" aria-hidden>{["#e8664a", "#f2b84b", "#7fb069"].map((x) => <span key={x} className="size-3 rounded-full" style={{ background: x }} />)}</div>
          <h2 className={`${display} mt-8 text-[length:calc(var(--dz,1)*clamp(3.5rem,2rem+5vw,6.5rem))]`} style={{ color: c.ink }}>Få hele<br />teamet i gang</h2>
          <p className="mt-6 max-w-[28rem] text-[1.1875rem] leading-relaxed" style={{ color: c.muted }}>{SUB}</p>
          <div className="mt-8"><Buttons /></div>
        </div>
      </div>
    </section>
  );
}

/* ───── K3 · Linear ───── */
export function K3() {
  return (
    <section id="virksomheder" className="py-32 lg:py-48" style={{ background: c.dark }}>
      <div className="px-5 text-center">
        <h2 className={`${display} text-[length:calc(var(--dz,1)*clamp(3.5rem,2rem+5vw,7rem))] text-white`}>Få hele teamet<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>i gang i dag</span></h2>
        <p className="mx-auto mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed text-white/65">{SUB}</p>
        <div className="mt-9"><Buttons dark center /></div>
      </div>
    </section>
  );
}
