"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Testimonial carousel in the hero (Marco 2026-11-23, moved from the tom-skabelon project, only the carousel):
// one tall story card, the neighbours blurred on each side, progress bars on top, live captions while the video
// plays, avatars underneath to switch. The videos are AI avatars (HeyGen via ElevenLabs) with placeholder names,
// so the strip under the avatars says they are examples; they must never be presented as real customers.
type Story = {
  img: string;
  video?: string;
  name: string;
  title: string;
  quote: string;
  tool: number;
  captions?: [number, string][];
};

const ALL_STORIES: Story[] = [
  {
    img: "/stories/historie-01.jpg",
    video: "/stories/historie-01.mp4",
    name: "Emma Holm",
    title: "Marketingkoordinator",
    quote:
      "Jeg havde aldrig brugt AI før, og her gav det bare mening med det samme.",
    tool: 1,
    captions: [
      [0.76, "Ærligt? Mit første indtryk af Mindforward:"],
      [4.2, "Det er mega fedt."],
      [5.96, "Jeg havde aldrig brugt AI før,"],
      [7.96, "og her gav det bare mening med det samme."],
    ],
  },
  {
    img: "/stories/historie-02.jpg",
    video: "/stories/historie-02.mp4",
    name: "Lucas Berg",
    title: "Sælger",
    quote: "Endelig, det her kan jeg faktisk bruge til noget.",
    tool: 0,
    captions: [
      [0.16, "Første gang jeg åbnede Mindforward,"],
      [2.18, "tænkte jeg: endelig,"],
      [4.06, "det her kan jeg faktisk bruge til noget."],
      [6.36, "Så kan klart anbefale det til andre."],
    ],
  },
  {
    img: "/stories/historie-03.jpg",
    video: "/stories/historie-03.mp4",
    name: "Henrik Dahl",
    title: "Indehaver",
    quote:
      "Jeg troede, at AI var pjat for kontorfolk. Det her kan mine folk faktisk bruge.",
    tool: 2,
    captions: [
      [0.12, "Jeg troede, at AI var pjat for kontorfolk."],
      [2.88, "Så prøvede jeg Mindforward."],
      [5.26, "Okay, det her kan mine folk faktisk bruge."],
    ],
  },
  {
    img: "/stories/historie-04.jpg",
    video: "/stories/historie-04.mp4",
    name: "Clara Nygaard",
    title: "HR-chef",
    quote: "Første gang, jeg ser AI-undervisning, hele teamet kan følge med i.",
    tool: 2,
    captions: [
      [0.08, "Jeg tastede vores CVR-nummer,"],
      [2.28, "og så var forløbet tilpasset vores branche."],
      [4.96, "Det er første gang, jeg ser AI-undervisning,"],
      [7.26, "hele teamet kan følge med i."],
    ],
  },
  {
    img: "/stories/historie-05.jpg",
    video: "/stories/historie-05.mp4",
    name: "Birgitte Lund",
    title: "Bogholder",
    quote: "Nu kan jeg endelig følge med, og quizzerne er faktisk ret sjove.",
    tool: 1,
    captions: [
      [0.14, "Mine børnebørn snakker hele tiden om ChatGPT."],
      [4.42, "Nu kan jeg endelig følge med,"],
      [6.26, "og quizzerne er faktisk ret sjove."],
    ],
  },
];

const STORY_MS = 6000;
const CARD = { w: 600, h: 880 };

export function HeroStories() {
  const STORIES = ALL_STORIES;
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [caption, setCaption] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  // The previous active story, so the slideshow knows which cards jump round the ring
  const [shown, setShown] = useState({ cur: index, prev: index });
  if (shown.cur !== index) {
    setShown({ cur: index, prev: shown.cur });
    setCaption(null);
  }
  const story = STORIES[index];

  // Start muted shortly after load (browsers block sound until the visitor interacts)
  useEffect(() => {
    const t = setTimeout(() => setRunning(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Progress: the video's own time, otherwise a fixed number of seconds per story
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const v = video.current;
      const p = story.video && v && v.duration ? v.currentTime / v.duration : (now - startedAt) / STORY_MS;
      setProgress(Math.min(p, 1));
      if (story.captions && v && !v.paused) {
        const line = [...story.captions].reverse().find(([t]) => t <= v.currentTime);
        setCaption(line ? line[1] : null);
      }
      if (p >= 1) {
        setIndex((i) => (i + 1) % STORIES.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, index, story.video, story.captions, STORIES.length]);

  // Play the active story's video
  useEffect(() => {
    const v = video.current;
    if (!v || !running) return;
    v.currentTime = 0;
    v.muted = muted;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      void v.play();
    });
    // muted is handled below, so toggling sound does not restart the video
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, running]);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

  const go = (i: number) => {
    setIndex((i + STORIES.length) % STORIES.length);
    setProgress(0);
    setRunning(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[340px] flex-col items-center lg:max-w-[min(380px,calc((100svh-300px)*0.682))]">
      <div className="relative w-full">
        {/* All stories in a row behind the card: the active one centred, the neighbours blurred at the sides. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 w-[190%] -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_18%,#000_82%,transparent_100%)]">
          {STORIES.map((s, i) => {
            const n = STORIES.length;
            const place = (cur: number) => ((((i - cur + Math.floor(n / 2)) % n) + n) % n) - Math.floor(n / 2);
            const at = place(index);
            const jumped = Math.abs(at - place(shown.prev)) > 1;
            return (
              <div key={s.name} className={`absolute inset-y-0 overflow-hidden rounded-[clamp(18px,3%,32px)] ${jumped ? "" : "transition-[left,filter,opacity,scale] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"} ${at === 0 ? "opacity-100" : "scale-[0.92] opacity-50 blur-[4px]"}`} style={{ left: `${23.68 + at * 55.63}%`, width: "52.63%" }}>
                <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" priority={i < 2} />
              </div>
            );
          })}
        </div>
        <div className="relative w-full overflow-hidden rounded-[clamp(18px,6%,32px)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={{ aspectRatio: `${CARD.w} / ${CARD.h}` }}>
          {story.video && (
            <video key={story.video} ref={video} src={story.video} playsInline preload="metadata" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${running ? "opacity-100" : "opacity-0"}`} />
          )}
          <div className="absolute inset-x-[4%] top-[3%] flex gap-1.5">
            {STORIES.map((s, i) => (
              <div key={s.name} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
                <div className="h-full rounded-full bg-white" style={{ width: `${i < index ? 100 : i === index ? progress * 100 : 0}%` }} />
              </div>
            ))}
          </div>
          <button type="button" aria-label="Forrige historie" onClick={() => go(index - 1)} className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize" />
          <button type="button" aria-label="Næste historie" onClick={() => go(index + 1)} className="absolute inset-y-0 right-0 w-2/3 cursor-e-resize" />
          {story.video && running && (
            <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Slå lyd til" : "Slå lyd fra"} className="absolute right-[4%] top-[7%] grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-transform active:scale-95">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                {muted ? <path d="m17 9 4 6m0-6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
            </button>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-[6%] pb-[6%] pt-[22%] text-white">
            <p key={story.quote} className="text-[clamp(15px,1.15vw,19px)] font-semibold leading-snug [text-wrap:balance]">{running && caption ? caption : `“${story.quote}”`}</p>
            <p className="mt-3 text-sm font-semibold">{story.name}</p>
            <p className="text-sm text-white/75">{story.title}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        {STORIES.map((s, i) => (
          <button key={s.name} type="button" onClick={() => go(i)} aria-label={`Se ${s.name}s historie`} aria-current={i === index} className={`relative h-11 w-11 overflow-hidden rounded-full ring-offset-2 ring-offset-[#201613] transition-[box-shadow,transform] duration-200 hover:scale-105 ${i === index ? "ring-2 ring-[#f8400a]" : "ring-1 ring-white/15"}`}>
            <Image src={s.img} alt="" fill sizes="44px" className="object-cover object-top" />
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-[0.75rem] text-white/45">Eksempler med AI-avatarer</p>
    </div>
  );
}
