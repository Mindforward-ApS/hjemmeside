"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowCounterClockwiseIcon, CheckIcon, CircleIcon, SparkleIcon } from "@phosphor-icons/react";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { appLinks } from "@/lib/app";

// Øvemiljøet you can try on the page (Marco 2026-11-24, preview): one real task, the visitor writes the prompt, and
// gets a score and feedback straight away. The check runs in the browser on five things a good prompt has; in the
// platform the feedback comes from the AI on your own tasks, which the small note under the result says.
const ink = "#201613";
const muted = "#6b625d";
const line = "rgba(32,22,19,0.1)";
const accent = "#f8580a";
const head = "font-[family-name:var(--font-geist)] !font-semibold tracking-[-0.045em]";

const TASK = "En kunde har skrevet, at deres levering er tre dage forsinket, og de er sure. Skriv en prompt, der får AI til at lave et godt svar til kunden.";
const EXAMPLE = "Du er kundeservice i en dansk webshop. Skriv et kort og venligt svar til en kunde, hvis levering er tre dage forsinket. Sig undskyld, forklar at pakken nu er sendt, giv den nye leveringsdato, og tilbyd fri fragt næste gang. Maks. fem sætninger.";

const checks = [
  { t: "Rolle", tip: "Fortæl AI, hvem den er, fx \"Du er kundeservice i …\".", re: /\b(du er|som (en )?(kunde|medarbejder|service)|kundeservice|i rollen)/i },
  { t: "Klar opgave", tip: "Sig præcis, hvad den skal lave, fx \"Skriv et svar til kunden\".", re: /\b(skriv|lav|formulér|formuler|svar)/i },
  { t: "Tone", tip: "Bed om en tone, fx \"venligt og roligt\".", re: /\b(venlig|venligt|høflig|høfligt|rolig|roligt|empati|tone|imødekommende|professionel)/i },
  { t: "Fakta fra sagen", tip: "Giv den detaljerne: forsinkelsen, ny dato, hvad I gør ved det.", re: /\b(forsink|dage|dato|levering|pakke|undskyld|kompens|rabat|fragt)/i },
  { t: "Længde eller format", tip: "Sig, hvor langt svaret må være, fx \"maks. fem sætninger\".", re: /\b(kort|maks|højst|sætning|linjer|ord|afsnit|punkter)/i },
];

export function OevDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<boolean[] | null>(null);
  const score = result ? Math.round((result.filter(Boolean).length / checks.length) * 100) : 0;

  function check(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (t.length < 10) return;
    setResult(checks.map((c) => c.re.test(t)));
  }
  function reset() { setResult(null); setText(""); }

  const verdict = score >= 80 ? "Stærk prompt. Den her giver et svar, du kan sende." : score >= 40 ? "God start. Tilføj det, der mangler, og prøv igen." : "Prompten er for åben. AI gætter på det meste.";

  return (
    <section id="saadan" className="py-[120px]">
      <div className="grid w-full items-center gap-12 px-5 sm:px-[3.5vw] lg:grid-cols-[1fr_1.25fr] lg:gap-[5vw]">
        <div>
          <SectionLabel>Øvemiljøet</SectionLabel>
          <h2 className={`${head} mt-4 max-w-[14ch] text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143]`} style={{ color: ink }}>Øv på dine egne opgaver</h2>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.6]" style={{ color: muted }}>Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave, hvor du skriver prompten selv og får feedback med det samme.</p>
          <ol className="mt-10 grid max-w-[30rem] gap-5">
            {["Læs opgaven", "Skriv din prompt", "Få score og feedback"].map((s, i) => (
              <li key={s} className="flex items-center gap-4 text-[1.125rem] font-semibold tracking-[-0.2px]" style={{ color: ink }}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full text-[0.875rem] tabular-nums" style={{ background: "#f3eee7", color: ink }}>{i + 1}</span>{s}
              </li>
            ))}
          </ol>
          <div className="mt-10"><GrebBtn href={appLinks.startBusiness}>Prøv øvemiljøet</GrebBtn></div>
        </div>

        {/* The demo window: the product itself, so it keeps a frame. */}
        <div data-mind="peek" data-mind-x="0.85" className="overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,0.08),0_2px_4px_rgba(32,22,19,0.04),0_30px_60px_-30px_rgba(32,22,19,0.35)]">
          <div className="flex items-center justify-between gap-4 border-b px-6 py-4" style={{ borderColor: line }}>
            <p className="text-[0.875rem] font-semibold" style={{ color: ink }}>Opgave · Kundeservice</p>
            <span className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold" style={{ background: "#f3eee7", color: ink }}>
              <Image src="/logos/chatgpt.png" alt="" width={16} height={16} className="size-4" />ChatGPT
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em]" style={{ color: muted }}>Opgaven</p>
            <p className="mt-2 text-[1.125rem] leading-[1.55]" style={{ color: ink }}>{TASK}</p>

            {!result ? (
              <form onSubmit={check} className="mt-6">
                <label htmlFor="oev-prompt" className="sr-only">Din prompt</label>
                <textarea id="oev-prompt" value={text} onChange={(e) => setText(e.target.value)} rows={5} maxLength={1200} placeholder="Skriv din prompt her …"
                  className="w-full resize-none rounded-[14px] border px-4 py-3.5 text-[1rem] leading-[1.55] outline-none transition placeholder:text-[#8a7f79] focus:border-[#f8400a] focus:ring-2 focus:ring-[#f8400a]/20"
                  style={{ borderColor: "#e3ddd7", background: "#fbf9f6", color: ink }} />
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <GrebBtn disabled={text.trim().length < 10}>Få feedback</GrebBtn>
                  <button type="button" onClick={() => setText(EXAMPLE)} className="nf-focus text-[0.9375rem] font-semibold underline decoration-[rgba(32,22,19,0.3)] underline-offset-4 hover:decoration-current" style={{ color: ink }}>Se et eksempel</button>
                </div>
              </form>
            ) : (
              <div className="mt-6" aria-live="polite">
                <div className="flex items-center gap-5 rounded-[16px] p-5" style={{ background: "#fbf9f6" }}>
                  <Ring value={score} />
                  <div>
                    <p className="text-[0.875rem]" style={{ color: muted }}>Din score</p>
                    <p className={`${head} text-[1.25rem] leading-snug`} style={{ color: ink }}>{verdict}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3">
                  {checks.map((c, i) => (
                    <li key={c.t} className="flex items-start gap-3 text-[0.9375rem] leading-6">
                      {result[i]
                        ? <CheckIcon size={18} weight="bold" aria-hidden className="mt-[3px] shrink-0" style={{ color: accent }} />
                        : <CircleIcon size={18} weight="bold" aria-hidden className="mt-[3px] shrink-0" style={{ color: "#c9bfb8" }} />}
                      <span style={{ color: ink }}><b className="font-semibold">{c.t}</b>{result[i] ? "" : <span style={{ color: muted }}> · {c.tip}</span>}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => setResult(null)} className="greb-btn greb-btn--light"><span>Ret din prompt</span></button>
                  <button type="button" onClick={reset} className="nf-focus inline-flex items-center gap-2 text-[0.9375rem] font-semibold" style={{ color: ink }}><ArrowCounterClockwiseIcon size={16} weight="bold" aria-hidden />Start forfra</button>
                </div>
                <p className="mt-6 flex items-start gap-2 border-t pt-5 text-[0.8125rem] leading-5" style={{ borderColor: line, color: muted }}>
                  <SparkleIcon size={15} weight="bold" aria-hidden className="mt-[2px] shrink-0" />I platformen får du feedback fra AI på jeres egne opgaver, og du ser det svar, din prompt giver.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ring({ value }: { value: number }) {
  const r = 26, len = 2 * Math.PI * r;
  return (
    <span className="relative grid size-[68px] shrink-0 place-items-center">
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="#ece5dd" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - value / 100)} className="transition-[stroke-dashoffset] duration-700 ease-out" />
      </svg>
      <span className={`${head} text-[1.25rem] tabular-nums`} style={{ color: ink }}>{value}</span>
    </span>
  );
}
