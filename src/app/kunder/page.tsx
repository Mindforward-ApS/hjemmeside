import type { Metadata } from "next";
import Link from "next/link";
import { HeroInternal } from "@/components/sections/HeroInternal";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterCta } from "@/components/sections/FooterCta";
import { caseStudies } from "@/content/data";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Kunder", description: "Sådan bruger danske virksomheder Fjord.", alternates: { canonical: "/kunder" } };

export default function CustomersPage() {
  return (
    <>
      <HeroInternal label="Kunder" title="Virksomheder, der svarer hurtigere" sub="Historier fra kunder, der har prøvet det. Med deres egne tal." />
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <ul className="grid gap-4 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/kunder/${c.slug}`} className={`ph group flex h-full min-h-[320px] flex-col justify-between rounded-[var(--r-xl)] p-6 transition-transform duration-[260ms] hover:-translate-y-1 md:p-8 ${i === 0 ? "section-dark" : "card"}`}>
                  <div>
                    <p className="t-label">{c.industry}</p>
                    <h2 className="t-h3 mt-4">{c.title}</h2>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="tnum font-display text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-heading">{c.result}</p>
                      <p className="mt-2 t-small text-muted">{c.company}</p>
                    </div>
                    <span className="link-arrow"><Icon name="arrowRight" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <FooterCta />
    </>
  );
}
