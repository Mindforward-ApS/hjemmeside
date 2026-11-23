"use client";

// Front page below the hero, new structure (Marco 2026-11-10: "kom så tæt på som overhovedet muligt", hero untouched).
// One light page colour with white cards, two dark bands (øvemiljø, contact). Headings 56/64 medium, a small coral
// square before every label, coral pill buttons with an arrow. Our colours, our copy and our facts only.
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { Fragment, useActionState, useEffect, useRef, useState } from "react";
import { APP_URL, appLinks } from "@/lib/app";
import { contactAction, type FormState } from "@/lib/actions";
import { Icon } from "@/components/ui/Icon";
import { DemoLogo, ownLogos } from "@/components/night/DemoLogos";
import { KontaktSide } from "@/components/forms/KontaktSide";
import { erhverv, privat } from "@/content/priser";
import { setSiteMode, useSiteMode } from "@/lib/siteMode";
import { Udtalelser } from "./Udtalelser";
import { FeatureBento } from "./FeatureBento";

const c = { ink: "#201613", cta: "linear-gradient(90deg, #fb970a, #f8400a)" /* M logo gradient, Marco 2026-11-23 */, muted: "#5a4a44", coral: "#e8664a", coralText: "#b8452c", coralSoft: "#fbe1d7", page: "#f5f2ef", dark: "#201613", line: "rgba(32,22,19,0.1)" };
const wrap = "w-full px-5 sm:px-[3.5vw]";
const head = "font-[family-name:var(--font-geist)] font-medium tracking-[-0.03em]";
const h2 = `${head} text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-[1.14]`;

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <SectionLabel light={light}>{children}</SectionLabel>;
}

function Pill({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <GrebBtn href={href} onDark className={className}>{children}</GrebBtn>
  );
}

function Arrow({ dir, onClick, dark = false }: { dir: "left" | "right"; onClick: () => void; dark?: boolean }) {
  return (
    <button type="button" aria-label={dir === "left" ? "Forrige" : "Næste"} onClick={onClick} className={`nf-focus grid size-14 place-items-center rounded-full transition-transform hover:scale-105 ${dark ? "bg-white" : "bg-white shadow-[0_2px_10px_-4px_rgba(32,22,19,0.2)]"}`} style={{ color: c.ink }}>
      <Icon name={dir === "left" ? "arrowLeft" : "arrowRight"} size={18} />
    </button>
  );
}

/* Placeholder where a photo goes later: soft tone, picture icon, what it should show and its size. */
export function Ph({ label, size, className = "", round = false }: { label?: string; size?: string; className?: string; round?: boolean }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden ${round ? "rounded-full" : ""} ${className}`} style={{ background: "#e7e1dc" }} aria-hidden>
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(32,22,19,0.06) 0 1px, transparent 1px 14px)" }} />
      {label && (
        <div className="relative flex flex-col items-center gap-2 px-4 text-center" style={{ color: "#8a7d76" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 17-5-5-9 8" /></svg>
          <span className="text-[0.8125rem] font-medium">{label}</span>
          {size && <span className="text-[0.75rem] opacity-80">{size}</span>}
        </div>
      )}
    </div>
  );
}


// The real 26 s screen recording of the platform, a still with a round play button; one click plays it in place.
function PlatformVideo() {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(true); const el = v.current; if (el) { el.currentTime = 0; el.play().catch(() => {}); } };
  return (
    <div className="absolute inset-0 bg-[#ece4df]">
      <video ref={v} src="/video/produkt-video.mp4" poster="/video/produkt-video-poster.jpg" controls={playing} playsInline preload="metadata" onEnded={() => setPlaying(false)} className="h-full w-full object-cover" aria-label="Produktvideo: sådan virker Mindforward" />
      {!playing && (
        // Start image (Marco 2026-11-23): "Sådan kommer du i gang med Mindforward" over a dark veil, with the play button.
        <button type="button" onClick={play} aria-label="Afspil videoen: Sådan kommer du i gang med Mindforward, 50 sekunder" className="nf-focus group absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center backdrop-blur-[6px]" style={{ background: "linear-gradient(180deg, rgba(20,13,11,0.62), rgba(20,13,11,0.78))" }}>
          <span className="max-w-[18ch] text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">Sådan kommer du i gang med Mindforward</span>
          <span className="grid size-[4.5rem] place-items-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(32,22,19,0.45)] transition-transform duration-300 group-hover:scale-110" style={{ color: "#f8400a" }}>
            <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden className="translate-x-[2px]"><path d="M2 2.2v19.6c0 1 1.1 1.6 2 1.1l16.3-9.8c.8-.5.8-1.7 0-2.2L4 1.1C3.1.6 2 1.2 2 2.2z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}

/* 1 · Platformen. Measured at 1440: heading column starts where the big picture starts (left card 460, gap 25,
   picture 895, both 656 tall, radius 32); stats 72/80 with a small bold unit, description in the right half;
   floating card 380 wide, 32 in from the picture's bottom-right corner. */
function Platform() {
  return (
    <section id="kurser" className="relative overflow-x-clip pb-16 pt-24 sm:pt-[7.5rem]">
      <div className={wrap}>
        <div>
          <SectionLabel>Platformen</SectionLabel>
          <h2 className={`${head} mt-4 max-w-[790px] !font-semibold text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143] tracking-[-0.045em]`} style={{ color: c.ink }}>Korte lektioner, et rigtigt øvemiljø og overblik til lederen</h2>
        </div>
        {/* Marco 2026-11-11: the product video (16:9, with sound) is shown whole; the stats card is only as tall as its content, and on desktop the video is lifted so both end at the same
            height at the bottom (the video hangs from the bottom of the row; the row is as tall as the card). */}
        <div className="mt-[60px] grid gap-4 xl:grid-cols-[400fr_1000fr] xl:gap-[1.74vw]">
          <div className="flex flex-col self-start rounded-[32px] bg-white p-6 2xl:p-8">
            {[["10", "min", "Så lang tid tager en lektion"], ["69", "kr.", "Pris pr. bruger pr. måned"]].map(([n, u, l]) => (
              <div key={n} className="grid grid-cols-2 items-start border-b pb-7 pt-0 [&:nth-child(2)]:pt-6" style={{ borderColor: "rgba(32,22,19,0.08)" }}>
                <p className={`${head} flex items-start text-[56px] leading-[60px] tracking-[-2px]`} style={{ color: c.ink }}>{n}<span className="ml-1.5 mt-0 text-[22px] font-bold leading-6 tracking-normal">{u}</span></p>
                <p className="pt-4 text-[1rem] leading-6" style={{ color: "#6b625d" }}>{l}</p>
              </div>
            ))}
            <p className="pt-6 text-[1rem] leading-6" style={{ color: "#6b625d" }}>Lektioner på dansk i ChatGPT, Copilot eller Claude. Hver lektion slutter med en opgave fra jeres egen hverdag, og lederen kan følge holdet.</p>
            <GrebBtn href="/priser" onDark className="mt-6 self-start">Se priser</GrebBtn>
          </div>
          <div className="relative order-first xl:order-none">
            <div className="relative xl:absolute xl:inset-x-0 xl:bottom-0 xl:translate-x-6">
              <div className="relative z-10 aspect-video overflow-hidden rounded-[32px]">
                <PlatformVideo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2 · Sådan kommer I i gang. */
const stepData = [
  { t: "Inviter", d: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget." },
  { t: "Lær", d: "Ti minutter om dagen på dansk, i det værktøj I bruger." },
  { t: "Øv", d: "Hver lektion slutter med en opgave fra jeres egen hverdag." },
  { t: "Følg op", d: "Du ser holdets fremskridt, og alle får et kursusbevis." },
];
/* Marco 2026-11-11: rebuilt. Heading left with a short text right; four columns, each with a big light step number,
   a small piece of the real product showing that step, then the title and text. One call to action underneath. */
function StepCard({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[236px] flex-col overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_1px_0_rgba(32,22,19,0.04),0_14px_30px_-18px_rgba(32,22,19,0.35)]">{children}</div>;
}
const mini = "text-[0.75rem] leading-4";
function StepInvite() {
  return (
    <StepCard>
      <p className={`${mini} font-semibold`} style={{ color: c.ink }}>Inviter dit hold</p>
      <div className="mt-3 flex items-center gap-2 rounded-[10px] border px-3 py-2.5" style={{ borderColor: c.line }}>
        <span className={`${mini} min-w-0 flex-1 truncate`} style={{ color: c.muted }}>mindforward.dk/hold/salg-k7</span>
        <span className="rounded-[7px] px-2 py-1 text-[0.6875rem] font-semibold text-white" style={{ background: c.ink }}>Kopiér</span>
      </div>
      <div className="mt-3 flex items-center">
        {["#e8664a", "#c9a48f", "#7a5a4f", "#f2b39b", "#201613"].map((b, k) => (
          <span key={b} className="grid size-8 place-items-center rounded-full border-2 border-white text-[0.625rem] font-semibold text-white" style={{ background: b, marginLeft: k ? -6 : 0 }}>{["AH", "MJ", "SK", "LP", "+8"][k]}</span>
        ))}
      </div>
      <p className={`${mini} mt-2 mb-3`} style={{ color: c.muted }}>12 kolleger inviteret</p>
      <div className="mt-auto flex items-center gap-2 rounded-[10px] px-3 py-2" style={{ background: c.coralSoft }}>
        <span className="size-1.5 rounded-full" style={{ background: c.coral }} />
        <span className={`${mini} font-medium`} style={{ color: c.coralText }}>Ingen skal installere noget</span>
      </div>
    </StepCard>
  );
}
function StepLearn() {
  return (
    <StepCard>
      <div className="flex items-center gap-2">
        <Image src="/logos/chatgpt.png" alt="" width={22} height={22} className="rounded-[6px]" />
        <span className={`${mini} font-semibold`} style={{ color: c.ink }}>ChatGPT</span>
        <span className={`${mini} ml-auto`} style={{ color: c.muted }}>Lektion 3 af 7</span>
      </div>
      <p className={`${head} mt-4 text-[1.0625rem] leading-6 !font-semibold`} style={{ color: c.ink }}>Skriv beskeder, der giver brugbare svar</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ background: c.page }}><div className="h-full w-[62%] rounded-full" style={{ background: c.coral }} /></div>
      <div className="mt-2 flex justify-between"><span className={mini} style={{ color: c.muted }}>6 af 10 min</span><span className={mini} style={{ color: c.muted }}>Dansk</span></div>
      <div className="mt-auto flex items-center justify-between rounded-[10px] px-3 py-2.5" style={{ background: c.page }}>
        <span className={`${mini} font-medium`} style={{ color: c.ink }}>Fortsæt lektionen</span>
        <span className="grid size-6 place-items-center rounded-full" style={{ background: c.coral }}><svg width="8" height="9" viewBox="0 0 22 24" aria-hidden><path d="M2 2.2v19.6c0 1 1.1 1.6 2 1.1l16.3-9.8c.8-.5.8-1.7 0-2.2L4 1.1C3.1.6 2 1.2 2 2.2z" fill="#fff" /></svg></span>
      </div>
    </StepCard>
  );
}
function StepPractice() {
  return (
    <StepCard>
      <p className={`${mini} font-semibold`} style={{ color: c.ink }}>Dagens opgave</p>
      <div className="mt-3 rounded-[12px] rounded-tl-[4px] px-3 py-2.5" style={{ background: c.page }}>
        <p className={mini} style={{ color: c.ink }}>Skriv et venligt svar til en kunde, hvis pakke er tre dage forsinket.</p>
      </div>
      <div className="ml-6 mt-2 rounded-[12px] rounded-tr-[4px] px-3 py-2.5" style={{ background: c.ink }}>
        <p className={`${mini} text-white/90`}>Hej Karen. Tak for din tålmodighed, og undskyld ventetiden …</p>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-full bg-[#3aa66b]"><svg width="10" height="10" viewBox="0 0 16 16" aria-hidden><path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span className={`${mini} font-medium`} style={{ color: c.ink }}>Opgave klaret</span>
        <span className={`${mini} ml-auto`} style={{ color: c.muted }}>+20 point</span>
      </div>
    </StepCard>
  );
}
// Marco 2026-11-11: his photo fills the whole box (iStock preview; needs a licence before it goes live).
function StepFollow() {
  return (
    <div className="relative h-[236px] overflow-hidden rounded-[20px] shadow-[0_1px_0_rgba(32,22,19,0.04),0_14px_30px_-18px_rgba(32,22,19,0.35)]">
      <Image src="/img/stock/foelg-op.jpg" alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover object-[45%_30%]" />
      {/* The brown blur from the sign-up page: a blurred copy shown towards the bottom under a brown tone, with a small
          glass status card on top. */}
      <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent_35%,black_80%)]">
        <Image src="/img/stock/foelg-op.jpg" alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="scale-110 object-cover object-[45%_30%] blur-[10px]" />
      </div>
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0.05) 0%, rgba(32,22,19,0.15) 40%, rgba(32,22,19,0.75) 85%, #201613 100%)" }} />
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[14px] bg-white/20 p-3 ring-1 ring-white/35 backdrop-blur-md">
        <span className="grid size-7 shrink-0 place-items-center rounded-full" style={{ background: c.coral }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></svg>
        </span>
        <span className="min-w-0">
          <span className="block text-[0.8125rem] font-semibold leading-4 text-white">Kursusbevis klar</span>
          <span className="block text-[0.75rem] leading-4 text-white/80">Til alle på holdet, der gennemfører</span>
        </span>
      </div>
    </div>
  );
}
const stepCards = [<StepInvite key="i" />, <StepLearn key="l" />, <StepPractice key="p" />, <StepFollow key="f" />];

function Steps() {
  return (
    // Marco 2026-11-10: its own colour, one no other section uses: a light peach from the brand palette.
    <section className="pb-[120px] pt-[120px]" style={{ background: "#f8ddd0" }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <Label>Sådan kommer I i gang</Label>
            <h2 className={`${head} mt-4 max-w-[760px] text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] !font-semibold leading-[1.143] tracking-[-0.045em]`} style={{ color: c.ink }}>Fra invitation til første score på en uge</h2>
          </div>
          <p className="max-w-[360px] text-[1rem] leading-6 lg:pb-2 lg:text-right" style={{ color: c.muted }}>Ingen installation og ingen lange kurser. Holdet er i gang samme dag, og du kan se, hvordan det går.</p>
        </div>
        <ol className="mt-[72px] grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {stepData.map((s, k) => (
            <li key={s.t} className="group">
              <span aria-hidden className={`${head} block text-[64px] font-light leading-none tracking-[-0.04em]`} style={{ color: "rgba(32,22,19,0.22)" }}>{k + 1}</span>
              <div className="mt-5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:group-hover:-translate-y-1.5">{stepCards[k]}</div>
              <h3 className={`${head} mt-6 text-[1.25rem] !font-semibold leading-7 tracking-[-0.4px]`} style={{ color: c.ink }}>{s.t}</h3>
              <p className="mt-2 max-w-[300px] text-[1rem] leading-6" style={{ color: "#6b625d" }}>{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 flex justify-center"><Pill href={appLinks.startBusiness}>Kom i gang i dag</Pill></div>
      </div>
    </section>
  );
}

/* 3 · Færdigheder: heading left, arrows right, wide cards that slide, the next one peeking in. */
// The real courses on the platform (greb content/forloeb/forloeb.json, 2026-11-11): one per AI tool, four levels
// each; level 1 module 1 is ready, the rest is "kommer snart". Marco: "I praksis … kurser, der matcher platformen".
const cases = [
  { tag: "ChatGPT", logo: "/logos/chatgpt.png", t: "Fra helt grøn til ekspert i ChatGPT", d: "Bagefter kan du bruge ChatGPT til hverdagsopgaver og ved, hvad du ikke må dele.", s: [["4 niveauer", "Grøn til ekspert"], ["7 lektioner", "I modul 1, klar nu"]], href: "/forloeb/chatgpt" },
  { tag: "Copilot", logo: "/logos/copilot.png", t: "Fra helt grøn til ekspert i Copilot", d: "Bagefter ved du, hvilken Copilot du har, og kan bruge den trygt i hverdagen.", s: [["4 niveauer", "Grøn til ekspert"], ["6 lektioner", "I modul 1, klar nu"]], href: "/forloeb/copilot" },
  { tag: "Claude", logo: "/logos/claude.png", t: "Fra helt grøn til ekspert i Claude", d: "Bagefter kan du bruge Claude til hverdagsopgaver og ved, hvad du ikke må dele.", s: [["4 niveauer", "Grøn til ekspert"], ["6 lektioner", "I modul 1, klar nu"]], href: "/forloeb/claude" },
];
function Cases() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => Math.min(cases.length - 1, Math.max(0, x + d)));
  // Marco 2026-11-10: no photos below the hero.
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className={wrap}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Label>Kurser</Label>
            <h2 className={`${h2} !font-semibold tracking-[-0.045em] mt-4 max-w-[16ch]`} style={{ color: c.ink }}>Start med et af vores kurser</h2>
          </div>
          <div className="hidden gap-3 sm:flex lg:hidden"><Arrow dir="left" onClick={() => go(-1)} /><Arrow dir="right" onClick={() => go(1)} /></div>
        </div>
        <div className="mt-12">
          <ul className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [--cw:86vw] md:[--cw:44vw] lg:[--cw:calc((100vw-7vw-2.5rem)/3)] lg:!transform-none" style={{ transform: `translateX(calc(${-i} * (var(--cw) + 1.25rem)))` }}>
            {cases.map((x) => (
              <li key={x.tag} className="flex w-[var(--cw)] shrink-0 rounded-[24px] bg-white p-4 sm:p-5">
                <div className="flex w-full flex-col p-3 sm:p-4">
                  <span className="flex items-center gap-2 self-start rounded-[12px] px-4 py-2.5 text-[0.9375rem] font-semibold" style={{ background: c.page, color: c.ink }}><Image src={x.logo} alt="" width={20} height={20} className="size-5 rounded-[5px]" />{x.tag}</span>
                  <h3 className={`${head} mt-6 text-[1.5rem] leading-snug tracking-[-0.015em]`} style={{ color: c.ink }}>{x.t}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{x.d}</p>
                  <div className="mt-auto grid grid-cols-2 gap-6 pt-8">
                    {x.s.map(([a, b], k) => (
                      <div key={a} className={k ? "border-l pl-6" : ""} style={{ borderColor: c.line }}>
                        <p className={`${head} text-[1.5rem] tracking-[-0.01em]`} style={{ color: c.ink }}>{a}</p>
                        <p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>{b}</p>
                      </div>
                    ))}
                  </div>
                  <Pill href={`${APP_URL}${x.href}`} className="mt-8 self-start">Se kurset</Pill>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-center gap-3 sm:hidden"><Arrow dir="left" onClick={() => go(-1)} /><Arrow dir="right" onClick={() => go(1)} /></div>
      </div>
    </section>
  );
}

/* 4 · Øvemiljøet (dark band): centred heading, white cards with the tool on the left and the learner's prompt as a
   big quote on the right, the score and feedback underneath. Example tasks. */
const tasks = [
  { tool: "Copilot", logo: "/logos/copilot.png", n: "Opgave 3 af 5", p: "Skriv et kort, venligt svar til Mette, der har ventet fem dage på sin levering. Giv en ny dato.", score: 86, fb: "Sig også, hvorfor leveringen er forsinket." },
  { tool: "ChatGPT", logo: "/logos/chatgpt.png", n: "Opgave 2 af 5", p: "Lav et referat af mine noter med beslutninger øverst og en liste over, hvem der gør hvad.", score: 92, fb: "Tilføj en deadline til hver opgave." },
  { tool: "Claude", logo: "/logos/claude.png", n: "Opgave 4 af 5", p: "Fjern navne og CPR-numre fra teksten, før jeg deler den med en kollega uden for teamet.", score: 78, fb: "Adressen i fritekst blev ikke fjernet." },
];
function Practice() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => Math.min(tasks.length - 1, Math.max(0, x + d)));
  return (
    <section id="saadan" className="overflow-hidden py-24 sm:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <div className="flex flex-col items-center text-center">
          <Label light>Øvemiljøet</Label>
          <h2 className={`${h2} !font-semibold tracking-[-0.045em] mt-4 max-w-[15ch] text-white`}>Øv på dine egne opgaver</h2>
        </div>
        <ul className="mt-14 flex gap-5 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [--cw:86vw] lg:[--cw:49vw]" style={{ transform: `translateX(calc(${-i} * (var(--cw) + 1.25rem)))` }}>
          {tasks.map((t) => (
            <li key={t.n} className="grid w-[var(--cw)] shrink-0 overflow-hidden rounded-[24px] bg-white md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
              <div className="flex flex-col border-b p-7 md:border-b-0 md:border-r" style={{ borderColor: c.line }}>
                <Image src={t.logo} alt="" width={48} height={48} className="size-12 rounded-full" />
                <p className="mt-4 text-[1rem] font-semibold" style={{ color: c.ink }}>{t.tool}</p>
                <p className="text-[0.8125rem]" style={{ color: c.muted }}>{t.n}</p>
                <p className="mt-auto pt-10"><span className={`${head} text-[2.5rem] leading-none`} style={{ color: c.coralText }}>{t.score}</span><span className="text-[0.875rem]" style={{ color: c.muted }}> / 100</span></p>
              </div>
              <div className="flex flex-col p-7">
                <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden style={{ color: c.ink }}><path d="M0 26V15C0 6 4 1 13 0l1 4c-5 1-7 4-7 9h6v13zm19 0V15c0-9 4-14 13-15l1 4c-5 1-7 4-7 9h6v13z" fill="currentColor" /></svg>
                <p className={`${head} mt-6 text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.25] tracking-[-0.015em]`} style={{ color: c.ink }}>{t.p}</p>
                <p className="mt-auto flex items-center gap-2 pt-10 text-[0.875rem]" style={{ color: c.muted }}><span style={{ color: c.coralText }}>↑</span>{t.fb}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center gap-3"><Arrow dark dir="left" onClick={() => go(-1)} /><Arrow dark dir="right" onClick={() => go(1)} /></div>
        <p className="mt-6 text-center text-[0.75rem] text-white/50">Eksempler på opgaver fra øvemiljøet.</p>
      </div>
    </section>
  );
}

/* 5 · Pilot: photo left with a contact chip, label + heading + text + four points right. */
const pilotPoints = [
  { icon: "user" as const, t: "Direkte kontakt til os" },
  { icon: "sparkle" as const, t: "I er med til at forme kurserne" },
  { icon: "check" as const, t: "Ingen binding, I kan stoppe, når I vil" },
  { icon: "lock" as const, t: "Data i EU med databehandleraftale" },
];
function Pilot() {
  // Picture left, text right (Marco 2026-11-10: not every section with the heading left and a box right).
  return (
    <section className="py-[120px]">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[628fr_752fr] lg:gap-0`}>
        <div className="relative aspect-[628/720] overflow-hidden rounded-[32px] lg:max-h-[720px]">
          <div className="absolute inset-0"><Ph label="Billede: to kolleger ved et bord med en laptop" size="1256 × 1440 px" className="h-full w-full" /></div>
          <a href="mailto:kontakt@mindforward.dk" className="nf-focus absolute bottom-6 right-6 flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5">
            <span className="grid size-11 place-items-center rounded-full" style={{ background: c.coral, color: c.ink }}><Icon name="mail" size={16} /></span>
            <span className="leading-tight"><span className="block text-[0.75rem] font-medium uppercase" style={{ color: c.ink }}>Skriv til os</span><span className="text-[1rem] font-semibold" style={{ color: c.ink }}>kontakt@mindforward.dk</span></span>
          </a>
        </div>
        <div className="lg:pl-[8.5vw]">
          <p className="flex items-center gap-2 text-[0.875rem] font-medium leading-6" style={{ color: c.ink }}>
            <span aria-hidden className="size-[18px] rounded-[6px]" style={{ background: c.coral }} />Pilotforløb
          </p>
          <h2 className={`${head} mt-4 max-w-[13ch] text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] !font-semibold leading-[1.143] tracking-[-0.045em]`} style={{ color: c.ink }}>Bliv en af de første</h2>
          <p className="mt-8 max-w-[30rem] text-[1rem] leading-6" style={{ color: "#6b625d" }}>Vi søger de første danske hold, der vil træne AI med os. Som pilotkunde er I med fra starten og er med til at bestemme, hvad vi bygger.</p>
          <ul className="mt-10 grid gap-5">
            {pilotPoints.map((p) => (
              <li key={p.t} className="flex items-center gap-3 text-[1.25rem] font-semibold tracking-[-0.3px]" style={{ color: c.ink }}><Icon name={p.icon} size={18} />{p.t}</li>
            ))}
          </ul>
          <Pill href="/kontakt" className="mt-10">Book 15 min</Pill>
        </div>
      </div>
    </section>
  );
}

/* 6 · Pris: intro and facts on the left, the three plans as white cards on the right (Marco 2026-11-23). Plans and
   prices are the approved ones (content/priser.ts). */
const planHref = { business: appLinks.startBusiness, private: appLinks.buyPrivate(), contact: "/kontakt" } as const;

export function Price({ toggle = false }: { toggle?: boolean } = {}) {
  // Follows the Erhverv / Privat choice in the top bar (Marco 2026-11-11). On /priser, which has no top bar, the
  // section shows its own Erhverv / Privat switch (toggle).
  // Layout (Marco 2026-11-23, "præcis på samme måde"): intro column with three facts and customer logos at the bottom,
  // two plan cards on the right; the featured one sits in a frame with the M logo's gradient and a strip on top.
  const mode = useSiteMode();
  const privatMode = mode === "privat";
  const plans = privatMode ? privat : erhverv;
  // Marco 2026-11-23: the three facts as in the reference (calendar, shield with check, circular arrow), in Danish.
  const ico = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const facts = [
    { t: "7 dages gratis prøveperiode", icon: <svg {...ico}><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17M9 15l2 2 4-4" /></svg> },
    { t: "Ingen skjulte gebyrer", icon: <svg {...ico}><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z" /><path d="M9 12l2 2 4-4" /></svg> },
    { t: privatMode ? "Opsig, når du vil" : "Opsig, når I vil", icon: <svg {...ico}><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v4.5h-4.5" /></svg> },
  ];
  const leadline = ownLogos.find((l) => l.name === "Leadline")!;
  const arrow = <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  const card = (p: (typeof plans)[number]) => {
    const items = [...p.items, p.support];
    const [unitMain, ...unitRest] = p.unit.replace(/^\/\s*/, "").split(" ");
    return (
      <div className="flex h-full flex-col">
        <div className="px-5 pb-5 pt-5">
          <div className="flex min-h-8 items-center justify-between gap-3">
            <p className="text-[1.25rem] font-medium leading-tight tracking-[-0.02em]" style={{ color: "#0f0d0c" }}>{p.name}</p>
            {p.badge && <span className="whitespace-nowrap rounded-full px-2.5 py-1 text-[0.875rem] font-semibold" style={{ background: "#ffeadb", color: "#f8400a" }}>{p.badge}</span>}
          </div>
          <p className="mt-3 flex items-baseline gap-2"><span className={`${head} whitespace-nowrap text-[2.5rem] !font-semibold leading-none tracking-[-0.03em]`} style={{ color: "#0f0d0c" }}>{p.price}</span>{p.unit && <span className="text-[1rem]" style={{ color: "#4a4440" }}>/{unitMain}</span>}</p>
          <p className="mt-2 text-[0.9375rem]" style={{ color: "#6b625d" }}>{p.unit ? unitRest.join(" ") : "Pris efter antal brugere"}</p>
        </div>
        <div className="flex flex-1 flex-col border-t px-5 pb-5 pt-4" style={{ borderColor: "#e8e4e1" }}>
          <p className="text-[0.9375rem]" style={{ color: "#4a4440" }}>{privatMode ? "Det får du" : "Det får I"}</p>
          <ul className="mt-3 grid gap-2.5">
            {items.map((x) => <li key={x} className="flex items-center gap-2.5 text-[0.9375rem] leading-[1.35]" style={{ color: "#1a1614" }}><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="shrink-0"><path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>{x}</li>)}
          </ul>
          <Link href={planHref[p.href]} className={`nf-focus nf-press mt-auto flex h-11 translate-y-0 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition ${p.featured ? "text-white hover:bg-black" : "border hover:bg-[#f7f5f3]"}`} style={p.featured ? { background: "#0f0d0c", marginTop: 22 } : { borderColor: "#dcd7d3", color: "#0f0d0c", marginTop: 22 }}>{p.cta} {arrow}</Link>
        </div>
      </div>
    );
  };
  return (
    <section id="priser" className="py-[100px]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,292px))] lg:gap-x-5 lg:px-[3.5vw]">
        <div className="flex min-w-0 flex-col lg:pr-6">
          <span className="self-start rounded-full border px-3 py-1 text-[0.875rem]" style={{ borderColor: "#dcd7d3", color: "#0f0d0c" }}>Vores priser</span>
          <h2 className={`${head} mt-4 text-[clamp(2.25rem,1.6rem+1.8vw,3rem)] !font-semibold leading-[1.05] tracking-[-0.03em]`} style={{ color: "#0f0d0c" }}>Enkle priser, ingen binding</h2>
          <p className="mt-5 max-w-[24rem] text-[1rem] leading-6" style={{ color: "#4a4440" }}>{privatMode ? "Én fast pris om måneden. Del med en ven, og I betaler mindre hver." : "I betaler pr. bruger pr. måned. Jo flere I er, jo lavere er prisen."}</p>
          {toggle && (
            <div role="group" aria-label="Vælg priser for" className="mt-6 inline-flex self-start rounded-full p-1 text-[0.9375rem] font-semibold" style={{ background: "#f5f2ef" }}>
              {([["virksomhed", "Erhverv"], ["privat", "Privat"]] as const).map(([k, l]) => (
                <button key={k} type="button" aria-pressed={mode === k} onClick={() => setSiteMode(k)} className="nf-focus rounded-full px-5 py-2 transition" style={mode === k ? { background: c.ink, color: "#fff" } : { color: c.ink }}>{l}</button>
              ))}
            </div>
          )}
          <ul className="mt-6 grid gap-4">
            {facts.map((f) => <li key={f.t} className="flex items-center gap-3 text-[1rem]" style={{ color: "#4a4440" }}><span className="shrink-0" style={{ color: "#4a4440" }}>{f.icon}</span>{f.t}</li>)}
          </ul>
          <div className="mt-12 lg:mt-20">
            <p className="text-[1rem]" style={{ color: "#4a4440" }}>Virksomheder, der træner AI med os</p>
            {/* Logo marquee (Marco 2026-11-23): runs left, pauses on hover, fades at both edges, still for reduced motion.
                The set is repeated so one half always fills the strip; the second half is hidden from screen readers. */}
            <div className="logo-marquee mt-4 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
              <div className="logo-marquee__track flex w-max items-center" style={{ color: "#0f0d0c" }}>
                {[0, 1].map((half) => (
                  <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 items-center gap-x-10 pr-10">
                    {[0, 1, 2].map((r) => (
                      <Fragment key={r}>
                        <li><span role="img" aria-label={half === 0 && r === 0 ? "SydDesign" : undefined} className="block h-[1.4rem] w-[7rem] bg-current" style={{ maskImage: "url(/logos/syddesign.svg)", WebkitMaskImage: "url(/logos/syddesign.svg)", maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }} /></li>
                        <li><DemoLogo logo={leadline} /></li>
                      </Fragment>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        {plans.map((p) => p.featured ? (
          <div key={p.id} className="pris-glow relative flex flex-col rounded-[22px] p-[3px] lg:self-end">
            <p className="relative px-4 pb-2 pt-1.5 text-center text-[0.875rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(120,20,0,0.45)]">{p.tab}</p>
            <div className="relative flex-1 rounded-[19px] bg-white">{card(p)}</div>
          </div>
        ) : (
          <div key={p.id} className="order-last rounded-[20px] border bg-white lg:order-none lg:self-end" style={{ borderColor: "#e3dfdc" }}>{card(p)}</div>
        ))}
      </div>
    </section>
  );
}

/* 7 · FAQ: heading left, white rounded questions right. */
const faq = [
  { q: "Er vores data sikre?", a: "Platformen er hostet i EU med data i Frankfurt, og I får en databehandleraftale med fra start." },
  { q: "Hvor lang tid tager det?", a: "En lektion tager cirka 10 minutter. Et helt kursus tager 1–2 timer, fordelt på korte lektioner." },
  { q: "Kan vi stoppe igen?", a: "Ja. Der er ingen binding, og I betaler pr. bruger pr. måned." },
  { q: "Hvor mange skal være med?", a: "Fra 1 bruger. Erhverv koster 69 kr. pr. bruger om måneden og 55 kr. fra 10 brugere. Privat koster 69 kr. om måneden." },
  { q: "Hvilke AI-værktøjer lærer vi?", a: "ChatGPT, Copilot og Claude, side om side, så holdet lærer det værktøj, I bruger." },
  { q: "Får medarbejderne et bevis?", a: "Ja. Alle får et kursusbevis med navn, score og et unikt ID, som kan tjekkes via QR-koden." },
];
/* Spørgsmål og svar (Marco 2026-11-13): heading and a contact card on the left, the questions as soft cream cards on the
   right with a plus that turns into a cross; the first one is open. Our heading, questions and contact copy. */
const faqCard = "0 1px 0 rgba(31,22,17,0.04), 0 24px 48px -28px rgba(31,22,17,0.35)";
export function Faq() {
  return (
    <section id="faq" className="relative isolate overflow-hidden pb-24 pt-20" style={{ background: "#f6f1ea" }}>
      <div className="mx-auto grid w-full max-w-[1216px] gap-12 px-5 lg:grid-cols-[36%_1fr] lg:gap-[5%] lg:px-0">
        {/* Marco 2026-11-23: the left column takes its height from the questions (h-0 + min-h-full), so the card's bottom
            always lines up with the last question, open or closed. */}
        <div className="flex flex-col lg:h-0 lg:min-h-full">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className={`${head} mt-[22px] text-[clamp(2.5rem,1.6rem+2.4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em]`} style={{ color: c.ink }}>Spørgsmål, vi ofte får</h2>
          <div className="mt-8 flex flex-1 flex-col items-start rounded-[24px] px-8 py-7" style={{ background: "#fbf8f3", boxShadow: faqCard }}>
            <span className="block size-[84px] shrink-0 overflow-hidden rounded-full" style={{ boxShadow: "0 0 0 1px #0f0d0c, 0 12px 30px -8px rgba(31,22,17,0.35)" }}><Image src="/img/marco-2.jpg" alt="Marco Nielsen" width={96} height={96} className="size-full object-cover" /></span>
            <h3 className={`${head} mt-5 text-[1.75rem] font-normal leading-tight tracking-[-0.01em]`} style={{ color: c.ink }}>Hellere skrive direkte?</h3>
            <p className="mb-5 mt-2 text-[1.125rem] leading-7" style={{ color: "rgba(31,22,17,0.64)" }}>Lad os tale om jeres hold.</p>
            <a href="mailto:kontakt@mindforward.dk" className="nf-focus mt-auto block self-stretch rounded-[14px] border px-[30px] py-3 text-center text-[1.0625rem] font-medium transition-colors hover:bg-[rgba(28,28,30,0.05)]" style={{ borderColor: "rgba(31,22,17,0.16)", color: "#1c1c1e" }}>kontakt@mindforward.dk</a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {faq.map((f, k) => (
            <details key={f.q} name="faq" open={k === 0} className="group rounded-[16px]" style={{ background: "#fbf8f3", boxShadow: faqCard }}>
              <summary className="nf-focus flex cursor-pointer list-none items-center justify-between gap-6 px-[22px] py-5 text-[1.25rem] leading-[1.25] sm:px-7 sm:py-[22px] lg:text-[1.5rem] [&::-webkit-details-marker]:hidden" style={{ color: c.ink }}>
                {f.q}
                <span aria-hidden className="relative size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-open:rotate-45">
                  <span className="absolute left-0 top-[9px] h-[2.4px] w-5 rounded-[2px]" style={{ background: c.ink }} />
                  <span className="absolute left-0 top-[9px] h-[2.4px] w-5 rotate-90 rounded-[2px]" style={{ background: c.ink }} />
                </span>
              </summary>
              <p className="-mt-1.5 px-[22px] pb-[30px] text-[1.125rem] leading-[35px] sm:px-[30px]" style={{ color: "rgba(31,22,17,0.64)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 · Kontakt (dark band with coral light streaks): heading left, form card right, a small contact card bottom-left. */
const field = "h-10 w-full rounded-full border-0 px-5 text-[0.875rem] outline-none ring-1 ring-transparent transition focus:ring-[#e8664a]";
function Contact() {
  const [state, action, pending] = useActionState<FormState, FormData>(contactAction, { ok: false });
  const [extra, setExtra] = useState({ firma: "", tlf: "", antal: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (state.ok) { setMsg(""); setExtra({ firma: "", tlf: "", antal: "" }); } }, [state.ok]);
  return (
    <section id="kontakt" className="relative overflow-hidden py-12 sm:py-14" style={{ background: c.dark }}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(232,102,74,0) 0 7px, rgba(232,102,74,0.55) 8px, rgba(246,201,182,0.25) 10px, rgba(232,102,74,0) 12px 19px)", maskImage: "linear-gradient(180deg, transparent 25%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 25%, black 100%)" }} />
      <div className={`${wrap} relative grid grid-cols-1 gap-12 lg:grid-cols-2`}>
        <div className="flex flex-col">
          <Label light>Kontakt</Label>
          <h2 className={`${h2} !font-semibold tracking-[-0.045em] mt-4 max-w-[14ch] text-white`}>Lad os tale om jeres hold</h2>
          <p className="mt-4 max-w-[24rem] text-[1rem] leading-relaxed text-white/70">Udfyld formularen, så vender vi tilbage inden for 1 hverdag.</p>
          <div className="mt-8 flex max-w-[28rem] items-center gap-4 rounded-[20px] bg-white p-2.5 lg:mt-auto">
            <span className="grid size-16 shrink-0 place-items-center rounded-[14px]" style={{ background: c.coralSoft }}><Image src="/img/mindforward-logo-2.png" alt="" width={48} height={40} /></span>
            <div>
              <p className="text-[1rem] font-semibold leading-snug" style={{ color: c.ink }}>Hellere skrive direkte?</p>
              <GrebBtn href="mailto:kontakt@mindforward.dk" onDark className="mt-3">kontakt@mindforward.dk</GrebBtn>
            </div>
          </div>
        </div>
        <form action={action} noValidate className="min-w-0 rounded-[24px] bg-white p-5 sm:p-6">
          <p className={`${head} text-[1.25rem] tracking-[-0.015em]`} style={{ color: c.ink }}>Book 15 minutter med os</p>
          <input className="hidden" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />
          
          <div className="mt-4 grid gap-3">
            {/* Marco 2026-11-23: the section was too tall, so the fields sit two and three to a row. */}
            <div className="grid grid-cols-2 gap-3">
            {([["name", "Navn", "Dit navn", "text", true], ["email", "Arbejdsmail", "navn@firma.dk", "email", true]] as const).map(([n, l, ph, type]) => (
              <label key={n} className="grid min-w-0 gap-1 text-[0.8125rem] font-medium" style={{ color: c.ink }}>{l}
                <input name={n} type={type} placeholder={ph} defaultValue={state.values?.[n] ?? ""} className={field} style={{ background: c.page, color: c.ink }} />
                {state.errors?.[n] && <span className="text-[0.8125rem]" style={{ color: c.coralText }}>{state.errors[n]}</span>}
              </label>
            ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <label className="grid min-w-0 gap-1 text-[0.8125rem] font-medium" style={{ color: c.ink }}>Telefon (valgfri)
              <input type="tel" name="phone" value={extra.tlf} onChange={(e) => setExtra({ ...extra, tlf: e.target.value })} placeholder="12 34 56 78" className={field} style={{ background: c.page, color: c.ink }} />
            </label>
              <label className="grid min-w-0 gap-1 text-[0.8125rem] font-medium" style={{ color: c.ink }}>Virksomhed
                <input name="company" value={extra.firma} onChange={(e) => setExtra({ ...extra, firma: e.target.value })} placeholder="Firmanavn" className={field} style={{ background: c.page, color: c.ink }} />
              </label>
              <label className="col-span-2 grid min-w-0 gap-1 text-[0.8125rem] font-medium sm:col-span-1" style={{ color: c.ink }}>Antal medarbejdere
                <select name="team_size" value={extra.antal} onChange={(e) => setExtra({ ...extra, antal: e.target.value })} className={field} style={{ background: c.page, color: c.ink }}>
                  <option value="">Vælg</option><option>5–20</option><option>21–50</option><option>51–200</option><option>Over 200</option>
                </select>
              </label>
            </div>
            <label className="grid min-w-0 gap-1 text-[0.8125rem] font-medium" style={{ color: c.ink }}>Besked
              <textarea name="message" value={msg} onChange={(e) => setMsg(e.target.value)} rows={2} placeholder="Hvad vil I gerne blive bedre til?" className="w-full rounded-[18px] border-0 px-5 py-2.5 text-[0.875rem] outline-none ring-1 ring-transparent focus:ring-[#e8664a]" style={{ background: c.page, color: c.ink }} />
              {state.errors?.message && <span className="text-[0.8125rem]" style={{ color: c.coralText }}>{state.errors.message}</span>}
            </label>
          </div>
          <GrebBtn disabled={pending} onDark className="greb-btn--full mt-4">{pending ? "Sender …" : "Send"}</GrebBtn>
          <p className="mt-3 flex items-center gap-2 text-[0.8125rem]" style={{ color: c.muted }}>
            <Icon name="check" size={14} />{state.ok ? state.message : "Vi bruger kun dine oplysninger til at svare dig."}
          </p>
        </form>
      </div>
    </section>
  );
}

/* Section separation, three versions (Marco 2026-11-10: "mere sektion opdeling … 3 versioner af hele siden").
   1 · Skiftende flader: every section gets its own flat background (page / white / peach / dark), full width.
   2 · Paneler: each section is a rounded panel inset from the window, with a strip of page colour between panels.
   3 · Linjer og numre: one background, a hairline and a numbered heading row ("01 Platformen") opening each section.
   In white areas the white cards turn page-coloured so they still read as cards. */
type Sep = 1 | 2 | 3;
const tones: Record<Sep, string[]> = {
  // Marco 2026-11-23: the contact section is white now (was dark).
  // Marco 2026-11-23: FAQ white so it stands off the cream price section above.
  1: ["page", "peach", "white", "page", "white", "page", "white", "warm"],
  2: ["white", "peach", "white", "sand", "white", "sand", "white", "dark"],
  3: ["page", "page", "page", "page", "page", "page", "page", "dark"],
};
const toneBg: Record<string, string> = { warm: "#fbf1e8", page: c.page, cream: "#f6f1ea", white: "#ffffff", peach: "#f8ddd0", sand: "#ece4dd", dark: c.dark };
const names = ["Platformen", "Sådan kommer I i gang", "I praksis", "Øvemiljøet", "Pilotforløb", "Pris", "Spørgsmål og svar", "Kontakt"];

function Sec({ sep, k, children }: { sep?: Sep; k: number; children: React.ReactNode }) {
  if (!sep) return <>{children}</>;
  const tone = tones[sep][k];
  const bg = toneBg[tone];
  // The sections carry their own background; strip it so the separator decides (peach and dark keep theirs).
  const inner = <div data-tone={tone} className="sep-inner [&>section]:!bg-transparent" style={{ background: bg }}>{children}</div>;
  if (sep === 2) return <div className="px-2 pt-2 sm:px-3 sm:pt-3 last:pb-3"><div className="overflow-hidden rounded-[28px] sm:rounded-[40px]">{inner}</div></div>;
  if (sep === 3) return (
    <div style={{ background: bg }}>
      {k > 0 && tone !== "dark" && (
        <div className="w-full px-5 pt-14 sm:px-[3.5vw]">
          <div className="flex items-baseline justify-between border-t pt-5 text-[0.875rem] font-medium" style={{ borderColor: "rgba(32,22,19,0.18)", color: c.ink }}>
            <span className="tabular-nums">{String(k + 1).padStart(2, "0")}</span><span className="opacity-60">{names[k]}</span>
          </div>
        </div>
      )}
      {inner}
    </div>
  );
  return inner;
}

export function Forside2({ practice, pilot, sep, steps }: { practice?: React.ReactNode; pilot?: React.ReactNode; sep?: Sep; steps?: React.ReactNode } = {}) {
  const parts = [<Platform key="p" />, steps ?? <FeatureBento key="s" />, <Cases key="c" />, practice ?? <Practice key="o" />, pilot ?? <Pilot key="l" />, <Price key="r" />, <Faq key="f" />, <KontaktSide key="k" heading="h2" id="kontakt" />];
  return (
    <div style={{ background: c.page }}>
      {/* In white areas the white cards and buttons switch to the page colour so they still read as cards. */}
      <style>{`[data-tone="white"] .bg-white { background-color: ${c.page}; } [data-tone="sand"] .bg-white { background-color: #fff; }`}</style>
      {/* Marco 2026-11-14: the video testimonials come right after the hero. */}
      <Udtalelser />
      {parts.map((node, k) => <Sec key={k} sep={sep} k={k}>{node}</Sec>)}
    </div>
  );
}
