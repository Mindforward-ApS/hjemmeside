"use client";

import { useEffect, useState } from "react";

// Cookie banner (Marco 2026-11-23). Mirrors the platform's banner (greb src/components/legal/cookie-banner.tsx):
// same cookie, same values, same Danish copy, and "Kun nødvendige" exactly as prominent as "Accepter statistik".
// On mindforward.dk the cookie is set for the whole domain, so a choice made here also counts on app.mindforward.dk.
// "Læs om cookies" goes to /cookies, which redirects to the platform's cookie policy (next.config.ts).

const COOKIE_CHOICE = "greb_cookie_choice";
const OPEN_EVENT = "greb:cookie-settings";
const MAX_AGE = 180 * 24 * 60 * 60;

type CookieChoice = "necessary" | "statistics";

function readCookieChoice(): CookieChoice | null {
  const value = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_CHOICE}=`))
    ?.slice(COOKIE_CHOICE.length + 1);
  return value === "v1.necessary" ? "necessary" : value === "v1.statistics" ? "statistics" : null;
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(readCookieChoice() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function choose(choice: CookieChoice) {
    const domain = location.hostname.endsWith("mindforward.dk") ? "; Domain=mindforward.dk" : "";
    document.cookie = `${COOKIE_CHOICE}=v1.${choice}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${domain}${location.protocol === "https:" ? "; Secure" : ""}`;
    setOpen(false);
  }

  if (!open) return null;

  // Same element, same style for both choices: neither is visually preferred.
  const choiceBtn = "h-10 rounded-full px-4 text-[13.5px] font-semibold transition-opacity hover:opacity-80";
  const choiceStyle = { boxShadow: "inset 0 0 0 1px var(--border-strong)", color: "var(--heading)" };

  return (
    <section
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl p-5 print:hidden sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]"
      style={{ background: "var(--surface-raised)", color: "var(--text)", boxShadow: "0 0 0 1px var(--border), 0 24px 60px -12px rgb(0 0 0 / 0.6)" }}
    >
      <h2 className="text-[15px] font-semibold" style={{ color: "var(--heading)" }}>Vi bruger kun nødvendige cookies</h2>
      <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Nødvendige cookies holder dig logget ind og husker dine valg. Statistik-cookies er slået fra, medmindre du siger ja,
        og vi bruger dem ikke endnu.{" "}
        <a href="/cookies" className="underline underline-offset-2" style={{ color: "var(--heading)" }}>Læs om cookies</a>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className={choiceBtn} style={choiceStyle} onClick={() => choose("necessary")}>Kun nødvendige</button>
        <button type="button" className={choiceBtn} style={choiceStyle} onClick={() => choose("statistics")}>Accepter statistik</button>
      </div>
    </section>
  );
}
