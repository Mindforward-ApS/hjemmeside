import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { useCases } from "@/content/data";
import { PageFallback } from "@/components/ui/PageFallback";
import { NightPageHero } from "@/components/night/NightPageHero";
import { NightUseCases } from "@/components/night/NightUseCases";
import { NightFaq } from "@/components/night/NightFaq";
import { NightCta } from "@/components/night/NightCta";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loesninger/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  return { title: u ? `Fjord til ${u.name.toLowerCase()}` : "Løsninger", description: u?.body, alternates: { canonical: `/loesninger/${slug}` } };
}

export default function SolutionPage({ params }: PageProps<"/loesninger/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <SolutionPageContent params={params} />
    </Suspense>
  );
}

async function SolutionPageContent({ params }: { params: PageProps<"/loesninger/[slug]">["params"] }) {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  if (!u) notFound();
  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      <NightPageHero label={`Løsninger · ${u.name}`} title={u.title} sub={u.body} />

      {/* Before → after: the pains in their words, then what changes */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="night-dark relative overflow-hidden rounded-[1.75rem] bg-[oklch(0.17_0.01_30)] p-8 md:p-10">
            <div aria-hidden className="n-glow -right-20 -top-20 h-72 w-72 opacity-70" />
            <p className="relative text-[0.8125rem] font-medium text-[var(--coral)]">Kender du det?</p>
            <ul className="relative mt-6 space-y-5">
              {u.pains.map((p) => (
                <li key={p} className="n-display text-[clamp(1.5rem,1rem+1.2vw,2.125rem)]">{p}</li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-4">
            {u.answers.map((a, i) => (
              <li key={a.title} className="n-glass flex gap-5 rounded-[1.5rem] p-6 md:p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-full text-[0.9375rem] font-semibold text-white" style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))" }}>
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-[1.125rem] font-medium text-heading">{a.title}</h2>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{a.body}</p>
                </div>
              </li>
            ))}
            <li className="ph n-glass rounded-[1.5rem] p-6 md:p-7">
              <p className="flex items-center gap-2 text-[0.8125rem] text-muted"><Icon name="user" size={16} /> Fra en kunde i {u.name.toLowerCase()}</p>
              <p className="mt-3 text-[1.0625rem] text-heading">“[TESTIMONIAL NEEDED: kort citat med et konkret resultat]”</p>
              <p className="mt-3 text-[0.875rem] text-muted">[Navn], [rolle], [firma]</p>
            </li>
          </ol>
        </div>
      </section>

      <NightUseCases exclude={u.slug} title="Andre brancher" />
      <NightFaq />
      <NightCta />
    </div>
  );
}
