import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { FooterCta } from "@/components/sections/FooterCta";

export const metadata: Metadata = { title: "Om os", description: "Hvem står bag Fjord, og hvorfor vi bygger det.", alternates: { canonical: "/om-os" } };

// Founder-led trust (§4.12): show the person, the why, and a direct line.
export default function AboutPage() {
  const f = site.founder;
  return (
    <>
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="ph aspect-[4/5] max-w-md rounded-[var(--r-2xl)] bg-surface-sunk" role="img" aria-label="[FOTO NEEDED: rigtigt foto af stifteren, ikke AI-genereret]" />
          <div>
            <p className="t-label mb-5">Om os</p>
            <h1 className="t-hero">Vi bygger det, vi selv manglede</h1>
            <div className="ph mt-8 max-w-[60ch] space-y-5 t-lead">
              <p>[HVORFOR NEEDED: 2–3 korte afsnit i stifterens egen stemme. Hvad var problemet, hvorfor løse det, for hvem.]</p>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="t-small text-muted">Skriv direkte til {f.name}</dt>
                <dd className="mt-1 t-h4"><a href={`mailto:${f.email}`} className="hover:text-accent">{f.email}</a></dd>
              </div>
              <div>
                <dt className="t-small text-muted">Ring</dt>
                <dd className="mt-1 t-h4"><a href={`tel:${site.company.phone}`} className="hover:text-accent">{site.company.phone}</a></dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section-dark pad-standard">
        <div className="container-wide grid gap-10 md:grid-cols-3">
          {[
            ["Svar inden for 1 hverdag", "Det lover vi også vores egne kunder."],
            ["Data i EU", "Hostet i Frankfurt. Ingen undtagelser."],
            ["Ingen binding", "Du bliver, fordi det virker. Ikke fordi du skal."],
          ].map(([h, b]) => (
            <div key={h}>
              <h2 className="t-h3">{h}</h2>
              <p className="mt-2 t-body text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pad-dense">
        <div className="container-wide flex flex-wrap gap-x-8 gap-y-3 t-small text-muted">
          <Link href="/blog" className="link-arrow">Changelog og opdateringer</Link>
          <a href="https://status.example.dk" className="link-arrow">Driftsstatus</a>
          <Link href="/sikkerhed" className="link-arrow">Sikkerhed</Link>
        </div>
      </section>
      <FooterCta />
    </>
  );
}
