"use client";

// Round 1 (a/b/c) rejected 2026-11-10; still reachable via #a #b #c. Product-video section after the hero: three versions on the full front page, switcher at the bottom (2026-11-10).
import { useEffect, useState } from "react";
import { NyForside } from "@/components/lab/NyForside";
import type { VideoVersion } from "@/components/lab/VideoSektion";

const versions: { k: VideoVersion; label: string }[] = [
  { k: "h", label: "8 Video med intro" },
  { k: "g", label: "7 Bare video" },
  { k: "d", label: "4 Skrivebord" },
  { k: "e", label: "5 Over fotoet" },
  { k: "f", label: "6 Farveflade" },
];

export function VideoPreview() {
  const [v, setV] = useState<VideoVersion>("h");
  useEffect(() => { const h = location.hash.slice(1); if (h in { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1 }) setV(h as VideoVersion); }, []);
  const pick = (k: VideoVersion) => { setV(k); history.replaceState(null, "", `#${k}`); };
  return (
    <>
      <NyForside key={v} video={v} />
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-[#201613] p-1 shadow-xl ring-1 ring-white/15">
        {versions.map((o) => (
          <button key={o.k} type="button" onClick={() => pick(o.k)} className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium ${v === o.k ? "bg-white text-[#201613]" : "text-white/75 hover:text-white"}`}>{o.label}</button>
        ))}
      </div>
    </>
  );
}
