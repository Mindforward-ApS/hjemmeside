"use client";

// "Én pris pr. bruger" — three versions in the style of the current price section (Marco 2026-11-05).
// Same facts, same price (69 kr. pr. bruger om måneden, fra 5 brugere, ingen binding) and the same included list.
// 1 · Som nu med beregner: the current split; the price card gets a slider for team size and shows the monthly total.
// 2 · Foto og pris: a photo of someone at work fills the left; the dark price card overlaps its edge.
// 3 · Stor pris: a huge 69 kr. in the middle, the facts as a row, the included items as chips, buttons centred.
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", sand: "#efe7e1" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const PARA = "Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.";
const facts = [
  { n: "10 min", d: "pr. lektion, så det passer ind i en travl dag" },
  { n: "1–2 timer", d: "for et helt kursus, fordelt på korte lektioner" },
  { n: "Data i EU", d: "Hostet i EU, data i Frankfurt" },
];
const incl = ["ChatGPT, Copilot og Claude, side om side", "Teamoverblik og rapport til lederen", "Kursusbevis med navn og unikt ID", "Databehandleraftale"];
const kr = (n: number) => n.toLocaleString("da-DK");

function PriceCard({ calc = false }: { calc?: boolean }) {
  const [n, setN] = useState(25);
  const id = useId();
  return (
    <div className="relative overflow-hidden rounded-[28px] p-8 text-white shadow-[0_50px_100px_-50px_rgba(32,22,19,0.8)] sm:p-10" style={{ background: "linear-gradient(165deg, #3a2722 0%, #201613 70%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.35), transparent)" }} />
      <p className="relative text-[0.9375rem] font-semibold text-white/70">Virksomhed</p>
      <p className="relative mt-3 flex items-baseline gap-2">
        <span className="text-[4.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">69</span>
        <span className="text-[1.125rem] font-semibold">kr.</span>
        <span className="text-[0.9375rem] text-white/60">pr. bruger om måneden</span>
      </p>
      <p className="relative mt-4 flex flex-wrap gap-2">
        {["Fra 5 brugere", "Ingen binding"].map((x) => <span key={x} className="rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] font-medium text-white/85 ring-1 ring-white/10">{x}</span>)}
      </p>
      {calc && (
        <div className="relative mt-8 rounded-[18px] bg-white/[0.06] p-5 ring-1 ring-white/10">
          <div className="flex items-baseline justify-between">
            <label htmlFor={id} className="text-[0.875rem] text-white/75">Medarbejdere på holdet</label>
            <output htmlFor={id} className="text-[1.25rem] font-semibold tabular-nums">{n}</output>
          </div>
          <input id={id} type="range" min={5} max={400} step={5} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-3 w-full accent-[#e8664a]" />
          <p className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3"><span className="text-[0.875rem] text-white/70">I alt om måneden</span><span className="text-[1.5rem] font-semibold tabular-nums">{kr(n * 69)} kr.</span></p>
        </div>
      )}
      <ul className="relative mt-8 grid gap-3.5 border-t border-white/10 pt-8">
        {incl.map((x) => (
          <li key={x} className="flex items-center gap-3 text-[0.9375rem] text-white/85">
            <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: "rgba(232,102,74,0.18)", color: c.coral }}><Icon name="check" size={13} /></span>{x}
          </li>
        ))}
      </ul>
      <div className="relative mt-9 grid gap-3">
        <Link href={appLinks.startBusiness} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
        <Link href="/kontakt" className="inline-flex h-12 items-center justify-center rounded-full text-[0.9375rem] font-medium text-white/85 ring-1 ring-white/20 transition-colors hover:bg-white/5">Book 15 min</Link>
      </div>
    </div>
  );
}

/* ───── 1 · Som nu med beregner ───── */
export function S1() {
  return (
    <section id="pris" className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,31rem)] lg:gap-20`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>Én pris pr. bruger</h2>
          <p className="mt-5 max-w-[28rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <dl className="mt-10 max-w-[34rem] border-t" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
            {facts.map((f) => (
              <div key={f.n} className="grid grid-cols-[10rem_1fr] items-baseline gap-4 border-b py-6" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
                <dt className={`${display} text-[2.75rem]`} style={{ color: c.ink }}>{f.n}</dt>
                <dd className="text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <PriceCard calc />
      </div>
    </section>
  );
}

/* ───── 2 · Foto og pris ───── */
export function S2() {
  return (
    <section id="pris" className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <h2 className={h2} style={{ color: c.ink }}>Én pris pr. bruger</h2>
          <p className="max-w-[28rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="relative mt-12 grid lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[28px] lg:h-[38rem] lg:min-h-0">
            <Image src="/img/stock/coffee-laptop.jpg" alt="En medarbejder med kaffe foran sin computer" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-[45%_50%]" />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(32,22,19,0.85) 0%, rgba(32,22,19,0.35) 50%, transparent 70%)" }} />
            <dl className="absolute inset-x-6 bottom-16 grid gap-4 text-white sm:grid-cols-3 lg:inset-x-8 lg:bottom-8 lg:pr-28">
              {facts.map((f) => (
                <div key={f.n}><dt className={`${display} text-[2.25rem] !text-white`}>{f.n}</dt><dd className="mt-1 text-[0.8125rem] leading-snug text-white/75">{f.d}</dd></div>
              ))}
            </dl>
          </div>
          {/* The price card overlaps the photo's right edge on desktop */}
          <div className="relative z-10 -mt-10 px-3 lg:-ml-24 lg:mt-0 lg:px-0"><PriceCard /></div>
        </div>
      </div>
    </section>
  );
}

/* ───── 3 · Stor pris ───── */
export function S3() {
  return (
    <section id="pris" className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} text-center`}>
        <p className="text-[0.9375rem] font-semibold" style={{ color: c.muted }}>Én pris pr. bruger</p>
        <h2 className={`${display} mt-4 text-[clamp(7rem,3rem+14vw,16rem)] leading-[0.8]`} style={{ color: c.ink }}>69 kr.</h2>
        <p className="mt-4 text-[1.125rem]" style={{ color: c.ink }}>pr. bruger om måneden · fra 5 brugere · ingen binding</p>
        <p className="mx-auto mt-3 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
        <ul className="mx-auto mt-8 flex max-w-[52rem] flex-wrap justify-center gap-2">
          {incl.map((x) => <li key={x} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.875rem] font-medium shadow-[0_8px_20px_-14px_rgba(32,22,19,0.4)]" style={{ color: c.ink }}><Icon name="check" size={13} />{x}</li>)}
        </ul>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={appLinks.startBusiness} className="group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
          <Link href="/kontakt" className="inline-flex h-12 items-center rounded-full px-7 text-[0.9375rem] font-medium ring-1 transition-colors hover:bg-white" style={{ color: c.ink, ["--tw-ring-color" as string]: "rgba(32,22,19,0.2)" }}>Book 15 min</Link>
        </div>
        <dl className="mx-auto mt-16 grid max-w-[60rem] gap-px overflow-hidden rounded-[22px] text-left sm:grid-cols-3" style={{ background: "rgba(32,22,19,0.1)" }}>
          {facts.map((f) => (
            <div key={f.n} className="p-6" style={{ background: c.cream }}><dt className={`${display} text-[2.5rem]`} style={{ color: c.ink }}>{f.n}</dt><dd className="mt-1 text-[0.9375rem]" style={{ color: c.muted }}>{f.d}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
