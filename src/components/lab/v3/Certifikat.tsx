"use client";

// Three versions of "Et certifikat, der kan tjekkes" (Marco 2026-11-03: "3 versioner af alle sektioner … flotte kort
// med grafer og vores certifikat"). All use the real certificate V7. Heading, paragraph and the two points are unchanged.
// No photo of a person holding it yet, so the physical feel comes from paper on a desk (A) and a frame on a wall (C).
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", dark2: "#2c1f1b", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", sand: "#efe7e1", peach: "#f6c9b6", coralSoft: "#fbe1d7", green: "#3aa66b", line: "#ece4df" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const HEAD = "Et certifikat, der kan tjekkes";
const PARA = "Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op.";
const POINTS = [
  { i: "user" as const, t: "Dit navn og et unikt ID", d: "Beviset viser, hvilket forløb du har taget, og hvornår." },
  { i: "globe" as const, t: "Del det på LinkedIn", d: "Eller send det til chefen. QR-koden viser, at det er ægte." },
];
const CERT = "/cert/certifikat-v7.webp";
const ID = "MF-26-04812";

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Chip({ name }: { name: Parameters<typeof Icon>[0]["name"] }) {
  return <span className="grid size-11 shrink-0 place-items-center rounded-[14px] text-white shadow-[inset_0_-2px_0_#e8664a]" style={{ background: c.dark }}><Icon name={name} size={18} /></span>;
}

function Points() {
  return (
    <div className="mt-9 grid gap-7">
      {POINTS.map((r) => (
        <div key={r.t} className="flex gap-4">
          <Chip name={r.i} />
          <div><h3 className="text-[1.1875rem] font-semibold" style={{ color: c.ink }}>{r.t}</h3><p className="mt-1.5 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{r.d}</p></div>
        </div>
      ))}
    </div>
  );
}

function Check({ size = 14 }: { size?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-full text-white" style={{ background: c.green, width: size + 14, height: size + 14 }}><Icon name="check" size={size} /></span>;
}

/* Decorative QR-like pattern (the real QR lives on the certificate). Deterministic so server and client match. */
function Qr({ className = "" }: { className?: string }) {
  const n = 21;
  const finder = (x: number, y: number) => [[0, 0], [n - 7, 0], [0, n - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && ((x * 7 + y * 13 + x * y) % 5 < 2)) cells.push([x, y]);
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className={className} aria-hidden shapeRendering="crispEdges">
      {[[0, 0], [n - 7, 0], [0, n - 7]].map(([x, y]) => (
        <g key={`${x}-${y}`}><rect x={x} y={y} width="7" height="7" fill={c.ink} /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" fill={c.ink} /></g>
      ))}
      {cells.map(([x, y]) => <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill={c.ink} />)}
    </svg>
  );
}

/* A · Papir på bordet: the real certificate lies on a warm desk in perspective, with a verify card on top. */
export function A() {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}>
        <div ref={ref} className="relative min-w-0 overflow-hidden rounded-[28px]" style={{ background: "radial-gradient(120% 90% at 30% 20%, #f7efe9 0%, #eadfd6 55%, #dccdc2 100%)" }}>
          <div className="relative aspect-[5/4] [perspective:1400px] sm:aspect-[16/11]">
            {/* Contact shadow first, then the sheet itself. */}
            <div className={`absolute left-[12%] top-[10%] w-[76%] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${seen ? "opacity-100" : "translate-y-6 opacity-0"}`} style={{ transform: `rotateX(32deg) rotateZ(-7deg)`, transformOrigin: "50% 60%" }}>
              <div className="relative aspect-[2248/1588] w-full overflow-hidden rounded-[3px] bg-white shadow-[0_2px_2px_rgba(32,22,19,0.12),0_18px_30px_-10px_rgba(32,22,19,0.28),0_60px_80px_-40px_rgba(32,22,19,0.45)]">
                <Image src={CERT} alt={`Kursusbevis til Sofie Lund, AI på arbejdet, Niveau 1, ID ${ID}`} fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover" />
                {/* Paper sheen from the window light. */}
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 38%, rgba(32,22,19,0.05) 100%)" }} />
              </div>
            </div>
          </div>
          <div className={`relative mx-4 mb-4 flex items-center gap-3 rounded-[18px] bg-white p-3.5 pr-5 shadow-[0_24px_48px_-24px_rgba(32,22,19,0.55)] transition-all delay-500 duration-700 sm:absolute sm:left-7 sm:top-7 sm:m-0 ${seen ? "opacity-100" : "translate-y-3 opacity-0"}`}>
            <Check />
            <div>
              <p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Certifikatet er ægte</p>
              <p className="text-[0.75rem]" style={{ color: c.muted }}>{ID} · udstedt 14. nov. 2026</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <Points />
        </div>
      </div>
    </section>
  );
}

/* B · Bevis-kittet: the certificate big in a brown tile, around it what it gives you: a LinkedIn post, a check and the score curve. */
export function B() {
  const weeks = [54, 61, 66, 74, 81, 86, 92];
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
          <h2 className={`${h2} max-w-[14ch]`} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="max-w-[30rem] text-[1rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{PARA}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* The certificate */}
          <div className="relative overflow-hidden rounded-[28px] p-6 sm:p-10 lg:col-span-7 lg:row-span-2" style={{ background: "linear-gradient(160deg, #3a2722 0%, #241815 70%, #1a0f0c 100%)" }}>
            <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full border-[28px] border-[#e8664a]/10" />
            <p className="relative text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/55">Kursusbevis</p>
            <div className="relative mt-6 lg:mt-10">
              <div className="relative aspect-[2248/1588] w-full -rotate-[1.5deg] overflow-hidden rounded-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                <Image src={CERT} alt={`Kursusbevis til Sofie Lund, ID ${ID}`} fill sizes="(min-width:1024px) 55vw, 90vw" className="object-cover" />
              </div>
            </div>
          </div>
          {/* LinkedIn post */}
          <div className="rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(32,22,19,0.45)] ring-1 lg:col-span-5" style={{ ["--tw-ring-color" as string]: c.line }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>{POINTS[1].t}</p>
              <Icon name="globe" size={18} className="text-[#5a4a44]" />
            </div>
            <div className="mt-5 rounded-[16px] border p-4" style={{ borderColor: c.line }}>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full text-[0.8125rem] font-semibold" style={{ background: c.peach, color: c.ink }}>SL</span>
                <div className="min-w-0"><p className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>Sofie Lund</p><p className="truncate text-[0.75rem]" style={{ color: c.muted }}>har fået et nyt certifikat</p></div>
              </div>
              <div className="relative mt-3 aspect-[2248/1000] overflow-hidden rounded-[10px]">
                <Image src={CERT} alt="" fill sizes="20rem" className="object-cover object-top" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.75rem]" style={{ color: c.muted }}>
                <span className="flex items-center gap-1.5"><span className="flex -space-x-1">{[c.coral, c.green, c.peach].map((x) => <i key={x} className="size-3.5 rounded-full ring-2 ring-white" style={{ background: x }} />)}</span>48</span>
                <span>6 kommentarer</span>
              </div>
            </div>
          </div>
          {/* Check + curve */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            <div className="flex flex-col rounded-[24px] p-6" style={{ background: c.cream }}>
              <div className="flex items-center gap-2.5"><Check size={12} /><p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>Ægte</p></div>
              <div className="mt-5 flex items-center gap-4">
                <span className="rounded-[10px] bg-white p-2 shadow-[0_8px_20px_-12px_rgba(32,22,19,0.4)]"><Qr className="size-16" /></span>
                <div className="min-w-0"><p className="text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: c.muted }}>Unikt ID</p><p className="mt-0.5 text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{ID}</p></div>
              </div>
              <p className="mt-auto pt-5 text-[0.75rem]" style={{ color: c.muted }}>mindforward.dk/c/{ID}</p>
            </div>
            <div className="flex flex-col rounded-[24px] p-6" style={{ background: c.dark }}>
              <p className="text-[0.8125rem] text-white/60">Score i øvemiljøet</p>
              <p className="mt-1 flex items-baseline gap-1"><span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.peach }}>92</span><span className="text-[0.8125rem] text-white/60">%</span></p>
              <div className="mt-auto flex h-20 items-end gap-1.5 pt-5" aria-label="Score uge for uge: 54 til 92 procent">
                {weeks.map((w, k) => <span key={k} className="flex-1 rounded-t-[4px]" style={{ height: `${w}%`, background: k === weeks.length - 1 ? c.coral : "rgba(255,255,255,0.16)" }} />)}
              </div>
              <div className="mt-2 flex justify-between text-[0.625rem] text-white/45"><span>Uge 1</span><span>Uge 7</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* C · I ramme: the certificate framed on a sand wall; next to it the points and a live lookup of the ID. */
export function C() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const [state, setState] = useState<"idle" | "checking" | "ok">("idle");
  const run = () => { setState("checking"); setTimeout(() => setState("ok"), 1100); };
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setState(reduce ? "ok" : "checking"), reduce ? 0 : 700);
    const t2 = reduce ? undefined : setTimeout(() => setState("ok"), 1800);
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, [seen]);
  return (
    <section className="py-24 lg:py-32" style={{ background: c.sand }}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20`}>
        {/* The frame: dark wood, cream mat, soft wall shadow. */}
        <div className="mx-auto w-full max-w-[44rem]">
          <div className="rounded-[6px] p-[3.2%] shadow-[0_2px_0_rgba(255,255,255,0.15)_inset,0_50px_90px_-40px_rgba(32,22,19,0.6),0_14px_24px_-12px_rgba(32,22,19,0.35)]" style={{ background: "linear-gradient(145deg, #3d2a24 0%, #241815 55%, #2f201b 100%)" }}>
            <div className="p-[5.5%] shadow-[inset_0_2px_6px_rgba(32,22,19,0.35)]" style={{ background: "#fbf8f5" }}>
              <div className="relative aspect-[2248/1588] w-full shadow-[0_0_0_1px_rgba(32,22,19,0.08)]">
                <Image src={CERT} alt={`Kursusbevis til Sofie Lund, AI på arbejdet, Niveau 1, ID ${ID}`} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%)" }} />
              </div>
            </div>
          </div>
        </div>
        <div ref={ref}>
          <h2 className={h2} style={{ color: c.ink }}>{HEAD}</h2>
          <p className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>{PARA}</p>
          <ol className="mt-9 grid gap-6">
            {POINTS.map((r, k) => (
              <li key={r.t} className="flex gap-5">
                <span className="text-[1.75rem] font-semibold leading-none tabular-nums tracking-[-0.04em]" style={{ color: c.coral }}>0{k + 1}</span>
                <div><h3 className="text-[1.1875rem] font-semibold" style={{ color: c.ink }}>{r.t}</h3><p className="mt-1 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{r.d}</p></div>
              </li>
            ))}
          </ol>
          {/* Lookup */}
          <div className="mt-10 max-w-[28rem] rounded-[22px] bg-white p-2 shadow-[0_30px_60px_-36px_rgba(32,22,19,0.5)]">
            <div className="flex items-center gap-2">
              <span className="flex h-12 flex-1 items-center gap-2.5 rounded-[16px] px-4 text-[0.9375rem] font-medium" style={{ background: c.cream, color: c.ink }}><Icon name="lock" size={14} className="text-[#5a4a44]" />{ID}</span>
              <button type="button" onClick={run} className="nf-focus inline-flex h-12 items-center rounded-[16px] px-5 text-[0.9375rem] font-medium text-white transition-transform active:scale-[0.98]" style={{ background: c.dark }}>Tjek</button>
            </div>
            <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: state === "idle" ? "0fr" : "1fr" }} aria-live="polite">
              <div className="overflow-hidden">
                <div className="flex items-center gap-3 px-3 pb-2 pt-4">
                  {state === "checking"
                    ? <span className="size-7 animate-spin rounded-full border-2 border-[#e8664a] border-t-transparent" />
                    : <Check size={13} />}
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{state === "ok" ? "Certifikatet er ægte" : "Tjekker …"}</p>
                    <p className="truncate text-[0.75rem]" style={{ color: c.muted }}>Sofie Lund · AI på arbejdet · Niveau 1 · 92 %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
