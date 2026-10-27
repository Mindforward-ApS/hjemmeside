import Image from "next/image";
import { steps } from "@/content/academy";
import { Icon } from "@/components/ui/Icon";

const coral = "oklch(0.66 0.19 33)";
const ink = "oklch(0.24 0.02 30)";

// 7 · How it works (Marco 2026-10-22: N3 "Holdbillede"). The heading sits on white, a large team photo is below it,
// and the four steps are in a white strip with serif numbers.
// Background (Marco 2026-10-23: F3 "Lys koral-glød") sets it apart from the light Smagsprøve section above.
const glow = "radial-gradient(70% 60% at 50% 0%, oklch(0.9 0.06 45), oklch(0.95 0.02 55) 70%)";

export function HowItWorks({ bg = glow }: { bg?: string } = {}) {
  return (
    <section id="saadan" className="py-24 md:py-32" style={{ background: bg }}>
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_0_0_1px_var(--border),0_40px_80px_-40px_oklch(0.3_0.04_30/0.35)]">
          <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:p-10">
            <div>
              <span className="inline-flex rounded-full bg-[var(--bg)] px-4 py-1.5 text-[0.8125rem] shadow-[0_0_0_1px_var(--border)]" style={{ color: ink }}>Sådan virker det</span>
              <h2 className="mt-5 font-display font-normal leading-[1.02] tracking-[-0.04em] text-heading" style={{ fontSize: "clamp(2rem, 1rem + 2.6vw, 3.75rem)" }}>
                Fire trin. Ét hold.
                <br />
                <span className="text-muted">Ingen teori for teoriens skyld.</span>
              </h2>
            </div>
            <a href="#kurser" className="n-btn n-btn-ink shrink-0 self-start md:self-auto"><Icon name="arrowRight" size={16} /> Find dit forløb</a>
          </div>
          <div className="relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/8]">
            <Image src="/img/team3.webp" alt="Fem kolleger, der kigger sammen på et papir og smiler" fill sizes="(min-width: 1024px) 1280px, 100vw" className="object-cover object-[50%_25%]" />
          </div>
          <ol className="relative grid bg-white sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 border-[var(--border)] p-6 md:p-8 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:[&:not(:last-child)]:border-r">
                <span className="font-display text-[2rem] font-light leading-none tracking-[-0.04em]" style={{ color: coral }}>{i + 1}</span>
                <span>
                  <span className="block text-[1.0625rem] font-medium text-heading">{s.title}</span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-muted">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
