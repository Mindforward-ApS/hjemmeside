"use client";

// The section right after the hero = a product video (Marco 2026-11-10). Three versions, same recording:
// public/video/platform-tur.mp4, a 26 s screen recording of the real platform on :3500
// (Oversigt → Mine kurser → lektion + quiz → Mit hold). No sound, so it autoplays muted.
// V1 "Stor ramme" after linear.app (the product right under the hero, on the same dark stage).
// V2 "Zoom på scroll" after apple.com product pages (the frame grows to full width as you scroll).
// V3 "Kapitler" after Loom/Pleo product tours (chapter list that follows and seeks the video).
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appLinks } from "@/lib/app";
import { gsap, useGSAP, motionQuery } from "@/lib/gsap";

const c = { dark: "#201613", cream: "#f7f2ee", ink: "#201613", muted: "#5a4a44", coral: "#e8664a" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const SRC = "/video/platform-tur.mp4";
const POSTER = "/video/platform-tur-poster.jpg";

const chapters = [
  { t: 0, title: "Oversigt", text: "Dagens næste lektion, øvetid og seneste feedback samlet ét sted." },
  { t: 4.6, title: "Kurser", text: "Alle kurser med fremskridt og score, så man altid ved, hvor man er." },
  { t: 10.8, title: "Lektion og quiz", text: "Kort tekst på dansk, så en quiz, hvor teksten er skjult." },
  { t: 20.1, title: "Mit hold", text: "Lederen ser, hvem der er færdige, og kan skubbe til resten." },
];

// Plain browser window around the recording, so it reads as the real app.
function Browser({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[18px] ring-1 ${dark ? "ring-white/12 bg-[#2c1f1b]" : "ring-black/8 bg-[#ece4df]"}`}>
      <div className="flex h-9 items-center gap-2 px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className={`mx-auto rounded-md px-3 py-0.5 text-[0.75rem] ${dark ? "bg-white/8 text-white/60" : "bg-white/70 text-[#5a4a44]"}`}>app.mindforward.dk</span>
        <span className="w-[54px]" />
      </div>
      {children}
    </div>
  );
}

function Video({ vref, className = "" }: { vref?: React.Ref<HTMLVideoElement>; className?: string }) {
  return <video ref={vref} src={SRC} poster={POSTER} autoPlay muted loop playsInline preload="metadata" className={`block aspect-[16/10] w-full bg-white object-cover ${className}`} aria-label="Skærmoptagelse af Mindforward-platformen: oversigt, kurser, en lektion med quiz og holdoversigten" />;
}

/* V1 Stor ramme: the hero's dark stage carries on, short heading, the full-width window rises in. */
export function V1() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-24" style={{ background: c.dark }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]" style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(232,102,74,0.22), transparent 70%)" }} />
      <div className={`${wrap} relative`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className={`${h2} text-white`}>Sådan ser det ud indefra</h2>
          <p className="max-w-[26rem] text-[1rem] leading-relaxed text-white/70">Den rigtige platform, optaget som den er: fra oversigten til en lektion og videre til holdets overblik.</p>
        </div>
        <div data-reveal className="mt-10 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)] sm:mt-14"><Browser dark><Video /></Browser></div>
      </div>
    </section>
  );
}

/* V2 Zoom på scroll: starts as a smaller window on cream and grows to the full screen width while pinned. */
export function V2() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${motionQuery} and (min-width: 1024px)`, () => {
      const frame = root.current?.querySelector("[data-zoom]");
      if (!frame) return;
      gsap.fromTo(frame, { width: "62%", borderRadius: 28 }, {
        width: "100%", borderRadius: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", scrub: true, pin: true },
      });
    });
    return () => mm.revert();
  }, { scope: root });
  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden py-16" style={{ background: c.cream }}>
      <div className={`${wrap} mb-8 text-center`}>
        <h2 className={h2} style={{ color: c.ink }}>Sådan ser det ud indefra</h2>
        <p className="mx-auto mt-3 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Fra oversigten til en lektion og videre til holdets overblik.</p>
      </div>
      <div data-zoom className="w-[calc(100%-2.5rem)] overflow-hidden rounded-[20px] shadow-[0_40px_120px_-40px_rgba(32,22,19,0.45)] lg:w-[62%]">
        <Video />
      </div>
    </section>
  );
}

/* V3 Kapitler: list on the left follows the video; click a chapter to jump there. */
export function V3() {
  const vid = useRef<HTMLVideoElement>(null);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const f = () => setNow(v.currentTime);
    v.addEventListener("timeupdate", f);
    return () => v.removeEventListener("timeupdate", f);
  }, []);
  const active = chapters.reduce((a, ch, i) => (now >= ch.t ? i : a), 0);
  const end = (i: number) => chapters[i + 1]?.t ?? 25.9;
  const seek = (t: number) => { const v = vid.current; if (v) { v.currentTime = t + 0.05; v.play().catch(() => {}); } };
  return (
    <section className="py-20 sm:py-28" style={{ background: c.cream }}>
      <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-14`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>Sådan ser det ud indefra</h2>
          <p className="mt-4 max-w-[24rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Den rigtige platform på 26 sekunder. Tryk på et trin for at springe dertil.</p>
          <ol className="mt-8 border-t" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
            {chapters.map((ch, i) => {
              const on = i === active;
              const pct = on ? Math.min(100, ((now - ch.t) / (end(i) - ch.t)) * 100) : 0;
              return (
                <li key={ch.title} className="border-b" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
                  <button type="button" onClick={() => seek(ch.t)} aria-current={on} className="nf-focus relative block w-full py-4 text-left">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className={`text-[1.0625rem] font-semibold transition-colors ${on ? "" : "opacity-45"}`} style={{ color: c.ink }}>{ch.title}</span>
                      <span className="text-[0.8125rem] tabular-nums" style={{ color: c.muted }}>0:{String(Math.floor(ch.t)).padStart(2, "0")}</span>
                    </span>
                    <span className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <span className="overflow-hidden"><span className="block pt-1.5 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{ch.text}</span></span>
                    </span>
                    <span aria-hidden className="absolute -bottom-px left-0 h-[2px]" style={{ width: `${pct}%`, background: c.coral }} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="lg:self-center"><Browser><Video vref={vid} /></Browser></div>
      </div>
    </section>
  );
}


/* ── Round 2 (Marco 2026-11-10: "Ikke rigtig nogle af dem prøv 3 nye"), each copied from a real site's
   product moment (screens in scratchpad/refs): ── */

// Small white card floating over the video, Notion/Superhuman style. Content is taken from the recording itself.
function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`absolute z-10 rounded-2xl bg-white px-4 py-3 text-[0.875rem] shadow-[0_20px_50px_-15px_rgba(32,22,19,0.45)] ring-1 ring-black/5 ${className}`} style={{ color: c.ink }}>{children}</div>;
}

/* V4 Skrivebord, after cal.com: a whole desktop (menu bar + Safari) on a photo wallpaper, full width. */
export function V4() {
  return (
    <section className="py-16 sm:py-24" style={{ background: c.cream }}>
      <div className={wrap}>
        <h2 className={`${h2} mx-auto mb-10 max-w-[18ch] text-center sm:mb-14`} style={{ color: c.ink }}>Sådan ser det ud indefra</h2>
        <div data-reveal className="relative mx-auto max-w-[68rem] overflow-hidden rounded-[24px]">
          <Image src="/img/unsplash/dokk1.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-[#201613]/25" />
          <div className="relative flex h-7 items-center gap-5 bg-black/35 px-4 text-[0.75rem] font-medium text-white backdrop-blur-md">
            <span className="font-bold">Safari</span><span className="hidden sm:inline">Arkiv</span><span className="hidden sm:inline">Rediger</span><span className="hidden sm:inline">Vis</span>
            <span className="ml-auto tabular-nums">tirs. 08.12</span>
          </div>
          <div className="relative px-4 pb-6 pt-6 sm:px-[13%] sm:pb-12 sm:pt-10">
            <div className="shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)]"><Browser><Video /></Browser></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* V5 Over fotoet, after superhuman.com: a full-bleed photo, the app window floating over it, two chips. */
export function V5() {
  return (
    <section className="relative overflow-hidden" style={{ background: c.dark }}>
      <Image src="/img/stock/window-laptop.jpg" alt="" fill sizes="100vw" className="object-cover opacity-70" />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0.85) 0%, rgba(32,22,19,0.2) 35%, rgba(32,22,19,0.35) 100%)" }} />
      <div className={`${wrap} relative pb-20 pt-20 sm:pb-28 sm:pt-24`}>
        <h2 className={`${h2} max-w-[14ch] text-white`}>Sådan ser det ud indefra</h2>
        <div className="relative mt-10 sm:ml-auto sm:mr-[6%] sm:mt-[-2rem] sm:w-[52%]">
          <div className="overflow-hidden rounded-[16px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15"><Video /></div>
          <Chip className="-left-4 top-[48%] hidden sm:block lg:-left-[11.5rem]">
            <span className="flex items-center gap-2 font-semibold"><span className="grid size-5 place-items-center rounded-full bg-[#2fa36b] text-[0.7rem] text-white">✓</span>Rigtigt!</span>
            <span className="mt-0.5 block text-[0.8125rem]" style={{ color: c.muted }}>Quiz efter hver lektion</span>
          </Chip>
          <Chip className="-bottom-6 right-6 hidden sm:block">
            <span className="block text-[0.75rem] font-medium uppercase tracking-wide" style={{ color: c.muted }}>Mit hold</span>
            <span className="mt-0.5 block font-semibold">68 færdige af 400</span>
          </Chip>
        </div>
      </div>
    </section>
  );
}

/* V6 Farveflade, after notion.com: the app window on a big peach block, speech bubbles hanging over its edges. */
export function V6() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "#fff" }}>
      <div className={wrap}>
        <div className="grid gap-4 sm:mb-12 lg:grid-cols-2 lg:items-end">
          <h2 className={h2} style={{ color: c.ink }}>Sådan ser det ud indefra</h2>
          <p className="max-w-[28rem] text-[1rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>Kurser, korte lektioner med quiz og et overblik til lederen. Optaget direkte i platformen.</p>
        </div>
        <div data-reveal className="relative mx-auto mt-8 max-w-[68rem] rounded-[28px] px-4 pt-10 sm:mt-0 sm:px-[12%] sm:pt-14" style={{ background: "linear-gradient(160deg,#fbe2d4 0%,#f6c9b6 55%,#eeb79f 100%)" }}>
          <div className="relative">
            <div className="overflow-hidden rounded-t-[14px] shadow-[0_30px_80px_-30px_rgba(120,50,30,0.55)]"><Browser><Video /></Browser></div>
            <Chip className="-left-3 top-[30%] hidden max-w-[16rem] md:block lg:-left-16">
              <span className="flex items-center gap-2.5"><span className="grid size-8 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold text-white" style={{ background: c.dark }}>SL</span><span><span className="block font-semibold">Sofie Lund</span><span className="block text-[0.8125rem]" style={{ color: c.muted }}>Lektion 1 af 12 · 10 min</span></span></span>
            </Chip>
            <Chip className="-right-3 top-[58%] hidden max-w-[17rem] md:block lg:-right-14">
              <span className="block text-[0.75rem] font-medium uppercase tracking-wide" style={{ color: c.coral }}>Skub fra lederen</span>
              <span className="mt-1 block leading-snug">Hej Sofie, du er tæt på. Tag lige lektion 2 i dag?</span>
            </Chip>
          </div>
        </div>
      </div>
    </section>
  );
}

/* V7 Bare en video (Marco 2026-11-10: "Nej det skal bare være en video man kan trykke på"): a still with a play
   button; one click plays the recording right there, with controls. Nothing else in the section. */
export function V7() {
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(true); const v = vid.current; if (v) { v.currentTime = 0; v.play().catch(() => {}); } };
  return (
    <section className="py-16 sm:py-24" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="relative mx-auto max-w-[62rem] overflow-hidden rounded-[20px] shadow-[0_30px_80px_-30px_rgba(32,22,19,0.45)] ring-1 ring-black/5">
          <video ref={vid} src={SRC} poster={POSTER} controls={playing} playsInline preload="metadata" onEnded={() => setPlaying(false)} className="block aspect-[16/10] w-full bg-white object-cover" aria-label="Skærmoptagelse af Mindforward-platformen" />
          {!playing && (
            <button type="button" onClick={play} aria-label="Afspil video om platformen, 26 sekunder" className="nf-focus group absolute inset-0 grid place-items-center bg-[#201613]/25 transition-colors hover:bg-[#201613]/15">
              <span className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-[0.9375rem] font-semibold shadow-lg transition-transform duration-300 group-hover:scale-105" style={{ color: c.ink }}>
                <span className="grid size-11 place-items-center rounded-full text-white" style={{ background: c.coral }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M3 1.5v11l9.5-5.5z" fill="currentColor" /></svg>
                </span>
                Se platformen · 0:26
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* V8 Video med intro (Marco 2026-11-10): white section; heading + one proof line on the left, text and two
   buttons on the right, the video full width under it with a round play button. Click plays it in place. */
export function V8() {
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(true); const v = vid.current; if (v) { v.currentTime = 0; v.play().catch(() => {}); } };
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={wrap}>
        <div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: c.ink }}>Se platformen indefra</h2>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[0.9375rem]" style={{ color: c.muted }}>
                <span className="font-semibold" style={{ color: c.ink }}>0:26</span>
                <span aria-hidden className="size-1 rounded-full" style={{ background: c.coral }} />
                Optaget direkte i platformen
              </p>
            </div>
            <div className="md:justify-self-end md:pt-1">
              <p className="max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Kurser, korte lektioner med quiz og et overblik til lederen. Sådan ser det ud, når holdet træner.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={appLinks.startBusiness} className="nf-focus nf-press inline-flex h-11 items-center rounded-md px-5 text-[0.9375rem] font-medium text-white" style={{ background: c.dark }}>Tilmeld jer</Link>
                <Link href="/priser" className="nf-focus nf-press inline-flex h-11 items-center gap-1.5 rounded-md border px-5 text-[0.9375rem] font-medium transition-colors hover:bg-black/[0.03]" style={{ borderColor: c.dark, color: c.ink }}>Se priser <span aria-hidden>→</span></Link>
              </div>
            </div>
          </div>
          <div className="relative mt-10 overflow-hidden rounded-[14px] sm:mt-12">
            <video ref={vid} src={SRC} poster={POSTER} controls={playing} playsInline preload="metadata" onEnded={() => setPlaying(false)} className="block aspect-[16/10] w-full bg-[#f7f2ee] object-cover" aria-label="Skærmoptagelse af Mindforward-platformen" />
            {!playing && (
              <button type="button" onClick={play} aria-label="Afspil video om platformen, 26 sekunder" className="nf-focus group absolute inset-0 grid place-items-center">
                <span className="grid size-[4.25rem] place-items-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(32,22,19,0.45)] transition-transform duration-300 group-hover:scale-110" style={{ color: c.coral }}>
                  <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden className="translate-x-[2px]"><path d="M2 2.2v19.6c0 1 1.1 1.6 2 1.1l16.3-9.8c.8-.5.8-1.7 0-2.2L4 1.1C3.1.6 2 1.2 2 2.2z" fill="currentColor" /></svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const videoVersions = { a: V1, b: V2, c: V3, d: V4, e: V5, f: V6, g: V7, h: V8 } as const;
export type VideoVersion = keyof typeof videoVersions;
