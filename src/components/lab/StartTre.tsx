"use client";

// "Sådan kommer I i gang", three new versions (Marco 2026-11-11: "klart det svageste … skal være meget bedre").
// Each step shows a small piece of the real product (invitation, lesson, score, team) instead of an abstract mark.
// Approved heading and step copy; the numbers in the product pieces are example data.
// A · Tidslinje: numbered dots on one line, a card per step with its product piece.
// B · Fast venstre: heading and button stay put on the left while four big step cards scroll past on the right.
// C · Bento: one big first step, the other three around it in a grid, each with its product piece.
import Link from "next/link";
import { appLinks } from "@/lib/app";
import { UiStage } from "@/components/lab/uiMotion";
import { UiInvite, UiLesson, UiScore, UiTeam } from "@/components/lab/StartCalendly";

const c = { ink: "#201613", cta: "linear-gradient(90deg, #fb970a, #f8400a)" /* M logo gradient, Marco 2026-11-23 */, muted: "#6b625d", coral: "#e8664a", coralText: "#b8452c", page: "#f5f2ef", dark: "#201613", tray: "#fbefe8" };
const wrap = "w-full px-5 sm:px-[3.5vw]";
const head = "font-[family-name:var(--font-geist)] !font-semibold tracking-[-0.045em]";
const h2 = `${head} text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143]`;
const HEAD = "Fra invitation til første score på en uge";
const PARA = "AI-træning plejer at drukne i hverdagen. Mindforward deler den op i fire små trin, så hele holdet kommer i gang uden kursusdage og uden at nogen skal installere noget.";
const steps = [
  { n: "01", t: "Inviter", d: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget.", ui: UiInvite },
  { n: "02", t: "Lær", d: "Ti minutter om dagen på dansk, i det værktøj I bruger.", ui: UiLesson },
  { n: "03", t: "Øv", d: "Hver lektion slutter med en opgave fra jeres egen hverdag.", ui: UiScore },
  { n: "04", t: "Følg op", d: "Du ser holdets fremskridt, og alle får et kursusbevis.", ui: UiTeam },
];

function Label() {
  return (
    <p className="flex items-center gap-2 text-[0.875rem] font-medium leading-6" style={{ color: c.ink }}>
      <span aria-hidden className="size-[18px] rounded-[6px]" style={{ background: c.coral }} />Sådan kommer I i gang
    </p>
  );
}
function Pill() {
  return (
    <Link href={appLinks.startBusiness} className="nf-focus nf-press group inline-flex h-14 items-center gap-2.5 rounded-[52px] px-7 text-[1rem] font-bold tracking-[-0.5px]" style={{ background: c.cta, color: c.ink }}>
      Start et kursus
      <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </Link>
  );
}
// The product piece on a soft tray; plays its little animation when it scrolls into view.
function Tray({ ui, className = "" }: { ui: React.ReactNode; className?: string }) {
  return (
    <div className={`grid place-items-center rounded-[18px] p-5 ${className}`} style={{ background: c.tray }}>
      <div className="w-full max-w-[19rem]"><UiStage active>{ui}</UiStage></div>
    </div>
  );
}

/* A · Tidslinje */
export function A() {
  return (
    <section id="start" className="py-[120px]">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-24">
          <div><Label /><h2 className={`${h2} mt-4 max-w-[15ch]`} style={{ color: c.ink }}>{HEAD}</h2></div>
          <div className="lg:justify-self-end"><p className="max-w-[30rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p><div className="mt-6"><Pill /></div></div>
        </div>
        <ol className="relative mt-16 grid gap-5 lg:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-[19px] hidden h-px lg:block" style={{ background: "rgba(32,22,19,0.18)" }} />
          {steps.map((s) => (
            <li key={s.n} className="relative flex flex-col">
              <span className="relative z-10 grid size-10 place-items-center rounded-full text-[0.875rem] font-bold" style={{ background: c.dark, color: "#fff" }}>{s.n}</span>
              <div className="mt-6 flex flex-1 flex-col rounded-[24px] bg-white p-3">
                <Tray ui={s.ui} className="h-[14.5rem]" />
                <div className="p-4">
                  <h3 className={`${head} text-[1.5rem] leading-8 tracking-[-0.5px]`} style={{ color: c.ink }}>{s.t}</h3>
                  <p className="mt-2 text-[1rem] leading-6" style={{ color: c.muted }}>{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* B · Fast venstre */
export function B() {
  return (
    <section id="start" className="py-[120px]">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Label />
          <h2 className={`${h2} mt-4 max-w-[13ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-6 max-w-[28rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p>
          <ol className="mt-8 grid gap-2 text-[1rem] font-semibold" style={{ color: c.ink }}>
            {steps.map((s) => <li key={s.n} className="flex items-center gap-3"><span className="text-[0.8125rem] tabular-nums" style={{ color: c.coralText }}>{s.n}</span>{s.t}</li>)}
          </ol>
          <div className="mt-10"><Pill /></div>
        </div>
        <ol className="grid gap-5">
          {steps.map((s) => (
            <li key={s.n} className="grid items-center gap-6 rounded-[28px] bg-white p-3 sm:grid-cols-[1fr_1.1fr]">
              <div className="p-5 sm:p-7">
                <span className="text-[0.875rem] font-bold tabular-nums" style={{ color: c.coralText }}>Trin {s.n}</span>
                <h3 className={`${head} mt-3 text-[2rem] leading-10 tracking-[-1px]`} style={{ color: c.ink }}>{s.t}</h3>
                <p className="mt-3 text-[1rem] leading-6" style={{ color: c.muted }}>{s.d}</p>
              </div>
              <Tray ui={s.ui} className="min-h-[15rem]" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* C · Bento */
export function C() {
  const [a, b, cc, d] = steps;
  const Text = ({ s, big = false }: { s: (typeof steps)[number]; big?: boolean }) => (
    <div className="p-5">
      <span className="text-[0.875rem] font-bold tabular-nums" style={{ color: c.coralText }}>{s.n}</span>
      <h3 className={`${head} mt-2 ${big ? "text-[2.25rem] leading-[44px]" : "text-[1.5rem] leading-8"} tracking-[-0.6px]`} style={{ color: c.ink }}>{s.t}</h3>
      <p className="mt-2 max-w-[26rem] text-[1rem] leading-6" style={{ color: c.muted }}>{s.d}</p>
    </div>
  );
  return (
    <section id="start" className="py-[120px]">
      <div className={wrap}>
        <div className="flex flex-col items-center text-center">
          <Label />
          <h2 className={`${h2} mt-4 max-w-[16ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[36rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col rounded-[28px] bg-white p-3 md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Tray ui={a.ui} className="min-h-[18rem] flex-1" />
            <Text s={a} big />
          </div>
          {[b, cc, d].map((s) => (
            <div key={s.n} className="flex flex-col rounded-[28px] bg-white p-3">
              <Tray ui={s.ui} className="h-[14.5rem]" />
              <Text s={s} />
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-[28px] p-8" style={{ background: c.dark }}>
            <p className={`${head} text-[1.75rem] leading-9 tracking-[-0.6px] text-white`}>Klar til at prøve med jeres hold?</p>
            <div className="mt-8"><Pill /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
