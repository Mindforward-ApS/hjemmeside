"use client";

// Scroll moment in the hero (Marco 2026-10-22): as you scroll, the white card in the bottom-left corner quickly grows
// to fill the stage and turns into a course certificate. It is a clip-path reveal of a full panel that starts clipped
// to the card's exact rectangle, while the hero is pinned. Desktop and motion-OK only; otherwise nothing changes.
import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, motionQuery } from "@/lib/gsap";
import Image from "next/image";

const ink = "oklch(0.22 0.02 30)";
const muted = "oklch(0.5 0.012 30)";
const coral = "oklch(0.66 0.19 33)";

export function CertReveal({ stage, card }: { stage: RefObject<HTMLDivElement | null>; card: RefObject<HTMLDivElement | null> }) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${motionQuery} and (min-width: 1024px)`, () => {
      // The panel sits inside the stage; the parent's ref isn't attached yet when this child effect runs.
      const p = panel.current, s = stage.current ?? p?.parentElement ?? null, c = card.current;
      if (!s || !c || !p) return;
      // The card's rectangle as an inset of the stage, so the panel starts exactly as the card.
      const inset = () => {
        const sr = s.getBoundingClientRect(), cr = c.getBoundingClientRect();
        return `inset(${cr.top - sr.top}px ${sr.right - cr.right}px ${sr.bottom - cr.bottom}px ${cr.left - sr.left}px round 0px 36px 0px 0px)`;
      };
      // One-way: it opens while scrolling down, then closes back into the card the same way. Once past it, the pin is
      // removed (the scroll position is compensated, so nothing jumps) and scrolling up shows the
      // normal hero. It re-arms when you are back at the very top.
      let tl: gsap.core.Timeline | null = null;
      let rearm: (() => void) | null = null;
      let exit: ScrollTrigger | null = null;
      const reset = () => {
        // Called when the hero is fully out of view: remove the pin and compensate the scroll, so nothing visibly moves.
        exit?.kill();
        exit = null;
        const st = tl?.scrollTrigger;
        const spacer = st ? st.end - st.start : 0;
        const y = window.scrollY;
        st?.kill(true);
        tl?.kill();
        tl = null;
        gsap.set(p, { autoAlpha: 0 });
        
        window.scrollTo(0, Math.max(0, y - spacer));
        ScrollTrigger.refresh();
        rearm = () => {
          if (window.scrollY > 4) return;
          window.removeEventListener("scroll", rearm!);
          rearm = null;
          build();
        };
        window.addEventListener("scroll", rearm, { passive: true });
      };
      const build = () => {
        gsap.set(p, { clipPath: inset(), autoAlpha: 0 });
        gsap.set(p.querySelector(".cert-doc"), { y: 60, scale: 0.92, autoAlpha: 0 });
        gsap.set(p.querySelector(".cert-label"), { autoAlpha: 0, y: 16 });
        tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: { trigger: s, start: "top top", end: "+=200%", scrub: 0.5, pin: true, invalidateOnRefresh: true },
        });
        // At rest the panel is invisible, so the real card shows; it fades in as it starts to grow.
        tl.to(p, { autoAlpha: 1, duration: 0.06, ease: "none" })
          .fromTo(p, { clipPath: inset }, { clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)", duration: 0.45, ease: "power2.inOut" }, 0)
          .to(p.querySelector(".cert-doc"), { y: 0, scale: 1, autoAlpha: 1, duration: 0.35, ease: "power3.out" }, 0.22)
          .to(p.querySelector(".cert-label"), { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.1")
          .to({}, { duration: 0.3 })
          // Closing is the opening in reverse: the certificate drops back, then the panel shrinks into the white card.
          .to(p.querySelector(".cert-label"), { autoAlpha: 0, y: 16, duration: 0.2 })
          .to(p.querySelector(".cert-doc"), { y: 60, scale: 0.92, autoAlpha: 0, duration: 0.3, ease: "power3.in" }, "<0.05")
          .to(p, { clipPath: inset, duration: 0.45, ease: "power2.inOut" }, "-=0.12")
          .to(p, { autoAlpha: 0, duration: 0.06, ease: "none" })
          .to({}, { duration: 0.1 });
        // Only once the hero has scrolled fully out of view is the pin removed (so scrolling back up skips the effect).
        exit = ScrollTrigger.create({ trigger: s, start: "bottom top", onEnter: () => reset() });
      };
      build();
      return () => {
        if (rearm) window.removeEventListener("scroll", rearm);
        exit?.kill();
        tl?.scrollTrigger?.kill();
        tl?.kill();
      };
    });
    return () => mm.revert();
  });

  return (
    <div ref={panel} aria-hidden className="pointer-events-none invisible absolute inset-0 z-[40] hidden place-items-center bg-[oklch(0.975_0.006_60)] lg:grid">
      <div className="grid w-full max-w-[72rem] grid-cols-[0.75fr_1.25fr] items-center gap-14 px-[3.5vw] pt-20">
        <div className="cert-label">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em]" style={{ color: coral }}>Når du er færdig</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,1rem+2.6vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.04em]" style={{ color: ink }}>Et certifikat, der kan tjekkes</h2>
          <p className="mt-5 max-w-[24rem] text-[1.0625rem] leading-relaxed" style={{ color: muted }}>Hvert certifikat har sit eget ID, så din chef eller en ny arbejdsgiver kan se, at det er ægte.</p>
        </div>

        {/* The approved certificate V7 "Bevis" (Marco 23 Oct 2026: "V7 er perfekt"), rendered from the lab's A4 design
            (/preview/certifikat?v=7 on :3401) to a 2× image so it matches exactly. Demo person, hence "Eksempel". */}
        <div className="cert-doc relative aspect-[297/210] w-full overflow-hidden rounded-[10px] shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.08),0_40px_90px_-40px_oklch(0.3_0.05_30/0.45)]">
          <Image src="/cert/certifikat-v7.webp" alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" priority={false} />
          <span className="absolute right-[3%] top-[4%] rounded-full bg-white/90 px-3 py-1 text-[0.75rem]" style={{ color: muted }}>Eksempel</span>
        </div>
      </div>
    </div>
  );
}
