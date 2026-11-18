"use client";

// The whole front page with UI animations, three versions (Marco 2026-11-05). See uiMotion.tsx.
import { useState } from "react";
import { NyForside } from "@/components/lab/NyForside";
import type { UiMode } from "@/components/lab/uiMotion";

const names: Record<Exclude<UiMode, "off">, string> = { once: "Én gang", loop: "Levende", type: "AI skriver" };
type K = keyof typeof names;

export function UiMotionPreview() {
  const [v, setV] = useState<K>("once");
  const [run, setRun] = useState(0);
  return (
    <>
      <NyForside key={`${v}-${run}`} uiMode={v} />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">UI</span>
        {(Object.keys(names) as K[]).map((k, i) => (
          <button key={k} onClick={() => { setV(k); setRun((r) => r + 1); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "bg-[#201613] text-white" : "text-[#201613] hover:bg-black/5"}`}>
            {i + 1} · {names[k]}
          </button>
        ))}
        <a href="/" className="h-9 rounded-full px-4 py-2 text-[0.875rem] font-semibold text-[#201613] hover:bg-black/5">Nu</a>
      </div>
    </>
  );
}
