"use client";

// Marco 2026-11-20: Miwa comes alive in the hero. The motion is rendered in Blender (scripts/miwa/rig2.py: her cut-out
// image on a deep skeleton — legs with knees and planted feet, hips, spine, head, a face that turns, a talking jaw,
// swinging hair and both arms that can hang, wave, explain and cheer) into transparent clips: idle (weight shift,
// looking around, blinking, loops), hello, talk, point/tap, laugh, dance, and two walk cycles. While a walk cycle
// loops, the page moves her across the hero, so she strolls over to the video cards and wanders around now and then. Every clip starts and ends in the same rest pose, so they cut together
// without a jump. Chrome/Firefox get VP9 with alpha (webm), Safari HEVC with alpha (mp4).
// Next to her sit the test-user video cards; she taps one herself, the clip starts, and she laughs along. Clicking her
// gives a new line. No real test-user videos yet: one card is the AI-generated example clip (labelled), the rest say so.
import { useCallback, useEffect, useRef, useState } from "react";

type Act = "hello" | "talk" | "point" | "laugh" | "dance" | "walkR" | "walkL";
type Card = { id: string; label: string; src?: string; poster?: string };

const acts: Act[] = ["hello", "talk", "point", "laugh", "dance", "walkR", "walkL"];
const SPEED = 150; // px per second while walking

const cards: Card[] = [
  { id: "a", label: "Eksempel", src: "/video/kunde-1.mp4", poster: "/video/kunde-1-poster.jpg" },
  { id: "b", label: "Testbruger" },
  { id: "c", label: "Testbruger" },
];

const pokes: [string, Act][] = [
  ["Hov! Det kilder.", "laugh"],
  ["Ti minutter om dagen. Det er alt, hvad jeg beder om.", "talk"],
  ["Jeg har en blyant i håret. Man ved aldrig.", "talk"],
  ["Prøv at trykke på en af videoerne.", "hello"],
  ["Claude, ChatGPT eller Copilot? Jeg kan dem alle tre.", "dance"],
];

export function MiwaLive() {
  const [ext, setExt] = useState<"webm" | "mp4" | null>(null);
  const [act, setAct] = useState<Act | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const touched = useRef(false);
  const poke = useRef(0);
  const idle = useRef<HTMLVideoElement>(null);
  const clips = useRef<Partial<Record<Act, HTMLVideoElement | null>>>({});
  const vids = useRef<Record<string, HTMLVideoElement | null>>({});
  const timers = useRef<number[]>([]);
  const queued = useRef<Act | null>(null);
  const [pos, setPos] = useState(0);
  const [walkMs, setWalkMs] = useState(0);
  const posRef = useRef(0);
  const range = useRef(0);
  const busy = useRef(false);
  const walkEnd = useRef<(() => void) | null>(null);
  const walker = useRef<HTMLDivElement>(null);
  const later = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };

  // Safari can't show VP9 alpha; it gets the HEVC-with-alpha files instead.
  useEffect(() => {
    const ua = navigator.userAgent;
    setExt(/^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(ua) ? "mp4" : "webm");
  }, []);

  // Plays one action clip on top of the idle loop. Idle is parked on frame 0 (the shared rest pose) meanwhile.
  const run = useCallback((a: Act, then: Act | null = null) => {
    queued.current = then;
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
    const next = queued.current;
    if (next) { run(next); return; }
    setAct((cur) => (cur === a ? null : cur));
    void idle.current?.play().catch(() => {});
  };

  // Walks to x (px from her home spot next to the cards, negative = left), then calls after().
  const walkTo = useCallback((x: number, after?: () => void) => {
    const dist = Math.abs(x - posRef.current);
    if (dist < 8 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { posRef.current = x; setWalkMs(0); setPos(x); after?.(); return; }
    run(x > posRef.current ? "walkR" : "walkL");
    const ms = Math.round((dist / SPEED) * 1000);
    walkEnd.current = () => { walkEnd.current = null; queued.current = null; setAct(null); void idle.current?.play().catch(() => {}); after?.(); };
    posRef.current = x; setWalkMs(ms); setPos(x);
    later(ms + 40, () => walkEnd.current?.());
  }, [run]);

  const play = useCallback((c: Card, byMiwa: boolean) => {
    setPressed(c.id);
    later(260, () => setPressed(null));
    if (!c.src) {
      setPlaying(null);
      setLine("Den video er på vej. Testbrugerne er ved at optage!");
      run("talk");
      return;
    }
    Object.entries(vids.current).forEach(([id, v]) => { if (id !== c.id && v) v.pause(); });
    const v = vids.current[c.id];
    if (v) { v.currentTime = 0; v.muted = byMiwa; void v.play().catch(() => {}); }
    setPlaying(c.id);
    busy.current = true;
    later(9000, () => { busy.current = false; });
    setLine(byMiwa ? "Den her må du se!" : "Haha, den elsker jeg!");
    later(byMiwa ? 900 : 150, () => run(byMiwa ? "laugh" : "dance", byMiwa ? "dance" : "laugh"));
  }, [run]);

  // Opening scene: wave + hello, then a hint, then she taps the first card herself unless the visitor already did.
  // She starts a bit to the left on wide screens and walks over to the cards; phones keep her in place.
  useEffect(() => {
    // How far left she may go: never past the headline (her body starts ~20 % into the clip frame).
    const box = walker.current?.getBoundingClientRect();
    const title = document.querySelector("[data-hero-title]")?.getBoundingClientRect();
    const free = box && title ? box.left + box.width * 0.2 - (title.right + 40) : 0;
    range.current = window.innerWidth >= 1024 ? Math.max(0, Math.round(Math.min(window.innerWidth * 0.2, 320, free))) : 0;
    posRef.current = -range.current; setPos(-range.current);
  }, []);

  // Opening scene: hello, a question, she walks over to the cards and taps the first one herself.
  useEffect(() => {
    if (!ext) return;
    busy.current = true;
    later(600, () => { setLine("Hej! Jeg er Miwa, din AI-tutor."); run("hello"); });
    later(4300, () => { if (touched.current) return; setLine("Vil du høre, hvad testbrugerne siger?"); run("talk"); });
    later(7000, () => {
      if (touched.current) { busy.current = false; return; }
      setLine("Kom, jeg viser dig det!");
      walkTo(0, () => {
        if (touched.current) { busy.current = false; return; }
        setLine("Jeg trykker bare på den her…");
        run("point");
        later(650, () => { if (!touched.current) play(cards[0], true); });
      });
    });
    // Now and then she strolls somewhere else and back, when nothing else is going on.
    const wander = window.setInterval(() => {
      if (busy.current || !range.current) return;
      busy.current = true;
      const x = -Math.round(range.current * (0.3 + Math.random() * 0.7));
      walkTo(x, () => later(2600, () => walkTo(0, () => { busy.current = false; })));
    }, 16000);
    return () => { timers.current.forEach(clearTimeout); clearInterval(wander); };
  }, [ext, run, play, walkTo]);

  const onMiwa = () => {
    if (act === "walkR" || act === "walkL") return;
    touched.current = true;
    const [text, a] = pokes[poke.current++ % pokes.length];
    setLine(text);
    run(a);
  };

  return (
    <div className="relative mx-auto mt-16 flex h-[26rem] w-full max-w-[40rem] items-end justify-center gap-1 sm:mt-0 sm:h-[min(78svh,46rem)] lg:mr-0 lg:h-[calc(100svh-13rem)] lg:max-w-none lg:justify-end">
      <style>{`
        @keyframes mwPop { 0% { opacity: 0; transform: translateY(8px) scale(0.92); } 100% { opacity: 1; transform: none; } }
        .mw-bubble { animation: mwPop 320ms cubic-bezier(.2,.9,.3,1.2); }
        @media (prefers-reduced-motion: reduce) { .mw-bubble { animation: none; } }
      `}</style>

      {/* Miwa: 720×960 clips; her figure fills x 7–93 %, y 4–100 % of the frame. */}
      {/* Outer layer walks (translateX); the inner one belongs to the hero's intro animation, which sets its own transform. */}
      <div ref={walker} className="relative h-full min-w-0" style={{ aspectRatio: "3 / 4", transform: `translateX(${pos}px)`, transition: `transform ${walkMs}ms linear` }}>
      <div data-hero-person role="img" aria-label="Miwa, Mindforwards AI-tutor" className="relative size-full">
        <div aria-hidden className="pointer-events-none absolute bottom-[-1%] left-1/2 h-[5%] w-[44%] -translate-x-1/2 rounded-[50%] blur-md" style={{ background: "radial-gradient(closest-side, rgba(60,30,10,0.55), transparent)" }} />
        <button type="button" onClick={onMiwa} aria-label="Sig hej til Miwa" className="nf-focus absolute inset-x-[10%] inset-y-0 z-10 cursor-pointer rounded-[24px]" />
        {/* Still of the rest pose until we know which clip format to load; removed after that, because the clips are
            transparent and anything left underneath shows through as a second Miwa. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {!ext && <img src="/video/miwa/poster.webp" alt="" className="absolute inset-0 size-full object-contain object-bottom" draggable={false} />}
        {ext && (
          <>
            <video ref={idle} src={`/video/miwa/idle.${ext}`} poster="/video/miwa/poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden className="absolute inset-0 size-full object-contain object-bottom" style={{ opacity: act ? 0 : 1 }} />
            {acts.map((a) => (
              <video key={a} ref={(el) => { clips.current[a] = el; }} src={`/video/miwa/${a}.${ext}`} muted playsInline preload="auto" aria-hidden loop={a.startsWith("walk")} onEnded={() => done(a)}
                className="absolute inset-0 size-full object-contain object-bottom" style={{ opacity: act === a ? 1 : 0 }} />
            ))}
          </>
        )}
        {line && (
          <p key={line} role="status" className="mw-bubble absolute left-[-2%] top-[-10%] z-20 max-w-[13rem] rounded-[20px] rounded-br-[6px] bg-white px-4 py-3 text-[0.9375rem] font-semibold leading-snug shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] sm:left-[-14%] sm:top-[0%] sm:max-w-[15rem] lg:left-[4%] lg:top-[-2%]" style={{ color: "#201613" }}>
            {line}
          </p>
        )}
      </div>
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
