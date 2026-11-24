"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

// MIND, the living logo (Marco 2026-11-23, handover "bring the MIND avatar to life"). public/mind-avatar.js is the
// character itself, used as is. This component only directs it:
//   1. In the header logo ([data-mind-spot]) MIND hides (eyes shut, sneaky peeks); hover or tap makes it flinch.
//   2. After ~60 px of scroll it is surprised, the word "Forward" ([data-mind-word]) folds away, and MIND hops off.
//   3. In each section it waits until the target ([data-mind="press" | "peek" | "peek-side" | "play"]) is fully in
//      view, appears and does that one thing; it slips away when the target leaves. Only one MIND is ever visible.
//   4. Back at the top it hops home and "Forward" returns.
// Decoration only: aria-hidden, no pointer events (except the logo flinch), never a real click. Reduced motion: still
// poses, nothing travels, "Forward" stays.

type Pose = Record<string, number>;
type Avatar = { el: SVGSVGElement; set: (p: Pose) => void; play: (n: string, cb?: () => void) => void; loop: (n: string) => void; expression: (n: string) => void; start: () => void; stop: () => void };
type MindAvatarApi = { create: (el: HTMLElement, o?: Record<string, unknown>) => Avatar; hopPose: (phase: number, lean: number) => Pose };
declare global { interface Window { MindAvatar?: MindAvatarApi } }

// Marco 2026-11-24: the glossy look of the logo (white ring, gloss), so the living MIND matches it.
const OPTS = { shadow: false, autoplay: false, ring: "#ffffff", gloss: true };
const BODY = { l: 0.13, r: 0.91, t: 0.2, b: 0.83 }; // the character's body inside its square box (feet at ~0.8)
const FEET = 0.8;

export function MindDirector() {
  const cleanup = useRef<(() => void) | null>(null);
  const init = () => {
    if (cleanup.current || !window.MindAvatar) return;
    cleanup.current = run(window.MindAvatar);
  };
  useEffect(() => {
    init();
    return () => { cleanup.current?.(); cleanup.current = null; };
  }, []);
  return <Script src="/mind-avatar.js" strategy="afterInteractive" onReady={init} />;
}

function run(M: MindAvatarApi): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offs: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(t: Window, n: K, f: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions) => { t.addEventListener(n, f, o); offs.push(() => t.removeEventListener(n, f)); };

  // Hop sideways (only transform); whole hops so it always lands cleanly. Returns a cancel function.
  function travel(el: HTMLElement, mind: Avatar, from: [number, number], to: [number, number], hops: number, done?: () => void) {
    const dur = (hops / 2.4) * 1000, t0 = performance.now(), dir = Math.sign(to[0] - from[0]);
    let raf = 0, live = true;
    const f = (now: number) => {
      if (!live) return;
      const p = Math.min(1, (now - t0) / dur);
      el.style.transform = `translate(${from[0] + (to[0] - from[0]) * p}px, ${from[1] + (to[1] - from[1]) * p}px)`;
      if (p < 1) { mind.set(M.hopPose(p * hops * Math.PI, dir)); raf = requestAnimationFrame(f); }
      else { mind.set({}); done?.(); }
    };
    raf = requestAnimationFrame(f);
    return () => { live = false; cancelAnimationFrame(raf); };
  }

  /* ───────── 1, 2 and 4: the logo ───────── */
  const spot = document.querySelector<HTMLElement>("[data-mind-spot]");
  const word = document.querySelector<HTMLElement>("[data-mind-word]");
  let heroState: "logo" | "leaving" | "gone" | "returning" = "logo";
  let hero: Avatar | null = null, heroBox: HTMLElement | null = null, heroCancel: (() => void) | null = null;
  if (spot) {
    const img = spot.querySelector("img");
    const w = spot.offsetWidth, h = spot.offsetHeight;
    const side = w / (BODY.r - BODY.l);
    heroBox = document.createElement("span");
    heroBox.setAttribute("aria-hidden", "true");
    heroBox.style.cssText = `position:absolute;left:${-BODY.l * side}px;top:${-BODY.t * side + (h - (BODY.b - BODY.t) * side) / 2}px;width:${side}px;height:${side}px;pointer-events:none;will-change:transform`;
    spot.style.position = "relative";
    spot.appendChild(heroBox);
    hero = M.create(heroBox, OPTS);
    if (img) img.style.visibility = "hidden";
    if (reduced) hero.expression("hiding"); else { hero.start(); hero.loop("hide"); }
    const flinch = () => { if (heroState === "logo" && !reduced && hero) hero.play("flinch", () => { if (heroState === "logo") hero?.loop("hide"); }); };
    spot.style.pointerEvents = "auto";
    spot.addEventListener("pointerenter", flinch); spot.addEventListener("click", flinch);
    offs.push(() => { spot.removeEventListener("pointerenter", flinch); spot.removeEventListener("click", flinch); heroBox?.remove(); if (img) img.style.visibility = ""; });
  }
  const wordW = word ? word.offsetWidth : 0;
  const setWord = (shown: boolean) => {
    if (!word || reduced) return;
    word.style.transition = "max-width .3s ease, opacity .3s ease, margin .3s ease";
    word.style.overflow = "hidden";
    word.style.maxWidth = shown ? `${wordW}px` : "0px";
    word.style.opacity = shown ? "1" : "0";
    word.style.marginLeft = shown ? "0" : "-8px";
  };
  if (word) { word.style.display = "inline-block"; word.style.maxWidth = `${wordW}px`; }

  const offRight = () => (spot ? window.innerWidth - spot.getBoundingClientRect().left + 40 : 400);
  function heroLeave() {
    if (heroState !== "logo" || !hero || !heroBox) return;
    heroState = "leaving";
    hero.start();
    hero.play("surprise", () => {
      setWord(false);
      hero!.stop();
      heroCancel = travel(heroBox!, hero!, [0, 0], [offRight(), 0], 4, () => { heroBox!.style.visibility = "hidden"; heroState = "gone"; checkHero(); sections.refresh(); });
    });
  }
  function heroReturn() {
    if (heroState !== "gone" || !hero || !heroBox) return;
    heroState = "returning";
    sections.dismiss();
    heroBox.style.visibility = "visible";
    heroCancel = travel(heroBox, hero, [offRight(), 0], [0, 0], 4, () => { setWord(true); hero!.start(); hero!.loop("hide"); heroState = "logo"; checkHero(); });
  }
  function checkHero() {
    if (reduced || !hero) { heroState = scrollY > 60 ? "gone" : "logo"; if (heroState === "gone") sections.refresh(); else sections.dismiss(); return; }
    if (scrollY > 60) heroLeave(); else if (scrollY < 12) heroReturn();
  }
  on(window, "scroll", () => checkHero(), { passive: true });

  /* ───────── 3: sections ───────── */
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:absolute;left:0;top:0;width:100%;height:0;overflow-x:clip;overflow-y:visible;pointer-events:none;z-index:45";
  const actorEl = document.createElement("div");
  actorEl.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;will-change:transform;pointer-events:none";
  layer.appendChild(actorEl);
  document.body.appendChild(layer);
  offs.push(() => layer.remove());
  const actor = M.create(actorEl, OPTS);
  const size = () => (window.innerWidth < 640 ? 46 : 62);

  const targets = [...document.querySelectorAll<HTMLElement>("[data-mind]")];
  const inView = new Set<HTMLElement>();
  let active: HTMLElement | null = null, gen = 0, cancel: (() => void) | null = null;
  const timers: number[] = [];
  const later = (ms: number, f: () => void) => { const g = gen; timers.push(window.setTimeout(() => { if (g === gen) f(); }, ms)); };

  function stopAll() {
    gen++; cancel?.(); cancel = null;
    timers.splice(0).forEach(clearTimeout);
    actor.stop();
  }
  function slipAway() {
    const was = active;
    stopAll();
    if (was?.dataset.mind === "play") was.dispatchEvent(new CustomEvent("mind:pause"));
    active = null;
    actorEl.style.transition = reduced ? "" : "opacity .2s ease";
    actorEl.style.opacity = "0";
    const g = gen;
    window.setTimeout(() => { if (g === gen) { actorEl.style.visibility = "hidden"; actorEl.style.transition = ""; actorEl.style.clipPath = ""; } }, reduced ? 0 : 220);
  }
  const pressDown = (el: HTMLElement) => el.animate([{ transform: "translateY(0) scale(1)" }, { transform: "translateY(3px) scale(.97)" }, { transform: "translateY(0) scale(1)" }], { duration: 280, easing: "ease-out" });

  function begin(t: HTMLElement) {
    stopAll();
    active = t;
    const S = size();
    actorEl.style.width = actorEl.style.height = `${S}px`;
    actorEl.style.transition = ""; actorEl.style.opacity = "1"; actorEl.style.clipPath = "";
    const r = t.getBoundingClientRect(), vw = window.innerWidth;
    const top = r.top + scrollY, left = r.left, kind = t.dataset.mind;
    const react = t.dataset.mindReact || (kind === "peek-side" ? "think" : "hello");
    const fromSide = (x: number) => (x + S / 2 < vw / 2 ? -S - 10 : vw + 10);
    const hopsFor = (a: number, b: number) => Math.max(3, Math.min(8, Math.round(Math.abs(b - a) / (S * 1.15))));
    const show = (x: number, y: number) => { actorEl.style.transform = `translate(${x}px, ${y}px)`; actorEl.style.visibility = "visible"; };

    if (kind === "press") {
      const x = Math.min(vw - S, Math.max(0, left + r.width / 2 - S / 2)), y = top - S * FEET;
      if (reduced) { show(x, y); actor.expression("happy"); return; }
      const sx = fromSide(x); show(sx, y);
      cancel = travel(actorEl, actor, [sx, y], [x, y], hopsFor(sx, x), () => { pressDown(t); actor.start(); actor.play("hello", () => actor.loop("idle")); });
      return;
    }
    if (kind === "play") {
      // Land just left of the round play button, feet level with its bottom, so the title above stays clear.
      const pb = (t.querySelector("[data-mind-button]") as HTMLElement | null)?.getBoundingClientRect();
      const bx = pb ? pb.left : left + r.width / 2 - 36, by = pb ? pb.bottom + scrollY : top + r.height / 2 + 36;
      const x = Math.max(0, bx - S * 0.86), y = by - S * FEET;
      if (reduced) { show(x, y); actor.expression("neutral"); return; }
      const sx = fromSide(x); show(sx, y);
      cancel = travel(actorEl, actor, [sx, y], [x, y], hopsFor(sx, x), () => {
        actor.start();
        actor.play("hello", () => actor.loop("idle"));
        later(650, () => t.dispatchEvent(new CustomEvent("mind:play")));
        // Once it plays, step aside to the bottom-left corner so the video stays clear.
        later(2600, () => {
          const v = t.querySelector("video");
          if (v && !v.paused) { actor.stop(); const ex = left + 10, ey = top + r.height - 8 - S * FEET; cancel = travel(actorEl, actor, [x, y], [ex, ey], 3, () => { actor.start(); actor.loop("idle"); }); }
        });
      });
      return;
    }
    // peek over the top edge, or lean in from a side edge (falls back to the top on narrow screens)
    let side = kind === "peek-side";
    const leftRoom = r.left, rightRoom = vw - r.right;
    const fromLeft = leftRoom > rightRoom;
    if (side && Math.max(leftRoom, rightRoom) < S * 0.55) side = false;
    if (!side) {
      const fx = parseFloat(t.dataset.mindX || "0.78"); // data-mind-x: where along the top edge (0–1)
      const x = Math.min(vw - S, Math.max(0, left + r.width * fx - S / 2));
      const riseBy = parseFloat(t.dataset.mindRise || "0.52"); // data-mind-rise: how much of MIND shows over the edge
      const line = top, yEnd = line - S * riseBy, yStart = line + 2;
      const clip = (y: number) => `inset(-40% -40% ${Math.max(0, S - (line - y))}px -40%)`;
      if (reduced) { show(x, yEnd); actorEl.style.clipPath = clip(yEnd); actor.expression("neutral"); return; }
      show(x, yStart); actorEl.style.clipPath = clip(yStart); actor.start(); actor.loop("idle");
      const t0 = performance.now(); let raf = 0, live = true;
      const rise = (now: number) => { if (!live) return; const p = Math.min(1, (now - t0) / 550), e = 1 - Math.pow(1 - p, 3), y = yStart + (yEnd - yStart) * e; actorEl.style.transform = `translate(${x}px, ${y}px)`; actorEl.style.clipPath = clip(y); if (p < 1) raf = requestAnimationFrame(rise); };
      raf = requestAnimationFrame(rise); cancel = () => { live = false; cancelAnimationFrame(raf); };
      later(900, () => actor.play(react, () => actor.loop("idle")));
      return;
    }
    const edge = fromLeft ? left : r.right, y = Math.max(top + 8, top + r.height * 0.3 - S * 0.4);
    const xEnd = fromLeft ? edge - S * 0.5 : edge - S * 0.5, xStart = fromLeft ? edge - S * 0.1 : edge - S * 0.9;
    const clip = (x: number) => (fromLeft ? `inset(-40% ${Math.max(0, x + S - edge)}px -40% -40%)` : `inset(-40% -40% -40% ${Math.max(0, edge - x)}px)`);
    if (reduced) { show(xEnd, y); actorEl.style.clipPath = clip(xEnd); actor.expression("neutral"); return; }
    show(xStart, y); actorEl.style.clipPath = clip(xStart); actor.start(); actor.loop("idle");
    const t0 = performance.now(); let raf = 0, live = true;
    const lean = (now: number) => { if (!live) return; const p = Math.min(1, (now - t0) / 550), e = 1 - Math.pow(1 - p, 3), x = xStart + (xEnd - xStart) * e; actorEl.style.transform = `translate(${x}px, ${y}px)`; actorEl.style.clipPath = clip(x); if (p < 1) raf = requestAnimationFrame(lean); };
    raf = requestAnimationFrame(lean); cancel = () => { live = false; cancelAnimationFrame(raf); };
    later(1000, () => actor.play(react, () => actor.loop("idle")));
  }

  const sections = {
    refresh() {
      if (heroState !== "gone") return;
      if (active && inView.has(active)) return;
      if (active) slipAway();
      const next = targets.find((t) => inView.has(t));
      if (next) begin(next);
    },
    dismiss() { if (active) slipAway(); },
  };

  const ios = targets.map((t) => {
    const need = Math.min(0.98, (window.innerHeight * 0.85) / Math.max(1, t.offsetHeight));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.intersectionRatio >= need - 0.01) inView.add(t); else if (!e.isIntersecting || e.intersectionRatio < need * 0.5) inView.delete(t);
      sections.refresh();
    }), { threshold: [0, need * 0.5, need] });
    io.observe(t);
    return io;
  });
  offs.push(() => ios.forEach((io) => io.disconnect()));
  on(window, "resize", () => { if (active) slipAway(); sections.refresh(); }, { passive: true });

  checkHero();
  return () => { stopAll(); heroCancel?.(); hero?.stop(); offs.forEach((f) => f()); if (word) for (const k of ["display", "max-width", "overflow", "opacity", "margin-left", "transition"]) word.style.removeProperty(k); }; // only what MIND set; keeps the logo's font size
}
