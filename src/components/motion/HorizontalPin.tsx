"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, motionQuery } from "@/lib/gsap";

// Signature C as a reusable wrapper: the section pins and its panels scroll sideways.
// Children are <li className="hp-panel"> items. Optional parallax: `.hp-num` inside a panel; entrance: `.hp-rise`.
// Below 1024px or with reduced motion, the panels simply stack vertically.
export function HorizontalPin({
  label,
  title,
  children,
  dark = true,
  id,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
  dark?: boolean;
  id?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${motionQuery} and (min-width: 1024px)`, () => {
        const track = root.current!.querySelector<HTMLElement>(".hp-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: ".hp-pin", start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        gsap.utils.toArray<HTMLElement>(".hp-num").forEach((n) =>
          gsap.fromTo(n, { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: n.closest(".hp-panel"), containerAnimation: tween, start: "left right", end: "right left", scrub: true } }),
        );
        gsap.utils.toArray<HTMLElement>(".hp-rise").forEach((s) =>
          gsap.from(s, { y: 40, opacity: 0.6, ease: "none", scrollTrigger: { trigger: s, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true } }),
        );
        gsap.to(".hp-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".hp-pin", start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={dark ? "section-dark" : ""}>
      <div className="hp-pin relative overflow-hidden lg:flex lg:h-[100dvh] lg:flex-col">
        <div className="container-wide relative z-10 pt-16 lg:pt-14">
          <p className="t-label mb-3">{label}</p>
          <h2 className="t-display max-w-3xl">{title}</h2>
          <div className="mt-6 hidden h-1 w-64 overflow-hidden rounded-full bg-line lg:block" aria-hidden>
            <div className="hp-progress h-full origin-left scale-x-0 rounded-full bg-[var(--accent-500)]" />
          </div>
        </div>
        <ol className="hp-track flex flex-col gap-16 px-[var(--gutter)] py-16 lg:w-max lg:flex-1 lg:flex-row lg:items-center lg:gap-[6vw] lg:px-0 lg:py-10">
          <li aria-hidden className="hidden w-[max(var(--gutter),calc((100vw-var(--wide))/2))] shrink-0 lg:block" />
          {children}
          <li aria-hidden className="hidden w-[10vw] shrink-0 lg:block" />
        </ol>
      </div>
    </section>
  );
}
