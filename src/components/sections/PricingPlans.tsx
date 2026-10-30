"use client";

import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import { appLinks } from "@/lib/app";
import Link from "next/link";
import { useState } from "react";
import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";

// Pricing, built after Marco's reference (2026-10-22, second pick): headline with two italic serif words,
// review badge, monthly/annual toggle, three plan cards (middle one tinted + badge), logo row, FAQ, contact line.
// Our copy, our prices, coral instead of lime. Review numbers and logos are placeholders until real (§7).

const planFeatures: Record<string, { lead: string; items: string[] }> = {
  start: { lead: "Alt du skal bruge for at komme i gang:", items: ["Op til 2 brugere", "1 indbakke", "Skabeloner til faste svar", "Formular til hjemmesiden"] },
  team: { lead: "Alt i Start, plus:", items: ["Ubegrænsede brugere og indbakker", "Tilbud med godkendelse", "Advarsel ved ventetid", "Telefon-support"] },
  pro: { lead: "Alt i Team, plus:", items: ["Integration til regnskab", "Roller og rettigheder", "Logning af adgang", "Fast kontaktperson"] },
};

const faq = [
  { q: "Kan jeg prøve Fjord gratis?", a: "Ja. Du får 14 dage gratis med alle funktioner, og du skal ikke bruge et kreditkort. Vil du have hjælp til at komme i gang, booker vi gerne 15 minutter med dig." },
  { q: "Kan jeg skifte plan senere?", a: "Ja, når som helst. Skifter du op, får du de nye funktioner med det samme. Skifter du ned, gælder det fra næste periode." },
  { q: "Hvordan opsiger jeg?", a: "Under Indstillinger med to klik. Der er ingen binding på månedsplanen. En årsplan kører perioden ud." },
  { q: "Kan vi betale med faktura?", a: "Ja, ved årlig betaling. Du får adgang med det samme og betaler inden for fristen på fakturaen. Vi kan sætte EAN-nummer og jeres reference på." },
  { q: "Hvordan foregår betalingen?", a: "Månedsplaner betales med kort. Årsplaner kan betales med kort eller faktura. Alle priser er ekskl. moms." },
  { q: "Hvor ligger mine data?", a: "På servere i Frankfurt i EU. Alt er krypteret, og vi har en databehandleraftale klar til dig." },
];

export function PricingPlans() {
  const [yearly, setYearly] = useState(false);
  const [open, setOpen] = useState(0);
  const tiers = copy.pricing.tiers;

  return (
    <>
      {/* Heading */}
      <section className="pb-12 pt-16 md:pt-24">
        <div className="container-content flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <h1 className="font-display font-normal leading-[1.05] tracking-[-0.035em] text-heading" style={{ fontSize: "clamp(2.5rem, 1rem + 4vw, 4.5rem)" }}>
            Vi har en <span className="font-serif-accent italic">plan</span>,
            <br />
            der passer til <span className="font-serif-accent italic">jer</span>
          </h1>
          {/* Review badge: placeholder until a real, verifiable rating exists */}
          <div className="ph flex items-center gap-3 md:mt-4">
            <div className="flex -space-x-2" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="size-9 rounded-full border-2 border-[var(--bg)] bg-[var(--tile-deep)]" />
              ))}
            </div>
            <div className="text-[0.875rem] leading-tight">
              <p className="flex items-center gap-1 font-semibold text-heading">
                {"★★★★★".split("").map((s, i) => <span key={i} aria-hidden>{s}</span>)} <span className="ml-1">[X,X]</span>
              </p>
              <p className="text-muted">fra [antal] anmeldelser</p>
            </div>
          </div>
        </div>

        <div className="container-content mt-10">
          <div role="radiogroup" aria-label="Betalingsperiode" className="inline-flex items-center gap-1 rounded-[0.75rem] border border-[var(--border)] bg-[var(--tile)] p-1">
            <button type="button" role="radio" aria-checked={!yearly} onClick={() => setYearly(false)} className={`rounded-[0.55rem] px-4 py-2 text-[0.9375rem] font-medium transition-colors ${!yearly ? "bg-surface-raised text-heading shadow-1" : "text-muted hover:text-heading"}`}>
              Månedlig
            </button>
            <button type="button" role="radio" aria-checked={yearly} onClick={() => setYearly(true)} className={`flex items-center gap-2 rounded-[0.55rem] px-4 py-2 text-[0.9375rem] font-medium transition-colors ${yearly ? "bg-surface-raised text-heading shadow-1" : "text-muted hover:text-heading"}`}>
              Årlig <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[0.75rem] font-semibold text-[var(--accent)]">Spar 2 måneder</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-16">
        <ul className="container-content grid gap-5 md:grid-cols-3">
          {tiers.map((t) => {
            const rec = "recommended" in t && t.recommended;
            const f = planFeatures[t.id];
            const price = yearly ? t.priceYearly : t.priceMonthly;
            return (
              <li key={t.id} className="overflow-hidden rounded-[1.25rem] border border-[var(--border-strong)] bg-surface-raised">
                <div className={`p-6 md:p-7 ${rec ? "bg-[var(--tile)]" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-heading">{t.name}</h2>
                    {rec && <span className="rounded-full border border-[var(--border)] bg-surface-raised px-3 py-1 text-[0.75rem] font-semibold text-heading">{copy.pricing.recommended}</span>}
                  </div>
                  <p className="mt-6 flex items-center gap-2">
                    <span className="tnum font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-heading">{price}</span>
                    <span className="text-[0.8125rem] leading-tight text-muted">kr. pr. bruger<br />pr. måned</span>
                  </p>
                  <p className="mt-6 min-h-[3em] text-[0.9375rem] text-muted">{t.for}</p>
                  <p className="mt-1 min-h-5 text-[0.8125rem] text-muted">{yearly ? "Faktureres årligt, ekskl. moms" : "Faktureres månedligt, ekskl. moms"}</p>
                  <Link href={appLinks.forPlan(t.id)} className="mt-6 flex min-h-11 w-full items-center justify-center rounded-[0.75rem] bg-[var(--heading)] text-[0.9375rem] font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)]">
                    Start gratis prøve
                  </Link>
                </div>
                <div className="border-t border-[var(--border)] p-6 md:p-7">
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-heading">Funktioner</p>
                  <p className="mt-1 text-[0.9375rem] text-muted">{f.lead}</p>
                  <ul className="mt-5 space-y-3.5">
                    {f.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[0.9375rem] text-text">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--coral)] text-white"><Icon name="check" size={12} /></span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Logo row (placeholders until real, permitted customer logos exist) */}
      {VIS_PLADSHOLDERE && <section aria-label="Kunder (pladsholdere)" className="pb-24">
        <ul className="container-content grid grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i} className="ph grid h-10 place-items-center font-display text-[1.125rem] font-bold tracking-[-0.03em] text-muted">[Logo {i + 1}]</li>
          ))}
        </ul>
      </section>}

      {/* FAQ */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[44rem] px-[var(--gutter)]">
          <h2 className="text-center font-display font-normal tracking-[-0.03em] text-heading" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>
            Spørgsmål <span className="font-serif-accent italic">og svar</span>
          </h2>
          <p className="mt-4 text-center text-[1.0625rem] text-muted">Alt, du skal vide om Fjord og betalingen.</p>
          <ul className="mt-12 divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {faq.map((it, i) => (
              <li key={it.q}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-heading">
                  {it.q}
                  <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--text-muted)] text-muted">
                    <Icon name={open === i ? "minus" : "plus"} size={14} />
                  </span>
                </button>
                {open === i && <p className="-mt-2 pb-6 pr-10 text-[0.9375rem] leading-relaxed text-muted">{it.a}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-[0.9375rem] text-muted">
            Har du brug for mere hjælp? Skriv til os på{" "}
            <a href="mailto:hej@example.dk" className="font-medium text-heading underline underline-offset-4 hover:text-[var(--accent)]">hej@example.dk</a>
          </p>
        </div>
      </section>
    </>
  );
}
