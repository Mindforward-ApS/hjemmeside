"use client";

// "Øv på dine egne opgaver" as a split section (Marco 2026-11-10): two small labels, a big bold heading that ends
// in coral, one button; the øvemiljø window on the right (prompt types, answer, score 86); three points underneath.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appLinks } from "@/lib/app";
import { Icon } from "@/components/ui/Icon";
import { OevemiljoeSkaerm } from "@/components/lab/Oevelse";

const c = { ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralText: "#b8452c", coralSoft: "#fbe1d7", cream: "#f7f2ee" };
const PROMPT_LEN = 146;

const points = [
  { icon: "mail" as const, t: "En opgave fra din hverdag", d: "Mails, referater og tilbud, som dem du laver i forvejen." },
  { icon: "form" as const, t: "Du skriver prompten selv", d: "Du lærer ved at gøre det, ikke ved at se på." },
  { icon: "chart" as const, t: "Score og feedback med det samme", d: "Du ser, hvad der virkede, og hvad du kan gøre bedre." },
];

// Loops while on screen: type the prompt, show the answer, show the score, hold, start over. Static under reduced motion.
function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(PROMPT_LEN);
  const [step, setStep] = useState(2);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;
    const clear = () => { timers.forEach(clearTimeout); timers = []; if (iv) clearInterval(iv); };
    const run = () => {
      clear(); setN(0); setStep(0);
      let k = 0;
      iv = setInterval(() => { k += 3; setN(Math.min(k, PROMPT_LEN)); if (k >= PROMPT_LEN) { clearInterval(iv); timers.push(setTimeout(() => setStep(1), 500), setTimeout(() => setStep(2), 1700), setTimeout(run, 6500)); } }, 40);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); else { clear(); setN(PROMPT_LEN); setStep(2); } }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clear(); };
  }, []);
  return { ref, n, step };
}

export function OevKort() {
  const { ref, n, step } = useLoop();
  return (
    <section id="saadan" className="py-16 sm:py-24" style={{ background: c.cream }}>
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md border px-2.5 py-1 text-[0.75rem] font-semibold" style={{ borderColor: c.coral, color: c.coralText }}>Øvemiljø</span>
                <span className="rounded-md px-2.5 py-1 text-[0.75rem] font-medium" style={{ background: c.coralSoft, color: "#8a3420" }}>ChatGPT · Copilot · Claude</span>
              </div>
              <h2 className="mt-5 text-[clamp(2rem,1.4rem+2vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.025em]" style={{ color: c.ink }}>
                Øv på dine egne opgaver, og få <span style={{ color: c.coralText }}>feedback med det samme.</span>
              </h2>
              <Link href={appLinks.startBusiness} className="nf-focus nf-press mt-8 inline-flex h-12 items-center rounded-[10px] px-6 text-[0.9375rem] font-semibold transition-[filter] hover:brightness-105" style={{ background: c.coral, color: c.ink }}>Tilmeld jer</Link>
            </div>
            <div ref={ref} className="relative">
              <div aria-hidden className="absolute -inset-10 -z-0 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(50% 50% at 70% 70%, rgba(232,102,74,0.28), transparent 70%)" }} />
              <div aria-hidden className="absolute -bottom-8 -right-8 h-40 w-56 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(32,22,19,0.18) 1px, transparent 1.2px)", backgroundSize: "12px 12px" }} />
              <div className="relative rounded-[22px] bg-white/70 p-2.5 shadow-[0_30px_80px_-30px_rgba(32,22,19,0.35)] ring-1 ring-black/5 backdrop-blur">
                <OevemiljoeSkaerm n={n} step={step} className="rounded-[14px] ring-1 ring-black/5" />
              </div>
            </div>
          </div>
          <ul className="mt-14 grid gap-8 sm:grid-cols-3 lg:mt-16">
            {points.map((p) => (
              <li key={p.t} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white" style={{ color: c.coralText }}><Icon name={p.icon} size={17} /></span>
                <div>
                  <p className="text-[1rem] font-semibold" style={{ color: c.ink }}>{p.t}</p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
