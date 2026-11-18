"use client";

// "Én pris pr. bruger" round 2 (Marco 2026-11-05: "ikke helt der"). Each version copies one real pricing page
// closely (captures in design/references/pris/), with our colours and copy. No invented plans or prices.
// A · Calendly: an inset sand panel; heading left and text right; one wide card with a gradient border, the price
//     on the left and the included items in groups with small icon tiles.
// B · Pleo: white, centred heading; three hairline columns; the price column is filled (coral soft), with
//     "69 kr." over a rule and a square dark button.
// C · Loom: centred heading with a "Holdstørrelse" field; the plan card (gradient ring) shows the total for the team,
//     next to a quiet "Over 400 brugere?" card that books a call.
import Link from "next/link";
import { useId, useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { UiStage } from "@/components/lab/uiMotion";

const c = { ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", cream: "#f7f2ee", sand: "#f3eee8", line: "rgba(32,22,19,0.12)" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const PARA = "Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.";
const kr = (n: number) => n.toLocaleString("da-DK");
const groups = [
  { i: "sparkle" as const, t: "Kurserne", items: ["ChatGPT, Copilot og Claude, side om side", "10 min pr. lektion", "1–2 timer for et helt kursus"] },
  { i: "user" as const, t: "Til lederen", items: ["Teamoverblik og rapport til lederen", "Kursusbevis med navn og unikt ID"] },
  { i: "lock" as const, t: "Data og sikkerhed", items: ["Hostet i EU, data i Frankfurt", "Databehandleraftale"] },
];
const Check = ({ size = 15 }: { size?: number }) => <span className="mt-[3px] shrink-0" style={{ color: c.ink }}><Icon name="check" size={size} /></span>;

/* ───── A · Calendly ───── */
export function A() {
  return (
    <section id="pris" className="scroll-mt-6 py-16 lg:py-24" style={{ background: c.sand }}>
      <div>
        <div className={wrap}>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <h2 className={h2} style={{ color: c.ink }}>Én pris pr. bruger</h2>
            <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          </div>
          {/* Gradient ring like Calendly's highlighted plan: a 3px gradient frame around a cream card */}
          <div className="mt-12 rounded-[30px] p-[3px] shadow-[0_30px_60px_-40px_rgba(32,22,19,0.5)]" style={{ background: `linear-gradient(160deg, ${c.coral} 0%, #f2a58f 45%, #e9d9cf 100%)` }}>
            <p className="px-6 pb-2 pt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white">Én plan · alt inkluderet</p>
            <div className="grid rounded-[27px] bg-[#fdfbf9] lg:grid-cols-[22rem_1fr]">
              <div className="border-b p-8 sm:p-10 lg:border-b-0 lg:border-r" style={{ borderColor: c.line }}>
                <p className="text-[1.75rem] font-semibold tracking-[-0.02em]" style={{ color: c.ink }}>Virksomhed</p>
                <p className="mt-1 text-[0.9375rem]" style={{ color: c.muted }}>Til hele holdet, fra 5 brugere</p>
                <p className="mt-8 flex items-baseline gap-1.5" style={{ color: c.ink }}>
                  <span className="whitespace-nowrap text-[3.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">69 kr.</span>
                  <span className="text-[0.8125rem]" style={{ color: c.muted }}>/bruger/md.</span>
                </p>
                <UiStage><span className="ui-badge mt-3 inline-block rounded-[6px] px-2 py-0.5 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: c.ink, ["--d" as string]: "300ms" }}>Ingen binding</span></UiStage>
                <Link href={appLinks.startBusiness} data-btn="primary" className="group mt-7 flex h-12 items-center justify-between rounded-[10px] px-5 text-[0.9375rem] font-semibold text-white transition-[filter] hover:brightness-125" style={{ background: c.ink }}>
                  Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/kontakt" data-btn="ghost" className="group mt-3 flex h-12 items-center justify-between rounded-[10px] px-5 text-[0.9375rem] font-semibold ring-1 transition-colors hover:bg-white" style={{ color: c.ink, ["--tw-ring-color" as string]: "rgba(32,22,19,0.25)" }}>
                  Book 15 min <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <UiStage className="grid gap-8 p-8 sm:p-10 md:grid-cols-3">
                {groups.map((g, gi) => (
                  <div key={g.t}>
                    <p className="flex items-center gap-2.5 text-[1rem] font-semibold" style={{ color: c.ink }}>
                      <span className="grid size-7 place-items-center rounded-[7px]" style={{ background: c.coralSoft, color: c.coral }}><Icon name={g.i} size={14} /></span>{g.t}
                    </p>
                    <ul className="mt-4 grid gap-3">
                      {g.items.map((x, k) => <li key={x} className="ui-pop flex gap-2.5 text-[0.9375rem] leading-snug" style={{ color: c.ink, ["--d" as string]: `${200 + gi * 300 + k * 120}ms` }}><Check />{x}</li>)}
                    </ul>
                  </div>
                ))}
              </UiStage>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── B · Pleo ───── */
export function B() {
  const cols = [
    { t: "Kurserne", d: "Korte lektioner, der passer ind i en travl dag.", big: "10 min", unit: "pr. lektion", meta: ["1–2 timer for et helt kursus", "Øv på jeres egne opgaver"], head: "Alle tre værktøjer", items: ["ChatGPT", "Copilot", "Claude, side om side"] },
    { t: "Data og sikkerhed", d: "Bygget til danske virksomheder fra dag ét.", big: "EU", unit: "data i Frankfurt", meta: ["Hostet i EU", "Databehandleraftale"], head: "Til lederen", items: ["Teamoverblik", "Rapport til lederen", "Kursusbevis med navn og unikt ID"] },
  ];
  return (
    <section id="pris" className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <h2 className={`${h2} text-center`} style={{ color: c.ink }}>Én pris pr. bruger</h2>
        <p className="mx-auto mt-5 max-w-[30rem] text-center text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
        <div className="mx-auto mt-14 grid max-w-[74rem] lg:grid-cols-3">
          {cols.map((k) => (
            <div key={k.t} className="border-b px-1 py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-8" style={{ borderColor: c.line }}>
              <PleoCol {...k} />
            </div>
          ))}
          <div className="mt-8 rounded-[4px] p-7 sm:p-8 lg:mt-0" style={{ background: c.coralSoft }}>
            <p className="text-[1.75rem] font-medium tracking-[-0.01em]" style={{ color: c.ink }}>Virksomhed</p>
            <p className="mt-3 min-h-[3rem] text-[0.9375rem] leading-snug" style={{ color: c.ink }}>Alt er med. Én pris for hele holdet.</p>
            <p className="mt-6 flex items-baseline gap-1.5 border-b pb-3" style={{ color: c.ink, borderColor: c.ink }}>
              <span className="text-[3rem] font-medium leading-none tracking-[-0.03em] tabular-nums">69 kr.</span><span className="text-[0.875rem]">pr. bruger/måned</span>
            </p>
            <p className="mt-4 text-[0.9375rem]" style={{ color: c.ink }}>Ingen binding</p>
            <p className="mt-1.5 text-[0.9375rem]" style={{ color: c.ink }}>Minimum 5 brugere</p>
            <Link href={appLinks.startBusiness} className="mt-8 flex h-12 items-center justify-center text-[0.9375rem] font-medium text-white transition-[filter] hover:brightness-150" style={{ background: c.ink }}>Start et kursus</Link>
            <Link href="/kontakt" className="mt-3 flex h-12 items-center justify-center text-[0.9375rem] font-medium ring-1 ring-inset transition-colors hover:bg-white/50" style={{ color: c.ink, ["--tw-ring-color" as string]: c.ink }}>Book 15 min</Link>
            <p className="mt-9 text-[1.25rem] font-medium" style={{ color: c.ink }}>Inkluderet:</p>
            <ul className="mt-3 grid gap-2">
              {["ChatGPT, Copilot og Claude", "Teamoverblik og rapport", "Kursusbevis med unikt ID", "Databehandleraftale"].map((x) => <li key={x} className="flex gap-2.5 text-[0.9375rem]" style={{ color: c.ink }}><Check size={14} />{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
function PleoCol({ t, d, big, unit, meta, head, items }: { t: string; d: string; big: string; unit: string; meta: string[]; head: string; items: string[] }) {
  return (
    <>
      <p className="text-[1.75rem] font-medium tracking-[-0.01em]" style={{ color: c.ink }}>{t}</p>
      <p className="mt-3 min-h-[3rem] text-[0.9375rem] leading-snug" style={{ color: c.ink }}>{d}</p>
      <p className="mt-6 flex items-baseline gap-1.5 border-b pb-3" style={{ color: c.ink, borderColor: c.ink }}>
        <span className="text-[3rem] font-medium leading-none tracking-[-0.03em]">{big}</span><span className="text-[0.875rem]">{unit}</span>
      </p>
      {meta.map((m, i) => <p key={m} className={`${i ? "mt-1.5" : "mt-4"} text-[0.9375rem]`} style={{ color: c.ink }}>{m}</p>)}
      <p className="mt-9 text-[1.25rem] font-medium lg:mt-[11rem]" style={{ color: c.ink }}>{head}</p>
      <ul className="mt-3 grid gap-2">
        {items.map((x) => <li key={x} className="flex gap-2.5 text-[0.9375rem]" style={{ color: c.ink }}><Check size={14} />{x}</li>)}
      </ul>
    </>
  );
}

/* ───── C · Loom ───── */
export function C() {
  const [n, setN] = useState(25);
  const id = useId();
  const valid = n >= 5 && n <= 400;
  return (
    <section id="pris" className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <h2 className={`${h2} text-center`} style={{ color: c.ink }}>Én pris pr. bruger</h2>
        <p className="mx-auto mt-5 max-w-[30rem] text-center text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
        <div className="mt-8 flex items-center justify-center gap-3 text-[0.9375rem] font-semibold" style={{ color: c.ink }}>
          <label htmlFor={id}>Holdstørrelse:</label>
          <input id={id} type="number" inputMode="numeric" min={5} max={400} value={n} onChange={(e) => setN(Math.max(0, Number(e.target.value) || 0))}
            className="h-10 w-28 rounded-[10px] bg-white px-3 text-[0.9375rem] font-medium tabular-nums outline-none ring-1 focus-visible:ring-2" style={{ ["--tw-ring-color" as string]: "rgba(32,22,19,0.2)" }} />
          <span className="font-medium" style={{ color: c.muted }}>brugere</span>
        </div>
        <div className="mx-auto mt-12 grid max-w-[62rem] items-stretch gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Loom's "most popular" card: a gradient ring around a tinted card */}
          <div className="rounded-[28px] p-[2px]" style={{ background: `linear-gradient(150deg, ${c.coral}, #f4b9a6 55%, #eadfd8)` }}>
            <div className="flex h-full flex-col rounded-[26px] p-8 sm:p-10" style={{ background: "#fff8f4" }}>
              <span className="w-fit rounded-[6px] px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.06em]" style={{ background: c.coralSoft, color: c.ink }}>Fra 5 brugere · ingen binding</span>
              <p className="mt-5 text-[2.25rem] font-bold tracking-[-0.03em]" style={{ color: c.ink }}>Virksomhed</p>
              <p className="mt-2 max-w-[22rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Hele holdet lærer ChatGPT, Copilot og Claude på jeres egne opgaver.</p>
              <p className="mt-8 flex items-baseline gap-2" style={{ color: c.ink }}>
                <span className="text-[2.25rem] font-bold tracking-[-0.03em] tabular-nums">69 kr.</span>
                <span className="text-[0.8125rem]" style={{ color: c.muted }}>pr. bruger / måned</span>
              </p>
              <p className="mt-1 text-[0.9375rem] tabular-nums" style={{ color: c.ink }} aria-live="polite">
                {valid ? <><b>{kr(n * 69)} kr.</b> om måneden for {n} brugere</> : n > 400 ? "Over 400 brugere: book et opkald" : "Mindst 5 brugere"}
              </p>
              <Link href={appLinks.startBusiness} className="group mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>
                Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="mt-9 text-[0.9375rem] font-bold" style={{ color: c.ink }}>Det får I:</p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {["ChatGPT, Copilot og Claude", "Teamoverblik og rapport", "Kursusbevis med unikt ID", "Databehandleraftale", "10 min pr. lektion", "Data i EU (Frankfurt)"].map((x) => <li key={x} className="flex gap-2.5 text-[0.9375rem]" style={{ color: c.ink }}><Check size={14} />{x}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-col rounded-[28px] bg-white p-8 ring-1 sm:p-10" style={{ ["--tw-ring-color" as string]: c.line }}>
            <p className="text-[2.25rem] font-bold tracking-[-0.03em]" style={{ color: c.ink }}>Store hold</p>
            <p className="mt-2 text-[1rem] leading-relaxed" style={{ color: c.muted }}>Over 400 brugere, flere afdelinger eller særlige krav til jeres data.</p>
            <p className="mt-8 text-[2.25rem] font-bold tracking-[-0.03em]" style={{ color: c.ink }}>Lad os tale</p>
            <Link href="/kontakt" className="mt-8 inline-flex h-12 w-fit items-center rounded-full px-7 text-[0.9375rem] font-semibold ring-1 transition-colors hover:bg-[#f7f2ee]" style={{ color: c.ink, ["--tw-ring-color" as string]: "rgba(32,22,19,0.25)" }}>Book 15 min</Link>
            <p className="mt-auto pt-9 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>Alt fra Virksomhed er med. Vi finder prisen sammen på 15 minutter.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
