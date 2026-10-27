import { appLinks } from "@/lib/app";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

// Internal page hero in the night design: small glass label, thin gradient headline, lead, two actions.
export function NightPageHero({ label, title, sub, children }: { label: string; title: ReactNode; sub: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="n-glow right-[5%] top-[-10%] h-[30rem] w-[34rem]" />
      <div className={`container-wide relative grid gap-14 pb-16 pt-16 md:pb-24 md:pt-24 ${children ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}>
        <div className="max-w-[46rem]">
          <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">{label}</span>
          <h1 className="n-display mt-6" style={{ fontSize: "clamp(2.5rem, 1rem + 4vw, 4.75rem)" }}>{title}</h1>
          <p className="mt-6 max-w-[36rem] text-[clamp(1.0625rem,0.95rem+0.35vw,1.3125rem)] leading-relaxed text-muted">{sub}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={appLinks.signup} className="n-btn n-btn-primary"><Icon name="arrowRight" size={18} /> Prøv gratis i 14 dage</Link>
            <Link href="/kontakt" className="n-btn n-btn-dark"><Icon name="clock" size={16} /> Book 15 min</Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
