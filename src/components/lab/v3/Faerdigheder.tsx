"use client";

// Round 3 for "Færdigheder, du kan bruge allerede i morgen" (Marco 2026-11-03: "3 versioner af alle sektioner").
// Heading and paragraph unchanged; the four skills from N. A = prompt → result app on the dark stage,
// B = tomorrow as a timeline, C = one person with the four results floating around her. Example data.
import Image from "next/image";
import { useEffect, useState } from "react";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const H = "Færdigheder, du kan bruge allerede i morgen.";
const P = "Ingen teori for teoriens skyld. Hvert kursus er bygget op om opgaver, du kender fra din egen arbejdsdag.";
const tools = [{ n: "ChatGPT", s: "/logos/chatgpt.png" }, { n: "Copilot", s: "/logos/copilot.png" }, { n: "Claude", s: "/logos/claude.png" }];

const skills = [
  { k: "Mails", t: "Skriv mails på halvdelen af tiden", ui: "mail", at: "08:30", prompt: "Skriv et kort, venligt svar til Mette om hendes forsinkede levering. Ny dato: torsdag." },
  { k: "Møder", t: "Referat på fem minutter", ui: "moede", at: "10:15", prompt: "Lav et referat af mine noter med beslutninger, ansvarlige og datoer." },
  { k: "Excel", t: "Formler uden at kunne kode", ui: "excel", at: "13:00", prompt: "Lav en formel, der lægger 25 % moms til, når landet er DK." },
  { k: "Data", t: "Ved, hvad du må dele", ui: "data", at: "15:40", prompt: "Fjern navne og CPR-numre, før jeg deler teksten med AI." },
] as const;
type Kind = (typeof skills)[number]["ui"];

/* The result of each skill as a small piece of real UI (same content as N). */
function Result({ kind, dark = false, size = "sm" }: { kind: Kind; dark?: boolean; size?: "sm" | "lg" }) {
  const lg = size === "lg";
  const box = `rounded-[16px] ${lg ? "p-5 text-[1rem]" : "p-3.5 text-[0.8125rem]"} leading-snug shadow-[0_18px_40px_-20px_rgba(32,22,19,0.5)] ${dark ? "bg-[#2c1f1b] text-white" : "bg-white"}`;
  const ink = dark ? undefined : { color: c.ink };
  const sub = `${lg ? "text-[0.8125rem]" : "text-[0.6875rem]"} ${dark ? "text-white/55" : ""}`;
  const subStyle = dark ? undefined : { color: c.muted };
  const chip = `inline-block rounded-full px-2.5 py-0.5 font-semibold ${lg ? "mt-3 text-[0.75rem]" : "mt-2 text-[0.6875rem]"}`;
  if (kind === "mail") return (
    <div className={box} style={ink}>
      <p className={sub} style={subStyle}>Til: Mette Holm · Emne: Din levering</p>
      <p className="mt-1.5">Hej Mette, tak for din tålmodighed, og undskyld ventetiden. Din ordre bliver leveret <b>torsdag den 6. november</b>.</p>
      <span className={chip} style={{ background: c.coral, color: c.ink }}>Udkast klar · 40 sek.</span>
    </div>
  );
  if (kind === "moede") return (
    <div className={box} style={ink}>
      <p className="font-semibold">Referat · Lagermøde</p>
      <ul className="mt-1.5 grid gap-1">{["Ny plukkerute 1. dec. (Jonas)", "To scannere bestilles (Ida)", "Næste møde 3. dec. kl. 9"].map((x) => <li key={x} className="flex gap-1.5"><span style={{ color: c.coral }}>●</span>{x}</li>)}</ul>
    </div>
  );
  if (kind === "excel") return (
    <div className={box} style={ink}>
      <div className={`grid grid-cols-[2.5rem_1fr_1fr_1fr] overflow-hidden rounded-[8px] border font-mono ${lg ? "text-[0.8125rem]" : "text-[0.6875rem]"} ${dark ? "border-white/10" : ""}`} style={dark ? undefined : { borderColor: c.line }}>
        {[["", "Land", "Pris", "I alt"], ["4", "DK", "800", "1.000"], ["5", "SE", "640", "640"]].map((r, i) => r.map((v, j) => (
          <span key={`${i}-${j}`} className={`px-2 py-1 ${i === 0 || j === 0 ? (dark ? "bg-white/5 text-white/50" : "bg-[#f7f2ee]") : ""} ${i === 1 && j === 3 ? "font-semibold" : ""}`} style={i === 1 && j === 3 ? { background: c.coralSoft, color: c.ink } : undefined}>{v}</span>
        )))}
      </div>
      <p className={`mt-2 font-mono ${lg ? "text-[0.875rem]" : "text-[0.75rem]"}`}>=HVIS(B4=&quot;DK&quot;;C4*1,25;C4)</p>
    </div>
  );
  return (
    <div className={box} style={ink}>
      <p>Kunde: <span className="rounded px-1" style={{ background: c.ink, color: c.ink }}>Peter Hansen</span>, CPR <span className="rounded px-1" style={{ background: c.ink, color: c.ink }}>010190-1234</span></p>
      <p className="mt-1">Ønsker levering i uge 46.</p>
      <span className={`${chip} text-white`} style={{ background: c.green }}>Klar til at dele</span>
    </div>
  );
}

function Heading({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
      <h2 className={`${h2} max-w-[18ch] ${dark ? "!text-white" : ""}`} style={dark ? undefined : { color: c.ink }}>{H}</h2>
      <p className={`max-w-[26rem] text-[1.0625rem] leading-relaxed lg:justify-self-end ${dark ? "text-white/70" : ""}`} style={dark ? undefined : { color: c.muted }}>{P}</p>
    </div>
  );
}

/* A · Prompt → resultat: pick a skill on the left, the app window on the right shows your prompt and what comes back. */
export function A() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % skills.length), 6000);
    return () => clearInterval(t);
  }, [auto]);
  const s = skills[i];
  return (
    <section id="kurser" className="scroll-mt-6 py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <Heading dark />
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <ul className="grid content-start gap-1" role="tablist" aria-label="Færdigheder">
            {skills.map((x, n) => (
              <li key={x.k}>
                <button type="button" role="tab" aria-selected={n === i} onClick={() => { setI(n); setAuto(false); }}
                  className={`relative flex w-full items-center gap-5 overflow-hidden rounded-[18px] px-5 py-5 text-left transition ${n === i ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}>
                  <span className={`text-[0.8125rem] font-semibold tabular-nums ${n === i ? "" : "text-white/35"}`} style={n === i ? { color: c.coral } : undefined}>0{n + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[0.75rem] font-semibold uppercase tracking-[0.1em] ${n === i ? "text-white/60" : "text-white/35"}`}>{x.k}</span>
                    <span className={`mt-0.5 block text-[1.25rem] font-semibold leading-snug ${n === i ? "text-white" : "text-white/45"}`}>{x.t}</span>
                  </span>
                  {n === i && auto && <span key={i} aria-hidden className="absolute inset-x-5 bottom-0 h-[2px] origin-left animate-[v3fill_6s_linear_forwards] rounded-full" style={{ background: c.coral }} />}
                </button>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-[24px] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.8)]" style={{ background: c.cream }}>
            <div className="flex items-center gap-3 border-b px-5 py-3.5" style={{ borderColor: c.line, background: "#fff" }}>
              <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((col) => <i key={col} className="size-2.5 rounded-full" style={{ background: col }} />)}</span>
              <span className="text-[0.8125rem] font-medium" style={{ color: c.muted }}>Øvemiljø · {s.k}</span>
              <span className="ml-auto flex -space-x-1.5">{tools.map((t) => <Image key={t.n} src={t.s} alt={t.n} width={22} height={22} className="size-[22px] rounded-[6px] ring-2 ring-white" />)}</span>
            </div>
            <div key={i} className="grid gap-4 p-5 sm:p-8 [animation:v3in_.6s_cubic-bezier(.16,1,.3,1)]">
              <div className="ml-auto max-w-[85%] rounded-[16px] rounded-br-[4px] px-5 py-4 text-[0.9375rem] leading-relaxed text-white" style={{ background: c.dark }}>{s.prompt}</div>
              <div className="max-w-[92%]"><Result kind={s.ui} size="lg" /></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes v3fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes v3in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[class*="v3fill"],[class*="v3in"]{animation:none!important}}`}</style>
    </section>
  );
}

/* B · I morgen: the four skills placed on tomorrow's working day. A time axis, one card per stop. */
export function B() {
  return (
    <section id="kurser" className="scroll-mt-6 bg-white py-24 lg:py-32">
      <div className={wrap}>
        <Heading />
        <div className="relative mt-16">
          {/* Axis: horizontal on desktop, vertical on phones. */}
          <div aria-hidden className="absolute left-[0.4375rem] top-2 bottom-2 w-px lg:inset-x-0 lg:top-[0.4375rem] lg:bottom-auto lg:h-px lg:w-auto" style={{ background: c.line }} />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-5">
            {skills.map((s, n) => (
              <li key={s.k} className="relative pl-9 lg:pl-0 lg:pt-10">
                <span aria-hidden className="absolute left-0 top-1 grid size-[0.9375rem] place-items-center rounded-full lg:top-0" style={{ background: n === 0 ? c.coral : c.ink }}><span className="size-1.5 rounded-full bg-white" /></span>
                <p className="text-[0.8125rem] font-semibold tabular-nums" style={{ color: n === 0 ? c.coral : c.muted }}>{n === 0 ? "I morgen · " : ""}{s.at}</p>
                <h3 className="mt-1 text-[1.25rem] font-semibold leading-snug" style={{ color: c.ink }}>{s.t}</h3>
                <div className={`mt-5 rounded-[24px] p-4 ${n % 2 ? "lg:mt-14" : ""}`} style={{ background: n === 1 ? c.dark : n === 3 ? c.coralSoft : c.cream }}>
                  <span className={`mb-3 inline-block rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${n === 1 ? "bg-white/10 text-white" : "bg-white"}`} style={n === 1 ? undefined : { color: c.ink }}>{s.k}</span>
                  <Result kind={s.ui} dark={n === 1} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* C · Én person, fire resultater: the cut-out learner on a peach stage, her four results floating around her. */
export function C() {
  const pos = ["lg:left-[4%] lg:top-[10%]", "lg:right-[4%] lg:top-[8%]", "lg:left-[6%] lg:bottom-[10%]", "lg:right-[6%] lg:bottom-[14%]"];
  return (
    <section id="kurser" className="scroll-mt-6 py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <Heading />
        <div className="relative mt-14 overflow-hidden rounded-[32px] lg:h-[44rem]" style={{ background: `radial-gradient(60% 70% at 50% 60%, ${c.peach} 0%, ${c.coralSoft} 55%, ${c.sand} 100%)` }}>
          <div className="relative mx-auto h-[26rem] w-[15rem] sm:h-[30rem] sm:w-[17.5rem] lg:absolute lg:bottom-0 lg:left-1/2 lg:h-[40rem] lg:w-[23rem] lg:-translate-x-1/2">
            <Image src="/img/unsplash/whiteboard-cut.webp" alt="En medarbejder, der smiler" fill sizes="(min-width:1024px) 23rem, 17.5rem" className="object-contain object-bottom" />
          </div>
          <ul className="relative grid gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:static lg:block lg:p-0">
            {skills.map((s, n) => (
              <li key={s.k} className={`lg:absolute lg:w-[min(22rem,28%)] ${pos[n]}`}>
                <p className="mb-2 flex items-center gap-2 text-[0.875rem] font-semibold" style={{ color: c.ink }}><span className="rounded-full px-2.5 py-1 text-[0.6875rem]" style={{ background: n === 0 ? c.coral : "#fff", color: c.ink }}>{s.k}</span>{s.t}</p>
                <Result kind={s.ui} dark={n === 1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
