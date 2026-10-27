import { appLinks } from "@/lib/app";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { courses } from "@/content/academy";
import { PageFallback } from "@/components/ui/PageFallback";
import { Cover } from "@/components/academy/Shared";
import { Plans } from "@/components/academy/Plans";
import { NightCta } from "@/components/night/NightCta";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kurser/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  return { title: c?.title ?? "Kursus", description: c?.summary, alternates: { canonical: `/kurser/${slug}` } };
}

export default function CoursePage({ params }: PageProps<"/kurser/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <CourseContent params={params} />
    </Suspense>
  );
}

async function CourseContent({ params }: { params: PageProps<"/kurser/[slug]">["params"] }) {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link href="/#kurser" className="flex items-center gap-2 text-[0.9375rem] text-muted hover:text-heading"><Icon name="arrowLeft" size={16} /> Alle kurser</Link>
            <p className="mt-8 flex items-center gap-2 text-[0.875rem] text-muted"><span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-medium text-[var(--accent)]">{c.category}</span>{c.level}</p>
            <h1 className="n-display mt-5" style={{ fontSize: "clamp(2.25rem, 1rem + 3.4vw, 4rem)" }}>{c.title}</h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-muted">{c.summary}</p>
            <p className="mt-6 flex gap-6 text-[0.9375rem] text-text">
              <span className="flex items-center gap-2"><Icon name="doc" size={16} /> {c.lessons} lektioner</span>
              <span className="flex items-center gap-2"><Icon name="clock" size={16} /> ca. {(Math.round(c.minutes / 6) / 10).toLocaleString("da-DK")} timer</span>
            </p>
            <Link href={appLinks.signup} className="n-btn n-btn-primary mt-9"><Icon name="arrowRight" size={18} /> Start kurset</Link>
          </div>
          <Cover hue={c.hue} className="aspect-[4/3] rounded-[1.75rem]" />
        </div>
      </section>
      <Plans />
      <NightCta title="Klar til at komme i gang?" sub="Første lektion tager 10 minutter." primary={{ label: "Start kurset", href: appLinks.signup }} secondary={{ label: "Se alle kurser", href: "/#kurser" }} />
    </div>
  );
}
