"use client";

// New home in the style of Marco's reference (design/references/moneyhub-ref.webp, 2026-11-02): "This one is
// insane but keep our colors". Same structure and grammar (condensed caps headings, card grids, photo cards with
// floating chips, dark hero + light sections, stat row, gradient CTA band), in Mindforward's brown, cream and coral.
// Round 2 (Marco: "størrelsesforhold" + "føles i live og interaktivt, tal der stiger"): calmer type scale, bigger
// product cards, and a motion layer: hero build-up, a live score widget that works through tasks, count-ups,
// growing bars, the three AI tools taking turns, a live certificate check and a quote carousel. No pointer effects.
// Only real product facts; anything that is not real yet is marked "Eksempel" or "Pladsholder".
// prefers-reduced-motion: every animation is skipped and the final values are shown.
import Image from "next/image";
import Link from "next/link";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { HeroStories } from "@/components/lab/HeroStories";
import { LaunchBar } from "@/components/lab/LaunchBar";
import { MindDirector } from "@/components/mind/MindDirector";
import "./knapper.css";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { appLinks } from "@/lib/app";
import { setSiteMode, useSiteMode } from "@/lib/siteMode";
import { gsap, ScrollTrigger, SplitText, useGSAP, motionQuery } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { UiMotionProvider, type UiMode } from "@/components/lab/uiMotion";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { DemoLogo, ownLogos } from "@/components/night/DemoLogos";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { ScoreKurve } from "@/components/lab/ScoreKort";
import { KortOevelse, LederFeed } from "@/components/lab/HeroLive";
import { F as FordeleFotokort } from "@/components/lab/Fordele";
import { StartCalendly } from "@/components/lab/StartCalendly";
import { StartKort } from "@/components/lab/StartKort";
import { UseCases } from "@/components/lab/UseCases";
import { OevKort } from "@/components/lab/OevKort";
import { Forside2 } from "@/components/lab/Forside2";
import { Forside3 } from "@/components/lab/Forside3";
import * as Oev3 from "@/components/lab/OevemiljoeVarianter";
import * as Pilot3 from "@/components/lab/PilotTre";
import * as Start3 from "@/components/lab/StartTre";
import { N as FaerdighederKarrusel } from "@/components/lab/Faerdigheder";
import { V3 as FaerdighederMoerk } from "@/components/lab/FaerdighederVarianter";
import { P as OevelseLaptop } from "@/components/lab/Oevelse";
import { C1 as CertifikatSkarp } from "@/components/lab/CertVarianter";
import { K1 as CtaKarussel } from "@/components/lab/CtaVarianter";
import { A as PrisCalendly } from "@/components/lab/PrisVarianter2";
import { Pi2 as PilotFoto } from "@/components/lab/PilotVarianter";
import { HeroLunar } from "@/components/lab/HeroLunar";
import { HeroPleo } from "@/components/lab/HeroPleo";
import { MiwaLive } from "@/components/lab/MiwaLive";
import { MiwaForloeb } from "@/components/lab/MiwaForloeb";
import { videoVersions, type VideoVersion } from "@/components/lab/VideoSektion";

const c = {
  dark: "#201613",
  dark2: "#2c1f1b",
  cream: "#f7f2ee",
  sand: "#efe7e1",
  ink: "#201613",
  muted: "#5a4a44",
  coral: "#e8664a",
  coralSoft: "#fbe1d7",
  peach: "#f6c9b6",
};

// Type scale (round 2): H1 ≈ 88 px, H2 ≈ 64 px at 1440; card titles 24 px; body 16/15 px.
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
// Side margins measured from the reference: about 6.5 % of the viewport on each side (was a fixed 1200 px column).
const wrap = "w-full px-5 sm:px-[3.5vw]";

const tools = [
  { name: "ChatGPT", src: "/logos/chatgpt.png" },
  { name: "Copilot", src: "/logos/copilot.png" },
  { name: "Claude", src: "/logos/claude.png" },
];

/* ───────────── small motion helpers ───────────── */

const reduceMq = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(reduceMq);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
// Server and first paint assume reduced motion, so nothing starts moving before hydration.
function useReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(reduceMq).matches, () => true);
}

function useInView<T extends Element>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}



function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${dark ? "bg-white/10 text-white/75" : "bg-[#efe7e1] text-[#5a4a44]"}`}>{children}</span>;
}

function IconChip({ name }: { name: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-[12px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" style={{ background: c.sand, color: c.ink }}>
      <Icon name={name} size={18} />
    </span>
  );
}

// One slot where the three tools take turns (logo + name), sliding up every 2.2 s. Reduced motion: no cycling, Claude stays.
const cycleTools = [tools[2], tools[0], tools[1]];
function ToolCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % cycleTools.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);
  const t = cycleTools[i];
  return (
    <span className="relative -ml-1 inline-flex h-7 min-w-[7.5rem] items-center overflow-hidden" aria-label="Claude, ChatGPT og Copilot">
      <span key={t.name} aria-hidden className="nf-cycle inline-flex items-center gap-2 font-semibold text-white">
        <Image src={t.src} alt="" width={20} height={20} className="size-5 rounded-[5px]" />
        {t.name}
      </span>
    </span>
  );
}

/* ───────────── Nav ───────────── */
export function Nav({ switcher, cta = "Sign up" }: { switcher?: ReactNode; cta?: string } = {}) {
  // "Tilmeld jer" / "Tilmeld dig" open the app's onboarding for companies or private members.
  const siteMode = useSiteMode();
  return (
    <header className={`${wrap} relative z-20 flex h-20 items-center gap-6`}>
      <Link href="/" aria-label="Mindforward forside"><MindforwardLogo size={30} live /></Link>
      <ul className="mx-auto hidden items-center gap-8 text-[0.9375rem] text-white/80 lg:flex">
        {([["Kurser", "#kurser"], ["Sådan virker det", "#saadan"], ["For virksomheder", "#virksomheder"], ["Priser", "#priser"]] as const).map(([l, href]) => (
          <li key={l}><Link href={href} className="nf-focus relative rounded-[4px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100">{l}</Link></li>
        ))}
      </ul>
      <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
        {/* Marco 2026-11-07: the Erhverv / Privat switch sits between Priser and Log ind (desktop). */}
        {switcher && <div className="hidden xl:block">{switcher}</div>}
        <Link href={appLinks.login} className="nf-focus hidden h-10 items-center rounded-full px-5 font-[family-name:var(--font-grotesk)] text-[13px] font-bold tracking-[-0.015em] text-white antialiased transition-colors hover:bg-white/10 sm:inline-flex">Log ind</Link>
        <GrebBtn href={siteMode === "privat" ? appLinks.buyPrivate() : appLinks.startBusiness} onDark>{cta}</GrebBtn>
      </div>
    </header>
  );
}

/* ───────────── 1 · Hero ───────────── */

// The live score widget works through the tasks of a course by itself: bars rise, the score counts up.












// D · UI-kit collage (Marco 2026-11-02, after his UI-kit reference and "du har bare presset det hele ned"): four
// roomy white cards in two staggered columns, one subject per card, big numbers, soft deep shadows. Example data.





// Renders a card at its design width and scales it (CSS zoom) to the width it gets, so the chosen cards keep their
// exact proportions in the hero on every screen.
export function Fit({ w, children }: { w: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [z, setZ] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Cards are sized in rem and the root font grows on big screens, so the design width is w/16 rem.
    const ro = new ResizeObserver(() => setZ(el.clientWidth / ((w / 16) * parseFloat(getComputedStyle(document.documentElement).fontSize))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="w-full min-w-0 overflow-hidden">
      <div style={{ width: `${w / 16}rem`, zoom: z ?? 1, visibility: z ? "visible" : "hidden" }}>{children}</div>
    </div>
  );
}

function HeroCollage({ privat = false }: { privat?: boolean }) {
  // Marco 2026-11-02: move all three cards together (no size or shape change) so the space between the header and
  // the cards equals the space between the cards and the logo marquee. Measured, applied as a transform only.
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = boxRef.current;
    const hero = box?.closest("[data-hero]");
    if (!box || !hero) return;
    const fit = () => {
      box.style.transform = "";
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const header = hero.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const label = hero.querySelector("[data-logos] p")?.getBoundingClientRect().top ?? 0;
      const cards = [...box.querySelectorAll("[data-hero-card]")].map((e) => e.getBoundingClientRect());
      const top = Math.min(...cards.map((r) => r.top)), bottom = Math.max(...cards.map((r) => r.bottom));
      const dy = Math.round(((label - bottom) - (top - header)) / 2);
      box.style.transform = `translateY(${dy}px)`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(hero);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={boxRef} className="relative ml-auto w-full min-w-0 lg:max-w-[calc((100svh-13rem)/1.24)]">
      {/* Cards render at a readable design size (top 340, big 700) and only scale a little, so all text stays legible. */}
      <div className="grid items-start gap-4 sm:grid-cols-2">
        {/* Marco: the two top cards share one height and keep clear of the header. The row keeps its old height
            (479 design px) and the cards sit at its bottom, so nothing else moves. */}
        <div className="min-w-0"><Fit w={340}><div className="flex h-[29.94rem] items-end"><div data-hero-card className="h-[22.5rem] w-full"><KortOevelse fill privat={privat} /></div></div></Fit></div>
        <div className="min-w-0"><Fit w={340}><div className="flex h-[29.94rem] items-end"><div data-hero-card className="h-[22.5rem] w-full"><ScoreKurve fill privat={privat} /></div></div></Fit></div>
      </div>
      <div data-hero-card className="mt-4 min-w-0">
        <div className="hidden sm:block"><Fit w={700}><LederFeed wide privat={privat} /></Fit></div>
        <div className="sm:hidden"><Fit w={360}><LederFeed privat={privat} /></Fit></div>
      </div>
    </div>
  );
}


/* Customer marquee at the bottom of the hero (Marco 2026-11-02). Runs constantly, pauses on hover and has a pause
   button (WCAG 2.2.2). The logos are the fictional demo logos until real pilot customers exist. */
export function HeroLogos() {
  // Marco 2026-11-07: only SydDesign and Leadline, standing still (no carousel, so no pause button either).
  const leadline = ownLogos.find((l) => l.name === "Leadline")!;
  return (
    <div data-logos className={`${wrap} relative pb-8`}>
      <div className="flex items-center gap-4">
        <p className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/55">Virksomheder, der træner AI med os</p>
        <span aria-hidden className="h-px flex-1 bg-white/10" />
      </div>
      <ul className="mt-5 flex flex-wrap items-center gap-x-14 gap-y-4 text-white/60">
        <li>
          {/* SydDesign's real logo, tinted with currentColor through a mask so it matches the wordmark next to it. */}
          <span role="img" aria-label="SydDesign" className="block h-[1.6rem] w-[7.9rem] bg-current transition-colors hover:text-white sm:h-[1.85rem] sm:w-[9.1rem]" style={{ maskImage: "url(/logos/syddesign.svg)", WebkitMaskImage: "url(/logos/syddesign.svg)", maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }} />
        </li>
        <li><DemoLogo logo={leadline} className="transition-colors hover:text-white" /></li>
      </ul>
    </div>
  );
}

// Virksomhed / Privat switch (Marco 2026-11-02, preview only): private visitors get their own data in the cards.
type Mode = "virksomhed" | "privat";
function ModeSwitch({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div role="tablist" aria-label="Vis siden for" className="relative mb-7 inline-grid grid-cols-2 rounded-full border border-white/15 bg-white/[0.06] p-1 text-[0.875rem] backdrop-blur">
      <span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: c.coral, transform: mode === "privat" ? "translateX(100%)" : "none" }} />
      {(["virksomhed", "privat"] as const).map((m) => (
        <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`relative rounded-full px-5 py-2 font-medium transition-colors ${mode === m ? "text-[#201613]" : "text-white/75 hover:text-white"}`}>
          {m === "virksomhed" ? "For virksomheder" : "For privat"}
        </button>
      ))}
    </div>
  );
}

// Erhverv / Privat as a thin bar above the menu (Marco 2026-11-07), the way Danish banks and telcos do it
// (Danske Bank, Nordea, Telenor, YouSee). Plain text tabs, the active one underlined. Each side has its own hero photo.
function TopBar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="relative z-20 border-b border-white/10 bg-black/30">
      <div role="tablist" aria-label="Vis siden for" className={`${wrap} flex h-9 items-stretch gap-6 text-[0.8125rem]`}>
        {(["virksomhed", "privat"] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`nf-focus relative font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:transition-opacity ${mode === m ? "text-white after:bg-white after:opacity-100" : "text-white/60 after:opacity-0 hover:text-white"}`}>
            {m === "virksomhed" ? "Erhverv" : "Privat"}
          </button>
        ))}
      </div>
    </div>
  );
}

// Marco 2026-11-05: "Videoen skulle bare placeret hvor de 3 kort var". Same column and footprint as the card collage,
// the platform video instead (placeholder clip until a real screen recording exists).
function HeroVideo() {
  return (
    <div className="relative ml-auto w-full min-w-0 lg:max-w-[calc((100svh-13rem)/1.0)]">
      <Link href="/kurser/ai-paa-arbejdet" aria-label="Se platformen, 0:45" data-hero-card className="nf-focus group relative block overflow-hidden rounded-[28px] ring-1 ring-white/15 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
        <video src="/video/oevemiljoe.mp4" poster="/video/oevemiljoe-poster.webp" autoPlay muted loop playsInline className="block aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" aria-label="Video af platformen (pladsholder)" />
        <span className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[0.875rem] font-semibold" style={{ color: c.ink }}>
          <span className="grid size-8 place-items-center rounded-full text-white" style={{ background: c.coral }}><Icon name="play" size={12} className="translate-x-px" /></span>
          Se platformen · 0:45
        </span>
      </Link>
    </div>
  );
}

// Marco 2026-11-21: Miwa's animated clip fills the whole hero ("Den skal fylde hele heroen"). She walks to the desk,
// works a moment, then stands and turns to the viewer. Anchored bottom right so the desk is always in view; the dark
// veil on the left keeps the white text readable. Plays once and stays on the last frame instead of looping, so she
// never jumps back. Reduced motion shows that last frame straight away.
function HeroMiwaVideoBg() {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return; }
    ref.current?.play().catch(() => setStill(true));
  }, []);
  const fit = "absolute inset-0 h-full w-full object-cover object-[78%_100%] lg:object-[100%_100%]";
  return (
    <div aria-hidden data-hero-bg className="pointer-events-none absolute inset-0 overflow-hidden">
      {still
        ? <Image src="/video/miwa-hero-slut.webp" alt="" fill priority sizes="100vw" className={fit} />
        : <video ref={ref} src="/video/miwa-hero.mp4" poster="/video/miwa-hero-start.webp" muted playsInline preload="auto" className={fit} />}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,13,11,0.86) 0%, rgba(20,13,11,0.7) 30%, rgba(20,13,11,0.25) 52%, transparent 66%), linear-gradient(180deg, rgba(20,13,11,0.55) 0%, transparent 18%, transparent 80%, rgba(20,13,11,0.7) 100%)" }} />
    </div>
  );
}

// Marco 2026-11-20: Miwa, the AI tutor, takes the team photo's place in the hero. Cut-out 3D figure standing on the
// dark hero background, with a warm coral glow behind her and a soft floor shadow so the black outfit stays readable.
function HeroMiwa({ pose }: { pose: "velkommen" | "glad" }) {
  return (
    <div className="relative mx-auto flex h-[min(78svh,46rem)] w-full max-w-[34rem] items-end justify-center lg:mr-0 lg:h-[calc(100svh-13rem)] lg:max-w-none">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.42), rgba(232,102,74,0.16) 45%, transparent 75%)" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-[-1.5%] left-1/2 h-[6%] w-[60%] -translate-x-1/2 rounded-[50%] blur-md" style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.7), transparent)" }} />
      <Image data-hero-person src={`/img/miwa/miwa-${pose}.webp`} alt="Miwa, Mindforwards AI-tutor" width={pose === "glad" ? 916 : 876} height={1466} priority sizes="(min-width:1024px) 40vw, 90vw" className="relative h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_0_28px_rgba(232,102,74,0.25)]" />
    </div>
  );
}

export function Hero({ toggle = false, media = "cards", navSwitch = false, miwa }: { toggle?: boolean; media?: "cards" | "video" | "none" | "stories"; navSwitch?: boolean; miwa?: "velkommen" | "glad" | "live" | "forloeb" | "video" }) {
  // Shared with the pricing section via lib/siteMode (Marco 2026-11-11: Privat must show private prices).
  const mode = useSiteMode();
  const setMode = setSiteMode;
  const privat = (toggle || navSwitch) && mode === "privat";
  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col overflow-hidden" style={{ background: c.dark }}>
      {/* DOKK1 in Aarhus at dusk (Nicolas Weldingh, Unsplash License) behind the stage, under a dark, see-through veil
          (Marco 2026-11-02: first brown, then "mørkt slør og transparent"). Drifts a little on scroll. */}
      {/* Marco 2026-11-07: his own photo (Gemini-generated, mood only, never presented as a customer), with a dark tone.
          "Zoom ud": on wide screens the whole photo width is shown (no extra parallax height); below it fades into the
          dark background. Phones keep a cover crop on her. */}
      {/* Erhverv shows the office team, Privat the woman at home (Marco 2026-11-07); both dark-toned and a little blurred,
          crossfading when the switch changes. Both are Gemini-generated mood photos, never presented as customers. */}
      {!miwa && <><div aria-hidden data-hero-bg className="pointer-events-none absolute inset-0 overflow-hidden lg:bottom-auto lg:aspect-[2752/1536] lg:[mask-image:linear-gradient(180deg,black_72%,transparent)]">
        {navSwitch && <Image src="/img/hero-erhverv-2.jpg" alt="" fill priority sizes="100vw" className={`scale-[1.03] object-cover object-[70%_40%] transition-opacity duration-700 lg:object-[50%_40%] ${privat ? "opacity-0" : "opacity-100"}`} />}
        <Image src="/img/hero-hjem.jpg" alt="" fill priority={!navSwitch} sizes="100vw" className={`scale-[1.03] object-cover object-[72%_40%] transition-opacity duration-700 lg:object-[50%_40%] ${navSwitch && !privat ? "opacity-0" : "opacity-100"}`} />
        {/* Marco 2026-11-23: one even, heavy blur over the whole photo, so it is barely visible. */}
        <div className="absolute inset-0" style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }} />
      </div>
      {/* Marco 2026-11-23: the same brown veil everywhere in the hero, phones and desktop alike (brown and stronger, Marco 2026-11-24). */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "rgba(32,22,19,0.92)" }} /></>}
      {/* Marco 2026-11-20: Miwa's autumn landscape behind the live hero; dark veil on the left keeps the white text readable. */}
      {/* Marco 2026-11-21: in the choreography preview she sits at the computer in the warm room (baked into the image). */}
      {(miwa === "live" || miwa === "forloeb") && (
        <div aria-hidden data-hero-bg className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* forloeb: the empty room underneath, the room with Miwa in the chair on top; the top layer fades out when she
              leaves the hero to lift the next section (MiwaForloeb sets its opacity), so there is only ever one of her. */}
          {miwa === "forloeb" && <Image src="/img/miwa-forloeb/hero-tom.webp" alt="" fill priority sizes="100vw" className="object-cover object-[100%_100%]" />}
          <Image id={miwa === "forloeb" ? "miwa-seat" : undefined} src={miwa === "forloeb" ? "/img/miwa-forloeb/hero.webp" : "/img/hero-efteraar.webp"} alt="" fill priority sizes="100vw" className={miwa === "forloeb" ? "object-cover object-[100%_100%]" : "object-cover object-[60%_70%]"} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,13,11,0.86) 0%, rgba(20,13,11,0.7) 30%, rgba(20,13,11,0.25) 52%, transparent 66%), linear-gradient(180deg, rgba(20,13,11,0.55) 0%, transparent 18%, transparent 80%, rgba(20,13,11,0.7) 100%)" }} />
        </div>
      )}
      {miwa === "video" && <HeroMiwaVideoBg />}
      {/* Marco 2026-11-23: launch announcement above everything in the hero. */}
      {!miwa && <LaunchBar mode={mode} />}
      {navSwitch && <TopBar mode={mode} setMode={setMode} />}
      {/* Marco 2026-11-07: a very light orange haze spread over the whole blurred area (left), gone before the people. */}
      <div aria-hidden data-glow className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(232,102,74,0.075) 0%, rgba(232,102,74,0.06) 30%, rgba(232,102,74,0.025) 48%, transparent 58%)" }} />
      {/* Marco 2026-11-08: "Tilmeld jer" for Erhverv, "Tilmeld dig" for Privat (nav and hero). */}
      <Nav cta={privat ? "Tilmeld dig" : "Tilmeld jer"} />
      <div className={`${wrap} @container relative grid flex-1 gap-12 pb-14 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw] lg:content-center lg:items-center lg:py-[0.5svh]`}>
        <div>
          {/* Marco 2026-11-02: always exactly these three lines, at the same size relative to the cards on every screen.
              The size follows the content width (cqi), so the composition from his 14.23 screenshot holds everywhere. */}
          {toggle && <ModeSwitch mode={mode} setMode={setMode} />}
          <h1 data-hero-title className={`${display} font-semibold tracking-[-0.02em] text-[length:calc(var(--dz,1)*10.6cqi)] text-white lg:text-[length:calc(var(--dz,1)*min(5.2vw,88px))]`}>
            {/* Marco 2026-11-07: always two lines, "AI-træning til / hele holdet". */}
            <span className="block whitespace-nowrap">AI-træning til</span>
            <span className="block whitespace-nowrap">hele holdet.</span>
          </h1>
          {/* Marco 2026-11-07: the three icon lines from the Lunar test replace the paragraph. */}
          <ul data-hero-in className="mt-6 space-y-4">
            {(privat
              ? [["clock", "Korte lektioner på dansk, i dit eget tempo."], ["chart", "Øv på rigtige opgaver, og få en score."], ["doc", "Kursusbevis med dit navn."]]
              : [["clock", "10 minutter om dagen, på dansk."], ["chart", "Opgaver fra jeres egen hverdag."], ["doc", "Kursusbevis og overblik til lederen."]]
            ).map(([icon, text]) => (
              <li key={text} className="flex items-center gap-4 text-[1.0625rem] text-white">
                <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={26} className="shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <div data-hero-in className="mt-8 flex flex-wrap items-center gap-3">
              <GrebBtn href={privat ? appLinks.buyPrivate() : appLinks.startBusiness} onDark>{privat ? "Tilmeld dig" : "Tilmeld jer"}</GrebBtn>
            <Link href="/kurser/ai-paa-arbejdet" className="nf-focus nf-press group inline-flex h-[43px] items-center gap-2.5 rounded-full bg-white pl-1 pr-5 font-[family-name:var(--font-grotesk)] text-[13px] font-bold tracking-[-0.015em] antialiased transition-[box-shadow,transform] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]" style={{ color: c.ink }}>
              <span className="grid size-[33px] place-items-center rounded-full text-white transition-transform duration-300 group-hover:scale-110" style={{ background: c.dark }}><Icon name="play" size={14} className="translate-x-px" /></span>
              Se en lektion
            </Link>
          </div>
          {/* Marco 2026-11-07: the two proof rows from the Lunar test (tools, then price · binding · data). */}
          <div data-hero-in className="mt-8 space-y-2.5 text-[0.9375rem] text-white/85">
            {/* Marco 2026-11-07: "Træn i [værktøj]", with Claude, ChatGPT and Copilot taking turns in one slot. */}
            <p className="flex items-center gap-2.5">
              <Icon name="sparkle" size={20} className="shrink-0 text-white" />
              <span className="font-semibold text-white">Træn i</span>
              <ToolCycler />
            </p>
            {/* Marco 2026-11-07: "Ingen binding" and "Data i EU" removed; only the price is left (business only). */}
            {!privat && (
              <p className="flex items-center gap-2.5">
                <Icon name="shield" size={20} className="shrink-0 text-white" />
                <span className="font-semibold text-white">69 kr. pr. bruger</span>
              </p>
            )}
          </div>
        </div>
        {miwa === "live" ? <MiwaLive /> : miwa === "video" ? null : miwa === "forloeb" ? null : miwa ? <HeroMiwa pose={miwa} /> : media === "stories" ? <HeroStories /> : media === "video" ? <HeroVideo /> : media === "cards" ? <HeroCollage privat={privat} /> : null}
      </div>
      <HeroLogos />
    </section>
  );
}



/* ───────────── 3b · Cinematic photo band (Unsplash test) ───────────── */
// Mood photo (ThisisEngineering, Unsplash License). The line is the current site's "Sådan virker det" heading.


/* ───────────── 5 · Certificate: a live check ───────────── */
function Certificate() {
  const reduce = useReducedMotion();
  const [ref, seen] = useInView<HTMLDivElement>();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!seen || reduce) return;
    const id = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(id);
  }, [seen, reduce]);
  const state = !seen ? "idle" : reduce || done ? "ok" : "checking";
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
        <div ref={ref} data-reveal className="relative min-w-0 overflow-hidden rounded-[28px] p-6 sm:p-9" style={{ background: c.cream }}>
          <div className="relative h-[17.5rem] sm:h-[29rem]">
            {/* Marco 2026-11-04: the real certificate V7 (was a placeholder card), slightly tilted like a sheet on a desk */}
            <div data-cert className="absolute inset-x-0 top-0 rounded-[12px] bg-white p-1.5 shadow-[0_40px_70px_-30px_rgba(32,22,19,0.45)]">
              <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis til Sofie Lund: AI på arbejdet, Niveau 1, 92 procent, ID MF-26-04812" width={2248} height={1588} unoptimized className="h-auto w-full rounded-[8px]" />
            </div>
            <div className="absolute bottom-0 left-0 flex w-[17rem] items-center gap-3 rounded-[16px] bg-white p-4 shadow-[0_14px_30px_-18px_rgba(32,22,19,0.35)] sm:w-[20rem]" aria-live="polite">
              <span className="grid size-10 place-items-center rounded-full transition-colors duration-500" style={{ background: state === "ok" ? "#dcefe3" : c.coralSoft, color: state === "ok" ? "#2f7a4f" : c.coral }}>
                {state === "checking" ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon name={state === "ok" ? "check" : "shield"} size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="whitespace-nowrap text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{state === "ok" ? "Certifikatet er ægte" : state === "checking" ? "Tjekker certifikatet …" : "Tjek certifikatet"}</p>
                <p className="text-[0.75rem]" style={{ color: c.muted }}>QR-kode og unikt ID</p>
              </div>
              <span className="text-[0.9375rem] font-semibold tabular-nums" style={{ color: c.ink }}><span data-count="92">92</span> %</span>
            </div>
          </div>
        </div>
        <div>
          <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Et certifikat, der kan tjekkes</h2>
          <p data-reveal className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op.</p>
          <div className="mt-9 grid gap-7">
            {[
              { i: "user" as const, t: "Dit navn og et unikt ID", d: "Beviset viser, hvilket forløb du har taget, og hvornår." },
              { i: "globe" as const, t: "Del det på LinkedIn", d: "Eller send det til chefen. QR-koden viser, at det er ægte." },
              { i: "shield" as const, t: "Dokumentation til AI-forordningen", d: "Artikel 4 kræver, at medarbejdere, der bruger AI, har tilstrækkelige AI-kompetencer. Beviset viser, hvem der har lært hvad." },
            ].map((r) => (
              <div key={r.t} data-reveal className="group flex gap-4">
                <IconChip name={r.i} />
                <div><h3 className="text-[1.1875rem] font-semibold" style={{ color: c.ink }}>{r.t}</h3><p className="mt-1.5 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{r.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 6 · Testimonials: a real carousel (the example quotes from the current site) ───────────── */
const quotes = [
  { name: "Kontorchef", firm: "logistikvirksomhed, 40 ansatte", photo: "", initials: "KC", quote: "Referaterne tager mig otte minutter nu. Før brugte jeg en halv time efter hvert møde.", before: "30 min", after: "8 min", what: "pr. referat" },
  { name: "Sælger", firm: "byggemarked", photo: "/img/people/ali-yilmaz.webp", initials: "SA", quote: "Jeg skriver tilbud på halvdelen af tiden, og de lyder stadig som mig.", before: "45 min", after: "20 min", what: "pr. tilbud" },
  { name: "Ejer", firm: "revisionsfirma, 12 ansatte", photo: "/img/people/peter-skov.webp", initials: "EJ", quote: "Nu ved hele holdet, hvad vi må dele med AI. Det var dét, der holdt os tilbage.", before: "0", after: "12", what: "medarbejdere i gang" },
];

/* Marco 2026-11-04: until real pilot quotes exist, the dark section invites the first teams instead of showing
   example quotes. The old carousel is kept below as TestimonialSaved for when real quotes arrive. */
function Pilot() {
  const perks = [
    { t: "Direkte kontakt til os", d: "Vi svarer inden for 1 hverdag." },
    { t: "I er med til at forme kurserne", d: "Jeres opgaver og spørgsmål former de næste lektioner." },
    { t: "Ingen binding", d: "I kan stoppe, når I vil." },
  ];
  return (
    <section className="py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={`${wrap} grid items-center gap-x-20 gap-y-8 lg:grid-cols-[1fr_1fr]`}>
        <div className="lg:row-span-2 lg:self-center">
          <h2 data-split className={`${h2} !text-white`} data-no-split>Bliv en af de første</h2>
          <p data-reveal className="mt-5 max-w-[28rem] text-[1.0625rem] leading-relaxed text-white/70">Vi søger de første danske hold, der vil træne AI med os. Som pilotkunde får I:</p>
          <div data-reveal className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 lg:flex">
            <Link href="/kontakt" className="nf-focus nf-press group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>Book 15 min <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
            <Link href={appLinks.startBusiness} className="text-[0.9375rem] font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white">Eller start et kursus</Link>
          </div>
        </div>
        <ul className="grid gap-3">
          {perks.map((x) => (
            <li key={x.t} data-reveal className="flex items-start gap-4 rounded-[22px] p-6 ring-1 ring-white/10 sm:p-7" style={{ background: c.dark2 }}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full" style={{ background: "rgba(232,102,74,0.15)", color: c.coral }}><Icon name="check" size={16} /></span>
              <div>
                <p className="text-[1.1875rem] font-semibold text-white">{x.t}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/65">{x.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:hidden">
          <Link href="/kontakt" className="nf-focus nf-press group inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Book 15 min <Icon name="arrowRight" size={16} /></Link>
          <Link href={appLinks.startBusiness} className="text-[0.9375rem] font-medium text-white/80 underline decoration-white/30 underline-offset-4">Eller start et kursus</Link>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSaved() {
  const [i, setI] = useState(2);
  const q = quotes[i];
  const go = (d: number) => setI((x) => (x + d + quotes.length) % quotes.length);
  return (
    <section className="py-24 lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 data-split className={`${h2} !text-white`} data-no-split>Hvad siger deltagerne</h2>
          <p data-reveal className="mt-5 text-[1.0625rem] leading-relaxed text-white/65">Her kommer rigtige citater fra vores første pilotforløb.</p>
        </div>
        <div data-reveal className="relative mt-14 grid gap-4 md:grid-cols-[0.75fr_1.45fr]" aria-roledescription="karrusel">
          <div key={`p${i}`} className="nf-fade relative h-[18rem] overflow-hidden rounded-[24px] md:h-auto md:min-h-[22rem]" style={{ background: c.cream }}>
            {q.photo ? <Image src={q.photo} alt="" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" /> : <span className="absolute inset-0 grid place-items-center text-[4rem] font-semibold tracking-[-0.04em]" style={{ color: c.peach, background: c.dark2 }}>{q.initials}</span>}
            <span className="absolute left-4 top-4"><Pill>Pladsholder</Pill></span>
          </div>
          <div className="flex flex-col justify-between gap-10 rounded-[24px] p-8 ring-1 ring-white/10 sm:p-12" style={{ background: c.dark2 }}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Pill dark>Eksempel</Pill>
              <p key={`m${i}`} className="nf-fade flex items-center gap-2 text-[0.875rem] text-white/70">
                <span className="line-through decoration-white/40">{q.before}</span>
                <Icon name="arrowRight" size={14} />
                <span className="font-semibold" style={{ color: c.peach }}>{q.after}</span> {q.what}
              </p>
            </div>
            <p key={`q${i}`} className="nf-fade max-w-[34rem] text-[clamp(1.375rem,1rem+1.2vw,1.875rem)] font-medium leading-snug tracking-[-0.01em] text-white">“{q.quote}”</p>
            <div className="flex items-end justify-between gap-4">
              <div><p className="font-semibold text-white">{q.name}</p><p className="text-[0.875rem] text-white/60">{q.firm}</p></div>
              <p className="flex gap-1" style={{ color: c.peach }} aria-label="5 ud af 5">{[0, 1, 2, 3, 4].map((k) => <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" /></svg>)}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <div className="mr-auto flex gap-2" aria-hidden>{quotes.map((_, k) => <span key={k} className="h-1.5 rounded-full transition-all duration-500" style={{ width: k === i ? 28 : 8, background: k === i ? "#fff" : "rgba(255,255,255,0.25)" }} />)}</div>
          <button type="button" onClick={() => go(-1)} aria-label="Forrige citat" className="grid size-11 place-items-center rounded-full border text-white transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)" }}><Icon name="arrowLeft" size={16} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Næste citat" className="grid size-11 place-items-center rounded-full transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}><Icon name="arrowRight" size={16} /></button>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 7 · Stats (count up) ───────────── */
function Stats() {
  // Marco 2026-11-04: the numbers section becomes the price section (CRO: the leader looks for the price before buying).
  const facts = [
    { n: "10 min", d: "pr. lektion, så det passer ind i en travl dag" },
    { n: "1–2 timer", d: "for et helt kursus, fordelt på korte lektioner" },
    { n: "Data i EU", d: "Hostet i EU, data i Frankfurt" },
  ];
  const incl = ["ChatGPT, Copilot og Claude, side om side", "Teamoverblik og rapport til lederen", "Kursusbevis med navn og unikt ID", "Databehandleraftale"];
  return (
    <section id="pris" className="scroll-mt-6 py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20`}>
        <div>
          <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Én pris pr. bruger</h2>
          <p data-reveal className="mt-5 max-w-[28rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.</p>
          <dl className="mt-10 max-w-[32rem] border-t" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
            {facts.map((f) => (
              <div key={f.n} data-reveal className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-b py-5" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
                <dt className="text-[1.5rem] font-semibold tracking-[-0.02em] tabular-nums" style={{ color: c.ink }}>{f.n}</dt>
                <dd className="text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-reveal className="relative overflow-hidden rounded-[28px] p-8 text-white shadow-[0_50px_100px_-50px_rgba(32,22,19,0.8)] sm:p-10" style={{ background: "linear-gradient(165deg, #3a2722 0%, #201613 70%)" }}>
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
          <ul className="relative mt-8 grid gap-3.5 border-t border-white/10 pt-8">
            {incl.map((x) => (
              <li key={x} className="flex items-center gap-3 text-[0.9375rem] text-white/85">
                <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: "rgba(232,102,74,0.18)", color: c.coral }}><Icon name="check" size={13} /></span>{x}
              </li>
            ))}
          </ul>
          <div className="relative mt-9 grid gap-3">
            <Link href={appLinks.startBusiness} className="nf-focus nf-press group inline-flex h-12 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}>Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
            <Link href="/kontakt" className="nf-focus inline-flex h-12 items-center justify-center rounded-full text-[0.9375rem] font-medium text-white/85 ring-1 ring-white/20 transition-colors hover:bg-white/5">Book 15 min</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 8 · CTA band with phones ───────────── */
function Phone({ className = "", children, style }: { className?: string; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`w-[13rem] rounded-[2.2rem] p-2 shadow-[0_30px_60px_-25px_rgba(32,22,19,0.6)] sm:w-[15rem] ${className}`} style={{ background: c.dark, ...style }}>
      <div className="relative h-[24rem] overflow-hidden rounded-[1.8rem] sm:h-[28rem]" style={{ background: "#fbf6f2" }}>
        <span aria-hidden className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full" style={{ background: c.dark }} />
        <div className="px-4 pt-10">{children}</div>
      </div>
    </div>
  );
}

/* Marco 2026-11-04: objections answered before the last CTA. Every answer is a fact already on the page. */
const faq = [
  { q: "Er vores data sikre?", a: "Platformen er hostet i EU med data i Frankfurt, og I får en databehandleraftale med fra start." },
  { q: "Hvor lang tid tager det?", a: "En lektion tager cirka 10 minutter. Et helt kursus tager 1–2 timer, fordelt på korte lektioner." },
  { q: "Kan vi stoppe igen?", a: "Ja. Der er ingen binding, og I betaler pr. bruger pr. måned." },
  { q: "Hvor mange skal være med?", a: "Fra 5 brugere. Prisen er 69 kr. pr. bruger om måneden." },
  { q: "Hvilke AI-værktøjer lærer vi?", a: "ChatGPT, Copilot og Claude, side om side, så holdet lærer det værktøj, I bruger." },
  { q: "Får medarbejderne et bevis?", a: "Ja. Alle får et kursusbevis med navn, score og et unikt ID, som kan tjekkes via QR-koden." },
];
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-6 bg-white py-24 lg:py-32">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div>
          <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Spørgsmål og svar</h2>
          <p data-reveal className="mt-5 max-w-[24rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Mangler du et svar? Skriv til kontakt@mindforward.dk. Vi svarer inden for 1 hverdag.</p>
        </div>
        <div className="border-t" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
          {faq.map((f, k) => (
            <details key={f.q} className="group border-b" style={{ borderColor: "rgba(32,22,19,0.12)" }} open={k === 0}>
              <summary className="nf-focus flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.1875rem] font-semibold [&::-webkit-details-marker]:hidden" style={{ color: c.ink }}>
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-open:rotate-45" style={{ background: c.cream }}><Icon name="plus" size={15} /></span>
              </summary>
              <p className="max-w-[36rem] pb-6 text-[1rem] leading-relaxed" style={{ color: c.muted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section id="virksomheder" className="scroll-mt-6 py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <div data-reveal className="relative grid overflow-hidden rounded-[32px] lg:grid-cols-[1fr_1fr]" style={{ background: "linear-gradient(135deg, #fbd5c4 0%, #f6b49b 55%, #f9e4d8 100%)" }}>
          {/* A real team around one laptop (Jud Mackrill, Unsplash License, mood only) with the team overview on top. */}
          <div className="relative h-[24rem] overflow-hidden sm:h-[30rem] lg:h-auto lg:min-h-[32rem]">
            <Image src="/img/unsplash/team.jpg" alt="Et hold, der kigger på den samme laptop" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover object-[40%_40%]" />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 55%, rgba(246,180,155,0.55) 100%)" }} />
            <div className="absolute -bottom-28 right-2 z-10 origin-bottom-right scale-[0.72] sm:right-8 sm:scale-100">
              <Phone className="nf-float" style={{ ["--r" as string]: "-6deg", ["--float-d" as string]: "7s" }}>
              {/* Marco 2026-11-03: the hero's team card on the phone, scaled from its 300px design width. */}
              <div className="-mx-2"><Fit w={300}><KortRangliste /></Fit></div>
            </Phone>
            </div>
          </div>
          <div className="p-8 sm:p-12 lg:self-center lg:py-16 lg:pl-4 lg:pr-14">
            <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Få hele teamet i gang</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: "#4a3a34" }}>Start i dag, eller tag 15 minutter med os først.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={appLinks.startBusiness} className="nf-focus nf-press group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium text-white transition-transform" style={{ background: c.dark }}>Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
              <Link href="/kontakt" className="nf-focus nf-press inline-flex h-12 items-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium transition-colors hover:bg-white/40" style={{ borderColor: c.dark, color: c.ink }}>Book 15 min</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Page + motion layer ───────────── */
export function NyForside({ miwa, toggle = false, uiMode = "off", hero = "video", video, start, skills, oev, cert = true, layout, practice, pilot, sep, start3, system }: { miwa?: "velkommen" | "glad" | "live" | "forloeb" | "video"; toggle?: boolean; uiMode?: UiMode; hero?: "video" | "lunar" | "pleo"; video?: VideoVersion; start?: "kort"; skills?: "cases"; oev?: "kort"; cert?: boolean; layout?: "ny"; practice?: "a" | "b" | "c"; pilot?: "a" | "b" | "c"; sep?: 1 | 2 | 3 | 4 | 5; start3?: "a" | "b" | "c"; system?: boolean } = {}) {
  const VideoSek = video ? videoVersions[video] : null;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQuery, () => {
        const q = gsap.utils.selector(root);
        const once = { start: "top 85%", once: true };

        // Hero build-up: title lines rise from a mask, then copy, then the card cluster, then the person.
        const title = q("[data-hero-title]")[0] as HTMLElement | undefined;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (title) {
          const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "nf-line" });
          tl.from(split.lines, { yPercent: 110, duration: 1, stagger: 0.08, onComplete: () => split.revert() }, 0.05);
        }
        tl.from(q("[data-hero-in]"), { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.35)
          .from(q("[data-hero-card]"), { y: 40, opacity: 0, scale: 0.96, duration: 1, stagger: 0.1 }, 0.3)
          .from(q("[data-hero-person]"), { yPercent: 12, opacity: 0, duration: 1.2 }, 0.55);

        // Section headings: line mask reveal on enter.
        q("[data-split]").forEach((el) => {
          const split = SplitText.create(el as HTMLElement, { type: "lines", mask: "lines", linesClass: "nf-line" });
          gsap.from(split.lines, { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: el, ...once }, onComplete: () => split.revert() });
        });

        // Everything else: one subtle reveal style site-wide, batched so siblings stagger.
        const reveals = q("[data-reveal]");
        gsap.set(reveals, { y: 24, opacity: 0 });
        ScrollTrigger.batch(reveals, {
          start: "top 88%",
          once: true,
          onEnter: (els) => { gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.08 }); },
        });

        // Count-ups: numbers climb from 0 when they come into view (hero ones right away).
        q("[data-count]").forEach((el) => {
          const target = Number((el as HTMLElement).dataset.count);
          const o = { v: 0 };
          const inHero = !!(el as HTMLElement).closest("[data-hero]");
          el.textContent = "0";
          gsap.to(o, {
            v: target, duration: 1.6, ease: "power3.out", delay: inHero ? 0.6 : 0,
            onUpdate: () => { el.textContent = String(Math.round(o.v)); },
            scrollTrigger: inHero ? undefined : { trigger: el, ...once },
          });
        });

        // Bars grow, fills run, the ring draws itself.
        const bars = q("[data-bar]");
        if (bars.length) gsap.from(bars, { scaleY: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: bars[0], ...once } });
        q("[data-fill]").forEach((el) => { gsap.from(el, { scaleX: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, ...once } }); });
        q("[data-ring]").forEach((el) => {
          const v = Number(el.getAttribute("data-ring"));
          gsap.fromTo(el, { attr: { "stroke-dasharray": "0 314" } }, { attr: { "stroke-dasharray": `${v * 314} 314` }, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, ...once } });
        });

        // Hero background drifts a little as the page scrolls away.
        q("[data-hero-bg]").forEach((el) => { gsap.to(el, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true } }); });

        // Photo band: the image drifts slower than the page (parallax).
        q("[data-band]").forEach((el) => {
          const img = (el as HTMLElement).querySelector("[data-band-img]");
          if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // Certificate card slides in with a slight turn.
        q("[data-cert]").forEach((el) => { gsap.from(el, { x: 60, rotate: 6, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, ...once } }); });
      });

    },
    { scope: root },
  );

  return (
    <UiMotionProvider mode={uiMode}>
    <div ref={root} data-page className="bg-white">
      {/* Marco 2026-11-23: MIND, the living logo (only on the new home page). */}
      {layout === "ny" && !miwa && <MindDirector />}
      <style>{`
        @keyframes nfFloat { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-10px) rotate(var(--r,0deg)); } }
        .nf-float { transform: rotate(var(--r,0deg)); animation: nfFloat var(--float-d,5s) ease-in-out var(--delay,0s) infinite; }
        @keyframes nfDash { to { stroke-dashoffset: -40; } }
        .nf-dash { animation: nfDash 1.6s linear infinite; }
        @keyframes nfFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .nf-fade { animation: nfFade 420ms cubic-bezier(0.16,1,0.3,1); }
        @keyframes nfCycle { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
        .nf-cycle { animation: nfCycle 520ms cubic-bezier(0.16,1,0.3,1); }
        html { scroll-behavior: smooth; }
        .nf-focus:focus-visible { outline: 2px solid #e8664a; outline-offset: 3px; }
        .nf-press:active { transform: scale(0.97); }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .nf-press:active { transform: none; } }
        .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; }
        @keyframes hlScroll { to { transform: translateX(-50%); } }
        .hl-track { animation: hlScroll 38s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .nf-float, .nf-dash, .nf-fade, .nf-cycle, .hl-track { animation: none; } }
      `}</style>
      {/* hero="lunar" = the Lunar test at /preview/hero-lunar (2026-11-07); /preview/ny-forside keeps the video hero. */}
      {/* Marco 2026-11-07: "gå med den vi selv har og bare fjern den store produkt video for nu" (Lunar copy too recognisable). */}
      {hero === "lunar" ? <HeroLunar /> : hero === "pleo" ? <HeroPleo /> : <Hero toggle={toggle} media={miwa ? "none" : "stories"} navSwitch={!toggle} miwa={miwa} />}
      {miwa === "forloeb" && <MiwaForloeb />}
      {layout === "ny" && system ? <Forside3 practice={practice === "b" ? <Oev3.B /> : undefined} pilot={pilot === "a" ? <Pilot3.A /> : undefined} /> : layout === "ny" ? <Forside2 practice={practice === "a" ? <Oev3.A /> : practice === "b" ? <Oev3.B /> : practice === "c" ? <Oev3.C /> : undefined} pilot={pilot === "a" ? <Pilot3.A /> : pilot === "b" ? <Pilot3.B /> : pilot === "c" ? <Pilot3.C /> : undefined} sep={sep} steps={start3 === "a" ? <Start3.A /> : start3 === "b" ? <Start3.B /> : start3 === "c" ? <Start3.C /> : undefined} /> : (<>
      {/* Product video right after the hero (Marco 2026-11-10); versions on /preview/sektion-video, "/" unchanged. */}
      {VideoSek && <VideoSek />}
      {/* Feature strip = version F, tall photo cards (Marco 2026-11-03). */}
      {/* "Sådan starter I" = the Calendly-steps version (Marco 2026-11-05: "Det er fint for nu"). Old photo cards: FordeleFotokort. */}
      {start === "kort" ? <StartKort /> : <StartCalendly />}
      {/* Færdigheder = version N, carousel (Marco 2026-11-03: "gå med den for nu", too many photos overall). */}
      {/* Færdigheder = version 3 "Mørk scene" with full photos (Marco 2026-11-05: "Yes det er flot"). Old: FaerdighederKarrusel. */}
      {skills === "cases" ? <UseCases /> : <FaerdighederMoerk />}
      {/* Øv på dine egne opgaver = version P in a laptop + browser mockup (Marco 2026-11-03). */}
      {/* Øv på dine egne opgaver = the original laptop version P (Marco 2026-11-05: back to the first version). */}
      {oev === "kort" ? <OevKort /> : <OevelseLaptop />}
      {/* Certifikat = version 1 "Som nu, skarpere" (Marco 2026-11-05). Old: Certificate (still in this file). */}
      {/* Marco 2026-11-10: the certificate leaves the front page (own page later); cert={false} on the new page. */}
      {cert && <CertifikatSkarp />}
      {/* Pilot = version 2 "Foto i fuld bredde" (Marco 2026-11-05: "2 helt sikkert"). Old: Pilot (still in this file). */}
      <PilotFoto />
      {/* Pris = version 1 "Calendly" with a square, full-width background (Marco 2026-11-05) */}
      <PrisCalendly />
      <Faq />
      {/* Afslutning = version 1 "Calendly" as a carousel (Marco 2026-11-05) */}
      <CtaKarussel />
      </>)}
    </div>
    </UiMotionProvider>
  );
}
