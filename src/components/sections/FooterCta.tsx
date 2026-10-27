import { appLinks } from "@/lib/app";
import Link from "next/link";
import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";

// Every page ends here. Docebo-DNA "atmosphere" CTA, made from our own material:
// a full-bleed blue field with the logo's wave motif, centred headline, one primary action.
export function FooterCta() {
  const f = copy.footerCta;
  return (
    <section className="field-blue relative overflow-hidden">
      {/* Atmosphere: soft glow + three wave layers at different periods and strengths */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.7_0.12_255/0.35)] blur-[120px]" />
      {[
        { o: 0.06, amp: 30, period: 180, h: "70%" },
        { o: 0.1, amp: 44, period: 260, h: "55%" },
        { o: 0.16, amp: 58, period: 360, h: "40%" },
      ].map((l, li) => (
        <svg key={li} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-white" style={{ height: l.h, opacity: l.o }} viewBox="0 0 1440 300" preserveAspectRatio="none" fill="none">
          {[0, 1, 2].map((i) => {
            const y = 60 + i * 80;
            let d = `M0 ${y}`;
            for (let x = 0; x < 1440; x += l.period) d += ` q${l.period / 4} ${-l.amp} ${l.period / 2} 0 t${l.period / 2} 0`;
            return <path key={i} d={d} stroke="currentColor" strokeWidth="12" strokeLinecap="round" />;
          })}
        </svg>
      ))}
      <div className="container-content relative py-28 text-center md:py-40">
        <h2 className="t-hero mx-auto max-w-3xl">{f.title}</h2>
        <p className="t-lead mx-auto mt-6 max-w-lg">{f.sub}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={appLinks.signup} className="btn btn-primary">{f.primary} <Icon name="arrowRight" size={18} /></Link>
          <Link href="/kontakt" className="btn btn-secondary">{f.secondary}</Link>
        </div>
      </div>
    </section>
  );
}
