import { SectionLabel } from "@/components/ui/SectionLabel";

// Problem section right after the hero (Marco 2026-11-23). Replaces the video testimonials row, since the videos
// already live in the hero. Same type, card and spacing language as "Platformen" below, which answers it.
// Sources: CBS, March 2026 (via DR): ~1 in 3 employees use AI at work, 1 in 10 have had formal AI training.
// Microsoft & LinkedIn Work Trend Index 2024: 78 % of AI users bring their own AI tools to work.
const ink = "#201613";
const muted = "#6b625d";
const head = "font-[family-name:var(--font-geist)] font-medium tracking-[-0.03em]";

const facts: [string, string][] = [
  ["1 ud af 3", "medarbejdere bruger AI i jobbet."],
  ["1 ud af 10", "har fået formel AI-træning af deres arbejdsplads."],
  ["78 %", "af dem, der bruger AI, tager deres egne værktøjer med på arbejde."],
];

export function Problem() {
  return (
    <section id="problemet" className="relative overflow-x-clip bg-white pb-20 pt-24 sm:pb-24 sm:pt-[7.5rem]">
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-[5vw]">
          <div>
            <SectionLabel>Problemet</SectionLabel>
            <h2 className={`${head} mt-4 max-w-[790px] !font-semibold text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143] tracking-[-0.045em]`} style={{ color: ink }}>
              Jeres folk bruger allerede AI. Ingen har lært dem det.
            </h2>
          </div>
          <p className="max-w-[480px] text-[1.0625rem] leading-[1.6] lg:pb-2" style={{ color: muted }}>
            De fleste har lært sig AI selv, i farten og uden at vide, hvad de må dele. Det giver usikre svar, data i
            værktøjer, ingen har valgt, og et hold, hvor kun de få får gavn af det.
          </p>
        </div>

        <div className="mt-[60px] grid gap-4 md:grid-cols-3 xl:gap-[1.74vw]">
          {facts.map(([n, t]) => (
            <div key={t} className="rounded-[32px] p-6 2xl:p-8" style={{ background: "#f5f2ef" }}>
              <p className={`${head} whitespace-nowrap text-[clamp(2.75rem,2rem+2vw,3.5rem)] leading-[1.07] tracking-[-2px] tabular-nums`} style={{ color: ink }}>{n}</p>
              <p className="mt-6 max-w-[300px] text-[1rem] leading-6" style={{ color: muted }}>{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[0.8125rem]" style={{ color: "#8a7f79" }}>
          Kilder: CBS-undersøgelse, marts 2026 · Microsoft og LinkedIn, Work Trend Index 2024
        </p>
      </div>
    </section>
  );
}
