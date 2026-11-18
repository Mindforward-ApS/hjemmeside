"use client";

// "Færdigheder" built closely on Calendly's "A better way to book your meetings" section
// (design/references/start-sektion/calendly-features.png, 2026-11-05). Borrowed: eyebrow chip with icon, big
// heading, a long list of features with hairline dividers where the one in view is sharp and the rest faded,
// each with a small square arrow button; on the right a big product visual on a gradient that stays put while
// the list scrolls and swaps with the active item. Colours translated to brown, sand and coral. Example content.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EnvelopeSimple, NotePencil, Table, ShieldCheck, MagnifyingGlass, ChatText, ArrowUpRight, GraduationCap } from "@phosphor-icons/react";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", sand: "#f3eee8", line: "#e6dcd3" };

const card = "w-full max-w-[25rem] rounded-[22px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(32,22,19,0.45)] ring-4 ring-white/40";

const Mail = (
  <div className={card}>
    <p className="text-[0.8125rem]" style={{ color: c.muted }}>Til: Mette Holm · Emne: Din levering</p>
    <p className="mt-3 text-[1.0625rem] leading-relaxed" style={{ color: c.ink }}>Hej Mette, tak for din tålmodighed, og undskyld ventetiden. Din ordre bliver leveret <strong>torsdag den 6. november</strong>.</p>
    <div className="mt-5 flex items-center justify-between">
      <span className="rounded-[10px] px-3 py-1.5 text-[0.8125rem] font-semibold" style={{ background: c.coralSoft, color: "#8a3420" }}>Udkast klar · 40 sek.</span>
      <span className="text-[0.8125rem]" style={{ color: c.muted }}>Før: 20 min</span>
    </div>
  </div>
);
const Referat = (
  <div className={card}>
    <p className="text-[1.25rem] font-semibold" style={{ color: c.ink }}>Referat · Ledermøde</p>
    <p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>4. november · 32 min møde</p>
    <ul className="mt-4 space-y-3">
      {[["Ny plukkerute fra 1. dec.", "Jonas"], ["To scannere bestilles", "Ida"], ["Næste møde 3. dec. kl. 9", "Alle"]].map(([t, w]) => (
        <li key={t} className="flex items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-[0.9375rem]" style={{ background: c.sand, color: c.ink }}>{t}<span className="rounded-full bg-white px-2.5 py-0.5 text-[0.75rem] font-semibold" style={{ color: c.muted }}>{w}</span></li>
      ))}
    </ul>
  </div>
);
const Formel = (
  <div className={card}>
    <p className="text-[0.8125rem]" style={{ color: c.muted }}>Ordrer.xlsx · kolonne D</p>
    <div className="mt-3 rounded-[12px] px-4 py-3 font-mono text-[0.9375rem]" style={{ background: c.sand, color: c.ink }}>=HVIS(C2=&quot;DK&quot;;B2*1,25;B2)</div>
    <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[12px] text-[0.8125rem] ring-1" style={{ ["--tw-ring-color" as string]: c.line }}>
      {[["Beløb", "Land", "Med moms"], ["1.200", "DK", "1.500"], ["800", "SE", "800"], ["2.400", "DK", "3.000"]].map((r, i) => r.map((v, k) => (
        <span key={`${i}-${k}`} className={`px-3 py-2 ${i === 0 ? "font-semibold" : ""} ${k === 2 && i > 0 ? "font-semibold" : ""}`} style={{ background: i === 0 ? c.sand : "white", color: k === 2 && i > 0 ? "#8a3420" : c.ink }}>{v}</span>
      )))}
    </div>
  </div>
);
const Data = (
  <div className={card}>
    <p className="text-[1.25rem] font-semibold" style={{ color: c.ink }}>Før du deler</p>
    <p className="mt-3 text-[0.9375rem] leading-[1.9]" style={{ color: c.ink }}>
      Kunde: <span className="rounded px-1.5 text-transparent" style={{ background: c.dark }}>Mette Holm</span><br />
      CPR: <span className="rounded px-1.5 text-transparent" style={{ background: c.dark }}>120389-1234</span><br />
      Adresse: <span className="rounded px-1.5 text-transparent" style={{ background: c.dark }}>Vestergade 12</span><br />
      Ordre: 4 stk. · leveret 6. nov.
    </p>
    <p className="mt-4 inline-flex rounded-[10px] px-3 py-1.5 text-[0.8125rem] font-semibold" style={{ background: c.coralSoft, color: "#8a3420" }}>3 felter fjernet · resten må deles</p>
  </div>
);
const Tjek = (
  <div className={card}>
    <p className="text-[1.25rem] font-semibold" style={{ color: c.ink }}>Faktatjek</p>
    <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: c.ink }}>Omsætningen steg med <span className="rounded px-1" style={{ background: c.coralSoft }}>18 %</span> i 2025.</p>
    <div className="mt-4 rounded-[12px] p-3.5 text-[0.875rem] leading-relaxed" style={{ background: c.sand, color: c.ink }}>
      <strong>Stemmer ikke med kilden.</strong> Årsrapporten siger 12 %. Spørg efter kilden, før du bruger svaret.
    </div>
  </div>
);
const Tone = (
  <div className={card}>
    <p className="text-[0.8125rem]" style={{ color: c.muted }}>LinkedIn-opslag · i jeres tone</p>
    <p className="mt-3 text-[1.0625rem] leading-relaxed" style={{ color: c.ink }}>Vi har lige flyttet lageret til Kolding. Det betyder hurtigere levering i hele Jylland fra 1. december.</p>
    <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem] font-semibold">
      {["Kort", "Uden fyldord", "Lyder som os"].map((t) => <span key={t} className="rounded-full px-2.5 py-1" style={{ background: c.sand, color: c.ink }}>✓ {t}</span>)}
    </div>
  </div>
);

const items = [
  { icon: EnvelopeSimple, t: "Mails på halvdelen af tiden", d: "Skriv svar til kunder og kolleger i jeres egen tone, og send dem på få minutter i stedet for et kvarter.", ui: Mail },
  { icon: NotePencil, t: "Referat på fem minutter", d: "Fra rodede noter til tre klare punkter med beslutninger først og en ansvarlig på hver opgave.", ui: Referat },
  { icon: Table, t: "Formler uden at kunne kode", d: "Beskriv, hvad regnearket skal gøre, og få formlen forklaret, så du kan rette den selv.", ui: Formel },
  { icon: ShieldCheck, t: "Del data uden at dele for meget", d: "Lær, hvad der aldrig må ind i en AI, og hvordan du fjerner navne, CPR-numre og adresser først.", ui: Data },
  { icon: MagnifyingGlass, t: "Tjek, om AI'en har ret", d: "Fang de svar, der lyder rigtige men ikke er det, og bed altid om kilden.", ui: Tjek },
  { icon: ChatText, t: "Tekster, der lyder som jer", d: "Opslag, tilbud og nyhedsbreve, der holder jeres tone og ikke lyder som en robot.", ui: Tone },
];

const tint = "linear-gradient(165deg, #fbe1d7 0%, #f6c9b6 35%, #ee9473 75%, #b4462d 115%)";

export function SkillsCalendly() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // The item in the middle of the viewport is the active one (scroll-driven, as on calendly.com).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ background: "#fbf9f6" }}>
      <div className="grid w-full gap-x-[6vw] px-5 py-16 sm:px-[3.5vw] lg:grid-cols-[1fr_1.1fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold" style={{ color: c.ink }}>
            <span className="grid size-6 place-items-center rounded-[7px]" style={{ background: c.coralSoft, color: "#8a3420" }}><GraduationCap size={15} weight="bold" /></span>
            Færdigheder
          </p>
          <h2 className="mt-4 max-w-[34rem] text-[clamp(2.5rem,1.6rem+2.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]" style={{ color: c.ink }}>
            Det kan hele holdet i morgen
          </h2>
          <ol className="mt-10 border-t" style={{ borderColor: c.line }}>
            {items.map((it, i) => {
              const on = active === i;
              const I = it.icon;
              return (
                <li key={it.t} data-i={i} ref={(el) => { refs.current[i] = el; }} className="border-b py-7 lg:py-8" style={{ borderColor: c.line }}>
                  <div className={`grid w-full grid-cols-[1fr_auto] items-center gap-6 transition-opacity duration-300 ${on ? "opacity-100" : "lg:opacity-35"}`}>
                    <button type="button" onClick={() => setActive(i)} className="text-left">
                      <span className="flex items-center gap-3 text-[1.125rem] font-semibold" style={{ color: c.ink }}><I size={20} weight="regular" />{it.t}</span>
                      <span className="mt-2.5 block max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</span>
                    </button>
                    <Link href="/kurser/ai-paa-arbejdet" aria-label={`Se lektionen: ${it.t}`} className="grid size-9 place-items-center rounded-[10px] transition-colors hover:bg-[#ebe3db]" style={{ background: c.sand, color: c.ink }}><ArrowUpRight size={15} /></Link>
                  </div>
                  {/* Phones: the visual sits under its own item */}
                  <div className="mt-6 flex min-h-[20rem] items-center justify-center rounded-[28px] p-6 lg:hidden" style={{ background: tint }}>{it.ui}</div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: one sticky visual that swaps with the active item */}
        <div className="hidden lg:block">
          <div className="sticky top-[12vh] aspect-square w-full overflow-hidden rounded-[40px]" style={{ background: tint }}>
            <div aria-hidden className="absolute inset-x-0 top-[38%] h-[16%] opacity-40" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0 18px, transparent 18px 34px)" }} />
            {items.map((it, i) => (
              <div key={it.t} className="absolute inset-0 flex items-center justify-center p-10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : `translateY(${i < active ? -20 : 20}px)` }} aria-hidden={active !== i}>
                {it.ui}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
