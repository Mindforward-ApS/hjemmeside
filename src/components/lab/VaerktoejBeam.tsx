import Image from "next/image";

// "Øv i jeres værktøj" (Marco 2026-11-24): Mindforward's logo in a circle on top, the three tools in circles below, and
// an animated beam running from our logo down to each tool in that tool's colour. All three fire at the same time
// (Marco 2026-11-24: "som om Miwa skyder strålerne ned"). Pure SVG + CSS, no JS.
const line = "rgba(32,22,19,0.1)";
const tools = [
  { f: "chatgpt", n: "ChatGPT", c1: "#10a37f", c2: "#7fe0c2", x: 40 },
  { f: "copilot", n: "Copilot", c1: "#2f7bf5", c2: "#c86bfa", x: 120 },
  { f: "claude", n: "Claude", c1: "#d97757", c2: "#f3b59c", x: 200 },
];
// Beams start under the logo (120, 46) and curve down to each tool circle top (x, 118).
const path = (x: number) => `M120 46 C120 82, ${x} 82, ${x} 118`;

export function VaerktoejBeam() {
  return (
    <div className="relative mx-auto aspect-[240/180] w-full max-w-[260px]">
      <svg viewBox="0 0 240 180" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <defs>
          {tools.map((t) => (
            <linearGradient key={t.f} id={`beam-${t.f}`} gradientUnits="userSpaceOnUse" x1="120" y1="46" x2={t.x} y2="118">
              <stop offset="0" stopColor={t.c2} stopOpacity="0" />
              <stop offset="0.5" stopColor={t.c1} />
              <stop offset="1" stopColor={t.c2} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {tools.map((t) => (
          <g key={t.f}>
            <path d={path(t.x)} stroke={line} strokeWidth="2" />
            <path d={path(t.x)} stroke={t.c1} strokeWidth="3" strokeLinecap="round" pathLength={100} className="vb-beam" style={{ filter: `drop-shadow(0 0 3px ${t.c1})` }} />
          </g>
        ))}
      </svg>
      <span className="absolute left-1/2 top-0 grid size-[46px] -translate-x-1/2 place-items-center rounded-full border bg-white" style={{ borderColor: line, boxShadow: "0 6px 16px -8px rgba(32,22,19,0.35)" }}>
        <Image src="/img/miwa-chat.png" alt="Mindforward" width={256} height={213} className="h-[25px] w-auto" />
      </span>
      {tools.map((t) => (
        <span key={t.f} className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5" style={{ left: `${(t.x / 240) * 100}%`, top: `${(118 / 180) * 100}%` }}>
          <span className="grid size-[46px] place-items-center rounded-full border bg-white" style={{ borderColor: line, boxShadow: `0 0 0 3px ${t.c1}14` }}>
            <Image src={`/logos/${t.f}.png`} alt="" width={26} height={26} />
          </span>
          <span className="text-[0.75rem]" style={{ color: "#6b625d" }}>{t.n}</span>
        </span>
      ))}
      <style>{`
        /* All three fire at once from the logo, like MIND shooting them down; then a short pause before the next shot. */
        .vb-beam { stroke-dasharray: 26 200; stroke-dashoffset: 26; animation: vb-shoot 2.2s cubic-bezier(.55,0,.35,1) infinite; }
        @keyframes vb-shoot { 0% { stroke-dashoffset: 26; } 55% { stroke-dashoffset: -100; } 100% { stroke-dashoffset: -100; } }
        @media (prefers-reduced-motion: reduce) { .vb-beam { animation: none; stroke-dasharray: none; } }
      `}</style>
    </div>
  );
}
