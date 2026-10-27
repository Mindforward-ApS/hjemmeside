"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, motionQuery } from "@/lib/gsap";
import { categories, courses } from "@/content/academy";
import { Cover } from "@/components/academy/Shared";
import { Icon } from "@/components/ui/Icon";

type Cat = (typeof categories)[number];
const hours = (m: number) => `${(Math.round(m / 6) / 10).toLocaleString("da-DK")} t`;
const stage =
  "radial-gradient(70% 60% at 50% 0%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";
const coral = "oklch(0.66 0.19 33)";

function useFilter() {
  const [cat, setCat] = useState<Cat>("Alle");
  return { cat, setCat, list: courses.filter((c) => cat === "Alle" || c.category === cat) };
}

function Filters({ cat, setCat, dark = false }: { cat: Cat; setCat: (c: Cat) => void; dark?: boolean }) {
  return (
    <div role="group" aria-label="Filtrér kurser" className={`inline-flex max-w-full gap-1 self-start overflow-x-auto rounded-full p-1 [scrollbar-width:none] ${dark ? "border border-white/10 bg-white/[0.06]" : "bg-[var(--surface)] shadow-[0_0_0_1px_var(--border)]"}`}>
      {categories.map((c) => {
        const on = cat === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={on}
            onClick={() => setCat(c)}
            className={`min-h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-[0.9375rem] transition-colors duration-150 ${on ? (dark ? "bg-[oklch(0.93_0.03_50)] font-medium text-[oklch(0.2_0.02_30)]" : "bg-[var(--heading)] text-[var(--bg)]") : dark ? "text-white/80 hover:bg-white/10" : "text-heading hover:bg-[var(--hover-fill)]"}`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function Meta({ lessons, minutes, dark = false }: { lessons: number; minutes: number; dark?: boolean }) {
  return (
    <span className={`flex items-center gap-4 text-[0.875rem] ${dark ? "text-white/60" : "text-muted"}`}>
      <span className="flex items-center gap-1.5"><Icon name="doc" size={15} /> {lessons} lektioner</span>
      <span className="flex items-center gap-1.5"><Icon name="clock" size={15} /> {hours(minutes)}</span>
    </span>
  );
}

// 5 · Course catalog (Marco 2026-10-22: K1 "Hylde på scenen", "Vildt flot"). The section is a dark stage like the
// hero, and the courses sit as tall cards on a horizontal shelf. On desktop the section pins and scrolling down slides
// the shelf slowly sideways through every card (Marco 2026-10-22: "tvunget til at se dem"). Touch keeps swipe.
export function Catalog() {
  const { cat, setCat, list } = useFilter();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${motionQuery} and (min-width: 1024px)`, () => {
        const ul = track.current;
        if (!ul) return;
        // scrollWidth leaves out the right padding of a flex row, so add it back; the last card stops at the same margin as the first.
        const dist = () => Math.max(0, ul.scrollWidth - ul.clientWidth + parseFloat(getComputedStyle(ul).paddingRight));
        if (dist() < 8) return;
        gsap.to(ul, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist() * 2.4}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [cat], revertOnUpdate: true },
  );
  return (
    <section ref={root} id="kurser" className="relative overflow-hidden py-24 text-white md:py-32 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16" style={{ background: stage }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,oklch(0.66_0.17_38/0.22),transparent_70%)]" />
      <div className="relative px-6 md:px-[3.5vw]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[0.8125rem]">Kurser</span>
            <h2 className="mt-6 font-display font-normal leading-[1.02] tracking-[-0.04em] text-white" style={{ fontSize: "clamp(2.25rem, 1rem + 2.8vw, 3.75rem)" }}>
              Find det kursus,
              <br />
              <span className="text-white">du mangler</span>
            </h2>
          </div>
          <Filters cat={cat} setCat={setCat} dark />
        </div>
        <ul ref={track} className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-[3.5vw] md:px-[3.5vw] [scrollbar-width:none] lg:mt-10 lg:snap-none lg:overflow-visible">
          {list.map((c) => (
            <li key={c.slug} className="w-[82%] shrink-0 snap-start sm:w-[22rem]">
              <Link href={`/kurser/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition-colors duration-200 hover:bg-white/[0.08]">
                <div className="relative">
                  <Cover hue={c.hue} className="aspect-square lg:aspect-[4/3]" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[0.75rem] font-medium text-[oklch(0.24_0.02_30)]">{c.category}</span>
                  <span className="absolute bottom-5 right-5 grid size-12 place-items-center rounded-full text-white transition-transform duration-200 group-hover:-translate-y-1" style={{ background: coral }}>
                    <Icon name="arrowRight" size={20} className="-rotate-45" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.8125rem] text-white/55">{c.level}</p>
                  <h3 className="mt-2 font-display text-[1.375rem] font-normal leading-[1.15] tracking-[-0.025em] text-white">{c.title}</h3>
                  <div className="mt-auto pt-6"><Meta lessons={c.lessons} minutes={c.minutes} dark /></div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
