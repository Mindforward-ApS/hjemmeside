"use client";

// Logo band under the hero (Marco 2026-10-22: B1 "Mørk scene"). The hero's stage continues; demo logos until real ones exist.
import { useState, type ReactNode } from "react";
import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import { Icon } from "@/components/ui/Icon";
import { DemoLogo, demoLogos } from "@/components/night/DemoLogos";

// Same stage as WarmHero, so the band reads as the scene continuing.
const stage =
  "radial-gradient(60% 120% at 50% 0%, #2e1f1c 0%, transparent 70%), linear-gradient(180deg, #201613 0%, #1c100d 100%)";

function Track({ children, seconds, reverse = false, paused, mask }: { children: ReactNode; seconds: number; reverse?: boolean; paused: boolean; mask: string }) {
  return (
    <div className="overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <div
        className={`marquee-track flex w-max ${paused ? "is-paused" : ""}`}
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

function PauseButton({ paused, onClick, dark = false }: { paused: boolean; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={paused}
      aria-label={paused ? "Afspil logoer" : "Sæt logoer på pause"}
      className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-150 ${dark ? "text-white/80 ring-1 ring-white/25 hover:bg-white/10" : "text-[oklch(0.3_0.015_30)] ring-1 ring-[var(--border-strong)] hover:bg-[var(--hover-fill)]"}`}
    >
      <Icon name={paused ? "play" : "pause"} size={16} />
    </button>
  );
}

const fade = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

// B1: the hero's chocolate stage continues as a band; logos in cream, orange light from the top edge.
export function NightLogos() {
  if (!VIS_PLADSHOLDERE) return null;
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Kunder" className="group relative overflow-hidden" style={{ background: stage }}>
      {/* Orange light falling from the top edge down toward the logos (no drawn line) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_95%_at_55%_0%,oklch(0.66_0.17_38/0.32),oklch(0.55_0.14_35/0.1)_45%,transparent_75%)]" />
      <div className="relative flex flex-col gap-8 px-6 py-12 md:px-[3.5vw] lg:flex-row lg:items-center lg:gap-12 lg:py-14">
        <p className="shrink-0 pr-14 text-[1.0625rem] leading-snug text-white/70 lg:max-w-[16rem] lg:pr-0">
          Medarbejdere fra over{" "}
          <span className="whitespace-nowrap font-medium text-[oklch(0.86_0.07_55)]">140 virksomheder</span>{" "}
          lærer hos os
        </p>
        <div className="min-w-0 flex-1 group-hover:[&_.marquee-track]:[animation-play-state:paused]">
          <Track seconds={45} paused={paused} mask={fade}>
            {demoLogos.map((l) => (
              <span key={l.name} className="px-10 text-[oklch(0.93_0.03_50/0.62)] transition-colors duration-200 hover:text-white">
                <DemoLogo logo={l} className="sm:!text-[1.5rem]" />
              </span>
            ))}
          </Track>
        </div>
        <div className="absolute right-6 top-12 lg:static"><PauseButton dark paused={paused} onClick={() => setPaused((p) => !p)} /></div>
      </div>
    </section>
  );
}
