"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Open Mon–Fri 9–16 Copenhagen time: green dot. Outside those hours: red.
function isOpen(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", weekday: "short", hour: "numeric", hour12: false }).formatToParts(now);
  const day = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return day !== "Sat" && day !== "Sun" && hour >= 9 && hour < 16;
}

// Marco 2026-11-23: the brain logo as a chat bubble fixed in the bottom-right corner, with a live status dot.
export function ChatBubble() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpen());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <button
      type="button"
      aria-label={open === false ? "Chat med os (offline)" : "Chat med os (online)"}
      className="fixed bottom-5 right-5 z-50 grid size-16 place-items-center rounded-full rounded-br-[6px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,.08),0_2px_4px_rgba(0,0,0,.12),0_12px_28px_-8px_rgba(0,0,0,.35)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1d4ed8] sm:bottom-6 sm:right-6"
    >
      <Image src="/img/mindforward-logo-3.png" alt="" width={600} height={499} className="h-auto w-10" />
      {open !== null && (
        <span aria-hidden className={`absolute right-0.5 top-0.5 size-3.5 rounded-full ring-2 ring-white ${open ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />
      )}
    </button>
  );
}
