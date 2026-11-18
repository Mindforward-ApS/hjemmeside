"use client";

// Preview for "Sådan starter I" (Marco 2026-11-05). Round 1 (A/B/C in StartVarianter) was rejected;
// this is the version built closely on Calendly's steps section, under the chosen hero D.
import { Hero } from "@/components/lab/NyForside";
import { StartCalendly } from "@/components/lab/StartCalendly";

export function StartPreview() {
  return (
    <div className="bg-white">
      <style>{`@keyframes hlScroll { to { transform: translateX(-50%); } } .hl-track { animation: hlScroll 38s linear infinite; } .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; }`}</style>
      <Hero media="video" />
      <div id="sektion"><StartCalendly /></div>
      <div className="h-[30vh] bg-white" />
    </div>
  );
}
