import { outcomes } from "@/content/academy";
import { Head } from "@/components/academy/Shared";
import { minis } from "@/components/academy/OutcomeMinis";

const title = "Færdigheder, du kan bruge allerede i morgen";
const sub = "Ingen teori for teoriens skyld. Hvert kursus er bygget op om opgaver, du kender fra din egen arbejdsdag.";
const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

// 4 · Learning outcomes (Marco 2026-10-22: O1 "Bento med produkt"). Each outcome shows itself as a small
// product moment; the first tile sits on the hero's stage.
export function Outcomes() {
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  const wide = (i: number) => i === 0 || i === 3;
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Head label="Det lærer du" title={title} />
          <p className="max-w-[24rem] text-[1.0625rem] leading-relaxed text-muted lg:pb-2">{sub}</p>
        </div>
        <ul className="mt-14 grid gap-4 lg:grid-cols-12">
          {outcomes.map((o, i) => {
            const Mini = minis[i];
            const dark = i === 0;
            return (
              <li
                key={o.title}
                className={`relative grid gap-8 overflow-hidden rounded-[1.75rem] p-7 md:p-9 ${wide(i) ? "md:grid-cols-[1fr_1.1fr] md:items-center" : "content-between"} ${spans[i]} ${dark ? "text-white" : "bg-[var(--surface)] shadow-[0_0_0_1px_var(--border)]"}`}
                style={dark ? { background: stage } : undefined}
              >
                {dark && <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,oklch(0.66_0.17_38/0.28),transparent_70%)]" />}
                <div className="relative">
                  <h3 className={`font-display text-[1.625rem] font-normal leading-[1.1] tracking-[-0.03em] ${dark ? "text-white" : "text-heading"}`}>{o.title}</h3>
                  <p className={`mt-3 text-[0.9875rem] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{o.body}</p>
                </div>
                <div className="relative"><Mini /></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
