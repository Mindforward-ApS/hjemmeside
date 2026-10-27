import { appLinks } from "@/lib/app";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

// Hero (night): thin gradient headline left, the product on the right with floating glass cards.
// No photo: a glowing phone with the inbox is our visual.
export function NightHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="n-glow right-[2%] top-[8%] h-[38rem] w-[38rem]" />
      <div aria-hidden className="n-glow right-[30%] top-[40%] h-[20rem] w-[24rem] opacity-60" />
      <div className="container-wide relative grid items-center gap-14 pb-20 pt-16 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <div>
          <h1 className="n-display" style={{ fontSize: "clamp(2.75rem, 1rem + 4.6vw, 5.5rem)" }}>
            Svar hver kunde.
            <br />
            Også når
            <br />
            telefonen ringer.
          </h1>
          <p className="mt-7 max-w-[34rem] text-[clamp(1.0625rem,0.95rem+0.35vw,1.3125rem)] leading-relaxed text-muted">
            Fjord samler mail, formularer og opkald i én indbakke. Du svarer på minutter, og ingen bliver glemt.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={appLinks.signup} className="n-btn n-btn-primary"><Icon name="arrowRight" size={18} /> Prøv gratis i 14 dage</Link>
            <Link href="#saadan" className="n-btn n-btn-dark"><Icon name="play" size={16} /> Se en demo</Link>
          </div>
        </div>

        {/* Visual: phone with the inbox + floating glass cards */}
        <div className="relative mx-auto h-[34rem] w-full max-w-[36rem] lg:h-[38rem]">
          <div className="night-dark absolute left-1/2 top-0 h-full w-[17rem] -translate-x-1/2 rounded-[2.75rem] border border-white/10 bg-[oklch(0.15_0.008_30)] p-3 shadow-[0_40px_120px_-30px_oklch(0.65_0.17_28/0.5)] sm:w-[19rem]">
            <div className="flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-[oklch(0.18_0.008_30)] p-4">
              <div className="mx-auto mb-5 h-6 w-24 rounded-full bg-black/60" />
              <p className="text-[0.75rem] text-muted">God morgen, Mads</p>
              <p className="n-display mt-1 text-[1.75rem]">4 venter på svar</p>
              <div className="mt-5 space-y-2.5">
                {[
                  { n: "Lene Holm", s: "Vandskade i køkkenet", i: "phone" as const, c: "oklch(0.7 0.16 28)" },
                  { n: "Bo Andersen", s: "Pris på badeværelse", i: "form" as const, c: "oklch(0.72 0.12 70)" },
                  { n: "Ida Kjær", s: "Hvor lang tid tager det?", i: "mail" as const, c: "oklch(0.7 0.1 160)" },
                  { n: "Café Nordlys", s: "Flyt aftalen til torsdag", i: "mail" as const, c: "oklch(0.7 0.08 250)" },
                ].map((r) => (
                  <div key={r.n} className="flex items-center gap-3 rounded-2xl border border-[var(--tile-border)] bg-[var(--tile)] p-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(160deg, ${r.c}, oklch(0.35 0.05 30))` }}>
                      <Icon name={r.i} size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.875rem] font-medium text-heading">{r.n}</span>
                      <span className="block truncate text-[0.75rem] text-muted">{r.s}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating: response time */}
          <div className="n-glass absolute right-0 top-[12%] w-[11rem] rounded-2xl p-4 sm:right-[2%]">
            <p className="flex items-center gap-2 text-[0.8125rem] text-muted"><span className="size-2 rounded-full bg-[var(--coral)]" /> Svartid i dag</p>
            <p className="n-display mt-2 text-[1.875rem]">12 min</p>
            <p className="mt-1 text-[0.75rem] text-muted">Eksempeldata</p>
          </div>

          {/* Floating: status steps */}
          <div className="n-glass absolute bottom-[14%] left-0 w-[14rem] rounded-2xl p-4 sm:left-[2%]">
            {[
              { t: "Modtaget", d: "08.14", on: true },
              { t: "Svar foreslået", d: "08.15", on: true },
              { t: "Tilbud sendt", d: "~2 min", on: false },
            ].map((s, i) => (
              <div key={s.t} className="relative flex items-center gap-3 py-2">
                {i < 2 && <span aria-hidden className={`absolute left-[9px] top-7 h-6 w-px ${s.on ? "bg-[var(--coral)]" : "bg-[var(--tile-deep)]"}`} />}
                <span className={`grid size-[1.2rem] shrink-0 place-items-center rounded-full ${s.on ? "bg-[var(--coral)] text-white" : "border border-[var(--border-strong)]"}`}>
                  {s.on && <Icon name="check" size={11} />}
                </span>
                <span className={`flex-1 text-[0.875rem] ${s.on ? "text-heading" : "text-muted"}`}>{s.t}</span>
                <span className="text-[0.75rem] text-muted">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
