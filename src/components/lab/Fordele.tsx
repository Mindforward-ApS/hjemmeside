"use client";

// Round 2 for the feature strip under the hero (Marco 2026-11-03: "byg 3 nye … meget bedre end den her").
// Same copy as now. D = interactive tabs with a big product view, E = bento on the dark stage, F = tall photo cards.
import Image from "next/image";
import { appLinks } from "@/lib/app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { KortRangliste } from "@/components/lab/HoldetKort";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "w-full px-5 sm:px-[3.5vw]";
export const items: { icon: Parameters<typeof Icon>[0]["name"]; t: string; d: string }[] = [
  { icon: "clock", t: "Korte lektioner", d: "Video og tekst på dansk, cirka 10 minutter ad gangen. Du bestemmer selv tempoet." },
  { icon: "sparkle", t: "Øvemiljø med score", d: "Hver lektion slutter med en opgave fra din hverdag, og du får en score med det samme." },
  { icon: "doc", t: "Kursusbevis", d: "Med dit navn og et unikt ID. Sæt det på LinkedIn, eller send det til chefen." },
];

/* Large product views used by D and E */
function LessonView() {
  return (
    <div className="w-full max-w-[34rem] overflow-hidden rounded-[20px] bg-white shadow-[0_40px_80px_-40px_rgba(32,22,19,0.55)]">
      <div className="relative aspect-[16/9]">
        <Image src="/img/unsplash/feedback.jpg" alt="" fill sizes="34rem" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-xl" style={{ color: c.ink }}><Icon name="play" size={22} className="translate-x-0.5" /></span>
        <div className="absolute inset-x-4 bottom-4 text-white"><p className="text-[0.75rem] text-white/75">Lektion 6 af 12 · AI på arbejdet</p><p className="text-[1.125rem] font-semibold">AI til mails</p></div>
      </div>
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="text-[0.75rem] tabular-nums" style={{ color: c.muted }}>3:12</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: c.sand }}><div className="h-full w-[32%] rounded-full" style={{ background: c.coral }} /></div>
        <span className="text-[0.75rem] tabular-nums" style={{ color: c.muted }}>10:00</span>
      </div>
    </div>
  );
}
function ScoreView() {
  return (
    <div className="grid w-full max-w-[34rem] gap-3 rounded-[20px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(32,22,19,0.55)]">
      <div className="flex items-center justify-between"><span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold text-white" style={{ background: c.ink }}>Opgave 3 af 5</span><span className="text-[0.75rem]" style={{ color: c.muted }}>Copilot</span></div>
      <p className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>Skriv en mail til en kunde, der venter på svar</p>
      <div className="ml-auto max-w-[85%] rounded-[14px] rounded-br-[4px] px-4 py-3 text-[0.875rem] text-white" style={{ background: c.dark }}>Skriv et kort, venligt svar til kunden med en ny leveringsdato. Højst 120 ord.</div>
      <div className="flex items-center gap-4 rounded-[14px] p-4" style={{ background: c.cream }}>
        <p className="flex items-baseline gap-1"><span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.8125rem]" style={{ color: c.muted }}>/ 100</span></p>
        <p className="text-[0.8125rem] leading-snug" style={{ color: c.ink }}><b>Godt!</b> Tilføj, hvorfor leveringen er forsinket, så kunden forstår det.</p>
      </div>
    </div>
  );
}
function CertView() {
  return (
    <div className="relative w-full max-w-[30rem] rotate-[-2deg] overflow-hidden rounded-[20px] p-7 text-white shadow-[0_40px_80px_-40px_rgba(32,22,19,0.7)]" style={{ background: c.dark }}>
      <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full border-[18px] border-[#e8664a]/25" />
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/60">Kursusbevis · MF-26-04812</p>
      <p className={`${display} mt-4 text-[3.25rem]`}>Sofie Lund</p>
      <p className="mt-1 text-[0.9375rem] text-white/75">AI på arbejdet · Niveau 1 · Score 92 %</p>
      <div className="mt-6 flex items-center gap-3"><span className="rounded-full px-3 py-1.5 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Del på LinkedIn</span><span className="text-[0.75rem] text-white/60">Tjek ægthed med QR-kode</span></div>
    </div>
  );
}
const views = [<LessonView key="l" />, <ScoreView key="s" />, <CertView key="c" />];

/* D · Faner med stort produkt: three items on the left; the right shows a big product view that switches. */
export function D() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % 3), 4500);
    return () => clearInterval(id);
  }, [auto]);
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24`}>
        <ul className="grid gap-3" role="tablist" aria-label="Fordele">
          {items.map((it, k) => (
            <li key={it.t}>
              <button type="button" role="tab" aria-selected={i === k} onClick={() => { setI(k); setAuto(false); }}
                className={`grid w-full grid-cols-[auto_1fr] gap-4 rounded-[20px] p-5 text-left transition-all duration-300 ${i === k ? "bg-white shadow-[0_20px_50px_-30px_rgba(32,22,19,0.45)]" : "hover:bg-white/60"}`}>
                <span className="grid size-11 place-items-center rounded-[12px] transition-colors" style={{ background: i === k ? c.coral : c.sand, color: i === k ? "#fff" : c.ink }}><Icon name={it.icon} size={18} /></span>
                <span>
                  <span className="block text-[1.25rem] font-semibold tracking-[-0.01em]" style={{ color: c.ink }}>{it.t}</span>
                  <span className={`grid transition-[grid-template-rows] duration-300 ${i === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><span className="overflow-hidden"><span className="block pt-1.5 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</span></span></span>
                  {i === k && auto && <span className="mt-3 block h-0.5 overflow-hidden rounded-full" style={{ background: c.sand }}><span key={i} className="block h-full rounded-full fd-bar" style={{ background: c.coral }} /></span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="relative grid min-h-[24rem] place-items-center overflow-hidden rounded-[28px] p-8" style={{ background: `radial-gradient(70% 70% at 50% 40%, ${c.coralSoft} 0%, ${c.sand} 70%)` }}>
          <div key={i} className="fd-in grid w-full place-items-center">{views[i]}</div>
        </div>
      </div>
      <style>{`@keyframes fdBar{from{width:0}to{width:100%}}.fd-bar{animation:fdBar 4.5s linear}@keyframes fdIn{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}.fd-in{animation:fdIn 500ms cubic-bezier(.16,1,.3,1)}@media (prefers-reduced-motion:reduce){.fd-bar,.fd-in{animation:none}}`}</style>
    </section>
  );
}

/* E · Bento på scenen: the hero's dark stage continues as a bento grid; each tile is the product doing its job. */
export function E() {
  return (
    <section style={{ background: c.dark }}>
      <div className={`${wrap} grid gap-4 py-16 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-[auto_auto] lg:py-24`}>
        <div className="relative overflow-hidden rounded-[28px] lg:row-span-2">
          <Image src="/img/unsplash/feedback.jpg" alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201613] via-[#201613]/40 to-transparent" />
          <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-8">
            <span className="mb-auto w-fit rounded-full bg-white/90 px-3 py-1 text-[0.75rem] font-semibold" style={{ color: c.ink }}>10 min</span>
            <h3 className={`${display} text-[clamp(2.5rem,1.6rem+2.4vw,3.75rem)] text-white`}>{items[0].t}</h3>
            <p className="mt-2 max-w-[28rem] text-[1rem] leading-relaxed text-white/75">{items[0].d}</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-6 rounded-[28px] p-8" style={{ background: c.dark2 }}>
          <div>
            <h3 className={`${display} text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] text-white`}>{items[1].t}</h3>
            <p className="mt-2 max-w-[22rem] text-[0.9375rem] leading-relaxed text-white/70">{items[1].d}</p>
          </div>
          <p className="flex items-baseline gap-1"><span className={`${display} text-[5.5rem]`} style={{ color: c.coral }}>86</span><span className="text-[0.875rem] text-white/50">/100</span></p>
        </div>
        <div className="relative grid grid-cols-[1fr_auto] items-end gap-6 overflow-hidden rounded-[28px] p-8" style={{ background: `linear-gradient(140deg, ${c.peach} 0%, #f3b79d 100%)` }}>
          <div>
            <h3 className={`${display} text-[clamp(2rem,1.4rem+1.6vw,2.75rem)]`} style={{ color: c.ink }}>{items[2].t}</h3>
            <p className="mt-2 max-w-[22rem] text-[0.9375rem] leading-relaxed" style={{ color: "#4a3a34" }}>{items[2].d}</p>
          </div>
          <div className="w-[9.5rem] rotate-[-6deg] rounded-[14px] bg-white p-3.5 shadow-[0_20px_40px_-20px_rgba(32,22,19,0.5)]">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.12em]" style={{ color: c.muted }}>Kursusbevis</p>
            <p className="mt-1 text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Sofie Lund</p>
            <p className="text-[0.6875rem]" style={{ color: c.muted }}>Score 92 %</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* F · Høje fotokort: three tall photo cards (like the chosen Mine kurser), each with a small product chip. */
export function F() {
  // Marco 2026-11-04: the three photo cards now answer "how do we get started?" as three steps (CRO: lower the
  // perceived effort right after the hero), with the CTA repeated at the end of the section.
  const steps = [
    { n: "01", t: "Inviter holdet", d: "Opret holdet, og send ét link til kollegerne.", photo: "/img/unsplash/team.jpg", chip: "Ét link" },
    { n: "02", t: "10 minutter om dagen", d: "En kort lektion på dansk og en opgave fra jeres egen hverdag i ChatGPT, Copilot eller Claude.", photo: "/img/unsplash/feedback.jpg", chip: "10 min" },
    { n: "03", t: "Se holdets fremskridt", d: "Hver opgave får en score, og alle får et kursusbevis, når forløbet er klaret.", photo: "", chip: "86 / 100" },
  ];
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} py-16 lg:py-24`}>
        <h2 className={`${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`} style={{ color: c.ink }}>Sådan kommer I i gang</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((it, i) => (
            <article key={it.n} className={`group relative overflow-hidden rounded-[28px] md:h-[30rem] ${it.photo ? "h-[26rem]" : "h-[36rem]"}`} style={it.photo ? undefined : { background: "linear-gradient(160deg, #3a2722 0%, #201613 75%)" }}>
              {it.photo ? (
                <>
                  <Image src={it.photo} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201613]/95 via-[#201613]/35 to-transparent" />
                </>
              ) : (
                /* Step 3 shows the product itself: the team card the leader sees. */
                <div className="absolute inset-x-5 top-[4.25rem] transition-transform duration-700 group-hover:-translate-y-1"><div className="md:w-[138.9%] md:[zoom:0.72]"><KortRangliste /></div></div>
              )}
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <span className={`${display} text-[2.5rem] leading-none !text-white`}>{it.n}</span>
                <span className="rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold" style={i === 2 ? { background: c.coral, color: c.ink } : { background: "rgba(255,255,255,0.95)", color: c.ink }}>{it.chip}</span>
              </div>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className={`${display} text-[clamp(2.25rem,1.5rem+1.8vw,3rem)] !text-white`}>{it.t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80 md:min-h-[3.4rem]">{it.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={appLinks.startBusiness} className="group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>
            Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/kontakt" className="text-[0.9375rem] font-medium underline decoration-[rgba(32,22,19,0.3)] underline-offset-4 hover:decoration-current" style={{ color: c.ink }}>Eller book 15 min med os</Link>
        </div>
      </div>
    </section>
  );
}
