"use client";

// The big story card plays a video story. The poster shows first, and clicking plays it inline with sound, controls and
// Danish captions. It pauses when scrolled out of view.
// The current clip is an AI-generated placeholder person (Marco 2026-10-23), so it is labelled as an example and must
// never be presented as a real customer.
import { useEffect, useRef, useState } from "react";

const coralFill = "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))";

export function VideoStory({ src, poster, length, captions, quote, label, name, role }: { src: string; poster: string; length: string; captions?: string; quote?: string; label: string; name?: string; role?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const play = () => {
    const v = video.current;
    if (!v) return;
    setPlaying(true);
    v.play();
  };

  return (
    <figure className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-black text-white">
      <video
        ref={video}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controls={playing}
        onPause={() => video.current?.ended && setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {captions && <track kind="captions" src={captions} srcLang="da" label="Dansk" default />}
      </video>
      {!playing && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,8,0.35)_0%,transparent_35%,transparent_55%,rgba(20,10,8,0.75)_100%)]" />
          <span className="absolute left-6 top-6 rounded-full bg-black/35 px-3 py-1 text-[0.8125rem] text-white/85 backdrop-blur md:left-8 md:top-8">{label} · {length}</span>
          <div className="absolute inset-x-6 bottom-6 max-w-[32rem] md:inset-x-8 md:bottom-8">
            {quote && <blockquote className="font-display text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.02em]">”{quote}”</blockquote>}
            {name && (
              <figcaption className="mt-4 text-[0.9375rem]">
                <span className="font-medium text-white">{name}</span>
                {role && <span className="text-white/70"> · {role}</span>}
              </figcaption>
            )}
          </div>
          <button type="button" onClick={play} aria-label="Afspil kundeudtalelse" className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-[0_0_50px_oklch(0.68_0.17_28/0.55)] transition-transform hover:scale-105" style={{ background: coralFill }}>
            <svg viewBox="0 0 24 24" aria-hidden className="size-8"><path d="M7 4.8v14.4a1 1 0 001.5.86l11.2-7.2a1 1 0 000-1.72L8.5 3.94A1 1 0 007 4.8z" fill="currentColor" /></svg>
          </button>
        </>
      )}
    </figure>
  );
}
