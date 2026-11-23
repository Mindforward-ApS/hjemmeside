"use client";

// Øvemiljøet, three versions (Marco 2026-11-10: "virkelig grim … 3 versioner … placeholders i boksene … leg med
// venstre højre placering"). Same approved copy in all three; screenshots of the øvemiljø are placeholders for now.
// A · Billede venstre: dark band, big screenshot box left, label + heading + text + three steps right.
// B · Tekst venstre, kort højre: light, heading and steps left, a tall card right with screenshot, score and feedback.
// C · Delt i tre: light, centred heading, then step cards left and right of a big screenshot in the middle.
import { GrebBtn } from "@/components/ui/GrebBtn";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/lab/Forside2";
import { OevemiljoeSkaerm } from "@/components/lab/Oevelse";

const c = { ink: "#201613", cta: "linear-gradient(90deg, #fb970a, #f8400a)" /* M logo gradient, Marco 2026-11-23 */, muted: "#6b625d", coral: "#e8664a", coralText: "#b8452c", page: "#f5f2ef", dark: "#201613", line: "rgba(32,22,19,0.1)" };
const wrap = "w-full px-5 sm:px-[3.5vw]";
const head = "font-[family-name:var(--font-geist)] !font-semibold tracking-[-0.045em]";
const h2 = `${head} text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143]`;
const HEAD = "Øv på dine egne opgaver";
const PARA = "Du lærer ikke AI ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.";
const steps = [
  { n: "01", icon: "mail" as const, t: "En opgave fra din hverdag", d: "Mails, referater og tilbud, som dem du laver i forvejen." },
  { n: "02", icon: "form" as const, t: "Du skriver prompten selv", d: "Du lærer ved at gøre det, ikke ved at se på." },
  { n: "03", icon: "chart" as const, t: "Score og feedback med det samme", d: "Du ser, hvad der virkede, og hvad du kan gøre bedre." },
];

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[0.875rem] font-medium leading-6 ${light ? "text-white" : ""}`} style={light ? undefined : { color: c.ink }}>
      <span aria-hidden className="size-[18px] rounded-[6px]" style={{ background: c.coral }} />{children}
    </p>
  );
}
function Pill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <GrebBtn href={href} onDark>{children}</GrebBtn>
  );
}
function Score({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-[16px] p-5 ${dark ? "bg-white/[0.06]" : "bg-white"}`}>
      <p className={`text-[0.875rem] ${dark ? "text-white/60" : ""}`} style={dark ? undefined : { color: c.muted }}>Din score</p>
      <p className="mt-1 flex items-baseline gap-1"><span className={`${head} text-[3rem] leading-none`} style={{ color: dark ? "#fff" : c.ink }}>86</span><span className={`text-[0.875rem] ${dark ? "text-white/60" : ""}`} style={dark ? undefined : { color: c.muted }}>/ 100</span></p>
      <p className={`mt-3 flex items-start gap-2 text-[0.875rem] leading-snug ${dark ? "text-white/80" : ""}`} style={dark ? undefined : { color: c.ink }}><span style={{ color: c.coral }}>↑</span>Sig også, hvorfor leveringen er forsinket.</p>
    </div>
  );
}

/* A · Billede venstre (dark) */
export function A() {
  return (
    <section id="saadan" className="py-[120px]" style={{ background: c.dark }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-[6vw]`}>
        <div className="relative overflow-hidden rounded-[32px]">
          <Ph label="Skærmbillede: øvemiljøet med en opgave og en prompt" size="1600 × 1200 px" className="aspect-[4/3] w-full" />
          <div className="absolute bottom-5 left-5 w-[15rem] max-w-[calc(100%-2.5rem)]"><Score /></div>
        </div>
        <div>
          <Label light>Øvemiljøet</Label>
          <h2 className={`${h2} mt-4 max-w-[12ch] text-white`}>{HEAD}</h2>
          <p className="mt-6 max-w-[30rem] text-[1rem] leading-6 text-white/70">{PARA}</p>
          <ol className="mt-10 grid gap-6">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <span className="text-[0.875rem] font-semibold" style={{ color: c.coral }}>{s.n}</span>
                <div><p className="text-[1.125rem] font-semibold text-white">{s.t}</p><p className="mt-1 text-[0.9375rem] leading-6 text-white/60">{s.d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-10"><Pill href={appLinks.startBusiness}>Prøv øvemiljøet</Pill></div>
        </div>
      </div>
    </section>
  );
}

/* B · Tekst venstre, kort højre (light) */
export function B() {
  return (
    <section id="saadan" className="py-[120px]">
      <div className={`${wrap} grid items-stretch gap-6 lg:grid-cols-[1fr_1.2fr]`}>
        <div className="flex flex-col rounded-[32px] p-8 sm:p-10" style={{ background: c.dark }}>
          <Label light>Øvemiljøet</Label>
          <h2 className={`${h2} mt-4 max-w-[12ch] text-white`}>{HEAD}</h2>
          <p className="mt-6 max-w-[28rem] text-[1rem] leading-6 text-white/70">{PARA}</p>
          <ul className="mt-auto grid gap-3 pt-12">
            {steps.map((s) => (
              <li key={s.n} className="flex items-center gap-4 rounded-[16px] bg-white/[0.06] p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ background: c.coral, color: c.ink }}><Icon name={s.icon} size={16} /></span>
                <span className="text-[1rem] font-semibold text-white">{s.t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-[32px] p-3" style={{ background: "#ece4df" }}>
            {/* The øvemiljø screen (task, the learner's prompt, the AI's answer); the score sits in its own card below. */}
            <OevemiljoeSkaerm n={999} step={1} className="rounded-[20px]" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Score />
            <div className="flex flex-col justify-between rounded-[16px] bg-white p-5">
              <p className="text-[0.875rem]" style={{ color: c.muted }}>Øv i det værktøj, I bruger</p>
              <div className="mt-4 flex gap-2">
                {["ChatGPT", "Copilot", "Claude"].map((t) => <span key={t} className="rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold" style={{ background: c.page, color: c.ink }}>{t}</span>)}
              </div>
              <div className="mt-6"><Pill href={appLinks.startBusiness}>Prøv øvemiljøet</Pill></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Delt i tre (light): centred heading; steps left and right of a big screenshot */
export function C() {
  const card = (s: (typeof steps)[number]) => (
    <li key={s.n} className="flex flex-col rounded-[24px] bg-white p-7">
      <span className="grid size-11 place-items-center rounded-full" style={{ background: c.page, color: c.ink }}><Icon name={s.icon} size={17} /></span>
      <p className={`${head} mt-10 text-[1.375rem] leading-7 tracking-[-0.5px]`} style={{ color: c.ink }}>{s.t}</p>
      <p className="mt-2 text-[0.9375rem] leading-6" style={{ color: c.muted }}>{s.d}</p>
    </li>
  );
  return (
    <section id="saadan" className="py-[120px]">
      <div className={wrap}>
        <div className="flex flex-col items-center text-center">
          <Label>Øvemiljøet</Label>
          <h2 className={`${h2} mt-4 max-w-[14ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[34rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_2fr_1fr]">
          <ul className="grid gap-5">{card(steps[0])}{card(steps[1])}</ul>
          <div className="relative overflow-hidden rounded-[32px]">
            <Ph label="Skærmbillede: øvemiljøet i ChatGPT, Copilot eller Claude" size="1600 × 1100 px" className="h-full min-h-[22rem] w-full" />
            <div className="absolute right-5 top-5 w-[15rem]"><Score /></div>
          </div>
          <ul className="grid gap-5">
            {card(steps[2])}
            <li className="flex flex-col justify-between rounded-[24px] p-7" style={{ background: c.dark }}>
              <p className={`${head} text-[1.375rem] leading-7 tracking-[-0.5px] text-white`}>Prøv en opgave selv</p>
              <div className="mt-8"><Pill href={appLinks.startBusiness}>Kom i gang</Pill></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
