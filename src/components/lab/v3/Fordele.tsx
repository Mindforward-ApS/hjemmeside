"use client";

// Round 3 for the strip under the hero (Marco 2026-11-03: "3 versioner af alle sektioner … flotte kort ind med grafer
// og vores certifikat"). Same three items and copy as F. A = three product cards, B = editorial rows, C = sticky story.
// Example data in the cards (lesson, scores, certificate V7).
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { items } from "@/components/lab/Fordele";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "w-full px-5 sm:px-[3.5vw]";
const shadow = "shadow-[0_40px_80px_-40px_rgba(32,22,19,0.55)]";
const attempts = [54, 61, 66, 74, 79, 86];
const chapters = [{ t: "Hvad AI er god til", d: "3 min", done: true }, { t: "Skriv en klar opgave", d: "4 min", done: true }, { t: "Dit første udkast", d: "3 min" }];

/* ——— Product cards shared by A, B and C ——— */
function LessonCard({ big = false }: { big?: boolean }) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-[24px] text-white ${shadow}`} style={{ background: c.dark }}>
      <div className={`relative ${big ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image src="/img/unsplash/feedback.jpg" alt="" fill sizes={big ? "40rem" : "26rem"} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201613] via-[#201613]/20 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-xl" style={{ color: c.ink }}><Icon name="play" size={20} className="translate-x-0.5" /></span>
        <span className="absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-[0.75rem] font-medium backdrop-blur">Lektion 3 af 12</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="text-[0.75rem] tabular-nums text-white/60">7:12</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[72%] rounded-full" style={{ background: c.coral }} /></div>
          <span className="text-[0.75rem] tabular-nums text-white/60">10:00</span>
        </div>
        <ul className="mt-4 grid gap-1">
          {chapters.map((ch) => (
            <li key={ch.t} className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[0.875rem] ${ch.done ? "text-white/55" : "bg-white/[0.08] text-white"}`}>
              <span className="grid size-5 place-items-center rounded-full text-[0.625rem]" style={{ background: ch.done ? c.green : c.coral, color: ch.done ? "#fff" : c.ink }}>{ch.done ? <Icon name="check" size={10} /> : <Icon name="play" size={8} />}</span>
              <span className="flex-1 truncate">{ch.t}</span>
              <span className="text-[0.75rem] tabular-nums">{ch.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScoreCard({ big = false }: { big?: boolean }) {
  const max = 100;
  return (
    <div className={`flex h-full w-full flex-col rounded-[24px] bg-white p-6 ${shadow}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[1rem] font-semibold" style={{ color: c.ink }}>Din score</p>
          <p className="mt-0.5 text-[0.8125rem]" style={{ color: c.muted }}>Opgave 3 · Svar til en kunde</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: "#b8432a" }}>▲ +32</span>
      </div>
      <p className="mt-5 flex items-baseline gap-1.5"><span className={`${big ? "text-[5rem]" : "text-[4rem]"} font-semibold leading-none tracking-[-0.05em] tabular-nums`} style={{ color: c.ink }}>86</span><span className="text-[0.9375rem]" style={{ color: c.muted }}>/ 100</span></p>
      {/* Bars: your last six attempts; the latest is coral. */}
      <div className={`mt-auto flex items-end gap-2 pt-6 ${big ? "h-44" : "h-32"}`} role="img" aria-label="Score i de seneste seks forsøg: 54, 61, 66, 74, 79 og 86">
        {attempts.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end gap-1.5">
            <span className="text-center text-[0.6875rem] font-semibold tabular-nums" style={{ color: i === attempts.length - 1 ? c.coral : c.muted }}>{v}</span>
            <div className="rounded-[8px]" style={{ height: `${(v / max) * 100}%`, background: i === attempts.length - 1 ? c.coral : i >= attempts.length - 3 ? c.ink : c.sand }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.6875rem]" style={{ color: c.muted }}><span>1. forsøg</span><span>I dag</span></div>
      <ul className="mt-4 grid gap-1.5 border-t pt-4 text-[0.8125rem]" style={{ borderColor: c.line, color: c.ink }}>
        <li className="flex gap-2"><span style={{ color: c.green }}>✓</span>Klar opgave og modtager</li>
        <li className="flex gap-2"><span style={{ color: c.coral }}>↑</span>Sig, hvorfor leveringen er forsinket</li>
      </ul>
    </div>
  );
}

function CertCard({ big = false }: { big?: boolean }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-[24px] p-6" style={{ background: `linear-gradient(160deg, ${c.peach} 0%, ${c.coralSoft} 100%)` }}>
      <div className={`relative w-full ${big ? "max-w-[34rem]" : "max-w-[22rem]"} -rotate-[4deg]`}>
        <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis til Sofie Lund, AI på arbejdet, niveau 1" width={2248} height={1588} sizes={big ? "34rem" : "22rem"} className="h-auto w-full rounded-[6px] shadow-[0_30px_60px_-24px_rgba(32,22,19,0.55)]" />
      </div>
      <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-semibold shadow-[0_10px_24px_-12px_rgba(32,22,19,0.5)]" style={{ color: c.ink }}><Icon name="shield" size={13} />ID MF-26-04812</span>
      <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold text-white" style={{ background: c.dark }}>Del på LinkedIn <Icon name="arrowRight" size={12} /></span>
    </div>
  );
}

const cards = [LessonCard, ScoreCard, CertCard];

/* A · Tre produktkort: the product itself shows each benefit. Uneven widths, one height, copy underneath. */
export function A() {
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} grid gap-10 py-16 md:grid-cols-[1fr_1.1fr_1fr] md:gap-5 lg:py-24`}>
        {items.map((it, i) => {
          const Card = cards[i];
          return (
            <article key={it.t} className="flex flex-col">
              <div className="h-[27rem] sm:h-[29rem]"><Card /></div>
              <h3 className={`${display} mt-7 text-[clamp(2rem,1.5rem+1.4vw,2.75rem)]`} style={{ color: c.ink }}>{it.t}</h3>
              <p className="mt-2 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* B · Redaktionelle rækker: type-led. Big Bebas title, the copy, and a small proof on the right of each row. */
function Ring({ v, label }: { v: number; label: string }) {
  return (
    <div className="relative size-28">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r="50" fill="none" stroke={c.sand} strokeWidth="12" />
        <circle cx="60" cy="60" r="50" fill="none" stroke={c.coral} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${v * 314} 314`} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-center"><span><span className="block text-[1.375rem] font-semibold leading-none tabular-nums" style={{ color: c.ink }}>10:00</span><span className="text-[0.6875rem]" style={{ color: c.muted }}>{label}</span></span></span>
    </div>
  );
}

export function B() {
  const proof = [
    <div key="a" className="flex items-center gap-5"><Ring v={0.72} label="min" /><div className="text-[0.8125rem]" style={{ color: c.muted }}><p className="font-semibold" style={{ color: c.ink }}>Lektion 3 af 12</p><p>Dit første udkast</p></div></div>,
    <div key="b" className="flex h-24 w-[15rem] items-end gap-1.5" role="img" aria-label="Score fra 54 til 86">
      {attempts.map((v, i) => <div key={i} className="flex-1 rounded-[6px]" style={{ height: `${v}%`, background: i === attempts.length - 1 ? c.coral : c.ink, opacity: i === attempts.length - 1 ? 1 : 0.25 + i * 0.12 }} />)}
      <span className="ml-2 self-start text-[2rem] font-semibold leading-none tabular-nums" style={{ color: c.coral }}>86</span>
    </div>,
    <div key="c" className="w-[13rem] rotate-[3deg] md:mr-3"><Image src="/cert/certifikat-v7.webp" alt="Kursusbevis med navn og ID" width={2248} height={1588} sizes="15rem" className="h-auto w-full rounded-[4px] shadow-[0_24px_40px_-20px_rgba(32,22,19,0.5)]" /></div>,
  ];
  return (
    <section className="bg-white">
      <div className={`${wrap} py-12 lg:py-16`}>
        {items.map((it, i) => (
          <article key={it.t} className="grid items-center gap-6 border-t py-10 md:grid-cols-[2.5rem_1.3fr_1fr_16rem] md:gap-10 lg:py-12" style={{ borderColor: c.line }}>
            <span className="text-[0.8125rem] font-semibold tabular-nums" style={{ color: c.coral }}>0{i + 1}</span>
            <h3 className={`${display} text-[clamp(2.75rem,1.6rem+3vw,5rem)]`} style={{ color: c.ink }}>{it.t}</h3>
            <p className="max-w-[22rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</p>
            <div className="md:justify-self-end">{proof[i]}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* C · Fortælling med fast liste: the list stays put on the left while the product changes on the right as you scroll. */
export function C() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section style={{ background: c.sand }}>
      <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28`}>
        <div className="hidden lg:block">
          <ol className="sticky top-[calc(50svh-11rem)] grid gap-2">
            {items.map((it, i) => (
              <li key={it.t} className={`rounded-[20px] p-6 transition-all duration-500 ${active === i ? "bg-white shadow-[0_24px_50px_-30px_rgba(32,22,19,0.45)]" : "opacity-45"}`}>
                <div className="flex items-baseline gap-4">
                  <span className="text-[0.8125rem] font-semibold tabular-nums" style={{ color: c.coral }}>0{i + 1}</span>
                  <h3 className={`${display} text-[2.5rem]`} style={{ color: c.ink }}>{it.t}</h3>
                </div>
                <p className={`ml-9 overflow-hidden text-[0.9375rem] leading-relaxed transition-all duration-500 ${active === i ? "mt-2 max-h-24" : "max-h-0"}`} style={{ color: c.muted }}>{it.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid gap-12 lg:gap-6">
          {items.map((it, i) => {
            const Card = cards[i];
            return (
              <div key={it.t} data-i={i} ref={(el) => { refs.current[i] = el; }}>
                <div className="mb-5 lg:hidden">
                  <h3 className={`${display} text-[2.5rem]`} style={{ color: c.ink }}>{it.t}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</p>
                </div>
                <div className="h-[28rem] sm:h-[34rem] lg:h-[38rem]"><Card big /></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
