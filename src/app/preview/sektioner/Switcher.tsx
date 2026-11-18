"use client";

import { useEffect, useState } from "react";
import { NyForside } from "@/components/lab/NyForside";

const versions = [{ k: 1, l: "1 · Skiftende flader" }, { k: 2, l: "2 · Paneler" }, { k: 3, l: "3 · Linjer og numre" }] as const;
type V = 1 | 2 | 3;

export function Switcher() {
  const [v, setV] = useState<V>(1);
  useEffect(() => { const h = Number(location.hash.slice(1)); if (h === 1 || h === 2 || h === 3) setV(h); }, []);
  const pick = (k: V) => { setV(k); history.replaceState(null, "", `#${k}`); };
  return (
    <>
      <NyForside layout="ny" practice="b" pilot="a" sep={v} />
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-[#201613] p-1 shadow-xl ring-1 ring-white/15">
        {versions.map((o) => (
          <button key={o.k} type="button" onClick={() => pick(o.k)} className={`whitespace-nowrap rounded-full px-4 py-2 text-[0.8125rem] font-medium ${v === o.k ? "bg-white text-[#201613]" : "text-white/75 hover:text-white"}`}>{o.l}</button>
        ))}
      </div>
    </>
  );
}
