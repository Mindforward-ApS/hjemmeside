import { copy } from "@/content/copy.da";

// Real purchase objections, native <details> (works without JS). Emits FAQPage JSON-LD.
export function Faq({ items = copy.faq.items, title = copy.faq.title }: { items?: readonly { q: string; a: string }[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section className="pad-standard" aria-labelledby="faq-title">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 id="faq-title" className="t-display reveal">{title}</h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((i) => (
            <details key={i.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 t-h4 text-heading [&::-webkit-details-marker]:hidden">
                {i.q}
                <span aria-hidden className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-[260ms] ease-[var(--ease-enter)] group-open:rotate-45">
                  <span className="absolute h-px w-3 bg-heading" />
                  <span className="absolute h-3 w-px bg-heading" />
                </span>
              </summary>
              <p className="max-w-xl pb-6 t-body text-muted">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
