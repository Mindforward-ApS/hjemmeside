"use client";

// Three new versions of "Mindforward i tal" (Marco 2026-11-03: "3 versioner af alle sektioner … flotte kort med grafer").
// Same heading, paragraph and the same four facts as Stats() in NyForside: 10 min, 3 værktøjer, 1–2 timer, 69 kr.
// No new claims. Product UI inside cards is marked "Eksempel". Numbers are in the HTML from the start; count-ups and
// fills only run when motion is allowed, and they write to the DOM directly (no setState in effects).
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", peach: "#f6c9b6", sand: "#efe7e1", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Mindforward i tal";
const PARA = "Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.";
const tools = [
  { n: "ChatGPT", s: "/logos/chatgpt.png" },
  { n: "Copilot", s: "/logos/copilot.png" },
  { n: "Claude", s: "/logos/claude.png" },
];
const reduced = () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Runs once when the element is 25 % in view. Skipped under reduced motion. */
function useOnView<T extends Element>(run: (el: T) => void) {
  const ref = useRef<T>(null);
  const fn = useRef(run);
  useEffect(() => {
    fn.current = run;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); fn.current(el); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* A number that counts up from 0 to its own value. Shows the final value without JS or with reduced motion. */
function Count({ to, className = "" }: { to: number; className?: string }) {
  const ref = useOnView<HTMLSpanElement>((el) => {
    const t0 = performance.now(), d = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / d);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  });
  return <span ref={ref} className={`tabular-nums ${className}`}>{to}</span>;
}

/* Children with [data-grow] scale in from 0 on their own axis when the block comes into view. */
function Grow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useOnView<HTMLDivElement>((el) => {
    el.querySelectorAll<HTMLElement>("[data-grow]").forEach((g, i) => {
      g.animate([{ transform: g.dataset.grow === "y" ? "scaleY(0)" : "scaleX(0)" }, { transform: "none" }], { duration: 1100, delay: i * 70, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" });
    });
    el.querySelectorAll<SVGCircleElement>("[data-ring]").forEach((r) => {
      const len = Number(r.dataset.ring);
      r.animate([{ strokeDashoffset: String(len) }, { strokeDashoffset: r.style.strokeDashoffset || "0" }], { duration: 1500, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" });
    });
  });
  return <div ref={ref} className={className}>{children}</div>;
}

function Head({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-4">
      <h2 className={`${h2} ${dark ? "!text-white" : ""}`} style={{ color: dark ? "#fff" : c.ink }}>{HEAD}</h2>
      <p className="max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.7)" : c.muted }}>{PARA}</p>
    </div>
  );
}

function ToolTile({ t, dark = false }: { t: (typeof tools)[number]; dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-[0.875rem] font-medium ${dark ? "bg-white/[0.07] text-white ring-1 ring-white/10" : "bg-white"}`} style={dark ? undefined : { color: c.ink }}>
      <Image src={t.s} alt="" width={24} height={24} className="size-6 rounded-[6px]" />{t.n}
    </span>
  );
}

/* ——— A · Instrumentbræt: four product-style cards, each fact drawn as its own small graph. ——— */
export function A() {
  const R = 52, L = 2 * Math.PI * R;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <Head />
        <Grow className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* 10 min: a lesson timer that runs to full */}
          <div className="flex items-center gap-6 rounded-[24px] p-6 sm:p-8 lg:col-span-4 lg:flex-col lg:items-start" style={{ background: c.cream }}>
            <div className="relative size-[7.5rem] shrink-0 sm:size-[9rem] lg:size-[11.5rem]">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
                <circle cx="60" cy="60" r={R} fill="none" stroke={c.sand} strokeWidth="10" />
                {Array.from({ length: 10 }, (_, k) => <line key={k} x1="60" y1="2" x2="60" y2="7" stroke="rgba(32,22,19,0.25)" strokeWidth="1.5" transform={`rotate(${k * 36} 60 60)`} />)}
                <circle data-ring={L} cx="60" cy="60" r={R} fill="none" stroke={c.coral} strokeWidth="10" strokeLinecap="round" strokeDasharray={L} style={{ strokeDashoffset: 0 }} />
              </svg>
              <p className="absolute inset-0 grid place-items-center text-center text-[2.5rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3rem] lg:text-[3.75rem]" style={{ color: c.ink }}>
                <span><Count to={10} /><span className="block text-[0.875rem] font-medium tracking-normal" style={{ color: c.muted }}>min</span></span>
              </p>
            </div>
            <div className="lg:mt-auto">
              <p className="max-w-[16rem] text-[0.875rem] leading-snug" style={{ color: c.muted }}>pr. lektion, så det passer ind i en travl dag</p>
            </div>
          </div>

          {/* 3 værktøjer: the three tools as equal tiles on dark */}
          <div className="flex flex-col rounded-[24px] p-6 text-white sm:p-8 lg:col-span-4" style={{ background: "linear-gradient(160deg, #33231f 0%, #201613 70%)" }}>
            <p className="text-[3.25rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.75rem]"><Count to={3} /><span className="ml-2 text-[1rem] font-semibold tracking-normal" style={{ color: c.peach }}>værktøjer</span></p>
            <div className="mt-6 grid gap-2">{tools.map((t) => <ToolTile key={t.n} t={t} dark />)}</div>
            <p className="mt-6 text-[0.875rem] leading-snug text-white/65 lg:mt-auto lg:pt-6">ChatGPT, Copilot og Claude, side om side</p>
          </div>

          {/* 69 kr: a price tag card */}
          <div className="relative flex flex-col overflow-hidden rounded-[24px] p-6 sm:p-8 lg:col-span-4" style={{ background: "linear-gradient(140deg, #fbd5c4 0%, #f6b49b 60%, #f9e4d8 100%)" }}>
            <span className="self-start rounded-full bg-white/70 px-3 py-1 text-[0.75rem] font-medium" style={{ color: c.ink }}>Ingen binding</span>
            <p className="mt-6 text-[4.5rem] font-semibold leading-none tracking-[-0.05em] sm:text-[5.5rem]" style={{ color: c.ink }}><Count to={69} /><span className="ml-2 text-[1.125rem] font-semibold tracking-normal" style={{ color: "rgba(32,22,19,0.6)" }}>kr</span></p>
            <p className="mt-auto max-w-[15rem] pt-6 text-[0.875rem] leading-snug" style={{ color: "#4a3a34" }}>pr. bruger pr. måned, ingen binding</p>
          </div>

          {/* 1–2 timer: a whole course as a row of 10-minute lessons */}
          <div className="rounded-[24px] border p-6 sm:p-8 lg:col-span-12" style={{ borderColor: c.line }}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[3.25rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.75rem]" style={{ color: c.ink }}>1–2<span className="ml-2 text-[1rem] font-semibold tracking-normal" style={{ color: "rgba(32,22,19,0.6)" }}>timer</span></p>
                <p className="mt-2 text-[0.875rem]" style={{ color: c.muted }}>for et helt kursus, fordelt på korte lektioner</p>
              </div>
              <span className="rounded-full px-3 py-1 text-[0.75rem] font-medium" style={{ background: c.cream, color: c.muted }}>Eksempel · 9 lektioner à 10 min</span>
            </div>
            <div className="mt-6 grid grid-cols-9 gap-1.5 sm:gap-2">
              {Array.from({ length: 9 }, (_, k) => (
                <div key={k} className="grid gap-2">
                  <div className="h-10 overflow-hidden rounded-[8px] sm:h-12" style={{ background: c.sand }}>
                    <div data-grow="y" className="h-full origin-bottom rounded-[8px]" style={{ background: k < 6 ? c.dark : k === 6 ? c.coral : "transparent" }} />
                  </div>
                  <span className="text-center text-[0.6875rem] tabular-nums" style={{ color: c.muted }}>{k + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </Grow>
      </div>
    </section>
  );
}

/* ——— B · Mørk tavle: huge Bebas numbers on dark, split by hairlines, each with one quiet micro-graphic. ——— */
export function B() {
  const cols: { n: React.ReactNode; u: string; d: string; g: React.ReactNode }[] = [
    {
      n: <Count to={10} />, u: "min", d: "pr. lektion, så det passer ind i en travl dag",
      g: <div className="flex h-8 items-end gap-1" aria-hidden>{Array.from({ length: 10 }, (_, k) => <span key={k} data-grow="y" className="w-1.5 origin-bottom rounded-full" style={{ height: `${40 + k * 6}%`, background: k === 9 ? c.coral : "rgba(255,255,255,0.28)" }} />)}</div>,
    },
    {
      n: <Count to={3} />, u: "værktøjer", d: "ChatGPT, Copilot og Claude, side om side",
      g: <div className="flex -space-x-2" aria-hidden>{tools.map((t) => <span key={t.n} className="grid size-9 place-items-center rounded-full bg-white ring-2 ring-[#201613]"><Image src={t.s} alt="" width={20} height={20} className="size-5 rounded-[5px]" /></span>)}</div>,
    },
    {
      n: "1–2", u: "timer", d: "for et helt kursus, fordelt på korte lektioner",
      g: <div className="flex h-8 w-full max-w-[12rem] items-center gap-1" aria-hidden>{Array.from({ length: 9 }, (_, k) => <span key={k} data-grow="x" className="h-2 flex-1 origin-left rounded-full" style={{ background: k < 6 ? c.peach : "rgba(255,255,255,0.18)" }} />)}</div>,
    },
    {
      n: <Count to={69} />, u: "kr", d: "pr. bruger pr. måned, ingen binding",
      g: <span className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.75rem] font-medium" style={{ background: "rgba(246,201,182,0.14)", color: c.peach }}><Icon name="check" size={12} />Ingen binding</span>,
    },
  ];
  return (
    <section className="py-24 text-white lg:py-32" style={{ background: c.dark }}>
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <h2 className={`${h2} !text-white`}>{HEAD}</h2>
          <p className="max-w-[24rem] text-[1rem] leading-relaxed text-white/65 lg:text-right">{PARA}</p>
        </div>
        <Grow className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((x, k) => (
            <div key={x.u} className={`flex flex-col gap-5 border-b border-white/15 py-8 sm:px-6 lg:border-b-0 lg:py-4 ${k > 0 ? "lg:border-l" : "lg:pl-0"} ${k % 2 === 1 ? "sm:border-l lg:border-l" : "sm:pl-0"}`}>
              <p className={`${display} text-[6.5rem] leading-[0.85] sm:text-[7.5rem] lg:text-[8.5rem]`}>{x.n}<span className="ml-2 align-top text-[1.75rem] leading-none" style={{ color: c.peach }}>{x.u}</span></p>
              <div className="h-9">{x.g}</div>
              <p className="max-w-[15rem] text-[0.9375rem] leading-snug text-white/65">{x.d}</p>
            </div>
          ))}
        </Grow>
      </div>
    </section>
  );
}

/* ——— C · Tallene i ét kursus: the four facts as a list on the left, and on the right one course card that shows
   them in use (example): 10-minute lessons, the three tools, 1–2 hours in total and the price. ——— */
export function C() {
  const rows = [
    { n: "10", u: "min", d: "pr. lektion, så det passer ind i en travl dag", to: 10 },
    { n: "3", u: "værktøjer", d: "ChatGPT, Copilot og Claude, side om side", to: 3 },
    { n: "1–2", u: "timer", d: "for et helt kursus, fordelt på korte lektioner" },
    { n: "69", u: "kr", d: "pr. bruger pr. måned, ingen binding", to: 69 },
  ];
  const mods = [
    { t: "Prompting", tool: tools[0], done: true },
    { t: "AI til mails og referater", tool: tools[1], done: true },
    { t: "Datasikkerhed og GDPR", tool: tools[2], done: true },
    { t: "Faktatjek af AI-svar", tool: tools[0], done: false },
  ];
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20`}>
        <div>
          <Head />
          <dl className="mt-10 border-t" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
            {rows.map((r) => (
              <div key={r.u} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b py-5 sm:grid-cols-[10rem_1fr]" style={{ borderColor: "rgba(32,22,19,0.12)" }}>
                <dt className={`${display} text-[3.5rem] leading-none sm:text-[4.5rem]`} style={{ color: c.ink }}>{r.to ? <Count to={r.to} /> : r.n}<span className="ml-1.5 text-[1.25rem]" style={{ color: c.coral }}>{r.u}</span></dt>
                <dd className="text-[0.9375rem] leading-snug" style={{ color: c.muted }}>{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Course card (example data) */}
        <Grow className="relative">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_50px_100px_-50px_rgba(32,22,19,0.55)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.75rem] font-medium" style={{ color: c.muted }}>Eksempel · Kursus</p>
                <p className="mt-1 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]" style={{ color: c.ink }}>AI på arbejdet</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold" style={{ background: c.coralSoft, color: c.ink }}><Icon name="clock" size={13} />1–2 timer</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full" style={{ background: c.sand }}><div data-grow="x" className="h-full w-3/4 origin-left rounded-full" style={{ background: c.coral }} /></div>
            <ul className="mt-6 grid gap-2">
              {mods.map((m, k) => (
                <li key={m.t} className="flex items-center gap-3 rounded-[16px] p-3" style={{ background: k === 3 ? c.coralSoft : c.cream }}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: m.done ? c.dark : c.coral }}>{m.done ? <Icon name="check" size={14} /> : <span className="text-[0.75rem] font-semibold">{k + 1}</span>}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{m.t}</span>
                    <span className="block text-[0.75rem]" style={{ color: c.muted }}>Lektioner à 10 min</span>
                  </span>
                  <Image src={m.tool.s} alt={m.tool.n} width={22} height={22} className="size-[22px] rounded-[6px]" />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: c.line }}>
              <div className="flex -space-x-1.5">{tools.map((t) => <span key={t.n} className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-white" style={{ boxShadow: "0 0 0 1px #ece4df" }}><Image src={t.s} alt="" width={18} height={18} className="size-[18px] rounded-[4px]" /></span>)}</div>
              <p className="text-[0.875rem]" style={{ color: c.muted }}><span className="text-[1.25rem] font-semibold tracking-[-0.02em]" style={{ color: c.ink }}>69 kr</span> pr. bruger / md.</p>
            </div>
          </div>
        </Grow>
      </div>
    </section>
  );
}
