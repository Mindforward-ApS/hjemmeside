"use client";

import { useState } from "react";
import { ProductScreen } from "@/components/product/ProductScreen";
import { Icon } from "@/components/ui/Icon";

// Docebo-DNA collage: many real product views drifting past in two rows (opposite directions).
// Slow, pauses on hover, has a visible pause control (WCAG 2.2.2), stops under reduced motion.
type Item = { kind: "screen"; stage: 0 | 1 | 2 | 3; blue?: boolean } | { kind: "quote" | "sms" | "week" };
const rowA: Item[] = [{ kind: "screen", stage: 1 }, { kind: "quote" }, { kind: "screen", stage: 3, blue: true }, { kind: "sms" }, { kind: "screen", stage: 2 }];
const rowB: Item[] = [{ kind: "week" }, { kind: "screen", stage: 0 }, { kind: "sms" }, { kind: "screen", stage: 2, blue: true }, { kind: "quote" }];

const frame = "light-scope pointer-events-none h-[260px] w-[420px] shrink-0 overflow-hidden rounded-[16px]";

function Crop({ item }: { item: Item }) {
  if (item.kind === "screen") {
    return (
      <div className={`${frame} ${item.blue ? "field-blue p-4" : ""}`} aria-hidden>
        <div className={`origin-top-left ${item.blue ? "w-[600px] scale-[0.65]" : "w-[640px] scale-[0.66]"}`}>
          <ProductScreen stage={item.stage} />
        </div>
      </div>
    );
  }
  if (item.kind === "quote") {
    return (
      <div className={`${frame} border border-line bg-surface-raised p-5`} aria-hidden>
        <div className="flex items-center justify-between">
          <span className="font-display text-[1.125rem] font-extrabold tracking-[-0.02em] text-heading">Tilbud #1043</span>
          <span className="rounded-full bg-[oklch(0.94_0.04_155)] px-2.5 py-1 text-[0.6875rem] font-semibold text-[oklch(0.38_0.1_155)]">Godkendt</span>
        </div>
        <p className="mt-1 t-small text-muted">Bo Andersen · Badeværelse 6 m²</p>
        <table className="mt-4 w-full text-[0.75rem]">
          <tbody className="divide-y divide-line">
            {[["Nedrivning og bortskaffelse", "8.400"], ["Fliser og vådrumssikring", "21.600"], ["VVS og armaturer", "14.200"]].map(([l, v]) => (
              <tr key={l}><td className="py-2 text-text">{l}</td><td className="py-2 text-right font-semibold text-heading">{v}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 flex justify-between border-t border-line-strong pt-2 t-small font-semibold text-heading">I alt ekskl. moms <span>44.200 kr.</span></p>
      </div>
    );
  }
  if (item.kind === "sms") {
    return (
      <div className={`${frame} section-dark flex items-end justify-center gap-4 p-5`} aria-hidden>
        <div className="w-[230px] rounded-t-[28px] border-[5px] border-b-0 border-white/20 bg-[oklch(0.98_0.005_85)] p-3 pb-6">
          <p className="mb-2 text-center text-[0.6875rem] font-semibold text-[var(--ink-900)]">Lene Holm</p>
          <p className="ml-auto mb-2 w-[80%] rounded-[14px] rounded-br-sm bg-[var(--accent-500)] px-3 py-2 text-[0.6875rem] text-white">Montøren er hos dig kl. 14. Du får besked, når han kører.</p>
          <p className="w-[70%] rounded-[14px] rounded-bl-sm bg-[oklch(0.93_0.01_85)] px-3 py-2 text-[0.6875rem] text-[var(--ink-900)]">Perfekt, tusind tak!</p>
        </div>
        <div className="mb-6 max-w-[120px] t-small">
          <p className="font-semibold text-heading">Svar som sms</p>
          <p className="text-muted">Fra samme indbakke</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${frame} border border-line bg-surface-raised p-5`} aria-hidden>
      <p className="t-label">Mandag kl. 7.00</p>
      <p className="mt-2 font-display text-[1.125rem] font-extrabold tracking-[-0.02em] text-heading">Din uge i Fjord</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[["31", "besvaret"], ["4", "tilbud vundet"], ["0", "glemt"]].map(([n, l]) => (
          <div key={l} className="rounded-[12px] bg-surface-sunk p-3">
            <p className="tnum font-display text-[1.5rem] font-extrabold text-heading">{n}</p>
            <p className="text-[0.6875rem] text-muted">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.6875rem] text-muted">Eksempeldata</p>
    </div>
  );
}

export function ProductCollage() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="pad-standard overflow-hidden bg-surface-sunk" aria-labelledby="collage-title">
      <div className="container-wide flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="t-label mb-4">Din indbakke, din måde</p>
          <h2 id="collage-title" className="t-display max-w-2xl">Indbakke, tilbud og overblik. Samme sted.</h2>
        </div>
        <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="chip flex items-center gap-2 self-start md:self-auto">
          <Icon name={paused ? "play" : "pause"} size={14} /> {paused ? "Afspil" : "Pause"}
        </button>
      </div>
      <div className={`group mt-12 grid gap-4 ${paused ? "paused" : ""}`}>
        {[rowA, rowB].map((row, r) => (
          <div key={r} className="marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max gap-4" style={{ animationDuration: "70s", animationDirection: r ? "reverse" : "normal" }}>
              {[...row, ...row].map((item, i) => (
                <Crop key={i} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
