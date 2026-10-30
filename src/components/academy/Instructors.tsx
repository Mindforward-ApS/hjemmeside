// Instructor portraits are placeholder photos from Marco's Mindforward image folder (2026-10-23), not real instructors yet.
import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";

const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

const reasons: { icon: IconName; title: string; body: string }[] = [
  { icon: "globe", title: "På dansk", body: "Alle kurser er lavet på dansk med eksempler fra danske arbejdspladser." },
  { icon: "clock", title: "10 minutter ad gangen", body: "Korte lektioner, der passer ind mellem møder og kunder." },
  { icon: "shield", title: "Med styr på data", body: "Hvert kursus viser, hvad du må og ikke må dele med en AI." },
];

// Demo instructors (placeholders until real people and photos exist).
const team = [
  { i: "AK", name: "Underviser 1", role: "AI i hverdagen", note: "Har indført AI i 14 små virksomheder", hue: 35, photo: "/img/people/line-vestergaard.webp" },
  { i: "MB", name: "Underviser 2", role: "Skrivning og prompts", note: "Tidligere tekstforfatter", hue: 20, photo: "/img/people/jonas-bak.webp" },
  { i: "JS", name: "Underviser 3", role: "Data og GDPR", note: "Jurist med fokus på persondata", hue: 55, photo: "/img/people/mette-krogh.webp" },
  { i: "LH", name: "Underviser 4", role: "Ledelse", note: "Har ledet teams på 5 til 80", hue: 28, photo: "/img/people/sara-damgaard.webp" },
];

// 8 · Why us + instructors (Marco 2026-10-22: I1 "Mørk scene", "Helt klart"). It is a dark stage with a thin gradient
// headline, the three reasons as large lines, and the instructors as round monogram portraits.
export function Instructors() {
  if (!VIS_PLADSHOLDERE) return null;
  return (
    <section id="om-os" className="relative scroll-mt-24 overflow-hidden py-24 text-white md:py-32" style={{ background: stage }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,oklch(0.66_0.17_38/0.22),transparent_70%)]" />
      <div className="relative px-6 md:px-[3.5vw]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[0.8125rem]">Hvorfor os</span>
            <h2 className="mt-6 font-display font-normal leading-[1.02] tracking-[-0.04em] text-white" style={{ fontSize: "clamp(2.25rem, 1rem + 2.8vw, 3.75rem)" }}>
              Lavet af folk,
              <br />
              <span className="text-white">der bruger AI hver dag</span>
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/65">Vores undervisere har indført AI i små og mellemstore virksomheder. De underviser i det, der faktisk virker.</p>
          </div>
          <ul className="grid border-t border-white/10">
            {reasons.map((r) => (
              <li key={r.title} className="flex items-start gap-5 border-b border-white/10 py-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.07] text-[oklch(0.86_0.07_55)] ring-1 ring-white/10"><Icon name={r.icon} size={20} /></span>
                <span>
                  <span className="block font-display text-[1.375rem] tracking-[-0.02em] text-white">{r.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-white/60">{r.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {team.map((t) => (
            <li key={t.i} className="flex items-center gap-4">
              <span className="rounded-full p-1 ring-1 ring-white/15"><span className="block size-20 overflow-hidden rounded-full"><Image src={t.photo} alt="" width={320} height={397} className="h-full w-full origin-[50%_22%] scale-[2.2] object-cover object-[50%_0%]" /></span></span>
              <span>
                <span className="block text-[1.0625rem] font-medium text-white">{t.name}</span>
                <span className="block text-[0.875rem] text-white/60">{t.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
