"use client";

// Three versions of "Hvad siger deltagerne" (Marco 2026-11-03). Same heading and paragraph. Only the three example
// quotes that are already on the page, plus the AI-generated example video (kunde-1, labelled as such). Nothing invented.
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", sand: "#efe7e1", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Hvad siger deltagerne";
const PARA = "Her kommer rigtige citater fra vores første pilotforløb.";

// Copied from NyForside (not exported there).
const quotes = [
  { name: "Kontorchef", firm: "logistikvirksomhed, 40 ansatte", photo: "", initials: "KC", quote: "Referaterne tager mig otte minutter nu. Før brugte jeg en halv time efter hvert møde.", before: "30 min", after: "8 min", what: "pr. referat" },
  { name: "Sælger", firm: "byggemarked", photo: "/img/people/ali-yilmaz.webp", initials: "SA", quote: "Jeg skriver tilbud på halvdelen af tiden, og de lyder stadig som mig.", before: "45 min", after: "20 min", what: "pr. tilbud" },
  { name: "Ejer", firm: "revisionsfirma, 12 ansatte", photo: "/img/people/peter-skov.webp", initials: "EJ", quote: "Nu ved hele holdet, hvad vi må dele med AI. Det var dét, der holdt os tilbage.", before: "0", after: "12", what: "medarbejdere i gang" },
];
type Q = (typeof quotes)[number];
const num = (s: string) => parseFloat(s);
const isTime = (q: Q) => q.before.includes("min");
const result = (q: Q) => (isTime(q) ? `−${Math.round((1 - num(q.after) / num(q.before)) * 100)} %` : `+${num(q.after)}`);

function Tag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-medium ${dark ? "bg-white/10 text-white/75" : "bg-white/90 text-[#5a4a44]"}`}>{children}</span>;
}

function Face({ q, size = 44, dark = false }: { q: Q; size?: number; dark?: boolean }) {
  return q.photo
    ? <span className="relative shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}><Image src={q.photo} alt="" fill sizes={`${size}px`} className="object-cover object-top" /></span>
    : <span className="grid shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold" style={{ width: size, height: size, background: dark ? c.peach : c.dark, color: dark ? c.ink : c.peach }}>{q.initials}</span>;
}

/* Before/after as two horizontal bars on the same scale. */
function Bars({ q, dark = false }: { q: Q; dark?: boolean }) {
  const b = num(q.before), a = num(q.after), max = Math.max(a, b) || 1;
  const rows = [{ k: "Før", v: q.before, w: b / max, hot: false }, { k: "Nu", v: q.after, w: a / max, hot: true }];
  return (
    <div className="grid gap-2" aria-label={`Før ${q.before}, nu ${q.after} ${q.what}`}>
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[2.25rem_1fr_3.5rem] items-center gap-3 text-[0.75rem]">
          <span className={dark ? "text-white/55" : ""} style={dark ? undefined : { color: c.muted }}>{r.k}</span>
          <span className="h-2 overflow-hidden rounded-full" style={{ background: dark ? "rgba(255,255,255,0.08)" : c.sand }}>
            <span className="block h-full rounded-full" style={{ width: `${Math.max(r.w * 100, 3)}%`, background: r.hot ? c.coral : dark ? "rgba(255,255,255,0.35)" : "#cbbdb4" }} />
          </span>
          <span className={`text-right font-semibold tabular-nums ${dark ? "text-white" : ""}`} style={dark ? undefined : { color: c.ink }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

/* A · Video + resultatkort: the example video big on the left, the three quotes as cards with before/after bars on the right. */
export function A() {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { const el = v.current; if (!el) return; el.muted = false; el.controls = true; el.play().catch(() => {}); };
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[28px] bg-black lg:min-h-0">
            <video ref={v} className="absolute inset-0 size-full object-cover" src="/video/kunde-1.mp4" poster="/video/kunde-1-poster.jpg" playsInline preload="none"
              onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
              <track kind="captions" src="/video/kunde-1.da.vtt" srcLang="da" label="Dansk" default />
            </video>
            {!playing && (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0) 40%, rgba(32,22,19,0.85) 100%)" }} />
                <span className="absolute left-5 top-5"><Tag>Eksempel · AI-genereret video</Tag></span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <p className="max-w-[24rem] text-[clamp(1.125rem,0.9rem+0.8vw,1.5rem)] font-medium leading-snug text-white">“Vi var egentlig ret nysgerrige på AI, men vi manglede et sted at starte.”</p>
                  <button type="button" onClick={play} aria-label="Afspil video med lyd" className="nf-focus grid size-14 shrink-0 place-items-center rounded-full bg-white text-[#201613] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-transform hover:scale-105"><Icon name="play" size={18} /></button>
                </div>
              </>
            )}
          </div>
          <div className="grid gap-4">
            {quotes.map((q) => (
              <figure key={q.name} className="rounded-[24px] p-6 sm:p-7" style={{ background: c.cream }}>
                <blockquote className="text-[1.0625rem] font-medium leading-snug tracking-[-0.01em]" style={{ color: c.ink }}>“{q.quote}”</blockquote>
                <div className="mt-5 grid items-center gap-5 sm:grid-cols-[auto_1fr]">
                  <figcaption className="flex items-center gap-3">
                    <Face q={q} size={40} />
                    <div><p className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>{q.name}</p><p className="text-[0.75rem]" style={{ color: c.muted }}>{q.firm}</p></div>
                  </figcaption>
                  <div className="sm:pl-5 sm:[border-left:1px_solid_#e4d9d2]"><Bars q={q} /></div>
                </div>
              </figure>
            ))}
            <p className="px-1 text-[0.75rem]" style={{ color: c.muted }}>Eksempler. Rigtige citater kommer efter pilotforløbet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* B · Resultatet først: three dark cards; each opens with the number that changed (bars or a team that fills up), then the quote. */
export function B() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="rounded-[32px] px-5 py-14 sm:px-10 lg:px-14 lg:py-20" style={{ background: c.dark }}>
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
            <h2 className={`${h2} !text-white`}>{HEAD}</h2>
            <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/70 lg:justify-self-end">{PARA}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {quotes.map((q) => {
              const time = isTime(q);
              const b = num(q.before), a = num(q.after);
              return (
                <figure key={q.name} className="flex flex-col rounded-[24px] p-6 sm:p-7" style={{ background: c.dark2 }}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[3rem] font-semibold leading-none tracking-[-0.05em] tabular-nums" style={{ color: c.peach }}>{result(q)}</p>
                    <Tag dark>Eksempel</Tag>
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-white/55">{time ? `Tid ${q.what}` : q.what}</p>
                  {/* The visual */}
                  <div className="mt-6 h-40 rounded-[16px] bg-white/[0.04] p-4">
                    {time ? (
                      <div className="flex h-full items-end gap-6" aria-label={`Før ${q.before}, nu ${q.after}`}>
                        {[{ k: "Før", v: q.before, h: 1, hot: false }, { k: "Nu", v: q.after, h: a / b, hot: true }].map((r) => (
                          <div key={r.k} className="flex h-full w-16 flex-col justify-end gap-1.5">
                            <span className="text-[0.75rem] font-semibold tabular-nums text-white">{r.v}</span>
                            <span className="shrink-0 rounded-[6px]" style={{ height: Math.max(r.h * 76, 6), background: r.hot ? c.coral : "rgba(255,255,255,0.18)" }} />
                            <span className="text-[0.6875rem] text-white/45">{r.k}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full flex-col justify-between" aria-label={`Fra ${q.before} til ${q.after} ${q.what}`}>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 12 }, (_, k) => <span key={k} className="grid size-7 place-items-center rounded-full" style={{ background: c.coral }}><Icon name="check" size={11} className="text-[#201613]" /></span>)}
                        </div>
                        <p className="flex items-center gap-2 text-[0.75rem] text-white/55"><span className="tabular-nums">{q.before}</span><Icon name="arrowRight" size={12} /><span className="font-semibold tabular-nums text-white">{q.after}</span>{q.what}</p>
                      </div>
                    )}
                  </div>
                  <blockquote className="mt-6 text-[1.0625rem] font-medium leading-snug text-white">“{q.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <Face q={q} size={40} dark />
                    <div><p className="text-[0.875rem] font-semibold text-white">{q.name}</p><p className="text-[0.75rem] text-white/55">{q.firm}</p></div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · Vælg en person: avatar tabs on the left; one big white card with the quote and a before/after curve on the right. */
export function C() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const time = isTime(q);
  const b = num(q.before), a = num(q.after);
  // Curve over eight weeks from "before" to "after", same scale for every person (0..max).
  const max = Math.max(a, b) || 1;
  const pts = Array.from({ length: 8 }, (_, k) => {
    const t = k / 7; const e = 1 - Math.pow(1 - t, 2.2);
    const v = b + (a - b) * e;
    return [8 + t * 284, 84 - (v / max) * 70] as const;
  });
  const d = pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <section className="py-24 lg:py-32" style={{ background: c.cream }}>
      <div className={`${wrap} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[26rem] text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <div role="tablist" aria-label="Deltagere" className="mt-10 grid gap-2">
            {quotes.map((x, k) => (
              <button key={x.name} role="tab" aria-selected={k === i} type="button" onClick={() => setI(k)}
                className={`nf-focus flex items-center gap-4 rounded-[18px] p-3 pr-5 text-left transition-all duration-300 ${k === i ? "bg-white shadow-[0_20px_40px_-28px_rgba(32,22,19,0.5)]" : "hover:bg-white/60"}`}>
                <Face q={x} size={44} />
                <span className="min-w-0 flex-1"><span className="block text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{x.name}</span><span className="block truncate text-[0.8125rem]" style={{ color: c.muted }}>{x.firm}</span></span>
                <span className="text-[0.9375rem] font-semibold tabular-nums" style={{ color: k === i ? c.coral : c.muted }}>{result(x)}</span>
              </button>
            ))}
          </div>
        </div>
        <figure key={i} className="flex flex-col rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-50px_rgba(32,22,19,0.5)] sm:p-12" role="tabpanel">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[4.5rem] font-semibold leading-[0.6]" style={{ color: c.coral }} aria-hidden>“</span>
            <span className="rounded-full px-2.5 py-1 text-[0.6875rem] font-medium" style={{ background: c.sand, color: c.muted }}>Eksempel</span>
          </div>
          <blockquote className="mt-4 max-w-[34rem] text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.02em]" style={{ color: c.ink }}>{q.quote}</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Face q={q} size={40} />
            <p className="text-[0.875rem]" style={{ color: c.muted }}><b className="font-semibold" style={{ color: c.ink }}>{q.name}</b> · {q.firm}</p>
          </figcaption>
          <div className="mt-10 grid gap-6 rounded-[20px] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6" style={{ background: c.cream }}>
            <div>
              <p className="text-[0.75rem]" style={{ color: c.muted }}>{time ? `Tid ${q.what}` : q.what}</p>
              <p className="mt-1 text-[2.5rem] font-semibold leading-none tracking-[-0.04em] tabular-nums" style={{ color: c.ink }}>{q.after}</p>
              <p className="mt-1.5 text-[0.75rem] tabular-nums" style={{ color: c.muted }}>før {q.before}</p>
            </div>
            <svg viewBox="0 0 300 96" className="h-24 w-full" aria-label={`Fra ${q.before} til ${q.after} over otte uger`} preserveAspectRatio="none">
              <defs><linearGradient id="cit-c" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={c.coral} stopOpacity="0.25" /><stop offset="1" stopColor={c.coral} stopOpacity="0" /></linearGradient></defs>
              <line x1="8" x2="292" y1="84" y2="84" stroke="#e4d9d2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={`${d} L292 84 L8 84 Z`} fill="url(#cit-c)" />
              <path d={d} fill="none" stroke={c.coral} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </figure>
      </div>
    </section>
  );
}
