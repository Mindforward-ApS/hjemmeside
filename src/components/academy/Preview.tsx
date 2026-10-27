"use client";

import Image from "next/image";
import { useState } from "react";
import { preview } from "@/content/academy";
import { Head } from "@/components/academy/Shared";

const stage =
  "radial-gradient(70% 70% at 50% 10%, #3d2c28 0%, #2e1f1c 40%, transparent 80%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";
const coral = "oklch(0.66 0.19 33)";
const coralFill = "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))";
const ink = "oklch(0.24 0.02 30)";
const startIdx = preview.chapters.findIndex((c) => c.active);

// Video frame: the instructor on the hero's stage, captions, coral play button, progress bar.
export function Player({ chapter, big = false }: { chapter: number; big?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${big ? "aspect-video md:aspect-[21/9]" : "aspect-video"}`} style={{ background: stage }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_60%_at_62%_40%,oklch(0.68_0.1_50/0.4),transparent_70%)]" />
      <Image src="/img/mf-hero-crossed.webp" alt="Underviser" width={1100} height={998} className="absolute bottom-0 right-[6%] h-[92%] w-auto select-none object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 text-[0.75rem] text-white/75 md:p-7 md:text-[0.8125rem]">
        <span className="hidden truncate sm:block">{preview.course}</span>
        <span className="whitespace-nowrap rounded-full bg-black/25 px-3 py-1 backdrop-blur">Lektion {chapter + 1} · {preview.chapters[chapter].d}</span>
      </div>
      <div className="absolute bottom-0 left-0 max-w-[55%] p-4 md:p-8">
        <p className={`font-display font-normal leading-[1.05] tracking-[-0.035em] text-white ${big ? "text-[clamp(1.75rem,1rem+2.4vw,3.25rem)]" : "text-[clamp(1.375rem,1rem+1.2vw,2rem)]"}`}>{preview.chapters[chapter].t}</p>
        <button type="button" aria-label="Afspil lektion (demo)" className={`mt-5 grid place-items-center rounded-full text-white shadow-[0_0_50px_oklch(0.68_0.17_28/0.55)] transition-transform duration-150 hover:scale-105 ${big ? "size-14 md:size-20" : "size-11 md:size-14"}`} style={{ background: coralFill }}>
          {/* Filled triangle. The path sits slightly right in its box, so its visual weight lands in the circle's centre */}
          <svg viewBox="0 0 24 24" aria-hidden className={big ? "size-6 md:size-8" : "size-5 md:size-6"}>
            <path d="M7 4.8v14.4a1 1 0 001.5.86l11.2-7.2a1 1 0 000-1.72L8.5 3.94A1 1 0 007 4.8z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15"><div className="h-full w-[38%]" style={{ background: coral }} /></div>
    </div>
  );
}

// 6 · Sample lesson (Marco 2026-10-22: P2 "Biograf", adjusted). There is one wide player with the instructor on the
// hero's stage and a segmented lesson timeline below it. Marco removed the take-aways and the subtitle.
export function Preview() {
  const [active, setActive] = useState(startIdx);
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <Head label="Smagsprøve" title="Se en lektion, før du starter" />
        <div className="mt-14 overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_oklch(0.2_0.04_30/0.6)]">
          <Player chapter={active} big />
        </div>
        {/* Chapters as a segmented timeline: one bar per lesson (done = dark, active = coral, next = light) */}
        <ol className="mt-6 grid grid-cols-5 gap-2 md:gap-4" aria-label="Lektioner">
          {preview.chapters.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.t}>
                <button type="button" onClick={() => setActive(i)} aria-current={on ? "true" : undefined} className="group w-full text-left">
                  <span className="block h-[3px] overflow-hidden rounded-full bg-[oklch(0.2_0.01_30/0.12)]">
                    <span className="block h-full rounded-full transition-[width] duration-300" style={{ width: c.done ? "100%" : on ? "38%" : "0%", background: on ? coral : ink }} />
                  </span>
                  <span className="mt-3 hidden text-[0.8125rem] text-muted md:block">Lektion {i + 1} · {c.d}</span>
                  <span className={`mt-1 hidden text-[0.9375rem] leading-snug transition-colors md:block ${on ? "font-medium text-heading" : "text-muted group-hover:text-heading"}`}>{c.t}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
