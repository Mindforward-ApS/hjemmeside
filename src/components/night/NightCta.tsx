import { appLinks } from "@/lib/app";
import Link from "next/link";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { Icon } from "@/components/ui/Icon";

// Closing panel: a coral horizon rising from the bottom edge, centred headline, two actions.
export function NightCta({ title = "Giv dine kunder svar i dag", sub = "14 dage gratis. Intet kreditkort. Du er i gang på 10 minutter.", primary = { label: "Prøv gratis", href: appLinks.signup }, secondary = { label: "Book 15 min", href: "/kontakt" } }: { title?: string; sub?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } } = {}) {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--tile-border)] bg-[var(--panel)] px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
          <div aria-hidden className="pointer-events-none absolute -bottom-[60%] left-1/2 h-[120%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.68_0.17_28/0.85),oklch(0.45_0.14_24/0.5)_55%,transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-[64%] left-1/2 h-[120%] w-[150%] -translate-x-1/2 rounded-[50%] border-t border-[oklch(0.85_0.1_40/0.7)] bg-[var(--bg)]" />
          <div className="relative">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl text-white" style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.82 0.12 38), oklch(0.6 0.17 24))" }}>
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M3 15c3 0 4-3 6-3s3 3 6 3 4-3 6-3" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" /><path d="M3 9c3 0 4-3 6-3s3 3 6 3 4-3 6-3" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" /></svg>
            </span>
            <h2 className="n-display mx-auto mt-8 max-w-[40rem]" style={{ fontSize: "clamp(2.25rem, 1rem + 3vw, 3.75rem)" }}>{title}</h2>
            <p className="mx-auto mt-5 max-w-[30rem] text-[1.0625rem] text-muted">{sub}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <GrebBtn href={primary.href} onDark>{primary.label}</GrebBtn>
              <Link href={secondary.href} className="n-btn n-btn-dark"><Icon name="clock" size={16} /> {secondary.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
