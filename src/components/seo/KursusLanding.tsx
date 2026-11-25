import Image from "next/image";
import Link from "next/link";
import { getLandingPage, landingPages, type LandingPage } from "@/content/landingssider";
import { erhverv } from "@/content/priser";
import { site } from "@/content/site";
import { appLinks } from "@/lib/app";
import { NightCta } from "@/components/night/NightCta";
import { Icon } from "@/components/ui/Icon";

// One layout for every landing page in src/content/landingssider.ts: hero, what the term means, what you practise,
// how it works, the certificate, the price, questions, related pages. The copy differs per page; the shape does not.
const steps = [
  { title: "Inviter", body: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget." },
  { title: "Lær", body: "Ti minutter om dagen på dansk: en kort video og tekst, så en quiz." },
  { title: "Øv", body: "Hver lektion slutter med en opgave i øvemiljøet. Du skriver prompten selv og får en score fra 0 til 100." },
  { title: "Følg op", body: "Lederen ser holdets fremskridt, og alle får et kursusbevis." },
];

const h2 = "n-display";
const h2Size = { fontSize: "clamp(2rem, 1rem + 2.2vw, 3.25rem)" };

export function KursusLanding({ page }: { page: LandingPage }) {
  const url = `${site.url}/${page.slug}`;
  const related = landingPages.filter((p) => p.slug !== page.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: site.url },
          { "@type": "ListItem", position: 2, name: page.nav, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ...(page.course
        ? [{
            "@type": "Course",
            name: page.h1,
            description: page.metaDescription,
            url,
            inLanguage: "da-DK",
            provider: { "@type": "Organization", name: site.name, url: site.url },
            hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT2H" },
            offers: { "@type": "Offer", category: "Subscription", priceCurrency: "DKK", price: erhverv[0].price.replace(/\D/g, ""), url: `${site.url}/priser` },
          }]
        : []),
    ],
  };

  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="n-glow right-[5%] top-[-10%] h-[30rem] w-[34rem]" />
        <div className="container-wide relative pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="max-w-[52rem]">
            <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">{page.label}</span>
            <h1 className="n-display mt-6" style={{ fontSize: "clamp(2.5rem, 1rem + 4vw, 4.5rem)" }}>{page.h1}</h1>
            <p className="mt-6 max-w-[38rem] text-[clamp(1.0625rem,0.95rem+0.35vw,1.3125rem)] leading-relaxed text-muted">{page.sub}</p>
            <ul className="mt-8 grid gap-3 text-[1rem] text-heading sm:grid-cols-3">
              {page.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-accent"><Icon name="check" size={13} /></span>{p}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={appLinks.signup} className="n-btn n-btn-primary"><Icon name="arrowRight" size={18} /> Kom i gang</Link>
              <Link href="/priser" className="n-btn n-btn-dark">Se priser</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <h2 className={h2} style={h2Size}>{page.intro.title}</h2>
          <div className="max-w-[38rem] space-y-5 text-[1.0625rem] leading-[1.7] text-text">
            {page.intro.body.map((b) => <p key={b}>{b}</p>)}
            {page.intro.source && (
              <p><a href={page.intro.source.href} target="_blank" rel="noopener noreferrer" className="font-medium text-heading underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-accent">{page.intro.source.label}</a></p>
            )}
          </div>
        </div>
      </section>

      {/* What you practise / get */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <h2 className={h2} style={h2Size}>{page.cards.title}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.cards.items.map((c) => (
              <li key={c.title} className="n-glass rounded-[1.5rem] p-6">
                <span className="grid size-11 place-items-center rounded-[0.875rem] bg-[var(--accent-soft)] text-accent"><Icon name={c.icon} size={20} /></span>
                <h3 className="mt-5 text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-heading">{c.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <h2 className={h2} style={h2Size}>Sådan foregår det</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <p className="text-[0.875rem] font-semibold tabular-nums text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-[1.3125rem] font-semibold tracking-[-0.015em] text-heading">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Certificate */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <div className="night-dark grid items-center gap-10 overflow-hidden rounded-[2rem] p-8 md:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14" style={{ background: "linear-gradient(160deg, #2a1c17 0%, #1a0f0c 100%)" }}>
            <div>
              <h2 className="text-[clamp(1.75rem,1.1rem+1.8vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">{page.proof.title}</h2>
              <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/75">{page.proof.body}</p>
              {page.proof.note === "artikel4" && getLandingPage("ai-forordningen-artikel-4") && (
                <Link href="/ai-forordningen-artikel-4" className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">Læs om artikel 4 <Icon name="arrowRight" size={16} /></Link>
              )}
            </div>
            <figure>
              <Image src="/cert/certifikat-v7.webp" alt="Eksempel på et kursusbevis fra Mindforward med navn, score, ID og QR-kode" width={2248} height={1588} sizes="(max-width: 1024px) 100vw, 560px" className="h-auto w-full rounded-[0.75rem]" />
              <figcaption className="mt-3 text-[0.8125rem] text-white/55">Eksempel på et kursusbevis.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <div className="n-glass flex flex-col items-start justify-between gap-6 rounded-[1.75rem] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-heading">Fra {erhverv[1].price}. pr. bruger om måneden</h2>
              <p className="mt-3 max-w-[36rem] text-[1rem] leading-relaxed text-muted">{erhverv[0].price}. pr. bruger ekskl. moms, og {erhverv[1].price}. fra 10 brugere. Alle moduler i niveau 1, øvemiljø, kursusbevis og teamoverblik er med. Ingen binding.</p>
            </div>
            <Link href="/priser" className="n-btn n-btn-ink shrink-0"><Icon name="arrowRight" size={18} /> Se alle priser</Link>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className={h2} style={h2Size}>Spørgsmål og svar</h2>
          <div className="divide-y divide-line border-y border-line">
            {page.faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.0625rem] font-semibold text-heading [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-[260ms] group-open:rotate-45">
                    <span className="absolute h-px w-3 bg-heading" />
                    <span className="absolute h-3 w-px bg-heading" />
                  </span>
                </summary>
                <p className="max-w-[40rem] pb-6 text-[1rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="pb-20 md:pb-28">
        <div className="container-wide">
          <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted">Se også</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {related.map((p) => (
              <li key={p.slug}><Link href={`/${p.slug}`} className="n-glass inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-heading hover:text-accent">{p.nav} <Icon name="arrowRight" size={15} /></Link></li>
            ))}
            <li><Link href="/blog" className="n-glass inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-heading hover:text-accent">Blog <Icon name="arrowRight" size={15} /></Link></li>
          </ul>
        </div>
      </section>

      <NightCta title={page.cta.title} sub={page.cta.sub} primary={{ label: "Kom i gang", href: appLinks.signup }} secondary={{ label: "Kontakt os", href: "/kontakt" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

export function landingMetadata(page: LandingPage) {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.h1, description: page.metaDescription, url: `/${page.slug}`, type: "website" as const },
  };
}
