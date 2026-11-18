"use client";

// "Bliv en af de første" — three versions in the style of the current pilot section (Marco 2026-11-05).
// Copy unchanged (heading, paragraph, three perks, Book 15 min + start a course). Marco wants more photos on the
// page, so two versions use the own Unsplash photo of two colleagues at a whiteboard (feedback.jpg).
// 1 · Med foto: the current split; the left side becomes a tall photo with the heading and buttons on it.
// 2 · Foto i fuld bredde: the photo fills the section, darkened; the perks as a row along the bottom.
// 3 · Koral flade: the whole section in coral with a huge Bebas heading and the perks in three columns.
import Image from "next/image";
import Link from "next/link";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { usePhoto } from "@/components/lab/photoOverride";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const PARA = "Vi søger de første danske hold, der vil træne AI med os. Som pilotkunde får I:";
const perks = [
  { t: "Direkte kontakt til os", d: "Vi svarer inden for 1 hverdag." },
  { t: "I er med til at forme kurserne", d: "Jeres opgaver og spørgsmål former de næste lektioner." },
  { t: "Ingen binding", d: "I kan stoppe, når I vil." },
];
const PHOTO = "/img/unsplash/feedback.jpg";

function Buttons({ onCoral = false }: { onCoral?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href="/kontakt" data-btn="primary" className="group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={onCoral ? { background: c.dark, color: "#fff" } : { background: c.coral, color: c.ink }}>
        Book 15 min <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link href={appLinks.startBusiness} className={`text-[0.9375rem] font-medium underline underline-offset-4 ${onCoral ? "decoration-[rgba(32,22,19,0.35)] hover:decoration-current" : "text-white/80 decoration-white/30 hover:text-white hover:decoration-white"}`} style={onCoral ? { color: c.ink } : undefined}>Eller start et kursus</Link>
    </div>
  );
}

const Tick = ({ onCoral = false }: { onCoral?: boolean }) => (
  <span className="grid size-9 shrink-0 place-items-center rounded-full" style={onCoral ? { background: c.dark, color: "#fff" } : { background: "rgba(232,102,74,0.15)", color: c.coral }}><Icon name="check" size={16} /></span>
);

/* ───── 1 · Med foto ───── */
export function Pi1() {
  return (
    <section className="py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={`${wrap} grid items-stretch gap-4 lg:grid-cols-[1.05fr_1fr]`}>
        <div className="relative min-h-[30rem] overflow-hidden rounded-[28px]">
          <Image src={PHOTO} alt="To kolleger gennemgår en opgave ved en tavle" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[70%_40%]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(32,22,19,0.95) 0%, rgba(32,22,19,0.45) 50%, rgba(32,22,19,0.05) 100%)" }} />
          <div className="absolute inset-x-7 bottom-7 sm:inset-x-10 sm:bottom-10">
            <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Pilotforløb</span>
            <h2 className={`${h2} mt-4 !text-white`}>Bliv en af de første</h2>
            <p className="mt-4 max-w-[28rem] text-[1.0625rem] leading-relaxed text-white/75">{PARA}</p>
            <div className="mt-7"><Buttons /></div>
          </div>
        </div>
        <ul className="grid gap-4">
          {perks.map((x, i) => (
            <li key={x.t} className="flex flex-col justify-between gap-6 rounded-[28px] p-7 ring-1 ring-white/10 sm:p-9" style={{ background: c.dark2 }}>
              <div className="flex items-center justify-between"><Tick /><span className={`${display} text-[length:calc(var(--dz,1)*2.5rem)] leading-none text-white/15`}>0{i + 1}</span></div>
              <div><p className="text-[1.375rem] font-semibold text-white">{x.t}</p><p className="mt-1.5 text-[1rem] leading-relaxed text-white/65">{x.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── 2 · Foto i fuld bredde ───── */
export function Pi2() {
  const ph = usePhoto("pilot", { src: PHOTO, pos: "70% 35%" });
  return (
    <section className="relative overflow-hidden" style={{ background: c.dark }}>
      <Image src={ph.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: ph.pos }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(32,22,19,0.92) 0%, rgba(32,22,19,0.6) 50%, rgba(32,22,19,0.3) 100%), linear-gradient(0deg, rgba(32,22,19,0.95) 0%, transparent 45%)" }} />
      <div className={`${wrap} relative flex min-h-[44rem] flex-col justify-between gap-16 py-20 lg:min-h-[48rem] lg:py-24`}>
        <div>
          <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Pilotforløb</span>
          <h2 className={`${display} mt-5 max-w-[10ch] text-[length:calc(var(--dz,1)*clamp(3.5rem,2rem+5vw,7rem))] !text-white`}>Bliv en af de første</h2>
          <p className="mt-5 max-w-[30rem] text-[1.125rem] leading-relaxed text-white/80">{PARA}</p>
          <div className="mt-8"><Buttons /></div>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {perks.map((x) => (
            <li key={x.t} className="flex items-start gap-4 rounded-[22px] p-6 ring-1 ring-white/15 backdrop-blur-md" style={{ background: "rgba(32,22,19,0.6)" }}>
              <Tick />
              <div><p className="text-[1.125rem] font-semibold text-white">{x.t}</p><p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">{x.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── 3 · Koral flade ───── */
export function Pi3() {
  return (
    <section className="py-24 lg:py-32" style={{ background: c.coral }}>
      <div className={wrap}>
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <h2 className={`${display} text-[length:calc(var(--dz,1)*clamp(4rem,2rem+7vw,9.5rem))]`} style={{ color: c.ink }}>Bliv en af<br />de første</h2>
          <div className="lg:pb-4">
            <p className="max-w-[28rem] text-[1.125rem] leading-relaxed" style={{ color: c.ink }}>{PARA}</p>
            <div className="mt-7"><Buttons onCoral /></div>
          </div>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] md:grid-cols-3" style={{ background: "rgba(32,22,19,0.15)" }}>
          {perks.map((x) => (
            <li key={x.t} className="flex flex-col gap-5 p-7 sm:p-9" style={{ background: c.coral }}>
              <Tick onCoral />
              <div><p className="text-[1.375rem] font-semibold" style={{ color: c.ink }}>{x.t}</p><p className="mt-1.5 text-[1rem] leading-relaxed" style={{ color: "rgba(32,22,19,0.75)" }}>{x.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
