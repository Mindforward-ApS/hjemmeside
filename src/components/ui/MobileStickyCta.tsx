"use client";

import { appLinks } from "@/lib/app";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sticky bottom CTA on mobile once the hero CTA has scrolled out (§4.10 thumb zone).
export function MobileStickyCta({ label = "Prøv gratis i 14 dage", href = appLinks.signup, afterPx = 700 }: { label?: string; href?: string; afterPx?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 900;
      setShow(window.scrollY > afterPx && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [afterPx]);
  return (
    <div
      aria-hidden={!show}
      className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-transform duration-[260ms] ease-[var(--ease-enter)] md:hidden"
      style={{ transform: show ? "none" : "translateY(110%)", background: "linear-gradient(to top, var(--bg) 60%, transparent)" }}
    >
      <Link href={href} tabIndex={show ? 0 : -1} className="btn btn-primary w-full">{label}</Link>
    </div>
  );
}
