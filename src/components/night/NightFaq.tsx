"use client";

import Link from "next/link";
import { useState } from "react";
import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";

// Narrow, centred FAQ + a direct line to a human.
export function NightFaq() {
  const items = copy.faq.items.slice(0, 4);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[46rem] px-[var(--gutter)]">
        <h2 className="n-display text-center" style={{ fontSize: "clamp(2rem, 1rem + 2vw, 3rem)" }}>Spørgsmål, vi ofte får</h2>
        <ul className="n-glass mt-12 divide-y divide-line overflow-hidden rounded-[1.5rem]">
          {items.map((it, i) => (
            <li key={it.q}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1rem] text-heading transition-colors hover:bg-[var(--hover-fill)]">
                {it.q}
                <Icon name="chevronDown" size={18} className={`shrink-0 text-muted transition-transform duration-[260ms] ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-muted">{it.a}</p>}
            </li>
          ))}
        </ul>
        <div className="n-glass mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[1rem] font-medium text-heading">Har du et andet spørgsmål?</p>
            <p className="mt-1 text-[0.9375rem] text-muted">Du får svar fra et menneske inden for 1 hverdag.</p>
          </div>
          <Link href="/kontakt" className="n-btn n-btn-primary !min-h-11 !px-5 !text-[0.9375rem]">Skriv til os</Link>
        </div>
      </div>
    </section>
  );
}
