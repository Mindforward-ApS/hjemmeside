"use client";

// Marco 2026-11-21: choreography preview. Rough stills of Miwa (rendered in Blender) moved by scroll to show the
// story before the real animated clips exist: she sits at the computer in the hero (a hero image layer that fades out
// the moment she appears below, so there is only one of her), lifts
// the next section when it scrolls in, jumps over it in an arc, lands by the product video and presses it, and the
// video starts (muted). Desktop only for now.
import { useEffect, useRef, useState } from "react";

type Pose = "lift" | "jump" | "land" | "point";
const SRC: Record<Pose, { src: string; w: number; h: number }> = {
  lift: { src: "/img/miwa-forloeb/lift.webp", w: 235, h: 741 },
  jump: { src: "/img/miwa-forloeb/jump.webp", w: 385, h: 646 },
  land: { src: "/img/miwa-forloeb/land.webp", w: 609, h: 657 },
  point: { src: "/img/miwa-forloeb/point.webp", w: 404, h: 707 },
};
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function MiwaForloeb() {
  const [st, setSt] = useState<{ pose: Pose; x: number; y: number; h: number; show: boolean }>({ pose: "lift", x: 0, y: 0, h: 300, show: false });
  const pressed = useRef(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (window.innerWidth < 1024) { setSt((s) => ({ ...s, show: false })); return; }
      const sec = document.querySelector<HTMLElement>('[aria-labelledby="udtalelser-title"]');
      const vid = document.querySelector<HTMLVideoElement>('video[src="/video/produkt-video.mp4"]');
      if (!sec || !vid) return;
      const s = window.scrollY, vh = window.innerHeight, vw = window.innerWidth;
      const top = (el: Element) => el.getBoundingClientRect().top + s;
      const A = top(sec);
      const vb = vid.getBoundingClientRect(); const V = { x: vb.left, y: vb.top + s, w: vb.width, h: vb.height };
      const H = Math.min(440, vh * 0.5); // her height on screen, the same scale as in the chair
      // 1. lift: as the section's top edge comes up, she stands on it and pushes it up
      const pl = clamp((s - (A - vh * 0.95)) / (vh * 0.3));
      // 2. jump: from the top edge of the section, in an arc, down to the product video
      const pj = clamp((s - (A - vh * 0.6)) / (vh * 0.7));
      const lifted = pl * (1 - pj) * 40;
      sec.style.transform = `translateY(${-lifted}px) rotate(${-lifted * 0.012}deg)`;
      sec.style.transformOrigin = "62% 0";
      const x0 = vw * 0.62, y0 = A - lifted - H * 0.98; // right of the headline, not over the text
      const x1 = V.x - H * 0.35, y1 = V.y + V.h * 0.55 - H;
      let pose: Pose = "lift", x = x0, y = y0, h = H;
      if (pj > 0 && pj < 1) {
        pose = "jump"; x = lerp(x0, x1, pj); y = lerp(y0, y1, pj) - Math.sin(Math.PI * pj) * vh * 0.32;
      } else if (pj >= 1) {
        // 3. lands next to the video, then reaches over and presses it
        const pp = clamp((s - (V.y - vh * 0.55)) / (vh * 0.12));
        pose = pp < 1 ? "land" : "point"; x = x1; y = y1;
        if (pose === "point" && !pressed.current) {
          pressed.current = true;
          vid.muted = true;
          document.querySelector<HTMLButtonElement>('button[aria-label^="Afspil produktvideoen"]')?.click();
          void vid.play().catch(() => {});
        }
      }
      // she leaves the chair as soon as she appears down at the section (never two of her at once)
      const seat = document.getElementById("miwa-seat");
      if (seat) { seat.style.transition = "opacity 250ms"; seat.style.opacity = pl > 0 ? "0" : "1"; }
      setSt({ pose, x, y, h, show: pl > 0 });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on); on();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const p = SRC[st.pose];
  const w = (st.h * p.w) / p.h;
  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-40 w-full">
      {/* preload */}
      <div className="hidden">{Object.values(SRC).map((v) => <link key={v.src} rel="preload" as="image" href={v.src} />)}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt="" style={{ position: "absolute", left: st.x - (st.pose === "point" ? w * 0.25 : w / 2), top: st.y, height: st.h, width: w, opacity: st.show ? 1 : 0, transition: "opacity 200ms", filter: "drop-shadow(0 18px 18px rgba(32,22,19,0.25))" }} />
    </div>
  );
}
