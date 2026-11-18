"use client";

// Team section at the bottom of the page (Marco 2026-11-03, reference: "Meet Our Team" with cut-out people rising out
// of gradient pills on a colour band, ~/Downloads/5986e89846455f69c442d7da9b0db48d.webp). Our palette, no pink.
// PLACEHOLDERS: the photos are example portraits, not the real team; names/roles swap when real photos arrive.
import Image from "next/image";
import { useState } from "react";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7", sand: "#efe7e1" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "mx-auto w-full max-w-[84rem] px-5 sm:px-[3.5vw]";

type Person = { n: string; r: string; img: string; w: number; h: number };
const team: Person[] = [
  { n: "Line Vestergaard", r: "Stifter og kursusansvarlig", img: "/img/people/cut/line-vestergaard.webp", w: 510, h: 641 },
  { n: "Jonas Bak", r: "Underviser, Copilot og ChatGPT", img: "/img/people/cut/jonas-bak.webp", w: 535, h: 653 },
  { n: "Mette Krogh", r: "Kundeansvarlig", img: "/img/people/cut/mette-krogh.webp", w: 448, h: 562 },
  { n: "Ali Yilmaz", r: "Underviser, Claude", img: "/img/people/cut/ali-yilmaz.webp", w: 463, h: 525 },
];

function LinkedIn({ dark = false }: { dark?: boolean }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-[7px]" style={{ background: dark ? c.dark : "#fff", color: dark ? "#fff" : c.ink }} aria-hidden>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zm7 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>
    </span>
  );
}

/* One card: the person rises out of a pill. The pill clips the body at its rounded bottom; the head stands free above. */
function PillCard({ p, pill, shade = true, dark = false }: { p: Person; pill: string; shade?: boolean; dark?: boolean }) {
  return (
    <figure className="relative h-[19.5rem] w-full">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[10.5rem] rounded-full" style={{ background: pill }} />
      <div className="absolute inset-0" style={{ clipPath: "inset(0 round 0 0 5.25rem 5.25rem)" }}>
        <Image src={p.img} alt="" width={p.w} height={p.h} sizes="16rem" className="absolute -bottom-12 left-1/2 h-[20rem] w-auto max-w-none -translate-x-1/2" />
        {shade && <div aria-hidden className="absolute inset-x-0 bottom-0 h-[10.5rem] rounded-full" style={{ background: "linear-gradient(0deg, rgba(32,22,19,0.9) 0%, rgba(32,22,19,0.6) 30%, rgba(32,22,19,0.18) 65%, rgba(32,22,19,0) 100%)" }} />}
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-8 pb-7">
        <span className="min-w-0">
          <span className={`block truncate text-[1.0625rem] font-semibold ${shade || dark ? "text-white" : ""}`} style={shade || dark ? undefined : { color: c.ink }}>{p.n}</span>
          <span className={`block text-[0.8125rem] leading-snug ${shade || dark ? "text-white/75" : ""}`} style={shade || dark ? undefined : { color: c.muted }}>{p.r}</span>
        </span>
        <LinkedIn dark={!shade && !dark} />
      </figcaption>
    </figure>
  );
}

/* Mobile: the row becomes a snap carousel with live dots; desktop shows all cards. */
function Row({ people, render, cols }: { people: Person[]; render: (p: Person) => React.ReactNode; cols: string }) {
  const [i, setI] = useState(0);
  return (
    <>
      <div onScroll={(e) => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / (el.scrollWidth / people.length))); }}
        className={`-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:grid md:overflow-visible md:px-0 ${cols}`}>
        {people.map((p) => <div key={p.n} className="w-[80%] shrink-0 snap-center md:w-auto">{render(p)}</div>)}
      </div>
      <div className="mt-6 flex justify-center gap-1.5 md:hidden" aria-hidden>
        {people.map((p, k) => <span key={p.n} className="h-1.5 rounded-full transition-all duration-300" style={{ width: k === i ? 22 : 6, background: k === i ? c.coral : "rgba(32,22,19,0.2)" }} />)}
      </div>
    </>
  );
}

const pillWarm = "linear-gradient(100deg, #f6c9b6 0%, #f09a7d 55%, #e8664a 100%)";

/* A · Som referencen, målt (ref 930 px bred → ×1.44): lille overskrift tæt over hovederne; personerne står 147 px over
   pillen og fylder ~83 % af dens bredde; pillen 187 px høj; båndet starter ved pillernes midte, løber kant til kant og
   slutter ~70 px under dem, med prikkerne i; en skrå koral-ellipse om det midterste kort. Tre ad gangen, prikkerne kan klikkes. */
function RefCard({ p, swoosh = false }: { p: Person; swoosh?: boolean }) {
  // Swoosh: one tilted ellipse drawn twice: the back arc behind the pill, the front arc over the person (reference).
  const ell = <ellipse cx="200" cy="85" rx="196" ry="58" transform="rotate(-13 200 85)" stroke={c.coral} strokeWidth="1.6" fill="none" />;
  return (
    <figure className="group relative h-[20.9rem] [--lift:0px] hover:[--lift:-8px]">
      {swoosh && <svg aria-hidden className="pointer-events-none absolute -left-[4%] bottom-[-1.6rem] z-0 h-[10.5rem] w-[118%]" viewBox="0 0 400 170" preserveAspectRatio="none" style={{ clipPath: "inset(0 0 52% 0)" }}>{ell}</svg>}
      {/* Pill: luminous peach → coral, a soft highlight top-left, a faint inner rim */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-[11.7rem] rounded-full shadow-[0_30px_60px_-30px_rgba(232,102,74,0.55)] transition-[filter] duration-500 group-hover:brightness-105"
        style={{ background: "radial-gradient(120% 90% at 18% 10%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%), linear-gradient(100deg, #fbd9c9 0%, #f4a98c 48%, #e8664a 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }} />
      <div className="absolute inset-0 z-[2]" style={{ clipPath: "inset(-2rem 0 0 0 round 0 0 5.85rem 5.85rem)" }}>
        <Image src={p.img} alt="" width={p.w} height={p.h} sizes="22rem"
          className="absolute left-1/2 top-0 h-[28rem] w-auto max-w-none -translate-x-1/2 translate-y-[var(--lift)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        {/* Only the lowest part darkens, so the pill stays bright (no mud) and the name reads */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[11.7rem] rounded-full" style={{ background: "linear-gradient(0deg, rgba(32,22,19,0.86) 0%, rgba(32,22,19,0.5) 26%, rgba(32,22,19,0) 52%)" }} />
      </div>
      {swoosh && <svg aria-hidden className="pointer-events-none absolute -left-[4%] bottom-[-1.6rem] z-[3] h-[10.5rem] w-[118%]" viewBox="0 0 400 170" preserveAspectRatio="none" style={{ clipPath: "inset(48% 0 0 0)" }}>{ell}</svg>}
      <figcaption className="absolute inset-x-0 bottom-0 z-[4] flex items-center justify-between gap-3 pb-9 pl-[13%] pr-[11%] [text-shadow:0_1px_12px_rgba(32,22,19,0.35)]">
        <span className="min-w-0">
          <span className="block truncate text-[1.125rem] font-semibold tracking-[-0.01em] text-white">{p.n}</span>
          <span className="mt-0.5 block truncate text-[0.8125rem] text-white/85">{p.r}</span>
        </span>
        <LinkedIn />
      </figcaption>
    </figure>
  );
}

export function A() {
  const people = team;
  const pages = people.length - 2;
  const [start, setStart] = useState(0);
  const [mi, setMi] = useState(0);
  const dot = (on: boolean) => ({ width: on ? 28 : 7, background: on ? c.coral : "#e6c3ae" });
  return (
    <section className="py-16 lg:py-24" style={{ background: c.cream }}>
      <div className={wrap}>
        {/* The section sits in a white card with a hairline rim, like the reference; the band bleeds to its edges. */}
        <div className="relative overflow-hidden rounded-[28px] bg-white pt-12 shadow-[0_1px_0_rgba(32,22,19,0.04),0_30px_80px_-50px_rgba(32,22,19,0.35)] ring-1 ring-[#ecdfd6] lg:pt-16">
          {/* FORSLAG: overskriften er ny. */}
          <h2 className="px-6 text-[1.875rem] font-medium tracking-[-0.025em] sm:pl-[7%]" style={{ color: c.ink }}>Mød holdet</h2>
          <div className="relative mt-6">
            <div aria-hidden className="absolute inset-x-0 bottom-0 top-[9.6rem]" style={{ background: "linear-gradient(90deg, #fbf0e2 0%, #fbe0d0 45%, #f7cdbb 100%)" }} />
            {/* Desktop: three at a time */}
            <div className="relative hidden px-[5%] pb-[4.6rem] md:block">
              <div className="overflow-hidden pt-4"><div className="flex gap-[3%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(calc(${-start} * (100% + 3%) / 3))` }}>
                {people.map((p, k) => <div key={p.n} className="w-[31.33%] shrink-0"><RefCard p={p} swoosh={k === start + 1} /></div>)}
              </div></div>
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-1.5">
                {Array.from({ length: pages }, (_, k) => (
                  <button key={k} type="button" onClick={() => setStart(k)} aria-label={`Vis hold ${k + 1}`} className="grid h-4 place-items-center">
                    <span className="block h-[7px] rounded-full transition-all duration-300" style={dot(k === start)} />
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile: swipe one at a time */}
            <div className="relative md:hidden">
              <div onScroll={(e) => { const el = e.currentTarget; setMi(Math.round(el.scrollLeft / (el.scrollWidth / people.length))); }} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-16 pt-2 [scrollbar-width:none]">
                {people.map((p) => <div key={p.n} className="w-[86%] shrink-0 snap-center"><RefCard p={p} /></div>)}
              </div>
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-1.5" aria-hidden>
                {people.map((p, k) => <span key={p.n} className="h-[7px] rounded-full transition-all duration-300" style={dot(k === mi)} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* B · Mørk scene: heading left and line right, four pills on a dark band; names in white under the shade. */
export function B() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className={wrap}>
        <div className="relative overflow-hidden rounded-[32px] px-5 pb-10 pt-12 sm:px-10 lg:px-14 lg:pt-16" style={{ background: c.dark }}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${display} text-[clamp(2.5rem,1.9rem+2vw,3.5rem)] !text-white`}>Mød holdet</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-medium text-white/70">Pladsholder-fotos</span>
          </div>
          <div className="relative mt-10">
            <Row people={team} cols="md:grid-cols-2 md:gap-6 lg:grid-cols-4" render={(p) => <PillCard p={p} pill={pillWarm} />} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Lys og rolig: cream pills without shade, names below the pill like a caption, four people. */
export function C() {
  return (
    <section className="py-20 lg:py-28" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="mx-auto max-w-[36rem] text-center">
          <h2 className={`${display} text-[clamp(2.5rem,1.9rem+2vw,3.5rem)]`} style={{ color: c.ink }}>Mød holdet</h2>
          <span className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-[0.75rem] font-medium" style={{ color: c.muted }}>Pladsholder-fotos</span>
        </div>
        <div className="mt-12">
          <Row people={team} cols="md:grid-cols-2 md:gap-6 lg:grid-cols-4" render={(p) => (
            <div>
              <div className="relative h-[17rem]">
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-[9.5rem] rounded-full" style={{ background: "linear-gradient(180deg, #fbe1d7 0%, #f6c9b6 100%)" }} />
                <div className="absolute inset-0" style={{ clipPath: "inset(0 round 0 0 4.75rem 4.75rem)" }}>
                  <Image src={p.img} alt="" width={p.w} height={p.h} sizes="16rem" className="absolute -bottom-10 left-1/2 h-[17.5rem] w-auto max-w-none -translate-x-1/2" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 px-2">
                <div className="min-w-0"><p className="truncate text-[1.0625rem] font-semibold" style={{ color: c.ink }}>{p.n}</p><p className="truncate text-[0.8125rem]" style={{ color: c.muted }}>{p.r}</p></div>
                <LinkedIn dark />
              </div>
            </div>
          )} />
        </div>
      </div>
    </section>
  );
}
