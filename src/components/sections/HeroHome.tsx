import { appLinks } from "@/lib/app";
import Link from "next/link";
import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";
import { SentenceLines } from "@/components/ui/SentenceLines";

// Section 1, built close to docebo.com's hero structure (measurements in design/DNA.md):
// left: eyebrow, 2-line H1, large lead, two pill buttons. Right: a media card with one chamfered corner
// and UI chips spilling over its edge. Our copy, our blue, our product. No photos, copy or code from Docebo.
// (The scroll-to-full-bleed expansion was removed: without real photography it read as an empty blue box.)
export function HeroHome() {
  const h = copy.home.hero;

  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        <div className="container-wide relative grid items-center gap-12 pb-16 pt-12 lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:py-12">
          {/* Copy */}
          <div className="hd-copy relative z-10">
            <p className="t-label mb-5">{h.label}</p>
            <h1 className="font-display font-extrabold leading-[1.02] tracking-[-0.045em]" style={{ fontSize: "clamp(2.5rem, 0.8rem + 3.6vw, 4.75rem)" }}>
              <SentenceLines text={h.title} />
            </h1>
            <p className="mt-7 max-w-[36rem] text-text" style={{ fontSize: "clamp(1.125rem, 0.9rem + 0.5vw, 1.5rem)", lineHeight: 1.5 }}>
              {h.sub}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={appLinks.signup} className="btn btn-primary">{h.primary}</Link>
              <Link href="#saadan-virker-det" className="btn btn-white">{h.secondary}</Link>
            </div>
          </div>

          {/* Media card (chamfered top-right corner) with chips spilling over the left edge */}
          <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0 lg:max-w-none">
            <div
              className="hd-card field-blue relative aspect-[5/5.2] overflow-hidden rounded-[1rem]"
              style={{ clipPath: "polygon(0 0, 76% 0, 100% 24%, 100% 100%, 0 100%)" }}
            >
              {/* A phone with the morning's requests: the product doing the job, filling the card */}
              <div className="light-scope absolute bottom-0 left-1/2 w-[68%] -translate-x-1/2 rounded-t-[2.25rem] border-[0.4rem] border-b-0 border-[var(--ink-950)] bg-surface-raised p-[1rem] pb-0 shadow-3" style={{ top: "20%" }}>
                <div className="mx-auto mb-[0.9rem] h-[0.3rem] w-[3rem] rounded-full bg-line-strong" />
                <p className="mb-[0.6rem] flex items-center justify-between text-[0.8125rem] font-semibold text-heading">
                  Indbakke <span className="text-[0.75rem] font-medium text-muted">4 nye</span>
                </p>
                {[
                  { n: "Lene Holm", t: "Haster", tc: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.17_25)]", s: "Vandskade i køkkenet – kan I komme i dag?", w: "2 t", cta: true },
                  { n: "Bo Andersen", t: "Tilbud", tc: "bg-surface-sunk text-heading", s: "Pris på nyt badeværelse, ca. 6 m²", w: "1 d" },
                  { n: "Ida Kjær", t: "Spørgsmål", tc: "bg-[oklch(0.94_0.04_155)] text-[oklch(0.42_0.11_155)]", s: "Hvor lang tid tager en udskiftning?", w: "2 d" },
                  { n: "Henrik Dahl", t: "Tilbud", tc: "bg-surface-sunk text-heading", s: "Tilbud på 3 vinduer + montering", w: "5 t" },
                ].map((r) => (
                  <div key={r.n} className="mb-[0.6rem] rounded-[1rem] border border-line p-[0.85rem]">
                    <p className="flex items-center justify-between gap-2 text-[0.875rem] font-semibold text-heading">
                      <span className="flex items-center gap-2">{r.n}<span className={`rounded-full px-2 py-0.5 text-[0.6875rem] ${r.tc}`}>{r.t}</span></span>
                      <span className="text-[0.75rem] font-medium text-muted">{r.w}</span>
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{r.s}</p>
                    {r.cta && <span className="mt-[0.7rem] block rounded-full bg-[var(--accent-500)] py-[0.55rem] text-center text-[0.8125rem] font-semibold text-white">Svar nu</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Chips + floating UI card that break the card edge */}
            <div className="hd-chips pointer-events-none absolute left-2 top-[18%] flex flex-col items-start gap-2 lg:-left-10" aria-hidden>
              <span className="flex items-center gap-2 rounded-full bg-white px-[1.1rem] py-[0.6rem] text-[1rem] font-semibold text-[var(--ink-900)] shadow-2">Tilbud <Icon name="close" size={16} /></span>
              <span className="ml-8 flex items-center gap-2 rounded-full bg-[var(--accent-500)] px-[1.1rem] py-[0.6rem] text-[1rem] font-semibold text-white shadow-2">Haster <Icon name="close" size={16} /></span>
            </div>
            <div className="hd-chips light-scope pointer-events-none absolute -bottom-6 left-2 w-[16rem] lg:-left-14 rounded-[1rem] border border-line bg-surface-raised p-[1.1rem] shadow-3" aria-hidden>
              <p className="flex items-center gap-2 text-[0.875rem] font-semibold text-heading">
                <span className="grid size-5 place-items-center rounded-full bg-success text-white"><Icon name="check" size={12} /></span>
                Tilbud #1043 godkendt
              </p>
              <p className="mt-1 text-[0.8125rem] text-muted">Bo Andersen · for 2 min. siden</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
