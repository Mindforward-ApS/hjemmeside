"use client";

// 10 · Pricing (Marco 2026-10-22: R2 "Alt på scenen"). It is a dark stage section with glass cards; the recommended plan
// gets a coral ring and glow. Used on the home page and /priser (heading={false} there).
import { appLinks } from "@/lib/app";
import Link from "next/link";
import { useState } from "react";
import { plans } from "@/content/academy";
import { Icon } from "@/components/ui/Icon";

const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";
const coral = "oklch(0.66 0.19 33)";
type Plan = (typeof plans)[number];
const isRec = (p: Plan) => "recommended" in p && !!p.recommended;

function Toggle({ yearly, setYearly, dark = false }: { yearly: boolean; setYearly: (v: boolean) => void; dark?: boolean }) {
  return (
    <div role="radiogroup" aria-label="Betalingsperiode" className={`inline-flex items-center gap-1 rounded-full p-1 ${dark ? "border border-white/10 bg-white/[0.06]" : "bg-[var(--surface)] shadow-[0_0_0_1px_var(--border)]"}`}>
      {[{ v: false, l: "Månedlig" }, { v: true, l: "Årlig" }].map((o) => {
        const on = yearly === o.v;
        return (
          <button key={o.l} type="button" role="radio" aria-checked={on} onClick={() => setYearly(o.v)} className={`flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.9375rem] transition-colors ${on ? (dark ? "bg-[oklch(0.93_0.03_50)] font-medium text-[oklch(0.2_0.02_30)]" : "bg-[var(--heading)] text-[var(--bg)]") : dark ? "text-white/80 hover:bg-white/10" : "text-heading hover:bg-[var(--hover-fill)]"}`}>
            {o.l}
            {o.v && <span className="rounded-full px-2 py-0.5 text-[0.75rem] font-medium" style={{ background: "oklch(0.7 0.15 28 / 0.18)", color: on ? "oklch(0.55 0.17 30)" : "oklch(0.8 0.12 40)" }}>2 måneder gratis</span>}
          </button>
        );
      })}
    </div>
  );
}

function Price({ p, yearly, dark = false, big = false }: { p: Plan; yearly: boolean; dark?: boolean; big?: boolean }) {
  return (
    <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
      <span className={`whitespace-nowrap font-display font-light leading-[0.85] tracking-[-0.05em] ${dark ? "text-white" : "text-heading"}`} style={{ fontSize: big ? "clamp(4.5rem, 2rem + 5vw, 7rem)" : "3.75rem" }}>{yearly ? (p.priceYearly ?? "Pris følger") : p.priceMonthly}</span>
      {yearly && p.priceYearly && p.priceYearly !== p.priceMonthly && <span className={`mb-1 text-[1rem] line-through ${dark ? "text-white/40" : "text-muted"}`}>828 kr</span>}
      {(yearly ? p.unitYearly : p.unit) && <span className={`mb-1 max-w-[8rem] text-[0.8125rem] leading-tight ${dark ? "text-white/60" : "text-muted"}`}>{yearly ? p.unitYearly : p.unit}</span>}
    </p>
  );
}

function Items({ p, dark = false }: { p: Plan; dark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {p.items.map((it) => (
        <li key={it} className={`flex items-start gap-3 text-[0.9375rem] ${dark ? "text-white/80" : "text-text"}`}>
          <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[oklch(0.66_0.19_33)]" /> {it}
        </li>
      ))}
    </ul>
  );
}

function Heading({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <span className={`inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] ${dark ? "border border-white/15 bg-white/[0.06] text-white" : "bg-[var(--surface)] text-heading shadow-[0_0_0_1px_var(--border)]"}`}>Priser</span>
      <h2 className={`mt-6 font-display font-normal leading-[1.02] tracking-[-0.04em] ${dark ? "text-white" : "text-heading"}`} style={{ fontSize: "clamp(2.25rem, 1rem + 2.8vw, 3.75rem)" }}>
        Vælg den måde,
        <br />
        {dark ? (
          <span className="text-white">du vil lære på</span>
        ) : (
          <>du vil <span className="font-serif-accent italic" style={{ color: coral }}>lære på</span></>
        )}
      </h2>
    </div>
  );
}

export function Plans({ heading = true }: { heading?: boolean } = {}) {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="priser" className="relative overflow-hidden py-24 text-white md:py-32" style={{ background: stage }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_50%_0%,oklch(0.66_0.17_38/0.25),transparent_70%)]" />
      <div className="relative px-6 md:px-[3.5vw]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {heading ? <Heading dark /> : <span />}
          <Toggle yearly={yearly} setYearly={setYearly} dark />
        </div>
        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const rec = isRec(p);
            return (
              <li key={p.id} className="relative flex flex-col rounded-[2rem] border bg-white/[0.05] p-8 backdrop-blur-md" style={{ borderColor: rec ? "oklch(0.66 0.19 33 / 0.7)" : "rgba(255,255,255,0.1)", boxShadow: rec ? "0 0 60px -10px oklch(0.66 0.19 33 / 0.45)" : undefined }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[1.375rem] tracking-[-0.02em] text-white">{p.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-[0.75rem] font-medium ${rec ? "text-white" : "bg-white/10 text-white/75"}`} style={rec ? { background: coral } : undefined}>{p.tag}</span>
                </div>
                <div className="mt-8"><Price p={p} yearly={yearly} dark /></div>
                <Link href={p.id === "tilpasset" ? "/kontakt" : appLinks.forPlan(p.id, yearly)} className={`n-btn mt-8 w-full ${rec ? "n-btn-white" : "n-btn-glass"}`}><Icon name="arrowRight" size={18} className={rec ? "text-[oklch(0.62_0.18_33)]" : ""} /> {p.cta}</Link>
                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="mb-4 text-[0.875rem] text-white/50">{p.for}</p>
                  <Items p={p} dark />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-12 text-center text-[0.9375rem] text-white/50">Ingen skjulte gebyrer og ingen binding.</p>
      </div>
    </section>
  );
}
