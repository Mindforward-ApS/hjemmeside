"use client";

// v4 (Marco 2026-11-03: "skru op for designniveauet"). Every section is a faithful translation of the MoneyHub
// reference (design/references/moneyhub-ref.webp) into our palette and content: soft cream panels, one dark card,
// white chips floating over the product, real charts. Copy is the current copy unless marked FORSLAG.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { appLinks } from "@/lib/app";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { ScoreKurve } from "@/components/lab/ScoreKort";

const c = { dark: "#201613", dark2: "#2c1f1b", cream: "#f7f2ee", panel: "#f6f1ed", sand: "#efe7e1", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6", line: "#ece4df", green: "#3aa66b" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4.25rem)]`;
const wrap = "mx-auto w-full max-w-[84rem] px-5 sm:px-[3.5vw]";
const sec = "bg-white py-20 lg:py-28";
const chip = "rounded-[16px] bg-white shadow-[0_18px_40px_-18px_rgba(32,22,19,0.28),0_2px_6px_rgba(32,22,19,0.05)]";
const tools = [{ n: "ChatGPT", s: "/logos/chatgpt.png" }, { n: "Copilot", s: "/logos/copilot.png" }, { n: "Claude", s: "/logos/claude.png" }];

function IconChip({ name }: { name: Parameters<typeof Icon>[0]["name"] }) {
  return <span className="grid size-11 shrink-0 place-items-center rounded-[12px]" style={{ background: c.sand, color: c.ink }}><Icon name={name} size={18} /></span>;
}
function Point({ i, t, d }: { i: Parameters<typeof Icon>[0]["name"]; t: string; d: string }) {
  return (
    <div className="flex gap-4">
      <IconChip name={i} />
      <div><h3 className="text-[1.1875rem] font-semibold tracking-[-0.01em]" style={{ color: c.ink }}>{t}</h3><p className="mt-1.5 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{d}</p></div>
    </div>
  );
}

/* ───── 1 · Fordele as MoneyHub's bento: one dark chart card, a ring card, a card with a floating chip ───── */
export function Bento() {
  const bars = [48, 61, 57, 72, 86, 79];
  return (
    <section className={sec}>
      <div className={wrap}>
        <div className="mx-auto max-w-[44rem] text-center">
          {/* FORSLAG: overskrift + tekst er nye (F havde ingen). */}
          <h2 className={h2} style={{ color: c.ink }}>Ti minutter om dagen. Mærkbart bedre med AI.</h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Korte lektioner, en opgave fra din egen hverdag og et bevis, når du er færdig.</p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {/* Dark: the score climbing over attempts */}
          <article className="flex min-h-[23rem] flex-col rounded-[24px] p-7 text-center" style={{ background: c.dark }}>
            <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]" style={{ color: c.peach }}>Øvemiljø med score</h3>
            <p className="mx-auto mt-2 max-w-[17rem] text-[0.875rem] leading-relaxed text-white/60">Hver lektion slutter med en opgave fra din hverdag.</p>
            <div className="mt-auto flex h-36 items-end gap-2.5 px-2 pt-6">
              {bars.map((b, i) => (
                <span key={i} className="flex-1 rounded-t-[6px]" style={{ height: `${b}%`, background: i === 4 ? `linear-gradient(180deg, ${c.coral}, #c9502f)` : "linear-gradient(180deg, rgba(246,201,182,0.9), rgba(246,201,182,0.35))" }} />
              ))}
            </div>
            <p className="mt-4 flex items-baseline gap-2 text-left"><span className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums">86</span><span className="text-[0.8125rem] text-white/60">/ 100 · bedste forsøg</span></p>
          </article>

          {/* Light: the 10-minute lesson as a ring */}
          <article className="relative flex min-h-[23rem] flex-col overflow-hidden rounded-[24px] p-7 text-center" style={{ background: c.panel }}>
            <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]" style={{ color: c.ink }}>Korte lektioner</h3>
            <p className="mx-auto mt-2 max-w-[17rem] text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>Video og tekst på dansk, cirka 10 minutter ad gangen.</p>
            <div className="relative mx-auto mt-auto size-44">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
                <circle cx="60" cy="60" r="50" fill="none" stroke="#fff" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={c.dark} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${0.7 * 314} 314`} />
              </svg>
              <span className="absolute inset-0 grid place-content-center"><span className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em]" style={{ color: c.ink }}>7 min</span><span className="mt-1 text-[0.75rem]" style={{ color: c.muted }}>af 10</span></span>
            </div>
            <span className={`absolute bottom-6 left-5 flex items-center gap-2 px-3 py-2 text-[0.8125rem] font-semibold ${chip}`} style={{ color: c.ink }}><Icon name="play" size={12} />Lektion 4 af 9</span>
          </article>

          {/* Light: the real certificate as a floating card */}
          <article className="relative flex min-h-[23rem] flex-col overflow-hidden rounded-[24px] p-7 text-center" style={{ background: c.panel }}>
            <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]" style={{ color: c.ink }}>Kursusbevis</h3>
            <p className="mx-auto mt-2 max-w-[17rem] text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>Med dit navn og et unikt ID. Sæt det på LinkedIn.</p>
            <div className="relative -mx-7 -mb-7 mt-auto h-48 overflow-hidden">
              <div className={`absolute -bottom-10 -right-6 w-[105%] rotate-[-4deg] overflow-hidden p-2 ${chip}`}>
                <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis til Sofie Lund, AI på arbejdet, Niveau 1" width={2248} height={1588} sizes="20rem" className="h-auto w-full rounded-[10px]" />
              </div>
              <span className={`absolute bottom-6 left-5 z-10 flex items-center gap-2 py-1.5 pl-1.5 pr-3 text-[0.75rem] font-semibold ${chip}`} style={{ color: c.ink }}><span className="grid size-7 place-items-center rounded-full text-white" style={{ background: c.green }}><Icon name="check" size={13} /></span>MF-26-04812</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ───── 2 · Øvelse as MoneyHub's "Let's start sending": text + two points, the product in a dotted panel ───── */
export function Oevelse() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v); return () => io.disconnect();
  }, []);
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); } else { v.dataset.userPaused = "1"; v.pause(); } };
  return (
    <section id="saadan" className={`${sec} scroll-mt-6`}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>Øv på dine egne opgaver</h2>
          <p className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.</p>
          <div className="mt-9 grid gap-7">
            {/* FORSLAG: punkternes tekst er ny, bygget af afsnittet ovenfor. */}
            <Point i="sparkle" t="Du skriver prompten selv" d="I ChatGPT, Copilot eller Claude, med en opgave fra din egen hverdag." />
            <Point i="check" t="Feedback med det samme" d="En score fra 0 til 100 og præcis, hvad du kan gøre bedre næste gang." />
          </div>
        </div>
        <div className="relative rounded-[28px] p-5 sm:p-8" style={{ background: c.panel }}>
          <div className="relative overflow-hidden rounded-[20px] shadow-[0_40px_80px_-40px_rgba(32,22,19,0.6)]">
            <video ref={ref} className="block aspect-video w-full object-cover" src="/video/oevemiljoe.mp4" poster="/video/oevemiljoe-poster.webp" muted loop playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} aria-label="En medarbejder skriver en prompt i øvemiljøet og får scoren 86 ud af 100" />
            <button type="button" onClick={toggle} aria-label={paused ? "Afspil video" : "Sæt video på pause"} className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65">
              {paused ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg> : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
            </button>
          </div>
          {/* Floating chips, like MoneyHub's flags around the transfer card */}
          <div className={`absolute -left-3 top-[18%] hidden w-[11.5rem] p-4 sm:block lg:-left-8 ${chip}`}>
            <p className="text-[0.75rem]" style={{ color: c.muted }}>Din score</p>
            <p className="mt-1 flex items-baseline gap-1"><span className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.coral }}>86</span><span className="text-[0.8125rem]" style={{ color: c.muted }}>/ 100</span></p>
            <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium" style={{ color: c.green }}><Icon name="arrowRight" size={11} className="-rotate-45" />+38 siden første forsøg</p>
          </div>
          <div className={`absolute bottom-9 right-9 flex items-center gap-2 py-2 pl-2 pr-4 sm:bottom-12 sm:right-12 ${chip}`}>
            <span className="flex -space-x-1.5">{tools.map((t) => <Image key={t.n} src={t.s} alt="" width={28} height={28} className="size-7 rounded-[8px] ring-2 ring-white" />)}</span>
            <span className="text-[0.8125rem] font-semibold" style={{ color: c.ink }}>ChatGPT · Copilot · Claude</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 3 · Certifikat as MoneyHub's "Save your time": photo + the real card overlapping + a row card ───── */
export function Certifikat() {
  return (
    <section className={sec}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div className="relative order-2 rounded-[28px] p-5 sm:p-8 lg:order-1" style={{ background: c.panel }}>
          <div className="relative h-[22rem] sm:h-[26rem]">
            <div className="absolute left-0 top-0 h-[15rem] w-[11rem] overflow-hidden rounded-[20px] sm:h-[18rem] sm:w-[14rem]">
              <Image src="/img/people/line-vestergaard.webp" alt="" fill sizes="14rem" className="object-cover object-top" />
            </div>
            <div className="absolute right-0 top-[2rem] w-[72%] overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_40px_70px_-30px_rgba(32,22,19,0.55)] sm:top-[2rem] sm:w-[68%]">
              <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis til Sofie Lund, AI på arbejdet, Niveau 1, 92 procent" width={2248} height={1588} sizes="(min-width:1024px) 30rem, 70vw" className="h-auto w-full rounded-[10px]" />
            </div>
            <div className={`absolute bottom-0 left-0 flex w-[min(20rem,100%)] items-center gap-3 p-4 ${chip}`}>
              <span className="grid size-10 place-items-center rounded-full" style={{ background: "#dcefe3", color: "#2f7a4f" }}><Icon name="check" size={16} /></span>
              <div className="min-w-0 flex-1"><p className="whitespace-nowrap text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Certifikatet er ægte</p><p className="text-[0.75rem]" style={{ color: c.muted }}>MF-26-04812</p></div>
              <span className="text-[0.9375rem] font-semibold tabular-nums" style={{ color: c.ink }}>92 %</span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className={h2} style={{ color: c.ink }}>Et certifikat, der kan tjekkes</h2>
          <p className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op.</p>
          <div className="mt-9 grid gap-7">
            <Point i="user" t="Dit navn og et unikt ID" d="Beviset viser, hvilket forløb du har taget, og hvornår." />
            <Point i="globe" t="Del det på LinkedIn" d="Eller send det til chefen. QR-koden viser, at det er ægte." />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 4 · Citater as MoneyHub's testimonial: photo + dark quote card, arrows on the sides ───── */
const quotes = [
  { name: "Ejer", firm: "revisionsfirma, 12 ansatte", photo: "/img/people/peter-skov.webp", quote: "Nu ved hele holdet, hvad vi må dele med AI. Det var dét, der holdt os tilbage.", before: "0", after: "12", what: "medarbejdere i gang" },
  { name: "Sælger", firm: "byggemarked", photo: "/img/people/ali-yilmaz.webp", quote: "Jeg skriver tilbud på halvdelen af tiden, og de lyder stadig som mig.", before: "45 min", after: "20 min", what: "pr. tilbud" },
  { name: "Kontorchef", firm: "logistikvirksomhed, 40 ansatte", photo: "/img/people/sara-damgaard.webp", quote: "Referaterne tager mig otte minutter nu. Før brugte jeg en halv time efter hvert møde.", before: "30 min", after: "8 min", what: "pr. referat" },
];
function Arrow({ dir, onClick, hot }: { dir: "l" | "r"; onClick: () => void; hot?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-label={dir === "l" ? "Forrige citat" : "Næste citat"} className="grid size-12 shrink-0 place-items-center rounded-full shadow-[0_10px_24px_-12px_rgba(32,22,19,0.4)] transition-transform hover:scale-105" style={{ background: hot ? c.coral : "#fff", color: c.ink }}>
      <Icon name={dir === "l" ? "arrowLeft" : "arrowRight"} size={17} />
    </button>
  );
}
export function Citater() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const go = (d: number) => setI((x) => (x + d + quotes.length) % quotes.length);
  return (
    <section className={sec}>
      <div className={wrap}>
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 className={h2} style={{ color: c.ink }}>Hvad siger deltagerne</h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Her kommer rigtige citater fra vores første pilotforløb.</p>
        </div>
        <div className="relative mt-14">
          <div className="grid gap-4 md:grid-cols-[0.8fr_1.6fr]" aria-roledescription="karrusel" aria-live="polite">
            <div className="relative h-[20rem] overflow-hidden rounded-[24px] md:h-auto md:min-h-[22rem]" style={{ background: c.cream }}>
              <Image key={q.photo} src={q.photo} alt="" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-between gap-10 rounded-[24px] p-8 sm:p-12" style={{ background: c.dark }}>
              <p className="text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-medium leading-snug tracking-[-0.015em] text-white">“{q.quote}”</p>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div><p className="text-[1.0625rem] font-semibold text-white">{q.name}</p><p className="text-[0.875rem] text-white/60">{q.firm}</p></div>
                <div className="rounded-[14px] bg-white/[0.07] px-4 py-3 ring-1 ring-white/10">
                  <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-white/50">Eksempel</p>
                  <p className="mt-1 flex items-center gap-2 text-[0.9375rem] text-white/70"><span className="line-through decoration-white/40">{q.before}</span><Icon name="arrowRight" size={13} /><span className="font-semibold" style={{ color: c.peach }}>{q.after}</span> {q.what}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 -left-6 hidden items-center lg:flex"><Arrow dir="l" onClick={() => go(-1)} /></div>
          <div className="absolute inset-y-0 -right-6 hidden items-center lg:flex"><Arrow dir="r" hot onClick={() => go(1)} /></div>
          <div className="mt-5 flex items-center justify-between lg:hidden">
            <div className="flex gap-2" aria-hidden>{quotes.map((_, k) => <span key={k} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 28 : 8, background: k === i ? c.ink : "#d9cec7" }} />)}</div>
            <div className="flex gap-3"><Arrow dir="l" onClick={() => go(-1)} /><Arrow dir="r" hot onClick={() => go(1)} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 5 · Tal as MoneyHub's "Get to know more": heading left, text right, four tiles, one dark ───── */
export function Tal() {
  const s = [
    { n: "10", u: "min", d: "pr. lektion, så det passer ind i en travl dag" },
    { n: "3", u: "værktøjer", d: "ChatGPT, Copilot og Claude, side om side", dark: true },
    { n: "1–2", u: "timer", d: "for et helt kursus, fordelt på korte lektioner" },
    { n: "69", u: "kr", d: "pr. bruger pr. måned, ingen binding" },
  ];
  return (
    <section className={sec}>
      <div className={wrap}>
        <div className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
          <h2 className={`${h2} max-w-[12ch]`} style={{ color: c.ink }}>Mindforward i tal</h2>
          <p className="max-w-[24rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {s.map((x) => (
            <div key={x.u} className="flex min-h-[10rem] flex-col items-center justify-center rounded-[22px] p-5 text-center sm:min-h-[11rem] sm:p-8" style={{ background: x.dark ? c.dark : c.panel }}>
              <p className="flex items-start whitespace-nowrap text-[2.75rem] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[4rem]" style={{ color: x.dark ? "#fff" : c.ink }}>
                {x.n}<span className="ml-1 mt-1 text-[0.9375rem] font-semibold tracking-normal sm:text-[1.0625rem]" style={{ color: x.dark ? "rgba(255,255,255,0.6)" : "rgba(32,22,19,0.6)" }}>{x.u}</span>
              </p>
              <p className="mt-4 max-w-[12rem] text-[0.8125rem] leading-snug sm:text-[0.875rem]" style={{ color: x.dark ? "rgba(255,255,255,0.65)" : c.muted }}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── 6 · CTA as MoneyHub's "Boost your business": gradient panel, two phones rising from the bottom edge ───── */
function Fit({ w, children }: { w: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [z, setZ] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setZ(el.clientWidth / ((w / 16) * parseFloat(getComputedStyle(document.documentElement).fontSize))));
    ro.observe(el); return () => ro.disconnect();
  }, [w]);
  return <div ref={ref} className="w-full min-w-0 overflow-hidden"><div style={{ width: `${w / 16}rem`, zoom: z ?? 1, visibility: z ? "visible" : "hidden" }}>{children}</div></div>;
}
function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[12.5rem] rounded-[2.3rem] p-[0.45rem] shadow-[0_40px_70px_-30px_rgba(32,22,19,0.7)] sm:w-[15rem] ${className}`} style={{ background: c.dark }}>
      <div className="relative h-[25rem] overflow-hidden rounded-[1.9rem] sm:h-[30rem]" style={{ background: c.cream }}>
        <span aria-hidden className="absolute left-1/2 top-2.5 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full" style={{ background: c.dark }} />
        <div className="flex items-center justify-between px-5 pt-3 text-[0.625rem] font-semibold" style={{ color: c.ink }}><span>9:41</span><span>●●●</span></div>
        <div className="px-2.5 pt-6">{children}</div>
      </div>
    </div>
  );
}
export function Cta() {
  return (
    <section id="virksomheder" className="scroll-mt-6 bg-white py-20 lg:py-24">
      <div className={wrap}>
        <div className="relative grid overflow-hidden rounded-[32px] lg:grid-cols-[1.05fr_0.95fr]" style={{ background: "linear-gradient(140deg, #f6c9b6 0%, #fbe1d7 45%, #f7f2ee 100%)" }}>
          <div className="relative order-2 h-[22rem] sm:h-[27rem] lg:order-1 lg:h-auto lg:min-h-[30rem]">
            <div className="absolute -bottom-36 left-[3%] rotate-[-6deg] sm:-bottom-40 sm:left-[7%]">
              <Phone><Fit w={300}><ScoreKurve /></Fit></Phone>
            </div>
            <div className="absolute -bottom-24 left-[38%] z-10 sm:-bottom-28 sm:left-[40%]">
              <Phone><Fit w={300}><KortRangliste /></Fit></Phone>
            </div>
          </div>
          <div className="relative order-1 p-8 pb-4 sm:p-12 lg:order-2 lg:self-center lg:py-16 lg:pl-2 lg:pr-14">
            <h2 className={h2} style={{ color: c.ink }}>Få hele teamet i gang</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: "#4a3a34" }}>Fra 5 brugere. Teamoverblik, rapport og databehandleraftale er med.</p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link href={appLinks.startBusiness} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium text-white" style={{ background: c.dark }}>Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
              <Link href="/kontakt" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium hover:bg-white/40" style={{ borderColor: c.dark, color: c.ink }}>Book 15 min</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
