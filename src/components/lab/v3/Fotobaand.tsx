// Round 3 of the band "Ét hold. Ingen teori for teoriens skyld." (Marco 2026-11-03). Same heading and line.
// Photos only where they show the team; the rest is product cards with example data.
import Image from "next/image";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { ScoreKurve } from "@/components/lab/ScoreKort";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", sand: "#efe7e1", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#efe8e3" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const H = "Ét hold. Ingen teori for teoriens skyld.";
const P = "Korte lektioner, opgaver fra jeres egen hverdag og feedback med det samme.";
const BROWN = "linear-gradient(155deg, #8a4e3b 0%, #6b3a2c 45%, #4a281f 100%)";

/* A · Holdet på billedet: the team photo with the heading on it, and the team's top 3 card standing on the photo's edge. */
export function A() {
  return (
    <section className="bg-white pb-24 lg:pb-32">
      <div className={wrap}>
        <div className="relative">
          <div className="relative h-[28rem] overflow-hidden rounded-[32px] sm:h-[36rem]">
            <Image src="/img/unsplash/team.jpg" alt="Et hold, der kigger på den samme laptop" fill sizes="100vw" className="object-cover object-[40%_35%]" />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(32,22,19,0.85) 0%, rgba(32,22,19,0.5) 40%, transparent 70%), linear-gradient(0deg, rgba(32,22,19,0.5) 0%, transparent 50%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-7 pb-24 sm:p-12 sm:pb-28 lg:max-w-[60%] lg:pb-12">
              <h2 className={`${h2} max-w-[11ch] !text-white`}>{H}</h2>
              <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-white/75">{P}</p>
            </div>
          </div>
          <div className="relative z-10 -mt-16 px-4 sm:px-8 lg:absolute lg:-bottom-12 lg:right-12 lg:mt-0 lg:w-[26rem] lg:px-0">
            <KortRangliste />
          </div>
        </div>
      </div>
    </section>
  );
}

/* B · Holdets uge: no photo. The heading over one wide brown card: minutes per day for the team, and who is active. */
const days = [
  { d: "Man", m: 46 }, { d: "Tir", m: 62 }, { d: "Ons", m: 38 }, { d: "Tor", m: 74 }, { d: "Fre", m: 29 },
];
const faces = ["/img/people/mette-krogh.webp", "/img/people/jonas-bak.webp", "/img/people/line-vestergaard.webp", "/img/people/sara-damgaard.webp", "/img/people/peter-skov.webp"];
export function B() {
  const max = 80;
  return (
    <section className="bg-white pb-24 lg:pb-32">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className={`${h2} max-w-[14ch]`} style={{ color: c.ink }}>{H}</h2>
          <p className="max-w-[28rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{P}</p>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-[32px] text-white lg:grid-cols-[1.5fr_1fr]" style={{ background: BROWN }}>
          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/60">Holdets uge · uge 45</p>
                <p className="mt-2 text-[3rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">249 <span className="text-[1rem] font-normal tracking-normal text-white/60">min</span></p>
              </div>
              <span className="rounded-full px-3 py-1.5 text-[0.75rem] font-semibold" style={{ background: "rgba(255,255,255,0.14)", color: c.peach }}>▲ 18 % fra sidste uge</span>
            </div>
            <div className="mt-10 grid h-48 grid-cols-5 items-end gap-3 sm:gap-6" aria-label="Minutter pr. dag: man 46, tir 62, ons 38, tor 74, fre 29">
              {days.map((x) => (
                <div key={x.d} className="flex h-full flex-col items-center justify-end gap-2">
                  <span className="text-[0.75rem] tabular-nums text-white/70">{x.m}</span>
                  <div className="w-full max-w-[3.5rem] rounded-t-[10px] rounded-b-[4px]" style={{ height: `${(x.m / max) * 100}%`, background: x.m === 74 ? c.coral : "rgba(255,255,255,0.22)" }} />
                  <span className="text-[0.75rem] text-white/60">{x.d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid content-between gap-8 border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/60">Aktive i denne uge</p>
              <p className="mt-2 text-[2.25rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">11 <span className="text-[1rem] font-normal text-white/60">af 12</span></p>
              <div className="mt-4 flex -space-x-2">
                {faces.map((s) => <span key={s} className="relative size-10 overflow-hidden rounded-full ring-2 ring-[#5a3226]"><Image src={s} alt="" fill sizes="40px" className="object-cover object-top" /></span>)}
                <span className="grid size-10 place-items-center rounded-full bg-white/15 text-[0.75rem] font-semibold ring-2 ring-[#5a3226]">+6</span>
              </div>
            </div>
            <ul className="grid gap-3 text-[0.875rem]">
              {[["Lektioner gennemført", "37"], ["Opgaver i øvemiljøet", "52"], ["Gns. score", "81"]].map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between border-t border-white/10 pt-3"><span className="text-white/70">{k}</span><span className="text-[1.125rem] font-semibold tabular-nums">{v}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Mosaik: the heading on cream, then a mosaic of three different things a team gets: the room, the score and the certificate. */
export function C() {
  return (
    <section className="pb-24 pt-20 lg:pb-32 lg:pt-28" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="max-w-[46rem]">
          <h2 className={h2} style={{ color: c.ink }}>{H}</h2>
          <p className="mt-5 max-w-[28rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{P}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-[auto_auto]">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[28px] lg:row-span-2">
            <Image src="/img/unsplash/feedback.jpg" alt="Underviser forklarer ved en whiteboard, set over skulderen på en deltager" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover object-[60%_30%]" />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold" style={{ color: c.ink }}>Opgaver fra jeres egen hverdag</span>
          </div>
          <div className="grid place-items-center rounded-[28px] p-5 sm:p-8" style={{ background: c.sand }}>
            <ScoreKurve />
          </div>
          <div className="relative grid place-items-center overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: c.peach }}>
            <div className="relative aspect-[2248/1588] w-full max-w-[26rem] -rotate-2 overflow-hidden rounded-[6px] shadow-[0_30px_60px_-25px_rgba(32,22,19,0.55)]">
              <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis for Sofie Lund, AI på arbejdet, niveau 1" fill sizes="(min-width:1024px) 26rem, 90vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
