"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// A small living MIND (Marco 2026-11-24, chat first): the glossy avatar from public/mind-avatar.js in its idle loop,
// which breathes, looks around a little and blinks. Until the script is ready, and for reduced motion, the still
// glossy picture is shown, so nothing jumps or disappears.
type Avatar = { el: SVGSVGElement; start: () => void; stop: () => void; loop: (n: string) => void };
type Api = { create: (el: HTMLElement, o?: Record<string, unknown>) => Avatar };

let loading: Promise<Api> | null = null;
function loadApi(): Promise<Api> {
  const w = window as unknown as { MindAvatar?: Api };
  if (w.MindAvatar) return Promise.resolve(w.MindAvatar);
  if (!loading) loading = new Promise((ok, fail) => {
    const s = document.querySelector<HTMLScriptElement>('script[src="/mind-avatar.js"]') ?? Object.assign(document.createElement("script"), { src: "/mind-avatar.js", async: true });
    s.addEventListener("load", () => (w.MindAvatar ? ok(w.MindAvatar) : fail()));
    s.addEventListener("error", () => fail());
    if (!s.isConnected) document.head.appendChild(s);
    else if (w.MindAvatar) ok(w.MindAvatar);
  });
  return loading;
}

export function LiveMind({ className = "", size }: { className?: string; size: number }) {
  const box = useRef<HTMLSpanElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let avatar: Avatar | null = null, gone = false;
    loadApi().then((M) => {
      if (gone || !box.current) return;
      avatar = M.create(box.current, { shadow: false, autoplay: true, ring: "#ffffff", gloss: true });
      avatar.loop("idle");
      setLive(true);
    }).catch(() => {});
    return () => { gone = true; avatar?.stop(); avatar?.el.remove(); };
  }, []);
  // The avatar's body fills ~78 % of its square box, so the box is a little larger than the still picture.
  return (
    <span aria-hidden className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size * 0.83 }}>
      {!live && <Image src="/img/miwa-chat.png" alt="" width={256} height={213} className="absolute inset-0 h-full w-full object-contain" />}
      <span ref={box} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%]" style={{ width: size * 1.28, height: size * 1.28 }} />
    </span>
  );
}
