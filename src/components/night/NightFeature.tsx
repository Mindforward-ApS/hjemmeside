"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

// Split section: claim + expandable points left, the inbox on a glowing glass panel right.
const points: { icon: IconName; title: string; body: string }[] = [
  { icon: "mail", title: "Én indbakke til alt", body: "Mail, kontaktformular og telefonnoter lander samme sted. Du ser med det samme, hvad der er nyt, og hvad der haster." },
  { icon: "clock", title: "Advarsel før nogen venter for længe", body: "Ligger en henvendelse over 24 timer uden svar, får den ansvarlige besked. Ingen kunde falder mellem to stole." },
  { icon: "sparkle", title: "Forslag til svar, du selv godkender", body: "Fjord skriver et udkast ud fra henvendelsen. Du retter og sender fra din egen adresse. Forslaget er altid tydeligt markeret." },
];

export function NightFeature() {
  const [open, setOpen] = useState(0);
  return (
    <section id="saadan" className="relative py-24 md:py-32">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">Indbakken</span>
          <h2 className="n-display mt-6" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>Ét sted til alle henvendelser, fra første mail til sendt tilbud</h2>
          <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted">Bygget til virksomheder, hvor telefonen ringer, og hvor et glemt svar er en tabt opgave.</p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {points.map((p, i) => (
              <li key={p.title}>
                <button type="button" onClick={() => setOpen(i)} aria-expanded={open === i} className="flex w-full items-center gap-3 py-5 text-left">
                  <Icon name={p.icon} size={18} className={open === i ? "text-[var(--coral)]" : "text-muted"} />
                  <span className={`flex-1 text-[1rem] ${open === i ? "font-medium text-heading" : "text-text"}`}>{p.title}</span>
                  <Icon name="chevronDown" size={18} className={`text-muted transition-transform duration-[260ms] ${open === i ? "rotate-180" : ""}`} />
                </button>
                <div className="grid transition-[grid-template-rows] duration-[260ms] ease-[var(--ease-enter)]" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
                  <p className="overflow-hidden pb-0 pl-8 text-[0.9375rem] leading-relaxed text-muted [&:not(:empty)]:pb-5">{open === i ? p.body : ""}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden className="n-glow -top-10 left-[10%] h-72 w-[80%]" />
          <div className="n-glass relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
            <div className="rounded-2xl border border-[var(--tile-border)] bg-[var(--tile-deep)] p-5">
              <p className="text-[0.8125rem] text-muted">Åbne henvendelser</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="n-display text-[3rem] leading-none">7</p>
                <span className="rounded-full bg-[var(--tile)] px-3 py-1.5 text-[0.8125rem] text-heading">Hastende først <Icon name="chevronDown" size={14} className="inline" /></span>
              </div>
              <p className="mt-2 text-[0.8125rem] text-muted">2 over 24 timer · Eksempeldata</p>
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                { n: "Tilbud · Badeværelse", s: "Bo Andersen · 44.200 kr.", c: "oklch(0.72 0.12 70)", i: "doc" as const },
                { n: "Haster · Vandskade", s: "Lene Holm · ring tilbage", c: "oklch(0.7 0.16 28)", i: "phone" as const },
                { n: "Booking · Torsdag", s: "Café Nordlys · flyttet", c: "oklch(0.7 0.1 160)", i: "clock" as const },
              ].map((r) => (
                <div key={r.n} className="flex items-center gap-3 rounded-2xl border border-[var(--tile-border)] bg-[var(--tile)] p-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(160deg, ${r.c}, oklch(0.32 0.04 30))` }}><Icon name={r.i} size={17} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] font-medium text-heading">{r.n}</span>
                    <span className="block truncate text-[0.8125rem] text-muted">{r.s}</span>
                  </span>
                  <Icon name="arrowRight" size={16} className="text-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
