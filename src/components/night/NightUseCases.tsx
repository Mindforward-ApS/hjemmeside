import Link from "next/link";
import { useCases } from "@/content/data";
import { Icon } from "@/components/ui/Icon";

// Industry cards (links to /loesninger/[slug]); `exclude` hides the current one.
export function NightUseCases({ exclude, title = "Bygget til virksomheder, hvor telefonen ringer" }: { exclude?: string; title?: string }) {
  const list = useCases.filter((u) => u.slug !== exclude);
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <h2 className="n-display max-w-[40rem]" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>{title}</h2>
        <ul className={`mt-12 grid gap-4 sm:grid-cols-2 ${list.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {list.map((u) => (
            <li key={u.slug}>
              <Link href={`/loesninger/${u.slug}`} className="n-glass group flex h-full flex-col justify-between gap-8 rounded-[1.5rem] p-6 transition-transform duration-[260ms] ease-[var(--ease-enter)] hover:-translate-y-1">
                <div>
                  <p className="text-[0.8125rem] font-medium text-[var(--accent)]">{u.name}</p>
                  <h3 className="mt-3 text-[1.25rem] font-medium leading-snug tracking-[-0.01em] text-heading">{u.title}</h3>
                </div>
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-heading">
                  Se løsningen <Icon name="arrowRight" size={16} className="transition-transform duration-[180ms] group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
