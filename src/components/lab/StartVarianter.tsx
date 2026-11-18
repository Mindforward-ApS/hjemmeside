"use client";

// "Sådan starter I" — three versions (Marco 2026-11-05: "det er dårligt, lav 3 versioner af den sektion").
// The old one was three equal photo cards; two of them were mood photos that did not show the step.
// A · Produkt i hvert trin (refs: Linear/Notion steps): every step shows the real screen of that moment.
// B · Scroll gennem ugen (refs: Stripe/Linear scrollytelling): the steps on the left, one sticky product panel
//     on the right that changes as you scroll from Monday to Friday.
// C · Trin på fotoet (refs: Lunar/Pleo UI-on-photo): one wide team photo, the three steps as white cards that
//     overlap its bottom edge.
// Example data everywhere (names and scores are examples, as on the rest of the preview).
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { appLinks } from "@/lib/app";
import { gsap, ScrollTrigger, useGSAP, motionQuery } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { KortOevelse } from "@/components/lab/HeroLive";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { Fit } from "@/components/lab/NyForside";

const c = { dark: "#201613", cream: "#f7f2ee", sand: "#efe7e1", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";

const steps = [
  { n: "01", when: "Mandag", t: "Inviter holdet", d: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget." },
  { n: "02", when: "Hver dag", t: "Ti minutter om dagen", d: "En kort lektion på dansk og en opgave fra jeres egen hverdag i ChatGPT, Copilot eller Claude." },
  { n: "03", when: "Fredag", t: "Se holdets fremskridt", d: "Hver opgave får en score. Du ser hele holdet, og alle får et kursusbevis, når forløbet er klaret." },
];

/* ───── The invite screen (step 1). Example data. ───── */
function InviteCard() {
  const people = [
    { n: "Sofie Lund", s: "Har sagt ja" },
    { n: "Mads Holm", s: "Har sagt ja" },
    { n: "Ida Brandt", s: "Inviteret" },
  ];
  return (
    <div className="w-full max-w-[30rem] rounded-[24px] bg-white p-6 text-[#201613] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between">
        <p className="text-[1.0625rem] font-semibold">Inviter holdet</p>
        <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: "#8a3420" }}>Kundeservice</span>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-[14px] p-1.5 pl-4 text-[0.8125rem]" style={{ background: c.sand }}>
        <span className="min-w-0 flex-1 truncate" style={{ color: c.muted }}>app.mindforward.dk/hold/kundeservice-7f3a</span>
        <span className="shrink-0 whitespace-nowrap rounded-[10px] px-3 py-2 text-[0.8125rem] font-semibold text-white" style={{ background: c.dark }}>Kopiér link</span>
      </div>
      <ul className="mt-4 divide-y divide-black/5">
        {people.map((p) => (
          <li key={p.n} className="flex items-center justify-between py-2.5 text-[0.875rem]">
            <span className="font-medium">{p.n}</span>
            <span className="rounded-full px-2.5 py-0.5 text-[0.75rem] font-medium" style={p.s === "Har sagt ja" ? { background: "#20161310", color: c.ink } : { background: c.coralSoft, color: "#8a3420" }}>{p.s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.8125rem]" style={{ color: c.muted }}>9 af 12 er med · Eksempel</p>
    </div>
  );
}


const screens = [
  <InviteCard key="i" />,
  <Fit key="o" w={340}><KortOevelse /></Fit>,
  <div key="r">
    <KortRangliste />
    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]" style={{ color: c.ink }}>
      <span className="size-2 rounded-full" style={{ background: c.coral }} /> Kursusbevis klar · 9 af 12
    </p>
  </div>,
];

function Cta() {
  return (
    <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href={appLinks.startBusiness} className="group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>
        Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link href="/kontakt" className="text-[0.9375rem] font-medium underline decoration-[rgba(32,22,19,0.3)] underline-offset-4 hover:decoration-current" style={{ color: c.ink }}>Eller book 15 min med os</Link>
    </div>
  );
}

/* ───── A · Produkt i hvert trin ───── */
export function StartA() {
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className={h2} style={{ color: c.ink }}>Sådan starter I</h2>
          <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Fra invitation til holdets første score på under en uge.</p>
        </div>
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="flex min-w-0 flex-col">
              {/* The screen of that moment, on a sand stage of equal height */}
              <div className="flex h-[30rem] items-start justify-center overflow-hidden rounded-[28px] px-6 pt-12" style={{ background: c.sand }}>
                <div className="w-full max-w-[22rem]">{screens[i]}</div>
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className={`${display} text-[2.75rem] leading-none`} style={{ color: c.coral }}>{s.n}</span>
                <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em]" style={{ color: c.muted }}>{s.when}</span>
              </div>
              <h3 className={`${display} mt-2 text-[2.25rem]`} style={{ color: c.ink }}>{s.t}</h3>
              <p className="mt-2 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</p>
            </li>
          ))}
        </ol>
        <Cta />
      </div>
    </section>
  );
}

/* ───── B · Scroll gennem ugen ───── */
export function StartB() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${motionQuery}`, () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: "[data-pin]",
          scrub: true,
          onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
        });
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} style={{ background: c.cream }}>
      <div data-pin className={`${wrap} grid min-h-[100svh] items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[5vw] lg:py-0`}>
        <div className="min-w-0">
          <h2 className={h2} style={{ color: c.ink }}>Sådan starter I</h2>
          <p className="mt-4 max-w-[26rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Fra invitation til holdets første score på under en uge.</p>
          <ol className="mt-10 space-y-2">
            {steps.map((s, i) => (
              <li key={s.n}>
                {/* Phones: every step is open, with its screen right under it. Desktop: one active step at a time. */}
                <button type="button" onClick={() => setActive(i)} className={`grid w-full grid-cols-[3.5rem_1fr] gap-x-4 rounded-[20px] p-4 text-left transition-[background,opacity] duration-300 max-lg:!opacity-100 ${active === i ? "bg-white" : "max-lg:bg-white"}`} style={{ opacity: active === i ? 1 : 0.45 }} aria-current={active === i}>
                  <span className={`${display} row-span-3 text-[2.75rem] leading-none`} style={{ color: active === i ? c.coral : c.ink }}>{s.n}</span>
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em]" style={{ color: c.muted }}>{s.when}</span>
                  <span className={`${display} text-[2rem]`} style={{ color: c.ink }}>{s.t}</span>
                  <span className={`col-start-2 grid transition-[grid-template-rows] duration-500 max-lg:grid-rows-[1fr] ${active === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <span className="overflow-hidden text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</span>
                  </span>
                </button>
                <div className="mt-3 flex justify-center rounded-[24px] p-5 lg:hidden" style={{ background: "linear-gradient(160deg, #3a2722 0%, #201613 75%)" }}>
                  <div className="w-full max-w-[24rem]">{screens[i]}</div>
                </div>
              </li>
            ))}
          </ol>
          <Cta />
        </div>
        {/* One product panel; the screen changes with the active step */}
        <div className="relative hidden h-[36rem] items-center justify-center overflow-hidden rounded-[32px] p-8 lg:flex" style={{ background: "linear-gradient(160deg, #3a2722 0%, #201613 75%)" }}>
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.22), transparent)" }} />
          {screens.map((sc, i) => (
            <div key={i} className="absolute inset-0 flex items-start justify-center px-8 pt-24 transition-[opacity,transform] duration-500" style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : `translateY(${i < active ? -24 : 24}px)` }} aria-hidden={active !== i}>
              <div className="w-full max-w-[31rem]">{sc}</div>
            </div>
          ))}
          <span className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-semibold text-white/85">{steps[active].when}</span>
        </div>
      </div>
    </section>
  );
}

/* ───── C · Trin på fotoet ───── */
export function StartC() {
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="relative overflow-hidden rounded-[32px]">
          <div className="relative h-[28rem] lg:h-[34rem]">
            <Image src="/img/unsplash/team.jpg" alt="Et hold samlet om en laptop" fill sizes="100vw" className="object-cover object-[50%_35%]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0.55) 0%, rgba(32,22,19,0.15) 45%, rgba(32,22,19,0.75) 100%)" }} />
            <div className="absolute left-6 top-6 lg:left-10 lg:top-10">
              <h2 className={`${h2} text-white`}>Sådan starter I</h2>
              <p className="mt-3 max-w-[24rem] text-[1.0625rem] leading-relaxed text-white/85">Fra invitation til holdets første score på under en uge.</p>
            </div>
          </div>
        </div>
        {/* The steps overlap the photo's bottom edge */}
        <ol className="relative z-10 -mt-24 grid gap-4 px-3 lg:-mt-28 lg:grid-cols-3 lg:px-8">
          {steps.map((s, i) => (
            <li key={s.n} className="rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(32,22,19,0.45)]">
              <div className="flex items-center justify-between">
                <span className={`${display} text-[2.5rem] leading-none`} style={{ color: c.coral }}>{s.n}</span>
                <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold" style={{ background: c.sand, color: c.ink }}>{s.when}</span>
              </div>
              <h3 className={`${display} mt-4 text-[2rem]`} style={{ color: c.ink }}>{s.t}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</p>
              <div className="mt-5 rounded-[16px] p-3" style={{ background: c.sand }}>
                {i === 0 && <p className="flex items-center justify-between text-[0.8125rem]"><span className="truncate" style={{ color: c.muted }}>app.mindforward.dk/hold/…</span><span className="rounded-[8px] px-2.5 py-1 font-semibold text-white" style={{ background: c.dark }}>Kopiér link</span></p>}
                {i === 1 && <p className="flex items-center gap-3 text-[0.8125rem]"><span className="grid size-9 place-items-center rounded-full font-bold" style={{ background: c.coral, color: c.ink }}>10</span><span><strong>Lektion 4</strong> · Få AI til at stille spørgsmål tilbage</span></p>}
                {i === 2 && <p className="flex items-center justify-between text-[0.8125rem]"><span>Holdets score</span><span className={`${display} text-[1.75rem] leading-none`}>86 <span className="text-[0.875rem] font-normal normal-case" style={{ color: c.muted }}>/ 100</span></span></p>}
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:px-8"><Cta /></div>
      </div>
    </section>
  );
}
