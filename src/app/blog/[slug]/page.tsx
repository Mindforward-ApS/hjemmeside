import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { appLinks } from "@/lib/app";
import { extractFaq, renderMarkdown } from "@/lib/markdown";
import { getBlogPostBySlug, getBlogPosts, strapiImageUrl } from "@/lib/strapi";
import { NightCta } from "@/components/night/NightCta";
import { Icon } from "@/components/ui/Icon";
import { categoryLabel, formatDate } from "../shared";

// Cache Components needs at least one param at build time. Before the first article exists (or when Strapi cannot be
// reached during the build) a placeholder is used; it resolves to no post and therefore to the 404 page.
const PLACEHOLDER = "__ingen-artikler__";

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => []);
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = slug === PLACEHOLDER ? null : await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Artikel ikke fundet", robots: { index: false, follow: false } };

  const image = strapiImageUrl(post.featuredImage);
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: image ? [image] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = slug === PLACEHOLDER ? null : await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const image = strapiImageUrl(post.featuredImage);
  const url = `${site.url}/blog/${post.slug}`;
  const faq = extractFaq(post.content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "da-DK",
        author: { "@type": "Organization", name: post.author || site.name, url: site.url },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        ...(image ? { image } : {}),
        mainEntityOfPage: url,
        ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      ...(faq.length > 0
        ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
    ],
  };

  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      <article className="pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="mx-auto w-full max-w-[46rem] px-[var(--gutter)]">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-muted hover:text-heading"><Icon name="arrowLeft" size={16} /> Blog</Link>
          <header className="mt-6">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-accent">{categoryLabel(post.category)}</p>
            <h1 className="mt-4 text-[clamp(2.125rem,1.3rem+3vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-heading">{post.title}</h1>
            <p className="mt-5 text-[0.9375rem] text-muted">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.author ? ` · ${post.author}` : ""}
              {post.readingTime ? ` · ${post.readingTime} min læsning` : ""}
            </p>
            {post.excerpt && <p className="mt-7 text-[clamp(1.125rem,1rem+0.45vw,1.3125rem)] leading-relaxed text-heading">{post.excerpt}</p>}
          </header>
        </div>

        {image && (
          <div className="mx-auto mt-10 w-full max-w-[60rem] px-[var(--gutter)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-[var(--tile-deep)]">
              <Image src={image} alt={post.featuredImage?.alternativeText || post.title} fill sizes="(max-width: 768px) 100vw, 960px" priority className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 w-full max-w-[46rem] px-[var(--gutter)] text-[1.0625rem] leading-[1.75] text-text">{renderMarkdown(post.content)}</div>
      </article>

      <NightCta title="Vil du selv prøve det?" sub="Korte lektioner på dansk, opgaver i øvemiljøet og et kursusbevis til sidst." primary={{ label: "Kom i gang", href: appLinks.signup }} secondary={{ label: "Se priser", href: "/priser" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
