"use client";

import { useEffect } from "react";

// Marco 2026-11-24: on desktop every section must be fully visible on one screen, whatever the screen. Section padding
// follows the viewport height (globals.css, html.fit), and if a section's content is still taller than the window, its
// content is scaled down just enough to fit (CSS zoom). Phones and tablets are left alone; they get their own layout.
const MIN_W = 1024;

function fit() {
  const desktop = innerWidth >= MIN_W;
  const targets: { box: HTMLElement; frame: HTMLElement }[] = [];
  const h1 = document.querySelector<HTMLElement>("[data-hero-title]");
  const heroGrid = h1?.closest<HTMLElement>(".grid");
  const heroFrame = heroGrid?.closest<HTMLElement>("section");
  if (heroGrid && heroFrame) targets.push({ box: heroGrid, frame: heroFrame });
  document.querySelectorAll<HTMLElement>(".sep-inner > section, section#problemet").forEach((s) => {
    const box = s.firstElementChild instanceof HTMLElement && !s.firstElementChild.matches("[aria-hidden]") ? s.firstElementChild : (s.querySelector<HTMLElement>(":scope > div:not([aria-hidden])") ?? null);
    if (box) targets.push({ box, frame: s });
  });
  for (const { box } of targets) { box.style.zoom = ""; box.style.width = ""; box.style.marginInline = ""; }
  if (!desktop) return;
  // Lock each box to its natural width before scaling, so pictures and videos that follow the width shrink too
  // (otherwise a zoomed box gets a wider virtual width and its 16:9 video grows taller again).
  const widths = targets.map(({ box }) => box.getBoundingClientRect().width);
  // Marco 2026-11-24: one zoom for the whole page (the one the tallest section needs), so every section and card keeps the
  // same width and size. Measured per section, applied to all; a few passes settle the last pixels.
  let zoom = 1;
  for (let pass = 0; pass < 5; pass++) {
    let need = zoom;
    for (const { box, frame } of targets) {
      const over = frame.getBoundingClientRect().height - innerHeight;
      if (over <= 0) continue;
      const h = box.getBoundingClientRect().height;
      need = Math.min(need, zoom * (h - over - 2) / h);
    }
    need = Math.max(0.7, Math.floor(need * 1000) / 1000);
    if (need >= zoom) break;
    zoom = need;
    targets.forEach(({ box }, i) => { box.style.zoom = String(zoom); box.style.width = `${widths[i]}px`; box.style.marginInline = "auto"; });
  }
}

export function FitSections() {
  useEffect(() => {
    document.documentElement.classList.add("fit");
    let raf = 0;
    const run = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };
    run();
    const t = setTimeout(run, 800); // after fonts and images settle
    addEventListener("resize", run);
    document.fonts?.ready.then(run);
    return () => { removeEventListener("resize", run); clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
