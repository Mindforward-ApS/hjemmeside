import { Suspense } from "react";
import { PageFallback } from "@/components/ui/PageFallback";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/data";
import { site } from "@/content/site";
import { FooterCta } from "@/components/sections/FooterCta";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p?.title ?? "Blog", description: p?.excerpt, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article" } };
}

const fmt = (d: string) => new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PostPageContent params={params} />
    </Suspense>
  );
}

async function PostPageContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, inLanguage: "da-DK", publisher: { "@type": "Organization", name: site.company.legalName } };
  return (
    <>
      <article className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container-content">
          <Link href="/blog" className="link-arrow t-small"><Icon name="arrowLeft" size={16} /> Blog</Link>
          <header className="mt-8 max-w-[44rem]">
            <p className="t-small text-muted">{p.category} · <time dateTime={p.date}>{fmt(p.date)}</time> · {p.readMinutes} min læsning</p>
            <h1 className="t-display mt-4">{p.title}</h1>
            <p className="t-lead mt-5">{p.excerpt}</p>
          </header>
          {/* Body: replace with MDX/CMS. Measure 60–75 characters per line. */}
          <div className="ph mt-12 max-w-[65ch] space-y-6 t-body text-[1.0625rem] leading-[1.7]">
            <p>[ARTIKEL NEEDED: Svar på overskriftens spørgsmål i første afsnit, med fakta og kilde (§12.1).]</p>
            <h2 className="t-h3 pt-4">[Mellemrubrik, der siger pointen]</h2>
            <p>[Afsnit på højst 3–4 sætninger. Ét tal med kilde-ID i SOURCES.md.]</p>
          </div>
        </div>
      </article>
      <FooterCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
