"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Editor (preview only): drag the four AI tiles around her, switch pose, save.
// Positions are the tile centres in % of the tile box, saved to design/tile-positions.json via /api/tile-positions.
export type TilePos = Record<"claude" | "chatgpt" | "copilot" | "ai", { x: number; y: number }>;

export const defaultPositions: TilePos = {
  claude: { x: -12.6, y: 18.2 },
  chatgpt: { x: 72.4, y: 55.2 },
  copilot: { x: 0.4, y: 61.2 },
  ai: { x: 59.4, y: 12.2 },
};

const tiles = [
  { id: "claude", src: "/logos/claude.png" },
  { id: "chatgpt", src: "/logos/chatgpt.png" },
  { id: "copilot", src: "/logos/copilot.png" },
  { id: "ai" },
] as const;

const KEY = "tile-editor-v1";

export function EditTiles({ waving, setWaving }: { waving: boolean; setWaving: (w: boolean) => void }) {
  const box = useRef<HTMLDivElement>(null);
  // Restore the last layout from this browser (lazy initial state, no effect needed)
  const [pos, setPos] = useState<TilePos>(() => {
    if (typeof window === "undefined") return defaultPositions;
    try {
      const s = localStorage.getItem(KEY);
      return s ? (JSON.parse(s) as TilePos) : defaultPositions;
    } catch {
      return defaultPositions;
    }
  });
  // Render tiles only after hydration (their saved positions come from this browser)
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [drag, setDrag] = useState<keyof TilePos | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(pos));
    } catch {}
  }, [pos]);

  const move = (e: React.PointerEvent) => {
    if (!drag || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * 1000) / 10;
    const y = Math.round(((e.clientY - r.top) / r.height) * 1000) / 10;
    setPos((p) => ({ ...p, [drag]: { x, y } }));
  };

  const save = async () => {
    setStatus("Gemmer …");
    try {
      const res = await fetch("/api/tile-positions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pos, savedAt: new Date().toISOString() }) });
      setStatus(res.ok ? "Gemt ✓ Skriv til Claude, at du har gemt." : "Kunne ikke gemme");
    } catch {
      setStatus("Kunne ikke gemme");
    }
  };

  return (
    <>
      <div ref={box} className="absolute inset-0" onPointerMove={move} onPointerUp={() => setDrag(null)} onPointerLeave={() => setDrag(null)}>
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-dashed border-white/25" />
        {mounted && tiles.map((t) => {
          const p = pos[t.id];
          return (
            <div
              key={t.id}
              onPointerDown={(e) => {
                e.preventDefault();
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                setDrag(t.id);
              }}
              className={`absolute z-10 size-[64px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none overflow-hidden rounded-[20px] shadow-[0_18px_40px_-14px_rgba(14,8,6,.7)] ring-4 active:cursor-grabbing ${drag === t.id ? "ring-[oklch(0.75_0.16_40)]" : "ring-white/50"} ${t.id === "ai" ? "grid place-items-center bg-[linear-gradient(145deg,#4a2f27_0%,#33201b_100%)]" : "bg-white"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {t.id === "ai" ? (
                <span className="pointer-events-none text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[oklch(0.72_0.17_42)]">AI</span>
              ) : (
                <Image src={t.src} alt="" width={128} height={128} draggable={false} className="pointer-events-none h-full w-full object-cover" />
              )}
            </div>
          );
        })}
      </div>

      {/* Control panel */}
      <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-3 text-[0.9375rem] text-[oklch(0.2_0.02_30)] shadow-3">
        <span className="px-2 font-semibold">Træk ikonerne</span>
        <div className="flex rounded-xl bg-[oklch(0.94_0.01_60)] p-1">
          {[
            { v: true, l: "Vinker" },
            { v: false, l: "Korslagte arme" },
          ].map((o) => (
            <button key={o.l} type="button" onClick={() => setWaving(o.v)} className={`rounded-lg px-3 py-2 ${waving === o.v ? "bg-white font-semibold shadow-1" : "text-[oklch(0.45_0.01_30)]"}`}>
              {o.l}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setPos(defaultPositions)} className="rounded-xl px-3 py-2 text-[oklch(0.45_0.01_30)] hover:bg-[oklch(0.94_0.01_60)]">Nulstil</button>
        <button type="button" onClick={save} className="rounded-xl bg-[oklch(0.62_0.18_33)] px-4 py-2 font-semibold text-white">Gem placering</button>
        {status && <span className="px-2 text-[0.875rem]">{status}</span>}
      </div>
    </>
  );
}
