"use client";

// "Sådan starter I" built closely on Calendly's "Built for people whose work runs on meetings" section
// (design/references/start-sektion/calendly-steps.png, 2026-11-05; Marco's quality bar is calendly.com).
// Borrowed: the big rounded sand frame, centred eyebrow + heading + paragraph + one button, and four tall cards
// where the active step is wider and shows real product UI on a gradient, the others are narrow with soft shapes.
// Only the colours are translated to Mindforward's brown, sand and coral. Example data is marked.
// Motion versions (Marco 2026-11-05, "animationer på kort og grafiske elementer"); without `motion` nothing changes:
// "a" · Gennemgang (Calendly): the cards take turns being open every 4.5 s, with a coral progress line on the open
//       card; it stops as soon as you point at or focus a card. Desktop only (on phones all cards are open).
// "b" · Kortene kommer ind: on scroll the four cards rise in one after the other and the soft arches grow up from the
//       bottom; then the first card's product UI slides up.
// The UI boxes themselves animate through the page-level UI mode (uiMotion.tsx): the invite counts up to 9 of 12,
// the lesson bar fills, the score ring draws to 86 and the checks tick in, the team bars grow and the badge pops in.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appLinks } from "@/lib/app";
import { gsap, useGSAP, motionQuery } from "@/lib/gsap";
import { UiStage, Count, useUiMode } from "@/components/lab/uiMotion";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6", sand: "#f3eee8", frame: "#efe9e2" };

type Step = { t: string; d: string; rows: { icon: string; text: string }[]; ui: React.ReactNode; tint: string };

function Row({ icon, text, last }: { icon: string; text: string; last?: boolean }) {
  return (
    <li className="relative flex items-center gap-3 py-[5px] text-[0.9375rem]" style={{ color: c.muted }}>
      <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-[7px] text-[12px]" style={{ background: c.coralSoft, color: "#8a3420" }}>{icon}</span>
      {!last && <span aria-hidden className="absolute left-3 top-[28px] h-[12px] w-px" style={{ background: "#e6d8cf" }} />}
      {text}
    </li>
  );
}

/* Small product UI pieces, one per step (example data) */
const UiInvite = (
  <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_-12px_rgba(32,22,19,0.35)]">
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-[10px] text-[15px] font-bold text-white" style={{ background: c.dark }}>M</span>
      <div className="leading-tight"><p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Mindforward</p><p className="text-[0.75rem]" style={{ color: c.muted }}>til Kundeservice (12)</p></div>
    </div>
    <p className="mt-3 text-[0.875rem]" style={{ color: c.ink }}>Du er inviteret til AI på arbejdet. Første lektion tager 10 minutter.</p>
    <div className="mt-3 flex gap-2">
      <span className="rounded-[9px] px-3 py-1.5 text-[0.8125rem] font-semibold" style={{ background: c.coralSoft, color: "#8a3420" }}>Kom i gang</span>
      <span className="ui-pop rounded-[9px] px-3 py-1.5 text-[0.8125rem] font-medium tabular-nums" style={{ background: c.sand, color: c.muted, ["--d" as string]: "200ms" }}><Count to={9} /> af 12 er med</span>
    </div>
  </div>
);

const UiLesson = (
  <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_-12px_rgba(32,22,19,0.35)]">
    <p className="text-[0.75rem] font-medium" style={{ color: c.muted }}>Lektion 4 af 9 · 10 min</p>
    <p className="mt-1 text-[0.9375rem] font-semibold leading-snug" style={{ color: c.ink }}>Få AI til at stille spørgsmål tilbage</p>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: c.sand }}><div className="ui-fill h-full w-[70%] origin-left rounded-full" style={{ background: c.coral }} /></div>
    <div className="mt-3 flex gap-2 text-[0.75rem] font-medium" style={{ color: c.muted }}>
      {["ChatGPT", "Copilot", "Claude"].map((t, k) => <span key={t} className="ui-pop rounded-full px-2.5 py-1" style={{ background: c.sand, ["--d" as string]: `${500 + k * 90}ms` }}>{t}</span>)}
    </div>
  </div>
);

const UiScore = (
  <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_-12px_rgba(32,22,19,0.35)]">
    <div className="flex items-center gap-3">
      <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden><circle cx="23" cy="23" r="19" fill="none" stroke={c.sand} strokeWidth="5" /><circle className="ui-ring" cx="23" cy="23" r="19" fill="none" stroke={c.coral} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${0.86 * 119.4} 119.4`} transform="rotate(-90 23 23)" /></svg>
      <div className="leading-tight"><p className="text-[1.25rem] font-semibold tabular-nums" style={{ color: c.ink }}><Count to={86} /> <span className="text-[0.8125rem] font-normal" style={{ color: c.muted }}>/ 100</span></p><p className="text-[0.75rem]" style={{ color: c.muted }}>Svar til en kunde</p></div>
    </div>
    <ul className="mt-3 space-y-1 text-[0.8125rem]" style={{ color: c.ink }}>
      <li className="ui-pop" style={{ ["--d" as string]: "700ms" }}>✓ Klar opgave og modtager</li>
      <li className="ui-pop" style={{ ["--d" as string]: "850ms" }}>✓ Længde og tone angivet</li>
      <li className="ui-pop" style={{ color: "#b4462d", ["--d" as string]: "1000ms" }}>! Sig, hvorfor den er forsinket</li>
    </ul>
  </div>
);

const UiTeam = (
  <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_-12px_rgba(32,22,19,0.35)]">
    <div className="flex items-center justify-between"><p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Holdet</p><span className="text-[0.75rem]" style={{ color: c.muted }}>Eksempel</span></div>
    {[["Sofie Lund", 92], ["Mads Holm", 86], ["Ida Brandt", 79]].map(([n, s]) => (
      <div key={n as string} className="mt-2.5 grid grid-cols-[1fr_70px_24px] items-center gap-2 text-[0.8125rem]" style={{ color: c.ink }}>
        <span>{n}</span>
        <span className="h-1.5 overflow-hidden rounded-full" style={{ background: c.sand }}><span className="ui-fill block h-full origin-left rounded-full" style={{ width: `${s}%`, background: c.dark }} /></span>
        <span className="text-right font-semibold">{s}</span>
      </div>
    ))}
    <p className="ui-badge mt-3 inline-flex rounded-[9px] px-2.5 py-1 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: "#8a3420" }}>Kursusbevis klar · 9 af 12</p>
  </div>
);

const steps: Step[] = [
  { t: "Inviter", d: "Opret holdet, og send ét link til kollegerne. Ingen skal installere noget.", rows: [{ icon: "+", text: "Du opretter holdet Kundeservice" }, { icon: "@", text: "12 kolleger får et link på mail" }, { icon: "✓", text: "9 har sagt ja inden frokost" }], ui: UiInvite, tint: "linear-gradient(160deg, #fbe1d7 0%, #f6c9b6 45%, #e8664a 120%)" },
  { t: "Lær", d: "Ti minutter om dagen på dansk, i det værktøj I bruger.", rows: [{ icon: "▶", text: "En kort video og tekst på dansk" }, { icon: "◷", text: "Ti minutter, også på mobilen" }, { icon: "◎", text: "ChatGPT, Copilot eller Claude" }], ui: UiLesson, tint: "linear-gradient(160deg, #f3eee8 0%, #f6c9b6 70%, #f0a487 120%)" },
  { t: "Øv", d: "Hver lektion slutter med en opgave fra jeres egen hverdag.", rows: [{ icon: "✎", text: "Du skriver prompten selv" }, { icon: "86", text: "En score fra 0 til 100" }, { icon: "!", text: "Feedback på det, der mangler" }], ui: UiScore, tint: "linear-gradient(160deg, #f6c9b6 0%, #e8664a 90%, #b4462d 140%)" },
  { t: "Følg op", d: "Du ser holdets fremskridt, og alle får et kursusbevis.", rows: [{ icon: "▦", text: "Holdets score og hvem der er med" }, { icon: "↗", text: "Rapport til ledelsen" }, { icon: "◈", text: "Kursusbevis med QR-kode" }], ui: UiTeam, tint: "linear-gradient(160deg, #efe9e2 0%, #d9c3b6 70%, #5a4a44 140%)" },
];

// Soft arch shapes for the collapsed cards (Calendly uses abstract gradient arches; ours in peach and sand).
function Shapes({ tint }: { tint: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] overflow-hidden">
      <div data-arch className="absolute -left-6 bottom-0 h-[78%] w-[62%] origin-bottom rounded-t-full opacity-60" style={{ background: tint }} />
      <div data-arch className="absolute right-0 top-0 h-full w-[46%] origin-bottom rounded-tl-[999px] opacity-40" style={{ background: tint }} />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-white/70 to-transparent" />
    </div>
  );
}

const motionCss = `
  @keyframes scProg { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .sc-prog { animation: scProg var(--dur) linear both; }
  @media (prefers-reduced-motion: reduce) { .sc-prog { animation: none !important; } }
`;
const CYCLE = 4500;

export function StartCalendly({ motion }: { motion?: "a" | "b" } = {}) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const uiMode = useUiMode();
  // The page-level "loop" UI mode also makes the cards take turns, like motion "a".
  if (uiMode === "loop" && !motion) motion = "a";
  // On phones every card is open, so each UI box plays on its own instead of following the open card.
  const [desktop, setDesktop] = useState(true);
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); setDesktop(m.matches); const f = () => setDesktop(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  // "a": auto-advance while the section is on screen and nobody has pointed at a card yet.
  const [auto, setAuto] = useState(motion === "a");
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (motion === "a") setAuto(true); }, [motion]);
  useEffect(() => {
    if (motion !== "a") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || innerWidth < 1024) { setAuto(false); return; }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.4 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, [motion]);
  useEffect(() => {
    if (!auto || !seen) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), CYCLE);
    return () => clearTimeout(t);
  }, [auto, seen, active]);
  const pick = (i: number) => { setAuto(false); setActive(i); };
  // "b": cards rise in one by one, arches grow, then the open card's UI slides up.
  useGSAP(() => {
    if (motion !== "b") return;
    const mm = gsap.matchMedia();
    mm.add(motionQuery, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: q("ol")[0], start: "top 80%", once: true }, defaults: { ease: "expo.out" } });
      tl.from(q("ol > li"), { y: 90, opacity: 0, rotate: (i: number) => [-2, 1.5, -1, 2][i], duration: 1.1, stagger: 0.12 })
        .from(q("[data-arch]"), { scaleY: 0, duration: 1.2, stagger: 0.05 }, 0.35)
        .from(q("[data-ui-on]"), { y: 40, opacity: 0, duration: 0.9 }, 0.6);
    });
  }, { scope: root, dependencies: [motion] });
  return (
    <section ref={root} style={{ background: c.sand }}>
      {motion === "a" && <style>{motionCss}</style>}
      <div className="w-full px-5 py-14 sm:px-[3.5vw] lg:py-16">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em]" style={{ color: c.ink }}>Kom i gang</p>
          <h2 data-display className="mt-4 text-[clamp(2.25rem,1.5rem+2.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]" style={{ color: c.ink }}>
            Fra invitation til første score på en uge
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>
            AI-træning plejer at drukne i hverdagen. Mindforward deler den op i fire små trin, så hele holdet kommer i gang uden kursusdage og uden at nogen skal installere noget.
          </p>
          <Link href={appLinks.startBusiness} data-btn="primary" className="mt-6 inline-flex h-12 items-center rounded-[12px] px-6 text-[1rem] font-semibold transition-[filter] hover:brightness-110" style={{ background: c.dark, color: "#fff" }}>
            Start et kursus
          </Link>
        </div>

        {/* Four tall cards. Desktop: hover or focus widens a card and reveals its product UI. Phones: all open, stacked. */}
        <ol className="mt-10 flex flex-col gap-4 lg:h-[29rem] lg:flex-row lg:gap-5">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <li
                key={s.t}
                tabIndex={0}
                onMouseEnter={() => (motion === "a" ? pick(i) : setActive(i))}
                onFocus={() => (motion === "a" ? pick(i) : setActive(i))}
                className="relative min-w-0 overflow-hidden rounded-[28px] bg-white outline-none transition-[flex-grow,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-[#e8664a] lg:basis-0"
                style={{ flexGrow: on ? 1.75 : 1, boxShadow: on ? "0 30px 60px -30px rgba(32,22,19,0.35)" : "none" }}
              >
                {motion === "a" && auto && on && (
                  <span aria-hidden key={`p${active}`} className="sc-prog absolute inset-x-0 top-0 z-10 hidden h-[3px] origin-left lg:block" style={{ background: c.coral, ["--dur" as string]: `${CYCLE}ms`, animationPlayState: seen ? "running" : "paused" }} />
                )}
                <div className="p-7 lg:p-8">
                  <h3 className="text-[1.875rem] font-semibold tracking-[-0.03em]" style={{ color: c.ink }}>{s.t}</h3>
                  <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{s.d}</p>
                  <ul className={`mt-3 transition-opacity duration-300 lg:absolute lg:w-[24rem] ${on ? "opacity-100 delay-150" : "lg:pointer-events-none lg:opacity-0"}`}>
                    {s.rows.map((r, k) => <Row key={r.text} icon={r.icon} text={r.text} last={k === s.rows.length - 1} />)}
                  </ul>
                </div>
                {/* Bottom: the product UI on a gradient when active, soft shapes when collapsed */}
                <div className={`relative h-[15rem] transition-opacity duration-500 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[39%] ${on ? "opacity-100" : "lg:opacity-0"}`} style={{ background: s.tint }}>
                  <div className="absolute inset-x-6 bottom-5 top-5 flex items-center lg:inset-x-8">
                    <div data-ui-on={on || undefined} className={`w-full max-w-[21rem] transition-transform duration-500 ${on ? "translate-y-0" : "lg:translate-y-6"}`}>
                      {/* The UI box plays each time its card opens (page-level UI mode; static when off) */}
                      <UiStage active={desktop ? on : undefined}>{s.ui}</UiStage>
                    </div>
                  </div>
                </div>
                <div className={`hidden transition-opacity duration-500 lg:block ${on ? "opacity-0" : "opacity-100"}`}><Shapes tint={s.tint} /></div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export { UiInvite, UiLesson, UiScore, UiTeam };
