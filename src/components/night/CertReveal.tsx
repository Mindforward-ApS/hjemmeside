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
const coralLight = "oklch(0.74 0.15 38)";
// The site's dark brown stage (same as the certificate's top band).
const stageBg =
  "radial-gradient(70% 60% at 20% 0%, #3d2c28 0%, #2e1f1c 40%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

export function CertReveal({
  stage,
  card,
}: {
  stage: RefObject<HTMLDivElement | null>;
  card: RefObject<HTMLDivElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${motionQuery} and (min-width: 1024px)`, () => {
      // The panel sits inside the stage; the parent's ref isn't attached yet when this child effect runs.
      const p = panel.current,
        s = stage.current ?? p?.parentElement ?? null,
        c = card.current;
      if (!s || !c || !p) return;
      // The card's rectangle as an inset of the stage, so the panel starts exactly as the card.
      const inset = () => {
        const sr = s.getBoundingClientRect(),
          cr = c.getBoundingClientRect();
        return `inset(${cr.top - sr.top}px ${sr.right - cr.right}px ${sr.bottom - cr.bottom}px ${cr.left - sr.left}px round 0px 36px 0px 0px)`;
      };
      // One-way, downward only (Marco 27 Oct 2026: "når jeg scroller tilbage til heroen så skal det ikke åbne sig igen,
      // kun når jeg scroller nedad"): it opens while scrolling down and closes back into the card the same way. Scrolling
      // up at any point, or scrolling past the hero, removes the pin (the scroll position is compensated, so nothing
      // jumps) and the normal hero shows. It re-arms only when you are back at the very top.
      let tl: gsap.core.Timeline | null = null;
      let rearm: (() => void) | null = null;
      let exit: ScrollTrigger | null = null;
      let tearing = false;
      const teardown = (upward: boolean) => {
        if (tearing) return;
        tearing = true;
        exit?.kill();
        exit = null;
        const st = tl?.scrollTrigger;
        const start = st?.start ?? 0;
        const spacer = st ? st.end - st.start : 0;
        const y = window.scrollY;
        st?.kill(true);
        tl?.kill();
        tl = null;
        gsap.set(p, { autoAlpha: 0 });
        // Upward: back to where the hero sits unpinned (its top). Past the hero: the same spot minus the pin's spacer.
        window.scrollTo(0, upward ? start : Math.max(0, y - spacer));
        ScrollTrigger.refresh();
        tearing = false;
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
        gsap.set(p.querySelector(".cert-doc"), {
          y: 60,
          scale: 0.92,
          autoAlpha: 0,
        });
        gsap.set(p.querySelector(".cert-label"), { autoAlpha: 0, y: 16 });
        tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: s,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            // Scrolling up inside the moment never replays it backwards: let go of the pin instead.
            onUpdate: (self) => {
              if (self.direction < 0 && self.progress > 0 && self.progress < 1)
                requestAnimationFrame(() => teardown(true));
            },
          },
        });
        // At rest the panel is invisible, so the real card shows; it fades in as it starts to grow.
        tl.to(p, { autoAlpha: 1, duration: 0.06, ease: "none" })
          .fromTo(
            p,
            { clipPath: inset },
            {
              clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)",
              duration: 0.45,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            p.querySelector(".cert-doc"),
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.35,
              ease: "power3.out",
            },
            0.22,
          )
          .to(
            p.querySelector(".cert-label"),
            { autoAlpha: 1, y: 0, duration: 0.25 },
            "<0.1",
          )
          .to({}, { duration: 0.3 })
          // Closing is the opening in reverse: the certificate drops back, then the panel shrinks into the white card.
          .to(p.querySelector(".cert-label"), {
            autoAlpha: 0,
            y: 16,
            duration: 0.2,
          })
          .to(
            p.querySelector(".cert-doc"),
            {
              y: 60,
              scale: 0.92,
              autoAlpha: 0,
              duration: 0.3,
              ease: "power3.in",
            },
            "<0.05",
          )
          .to(
            p,
            { clipPath: inset, duration: 0.45, ease: "power2.inOut" },
            "-=0.12",
          )
          .to(p, { autoAlpha: 0, duration: 0.06, ease: "none" })
          .to({}, { duration: 0.1 });
        // Only once the hero has scrolled fully out of view is the pin removed (so scrolling back up skips the effect).
        exit = ScrollTrigger.create({
          trigger: s,
          start: "bottom top",
          onEnter: () => teardown(false),
        });
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

  // The certificate grows with the screen: as wide as the column allows, but never taller than the box.
  const doc = (maxH: string) => (
    <div
      className="cert-doc relative aspect-[297/210] overflow-hidden rounded-[12px] shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.08),0_50px_110px_-40px_oklch(0.2_0.05_30/0.55)]"
      style={{ width: `min(100%, calc(${maxH} * 1.4143))` }}
    >
      {/* The approved certificate V7 "Bevis" (Marco 23 Oct 2026: "V7 er perfekt"), rendered from the lab's A4 design
          (/preview/certifikat?v=7 on :3401) to a 2× image so it matches exactly. Demo person, hence "Eksempel". */}
      <Image
        src="/cert/certifikat-v7.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 70vw, 100vw"
        className="object-cover"
        priority={false}
      />
      <span
        className="absolute right-[3%] top-[4%] rounded-full bg-white/90 px-3 py-1 text-[clamp(0.75rem,0.5rem+0.3vw,0.9375rem)]"
        style={{ color: muted }}
      >
        Eksempel
      </span>
    </div>
  );
  const eyebrow = (dark = false) => (
    <p
      className="text-[clamp(0.8125rem,0.6rem+0.3vw,1rem)] font-medium uppercase tracking-[0.12em]"
      style={{ color: dark ? coralLight : coral }}
    >
      Når du er færdig
    </p>
  );
  const title = (dark = false, size = "text-[clamp(2.5rem,1rem+3vw,5rem)]") => (
    <h2
      className={`mt-4 font-display font-normal leading-[1.02] tracking-[-0.04em] ${size}`}
      style={{ color: dark ? "white" : ink }}
    >
      Et certifikat, der kan tjekkes
    </h2>
  );

  return (
    <div
      ref={panel}
      aria-hidden
      className="pointer-events-none invisible absolute inset-0 z-[40] hidden bg-[oklch(0.975_0.006_60)] lg:block"
    >
      {/* Room for the floating header at the top, a small margin elsewhere: the box fills the screen. */}
      <div
        className="absolute inset-x-[2vw] top-[calc(6.5rem+1vh)]"
        style={{ height: "calc(100svh - 6.5rem - 3.5vh)" }}
      >
        {/* Two equally tall boxes (Marco 27 Oct 2026 chose "C · To bokse"): the text with three short points, and the
              certificate. Both grow with the screen, so big monitors are filled instead of a small block in the middle. */}
        <div className="grid h-full grid-cols-[1fr_2fr] gap-[1.5vw]">
          <div
            className="cert-label flex flex-col justify-center rounded-[2rem] px-[3.5vw] py-[5vh] text-white"
            style={{ background: stageBg }}
          >
            {eyebrow(true)}
            {title(true, "text-[clamp(2.25rem,1rem+2.4vw,4.25rem)]")}
            <ul
              className="mt-[4vh] flex flex-col gap-[2vh] text-[clamp(1rem,0.75rem+0.4vw,1.3125rem)]"
              style={{ color: "oklch(0.88 0.012 40)" }}
            >
              {[
                "Dit navn og et unikt certifikat-ID",
                "Tjek det med QR-koden på certifikatet",
                "Del det på LinkedIn eller send det til chefen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-[0.2em] grid size-[1.35em] shrink-0 place-items-center rounded-full text-white"
                    style={{ background: coral }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[60%]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-[2rem] bg-white px-[3vw] py-[4vh] shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.06)]">
            {doc("(100svh - 6.5rem - 16vh)")}
          </div>
        </div>
      </div>
    </div>
  );
}
