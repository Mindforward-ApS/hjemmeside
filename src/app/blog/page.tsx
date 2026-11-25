import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, type BlogPost } from "@/lib/blog";
import { Icon } from "@/components/ui/Icon";
import { categoryLabel, formatDate } from "./shared";

export const metadata: Metadata = {
  title: "Blog: AI i arbejdsdagen",
  description: "Guides og nyheder om Copilot, ChatGPT og Claude på arbejdet. Skrevet til medarbejdere og ledere i danske virksomheder.",
  alternates: { canonical: "/blog" },
  // An empty blog is not worth indexing; the page opens up by itself when the first article is published.
  ...(posts.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <div className="theme-night">
      <section className="relative overflow-hidden">
        <div aria-hidden className="n-glow right-[5%] top-[-10%] h-[30rem] w-[34rem]" />
        <div className="container-wide relative pb-12 pt-16 md:pb-16 md:pt-24">
          <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">Blog</span>
          <h1 className="n-display mt-6 max-w-[46rem]" style={{ fontSize: "clamp(2.5rem, 1rem + 4vw, 4.75rem)" }}>AI i arbejdsdagen</h1>
          <p className="mt-6 max-w-[36rem] text-[clamp(1.0625rem,0.95rem+0.35vw,1.3125rem)] leading-relaxed text-muted">Guides og nyheder om Copilot, ChatGPT og Claude på arbejdet. Korte svar først, så du kan bruge dem med det samme.</p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-wide">
          {!first ? (
            <div className="n-glass mx-auto max-w-[40rem] rounded-[1.75rem] p-10 text-center">
              <p className="text-[1.0625rem] text-text">De første artikler er på vej. Imens kan du se kurserne.</p>
              <Link href="/#kurser" className="n-btn n-btn-primary mt-7"><Icon name="arrowRight" size={18} /> Se kurserne</Link>
            </div>
          ) : (
            <>
              <PostCard post={first} featured />
              {rest.length > 0 && <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}</ul>}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const image = post.image;
  const meta = (
    <p className="text-[0.8125rem] text-muted">
      <span className="font-semibold uppercase tracking-[0.1em] text-accent">{categoryLabel(post.category)}</span>
      {" · "}<time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.readingTime ? ` · ${post.readingTime} min` : ""}
    </p>
  );
  const cover = (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[var(--accent-soft)]">
      {image ? (
        <Image src={image} alt={post.imageAlt || post.title} fill sizes={featured ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 100vw, 420px"} priority={featured} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center text-accent"><Icon name="sparkle" size={40} /></span>
      )}
    </div>
  );
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="n-glass group grid gap-8 rounded-[1.75rem] p-5 md:grid-cols-2 md:p-8">
        {cover}
        <div className="flex flex-col justify-center">
          {meta}
          <h2 className="mt-4 text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-heading group-hover:text-accent">{post.title}</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{post.excerpt}</p>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/blog/${post.slug}`} className="n-glass group flex h-full flex-col rounded-[1.5rem] p-5">
      {cover}
      <div className="flex grow flex-col px-1 pb-1 pt-5">
        {meta}
        <h2 className="mt-3 text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] text-heading group-hover:text-accent">{post.title}</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
