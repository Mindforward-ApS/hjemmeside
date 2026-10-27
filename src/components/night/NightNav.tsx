"use client";

import { appLinks } from "@/lib/app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

// Dark pill bar: links left, wordmark centred, contact + primary right (reference: owell-ref).
export function NightNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  const left = [
    { label: "Platform", href: "/platform" },
    { label: "Løsninger", href: "/loesninger/haandvaerk" },
    { label: "Priser", href: "/priser" },
  ];
  return (
    <header className="theme-night sticky top-0 z-50 bg-transparent px-[var(--gutter)] pt-4">
      <nav aria-label="Hovedmenu" className="n-glass mx-auto grid h-16 max-w-[var(--wide)] grid-cols-[auto_1fr] items-center rounded-full pl-5 pr-2 sm:pl-6 lg:grid-cols-[1fr_auto_1fr]">
        <ul className="hidden items-center gap-1 lg:flex">
          {left.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-full px-4 py-2 text-[0.9375rem] text-heading/90 transition-colors hover:bg-[var(--hover-fill)] hover:text-heading">{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/" aria-label={`${site.name} forside`} className="justify-self-start rounded-md lg:justify-self-center [&_*]:!text-heading">
          <Logo className="!text-[1.375rem] !font-medium" />
        </Link>
        <div className="flex items-center justify-self-end gap-1">
          <Link href="/kontakt" className="hidden rounded-full px-4 py-2 text-[0.9375rem] text-heading/90 transition-colors hover:bg-[var(--hover-fill)] lg:inline-flex">Kontakt os</Link>
          <Link href={appLinks.signup} className="n-btn n-btn-dark !min-h-11 !px-4 !text-[0.875rem] sm:!min-h-12 sm:!px-5 sm:!text-[0.9375rem]">Kom i gang</Link>
          <button type="button" onClick={() => setOpen(true)} aria-label="Åbn menu" className="grid size-11 place-items-center rounded-full text-heading lg:hidden">
            <Icon name="menu" />
          </button>
        </div>
      </nav>

      <div hidden={!open} className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--bg)] px-[var(--gutter)] pb-10 pt-24">
        <button type="button" onClick={() => setOpen(false)} aria-label="Luk menu" className="absolute right-[var(--gutter)] top-6 grid size-11 place-items-center rounded-full text-heading"><Icon name="close" /></button>
        <ul>
          {[...site.nav, ...site.utilityNav].map((l) => (
            <li key={l.href} className="border-b border-line">
              <Link href={l.href} onClick={() => setOpen(false)} className="n-display flex min-h-16 items-center text-[2rem]">{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link href={appLinks.signup} className="n-btn n-btn-primary mt-8 w-full">Prøv gratis i 14 dage</Link>
      </div>
    </header>
  );
}
