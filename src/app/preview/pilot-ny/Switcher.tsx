"use client";

import { useEffect, useState } from "react";
import { NyForside } from "@/components/lab/NyForside";

const versions = [{ k: "a", l: "A · Tekst venstre, billede højre" }, { k: "b", l: "B · Mørkt kort, to billeder" }, { k: "c", l: "C · Fire kort med billeder" }] as const;
type V = (typeof versions)[number]["k"];

export function Switcher() {
  const [v, setV] = useState<V>("a");
  useEffect(() => { const h = location.hash.slice(1); if (h === "a" || h === "b" || h === "c") setV(h); }, []);
  const pick = (k: V) => { setV(k); history.replaceState(null, "", `#${k}`); requestAnimationFrame(() => document.getElementById("pilot")?.scrollIntoView({ behavior: "smooth" })); };
  return (
    <>
      <NyForside layout="ny" practice="b" pilot={v} />
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-[#201613] p-1 shadow-xl ring-1 ring-white/15">
        {versions.map((o) => (
          <button key={o.k} type="button" onClick={() => pick(o.k)} className={`whitespace-nowrap rounded-full px-4 py-2 text-[0.8125rem] font-medium ${v === o.k ? "bg-white text-[#201613]" : "text-white/75 hover:text-white"}`}>{o.l}</button>
        ))}
      </div>
    </>
  );
}
