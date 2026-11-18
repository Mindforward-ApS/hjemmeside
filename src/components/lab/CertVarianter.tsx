"use client";

// "Et certifikat, der kan tjekkes" — three versions in the style of the current section (Marco 2026-11-05).
// All use the approved certificate V7 image, the QR check card and the same three points.
// 1 · Som nu, skarpere: the current split, but the certificate is bigger and tilted, the QR check animates and a
//     "Del på LinkedIn" chip sits on its corner.
// 2 · Mørk scene: the certificate on dark brown with a warm glow; the three points as a row underneath.
// 3 · Fuld bredde: the certificate big and centred; the three points pinned to the parts they describe.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { UiStage, useUiMode } from "@/components/lab/uiMotion";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", coralSoft: "#fbe1d7" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[length:calc(var(--dz,1)*clamp(2.75rem,1.9rem+2.6vw,4rem))]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Et certifikat, der kan tjekkes";
const PARA = "Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op.";
const points = [
  { i: "user" as const, t: "Dit navn og et unikt ID", d: "Beviset viser, hvilket forløb du har taget, og hvornår." },
  { i: "globe" as const, t: "Del det på LinkedIn", d: "Eller send det til chefen. QR-koden viser, at det er ægte." },
  { i: "shield" as const, t: "Dokumentation til AI-forordningen", d: "Artikel 4 kræver, at medarbejdere, der bruger AI, har tilstrækkelige AI-kompetencer. Beviset viser, hvem der har lært hvad." },
];

// QR check that runs once when it comes into view: "Tjekker …" → "Certifikatet er ægte".
// In the page-level "loop" UI mode the check runs again every 7 s while it is on screen.
function useCheck() {
  const ref = useRef<HTMLDivElement>(null);
  const loop = useUiMode() === "loop";
  const [state, setState] = useState<"idle" | "checking" | "ok">("idle");
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setState("ok"); return; }
    const ts: ReturnType<typeof setTimeout>[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;
    const runCheck = () => { setState("idle"); ts.push(setTimeout(() => setState("checking"), 500)); ts.push(setTimeout(() => setState("ok"), 2100)); };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { runCheck(); if (loop) iv = setInterval(runCheck, 7000); else io.disconnect(); }
      else if (iv) { clearInterval(iv); iv = undefined; }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); ts.forEach(clearTimeout); if (iv) clearInterval(iv); };
  }, [loop]);
  return { ref, state };
}

function CheckCard({ state, dark = false }: { state: "idle" | "checking" | "ok"; dark?: boolean }) {
  return (
    <div className={`flex w-[17rem] items-center gap-3 rounded-[16px] p-4 shadow-[0_18px_40px_-18px_rgba(32,22,19,0.45)] sm:w-[19rem] ${dark ? "bg-[#2c1f1b] ring-1 ring-white/10" : "bg-white"}`} aria-live="polite">
      <span className="grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-500" style={{ background: state === "ok" ? (dark ? c.cream : c.dark) : c.coralSoft, color: state === "ok" ? (dark ? c.ink : "#fff") : c.coral }}>
        {state === "checking" ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon name={state === "ok" ? "check" : "shield"} size={16} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`whitespace-nowrap text-[0.9375rem] font-semibold ${dark ? "text-white" : ""}`} style={dark ? undefined : { color: c.ink }}>{state === "ok" ? "Certifikatet er ægte" : state === "checking" ? "Tjekker certifikatet …" : "Tjek certifikatet"}</p>
        <p className={`text-[0.75rem] ${dark ? "text-white/60" : ""}`} style={dark ? undefined : { color: c.muted }}>MF-26-04812 · via QR-kode</p>
      </div>
    </div>
  );
}

const Cert = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-[14px] bg-white p-1.5 ${className}`}>
    <Image src="/cert/certifikat-v7.webp" alt="Kursusbevis til Sofie Lund: AI på arbejdet, Niveau 1, 92 procent, ID MF-26-04812" width={2248} height={1588} unoptimized className="h-auto w-full rounded-[9px]" />
  </div>
);

/* ───── 1 · Som nu, skarpere ───── */
export function C1() {
  const k = useCheck();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}>
        <div ref={k.ref} className="relative min-w-0 overflow-hidden rounded-[28px] px-6 pb-24 pt-10 sm:px-10 sm:pb-28 sm:pt-14" style={{ background: c.cream }}>
          <Cert className="-rotate-[3deg] shadow-[0_50px_90px_-35px_rgba(32,22,19,0.55)] transition-transform duration-700 hover:rotate-0" />
          <UiStage className="absolute right-6 top-6 sm:right-10"><span className="ui-badge inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.8125rem] font-semibold shadow-[0_10px_24px_-14px_rgba(32,22,19,0.4)]" style={{ color: c.ink, ["--d" as string]: "2.4s" }}>
            <span className="grid size-5 place-items-center rounded-[5px] text-[10px] font-bold text-white" style={{ background: "#0a66c2" }}>in</span>Del på LinkedIn
          </span></UiStage>
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10"><CheckCard state={k.state} /></div>
        </div>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <div className="mt-9 grid gap-7">
            {points.map((r) => (
              <div key={r.t} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-[12px]" style={{ background: c.cream, color: c.ink }}><Icon name={r.i} size={17} /></span>
                <div><h3 className="text-[1.1875rem] font-semibold" style={{ color: c.ink }}>{r.t}</h3><p className="mt-1.5 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{r.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 2 · Mørk scene ───── */
export function C2() {
  const k = useCheck();
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: c.dark }}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[45%] h-[46rem] w-[70rem] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.28), rgba(232,102,74,0.06) 55%, transparent)" }} />
      <div className={`${wrap} relative`}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
          <h2 className={`${h2} !text-white`}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/70 lg:justify-self-end">{PARA}</p>
        </div>
        <div ref={k.ref} className="relative mx-auto mt-14 max-w-[52rem]">
          <Cert className="shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]" />
          <div className="absolute -bottom-7 right-4 sm:right-8"><CheckCard state={k.state} dark /></div>
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {points.map((r) => (
            <div key={r.t} className="rounded-[22px] p-6 ring-1 ring-white/10" style={{ background: c.dark2 }}>
              <span className="grid size-10 place-items-center rounded-[11px]" style={{ background: c.coral, color: c.ink }}><Icon name={r.i} size={16} /></span>
              <h3 className="mt-5 text-[1.1875rem] font-semibold text-white">{r.t}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/65">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── 3 · Fuld bredde ───── */
// Numbered pins on the parts of the certificate (positions in % of the image): name, QR code, seal.
const pins = [
  { ...points[0], x: 4, y: 17 },
  { ...points[1], x: 70, y: 82 },
  { ...points[2], x: 95, y: 24 },
];
function Callout({ n, p }: { n: number; p: (typeof points)[number] }) {
  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[0_18px_40px_-22px_rgba(32,22,19,0.4)]">
      <span className="grid size-7 place-items-center rounded-full text-[0.75rem] font-bold" style={{ background: c.coral, color: c.ink }}>{n}</span>
      <p className="mt-3 text-[1rem] font-semibold" style={{ color: c.ink }}>{p.t}</p>
      <p className="mt-1 text-[0.875rem] leading-relaxed" style={{ color: c.muted }}>{p.d}</p>
    </div>
  );
}
export function C3() {
  const k = useCheck();
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={wrap}>
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
        </div>
        {/* Desktop: the certificate in the middle, the three explanations in the side columns (never over the
            certificate), each numbered like the pin on the part it describes. */}
        <div className="mx-auto mt-14 grid max-w-[78rem] items-stretch gap-8 lg:grid-cols-[15rem_1fr_15rem]">
          <div className="hidden lg:flex lg:flex-col lg:pt-[6%]"><Callout n={1} p={points[0]} /></div>
          <div ref={k.ref} className="relative">
            <Cert className="shadow-[0_60px_110px_-45px_rgba(32,22,19,0.55)]" />
            {pins.map((p, n) => (
              <span key={p.t} className="absolute hidden size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[0.8125rem] font-bold shadow-[0_8px_20px_-8px_rgba(32,22,19,0.5)] lg:grid" style={{ left: `${p.x}%`, top: `${p.y}%`, background: c.coral, color: c.ink }}>
                <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: c.coral }} />{n + 1}
              </span>
            ))}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2"><CheckCard state={k.state} /></div>
          </div>
          <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-[4%]"><Callout n={3} p={points[2]} /><Callout n={2} p={points[1]} /></div>
        </div>
        {/* Phones and tablets: the three points as a list */}
        <ol className="mx-auto mt-16 grid max-w-[40rem] gap-5 lg:hidden">
          {points.map((r, n) => (
            <li key={r.t} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full text-[0.8125rem] font-bold" style={{ background: c.coral, color: c.ink }}>{n + 1}</span><div><p className="font-semibold" style={{ color: c.ink }}>{r.t}</p><p className="mt-1 text-[0.9375rem]" style={{ color: c.muted }}>{r.d}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
