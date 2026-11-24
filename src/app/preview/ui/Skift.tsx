"use client";

import { useEffect, useState } from "react";

// Før/Efter for "rigtig UI": toggles .ui-real on <html>; the design pass (.dp) stays on underneath.
export function Skift() {
  const [on, setOn] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dp"); }, []);
  useEffect(() => { document.documentElement.classList.toggle("ui-real", on); }, [on]);
  return (
    <div className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#201613] p-1 text-[14px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)]">
      {[["Før", false], ["Efter", true]].map(([l, v]) => (
        <button key={String(l)} type="button" onClick={() => setOn(v as boolean)} className={`rounded-full px-5 py-2 transition-colors ${on === v ? "bg-white text-[#201613]" : "text-white/70 hover:text-white"}`}>{l as string}</button>
      ))}
    </div>
  );
}
