// 9 · Learner stories (Marco 2026-10-22: S3 "Videovæg"). The big card plays a video story (2026-10-23: an AI-generated placeholder, labelled)
// next to two quote cards.
// The two text quotes are still EXAMPLES, visibly labelled, until real, consented ones exist.

import Image from "next/image";
import { VideoStory } from "@/components/academy/VideoStory";

const coral = "oklch(0.66 0.19 33)";

const stories = [
  { i: "KC", photo: "", focus: "", role: "Kontorchef", firm: "logistikvirksomhed, 40 ansatte", quote: "Referaterne tager mig otte minutter nu. Før brugte jeg en halv time efter hvert møde.", before: "30 min", after: "8 min", what: "pr. referat", hue: 35 },
  { i: "SA", photo: "/img/people/ali-yilmaz.webp", focus: "50% 36%", role: "Sælger", firm: "byggemarked", quote: "Jeg skriver tilbud på halvdelen af tiden, og de lyder stadig som mig.", before: "45 min", after: "20 min", what: "pr. tilbud", hue: 20 },
  { i: "EJ", photo: "/img/people/peter-skov.webp", focus: "50% 24%", role: "Ejer", firm: "revisionsfirma, 12 ansatte", quote: "Nu ved hele holdet, hvad vi må dele med AI. Det var dét, der holdt os tilbage.", before: "0", after: "12", what: "medarbejdere i gang", hue: 55 },
];

function Example({ dark = false }: { dark?: boolean }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] ${dark ? "bg-white/10 text-white/60" : "bg-[var(--hover-fill)] text-muted"}`}>Eksempel</span>;
}

function Person({ s, dark = false }: { s: (typeof stories)[number]; dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      {s.photo ? (
        <span className="block size-11 shrink-0 overflow-hidden rounded-full"><Image src={s.photo} alt="" width={176} height={218} className="h-full w-full scale-[2.2] object-cover object-[50%_0%]" style={{ transformOrigin: s.focus }} /></span>
      ) : (
        <span className="grid size-11 shrink-0 place-items-center rounded-full font-display text-[0.9375rem] text-white" style={{ background: `radial-gradient(120% 120% at 30% 10%, oklch(0.5 0.07 ${s.hue}), oklch(0.24 0.03 ${s.hue}) 75%)` }}>{s.i}</span>
      )}
      <span>
        <span className={`block text-[0.9375rem] font-medium ${dark ? "text-white" : "text-heading"}`}>{s.role}</span>
        <span className={`block text-[0.8125rem] ${dark ? "text-white/55" : "text-muted"}`}>{s.firm}</span>
      </span>
    </span>
  );
}

export function Stories() {
  const rest = stories.slice(1);
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[var(--surface)] px-4 py-1.5 text-[0.8125rem] text-heading shadow-[0_0_0_1px_var(--border)]">Kursister</span>
            <h2 className="mt-6 font-display font-normal leading-[1.02] tracking-[-0.04em] text-heading" style={{ fontSize: "clamp(2.25rem, 1rem + 2.8vw, 3.75rem)" }}>Hør det fra dem selv</h2>
          </div>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <VideoStory src="/video/kunde-1.mp4" poster="/video/kunde-1-poster.jpg" captions="/video/kunde-1.da.vtt" length="0:09" label="Eksempel, AI-genereret" quote="Vi var egentlig ret nysgerrige på AI, men vi manglede et sted at starte. Med Mindforward blev det mere konkret." name="Marco Nielsen" role="CEO, Leadline" />
          <div className="grid gap-4">
            {rest.map((s) => (
              <figure key={s.i} className="flex flex-col justify-between rounded-[2rem] bg-[var(--surface)] p-8 shadow-[0_0_0_1px_var(--border)]">
                <p className="font-display text-[3.5rem] font-semibold leading-[0.6]" style={{ color: coral }} aria-hidden>”</p>
                <blockquote className="mt-4 text-[1.1875rem] leading-relaxed text-heading">{s.quote}</blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-3"><Person s={s} /><Example /></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
