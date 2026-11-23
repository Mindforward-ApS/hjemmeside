import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Om os (Marco 2026-11-23, from his reference): a story card with text left and the founder's photo right, then
// Mission and Vision cards with three points each. Our colours: light cards on sand, orange accent word and checks,
// a soft orange light in the corner where the reference had green. Copy is a draft for Marco to correct.
const ink = "#201613";
const muted = "#5a4a44";
const head = "font-[family-name:var(--font-geist)] font-medium tracking-[-0.03em]";
const orange = "linear-gradient(90deg, #fb970a, #f8400a)";
const card = "0 0 0 1px rgba(32,22,19,0.06), 0 1px 2px rgba(32,22,19,0.05), 0 24px 48px -28px rgba(31,22,17,0.35)";

const mission = [
  "Gøre hele holdet trygge ved AI i deres eget arbejde.",
  "Lære ved at gøre, ikke ved at se video.",
  "Korte lektioner på dansk, ti minutter om dagen.",
];
const vision = [
  "AI er et værktøj, alle på holdet bruger, ikke kun de få.",
  "Lederen kan se, at holdet bliver bedre, og hvor det halter.",
  "ChatGPT, Copilot og Claude på lige fod, så I lærer det, I bruger.",
];

function Check() {
  return (
    <span aria-hidden className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full text-white" style={{ background: orange }}>
      <svg viewBox="0 0 16 16" className="size-[11px]" fill="none"><path d="M3.5 8.5 6.5 11.5 12.5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

function Points({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] bg-white p-7 sm:p-9" style={{ boxShadow: card }}>
      <h3 className={`${head} text-[1.5rem] leading-tight`} style={{ color: ink }}>{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[1rem] leading-6" style={{ color: muted }}><Check />{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function OmOs() {
  return (
    <section id="om-os" className="relative isolate overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] -top-[30%] -z-10 h-[70%] w-[60%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(251,151,10,0.35), rgba(248,64,10,0.12), transparent)" }} />
      <div className="w-full px-5 sm:px-[3.5vw]">
        <SectionLabel>Om os</SectionLabel>
        <div className="mt-6 grid gap-5">
          <div className="grid gap-8 rounded-[28px] bg-white p-6 sm:p-9 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14" style={{ boxShadow: card }}>
            <div className="flex flex-col lg:py-3">
              <h2 className={`${head} text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-[1.08]`} style={{ color: ink }}>
                Vores <span className="bg-clip-text text-transparent" style={{ backgroundImage: orange }}>historie</span>
              </h2>
              <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65]" style={{ color: muted }}>
                AI er allerede en del af arbejdet på de fleste kontorer, men de fleste har lært det selv, i farten og uden
                at vide, hvad de må. Mindforward er bygget for at give hele holdet et sted at øve sig på rigtige opgaver,
                på dansk og i de værktøjer, de allerede bruger.
              </p>
              <div className="mt-auto flex items-center gap-3 pt-10">
                <span className="block h-px w-8" style={{ background: "rgba(32,22,19,0.25)" }} />
                <p className="text-[0.9375rem]" style={{ color: ink }}><span className="font-semibold">Marco Nielsen</span> · Stifter</p>
              </div>
            </div>
            {/* Inner radius = outer 28 − padding gap, so the corners stay concentric. */}
            <div className="relative aspect-square overflow-hidden rounded-[18px] lg:max-h-[400px]" style={{ background: "#ece4dd" }}>
              <Image src="/img/marco-2.jpg" alt="Marco Nielsen, stifter af Mindforward" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Points title="Mission" items={mission} />
            <Points title="Vision" items={vision} />
          </div>
        </div>
      </div>
    </section>
  );
}
