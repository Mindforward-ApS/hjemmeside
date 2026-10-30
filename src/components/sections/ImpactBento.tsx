import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

// Docebo-DNA "results on the record": giant numbers in colour fields + one quote with mini stats.
// Every figure is a marked placeholder until the customer's own data exists (§7). Never invent numbers.
export function ImpactBento() {
  if (!VIS_PLADSHOLDERE) return null;
  return (
    <section className="pad-standard" aria-labelledby="impact-title">
      <div className="container-wide">
        <p className="t-label mb-4">Resultater</p>
        <h2 id="impact-title" className="t-display max-w-3xl">Det, kunderne har målt</h2>

        <div className="tile-gap mt-12 grid lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* Big field tile */}
          <Link href="/kunder/kunde-1" className="tile field-blue ph group flex min-h-[440px] flex-col justify-between lg:col-span-4 lg:row-span-2">
            <span className="self-start rounded-full bg-white/15 px-3 py-1 t-small font-semibold text-heading">Håndværk</span>
            <div>
              <p className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-heading" style={{ fontSize: "clamp(5rem, 3rem + 6vw, 8rem)" }}>[TAL]</p>
              <p className="mt-4 max-w-xs t-body">[CASE NEEDED: hvad tallet måler, hos hvem, over hvor lang tid]</p>
              <span className="link-arrow mt-6 text-heading">Læs historien <Icon name="arrowRight" size={16} /></span>
            </div>
          </Link>

          {/* Quote with mini stats */}
          <figure className="tile card ph flex flex-col gap-6 lg:col-span-5">
            <blockquote className="t-h3 font-semibold">“[TESTIMONIAL NEEDED: én sætning om, hvad der ændrede sig]”</blockquote>
            <div className="grid grid-cols-2 gap-3">
              {["[Tal]", "[Tal]"].map((n, i) => (
                <div key={i} className="tile-inner bg-surface-sunk p-4 text-center">
                  <p className="font-display text-[1.75rem] font-extrabold tracking-[-0.03em] text-heading">{n}</p>
                  <p className="t-small text-muted">[hvad det måler]</p>
                </div>
              ))}
            </div>
            <figcaption className="flex items-center gap-3 t-small text-muted">
              <span className="grid size-10 place-items-center rounded-full bg-surface-sunk text-[0.6875rem] font-semibold">foto</span>
              <span><span className="block font-semibold text-heading">[Navn]</span>[Rolle], [firma]</span>
            </figcaption>
          </figure>

          {/* Stat tile */}
          <div className="tile card ph flex flex-col justify-center lg:col-span-3">
            <p className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.04em] text-accent">[Tal]</p>
            <p className="mt-3 t-body text-muted">[PROOF NEEDED: fx tid sparet pr. uge hos en navngiven kunde]</p>
          </div>

          {/* Wide field tile */}
          <div className="tile field-blue ph flex flex-col justify-between gap-6 lg:col-span-5" style={{ background: "linear-gradient(135deg, var(--field-c), var(--field-b))" }}>
            <p className="font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-heading">[Tal]</p>
            <p className="max-w-md t-body">[PROOF NEEDED: antal virksomheder, der bruger Fjord – kun med rigtig opgørelse]</p>
          </div>

          {/* Small tile */}
          <div className="tile section-dark ph flex flex-col justify-between gap-6 lg:col-span-3">
            <p className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.04em] text-heading">[Tal]</p>
            <Link href="/kunder" className="link-arrow t-small">Alle kundehistorier <Icon name="arrowRight" size={14} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
