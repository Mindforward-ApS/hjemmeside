"use client";

// Hero motion, three versions (Marco 2026-11-05: "vi starter fra toppen ... 3 versioner"). Same hero markup as the
// home page; only the entrance and scroll behaviour differ. Each version borrows one known pattern:
// M1 · Blur-ind (Linear): the heading comes in word by word from a soft blur, then text, buttons and the video
//      sharpen up in turn. Calm and premium.
// M2 · Filmisk (Apple product pages): the DOKK1 photo slowly zooms out from close, the heading letters rise out of a
//      mask, and the video opens up from a thin slit (clip-path) like a curtain.
// M3 · Zoom ind i platformen (scroll-scrubbed): a quick, simple entrance; when you scroll, the text drifts up and
//      fades while the video grows toward you, so the page "dives into" the platform (laptop and up).
// Reduced motion: everything is shown at once with no movement (motionQuery only runs when motion is allowed).
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, motionQuery } from "@/lib/gsap";
import { Hero } from "@/components/lab/NyForside";
import { StartCalendly } from "@/components/lab/StartCalendly";

type K = "1" | "2" | "3";
const names: Record<K, string> = { "1": "Blur-ind", "2": "Filmisk", "3": "Zoom ind i platformen" };

function Variant({ v }: { v: K }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(motionQuery, () => {
      const q = gsap.utils.selector(root);
      const title = q("[data-hero-title]")[0] as HTMLElement;
      const ins = q("[data-hero-in]");
      const card = q("[data-hero-card]");
      const bg = q("[data-hero-bg]");
      const logos = q("[data-hero] > :last-child");

      if (v === "1") {
        const split = SplitText.create(title, { type: "words" });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(split.words, { opacity: 0, filter: "blur(14px)", y: 14, duration: 1.1, stagger: 0.12 }, 0.1)
          .from(ins, { opacity: 0, filter: "blur(8px)", y: 10, duration: 0.9, stagger: 0.08 }, 0.55)
          .from(card, { opacity: 0, filter: "blur(16px)", scale: 0.97, duration: 1.3 }, 0.45)
          .from(logos, { opacity: 0, duration: 1 }, 1.1)
          .add(() => split.revert());
      }

      if (v === "2") {
        const split = SplitText.create(title, { type: "lines,chars", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(bg, { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power2.out" }, 0)
          .from(split.chars, { yPercent: 110, duration: 1, stagger: 0.025 }, 0.2)
          .fromTo(card, { clipPath: "inset(48% 0% 48% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "expo.inOut" }, 0.5)
          .from(ins, { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.9)
          .from(logos, { opacity: 0, duration: 1 }, 1.4)
          .add(() => split.revert());
      }

      if (v === "3") {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from([title, ...ins], { y: 24, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.05)
          .from(card, { y: 40, opacity: 0, duration: 1.1 }, 0.25);
        // The hero stays pinned for one extra screen of scrolling while the video grows to the middle of the screen.
        const hero = q("[data-hero]")[0];
        const textCol = title.parentElement;
        const el = card[0] as HTMLElement;
        const fit = () => {
          const r = el.getBoundingClientRect();
          return { dx: innerWidth / 2 - (r.left + r.width / 2), dy: innerHeight / 2 - (r.top + scrollY + r.height / 2) + scrollY, s: Math.min((innerWidth * 0.9) / r.width, (innerHeight * 0.84) / r.height) };
        };
        // Laptops and up only: on phones the hero is taller than the screen, so pinning it would feel broken.
        if (innerWidth < 1024) return;
        const tl2 = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=100%", pin: true, scrub: 0.6, invalidateOnRefresh: true } });
        tl2.to(textCol, { y: -60, opacity: 0, ease: "power1.in", duration: 0.5 }, 0)
          .to(logos, { opacity: 0, duration: 0.3 }, 0)
          .to(el, { x: () => fit().dx, y: () => fit().dy, scale: () => fit().s, ease: "power2.inOut", duration: 1 }, 0);
      }
      ScrollTrigger.refresh();
    });
  }, { scope: root });
  return (
    <div ref={root}>
      <Hero media="video" />
      <StartCalendly />
    </div>
  );
}

export function HeroMotionPreview() {
  const [v, setV] = useState<K>("1");
  const [run, setRun] = useState(0);
  return (
    <div className="bg-white">
      <style>{`@keyframes hlScroll { to { transform: translateX(-50%); } } .hl-track { animation: hlScroll 38s linear infinite; } .nf-line-mask { padding-top: 0.14em; margin-top: -0.14em; } @media (prefers-reduced-motion: reduce) { .hl-track { animation: none; } }`}</style>
      <Variant key={`${v}-${run}`} v={v} />
      <div className="h-[40vh] bg-white" />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <span className="px-3 text-[0.75rem] font-semibold text-[#5a4a44]">Hero</span>
        {(Object.keys(names) as K[]).map((k) => (
          <button key={k} onClick={() => { scrollTo(0, 0); setV(k); setRun((r) => r + 1); }} className={`h-9 rounded-full px-4 text-[0.875rem] font-semibold ${v === k ? "bg-[#201613] text-white" : "text-[#201613] hover:bg-black/5"}`}>
            {k} · {names[k]}
          </button>
        ))}
        <button onClick={() => { scrollTo(0, 0); setRun((r) => r + 1); }} className="h-9 rounded-full px-4 text-[0.875rem] font-semibold text-[#201613] hover:bg-black/5">↻ Igen</button>
      </div>
    </div>
  );
}
