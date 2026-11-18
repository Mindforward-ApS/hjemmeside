"use client";

// Hero test 2026-11-05 (Marco: "hvis vi fjerner de 3 kort? … overskriften skal være midtpunktet, så det er den første
// man kigger på"). Three variants, no cards; the headline is the focal point and a platform video is the one companion.
// A · Stor midte  (refs: Polestar, Linear): centred giant headline, the platform video rises from the bottom edge.
// B · Plakat      (refs: Too Good To Go, B&O): headline fit edge to edge over blurred DOKK1, small video player.
// C · Video bag   (ref: Pleo): the platform video fills the stage behind the headline, darkened.
// The video is a placeholder (current øvemiljø clip) until a real screen recording from the platform exists.
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { appLinks } from "@/lib/app";
import { gsap, SplitText, useGSAP, motionQuery } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { Nav, HeroLogos, Hero as NyHero } from "@/components/lab/NyForside";

const c = { dark: "#201613", ink: "#201613", coral: "#e8664a" };
const display = "font-[family-name:var(--font-bebas)] uppercase tracking-[0.005em]";
const VIDEO = "/video/oevemiljoe.mp4";
const POSTER = "/video/oevemiljoe-poster.webp";

function Ctas({ center = false, secondary = true }: { center?: boolean; secondary?: boolean }) {
  return (
    <div data-in className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={appLinks.startBusiness} className="nf-focus group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>
        Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      {secondary && (
        <Link href="/kurser/ai-paa-arbejdet" className="nf-focus group inline-flex h-12 items-center gap-2.5 rounded-full border border-[#f7f2ee]/30 px-6 text-[0.9375rem] font-medium text-[#f7f2ee] transition-colors hover:border-[#f7f2ee]/60 hover:bg-white/5">
          <Icon name="play" size={13} className="translate-x-px" /> Se platformen
        </Link>
      )}
    </div>
  );
}

function Facts({ center = false }: { center?: boolean }) {
  return (
    <p data-in className={`mt-5 flex flex-col gap-1 text-[0.8125rem] text-white/65 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5 ${center ? "items-center sm:justify-center" : ""}`}>
      <span>Fra 69 kr. pr. bruger om måneden</span><span aria-hidden className="hidden size-1 rounded-full bg-white/35 sm:block" />
      <span>Ingen binding · ChatGPT, Copilot og Claude</span>
    </p>
  );
}

function Dokk1({ blur = 0 }: { blur?: number }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image src="/img/unsplash/dokk1.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[60%_62%]" style={{ filter: blur ? `blur(${blur}px)` : undefined, transform: blur ? "scale(1.05)" : undefined }} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0.68) 0%, rgba(32,22,19,0.6) 45%, rgba(32,22,19,0.9) 100%)" }} />
    </>
  );
}

/* ───── A · Stor midte ───── */
function A() {
  return (
    <section data-hero className="relative overflow-hidden" style={{ background: c.dark }}>
      <Dokk1 blur={3} />
      <div className="relative"><Nav /></div>
      <div className="relative flex flex-col items-center px-5 pt-[5svh] text-center sm:px-[3.5vw]">
        <h1 data-title className={`${display} text-[clamp(5rem,1rem+14vw,15rem)] leading-[0.84] text-white`}>
          <span className="block">AI-træning</span>
          <span className="block">til hele holdet</span>
        </h1>
        <p data-in className="mt-6 max-w-[36rem] text-[1.125rem] leading-relaxed text-white/80">
          Ti minutter om dagen på dansk. En opgave fra jeres egen hverdag og en score, så I ser, hvor I står.
        </p>
        <Ctas center />
        <Facts center />
        {/* The platform rises from the bottom edge; scroll reveals it fully. */}
        <div data-rise className="relative mt-10 w-full overflow-hidden rounded-t-[22px] ring-1 ring-white/15 shadow-[0_-30px_120px_rgba(232,102,74,0.18)]">
          <video src={VIDEO} poster={POSTER} autoPlay muted loop playsInline className="block aspect-video w-full object-cover" aria-label="Video af platformen (pladsholder)" />
        </div>
      </div>
    </section>
  );
}

/* ───── B · Plakat ───── */
// Line 2 runs exactly edge to edge: Bebas measured at 100 px, "til hele holdet" is 508 px wide, so the size is
// 100/5.08 ≈ 19.6 % of the content width. Line 1 uses the same size and stays ragged-right (natural tracking).
function B() {
  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col overflow-hidden" style={{ background: c.dark }}>
      <Dokk1 blur={3} />
      <div className="relative"><Nav /></div>
      <div className="relative flex flex-1 flex-col justify-center px-5 pt-12 sm:px-[3.5vw] sm:pt-16">
        <div className="@container">
          <h1 data-title className={`${display} leading-[0.82] text-white`}>
            <span className="block whitespace-nowrap text-[19.6cqi]">AI-træning</span>
            <span className="block whitespace-nowrap text-[19.6cqi]">til hele holdet</span>
          </h1>
        </div>
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p data-in className="max-w-[34rem] text-[1.125rem] leading-relaxed text-white/80">
              Ti minutter om dagen på dansk. En opgave fra jeres egen hverdag og en score, så I ser, hvor I står.
            </p>
            <Ctas secondary={false} />
            <Facts />
          </div>
          <Link href="/kurser/ai-paa-arbejdet" aria-label="Se platformen, 0:45" data-in className="group relative block w-full max-w-[360px] overflow-hidden rounded-[18px] ring-1 ring-white/20">
            <video src={VIDEO} poster={POSTER} autoPlay muted loop playsInline className="block aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" aria-label="Video af platformen (pladsholder)" />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-[0.8125rem] font-semibold" style={{ color: c.ink }}>
              <span className="grid size-7 place-items-center rounded-full text-white" style={{ background: c.dark }}><Icon name="play" size={11} className="translate-x-px" /></span>
              Se platformen · 0:45
            </span>
          </Link>
        </div>
      </div>
      <div className="relative pt-10"><HeroLogos /></div>
    </section>
  );
}

/* ───── C · Video bag teksten ───── */
function C() {
  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col overflow-hidden" style={{ background: c.dark }}>
      <video src={VIDEO} poster={POSTER} autoPlay muted loop playsInline aria-hidden className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[8px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(32,22,19,0.82) 0%, rgba(32,22,19,0.9) 60%, rgba(32,22,19,0.96) 100%)" }} />
      <div className="relative"><Nav /></div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 data-title className={`${display} text-[clamp(5rem,1rem+14vw,15rem)] leading-[0.84] text-white`}>
          <span className="block">AI-træning</span>
          <span className="block">til hele holdet</span>
        </h1>
        <p data-in className="mt-6 max-w-[36rem] text-[1.125rem] leading-relaxed text-white/80">
          Ti minutter om dagen på dansk. En opgave fra jeres egen hverdag og en score, så I ser, hvor I står.
        </p>
        <Ctas center />
        <Facts center />
      </div>
      <div className="relative"><HeroLogos /></div>
    </section>
  );
}

/* ───── D · Som nu, video i stedet for kortene ───── */
function D() {
  return <NyHero media="video" />;
}

const variants = { D, A, B, C } as const;
type V = keyof typeof variants;

export function HeroOverskrift() {
  const [v, setV] = useState<V>("D");
  const root = useRef<HTMLDivElement>(null);
  const Hero = variants[v];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQuery, () => {
        const q = gsap.utils.selector(root);
        const title = q("[data-title],[data-hero-title]")[0] as HTMLElement | undefined;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (title) {
          const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "nf-line" });
          tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0.05);
        }
        tl.from(q("[data-in],[data-hero-in]"), { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.4)
          .from(q("[data-hero-card]"), { y: 40, opacity: 0, scale: 0.97, duration: 1.1 }, 0.3);
        const rise = q("[data-rise]")[0];
        if (rise) {
          gsap.from(rise, { y: 80, opacity: 0, duration: 1.2 }, );
          gsap.fromTo(rise, { scale: 0.92 }, { scale: 1, ease: "none", scrollTrigger: { trigger: rise, start: "top bottom", end: "top 20%", scrub: true } });
        }
      });
    },
    { scope: root, dependencies: [v], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="bg-white">
      <style>{`
        @keyframes hlScroll { to { transform: translateX(-50%); } }
        .hl-track { animation: hlScroll 38s linear infinite; }
        .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; }
        .nf-focus:focus-visible { outline: 2px solid #e8664a; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .hl-track { animation: none; } }
      `}</style>
      <Hero key={v} />
      {/* A/B/C switcher */}
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">Hero</span>
        {(Object.keys(variants) as V[]).map((k) => (
          <button key={k} onClick={() => { setV(k); window.scrollTo(0, 0); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "text-white" : "text-[#201613] hover:bg-black/5"}`} style={v === k ? { background: c.dark } : undefined}>
            {k} · {k === "D" ? "Som nu + video" : k === "A" ? "Stor midte" : k === "B" ? "Plakat" : "Video bag"}
          </button>
        ))}
      </div>
      <div className="h-[60vh] bg-[#f7f2ee]" />
    </div>
  );
}
