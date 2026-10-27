import Link from "next/link";
import { copy } from "@/content/copy.da";
import { useCases } from "@/content/data";
import { HorizontalPin } from "@/components/motion/HorizontalPin";
import { Icon } from "@/components/ui/Icon";

// Home: industries as large panels you scroll through sideways (signature C).
export function UseCaseJourney() {
  const u = copy.home.useCases;
  return (
    <HorizontalPin label={u.label} title={u.title} dark={false}>
      {useCases.map((c, i) => (
        <li key={c.slug} className="hp-panel shrink-0 lg:w-[min(560px,40vw)]">
          <Link
            href={`/loesninger/${c.slug}`}
            className={`hp-rise group spotlight flex min-h-[440px] flex-col justify-between gap-10 rounded-[var(--r-2xl)] p-8 transition-transform duration-[260ms] ease-[var(--ease-enter)] hover:-translate-y-1 md:p-10 ${i % 2 === 0 ? "field-blue" : "card bg-surface-raised"}`}
          >
            <div>
              <p className="flex items-center justify-between t-label">
                {c.name}
                <span className="tnum">0{i + 1}</span>
              </p>
              <h3 className="t-display mt-6" style={{ fontSize: "clamp(1.75rem, 1.2rem + 1.4vw, 2.5rem)" }}>{c.title}</h3>
            </div>
            <div>
              <ul className="mb-8 space-y-2">
                {c.pains.map((p) => (
                  <li key={p} className="flex gap-3 t-body text-muted"><span aria-hidden className="text-accent">—</span>{p}</li>
                ))}
              </ul>
              <span className="link-arrow">Se løsningen <Icon name="arrowRight" size={16} /></span>
            </div>
          </Link>
        </li>
      ))}
    </HorizontalPin>
  );
}
