"use client";

// Marco 2026-11-20: Miwa comes alive in the hero. The motion is rendered in Blender (her cut-out image skinned to a
// skeleton, so elbows, shoulders and neck bend smoothly) into four transparent clips: idle (breathing, swaying,
// blinking, loops), wave, point/tap and laugh. Every clip starts and ends in the same rest pose, so they cut together
// without a jump. Chrome/Firefox get VP9 with alpha (webm), Safari HEVC with alpha (mp4).
// Next to her sit the test-user video cards; she taps one herself, the clip starts, and she laughs along. Clicking her
// gives a new line. No real test-user videos yet: one card is the AI-generated example clip (labelled), the rest say so.
import { useCallback, useEffect, useRef, useState } from "react";

type Act = "wave" | "point" | "laugh";
type Card = { id: string; label: string; src?: string; poster?: string };

const acts: Act[] = ["wave", "point", "laugh"];

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

export function MiwaLive() {
  const [ext, setExt] = useState<"webm" | "mp4" | null>(null);
  const [act, setAct] = useState<Act | null>(null);
  const [ready, setReady] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const touched = useRef(false);
  const poke = useRef(0);
  const idle = useRef<HTMLVideoElement>(null);
  const clips = useRef<Partial<Record<Act, HTMLVideoElement | null>>>({});
  const vids = useRef<Record<string, HTMLVideoElement | null>>({});
  const timers = useRef<number[]>([]);
  const later = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };

  // Safari can't show VP9 alpha; it gets the HEVC-with-alpha files instead.
  useEffect(() => {
    const ua = navigator.userAgent;
    setExt(/^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(ua) ? "mp4" : "webm");
  }, []);

  // Plays one action clip on top of the idle loop. Idle is parked on frame 0 (the shared rest pose) meanwhile.
  const run = useCallback((a: Act) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = clips.current[a];
    if (!v) return;
    Object.values(clips.current).forEach((o) => { if (o && o !== v) o.pause(); });
    idle.current?.pause();
    if (idle.current) idle.current.currentTime = 0;
    v.currentTime = 0;
    setAct(a);
    void v.play().catch(() => setAct(null));
  }, []);

  const done = (a: Act) => {
    setAct((cur) => (cur === a ? null : cur));
    void idle.current?.play().catch(() => {});
  };

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
    later(byMiwa ? 900 : 200, () => run("laugh"));
  }, [run]);

  // Opening scene: wave + hello, then a hint, then she taps the first card herself unless the visitor already did.
  useEffect(() => {
    if (!ext) return;
    later(600, () => { setLine("Hej! Jeg er Miwa, din AI-tutor."); run("wave"); });
    later(3700, () => setLine("Vil du høre, hvad testbrugerne siger?"));
    later(6400, () => {
      if (touched.current) return;
      setLine("Jeg trykker bare på den her…");
      run("point");
      later(650, () => { if (!touched.current) play(cards[0], true); });
    });
    return () => timers.current.forEach(clearTimeout);
  }, [ext, run, play]);

  const onMiwa = () => {
    touched.current = true;
    setLine(pokes[poke.current++ % pokes.length]);
    run(poke.current % 2 ? "wave" : "laugh");
  };

  return (
    <div className="relative mx-auto mt-16 flex h-[26rem] w-full max-w-[40rem] items-end justify-center gap-1 sm:mt-0 sm:h-[min(78svh,46rem)] lg:mr-0 lg:h-[calc(100svh-13rem)] lg:max-w-none lg:justify-end">
      <style>{`
        @keyframes mwPop { 0% { opacity: 0; transform: translateY(8px) scale(0.92); } 100% { opacity: 1; transform: none; } }
        .mw-bubble { animation: mwPop 320ms cubic-bezier(.2,.9,.3,1.2); }
        @media (prefers-reduced-motion: reduce) { .mw-bubble { animation: none; } }
      `}</style>

      {/* Miwa: 720×960 clips; her figure fills x 7–93 %, y 4–100 % of the frame. */}
      <div className="relative h-full min-w-0" style={{ aspectRatio: "3 / 4" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[36%] aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.42), rgba(232,102,74,0.16) 45%, transparent 75%)" }} />
        <div aria-hidden className="pointer-events-none absolute bottom-[-1.5%] left-1/2 h-[6%] w-[50%] -translate-x-1/2 rounded-[50%] blur-md" style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.7), transparent)" }} />
        <button type="button" onClick={onMiwa} aria-label="Sig hej til Miwa" className="nf-focus absolute inset-x-[10%] inset-y-0 z-10 cursor-pointer rounded-[24px]" />
        {/* Still of the rest pose until the idle clip runs (the clips are transparent, so it must not stay underneath). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-hero-person src="/video/miwa/poster.webp" alt="Miwa, Mindforwards AI-tutor" className="absolute inset-0 size-full object-contain object-bottom" style={{ opacity: ready || act ? 0 : 1 }} draggable={false} />
        {ext && (
          <>
            <video ref={idle} src={`/video/miwa/idle.${ext}`} autoPlay muted loop playsInline preload="auto" aria-hidden onPlaying={() => setReady(true)} className="absolute inset-0 size-full object-contain object-bottom" style={{ opacity: act ? 0 : 1 }} />
            {acts.map((a) => (
              <video key={a} ref={(el) => { clips.current[a] = el; }} src={`/video/miwa/${a}.${ext}`} muted playsInline preload="auto" aria-hidden onEnded={() => done(a)}
                className="absolute inset-0 size-full object-contain object-bottom" style={{ opacity: act === a ? 1 : 0 }} />
            ))}
          </>
        )}
        {line && (
          <p key={line} role="status" className="mw-bubble absolute left-[-2%] top-[-10%] z-20 max-w-[13rem] rounded-[20px] rounded-br-[6px] bg-white px-4 py-3 text-[0.9375rem] font-semibold leading-snug shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] sm:left-[-14%] sm:top-[0%] sm:max-w-[15rem] lg:left-[-24%]" style={{ color: "#201613" }}>
            {line}
          </p>
        )}
      </div>

      {/* Test-user videos next to her; the top card sits where her pointing hand lands. */}
      <ul className="mb-[1%] flex h-[74%] w-[24%] max-w-[8.5rem] flex-none flex-col gap-2.5 sm:gap-3">
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
              <span className="absolute bottom-2 left-2.5 right-2 hidden text-left text-[0.6875rem] font-semibold leading-tight text-white sm:block">
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
