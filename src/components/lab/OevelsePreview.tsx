"use client";

// "Øv på dine egne opgaver" round 3 (Marco 2026-11-05): current (Nu = P) and three versions in its style,
// under the chosen sections above it.
import { useState } from "react";
import { Hero } from "@/components/lab/NyForside";
import { StartCalendly } from "@/components/lab/StartCalendly";
import { V3 as Faerdigheder } from "@/components/lab/FaerdighederVarianter";
import { P as Nu } from "@/components/lab/Oevelse";
import { O1, O2, O3 } from "@/components/lab/OevelseVarianter";

const variants = { Nu, "1": O1, "2": O2, "3": O3 } as const;
const names: Record<keyof typeof variants, string> = { Nu: "Nu", "1": "Videoen fylder", "2": "Som nu med tidslinje", "3": "Stor score" };
type K = keyof typeof variants;

export function OevelsePreview() {
  const [v, setV] = useState<K>("1");
  const S = variants[v];
  return (
    <div className="bg-white">
      <style>{`@keyframes hlScroll { to { transform: translateX(-50%); } } .hl-track { animation: hlScroll 38s linear infinite; } .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; }`}</style>
      <Hero media="video" />
      <StartCalendly />
      <Faerdigheder />
      <div id="sektion"><S key={v} /></div>
      <div className="h-[30vh] bg-white" />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">Øv</span>
        {(Object.keys(variants) as K[]).map((k) => (
          <button key={k} onClick={() => { setV(k); document.getElementById("sektion")?.scrollIntoView(); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "bg-[#201613] text-white" : "text-[#201613] hover:bg-black/5"}`}>
            {k === "Nu" ? "Nu" : `${k} · ${names[k]}`}
          </button>
        ))}
      </div>
    </div>
  );
}
