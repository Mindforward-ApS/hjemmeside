"use client";

import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import { useState } from "react";
import { copy } from "@/content/copy.da";
import { testimonials } from "@/content/data";

// Proof filtered by segment (§4.2). Every card is a marked placeholder until real, consented quotes exist.
export function Testimonials({ limit, showFilter = true }: { limit?: number; showFilter?: boolean }) {
  if (!VIS_PLADSHOLDERE) return null;
  const t = copy.home.testimonials;
  const [filter, setFilter] = useState<string>("Alle");
  const list = testimonials.filter((x) => filter === "Alle" || x.segment === filter).slice(0, limit);

  return (
    <section className="pad-standard" aria-labelledby="testimonials-title">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="reveal max-w-2xl">
            <p className="t-label mb-4">{t.label}</p>
            <h2 id="testimonials-title" className="t-display">{t.title}</h2>
          </div>
          {showFilter && (
            <div role="group" aria-label="Filtrér efter rolle" className="flex flex-wrap gap-2">
              {t.filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className="chip"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {list.map((q, i) => (
            <li key={q.id} className={`card ph flex flex-col p-6 md:p-8 ${i === 0 && !limit && list.length > 2 ? "md:justify-between md:[grid-row:var(--span)]" : ""}`}
              style={i === 0 && !limit && list.length > 2 ? ({ "--span": `span ${list.length - 1}` } as React.CSSProperties) : undefined}>
              <blockquote className={`font-display tracking-[-0.015em] text-heading ${i === 0 && !limit ? "text-[1.5rem] leading-snug md:text-[1.875rem]" : "text-[1.125rem] leading-snug"}`}>
                “{q.quote}”
              </blockquote>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-surface-sunk t-small font-semibold text-muted" aria-hidden>
                    foto
                  </span>
                  <div>
                    <p className="t-small font-semibold text-heading">{q.name}</p>
                    <p className="text-[0.8125rem] text-muted">{q.role}, {q.company}</p>
                  </div>
                </div>
                <p className="text-right t-small font-semibold text-accent">{q.result}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
