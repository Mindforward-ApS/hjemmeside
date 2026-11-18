"use client";

// Three new versions of the closing CTA "Få hele teamet i gang" (Marco 2026-11-03). Same heading, text, buttons and
// links as CtaBand() in NyForside. The hero's team card stays on a phone in A and B (Marco: "det team kort … på
// telefonen"). Proof is real product UI: team card, score chart, the approved certificate V7.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { ScoreKurve } from "@/components/lab/ScoreKort";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", peach: "#f6c9b6", sand: "#efe7e1", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Få hele teamet i gang";
const PARA = "Fra 5 brugere. Teamoverblik, rapport og databehandleraftale er med.";
const CERT = { src: "/cert/certifikat-v7.webp", w: 2248, h: 1588, alt: "Kursusbevis fra Mindforward med navn, kursus, score og ID" };
const faces = ["mette-krogh", "jonas-bak", "line-vestergaard", "peter-skov", "sara-damgaard"];

/* Same as Fit in NyForside: scales a card from its design width, rem-aware. */
export function Fit({ w, children }: { w: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [z, setZ] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setZ(el.clientWidth / ((w / 16) * parseFloat(getComputedStyle(document.documentElement).fontSize))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="w-full min-w-0">
      <div style={{ width: `${w / 16}rem`, zoom: z ?? 1, visibility: z ? "visible" : "hidden" }}>{children}</div>
    </div>
  );
}

function Phone({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[13rem] rounded-[2.2rem] p-2 shadow-[0_40px_70px_-25px_rgba(32,22,19,0.65)] sm:w-[15rem] ${className}`} style={{ background: c.dark }}>
      <div className="relative h-[24rem] overflow-hidden rounded-[1.8rem] sm:h-[28rem]" style={{ background: "#fbf6f2" }}>
        <span aria-hidden className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full" style={{ background: c.dark }} />
        <div className="px-2 pt-10"><Fit w={300}><KortRangliste /></Fit></div>
      </div>
    </div>
  );
}

function Buttons({ onDark = false, center = false }: { onDark?: boolean; center?: boolean }) {
  return (
    <div className={`mt-7 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={appLinks.startBusiness} className="nf-focus nf-press group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-transform" style={onDark ? { background: "#fff", color: c.ink } : { background: c.dark, color: "#fff" }}>
        Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link href="/kontakt" className={`nf-focus nf-press inline-flex h-12 items-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium transition-colors ${onDark ? "hover:bg-white/10" : "hover:bg-white/40"}`} style={onDark ? { borderColor: "rgba(255,255,255,0.5)", color: "#fff" } : { borderColor: c.dark, color: c.ink }}>Book 15 min</Link>
    </div>
  );
}

const css = `.nf-focus:focus-visible{outline:2px solid #e8664a;outline-offset:3px}.nf-press:active{transform:scale(0.97)}
@keyframes v3Float{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-8px) rotate(var(--r,0deg))}}
.v3-float{transform:rotate(var(--r,0deg));animation:v3Float var(--d,7s) ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.v3-float{animation:none}.nf-press:active{transform:none}}`;

/* ——— A · Mørk scene: dark band, copy left; right the certificate tilted behind the phone with the team card. ——— */
export function A() {
  return (
    <section id="virksomheder" className="scroll-mt-6 bg-white py-24 lg:py-32">
      <style>{css}</style>
      <div className={wrap}>
        <div className="relative grid overflow-hidden rounded-[32px] lg:grid-cols-[1fr_1.1fr]" style={{ background: "radial-gradient(120% 90% at 85% 10%, #5a3226 0%, #2c1f1b 45%, #201613 100%)" }}>
          <div className="relative z-10 p-8 sm:p-12 lg:self-center lg:py-20 lg:pl-14">
            <h2 className={`${h2} !text-white`}>{HEAD}</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-white/70">{PARA}</p>
            <Buttons onDark />
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">{faces.map((f) => <span key={f} className="relative size-9 overflow-hidden rounded-full ring-2 ring-[#2c1f1b]"><Image src={`/img/people/${f}.webp`} alt="" fill sizes="36px" className="object-cover object-top" /></span>)}</div>
              <span className="text-[0.8125rem] text-white/60">Fra 5 brugere</span>
            </div>
          </div>
          <div className="relative h-[27rem] sm:h-[34rem] lg:h-auto lg:min-h-[36rem]">
            <div className="absolute left-[6%] top-[14%] w-[78%] -rotate-[7deg] overflow-hidden rounded-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:left-[10%] sm:w-[70%] lg:left-[4%] lg:top-[18%] lg:w-[74%]">
              <Image src={CERT.src} alt={CERT.alt} width={CERT.w} height={CERT.h} sizes="(min-width:1024px) 520px, 80vw" className="block h-auto w-full" />
            </div>
            <div className="absolute -bottom-16 right-[6%] origin-bottom scale-[0.8] sm:-bottom-20 sm:right-[10%] sm:scale-100 lg:right-[12%]">
              <Phone className="v3-float [--r:5deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— B · Scenen rejser sig: centred copy on the peach gradient; score chart, phone and certificate rise from the
   bottom edge of the card and are cropped by it. ——— */
export function B() {
  return (
    <section id="virksomheder" className="scroll-mt-6 bg-white py-24 lg:py-32">
      <style>{css}</style>
      <div className={wrap}>
        <div className="relative overflow-hidden rounded-[32px] px-6 pt-14 text-center sm:px-12 sm:pt-20" style={{ background: "linear-gradient(160deg, #fbd5c4 0%, #f6b49b 55%, #f9e4d8 100%)" }}>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mx-auto mt-4 max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: "#4a3a34" }}>{PARA}</p>
          <Buttons center />
          <div className="relative mx-auto mt-14 h-[19rem] max-w-[62rem] sm:h-[24rem]">
            <div className="absolute left-0 top-16 hidden w-[19rem] -rotate-[6deg] text-left md:block lg:left-[2%] lg:w-[21rem]">
              <Fit w={340}><ScoreKurve /></Fit>
            </div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <Phone className="v3-float [--r:0deg]" />
            </div>
            <div className="absolute right-0 top-20 hidden w-[20rem] rotate-[6deg] overflow-hidden rounded-[8px] shadow-[0_40px_70px_-30px_rgba(32,22,19,0.6)] md:block lg:right-[2%] lg:w-[23rem]">
              <Image src={CERT.src} alt={CERT.alt} width={CERT.w} height={CERT.h} sizes="370px" className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— C · Det er med: copy and buttons left; right a bento that shows exactly what the text promises, one card
   per word: Teamoverblik (team card), Rapport (score chart), Databehandleraftale (signed document). ——— */
export function C() {
  const label = (t: string, i: Parameters<typeof Icon>[0]["name"]) => (
    <p className="mb-3 flex items-center gap-2 text-[0.8125rem] font-semibold" style={{ color: c.ink }}><span className="grid size-6 place-items-center rounded-full bg-white" style={{ color: c.coral }}><Icon name={i} size={12} /></span>{t}</p>
  );
  return (
    <section id="virksomheder" className="scroll-mt-6 bg-white py-24 lg:py-32">
      <div className={wrap}>
        <style>{css}</style>
        <div className="grid gap-10 rounded-[32px] p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] [&>*]:min-w-0 lg:gap-12 lg:p-14" style={{ background: c.cream }}>
          <div className="lg:self-center">
            <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
            <Buttons />
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-4">
              <div className="flex -space-x-2">{faces.map((f) => <span key={f} className="relative size-8 overflow-hidden rounded-full ring-2 ring-white"><Image src={`/img/people/${f}.webp`} alt="" fill sizes="32px" className="object-cover object-top" /></span>)}</div>
              <span className="text-[0.8125rem] font-medium" style={{ color: c.ink }}>Fra 5 brugere</span>
            </div>
          </div>
          <div className="grid min-w-0 items-start gap-4 sm:grid-cols-2 [&>*]:min-w-0">
            <div>
              {label("Teamoverblik", "user")}
              <Fit w={320}><KortRangliste /></Fit>
            </div>
            <div>
              {label("Rapport", "doc")}
              <Fit w={340}><ScoreKurve /></Fit>
            </div>
            <div className="sm:col-span-2">
              {label("Databehandleraftale", "shield")}
              <div className="relative grid gap-5 overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(32,22,19,0.5)] sm:grid-cols-[1fr_1.2fr] sm:items-center sm:p-6">
                <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-[12px]" style={{ background: c.coralSoft, color: c.coral }}><Icon name="doc" size={18} /></span>
                  <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold" style={{ background: "#e6f4ec", color: c.green }}><Icon name="check" size={11} />Underskrevet</span>
                </div>
                <p className="mt-4 text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Databehandleraftale</p>
                <p className="text-[0.75rem]" style={{ color: c.muted }}>Eksempel · PDF</p>
                </div>
                <div>
                <div className="grid gap-1.5" aria-hidden>{[100, 92, 96, 70].map((w, k) => <span key={k} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: c.sand }} />)}</div>
                <div className="mt-5 flex items-end justify-between border-t pt-3" style={{ borderColor: c.line }}>
                  <svg width="96" height="26" viewBox="0 0 96 26" aria-hidden><path d="M2 18c8-14 14 6 20-2s8-12 14-2 10 8 16-4 10 4 16 2 12-8 26-4" fill="none" stroke={c.ink} strokeWidth="1.6" strokeLinecap="round" /></svg>
                  <Icon name="lock" size={14} className="mb-1 text-[#9a908c]" />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
