import Image from "next/image";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { appLinks } from "@/lib/app";

// Problem section right after the hero (Marco 2026-11-23). Layout copied closely from his chosen reference
// (design/references/problem-ref-compare.png): full-height hairline guides, a heading row, then two columns
// (self-taught AI vs. Mindforward) with a big figure each and a list, and a closing line with one button.
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
  // The vertical guides run the full height; every row is separated by a hairline across them.
  const cell = "px-6 sm:px-8";
  return (
    <section id="problemet" className="relative overflow-x-clip bg-white">
      <div className="mx-auto w-full max-w-[1200px] border-x" style={{ borderColor: line }}>
        <div className={`${cell} pb-12 pt-20 sm:pt-28`}>
          <h2 className={`${head} !font-semibold text-[clamp(2rem,1.4rem+2vw,2.75rem)] leading-[1.15] tracking-[-0.035em]`} style={{ color: ink }}>
            Jeres folk bruger allerede AI. Ingen har lært dem det.
          </h2>
          <p className="mt-3 max-w-[640px] text-[1.0625rem] leading-[1.6]" style={{ color: muted }}>
            De fleste har lært sig AI selv, i farten. Mindforward giver hele holdet det samme udgangspunkt.
          </p>
        </div>

        <div className="grid border-t md:grid-cols-2" style={{ borderColor: line }}>
          {/* Problem side */}
          <div className="flex flex-col md:border-r" style={{ borderColor: line }}>
            <div className={`${cell} flex items-center gap-3 border-b py-6`} style={{ borderColor: line }}>
              <span className="flex -space-x-2">
                {["chatgpt", "copilot", "claude"].map((t) => (
                  <span key={t} className="grid size-9 place-items-center rounded-[10px] bg-white ring-2 ring-white" style={{ boxShadow: `0 0 0 1px ${line}` }}>
                    <Image src={`/logos/${t}.png`} alt="" width={22} height={22} className="size-[22px] object-contain" />
                  </span>
                ))}
              </span>
              <p className={`${head} text-[1.25rem]`} style={{ color: ink }}>Selvlært, i farten</p>
            </div>
            <div className={`${cell} border-b py-8`} style={{ borderColor: line }}>
              <p className={`${head} !font-semibold text-[clamp(2.75rem,2rem+2vw,3.25rem)] leading-none tracking-[-0.04em] tabular-nums`} style={{ color: ink }}>1 ud af 10</p>
              <p className="mt-3 text-[1rem]" style={{ color: muted }}>har fået formel AI-træning på jobbet <span className="text-[0.8125rem] opacity-70">(CBS, 2026)</span></p>
            </div>
            <ul className={`${cell} space-y-3.5 py-8`}>
              {uden.map((t) => <li key={t} className="flex gap-3 text-[1rem] leading-6" style={{ color: muted }}><Minus />{t}</li>)}
            </ul>
          </div>

          {/* Our side */}
          <div className="flex flex-col border-t md:border-t-0" style={{ borderColor: line }}>
            <div className={`${cell} flex items-center gap-3 border-b py-6`} style={{ borderColor: line }}>
              <Mark />
              <p className={`${head} text-[1.25rem]`} style={{ color: ink }}>Med Mindforward</p>
            </div>
            <div className={`${cell} border-b py-8`} style={{ borderColor: line }}>
              <p className={`${head} !font-semibold text-[clamp(2.75rem,2rem+2vw,3.25rem)] leading-none tracking-[-0.04em] tabular-nums`} style={{ color: ink }}>10 min</p>
              <p className="mt-3 text-[1rem]" style={{ color: muted }}>om dagen, på dansk, for hele holdet</p>
            </div>
            <ul className={`${cell} space-y-3.5 py-8`}>
              {med.map((t) => <li key={t} className="flex gap-3 text-[1rem] leading-6" style={{ color: ink }}><Tick />{t}</li>)}
            </ul>
          </div>
        </div>

        <div className={`${cell} flex flex-col items-center gap-5 border-t py-12 text-center`} style={{ borderColor: line }}>
          <p className={`${head} text-[1.375rem]`} style={{ color: ink }}>Giv hele holdet det samme udgangspunkt.</p>
          <GrebBtn href={appLinks.startBusiness}>Tilmeld jer</GrebBtn>
        </div>
      </div>
    </section>
  );
}
