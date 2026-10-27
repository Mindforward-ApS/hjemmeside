"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

// Three AI assistants as round buttons. The chosen one slides to the centre, grows and glows.
// Click a side button, drag/swipe the row, or use the arrow keys.
// Logos: /public/logos/{id}.png (Marco's files from ai-skabelon, white background removed).
// If a file is missing, the name is shown instead.
type Ai = { id: string; name: string; logo?: string };

export const assistants: Ai[] = [
  { id: "copilot", name: "Copilot", logo: "/logos/copilot.png" },
  { id: "claude", name: "Claude", logo: "/logos/claude.png" },
  { id: "chatgpt", name: "ChatGPT", logo: "/logos/chatgpt.png" },
];

// Slot positions relative to the active item: 0 = centre, 1 = right, 2 = left
const slot = [
  { x: 0, size: 6.5, z: 3 },
  { x: 7.5, size: 4, z: 2 },
  { x: -7.5, size: 4, z: 2 },
];

function Mark({ ai, active }: { ai: Ai; active: boolean }) {
  const [failed, setFailed] = useState(!ai.logo);
  if (!failed && ai.logo) {
    return (
      <Image
        src={ai.logo}
        alt=""
        width={192}
        height={192}
        draggable={false}
        className={`rounded-[26%] object-contain transition-[opacity,transform] duration-[420ms] ${ai.id === "chatgpt" ? "size-[58%]" : "size-[64%]"} ${active ? "" : "opacity-70 saturate-[0.8]"}`}
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className={`font-medium tracking-[-0.01em] ${active ? "text-[0.9375rem] text-white" : "text-[0.6875rem] text-heading/80"}`}>{ai.name}</span>;
}

export function AiPicker({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  const n = assistants.length;
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  const go = (dir: 1 | -1) => onChange((value + dir + n) % n);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, moved: false }; };
  const onUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // drag left → next comes to the centre
  };

  return (
    <div
      role="radiogroup"
      aria-label="Vælg AI-assistent"
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={() => (drag.current = null)}
      className="relative mx-auto h-[7.5rem] w-full max-w-[22rem] touch-pan-y select-none"
    >
      {assistants.map((ai, i) => {
        const s = slot[(i - value + n) % n];
        const active = i === value;
        return (
          <button
            key={ai.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={ai.name}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(i)}
            className={`absolute left-1/2 top-1/2 grid place-items-center rounded-full transition-[transform,width,height,box-shadow,background-color] duration-[420ms] ease-[var(--ease-enter)] ${
              active ? "text-white shadow-[0_0_70px_oklch(0.68_0.17_28/0.65)]" : "n-glass hover:bg-[var(--hover-fill)]"
            }`}
            style={{
              width: `${s.size}rem`,
              height: `${s.size}rem`,
              zIndex: s.z,
              transform: `translate(calc(-50% + ${s.x}rem), -50%)`,
              background: active ? "radial-gradient(circle at 35% 30%, oklch(0.82 0.12 38), oklch(0.6 0.17 24))" : undefined,
            }}
          >
            <Mark ai={ai} active={active} />
          </button>
        );
      })}
    </div>
  );
}
