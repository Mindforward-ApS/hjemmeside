import { Suspense } from "react";
import { PageFallback } from "@/components/ui/PageFallback";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/content/data";
import { FooterCta } from "@/components/sections/FooterCta";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kunder/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return { title: c ? `${c.company}: kundehistorie` : "Kundehistorie", alternates: { canonical: `/kunder/${slug}` } };
}

// Case template: problem → what changed → result, with the customer's own numbers.
export default function CasePage({ params }: PageProps<"/kunder/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <CasePageContent params={params} />
    </Suspense>
  );
}

async function CasePageContent({ params }: { params: PageProps<"/kunder/[slug]">["params"] }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <article className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container-wide">
          <Link href="/kunder" className="link-arrow t-small"><Icon name="arrowLeft" size={16} /> Alle kunder</Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="t-label">{c.industry}</p>
              <h1 className="t-hero mt-4 ph">{c.title}</h1>
              <div className="mt-12 max-w-[65ch] space-y-10">
                {[
                  ["Udgangspunktet", "[CASE NEEDED: hvordan så hverdagen ud før? Brug kundens egne ord.]"],
                  ["Det, der ændrede sig", "[CASE NEEDED: hvad gjorde de konkret i Fjord? 2–3 ting.]"],
                  ["Resultatet", "[CASE NEEDED: tal fra kundens egen data, med periode.]"],
                ].map(([h, b]) => (
                  <section key={h}>
                    <h2 className="t-h3">{h}</h2>
                    <p className="ph mt-4 t-body text-muted">{b}</p>
                  </section>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-[var(--r-xl)] border border-line bg-surface p-6 lg:sticky lg:top-28">
              <p className="tnum font-display text-[3rem] font-semibold leading-none tracking-[-0.03em] text-heading ph">{c.result}</p>
              <p className="mt-2 t-small text-muted">[Hvad tallet måler]</p>
              <dl className="mt-6 space-y-3 border-t border-line pt-6 t-small">
                <div className="flex justify-between gap-4"><dt className="text-muted">Virksomhed</dt><dd className="font-semibold text-heading">{c.company}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Branche</dt><dd className="font-semibold text-heading">{c.industry}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Plan</dt><dd className="font-semibold text-heading">[Plan]</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </article>
      <FooterCta />
    </>
  );
}
