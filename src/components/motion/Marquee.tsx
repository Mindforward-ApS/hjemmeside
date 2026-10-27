"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

// Slow marquee that pauses on hover and has a visible pause control (WCAG 2.2.2).
export function Marquee({ children, label, seconds = 40 }: { children: ReactNode; label: string; seconds?: number }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="group relative" aria-label={label}>
      <div className="marquee-mask overflow-hidden">
        <div className={`marquee-track flex w-max gap-4 ${paused ? "is-paused" : ""}`} style={{ animationDuration: `${seconds}s` }}>
          <div className="flex shrink-0 gap-4">{children}</div>
          <div className="flex shrink-0 gap-4" aria-hidden>{children}</div>
        </div>
      </div>
      <button type="button" onClick={() => setPaused((p) => !p)} className="chip mt-4 flex items-center gap-2 sm:absolute sm:-top-[52px] sm:right-0 sm:mt-0" aria-pressed={paused}>
        <Icon name={paused ? "play" : "pause"} size={14} /> {paused ? "Afspil" : "Pause"}
      </button>
    </div>
  );
}
