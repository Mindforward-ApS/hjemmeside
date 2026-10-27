"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { copy } from "@/content/copy.da";
import { ProductScreen } from "@/components/product/ProductScreen";
import { Icon } from "@/components/ui/Icon";

// Docebo-DNA "pillar" panel in our blue: folder tabs on top of one saturated field,
// statement left in white, the real product on the right.
const stageFor = { saml: 0, svar: 2, tilbud: 2, overblik: 3 } as const;
const tabShade = [0, 1, 2, 3].map((i) => `color-mix(in oklch, var(--field-b), var(--grad-to) ${i * 25}%)`);

export function Explorer({ id = "platform" }: { id?: string }) {
  const e = copy.home.explorer;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = e.tabs[active];

  const onKey = (ev: KeyboardEvent) => {
    const n = e.tabs.length;
    const map: Record<string, number> = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 };
    if (ev.key in map) {
      ev.preventDefault();
      setActive(map[ev.key]);
      tabsRef.current[map[ev.key]]?.focus();
    }
  };

  return (
    <section id={id} className="pad-standard" aria-labelledby={`${id}-title`}>
      <div className="container-wide">
        <p className="t-lead mx-auto max-w-3xl text-center text-heading" style={{ fontSize: "clamp(1.25rem, 1rem + 0.8vw, 1.625rem)" }}>
          {e.label}: én skærm fra første mail til sendt tilbud.
        </p>

        <div className="mt-12">
          <div role="tablist" aria-label={e.label} onKeyDown={onKey} className="no-scrollbar grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-1 overflow-x-auto">
            {e.tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex min-h-14 items-center justify-center gap-2.5 rounded-t-[16px] px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white transition-[opacity,transform] duration-[260ms] ${
                  i === active ? "translate-y-0" : "translate-y-1 opacity-75 hover:translate-y-0 hover:opacity-100"
                }`}
                style={{ background: i === active ? "var(--field-a)" : tabShade[i] }}
              >
                <span className="tnum opacity-70">0{i + 1}</span> {t.tab}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="field-blue overflow-hidden rounded-b-[16px] p-6 md:p-12 lg:p-16"
          >
            <div key={tab.id} className="panel-in grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
              <div>
                <h2 id={`${id}-title`} className="t-display" data-no-split>{tab.title}</h2>
                <p className="mt-5 max-w-md t-lead">{tab.body}</p>
                <ul className="mt-8 space-y-3">
                  {tab.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 t-body text-heading">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/15"><Icon name="check" size={14} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="light-scope">
                <ProductScreen stage={stageFor[tab.id as keyof typeof stageFor]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
