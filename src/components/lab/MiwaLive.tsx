"use client";

// Marco 2026-11-20: Miwa comes alive in the hero. She is a cut-out 3D render split into layers (body, forearm, eyelids),
// animated in the browser: she breathes, blinks, waves when the page opens and says hello in a speech bubble. Next to
// her sit the test-user video cards; she taps one herself, the clip starts, and she laughs along. Clicking her gives a
// new line. No real test-user videos yet: one card is the AI-generated example clip (labelled), the rest say so.
import { useCallback, useEffect, useRef, useState } from "react";

type Arm = "rest" | "wave" | "point";
type Card = { id: string; label: string; src?: string; poster?: string };

const cards: Card[] = [
  { id: "a", label: "Eksempel", src: "/video/kunde-1.mp4", poster: "/video/kunde-1-poster.jpg" },
  { id: "b", label: "Testbruger" },
  { id: "c", label: "Testbruger" },
];

const pokes = [
  "Hov! Det kilder.",
  "Ti minutter om dagen. Det er alt, hvad jeg beder om.",
  "Jeg har en blyant i håret. Man ved aldrig.",
  "Prøv at trykke på en af videoerne.",
  "Claude, ChatGPT eller Copilot? Jeg kan dem alle tre.",
];

// Pivot of the forearm (the cuff), as a share of the image box.
const elbow = "81.55% 28.79%";

export function MiwaLive() {
  const [arm, setArm] = useState<Arm>("rest");
  const [line, setLine] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  const [hop, setHop] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const touched = useRef(false);
  const poke = useRef(0);
  const vids = useRef<Record<string, HTMLVideoElement | null>>({});
  const timers = useRef<number[]>([]);
  const later = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };

  const laugh = useCallback(() => setHop((h) => h + 1), []);

  const play = useCallback((c: Card, byMiwa: boolean) => {
    setPressed(c.id);
    later(260, () => setPressed(null));
    if (!c.src) {
      setPlaying(null);
      setLine("Den video er på vej. Testbrugerne er ved at optage!");
      return;
    }
    Object.entries(vids.current).forEach(([id, v]) => { if (id !== c.id && v) v.pause(); });
    const v = vids.current[c.id];
    if (v) { v.currentTime = 0; v.muted = byMiwa; void v.play().catch(() => {}); }
    setPlaying(c.id);
    setLine(byMiwa ? "Den her må du se!" : "Haha, den elsker jeg!");
    later(700, laugh);
    later(1500, laugh);
  }, [laugh]);

  // Opening scene: wave + hello, then a hint, then she taps the first card herself unless the visitor already did.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    later(500, () => { setArm(reduce ? "rest" : "wave"); setLine("Hej! Jeg er Miwa, din AI-tutor."); });
    later(2900, () => setArm("rest"));
    later(3600, () => setLine("Vil du høre, hvad testbrugerne siger?"));
    later(6200, () => {
      if (touched.current) return;
      setArm("point");
      setLine("Jeg trykker bare på den her…");
      later(650, () => { if (!touched.current) play(cards[0], true); });
      later(1600, () => setArm("rest"));
    });
    return () => timers.current.forEach(clearTimeout);
  }, [play]);

  // Blinks at a slightly random rhythm.
  useEffect(() => {
    let t: number;
    const next = () => { t = window.setTimeout(() => { setBlink(true); window.setTimeout(() => setBlink(false), 130); next(); }, 2600 + Math.random() * 2600); };
    next();
    return () => clearTimeout(t);
  }, []);

  const onMiwa = () => {
    touched.current = true;
    setLine(pokes[poke.current++ % pokes.length]);
    setArm("wave");
    later(1700, () => setArm("rest"));
    laugh();
  };

  return (
    <div className="relative mx-auto mt-16 flex h-[26rem] w-full max-w-[40rem] items-end justify-center gap-3 sm:mt-0 sm:h-[min(78svh,46rem)] sm:gap-4 lg:mr-0 lg:h-[calc(100svh-13rem)] lg:max-w-none lg:justify-end lg:gap-[2vw]">
      <style>{`
        @keyframes mwBreath { 0%,100% { transform: scale(1,1) rotate(0deg); } 50% { transform: scale(1.006,1.012) rotate(-0.5deg); } }
        @keyframes mwWave { 0%,100% { transform: rotate(-4deg); } 25% { transform: rotate(-16deg); } 75% { transform: rotate(10deg); } }
        @keyframes mwRest { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-3deg); } }
        @keyframes mwHop { 0% { transform: translateY(0) scale(1,1); } 20% { transform: translateY(0) scale(1.02,0.97); } 50% { transform: translateY(-3.5%) scale(0.99,1.02); } 80% { transform: translateY(0) scale(1.015,0.985); } 100% { transform: translateY(0) scale(1,1); } }
        @keyframes mwPop { 0% { opacity: 0; transform: translateY(8px) scale(0.92); } 100% { opacity: 1; transform: none; } }
        .mw-body { transform-origin: 50% 100%; animation: mwBreath 4.2s ease-in-out infinite; }
        .mw-hop { transform-origin: 50% 100%; animation: mwHop 520ms cubic-bezier(.3,.7,.4,1); }
        .mw-arm { transform-origin: ${elbow}; transition: transform 450ms cubic-bezier(.3,.7,.3,1); }
        .mw-arm[data-arm="wave"] { animation: mwWave 620ms ease-in-out infinite; }
        .mw-arm[data-arm="rest"] { animation: mwRest 3.6s ease-in-out infinite; }
        .mw-arm[data-arm="point"] { transform: rotate(38deg); }
        .mw-bubble { animation: mwPop 320ms cubic-bezier(.2,.9,.3,1.2); }
        @media (prefers-reduced-motion: reduce) { .mw-body, .mw-arm, .mw-hop, .mw-bubble { animation: none !important; } }
      `}</style>

      {/* Miwa */}
      <div className="relative h-full min-w-0">
        <div key={hop} className={hop ? "mw-hop h-full" : "h-full"}>
          <button type="button" onClick={onMiwa} aria-label="Sig hej til Miwa" className="nf-focus mw-body relative block h-full cursor-pointer" style={{ aspectRatio: "916 / 1466" }}>
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.42), rgba(232,102,74,0.16) 45%, transparent 75%)" }} />
            <div aria-hidden className="pointer-events-none absolute bottom-[-1.5%] left-1/2 h-[6%] w-[60%] -translate-x-1/2 rounded-[50%] blur-md" style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.7), transparent)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-arm={arm} src="/img/miwa/glad-arm.webp" alt="" className="mw-arm absolute inset-0 size-full" draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-hero-person src="/img/miwa/glad-base.webp" alt="Miwa, Mindforwards AI-tutor" className="absolute inset-0 size-full drop-shadow-[0_0_28px_rgba(232,102,74,0.25)]" draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/miwa/glad-lids.webp" alt="" className="pointer-events-none absolute inset-0 size-full" style={{ opacity: blink ? 1 : 0 }} draggable={false} />
          </button>
        </div>
        {line && (
          <p key={line} role="status" className="mw-bubble absolute left-[-4%] top-[-12%] max-w-[13rem] sm:left-[-18%] sm:top-[-2%] sm:max-w-[15rem] rounded-[20px] rounded-br-[6px] bg-white px-4 py-3 text-[0.9375rem] font-semibold leading-snug shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] lg:left-[-30%]" style={{ color: "#201613" }}>
            {line}
          </p>
        )}
      </div>

      {/* Test-user videos next to her */}
      <ul className="mb-[1%] flex h-[78%] w-[24%] max-w-[8.5rem] flex-none flex-col gap-2.5 sm:gap-3">
        {cards.map((c) => (
          <li key={c.id} className="min-h-0 flex-1">
            <button type="button" onClick={() => { touched.current = true; play(c, false); }} aria-label={c.src ? "Afspil eksempelvideo" : "Testbruger-video kommer snart"}
              className={`nf-focus group relative block size-full overflow-hidden rounded-[16px] ring-1 transition-[transform,box-shadow] duration-200 ${pressed === c.id ? "scale-[0.92]" : "hover:-translate-y-0.5"} ${playing === c.id ? "ring-2 ring-[#e8664a] shadow-[0_0_0_6px_rgba(232,102,74,0.18)]" : "ring-white/15"}`}
              style={{ background: "#2c1f1b" }}>
              {c.src ? (
                <video ref={(el) => { vids.current[c.id] = el; }} src={c.src} poster={c.poster} playsInline loop muted preload="metadata" onEnded={() => setPlaying(null)} className="absolute inset-0 size-full object-cover" />
              ) : null}
              <span className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(180deg, transparent, rgba(32,22,19,0.85))" }} />
              {playing !== c.id && (
                <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" aria-hidden className="ml-0.5 size-4 fill-[#201613]"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
              )}
              <span className="absolute bottom-2 left-2.5 right-2 hidden text-left sm:block text-[0.6875rem] font-semibold leading-tight text-white">
                {c.label}
                <span className="block font-normal text-white/70">{c.src ? "AI-genereret" : "Kommer snart"}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
