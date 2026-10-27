"use client";

import Image from "next/image";

// Preview variant: the four AI tiles sit on a half circle over her, from shoulder to shoulder (her waving hand takes the
// left shoulder). While she waves, lines radiate out from behind her to each tile and the tiles light up;
// otherwise the tiles just float, a little transparent. Coordinates are % of the tile box.
const CX = 29; // centre of the arc, horizontally (her face)
const CY = 74; // shoulder line
const RX = 60;
const RY = 72;
const ORIGIN = { x: 29, y: 34 }; // behind her head; the lines are drawn behind the photo, so they radiate out from her

const tiles = [
  { a: 130, src: "/logos/claude.png" },
  { a: 90, ai: true },
  { a: 50, src: "/logos/chatgpt.png" },
  { a: 14, src: "/logos/copilot.png" },
] as const;

const pos = (a: number) => ({ x: CX + RX * Math.cos((a * Math.PI) / 180), y: CY - RY * Math.sin((a * Math.PI) / 180) });

export function ArcLines({ waving }: { waving: boolean }) {
  return (
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* the half circle itself, very faint */}
        <path d={`M ${CX - RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY}`} fill="none" stroke="white" strokeOpacity={waving ? 0.28 : 0.1} strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" className="transition-[stroke-opacity] duration-500" />
        {tiles.map((t, i) => {
          const p = pos(t.a);
          return (
            <line
              key={i}
              x1={ORIGIN.x}
              y1={ORIGIN.y}
              x2={p.x}
              y2={p.y}
              stroke="oklch(0.82 0.13 48)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 5"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              className="transition-[stroke-dashoffset,opacity] duration-700 ease-out"
              style={{ strokeDasharray: "100", strokeDashoffset: waving ? 0 : 100, opacity: waving ? 1 : 0, transitionDelay: waving ? `${i * 90}ms` : "0ms" }}
            />
          );
        })}
      </svg>
  );
}

export function ArcTiles({ waving }: { waving: boolean }) {
  return (
    <>
      {tiles.map((t, i) => {
        const p = pos(t.a);
        return (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <div
              className={`ny-float size-[64px] overflow-hidden rounded-[20px] shadow-[0_18px_40px_-14px_rgba(14,8,6,.7)] transition-[opacity,box-shadow] duration-500 ${waving ? "opacity-100 ring-4 ring-white/50" : "opacity-60 ring-2 ring-white/20"} ${"ai" in t ? "grid place-items-center bg-[linear-gradient(145deg,#4a2f27_0%,#33201b_100%)]" : "bg-white"}`}
              style={{ ["--r" as string]: `${i % 2 ? 4 : -4}deg`, ["--float-d" as string]: `${5 + i * 0.4}s`, ["--delay" as string]: `${-i * 1.2}s` }}
            >
              {"ai" in t ? (
                <span className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[oklch(0.72_0.17_42)]">AI</span>
              ) : (
                <Image src={t.src} alt="" width={128} height={128} className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
