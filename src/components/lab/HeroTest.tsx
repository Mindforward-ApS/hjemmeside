"use client";

// Hero test (Marco 2026-11-02): three directions side by side at /preview/hero-test.
// A = the product is the hero, B = the person is the hero, C = before/after in the hero.
// Same headline, eyebrow and points as the live hero, so only the design differs.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { HeroLogin } from "@/components/night/HeroLogin";

const stage =
  "radial-gradient(70% 55% at 50% 8%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), radial-gradient(60% 70% at 72% 85%, #271d19 0%, transparent 70%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";
const coral = "oklch(0.66 0.19 33)";
const points = ["Korte lektioner på dansk", "Opgaver i øvemiljøet med score", "Overblik for hele teamet"];

function Nav() {
  return (
    <header className="relative z-20 px-2 pt-2 md:pt-4">
      <nav
        aria-label="Hovedmenu"
        className="mx-auto flex h-16 items-center gap-2 rounded-[16px] border border-white/10 pl-4 pr-2 backdrop-blur-xl sm:h-[4.75rem] sm:gap-4 sm:pl-6 sm:pr-3"
        style={{ background: "linear-gradient(180deg, rgba(52, 32, 26, 0.82), rgba(30, 18, 15, 0.76))" }}
      >
        <Link href="/" aria-label="Mindforward forside" className="rounded-lg"><MindforwardLogo size={36} /></Link>
        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {["Kurser", "Sådan virker det", "Priser"].map((l) => (
            <li key={l}><span className="block rounded-full px-4 py-2 text-[0.9375rem] font-medium text-white/85">{l}</span></li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2 sm:gap-5 lg:ml-0">
          <span className="hidden text-[0.9375rem] font-medium text-white/85 md:inline">Log ind</span>
          <Link href={appLinks.signup} className="n-btn n-btn-cream !min-h-11 !rounded-[12px] !px-4 !text-[0.875rem] sm:!min-h-12 sm:!px-6 sm:!text-[0.9375rem]">
            <span className="sm:hidden">Start</span><span className="hidden sm:inline">Start et kursus</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Eyebrow() {
  return <p className="mb-6 text-[1.0625rem] font-medium text-white/75 sm:text-[1.1875rem]">Lær AI ved at bruge det</p>;
}

function Title({ className = "" }: { className?: string }) {
  return (
    <h1 className={`font-display font-normal leading-[1.02] tracking-[-0.04em] text-white ${className}`}>
      AI-kurser med veludviklet øvemiljø.
    </h1>
  );
}

function Points() {
  return (
    <ul className="mt-8 grid gap-3.5">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-3 text-[1.0625rem] text-white/85">
          <span className="grid size-6 shrink-0 place-items-center rounded-full text-white" style={{ background: coral }}><Icon name="check" size={14} /></span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function ExampleTag({ dark = false }: { dark?: boolean }) {
  return <span className={`rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${dark ? "bg-white/10 text-white/70" : "bg-[oklch(0.95_0.01_60)] text-[oklch(0.45_0.02_40)]"}`}>Eksempel</span>;
}

const tools = ["ChatGPT", "Copilot", "Claude"];

/* ───────────────────────── A · Produktet er helten ───────────────────────── */

function PracticeWindow() {
  const criteria = [
    { label: "Klar opgave", got: 30, max: 30, note: null },
    { label: "Format angivet", got: 25, max: 25, note: null },
    { label: "Kontekst", got: 18, max: 25, note: "Skriv, hvem Mette er, og hvad hun skal bruge referatet til." },
    { label: "Tjek af svaret", got: 13, max: 20, note: null },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[oklch(0.99_0.003_60)] text-[oklch(0.24_0.02_30)] shadow-[0_40px_90px_-30px_rgba(10,4,2,0.8)] ring-1 ring-white/10">
      {/* Window bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[oklch(0.24_0.02_30/0.08)] px-5 py-3.5">
        <span className="flex gap-1.5" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-[oklch(0.88_0.01_60)]" />)}</span>
        <p className="text-[0.875rem] font-medium">Øvemiljø <span className="text-[oklch(0.55_0.012_30)]">· AI på arbejdet · Opgave 3 af 5</span></p>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-full bg-[oklch(0.95_0.006_60)] p-1 text-[0.8125rem]">
            {tools.map((t, i) => (
              <span key={t} className={`rounded-full px-3 py-1 ${i === 1 ? "bg-white font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-[oklch(0.5_0.012_30)]"}`}>{t}</span>
            ))}
          </div>
          <ExampleTag />
        </div>
      </div>

      <div className="grid md:grid-cols-[1.35fr_1fr]">
        {/* Task + prompt + answer */}
        <div className="grid content-start gap-4 p-5 sm:p-6">
          <div className="rounded-[12px] bg-[oklch(0.96_0.012_50)] p-4">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em]" style={{ color: coral }}>Din opgave</p>
            <p className="mt-1.5 text-[0.9375rem] leading-snug">Lav et referat af lagermødet til Mette Holm. Højst 120 ord og tre punkter.</p>
          </div>
          <div className="ml-auto max-w-[92%] rounded-[14px] rounded-br-[4px] bg-[oklch(0.24_0.02_30)] px-4 py-3 text-[0.9375rem] leading-snug text-white">
            Du er min assistent. Skriv et referat af mødenoterne herunder til Mette. Tre punkter, højst 120 ord, venlig tone.
          </div>
          <div className="max-w-[92%] rounded-[14px] rounded-bl-[4px] border border-[oklch(0.24_0.02_30/0.08)] bg-white px-4 py-3 text-[0.9375rem] leading-snug shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="font-semibold">Referat: Lagermøde tirsdag</p>
            <ul className="mt-1.5 grid gap-1 text-[oklch(0.35_0.015_30)]">
              <li>• Ny plukkerute fra 1. december</li>
              <li>• Jonas bestiller to ekstra scannere</li>
              <li>• Næste møde 3. dec. kl. 9.00</li>
            </ul>
          </div>
        </div>

        {/* Score */}
        <div className="border-t border-[oklch(0.24_0.02_30/0.08)] bg-[oklch(0.975_0.005_60)] p-5 sm:p-6 md:border-l md:border-t-0">
          <p className="text-[0.8125rem] font-medium text-[oklch(0.5_0.012_30)]">Din score</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-[3.5rem] font-medium leading-none tracking-[-0.04em] tabular-nums">86</span>
            <span className="text-[1rem] text-[oklch(0.55_0.012_30)]">/ 100</span>
          </p>
          <ul className="mt-5 grid gap-3.5">
            {criteria.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-[0.875rem]"><span>{c.label}</span><span className="tabular-nums text-[oklch(0.5_0.012_30)]">{c.got}/{c.max}</span></div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[oklch(0.91_0.008_60)]">
                  <div className="h-full rounded-full" style={{ width: `${(c.got / c.max) * 100}%`, background: c.got === c.max ? "oklch(0.55 0.13 155)" : coral }} />
                </div>
                {c.note && <p className="mt-2 text-[0.8125rem] leading-snug text-[oklch(0.45_0.015_30)]">{c.note}</p>}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <span className="rounded-[10px] bg-[oklch(0.24_0.02_30)] px-4 py-2.5 text-[0.875rem] font-medium text-white">Prøv igen</span>
            <span className="rounded-[10px] border border-[oklch(0.24_0.02_30/0.15)] px-4 py-2.5 text-[0.875rem] font-medium">Næste opgave</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroA() {
  return (
    <section className="relative overflow-hidden" style={{ background: stage }}>
      <Nav />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-6 pb-16 pt-14 md:px-[3.5vw] lg:grid-cols-[0.85fr_1.3fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <Eyebrow />
          <Title className="text-[clamp(2.25rem,1rem+3vw,4rem)]" />
          <Points />
          <HeroLogin />
        </div>
        {/* The bold move: a real practice screen, large, with the score as the focal point */}
        <div className="relative">
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.35),transparent)] blur-2xl" />
          <div className="relative"><PracticeWindow /></div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── B · Mennesket er helten ───────────────────────── */

function HeroB() {
  return (
    <section className="relative overflow-hidden" style={{ background: stage }}>
      <Nav />
      <div className="relative mx-auto grid max-w-[1500px] gap-8 px-6 md:px-[3.5vw] lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1fr_1fr]">
        <div className="relative z-10 self-center pt-12 lg:pb-24 lg:pt-0">
          <Eyebrow />
          <Title className="max-w-[12ch] text-[clamp(2.75rem,1rem+4.4vw,5.75rem)]" />
          <p className="mt-8 max-w-[30rem] text-[1.1875rem] leading-relaxed text-white/70">
            Korte lektioner på dansk, opgaver i øvemiljøet med score og overblik for hele teamet.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={appLinks.signup} className="n-btn n-btn-cream !min-h-14 !rounded-[12px] !px-7 !text-[1rem]">
              Start et kursus <Icon name="arrowRight" size={18} />
            </Link>
            <Link href="/#kurser" className="text-[1rem] text-white underline underline-offset-4">Se kurserne først</Link>
          </div>
        </div>
        {/* The person, large, standing on the bottom edge. Placeholder until Marco's own photo. */}
        <div className="relative h-[26rem] sm:h-[34rem] lg:h-auto">
          <div aria-hidden className="absolute bottom-0 left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.5),oklch(0.5_0.08_40/0.15)_60%,transparent)] blur-2xl" />
          <Image src="/img/mf-hero-crossed.webp" alt="" width={1100} height={998} priority sizes="(min-width:1024px) 50vw, 100vw" className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom" />
          <span className="absolute right-0 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[0.8125rem] text-white/80 backdrop-blur lg:top-[12%]">Pladsholder · dit eget foto her</span>
          <div className="absolute bottom-8 left-0 rounded-[14px] border border-white/10 bg-[rgba(30,18,15,0.7)] px-5 py-4 text-white backdrop-blur-xl lg:bottom-16 lg:left-[2%]">
            <p className="font-display text-[1.75rem] font-medium leading-none tracking-[-0.03em]">10 min</p>
            <p className="mt-1 text-[0.875rem] text-white/70">pr. lektion, mellem to møder</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── C · Før og efter ───────────────────────── */

const beforeAfter = {
  foer: {
    prompt: "skriv et referat",
    answer: ["Her er et referat af mødet:", "Mødet handlede om forskellige emner vedrørende lageret. Der blev diskuteret flere ting, og deltagerne aftalte at følge op. Det blev besluttet at holde et nyt møde senere."],
    score: 34,
    verdict: "Svaret er for generelt. Prompten mangler kontekst, format og modtager.",
  },
  efter: {
    prompt: "Du er min assistent. Skriv et referat af mødenoterne herunder til Mette Holm. Tre punkter, højst 120 ord, venlig tone.",
    answer: ["Referat: Lagermøde tirsdag", "• Ny plukkerute fra 1. december\n• Jonas bestiller to ekstra scannere\n• Næste møde 3. dec. kl. 9.00"],
    score: 92,
    verdict: "Klar opgave, tydelig modtager og et format, der kan bruges direkte.",
  },
};

function useCount(target: number, run: boolean) {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!run) { setN(target); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(target); return; }
    let raf = 0; const t0 = performance.now(); const from = 34;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900); const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function BeforeAfterCard() {
  const [side, setSide] = useState<"foer" | "efter">("foer");
  // Plays once: shows "før" first, then switches to "efter" by itself. The viewer can switch freely after that.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setSide("efter"); return; }
    const id = setTimeout(() => setSide("efter"), 2200);
    return () => clearTimeout(id);
  }, []);
  const d = beforeAfter[side];
  const score = useCount(d.score, side === "efter");
  const good = side === "efter";
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(30,18,15,0.72)] text-white shadow-[0_40px_90px_-30px_rgba(10,4,2,0.8)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex rounded-full bg-white/[0.06] p-1 text-[0.875rem]" role="tablist" aria-label="Før og efter">
          {(["foer", "efter"] as const).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={side === k} onClick={() => setSide(k)}
              className={`rounded-full px-4 py-1.5 transition-colors duration-200 ${side === k ? "bg-[oklch(0.96_0.02_60)] font-medium text-[oklch(0.24_0.02_30)]" : "text-white/70 hover:text-white"}`}>
              {k === "foer" ? "Før kurset" : "Efter kurset"}
            </button>
          ))}
        </div>
        <ExampleTag dark />
      </div>
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div key={side} className="ba-fade grid content-start gap-4 p-5 sm:p-6">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/50">Prompt</p>
            <p className={`mt-2 rounded-[12px] px-4 py-3 text-[0.9375rem] leading-snug ${good ? "bg-white/[0.08]" : "bg-white/[0.04] text-white/70"}`}>{d.prompt}</p>
          </div>
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/50">Svar</p>
            <div className="mt-2 rounded-[12px] bg-[oklch(0.99_0.003_60)] px-4 py-3 text-[0.9375rem] leading-snug text-[oklch(0.3_0.015_30)]">
              <p className="font-semibold text-[oklch(0.24_0.02_30)]">{d.answer[0]}</p>
              <p className="mt-1.5 whitespace-pre-line">{d.answer[1]}</p>
            </div>
          </div>
        </div>
        <div className="grid content-start border-t border-white/10 p-5 sm:p-6 md:border-l md:border-t-0">
          <p className="text-[0.8125rem] text-white/60">Score i øvemiljøet</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-[5.5rem] italic leading-[0.85] tabular-nums" style={{ color: good ? coral : "rgba(255,255,255,0.45)" }}>{score}</span>
            <span className="text-white/50">/ 100</span>
          </p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${score}%`, background: good ? coral : "rgba(255,255,255,0.35)" }} />
          </div>
          <p className="mt-5 text-[0.9375rem] leading-snug text-white/75">{d.verdict}</p>
          <div className="mt-6 flex gap-1.5 text-[0.75rem] text-white/55">
            {tools.map((t) => <span key={t} className="rounded-full border border-white/10 px-2.5 py-1">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroC() {
  return (
    <section className="relative overflow-hidden" style={{ background: stage }}>
      <Nav />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-6 pb-16 pt-14 md:px-[3.5vw] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow />
          <Title className="text-[clamp(2.25rem,1rem+3vw,4rem)]" />
          <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed text-white/70">
            Se forskellen på én opgave. Sådan ser det ud, når en medarbejder har været igennem et forløb.
          </p>
          <HeroLogin />
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.3),transparent)] blur-2xl" />
          <div className="relative"><BeforeAfterCard /></div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Switcher ───────────────────────── */

const variants = [
  { id: "a", label: "A · Produkt", note: "Øvemiljøet med score er det store billede. App-ikoner og kort er væk.", C: HeroA },
  { id: "b", label: "B · Menneske", note: "Ét stort foto, kort tekst og én knap. Fotoet er en pladsholder.", C: HeroB },
  { id: "c", label: "C · Før/efter", note: "Samme opgave før og efter kurset. Scoren tæller op af sig selv.", C: HeroC },
] as const;

export function HeroTest({ below }: { below: React.ReactNode }) {
  const [v, setV] = useState<string>("a");
  useEffect(() => {
    const read = () => { const h = location.hash.replace("#", ""); if (variants.some((x) => x.id === h)) setV(h); };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  const pick = (id: string) => { setV(id); history.replaceState(null, "", `#${id}`); window.scrollTo({ top: 0 }); };
  const cur = variants.find((x) => x.id === v)!;
  return (
    <div className="theme-night">
      <style>{`.ba-fade{animation:baIn 260ms cubic-bezier(0.16,1,0.3,1)}@keyframes baIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.ba-fade{animation:none}}`}</style>
      <cur.C />
      {below}
      <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
        <div className="w-full max-w-[40rem] rounded-[18px] border border-white/10 bg-[rgba(24,14,11,0.9)] p-2 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-1" role="tablist" aria-label="Vælg variant">
            {variants.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={v === x.id} onClick={() => pick(x.id)}
                className={`rounded-[12px] px-3 py-2.5 text-[0.875rem] font-medium transition-colors ${v === x.id ? "bg-[oklch(0.96_0.02_60)] text-[oklch(0.24_0.02_30)]" : "text-white/75 hover:bg-white/10"}`}>
                {x.label}
              </button>
            ))}
          </div>
          <p className="px-2 pb-1 pt-2 text-center text-[0.8125rem] text-white/65">{cur.note}</p>
        </div>
      </div>
    </div>
  );
}
