"use client";

// 11 · FAQ (Marco 2026-10-22: M1, a blend of F1 and F3). The big question list sits on the left; a sticky chat window on the
// right answers the picked question, and its bottom bar is the contact link.
import { useState } from "react";
import { faq } from "@/content/academy";
import { Icon } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

const coral = "oklch(0.66 0.19 33)";
const coralFill = "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))";
const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

function Title() {
  return (
    <h2 className="font-display font-normal leading-[1.02] tracking-[-0.04em] text-heading" style={{ fontSize: "clamp(2.25rem, 1rem + 2.8vw, 3.75rem)" }}>
      Spørgsmål <span className="font-serif-accent italic" style={{ color: coral }}>og svar</span>
    </h2>
  );
}

export function AcademyFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="inline-flex rounded-full bg-[var(--surface)] px-4 py-1.5 text-[0.8125rem] text-heading shadow-[0_0_0_1px_var(--border)]">FAQ</span>
          <div className="mt-6"><Title /></div>
          <ul className="mt-10 border-t border-[var(--border-strong)]" role="tablist" aria-label="Spørgsmål">
            {faq.map((it, i) => {
              const on = open === i;
              return (
                <li key={it.q} className="border-b border-[var(--border-strong)]">
                  <button type="button" role="tab" aria-selected={on} onClick={() => setOpen(i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className={`font-display text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] tracking-[-0.025em] transition-colors ${on ? "text-heading" : "text-[oklch(0.2_0.01_30/0.6)] hover:text-heading"}`}>{it.q}</span>
                    <span aria-hidden className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${on ? "text-white" : "text-heading ring-1 ring-[var(--border-strong)]"}`} style={on ? { background: coral } : undefined}>
                      <Icon name="arrowRight" size={15} />
                    </span>
                  </button>
                  {/* Mobile: the answer opens under its question */}
                  {on && <p className="pb-5 pr-12 text-[1rem] leading-relaxed text-muted lg:hidden">{it.a}</p>}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28 flex min-h-[32rem] flex-col overflow-hidden rounded-[2rem] p-8" style={{ background: stage }}>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,oklch(0.66_0.17_38/0.28),transparent_72%)]" />
            <div className="relative flex items-center gap-3 border-b border-white/10 pb-4">
              <MindforwardLogo size={28} />
              <span className="ml-auto flex items-center gap-1.5 text-[0.8125rem] text-white/55"><span className="size-1.5 rounded-full bg-[oklch(0.75_0.15_150)]" /> Svarer inden for én arbejdsdag</span>
            </div>
            <div key={open} className="relative mt-8 grid animate-[labIn_420ms_cubic-bezier(0.16,1,0.3,1)] gap-3">
              <p className="max-w-[85%] justify-self-end rounded-[1.25rem] rounded-br-md px-4 py-3 text-[1rem] text-white" style={{ background: coralFill }}>{faq[open].q}</p>
              <p className="max-w-[85%] rounded-[1.25rem] rounded-bl-md bg-white px-5 py-4 text-[1rem] leading-relaxed text-[oklch(0.24_0.02_30)]">{faq[open].a}</p>
            </div>
            <a href="mailto:hej@example.dk" className="relative mt-auto flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-5 pr-2 text-[0.9375rem] text-white/60 transition-colors hover:bg-white/10">
              Har du et andet spørgsmål? Skriv til os …
              <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: coralFill }}><Icon name="arrowRight" size={16} className="-rotate-45" /></span>
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes labIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){[class*="labIn"]{animation:none!important}}`}</style>
    </section>
  );
}
