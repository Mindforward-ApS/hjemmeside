import { copy } from "@/content/copy.da";
import { Marquee } from "@/components/motion/Marquee";

// Social proof: slow marquee with a pause control. Placeholders until real, permitted logos exist.
export function LogoWall() {
  return (
    <section aria-labelledby="logos-title" className="pad-dense border-y border-line">
      <div className="container-wide">
        <h2 id="logos-title" className="t-small mb-6 font-medium text-muted">{copy.home.logos.title}</h2>
        <Marquee label="Kundelogoer (pladsholdere)" seconds={45}>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="ph grid h-16 w-44 shrink-0 place-items-center rounded-[var(--r-lg)] border border-line font-display text-[0.9375rem] font-bold tracking-[-0.02em] text-muted">
              [LOGO {i + 1}]
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
