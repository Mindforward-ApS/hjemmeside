"use client";

import { usePathname } from "next/navigation";
import { gsap, SplitText, useGSAP, motionQuery } from "@/lib/gsap";

// Site-wide headline motion: h1.t-hero and h2.t-display reveal line by line from behind a mask.
// Each heading is split only when it reaches the viewport. By then React has hydrated it,
// even on slow phones, so SplitText never edits DOM that React is still hydrating.
// The page h1 is hidden by CSS until split (1.2s fallback); other headings stay visible until they animate.
export function SplitHeadings() {
  const pathname = usePathname();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQuery, () => {
        const splits: SplitText[] = [];

        const reveal = (el: HTMLElement) => {
          const isH1 = el.tagName === "H1";
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, { yPercent: 110, duration: isH1 ? 1 : 0.9, ease: "expo.out", stagger: 0.09, delay: isH1 ? 0.1 : 0 }),
            }),
          );
          el.classList.add("is-split");
        };

        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              io.unobserve(e.target);
              reveal(e.target as HTMLElement);
            }
          },
          { rootMargin: "0px 0px -12% 0px" },
        );

        // Two frames after mount so the first screen has hydrated before anything is observed.
        let raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(() => {
            gsap.utils
              .toArray<HTMLElement>("main h1.t-hero:not([data-no-split]), main h2.t-display:not([data-no-split])")
              .forEach((el) => io.observe(el));
          });
        });

        return () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          splits.forEach((s) => s.revert());
        };
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
  return null;
}
