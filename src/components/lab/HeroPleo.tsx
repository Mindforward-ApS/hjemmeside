"use client";

// Hero after Pleo's Danish front page (pleo.io/da, captured 2026-11-07 → design/references/hero-ideer/pleo-*.png).
// Marco: "det samme for pleo, det er sådan vi danskere åbenbart er vant til at se tingene" (Jakob's law).
// Copied traits, measured at 1440×900:
// - full-bleed photo, a full window tall, the product held in a hand on the right;
// - nav: links left, logo centred, Log ind + outline button + filled button right;
// - a segment switch centred under the nav, each option with a title and a small line under it;
// - left: a soft frosted panel behind a small proof chip, a 3-line H1 (58 px), a 26 px lead and one CTA with the arrow
//   pushed to the right;
// - bottom: "Mere end 40.000 virksomheder … bruger Pleo" + a logo row → ours: the tools you train in (no fake customers).
// Our colours only: coral for buttons, white/cream, brown. Background photo = DOKK1 until Marco's new image.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { MenuButton } from "@/components/lab/HeroLunar";

const coral = "#e8664a";
const ink = "#201613";
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "w-full px-5 sm:px-[2.5vw]";

type Mode = "virksomhed" | "privat";

const segments = [
  { id: "virksomhed", title: "Virksomhed", sub: "Fra 5 medarbejdere" },
  { id: "privat", title: "Privat", sub: "Kun dig" },
] as const;

const copy = {
  virksomhed: { lead: "10 minutter om dagen på dansk, med opgaver fra jeres egen hverdag og en score til hver.", href: appLinks.startBusiness },
  privat: { lead: "Korte lektioner på dansk, rigtige opgaver med en score og et kursusbevis med dit navn.", href: appLinks.buyPrivate() },
} satisfies Record<Mode, { lead: string; href: string }>;

function NavPleo() {
  return (
    <header className={`${wrap} relative z-20 grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center`}>
      <ul className="hidden items-center gap-2 text-[1rem] text-white lg:flex">
        {([["Kurser", "#kurser"], ["Sådan virker det", "#saadan"], ["Priser", "#pris"]] as const).map(([l, href]) => (
          <li key={l}><Link href={href} className="nf-focus inline-flex h-9 items-center rounded-full px-4 transition-colors hover:bg-white/10">{l}</Link></li>
        ))}
      </ul>
      <Link href="/" aria-label="Mindforward forside" className="col-start-1 justify-self-start lg:col-start-2 lg:justify-self-center"><MindforwardLogo size={30} /></Link>
      <div className="col-start-3 flex items-center justify-end gap-2">
        <Link href={appLinks.login} className="nf-focus hidden h-10 items-center px-3 text-[1rem] text-white transition-opacity hover:opacity-75 lg:inline-flex">Log ind</Link>
        <Link href="#virksomheder" className="nf-focus hidden h-10 items-center rounded-full border border-white/80 px-4 text-[1rem] text-white transition-colors hover:bg-white/10 md:inline-flex">Book 15 min</Link>
        <Link href={appLinks.signup} className="nf-focus nf-press hidden h-10 sm:inline-flex items-center rounded-full px-4 text-[1rem] font-medium transition-[filter,transform] hover:brightness-110" style={{ background: coral, color: ink }}>Start et kursus</Link>
        <MenuButton />
      </div>
    </header>
  );
}

function Segments({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div role="tablist" aria-label="Vis siden for" className="relative z-10 mx-auto mt-1 grid w-full max-w-[25rem] grid-cols-2 gap-1 rounded-full bg-[#f7f2ee]/90 p-1.5 backdrop-blur-md">
      {segments.map((s) => (
        <button key={s.id} type="button" role="tab" aria-selected={mode === s.id} onClick={() => setMode(s.id)} className={`nf-focus min-h-[3.25rem] rounded-full px-4 leading-tight transition-colors duration-300 ${mode === s.id ? "bg-white text-[#201613] shadow-[0_1px_3px_rgba(32,22,19,0.18)]" : "text-[#201613]/80 hover:bg-black/5"}`}>
          <span className="block text-[0.875rem] font-medium">{s.title}</span>
          <span className="block text-[0.75rem]">{s.sub}</span>
        </button>
      ))}
    </div>
  );
}

// Pleo's product sits in a hand in the video. Until Marco's new photo exists, the phone is drawn in CSS with the real
// practice screen on it (example data), tilted like Pleo's.
function PhoneInHand() {
  return (
    <div aria-hidden className="pointer-events-none relative w-[13rem] rotate-[-9deg] sm:w-[15.5rem] rounded-[2.6rem] bg-[#1b1412] p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),inset_0_0_0_1.5px_rgba(255,255,255,0.12)] xl:w-[17.5rem]">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-[#fbf6f2] px-4 pb-5 pt-11 text-[#201613]">
        <span className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-[#1b1412]" />
        <p className="text-[0.6875rem] font-medium text-[#5a4a44]">Øvemiljø · Opgave 3 af 5</p>
        <p className="mt-1 text-[0.9375rem] font-semibold leading-snug">Svar en kunde, der har ventet fem dage på en levering</p>
        <div className="mt-3 rounded-[14px] bg-[#201613] p-3 text-[0.75rem] leading-snug text-white">Du er min assistent. Skriv et kort, venligt svar til Mette, der har ventet fem dage på sin ordre …</div>
        <div className="mt-3 rounded-[14px] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-10px_rgba(32,22,19,0.25)]">
          <div className="flex items-baseline justify-between">
            <p className="text-[0.6875rem] font-medium text-[#5a4a44]">Din score</p>
            <p><span className={`${display} text-[2.25rem] leading-none`}>86</span><span className="text-[0.75rem] text-[#5a4a44]"> / 100</span></p>
          </div>
          <ul className="mt-2 space-y-1.5 text-[0.75rem]">
            {["Klar opgave og modtager", "Længde og tone angivet"].map((x) => <li key={x} className="flex items-center gap-1.5"><Icon name="check" size={14} />{x}</li>)}
            <li className="flex items-center gap-1.5" style={{ color: coral }}><Icon name="plus" size={14} />Sig, hvorfor leveringen er forsinket</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HeroPleo() {
  const [mode, setMode] = useState<Mode>("virksomhed");
  const t = copy[mode];
  return (
    <section data-hero className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#201613]">
      <div aria-hidden data-hero-bg className="pointer-events-none absolute -inset-y-[8%] inset-x-0">
        <Image src="/img/unsplash/dokk1.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[60%_62%]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,7,7,0.5) 0%, rgba(8,7,7,0.15) 30%, rgba(8,7,7,0.15) 70%, rgba(8,7,7,0.6) 100%)" }} />
      <NavPleo />
      <div className="px-5"><Segments mode={mode} setMode={setMode} /></div>

      <div className={`${wrap} relative grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,40rem)_1fr]`}>
        {/* Pleo's frosted panel: blurred photo behind the text, fading out at the edges instead of a hard card. */}
        <div className="relative">
          <div aria-hidden className="absolute -inset-x-3 -inset-y-8 rounded-[24px] bg-black/25 backdrop-blur-xl [mask-image:linear-gradient(180deg,black_80%,transparent)] sm:-inset-x-6 lg:[mask-image:none]" />
          <div className="relative">
            <span data-hero-in className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[0.8125rem] font-medium text-white backdrop-blur">
              <span className="size-1.5 rounded-full" style={{ background: coral }} />Pilotforløb åbent
            </span>
            <h1 data-hero-title className={`${display} mt-4 text-[length:clamp(3.5rem,1.6rem+4.6vw,5.75rem)] text-white`}>
              <span className="block">AI-træning</span>
              <span className="block whitespace-nowrap">til hele holdet</span>
            </h1>
            <p data-hero-in className="mt-4 max-w-[34rem] text-[1.25rem] leading-snug text-white sm:text-[1.5rem]">{t.lead}</p>
            <Link data-hero-in href={t.href} data-btn="primary" className="nf-focus nf-press group mt-8 inline-flex h-12 min-w-[13rem] items-center justify-between gap-6 rounded-full pl-5 pr-4 text-[1rem] font-medium transition-[filter,transform] hover:brightness-110" style={{ background: coral, color: ink }}>
              Start et kursus <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div data-hero-card className="flex justify-center lg:justify-start lg:pl-[8vw]"><PhoneInHand /></div>
      </div>

      {/* Pleo's "Mere end 40.000 virksomheder … bruger allerede Pleo" + logos. We have no customers yet, so the row
          shows the tools you train in, as logos at the same size. */}
      <div data-hero-in className={`${wrap} relative flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:gap-12`}>
        <p className="text-[1.125rem] leading-snug text-white sm:shrink-0 sm:text-[1.25rem]">Du træner i de værktøjer, I allerede bruger</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {[["chatgpt", "ChatGPT"], ["copilot", "Copilot"], ["claude", "Claude"]].map(([l, n]) => (
            <li key={l} className="flex items-center gap-2.5 text-[1.25rem] font-semibold text-white">
              <Image src={`/logos/${l}.png`} alt="" width={28} height={28} className="size-7 rounded-[8px]" />{n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
