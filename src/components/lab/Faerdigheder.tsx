"use client";

// Three versions of the "Færdigheder, du kan bruge allerede i morgen" section (Marco 2026-11-03, next section after
// the photo cards). Heading and sub-copy stay as they are. The old version repeated score and certificate from the
// photo cards above, so these show the skills themselves: the real courses, before/after, and real tasks.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { courses } from "@/content/academy";
import { Icon } from "@/components/ui/Icon";
import { Typed, useDelay } from "@/components/lab/uiMotion";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";

function Heading({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mx-auto max-w-[46rem] text-center">
      <h2 className={`${h2} ${dark ? "!text-white" : ""}`} style={dark ? undefined : { color: c.ink }}>Færdigheder, du kan bruge allerede i morgen.</h2>
      <p className={`mx-auto mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed ${dark ? "text-white/70" : ""}`} style={dark ? undefined : { color: c.muted }}>Ingen teori for teoriens skyld. Hvert kursus er bygget op om opgaver, du kender fra din egen arbejdsdag.</p>
    </div>
  );
}

const tools = ["/logos/chatgpt.png", "/logos/copilot.png", "/logos/claude.png"];

/* G · Kursushylde: the six real courses as tiles with level, lessons and time. */
export function G() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#fff" }}>
      <div className={wrap}>
        <Heading />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((k, i) => (
            <Link key={k.slug} href={`/kurser/${k.slug}`} className="group relative flex min-h-[13rem] flex-col justify-between overflow-hidden rounded-[24px] p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(32,22,19,0.45)]" style={{ background: i === 0 ? c.dark : c.cream }}>
              <div className="flex items-center justify-between">
                <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: i === 0 ? c.coral : "#fff", color: c.ink }}>{k.category}</span>
                <span className={`text-[0.8125rem] ${i === 0 ? "text-white/60" : ""}`} style={i === 0 ? undefined : { color: c.muted }}>{k.level}</span>
              </div>
              <div>
                <h3 className={`text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] ${i === 0 ? "!text-white" : ""}`} style={i === 0 ? undefined : { color: c.ink }}>{k.title}</h3>
                <p className={`mt-2 text-[0.9375rem] leading-relaxed ${i === 0 ? "text-white/70" : ""}`} style={i === 0 ? undefined : { color: c.muted }}>{k.summary}</p>
              </div>
              <div className={`flex items-center justify-between text-[0.8125rem] ${i === 0 ? "text-white/60" : ""}`} style={i === 0 ? undefined : { color: c.muted }}>
                <span>{k.lessons} lektioner · {k.minutes} min</span>
                <span className="grid size-9 place-items-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: i === 0 ? "#fff" : c.ink, color: i === 0 ? c.ink : "#fff" }}><Icon name="arrowRight" size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* H · Før og efter: three everyday tasks with the time before and after the course. */
export function H() {
  const rows = [
    { t: "Referat efter et møde", f: "30 min", e: "8 min", k: "Møder og referater" },
    { t: "Svar på en kundeklage", f: "25 min", e: "6 min", k: "Mails og tilbud" },
    { t: "Overblik over et regneark", f: "45 min", e: "10 min", k: "Excel og regneark med AI" },
  ];
  return (
    <section className="py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <Heading dark />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {rows.map((r) => (
            <div key={r.t} className="flex flex-col gap-6 rounded-[24px] p-7" style={{ background: c.dark2 }}>
              <p className="text-[0.8125rem] text-white/55">{r.k}</p>
              <h3 className="text-[1.375rem] font-semibold leading-snug !text-white">{r.t}</h3>
              <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <div><p className="text-[length:calc(var(--dz,1)*0.75rem)] text-white/45">Før</p><p className={`${display} text-[length:calc(var(--dz,1)*3rem)] text-white/40 line-through decoration-2`}>{r.f}</p></div>
                <span className="mb-4 text-white/40"><Icon name="arrowRight" size={20} /></span>
                <div><p className="text-[length:calc(var(--dz,1)*0.75rem)] text-white/45">Efter</p><p className={`${display} text-[length:calc(var(--dz,1)*3rem)]`} style={{ color: c.coral }}>{r.e}</p></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[0.8125rem] text-white/45">Eksempler på tid brugt pr. opgave.</p>
      </div>
    </section>
  );
}

/* I · Vælg en opgave: pick a task on the left; the right shows the prompt you learn to write and what you get back. */
export function I() {
  const tasks = [
    { t: "Mails", p: "Skriv et kort, venligt svar til kunden med en ny leveringsdato. Højst 120 ord. Lyd som mig.", a: "Hej Mette, tak for din tålmodighed. Din ordre bliver leveret torsdag den 6. november …" },
    { t: "Møder", p: "Lav et referat af noterne herunder. Tre punkter, beslutninger først, ansvarlig på hver opgave.", a: "1. Ny plukkerute fra 1. december (Jonas)\n2. To ekstra scannere bestilles (Ida)\n3. Næste møde 3. dec. kl. 9" },
    { t: "Excel", p: "Forklar formlen i celle D4, og skriv en ny, der lægger moms til, hvis kolonne B er 'DK'.", a: "=HVIS(B4=\"DK\";C4*1,25;C4) lægger 25 % moms til danske ordrer og lader de andre være." },
    { t: "Data", p: "Hvilke oplysninger skal fjernes fra teksten, før jeg må dele den med en AI?", a: "Fjern navn, CPR-nummer og adresse i linje 2 og 5. Resten må gerne deles." },
  ];
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % tasks.length), 4000);
    return () => clearInterval(id);
  }, [auto, tasks.length]);
  const k = tasks[i];
  return (
    <section className="py-24 lg:py-32" style={{ background: "#fff" }}>
      <div className={wrap}>
        <Heading />
        <div className="mt-14 grid gap-4 rounded-[28px] p-4 lg:grid-cols-[0.8fr_1.2fr] lg:p-5" style={{ background: c.cream }}>
          <div className="grid content-start gap-2" role="tablist" aria-label="Opgaver">
            {tasks.map((x, n) => (
              <button key={x.t} type="button" role="tab" aria-selected={i === n} onClick={() => { setI(n); setAuto(false); }}
                className={`flex items-center justify-between rounded-[16px] px-5 py-4 text-left text-[1.125rem] font-semibold transition ${i === n ? "bg-white shadow-[0_16px_40px_-26px_rgba(32,22,19,0.45)]" : "hover:bg-white/60"}`} style={{ color: c.ink }}>
                {x.t}<span className="grid size-8 place-items-center rounded-full" style={{ background: i === n ? c.coral : "transparent", color: i === n ? "#fff" : c.muted }}><Icon name="arrowRight" size={14} /></span>
              </button>
            ))}
          </div>
          <div key={i} className="ff-in grid gap-4 rounded-[20px] bg-white p-6">
            <div className="flex items-center gap-2">{tools.map((s) => <Image key={s} src={s} alt="" width={24} height={24} className="size-6 rounded-[6px]" />)}<span className="ml-auto text-[0.75rem]" style={{ color: c.muted }}>Det lærer du at skrive</span></div>
            <div className="ml-auto max-w-[90%] rounded-[16px] rounded-br-[4px] px-5 py-4 text-[1rem] leading-relaxed text-white" style={{ background: c.dark }}>{k.p}</div>
            <div className="max-w-[90%] whitespace-pre-line rounded-[16px] rounded-bl-[4px] px-5 py-4 text-[1rem] leading-relaxed" style={{ background: c.cream, color: c.ink }}>{k.a}</div>
          </div>
        </div>
      </div>
      <style>{`@keyframes ffIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.ff-in{animation:ffIn 450ms cubic-bezier(.16,1,.3,1)}@media (prefers-reduced-motion:reduce){.ff-in{animation:none}}`}</style>
    </section>
  );
}

/* ───────────── Round 2 (Marco: "lav 3 nye de var ikke gode") ───────────── */

export const skills = [
  { k: "Mails", t: "Skriv mails på halvdelen af tiden", photo: "/img/unsplash/whiteboard.jpg", ui: "mail" },
  { k: "Møder", t: "Referat på fem minutter", photo: "/img/unsplash/team.jpg", ui: "moede" },
  { k: "Excel", t: "Formler uden at kunne kode", photo: "/img/unsplash/feedback.jpg", ui: "excel" },
  { k: "Data", t: "Ved, hvad du må dele", photo: "/img/unsplash/whiteboard.jpg", ui: "data" },
] as const;

// The UI boxes animate through the page-level UI mode (uiMotion.tsx) when wrapped in a <UiStage>; static otherwise.
// Mail: the reply is written, then "Udkast klar" pops. Møde: the action points arrive one by one. Excel: the formula is
// written, then the explanation. Data: black bars sweep over the name and CPR number, then "Klar til at dele".
export function MiniUI({ kind, dark = false }: { kind: (typeof skills)[number]["ui"]; dark?: boolean }) {
  const box = `rounded-[14px] p-3.5 text-[0.8125rem] leading-snug shadow-[0_18px_40px_-20px_rgba(32,22,19,0.5)] ${dark ? "bg-[#2c1f1b] text-white" : "bg-white"}`;
  const ink = dark ? undefined : { color: c.ink };
  const late = useDelay(450, 2100);
  if (kind === "mail") return (
    <div className={box} style={ink}>
      <p className={`text-[0.6875rem] ${dark ? "text-white/55" : ""}`} style={dark ? undefined : { color: c.muted }}>Til: Mette Holm · Emne: Din levering</p>
      <p className="ui-pop mt-1.5" style={{ ["--d" as string]: "150ms" }}><Typed parts={["Hej Mette, tak for din tålmodighed. Din ordre bliver leveret ", { b: "torsdag den 6. november" }, "."]} delay={300} /></p>
      <span className="ui-badge mt-2 inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold" style={{ background: c.coral, color: c.ink, ["--d" as string]: late }}>Udkast klar · 40 sek.</span>
    </div>
  );
  if (kind === "moede") return (
    <div className={box} style={ink}>
      <p className="font-semibold">Referat · Lagermøde</p>
      <ul className="mt-1.5 grid gap-1">{["Ny plukkerute 1. dec. (Jonas)", "To scannere bestilles (Ida)", "Næste møde 3. dec. kl. 9"].map((x, k) => <li key={x} className="ui-pop flex gap-1.5" style={{ ["--d" as string]: `${300 + k * 550}ms` }}><span style={{ color: c.coral }}>●</span><Typed parts={[x]} delay={300 + k * 600} cps={45} /></li>)}</ul>
    </div>
  );
  if (kind === "excel") return (
    <div className={`${box} font-mono`} style={ink}>
      <p className={`text-[0.6875rem] ${dark ? "text-white/55" : ""}`} style={dark ? undefined : { color: c.muted }}>D4</p>
      <p className="ui-pop mt-1 text-[0.8125rem]" style={{ ["--d" as string]: "200ms" }}><Typed parts={['=HVIS(B4="DK";C4*1,25;C4)']} delay={300} cps={22} /></p>
      <p className={`ui-pop mt-2 font-sans text-[0.75rem] ${dark ? "text-white/70" : ""}`} style={{ ...(dark ? {} : { color: c.muted }), ["--d" as string]: late }}>Lægger moms til danske ordrer.</p>
    </div>
  );
  // Data: the bars sweep over the personal data (the text underneath is the same colour as the bar).
  const Redact = ({ t, d }: { t: string; d: string }) => (
    <span className="relative inline-block rounded px-1">
      <span style={{ color: dark ? "#fff" : c.ink }}>{t}</span>
      <span aria-hidden className="ui-sweep absolute inset-0 rounded" style={{ background: "#201613", ["--d" as string]: d }} />
    </span>
  );
  return (
    <div className={box} style={ink}>
      <p>Kunde: <Redact t="Peter Hansen" d="500ms" />, CPR <Redact t="010190-1234" d="900ms" /></p>
      <p className="mt-1">Ønsker levering i uge 46.</p>
      <span className="ui-badge mt-2 inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold text-white" style={{ background: "#3aa66b", ["--d" as string]: "1.5s" }}>Klar til at dele</span>
    </div>
  );
}

/* M · Stor + tre små (like the chosen Mine kurser A3): one big photo skill with its UI, three smaller ones. */
export function M() {
  const [big, ...rest] = skills;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <Heading />
        <div className="mt-14 grid gap-4 lg:h-[34rem] lg:grid-cols-[1.6fr_1fr_1fr]">
          <article className="relative min-h-[28rem] overflow-hidden rounded-[28px] lg:row-span-2">
            <Image src={big.photo} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201613] via-[#201613]/30 to-transparent" />
            <div className="absolute right-6 top-6 w-[min(20rem,70%)]"><MiniUI kind={big.ui} /></div>
            <div className="absolute inset-x-7 bottom-7">
              <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>{big.k}</span>
              <h3 className={`${display} mt-3 text-[length:calc(var(--dz,1)*clamp(2.5rem,1.6rem+2.4vw,3.75rem))] !text-white`}>{big.t}</h3>
            </div>
          </article>
          {rest.map((s, i) => (
            <article key={s.k} className={`relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[28px] p-6 ${i === 2 ? "lg:col-span-2" : ""}`} style={{ background: i === 1 ? c.dark : c.cream }}>
              <div className={i === 2 ? "max-w-[22rem]" : ""}><MiniUI kind={s.ui} dark={i === 1} /></div>
              <div>
                <span className="text-[0.75rem] font-semibold" style={{ color: i === 1 ? c.peach : c.coral }}>{s.k}</span>
                <h3 className={`mt-1 text-[1.375rem] font-semibold leading-snug ${i === 1 ? "!text-white" : ""}`} style={i === 1 ? undefined : { color: c.ink }}>{s.t}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* N · Karrusel: wide skill cards you slide through, each with its photo and UI; arrows and progress dots. */
export function N() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => (x + d + skills.length) % skills.length);
  return (
    <section id="kurser" className="scroll-mt-6 overflow-hidden bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <h2 className={`${h2} max-w-[18ch]`} style={{ color: c.ink }}>Færdigheder, du kan bruge allerede i morgen.</h2>
          <div className="lg:justify-self-end">
            <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Ingen teori for teoriens skyld. Hvert kursus er bygget op om opgaver, du kender fra din egen arbejdsdag.</p>
            <div className="mt-5 flex gap-2">
              <button type="button" aria-label="Forrige" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border transition hover:bg-white" style={{ borderColor: "rgba(32,22,19,0.15)", color: c.ink }}><Icon name="arrowLeft" size={16} /></button>
              <button type="button" aria-label="Næste" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full transition hover:brightness-110" style={{ background: c.coral, color: c.ink }}><Icon name="arrowRight" size={16} /></button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ transform: `translateX(calc(${-i} * (min(46rem, 85vw) + 1rem)))` }}>
          {skills.map((s, n) => (
            /* Marco 2026-11-04: no photos (too many on the page); each card shows the result itself, large. */
            <article key={s.k} className={`grid w-[min(46rem,85vw)] shrink-0 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-40px_rgba(32,22,19,0.45)] transition-opacity duration-500 md:h-[26rem] md:grid-cols-[1fr_1.15fr] ${n === i ? "" : "opacity-55"}`} style={{ background: c.cream }}>
              <div className="flex flex-col justify-between gap-8 p-7 sm:p-9">
                <span className="w-fit rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>{s.k}</span>
                <h3 className={`${display} text-[length:calc(var(--dz,1)*clamp(2.25rem,1.5rem+2vw,3.25rem))]`} style={{ color: c.ink }}>{s.t}</h3>
              </div>
              <div className="relative m-3 grid min-h-[15rem] place-items-center overflow-hidden rounded-[20px] p-6" style={{ background: c.sand }}>
                <div aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(32,22,19,0.12) 1.1px, transparent 1.2px)", backgroundSize: "14px 14px" }} />
                <div className="relative w-full max-w-[19rem] md:[zoom:1.15]"><MiniUI kind={s.ui} /></div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-2">{skills.map((s, n) => <button key={s.k} type="button" aria-label={s.k} onClick={() => setI(n)} className="h-1.5 rounded-full transition-all" style={{ width: n === i ? 32 : 10, background: n === i ? c.ink : "#d9cec7" }} />)}</div>
      </div>
    </section>
  );
}

/* O · Hvide UI-kort (like the platform dashboard): four white cards of different sizes on cream, each a real mini app. */
export function O() {
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <Heading />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          {skills.map((s, n) => (
            <article key={s.k} className={`flex flex-col gap-5 rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(32,22,19,0.4)] ${n === 0 ? "lg:row-span-2" : ""} ${n === 3 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>{s.k}</span>
                <span className="flex -space-x-1.5">{tools.map((t) => <Image key={t} src={t} alt="" width={22} height={22} className="size-[22px] rounded-[6px] ring-2 ring-white" />)}</span>
              </div>
              <div className={`grid flex-1 place-items-center rounded-[18px] p-5 ${n === 0 ? "min-h-[16rem]" : ""}`} style={{ background: n === 0 ? `radial-gradient(70% 70% at 50% 40%, ${c.coralSoft}, ${c.sand})` : c.cream }}>
                <div className="w-full max-w-[22rem]"><MiniUI kind={s.ui} /></div>
              </div>
              <h3 className="text-[1.25rem] font-semibold leading-snug" style={{ color: c.ink }}>{s.t}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
