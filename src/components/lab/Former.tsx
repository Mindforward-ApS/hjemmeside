"use client";

// Decorative shapes for the front page (Marco 2026-11-11, tried section by section): a soft organic blob that slowly
// changes shape, a thin line motif that draws itself when it scrolls into view, and small floating accent shapes.
// All aria-hidden and pointer-events-none; motion stops for prefers-reduced-motion.
import { useEffect, useRef, useState } from "react";

const coral = "#e8664a";
const peach = "#fbe1d7";

// Two outlines with the same number of points so the browser can morph between them.
const blobA = "M421 79c61 47 93 135 74 214s-86 150-172 170-190-12-252-75S-8 236 18 160 128 25 214 9s146 23 207 70z";
const blobB = "M445 112c49 61 52 151 18 222s-104 124-188 132-180-30-232-98S9 214 47 145 164 16 249 13s147 38 196 99z";

export function Blob({ className = "", color = peach }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 500 480" className={`pointer-events-none ${className}`}>
      <path d={blobA} fill={color}>
        <animate attributeName="d" dur="14s" repeatCount="indefinite" values={`${blobA};${blobB};${blobA}`} calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
      </path>
    </svg>
  );
}

// A swoosh that draws itself once the first time it is on screen.
export function Line({ d, viewBox, className = "", width = 2, stretch = false }: { d: string; viewBox: string; className?: string; width?: number; stretch?: boolean }) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    setLen(p.getTotalLength());
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(p);
    return () => io.disconnect();
  }, []);
  return (
    <svg aria-hidden viewBox={viewBox} preserveAspectRatio={stretch ? "none" : undefined} fill="none" className={`pointer-events-none overflow-visible ${className}`}>
      <path ref={ref} d={d} stroke={coral} strokeWidth={width} strokeLinecap="round" vectorEffect="non-scaling-stroke"
        className="mf-line" style={len ? { strokeDasharray: len, strokeDashoffset: on ? 0 : len } : { opacity: 0 }} />
    </svg>
  );
}

type Kind = "dot" | "ring" | "star" | "pill";
export function Accent({ kind, className = "", size = 18, delay = 0 }: { kind: Kind; className?: string; size?: number; delay?: number }) {
  const shape = {
    dot: <circle cx="12" cy="12" r="12" fill={coral} />,
    ring: <circle cx="12" cy="12" r="9.5" fill="none" stroke={coral} strokeWidth="3" />,
    star: <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" fill={coral} />,
    pill: <rect x="0" y="7" width="24" height="10" rx="5" fill={peach} stroke={coral} strokeWidth="2" />,
  }[kind];
  return (
    <svg aria-hidden viewBox="-2 -2 28 28" width={size} height={size} className={`mf-float pointer-events-none absolute ${className}`} style={{ animationDelay: `${delay}s` }}>
      {shape}
    </svg>
  );
}

export function FormerStyles() {
  return (
    <style>{`
      .mf-line { transition: stroke-dashoffset 2.2s cubic-bezier(.65,0,.35,1); }
      @keyframes mfFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(8deg); } }
      .mf-float { animation: mfFloat 6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .mf-float { animation: none; }
        .mf-line { transition: none; }
      }
    `}</style>
  );
}
