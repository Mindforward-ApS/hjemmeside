"use client";

// Pilot section round 3 (Marco 2026-11-05): three versions in the style of the current one, under the chosen sections.
import { useState } from "react";
import { Hero } from "@/components/lab/NyForside";
import { StartCalendly } from "@/components/lab/StartCalendly";
import { V3 as Faerdigheder } from "@/components/lab/FaerdighederVarianter";
import { P as Oevelse } from "@/components/lab/Oevelse";
import { C1 as Certifikat } from "@/components/lab/CertVarianter";
import { Pi1, Pi2, Pi3 } from "@/components/lab/PilotVarianter";

const variants = { "1": Pi1, "2": Pi2, "3": Pi3 } as const;
const names: Record<keyof typeof variants, string> = { "1": "Med foto", "2": "Foto i fuld bredde", "3": "Koral flade" };
type K = keyof typeof variants;

export function PilotPreview() {
  const [v, setV] = useState<K>("1");
  const S = variants[v];
  return (
    <div className="bg-white">
      <style>{`@keyframes hlScroll { to { transform: translateX(-50%); } } .hl-track { animation: hlScroll 38s linear infinite; } .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; }`}</style>
      <Hero media="video" />
      <StartCalendly />
      <Faerdigheder />
      <Oevelse />
      <Certifikat />
      <div id="sektion"><S key={v} /></div>
      <div className="h-[30vh] bg-white" />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">Pilot</span>
        {(Object.keys(variants) as K[]).map((k) => (
          <button key={k} onClick={() => { setV(k); document.getElementById("sektion")?.scrollIntoView(); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "bg-[#201613] text-white" : "text-[#201613] hover:bg-black/5"}`}>
            {k} · {names[k]}
          </button>
        ))}
        <a href="/preview/ny-forside" className="h-9 rounded-full px-4 py-2 text-[0.875rem] font-semibold text-[#201613] hover:bg-black/5">Nu</a>
      </div>
    </div>
  );
}
