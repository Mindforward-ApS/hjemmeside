import Image from "next/image";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { appLinks } from "@/lib/app";

// Problem section right after the hero (Marco 2026-11-23). Idea from his reference (design/references/
// problem-ref-compare.png): self-taught AI vs. Mindforward side by side, a big figure and a list each, a closing line
// with one button. Built as cards like the rest of the page (Marco: "kort og ikke bento grid").
// Our colours: coral minus marks on the problem side, orange checks on our side.
// Source for "1 ud af 10": CBS, March 2026 (via DR), only 1 in 10 employees have had formal AI training.
const ink = "#201613";
const muted = "#6b625d";
const line = "rgba(32,22,19,0.1)";
const head = "font-[family-name:var(--font-geist)] font-medium tracking-[-0.03em]";

const uden = [
  "Hver lærer det på sin egen måde",
  "Kundedata ryger ind i gratis værktøjer",
  "Svar, som ingen tjekker, før de sendes",
  "Ingen ved, hvad de må dele",
  "Kun de få ildsjæle får gavn af det",
  "Lederen kan ikke se, hvem der kan hvad",
];
const med = [
  "Korte lektioner på dansk",
  "Opgaver fra jeres egen hverdag",
  "Øvemiljø med score og feedback",
  "Klare regler for, hvad I må dele",
  "ChatGPT, Copilot og Claude på lige fod",
  "Kursusbevis og overblik til lederen",
];

function Minus() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-[3px] size-[18px] shrink-0" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#e8664a" strokeWidth="1.6" />
      <path d="M6.5 10h7" stroke="#e8664a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-[3px] size-[18px] shrink-0" fill="none">
      <path d="M4.5 10.5 8.5 14.5 15.5 6" stroke="#f8580a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Mark() {
  // Mindforward's smiling brain, same file as the header logo.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/img/mindforward-logo-3.png" alt="" aria-hidden width={43} height={36} className="block h-9 w-auto shrink-0" />;
}

export function Problem() {
  return (
    <section id="problemet" className="relative overflow-x-clip pb-20 pt-24 sm:pb-24 sm:pt-[7.5rem]">
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-[5vw]">
          <div>
          <SectionLabel>Problemet</SectionLabel>
          <h2 className={`${head} mt-4 max-w-[790px] !font-semibold text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143] tracking-[-0.045em]`} style={{ color: ink }}>
            Jeres folk bruger allerede AI. Ingen har lært dem det.
          </h2>
          </div>
          <p className="max-w-[480px] text-[1.0625rem] leading-[1.6] lg:pb-2" style={{ color: muted }}>
            De fleste har lært sig AI selv, i farten. Mindforward giver hele holdet det samme udgangspunkt.
          </p>
        </div>

        {/* Marco 2026-11-23: the tools-vs-Mindforward idea as two cards, like the rest of the page. The Mindforward card
            uses the featured price card's frame (pris-glow: the logo gradient with a strip on top). */}
        <div className="mt-[60px] grid gap-4 md:grid-cols-2 md:items-end xl:gap-[1.74vw]">
          <div className="flex flex-col rounded-[22px] bg-white p-6 sm:p-8" style={{ boxShadow: `0 0 0 1px ${line}` }}>
            <div className="flex items-center gap-3">
              <span className="flex -space-x-2">
                {["chatgpt", "copilot", "claude"].map((t) => (
                  <span key={t} className="grid size-9 place-items-center rounded-[10px] bg-white ring-2 ring-white">
                    <Image src={`/logos/${t}.png`} alt="" width={22} height={22} className="size-[22px] object-contain" />
                  </span>
                ))}
              </span>
              <p className={`${head} text-[1.25rem]`} style={{ color: ink }}>Selvlært, i farten</p>
            </div>
            <p className={`${head} mt-8 !font-semibold text-[clamp(2.75rem,2rem+2vw,3.25rem)] leading-none tracking-[-0.04em] tabular-nums`} style={{ color: ink }}>1 ud af 10</p>
            <p className="mt-3 text-[1rem]" style={{ color: muted }}>har fået formel AI-træning på jobbet <span className="text-[0.8125rem] opacity-70">(CBS, 2026)</span></p>
            <ul className="mt-7 space-y-3.5 border-t pt-7" style={{ borderColor: line }}>
              {uden.map((t) => <li key={t} className="flex gap-3 text-[1rem] leading-6" style={{ color: muted }}><Minus />{t}</li>)}
            </ul>
          </div>

          <div className="pris-glow relative flex flex-col rounded-[22px] p-[3px]">
            <p className="relative px-4 pb-2 pt-1.5 text-center text-[0.875rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(120,20,0,0.45)]">Med Mindforward</p>
            <div className="relative flex flex-1 flex-col rounded-[19px] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Mark />
                <p className={`${head} text-[1.25rem]`} style={{ color: ink }}>Hele holdet, samme udgangspunkt</p>
              </div>
              <p className={`${head} mt-8 !font-semibold text-[clamp(2.75rem,2rem+2vw,3.25rem)] leading-none tracking-[-0.04em] tabular-nums`} style={{ color: ink }}>10 min</p>
              <p className="mt-3 text-[1rem]" style={{ color: muted }}>om dagen, på dansk, for hele holdet</p>
              <ul className="mt-7 space-y-3.5 border-t pt-7" style={{ borderColor: line }}>
                {med.map((t) => <li key={t} className="flex gap-3 text-[1rem] leading-6" style={{ color: ink }}><Tick />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className={`${head} text-[1.375rem]`} style={{ color: ink }}>Giv hele holdet det samme udgangspunkt.</p>
          <GrebBtn href={appLinks.startBusiness}>Tilmeld jer</GrebBtn>
        </div>
      </div>
    </section>
  );
}
