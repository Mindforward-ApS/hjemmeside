import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/data";

export const metadata: Metadata = { title: "Blog", description: "Guides og opdateringer om at svare kunder hurtigere.", alternates: { canonical: "/blog" } };

const fmt = (d: string) => new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-wide">
        <p className="t-label mb-5">Blog</p>
        <h1 className="t-hero max-w-3xl">Om at svare hurtigere</h1>
        <Link href={`/blog/${first.slug}`} className="group mt-14 grid gap-8 rounded-[var(--r-2xl)] border border-line bg-surface p-6 transition-shadow hover:shadow-3 md:grid-cols-2 md:p-10">
          <div className="aspect-[16/10] rounded-[var(--r-lg)] bg-accent-soft" aria-hidden />
          <div className="flex flex-col justify-center">
            <p className="t-small text-muted">{first.category} · <time dateTime={first.date}>{fmt(first.date)}</time> · {first.readMinutes} min</p>
            <h2 className="t-display mt-4 group-hover:text-accent">{first.title}</h2>
            <p className="t-lead mt-4">{first.excerpt}</p>
          </div>
        </Link>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-[var(--r-xl)] border border-line p-6 transition-colors hover:bg-surface md:p-8">
                <p className="t-small text-muted">{p.category} · <time dateTime={p.date}>{fmt(p.date)}</time> · {p.readMinutes} min</p>
                <h2 className="t-h3 mt-3 group-hover:text-accent">{p.title}</h2>
                <p className="mt-3 t-body text-muted">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
