"use client";

import { useEffect, useRef } from "react";

// FAQ (Marco 2026-11-24): MIND hops from question to question and opens each one. It sits on the top-right corner of
// the question card it is on, hops in an arc to the next, gives a small "surprise" pop as it lands and the answer opens,
// reads for a moment, and moves on. It only runs while the FAQ is on screen, stops for good as soon as the visitor
// opens a question themselves, and does nothing on phones or with reduced motion.
type Avatar = { el: SVGSVGElement; start: () => void; stop: () => void; loop: (n: string) => void; play: (n: string, cb?: () => void) => void };
type Api = { create: (el: HTMLElement, o?: Record<string, unknown>) => Avatar };

function loadApi(): Promise<Api> {
  const w = window as unknown as { MindAvatar?: Api };
  if (w.MindAvatar) return Promise.resolve(w.MindAvatar);
  return new Promise((ok, fail) => {
    const s = document.querySelector<HTMLScriptElement>('script[src="/mind-avatar.js"]') ?? Object.assign(document.createElement("script"), { src: "/mind-avatar.js", async: true });
    s.addEventListener("load", () => (w.MindAvatar ? ok(w.MindAvatar) : fail()));
    if (!s.isConnected) document.head.appendChild(s);
    else if (w.MindAvatar) ok(w.MindAvatar);
  });
}

const SIZE = 72; // the avatar box; the body is ~78 % of it
const READ_MS = 3800;
const HOP_MS = 720;

export function FaqMind({ listRef }: { listRef: React.RefObject<HTMLDivElement | null> }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = listRef.current, el = box.current;
    if (!list || !el || innerWidth < 1024 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let avatar: Avatar | null = null, timer = 0, visible = false, stopped = false, at = 0, busy = false;
    const items = () => [...list.querySelectorAll<HTMLDetailsElement>("details")];

    // Where MIND stands on question i: on the card's top edge, near the right end.
    const spot = (i: number) => {
      const d = items()[i], L = list.getBoundingClientRect(), r = d.getBoundingClientRect();
      return { x: r.right - L.left - SIZE - 64, y: r.top - L.top - SIZE * 0.8 };
    };
    const place = (i: number) => { const p = spot(i); el.style.transform = `translate(${p.x}px, ${p.y}px)`; };

    const next = () => {
      if (stopped || !visible || busy || !avatar) return;
      const n = items().length, to = (at + 1) % n, from = spot(at), dest = spot(to);
      busy = true;
      avatar.loop("hop");
      const lift = Math.min(90, Math.abs(dest.y - from.y) * 0.5 + 40);
      const anim = el.animate([
        { transform: `translate(${from.x}px, ${from.y}px)` },
        { transform: `translate(${(from.x + dest.x) / 2}px, ${Math.min(from.y, dest.y) - lift}px)`, offset: 0.5 },
        { transform: `translate(${dest.x}px, ${dest.y}px)` },
      ], { duration: HOP_MS, easing: "cubic-bezier(.45,0,.55,1)" });
      anim.onfinish = () => {
        at = to; place(at); busy = false;
        if (stopped || !avatar) return;
        items()[at].open = true; // details share name="faq", so the others close
        avatar.play("surprise", () => avatar?.loop("idle"));
        requestAnimationFrame(() => place(at)); // the card above may have changed height
        timer = window.setTimeout(next, READ_MS);
      };
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.intersectionRatio > 0.5;
      clearTimeout(timer);
      if (visible && !stopped) timer = window.setTimeout(next, 1600);
    }, { threshold: [0, 0.5, 1] });

    // The visitor takes over: MIND stays on the question they opened and stops hopping.
    const takeOver = (e: Event) => {
      if (!e.isTrusted) return;
      const d = (e.target as HTMLElement).closest("details");
      if (!d) return;
      stopped = true; clearTimeout(timer);
      at = items().indexOf(d as HTMLDetailsElement);
      setTimeout(() => place(at), 50);
    };
    list.addEventListener("click", takeOver);
    const onResize = () => { if (!busy) place(at); };
    addEventListener("resize", onResize);

    loadApi().then((M) => {
      if (stopped || !box.current) return; // the effect was cleaned up before the script was ready
      avatar = M.create(box.current, { shadow: false, autoplay: true, ring: "#ffffff", gloss: true });
      avatar.loop("idle");
      at = Math.max(0, items().findIndex((d) => d.open));
      place(at);
      el.style.opacity = "1";
      io.observe(list);
    }).catch(() => {});

    return () => {
      stopped = true; clearTimeout(timer); io.disconnect(); el.style.opacity = "0";
      list.removeEventListener("click", takeOver); removeEventListener("resize", onResize);
      avatar?.stop(); avatar?.el.remove();
    };
  }, [listRef]);
  return <div ref={box} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 opacity-0 transition-opacity duration-300 drop-shadow-[0_6px_8px_rgba(32,22,19,0.25)]" style={{ width: SIZE, height: SIZE }} />;
}
