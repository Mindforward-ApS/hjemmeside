"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// The Mindforward hero person (Marco's own cut-outs from ai-skabelon). She waves when the page opens, then
// cross-fades to arms crossed; hovering waves again. Both images share one canvas aligned on the face.
// Mood image only: not presented as a customer, learner or instructor.
export function HeroPerson({ onWavingChange, forceWaving }: { onWavingChange?: (waving: boolean) => void; forceWaving?: boolean }) {
  const [autoWaving, setWaving] = useState(true);
  const waving = forceWaving ?? autoWaving;
  useEffect(() => onWavingChange?.(waving), [waving, onWavingChange]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setWaving(false), reduce ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative h-full w-full" onMouseEnter={() => setWaving(true)} onMouseLeave={() => setWaving(false)}>
      {(["crossed", "wave"] as const).map((v) => (
        <Image
          key={v}
          src={`/img/mf-hero-${v}.webp`}
          alt={v === "crossed" ? "Smilende kvinde med briller og grøn skjorte med korslagte arme" : ""}
          aria-hidden={v === "wave" || undefined}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className={`select-none object-contain object-bottom transition-opacity duration-300 ${(v === "wave") === waving ? "opacity-100" : "opacity-0"}`}
          draggable={false}
        />
      ))}
    </div>
  );
}
