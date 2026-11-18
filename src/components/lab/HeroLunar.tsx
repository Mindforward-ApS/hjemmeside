"use client";

// Hero after Lunar's front page (lunar.app/da, captured 2026-11-07 → design/references/hero-ideer/lunar-*.png).
// Marco: "Se lunars hero den er fed." Copied traits, measured at 1440×900:
// - full-bleed photo, no card frame; the hero stops ~96 px short of the fold so the next section peeks in;
// - nav: logo, then a Privat/Erhverv pill (active = white), links, one CTA on the right;
// - left column: 2-line H1, three icon lines (32 px outlined icon, 16 px text, 56 px rhythm), one CTA, two proof rows;
// - top right: one floating glass object (Lunar's "Goals" card + lock/house) → our score card + two tool tiles.
// Our colours only: coral for the button, white glass, no green. The background photo is DOKK1 until Marco's new image.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

const coral = "#e8664a";
const ink = "#201613";
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "w-full px-5 sm:px-[3.5vw]";

type Mode = "virksomhed" | "privat";

const copy = {
  virksomhed: {
    lines: [
      ["clock", "10 minutter om dagen, på dansk."],
      ["chart", "Opgaver fra jeres egen hverdag, med en score."],
      ["doc", "Kursusbevis og overblik til lederen."],
    ],
    cta: "Start et kursus",
    href: appLinks.startBusiness,
  },
  privat: {
    lines: [
      ["clock", "Korte lektioner på dansk, i dit eget tempo."],
      ["chart", "Øv på rigtige opgaver, og få en score."],
      ["doc", "Kursusbevis med dit navn."],
    ],
    cta: "Start et kursus",
    href: appLinks.buyPrivate(),
  },
} satisfies Record<Mode, { lines: [IconName, string][]; cta: string; href: string }>;

function ModePill({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div role="tablist" aria-label="Vis siden for" className="relative grid shrink-0 grid-cols-2 rounded-full border border-white/70 p-[3px] text-[0.875rem] font-medium">
      <span aria-hidden className="absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: mode === "privat" ? "translateX(100%)" : "none" }} />
      {(["virksomhed", "privat"] as const).map((m) => (
        <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`nf-focus relative min-h-9 rounded-full px-1.5 text-[0.75rem] transition-colors sm:px-5 sm:text-[0.875rem] ${mode === m ? "text-[#201613]" : "text-white hover:text-white/80"}`}>
          {m === "virksomhed" ? "Virksomhed" : "Privat"}
        </button>
      ))}
    </div>
  );
}


// Mobile and tablet menu (Lunar and Pleo both show a round menu button below desktop width).
export function MenuButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button type="button" aria-expanded={open} aria-label={open ? "Luk menu" : "Åbn menu"} onClick={() => setOpen((v) => !v)} className="nf-focus grid size-11 place-items-center rounded-full bg-white text-[#201613]">
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>
      {open && (
        <nav className="nf-fade absolute inset-x-5 top-[4.75rem] z-30 rounded-[20px] bg-white p-2 text-[#201613] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          {([["Kurser", "#kurser"], ["Sådan virker det", "#saadan"], ["Priser", "#pris"], ["Log ind", appLinks.login]] as const).map(([l, href]) => (
            <Link key={l} href={href} onClick={() => setOpen(false)} className="nf-focus flex min-h-12 items-center rounded-[14px] px-4 text-[1rem] font-medium hover:bg-[#f7f2ee]">{l}</Link>
          ))}
          <Link href={appLinks.signup} className="nf-focus mt-1 flex h-12 items-center justify-center rounded-full font-semibold" style={{ background: coral, color: ink }}>Start et kursus</Link>
        </nav>
      )}
    </div>
  );
}

function NavLunar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <header className={`${wrap} relative z-20 flex h-20 items-center gap-2 sm:gap-8`}>
      <Link href="/" aria-label="Mindforward forside" className="shrink-0"><span className="sm:hidden"><MindforwardLogo size={24} /></span><span className="hidden sm:inline"><MindforwardLogo size={30} /></span></Link>
      <ModePill mode={mode} setMode={setMode} />
      <ul className="mx-auto hidden items-center gap-8 text-[0.9375rem] font-medium text-white lg:flex">
        {([["Kurser", "#kurser"], ["Sådan virker det", "#saadan"], ["Priser", "#pris"], ["Log ind", appLinks.login]] as const).map(([l, href]) => (
          <li key={l}><Link href={href} className="nf-focus rounded-[4px] transition-opacity hover:opacity-75">{l}</Link></li>
        ))}
      </ul>
      <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
        <Link href={appLinks.signup} className="nf-focus nf-press hidden h-10 items-center rounded-full px-5 text-[0.875rem] font-semibold transition-[filter,transform] hover:brightness-110 sm:inline-flex" style={{ background: coral, color: ink }}>Start et kursus</Link>
        <MenuButton />
      </div>
    </header>
  );
}

// Lunar's floating glass card (top right, slight 3D turn) with two small objects beside it. Ours shows the product
// doing its job: a practice answer scored 86 / 100, rising from the first try (34). Example data.
function GlassScore() {
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto w-[min(72vw,20rem)] [perspective:1200px] lg:mx-0 lg:w-[19rem]">
      <div className="nf-float [--float-d:7s] [--r:0deg]">
        <div className="rounded-[22px] border border-white/35 bg-white/[0.14] p-5 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl [transform:rotateY(-14deg)_rotateX(4deg)]">
          <p className="text-[0.75rem] font-medium text-white/70">Øvemiljø · Opgave 3 af 5</p>
          <p className="mt-1 text-[0.9375rem] font-semibold">Svar til en kunde</p>
          <p className="mt-3 rounded-[12px] bg-black/25 px-3 py-2 text-[0.75rem] leading-snug text-white/90">“Skriv et kort, venligt svar til Mette, der har ventet fem dage på sin ordre …”</p>
          <p className="mt-4 flex items-baseline gap-1.5">
            <span className={`${display} text-[4.25rem] leading-none`}>86</span>
            <span className="text-[0.875rem] text-white/70">/ 100</span>
          </p>
          <svg viewBox="0 0 240 70" className="mt-2 h-16 w-full overflow-visible">
            <defs>
              <linearGradient id="hlFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={coral} stopOpacity="0.45" /><stop offset="1" stopColor={coral} stopOpacity="0" /></linearGradient>
            </defs>
            <path d="M0 58 C40 56 60 50 90 44 S150 30 180 20 S220 8 240 6 V70 H0Z" fill="url(#hlFill)" />
            <path d="M0 58 C40 56 60 50 90 44 S150 30 180 20 S220 8 240 6" fill="none" stroke={coral} strokeWidth="3" strokeLinecap="round" />
            <circle cx="240" cy="6" r="5" fill="#fff" stroke={coral} strokeWidth="3" />
          </svg>
          <p className="mt-2 flex justify-between text-[0.75rem] text-white/70"><span>1. forsøg · 34</span><span>Nu · 86</span></p>
        </div>
      </div>
      {/* The two small objects (Lunar: lock + house) = two of the tools you train in. */}
      <span className="nf-float absolute -left-5 top-[52%] lg:-left-9 grid size-14 place-items-center rounded-[16px] border border-white/35 bg-white/[0.16] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] backdrop-blur-xl [--delay:-2s] [--float-d:6s] [--r:-10deg]">
        <Image src="/logos/chatgpt.png" alt="" width={30} height={30} className="size-[30px] rounded-[8px]" />
      </span>
      <span className="nf-float absolute -right-4 top-[6%] lg:-right-7 grid size-12 place-items-center rounded-[14px] border border-white/35 bg-white/[0.16] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] backdrop-blur-xl [--delay:-4s] [--float-d:5.5s] [--r:12deg]">
        <Image src="/logos/claude.png" alt="" width={26} height={26} className="size-[26px] rounded-[7px]" />
      </span>
    </div>
  );
}

export function HeroLunar() {
  const [mode, setMode] = useState<Mode>("virksomhed");
  const t = copy[mode];
  return (
    <section data-hero className="relative flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden bg-[#201613]">
      <div aria-hidden data-hero-bg className="pointer-events-none absolute -inset-y-[8%] inset-x-0">
        <Image src="/img/unsplash/dokk1.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[60%_62%]" />
      </div>
      {/* Lunar keeps the photo bright and lets a soft shade sit only behind the text. */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,7,7,0.72) 0%, rgba(8,7,7,0.45) 42%, rgba(8,7,7,0.12) 75%), linear-gradient(180deg, rgba(8,7,7,0.45) 0%, transparent 22%)" }} />
      <NavLunar mode={mode} setMode={setMode} />
      <div className={`${wrap} relative grid flex-1 content-center gap-12 pb-12 pt-4 lg:grid-cols-[1fr_auto] lg:items-start lg:pb-16`}>
        <div className="lg:pt-[7svh]">
          <h1 data-hero-title className={`${display} text-[length:clamp(3.5rem,1.6rem+6vw,6.5rem)] text-white`}>
            <span className="block">AI-træning til</span>
            <span className="block">hele holdet.</span>
          </h1>
          <ul data-hero-in className="mt-6 space-y-5">
            {t.lines.map(([icon, text]) => (
              <li key={text} className="flex items-center gap-4 text-[1.0625rem] text-white">
                <Icon name={icon} size={28} className="shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <Link data-hero-in href={t.href} data-btn="primary" className="nf-focus nf-press group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold transition-[filter,transform] hover:brightness-110 sm:inline-flex sm:w-auto" style={{ background: coral, color: ink }}>
            {t.cta} <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {/* Lunar's Trustpilot / App Store rows. We have no reviews yet, so the two rows carry facts instead. */}
          <div data-hero-in className="mt-8 space-y-2.5 text-[0.9375rem] text-white/85">
            <p className="flex flex-wrap items-center gap-2.5">
              <span className="flex gap-1">
                {["chatgpt", "copilot", "claude"].map((l) => <Image key={l} src={`/logos/${l}.png`} alt="" width={22} height={22} className="size-[22px] rounded-[6px]" />)}
              </span>
              <span className="font-semibold text-white">ChatGPT, Copilot og Claude</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Icon name="shield" size={20} className="shrink-0 text-white" />
              <span>{mode === "virksomhed" && <><span className="font-semibold text-white">69 kr. pr. bruger</span> · </>}<span className="whitespace-nowrap">Ingen binding · Data i EU</span></span>
            </p>
          </div>
        </div>
        <div data-hero-card className="lg:mr-[2vw] lg:pt-[calc(7svh+0.6rem)]"><GlassScore /></div>
      </div>
    </section>
  );
}
