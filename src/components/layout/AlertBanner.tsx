"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function AlertBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  // Read the remembered dismissal from localStorage (per-viewer convenience; safe if storage is blocked).
  const stored = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(site.alert.id) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );

  // Pages in the "night" design have no announcement bar (reference layout).
  if (dismissed || stored || ["/", "/priser", "/platform"].includes(pathname) || pathname.startsWith("/loesninger/") || pathname.startsWith("/kurser/") || pathname.startsWith("/preview")) return null;

  return (
    <div className="section-dark relative z-50 text-[0.875rem]" style={{ background: "linear-gradient(90deg, var(--field-b), var(--grad-to))" }}>
      <div className="container-wide flex min-h-11 items-center justify-center gap-3 py-2 pr-12 text-center">
        <p className="flex items-center gap-3 text-text">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-heading">Nyt</span>
          <span>{site.alert.text.replace(/^Nyt:\s*/, "")}</span>
          <Link href={site.alert.href} className="font-semibold text-heading underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:decoration-[var(--heading)]">
            {site.alert.linkLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              localStorage.setItem(site.alert.id, "1");
            } catch {}
          }}
          className="absolute right-[max(var(--gutter),8px)] grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-heading"
          aria-label="Luk besked"
        >
          <Icon name="close" size={18} />
        </button>
      </div>
    </div>
  );
}
