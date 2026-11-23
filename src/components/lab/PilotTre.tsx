"use client";

// "Bliv en af de første", three versions (Marco 2026-11-10: "lav 3 versioner af næste sektion"). Same approved copy;
// photos are placeholders. A · Tekst venstre, billede højre. B · Mørkt kort venstre, to billeder højre.
// C · Centreret overskrift, fire fordele som kort med billede, knap under.
import Image from "next/image";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/lab/Forside2";

const c = { ink: "#201613", cta: "linear-gradient(90deg, #fb970a, #f8400a)" /* M logo gradient, Marco 2026-11-23 */, muted: "#6b625d", coral: "#e8664a", page: "#f5f2ef", dark: "#201613" };
const wrap = "w-full px-5 sm:px-[3.5vw]";
const head = "font-[family-name:var(--font-geist)] !font-semibold tracking-[-0.045em]";
const h2 = `${head} text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143]`;
const HEAD = "Bliv en af de første";
const PARA = "Vi søger de første danske hold, der vil træne AI med os. Som pilotkunde er I med fra starten og er med til at bestemme, hvad vi bygger.";
const points = [
  { icon: "user" as const, t: "Direkte kontakt til os", d: "I taler med dem, der bygger platformen." },
  { icon: "sparkle" as const, t: "I er med til at forme kurserne", d: "Jeres opgaver og spørgsmål former de næste lektioner." },
  { icon: "check" as const, t: "Ingen binding", d: "I kan stoppe, når I vil." },
  { icon: "lock" as const, t: "Data i EU", d: "Hostet i Frankfurt, med databehandleraftale." },
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
function MailChip() {
  return (
    <a href="mailto:kontakt@mindforward.dk" className="nf-focus flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5">
      <span className="grid size-11 place-items-center rounded-full" style={{ background: c.coral, color: c.ink }}><Icon name="mail" size={16} /></span>
      <span className="leading-tight"><span className="block text-[0.75rem] font-medium uppercase" style={{ color: c.ink }}>Skriv til os</span><span className="text-[1rem] font-semibold" style={{ color: c.ink }}>kontakt@mindforward.dk</span></span>
    </a>
  );
}

/* A · Billede venstre, tekst højre (Marco 2026-11-10: "A men omvendt") */
export function A() {
  return (
    <section id="virksomheder" className="py-[120px]">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[628fr_752fr] lg:gap-0`}>
        <div className="lg:order-2 lg:pl-[8.5vw]">
          <Label>Pilotforløb</Label>
          <h2 className={`${h2} mt-4 max-w-[13ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-8 max-w-[30rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p>
          <ul className="mt-10 grid gap-5">
            {points.map((p) => <li key={p.t} className="flex items-center gap-3 text-[1.25rem] font-semibold tracking-[-0.3px]" style={{ color: c.ink }}><Icon name={p.icon} size={18} />{p.t}</li>)}
          </ul>
          <div className="mt-10"><Pill href="/kontakt">Book 15 min</Pill></div>
        </div>
        <div className="relative overflow-hidden rounded-[32px] lg:order-1">
          <div className="relative aspect-[628/720] w-full"><Image src="/img/unsplash/team.jpg" alt="Et team arbejder sammen ved en laptop" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" /></div>
          <div className="absolute bottom-6 right-6"><MailChip /></div>
        </div>
      </div>
    </section>
  );
}

/* B · Mørkt kort venstre, to billeder højre */
export function B() {
  return (
    <section id="pilot" className="py-[120px]">
      <div className={`${wrap} grid gap-6 lg:grid-cols-[1fr_1fr]`}>
        <div className="flex flex-col rounded-[32px] p-8 sm:p-10" style={{ background: c.dark }}>
          <Label light>Pilotforløb</Label>
          <h2 className={`${h2} mt-4 max-w-[13ch] text-white`}>{HEAD}</h2>
          <p className="mt-6 max-w-[30rem] text-[1rem] leading-6 text-white/70">{PARA}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p.t} className="rounded-[16px] bg-white/[0.06] p-4">
                <span style={{ color: c.coral }}><Icon name={p.icon} size={18} /></span>
                <p className="mt-3 text-[1rem] font-semibold text-white">{p.t}</p>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10"><Pill href="/kontakt">Book 15 min</Pill></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1.4fr_1fr]">
          <Ph label="Billede: et team ved en skærm" size="1400 × 900 px" className="min-h-[16rem] rounded-[32px]" />
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr]">
            <Ph label="Billede: en medarbejder med en laptop" size="900 × 700 px" className="min-h-[13rem] rounded-[32px]" />
            <div className="flex flex-col justify-between rounded-[32px] bg-white p-7">
              <p className={`${head} text-[1.375rem] leading-7 tracking-[-0.5px]`} style={{ color: c.ink }}>Hellere skrive?</p>
              <a href="mailto:kontakt@mindforward.dk" className="nf-focus mt-6 text-[1rem] font-semibold underline underline-offset-4" style={{ color: c.ink }}>kontakt@mindforward.dk</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Centreret overskrift, fire fordele som kort med billede */
export function C() {
  return (
    <section id="pilot" className="py-[120px]">
      <div className={wrap}>
        <div className="flex flex-col items-center text-center">
          <Label>Pilotforløb</Label>
          <h2 className={`${h2} mt-4 max-w-[14ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[34rem] text-[1rem] leading-6" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, k) => (
            <li key={p.t} className="flex flex-col rounded-[24px] bg-white p-2">
              <Ph label={["Billede: et møde med os", "Billede: en workshop", "Billede: en der lukker laptoppen", "Billede: et serverrum eller en lås"][k]} size="800 × 600 px" className="aspect-[4/3] rounded-[18px]" />
              <div className="p-5">
                <p className={`${head} text-[1.25rem] leading-7 tracking-[-0.4px]`} style={{ color: c.ink }}>{p.t}</p>
                <p className="mt-2 text-[0.9375rem] leading-6" style={{ color: c.muted }}>{p.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Pill href="/kontakt">Book 15 min</Pill>
          <a href="mailto:kontakt@mindforward.dk" className="nf-focus text-[1rem] font-semibold underline underline-offset-4" style={{ color: c.ink }}>Eller skriv til kontakt@mindforward.dk</a>
        </div>
      </div>
    </section>
  );
}
