"use client";

// Motion for "Fra invitation til første score" (Marco 2026-11-05): three versions on cards and graphic elements.
import { useState } from "react";
import { StartCalendly } from "@/components/lab/StartCalendly";
import { UiMotionProvider } from "@/components/lab/uiMotion";

type K = "a" | "b" | "c";
const names: Record<K, string> = { a: "Gennemgang", b: "Kortene kommer ind", c: "UI'en lever" };

export function StartMotionPreview() {
  const [v, setV] = useState<K>("a");
  const [run, setRun] = useState(0);
  return (
    <div className="bg-white">
      <div className="grid h-[70vh] place-items-center bg-[#201613] text-white/50">Hero (uændret) · scroll ned</div>
      <div id="sektion"><UiMotionProvider mode={v === "c" ? "once" : "off"}><StartCalendly key={`${v}-${run}`} motion={v === "c" ? undefined : v} /></UiMotionProvider></div>
      <div className="h-[60vh] bg-white" />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">Start</span>
        {(Object.keys(names) as K[]).map((k, i) => (
          <button key={k} onClick={() => { scrollTo(0, 0); setV(k); setRun((r) => r + 1); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "bg-[#201613] text-white" : "text-[#201613] hover:bg-black/5"}`}>
            {i + 1} · {names[k]}
          </button>
        ))}
        <button onClick={() => { scrollTo(0, 0); setRun((r) => r + 1); }} className="h-9 rounded-full px-4 text-[0.875rem] font-semibold text-[#201613] hover:bg-black/5">↻ Igen</button>
      </div>
    </div>
  );
}
