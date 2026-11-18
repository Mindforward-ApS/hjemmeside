"use client";

// UI motion for the small product UIs on the front page (Marco 2026-11-05: "fyld hele siden med animationer i ui
// tingene ... men det skal give mening"). Only the UI boxes move; cards, photos and text stay put.
// One page-level mode, three versions:
//   "once" · Én gang: each UI box plays its little scene once, when it comes into view (or when its card opens).
//   "loop" · Levende: the scene plays, holds for a few seconds and plays again while the box is on screen, like a
//            product demo; the step cards also take turns opening by themselves.
//   "type" · AI skriver: as "once", but the text in the boxes is written out letter by letter, as if the AI writes it.
//   "off"  · nothing moves (the default, and always when the visitor has asked for reduced motion).
// A <UiStage> wraps one UI box and decides when it plays; inside it, ui-* classes, <Count> and <Typed> do the work.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UiMode = "off" | "once" | "loop" | "type";
const ModeCtx = createContext<UiMode>("off");
type Phase = "static" | "wait" | "play";
const StageCtx = createContext<{ phase: Phase; typing: boolean }>({ phase: "static", typing: false });

export const useUiMode = () => useContext(ModeCtx);
export const useStage = () => useContext(StageCtx);

const css = `
  @keyframes uiFill { from { transform: scaleX(0); } }
  @keyframes uiPop { from { opacity: 0; transform: translateY(6px) scale(0.96); } }
  @keyframes uiRing { from { stroke-dasharray: 0 119.4; } }
  @keyframes uiBadge { 0% { opacity: 0; transform: scale(0.6); } 70% { transform: scale(1.06); } }
  @keyframes uiSweep { from { transform: scaleX(0); } }
  @keyframes uiCaret { 50% { opacity: 0; } }
  .ui-play .ui-fill { animation: uiFill 1.1s cubic-bezier(0.16,1,0.3,1) var(--d,300ms) both; transform-origin: left; }
  .ui-play .ui-pop { animation: uiPop 500ms cubic-bezier(0.16,1,0.3,1) var(--d,0ms) both; }
  .ui-play .ui-ring { animation: uiRing 1.3s cubic-bezier(0.16,1,0.3,1) var(--d,250ms) both; }
  .ui-play .ui-badge { animation: uiBadge 600ms cubic-bezier(0.34,1.4,0.64,1) var(--d,1.2s) both; }
  .ui-play .ui-sweep { animation: uiSweep 450ms cubic-bezier(0.65,0,0.35,1) var(--d,600ms) both; transform-origin: left; }
  .ui-wait .ui-pop, .ui-wait .ui-badge { opacity: 0; }
  .ui-wait .ui-fill, .ui-wait .ui-sweep { transform: scaleX(0); transform-origin: left; }
  .ui-wait .ui-ring { stroke-dasharray: 0 119.4; }
  .ui-caret { display: inline-block; width: 2px; height: 1em; margin-left: 1px; vertical-align: -0.15em; background: currentColor; animation: uiCaret 0.8s steps(1) infinite; }
`;

export function UiMotionProvider({ mode, children }: { mode: UiMode; children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  const m = reduced ? "off" : mode;
  return (
    <ModeCtx.Provider value={m}>
      {m !== "off" && <style>{css}</style>}
      {children}
    </ModeCtx.Provider>
  );
}

// active: for boxes inside a card that opens (step cards, carousel slides). Undefined = always "open".
export function UiStage({ children, active, period = 6500, className = "" }: { children: ReactNode; active?: boolean; period?: number; className?: string }) {
  const mode = useUiMode();
  // One element carries the layout classes, the observer and the play key (remounted on every play).
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  const [run, setRun] = useState(0);
  const open = active ?? true;
  useEffect(() => {
    if (mode === "off" || !el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.45 });
    io.observe(el); return () => io.disconnect();
  }, [mode, el]);
  // Play when it is on screen and open. "once"/"type" play again only when the card is re-opened.
  useEffect(() => { if (mode !== "off" && seen && open) setRun((r) => (mode === "loop" || r === 0 || active !== undefined ? r + 1 : r)); }, [mode, seen, open, active]);
  useEffect(() => {
    if (mode !== "loop" || !seen || !open) return;
    const t = setInterval(() => setRun((r) => r + 1), period);
    return () => clearInterval(t);
  }, [mode, seen, open, period]);
  if (mode === "off") return <div className={className}>{children}</div>;
  const phase: Phase = run === 0 || !open ? "wait" : "play";
  return (
    <StageCtx.Provider value={{ phase, typing: mode === "type" }}>
      <div key={run} ref={setEl} className={`${className} ${phase === "play" ? "ui-play" : "ui-wait"}`}>{children}</div>
    </StageCtx.Provider>
  );
}

// Delay helper: elements that should wait for typed text to finish get a later start in "type" mode.
export const useDelay = (popMs: number, typeMs: number) => `${useStage().typing ? typeMs : popMs}ms`;

export function Count({ to, delay = 250 }: { to: number; delay?: number }) {
  const { phase } = useStage();
  const [n, setN] = useState(phase === "static" ? to : 0);
  useEffect(() => {
    if (phase === "static") { setN(to); return; }
    if (phase === "wait") { setN(0); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, Math.max(0, (t - t0 - delay) / 1100)); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [phase, to, delay]);
  return <span className="tabular-nums">{n}</span>;
}

// Text that is written out letter by letter in "type" mode; shown whole otherwise. The unwritten rest stays in the
// layout (invisible), so nothing jumps. parts: plain strings, or { b } for bold.
type Part = string | { b: string };
export function Typed({ parts, delay = 200, cps = 55 }: { parts: Part[]; delay?: number; cps?: number }) {
  const { phase, typing } = useStage();
  const full = parts.map((p) => (typeof p === "string" ? p : p.b)).join("");
  const [k, setK] = useState(typing ? 0 : full.length);
  useEffect(() => {
    if (!typing || phase === "static") { setK(full.length); return; }
    if (phase === "wait") { setK(0); return; }
    setK(0);
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const c = Math.min(full.length, Math.max(0, Math.floor(((t - t0 - delay) / 1000) * cps))); setK(c); if (c < full.length) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [phase, typing, full, delay, cps]);
  let left = k;
  const out: ReactNode[] = [];
  parts.forEach((p, i) => {
    const s = typeof p === "string" ? p : p.b;
    const shown = s.slice(0, Math.max(0, left)); const rest = s.slice(shown.length); left -= s.length;
    const wrap = (t: string, hidden: boolean, key: string) => (typeof p === "string" ? <span key={key} className={hidden ? "opacity-0" : ""}>{t}</span> : <b key={key} className={hidden ? "opacity-0" : ""}>{t}</b>);
    if (shown) out.push(wrap(shown, false, `s${i}`));
    if (rest) out.push(wrap(rest, true, `r${i}`));
  });
  // Put the caret after the written part while typing.
  if (typing && phase === "play" && k < full.length) {
    let pos = 0; let idx = 0;
    for (; idx < out.length; idx++) { const el = out[idx] as { props: { className: string } }; if (el.props.className === "opacity-0") break; pos++; }
    out.splice(pos, 0, <span key="caret" aria-hidden className="ui-caret" />);
  }
  return <span aria-label={full}>{out}</span>;
}
