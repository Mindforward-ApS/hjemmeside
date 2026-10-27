"use client";

// Hero sign-in (Marco 2026-10-22: G1 "To knapper"). Google and Microsoft sit under the headline, and the courses are a
// quiet text link. Both go to the platform's sign-up page, which has the Google and Microsoft sign-in.
import { appLinks } from "@/lib/app";
import Link from "next/link";

export function GoogleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function MicrosoftMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" aria-hidden>
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M12 1h10v10H12z" />
      <path fill="#00A4EF" d="M1 12h10v10H1z" />
      <path fill="#FFB900" d="M12 12h10v10H12z" />
    </svg>
  );
}

export function HeroLogin() {
  return (
    <div className="hero-login mt-10">
      <div className="grid w-full max-w-[19rem] gap-2.5">
        <a href={appLinks.signup} className="n-btn n-btn-brand n-btn-white !min-h-12 w-full"><GoogleMark /> Fortsæt med Google</a>
        <a href={appLinks.signup} className="n-btn n-btn-brand n-btn-glass !min-h-12 w-full"><MicrosoftMark /> Fortsæt med Microsoft</a>
      </div>
      <p className="mt-4 text-[0.9375rem] text-white/60">
        Eller <Link href="/#kurser" className="text-white underline underline-offset-4">se kurserne først</Link>
      </p>
    </div>
  );
}
