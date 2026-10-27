import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

// Home page closing (Marco 2026-10-22: E1 "Scenen lukker"). The hero's stage returns, the hero person waves goodbye,
// and the section runs seamlessly into the brown SiteFooter below it.
const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

export function StageCta() {
  return (
    <section className="relative overflow-hidden text-white" style={{ background: stage }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_60%_0%,oklch(0.66_0.17_38/0.3),transparent_70%)]" />
      <div className="relative grid items-end gap-10 px-6 pt-24 md:px-[3.5vw] md:pt-32 lg:grid-cols-[1.2fr_1fr]">
        <div className="pb-16">
          <h2 className="font-display font-normal leading-[0.98] tracking-[-0.045em] text-white" style={{ fontSize: "clamp(2.75rem, 1rem + 5vw, 6rem)" }}>
            Tag det første
            <br />
            <span className="text-white">kursus i dag</span>
          </h2>
          <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed text-white/65">Start med en lektion på 10 minutter. Det er gratis at se, hvordan det virker.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#kurser" className="n-btn n-btn-white"><Icon name="arrowRight" size={18} className="text-[oklch(0.62_0.18_33)]" /> Se kurserne</Link>
            <Link href="/priser" className="n-btn n-btn-glass"><Icon name="user" size={16} /> For virksomheder</Link>
          </div>
        </div>
        <div className="relative hidden h-[30rem] lg:block">
          <div aria-hidden className="absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.45),transparent)] blur-2xl" />
          <Image src="/img/mf-hero-wave.webp" alt="" width={1100} height={998} className="absolute bottom-0 left-1/2 h-full w-auto -translate-x-1/2 object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
        </div>
      </div>
    </section>
  );
}
