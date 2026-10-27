import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";

// Bento: each tile runs a tiny live demo of one thing (not icon + two lines).
export function BentoLive() {
  const b = copy.home.bento;
  const t = b.tiles;
  return (
    <section className="pad-standard bg-surface-sunk" aria-labelledby="bento-title">
      <div className="container-wide">
        <div className="reveal max-w-2xl">
          <p className="t-label mb-4">{b.label}</p>
          <h2 id="bento-title" className="t-display">{b.title}</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
          {/* Setup: progress that fills */}
          <article className="field-blue flex flex-col justify-between gap-8 rounded-[28px] p-6 md:col-span-4 md:p-8">
            <div className="max-w-sm">
              <h3 className="t-h4">{t.setup.title}</h3>
              <p className="mt-2 t-small text-muted">{t.setup.body}</p>
            </div>
            <ol className="grid gap-2 sm:grid-cols-3">
              {["Forbind mail", "Vælg skabeloner", "Første svar sendt"].map((s, i) => (
                <li key={s} className="rounded-[16px] bg-white/10 p-4">
                  <span className="flex items-center justify-between t-small font-semibold text-heading">
                    {s}
                    <span className={`grid size-5 place-items-center rounded-full ${i < 2 ? "bg-success text-white" : "border border-line-strong text-transparent"}`}>
                      <Icon name="check" size={12} />
                    </span>
                  </span>
                  <span className="mt-3 block h-1 overflow-hidden rounded-full bg-white/15">
                    <span
                      className="block h-full origin-left rounded-full bg-white"
                      style={{ width: i < 2 ? "100%" : "35%", animation: `bar-grow 900ms var(--ease-enter) ${200 + i * 150}ms both` }}
                    />
                  </span>
                  <span className="tnum mt-2 block text-[0.75rem] text-muted">{["2 min", "5 min", "3 min"][i]}</span>
                </li>
              ))}
            </ol>
          </article>

          {/* Mobile */}
          <article className="card flex flex-col gap-6 overflow-hidden p-6 md:col-span-2 md:row-span-2 md:p-8">
            <div>
              <h3 className="t-h4">{t.mobile.title}</h3>
              <p className="mt-2 t-small text-muted">{t.mobile.body}</p>
            </div>
            <div className="mx-auto mt-auto w-full max-w-[220px] translate-y-10 rounded-t-[28px] border-[6px] border-b-0 border-heading bg-surface-raised p-3 pb-14 shadow-3" aria-hidden>
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line-strong" />
              {["Lene Holm", "Bo Andersen", "Ida Kjær"].map((n, i) => (
                <div key={n} className="mb-2 rounded-[var(--r-sm)] border border-line p-2.5">
                  <p className="text-[0.6875rem] font-semibold text-heading">{n}</p>
                  <p className="truncate text-[0.625rem] text-muted">{["Vandskade i køkkenet", "Nyt badeværelse", "Hvor lang tid tager…"][i]}</p>
                  {i === 0 && <span className="mt-2 block rounded-full bg-accent py-1 text-center text-[0.625rem] font-semibold text-on-accent">Ring tilbage</span>}
                </div>
              ))}
            </div>
          </article>

          {/* Templates: typing */}
          <article className="card p-6 md:col-span-2 md:p-8">
            <h3 className="t-h4">{t.templates.title}</h3>
            <p className="mt-2 t-small text-muted">{t.templates.body}</p>
            <div className="mt-6 rounded-[var(--r-md)] border border-line bg-surface-raised p-3 text-[0.75rem] leading-relaxed text-text" aria-hidden>
              <span className="font-semibold text-accent">/tilbud</span> Hej {"{navn}"}, tak for din henvendelse. Du får et tilbud senest
              <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-heading" style={{ animation: "type-caret 1s steps(1) 5" }} />
            </div>
          </article>

          {/* Alerts: pulsing */}
          <article className="card p-6 md:col-span-1 md:p-6">
            <span className="relative grid size-10 place-items-center rounded-full bg-[oklch(0.94_0.05_25)] text-danger" aria-hidden>
              <Icon name="bell" size={18} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" style={{ animation: "pulse-dot 1.6s ease-in-out 3" }} />
            </span>
            <h3 className="mt-5 t-h4">{t.alerts.title}</h3>
            <p className="mt-2 t-small text-muted">{t.alerts.body}</p>
          </article>

          {/* EU */}
          <article className="card section-dark p-6 md:col-span-1 md:p-6">
            <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent" aria-hidden>
              <Icon name="shield" size={18} />
            </span>
            <h3 className="mt-5 t-h4">{t.eu.title}</h3>
            <p className="mt-2 t-small text-muted">{t.eu.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
