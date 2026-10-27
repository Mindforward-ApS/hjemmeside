"use client";

import { appLinks } from "@/lib/app";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useCases } from "@/content/data";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProductScreen } from "@/components/product/ProductScreen";

// Navigation from the navbar.gallery research:
// - Desktop: mega menu with a preview card + a customer story in the menu (menu social proof).
// - Mobile: full-screen menu with big links, a featured story and direct contact.
// variant: "bar" (static, full width) · "pill" (floating pill) · "dark" (sits on a dark hero)

type Variant = "bar" | "pill" | "dark" | "docebo";

const platformItems: { icon: IconName; title: string; body: string; href: string }[] = [
  { icon: "mail", title: "Saml", body: "Mail, formular og telefon i én liste", href: "/platform#svar" },
  { icon: "sparkle", title: "Svar", body: "Skabeloner og forslag til svar", href: "/platform#svar" },
  { icon: "doc", title: "Tilbud", body: "Godkendelse med ét klik", href: "/platform#svar" },
  { icon: "clock", title: "Overblik", body: "Advarsel før nogen bliver glemt", href: "/platform#saadan-virker-det" },
];

export function MegaNav({ variant = "pill", preview = false }: { variant?: Variant; preview?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<null | "platform" | "loesninger">(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (variant === "docebo" ? 140 : 8));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [variant]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (k: "platform" | "loesninger") => {
    window.clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const dark = variant === "dark" && !scrolled && !open;
  const isPill = variant === "pill" || variant === "docebo";
  const collapsed = variant === "docebo" && scrolled && !open;
  const shell =
    isPill
      ? `mx-auto mt-2 max-w-[calc(var(--wide)+2*var(--gutter))] px-[var(--gutter)]`
      : "";
  const bar =
    variant === "docebo"
      ? `rounded-full border border-line bg-surface-raised pl-5 pr-2 sm:pl-8 sm:pr-2.5 shadow-[0_1px_2px_oklch(0.2_0.02_var(--brand-h)/0.05),0_12px_40px_-14px_oklch(0.2_0.03_var(--brand-h)/0.18)]`
      : isPill
      ? `rounded-full border pl-8 pr-3 backdrop-blur-md ${scrolled || open ? "border-line bg-surface-raised/90 shadow-2" : "border-transparent bg-surface-raised/80 shadow-1"}`
      : variant === "bar"
        ? `px-[var(--gutter)] border-b ${scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg"}`
        : `px-[var(--gutter)] ${dark ? "bg-transparent" : "border-b border-line bg-bg/90 backdrop-blur-md"}`;

  const linkCls = `relative inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[1rem] font-medium transition-colors duration-[180ms] ${
    dark ? "text-white/80 hover:text-white" : "text-heading hover:bg-surface-sunk aria-expanded:bg-surface-sunk"
  }`;

  return (
    <>
    {variant === "docebo" && (
      <div className="container-wide hidden h-11 items-center justify-end text-[0.8125rem] font-semibold text-heading md:flex">
        <button type="button" className="flex items-center gap-1 pr-4 text-muted transition-colors hover:text-heading" aria-label="Sprog: dansk">
          DA <Icon name="chevronDown" size={14} />
        </button>
        {site.utilityNav.map((l) => (
          <Link key={l.href} href={l.href} className="border-l border-line px-4 transition-colors hover:text-accent">{l.label}</Link>
        ))}
      </div>
    )}
    <header data-preview-nav={preview || undefined} className={`site-nav ${isPill ? "sticky" : "fixed inset-x-0"} top-0 z-50 ${dark ? "section-dark !bg-transparent" : ""}`}>
      {/* Docebo-style collapse: after scrolling, only the primary action + a round menu button stay, top-right */}
      {variant === "docebo" && (
        <div className={`pointer-events-none absolute right-[max(var(--gutter),calc((100vw-var(--wide))/2))] top-3 hidden items-center gap-2 transition-[opacity,transform] duration-[260ms] ease-[var(--ease-enter)] lg:flex ${collapsed ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
          <Link href={appLinks.signup} tabIndex={collapsed ? 0 : -1} className="btn btn-gradient pointer-events-auto shadow-3">Prøv gratis <Icon name="arrowRight" size={16} /></Link>
          <button type="button" tabIndex={collapsed ? 0 : -1} onClick={() => setMobile(true)} aria-label="Åbn menu" className="pointer-events-auto grid size-12 place-items-center rounded-full bg-[var(--ink-950)] text-white shadow-3 transition-transform hover:scale-105">
            <Icon name="menu" />
          </button>
        </div>
      )}
      <div className={`${shell} transition-[opacity,transform] duration-[260ms] ease-[var(--ease-enter)] ${collapsed ? "pointer-events-none -translate-y-3 opacity-0" : ""}`}>
        <nav aria-label="Hovedmenu" className={`relative transition-[background-color,box-shadow,border-color] duration-[260ms] ${bar}`}>
          <div className={`mx-auto flex ${variant === "docebo" ? "h-[4.75rem]" : "h-[72px]"} items-center justify-between gap-4 ${isPill ? "" : "max-w-[var(--wide)]"}`}>
            <Link href="/" aria-label={`${site.name} forside`} className="shrink-0 rounded-md">
              <Logo className={variant === "docebo" ? "!text-[1.5rem]" : ""} />
            </Link>

            <ul className="hidden items-center lg:flex">
              <li onMouseEnter={() => enter("platform")} onMouseLeave={leave}>
                <button type="button" className={linkCls} aria-expanded={open === "platform"} aria-controls="mega-platform" onClick={() => setOpen(open === "platform" ? null : "platform")}>
                  Platform <Icon name="chevronDown" size={16} className={`transition-transform duration-[260ms] ${open === "platform" ? "rotate-180" : ""}`} />
                </button>
              </li>
              <li onMouseEnter={() => enter("loesninger")} onMouseLeave={leave}>
                <button type="button" className={linkCls} aria-expanded={open === "loesninger"} aria-controls="mega-loesninger" onClick={() => setOpen(open === "loesninger" ? null : "loesninger")}>
                  Løsninger <Icon name="chevronDown" size={16} className={`transition-transform duration-[260ms] ${open === "loesninger" ? "rotate-180" : ""}`} />
                </button>
              </li>
              {[
                { label: "Kunder", href: "/kunder" },
                { label: "Priser", href: "/priser" },
                { label: "Om os", href: "/om-os" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls} aria-current={pathname === l.href ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {variant === "docebo" ? (
                <>
                  <Link href="/kontakt" className="hidden px-4 text-[0.875rem] font-bold uppercase tracking-[0.07em] text-accent transition-colors hover:text-heading lg:inline-flex">Book 15 min</Link>
                  <Link href={appLinks.signup} className="btn btn-gradient group/cta max-sm:min-h-10 max-sm:px-4 max-sm:text-[0.75rem]">
                    Prøv gratis <Icon name="arrowRight" size={16} className="hidden transition-transform duration-[180ms] group-hover/cta:translate-x-1 sm:block" />
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/kontakt" className="link-arrow hidden px-3 t-small lg:inline-flex">Book 15 min</Link>
                  <Link href={appLinks.signup} className="btn btn-primary btn-sm">Prøv gratis</Link>
                </>
              )}
              <button type="button" className="btn btn-secondary btn-icon lg:hidden" aria-expanded={mobile} aria-controls="fullscreen-menu" aria-label={mobile ? "Luk menu" : "Åbn menu"} onClick={() => setMobile((v) => !v)}>
                <Icon name={mobile ? "close" : "menu"} />
              </button>
            </div>
          </div>

          {/* Mega panels */}
          <div
            onMouseEnter={() => window.clearTimeout(closeTimer.current)}
            onMouseLeave={leave}
            className={`light-scope absolute inset-x-0 top-full hidden pt-3 lg:block ${isPill ? "" : "px-[var(--gutter)]"} ${open ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <div
              className={`mx-auto max-w-[var(--wide)] origin-top rounded-[var(--r-2xl)] border border-line bg-surface-raised p-3 shadow-3 transition-[opacity,transform] duration-[260ms] ease-[var(--ease-enter)] ${
                open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0"
              }`}
            >
              {open === "platform" && (
                <div id="mega-platform" className="grid grid-cols-[1.1fr_1fr_0.9fr] gap-3">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {platformItems.map((it) => (
                      <li key={it.title}>
                        <Link href={it.href} className="group flex gap-3 rounded-[var(--r-lg)] p-3 transition-colors hover:bg-surface-sunk">
                          <span className="grid size-10 shrink-0 place-items-center rounded-[var(--r-md)] bg-accent-soft text-accent"><Icon name={it.icon} size={18} /></span>
                          <span>
                            <span className="block font-semibold text-heading">{it.title}</span>
                            <span className="t-small text-muted">{it.body}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="col-span-2 px-3 pt-2">
                      <Link href="/platform" className="link-arrow t-small">Se hele platformen <Icon name="arrowRight" size={14} /></Link>
                    </li>
                  </ul>
                  <Link href="/platform" className="group relative overflow-hidden rounded-[var(--r-xl)] bg-surface-sunk p-5">
                    <p className="t-label">Nyt</p>
                    <p className="t-h4 mt-2">Forslag til svar med AI</p>
                    <p className="t-small text-muted">Fjord læser mailen og foreslår et svar. Du godkender.</p>
                    <div className="pointer-events-none mt-4 w-[150%] origin-top-left scale-[0.62] transition-transform duration-[420ms] ease-[var(--ease-enter)] group-hover:-translate-y-2">
                      <ProductScreen stage={2} />
                    </div>
                  </Link>
                  {/* Menu social proof (placeholder until a real, consented story exists) */}
                  <Link href="/kunder/kunde-1" className="ph section-dark flex flex-col justify-between rounded-[var(--r-xl)] p-5">
                    <p className="t-label">Kundehistorie</p>
                    <div>
                      <p className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-heading">[Tal]</p>
                      <p className="mt-2 t-small text-muted">[CASE NEEDED: én sætning med resultat, kunde og branche]</p>
                    </div>
                    <span className="link-arrow t-small">Læs historien <Icon name="arrowRight" size={14} /></span>
                  </Link>
                </div>
              )}
              {open === "loesninger" && (
                <div id="mega-loesninger" className="grid grid-cols-[1.6fr_1fr] gap-3">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {useCases.map((u, i) => (
                      <li key={u.slug}>
                        <Link href={`/loesninger/${u.slug}`} className="group flex items-start gap-4 rounded-[var(--r-lg)] p-4 transition-colors hover:bg-surface-sunk">
                          <span className="tnum mt-0.5 t-small font-semibold text-accent">0{i + 1}</span>
                          <span>
                            <span className="block font-semibold text-heading">{u.name}</span>
                            <span className="t-small text-muted">{u.pains[0]}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="ph rounded-[var(--r-xl)] bg-surface-sunk p-5">
                    <p className="t-label">Fra en kunde i håndværk</p>
                    <blockquote className="t-h4 mt-3">“[TESTIMONIAL NEEDED: kort citat med et konkret resultat]”</blockquote>
                    <p className="mt-4 t-small text-muted">[Navn], [rolle], [firma]</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile menu */}
      <div id="fullscreen-menu" hidden={!mobile} className="light-scope fixed inset-0 z-[60] overflow-y-auto bg-bg px-[var(--gutter)] pb-[max(24px,env(safe-area-inset-bottom))] pt-[96px]">
        <button type="button" onClick={() => setMobile(false)} aria-label="Luk menu" className="btn btn-secondary btn-icon absolute right-[var(--gutter)] top-5"><Icon name="close" /></button>
        <ul>
          {[...site.nav, ...site.utilityNav].map((l, i) => (
            <li key={l.href} className="border-b border-line" style={{ animation: mobile ? `panel-in 420ms var(--ease-enter) ${i * 40}ms both` : undefined }}>
              <Link href={l.href} className="flex min-h-16 items-center justify-between font-display text-[2rem] font-extrabold tracking-[-0.03em] text-heading">
                {l.label}
                <Icon name="arrowRight" className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href={appLinks.signup} className="btn btn-primary">Prøv gratis i 14 dage</Link>
          <Link href="/kontakt" className="btn btn-secondary">Book 15 min</Link>
        </div>
        <p className="mt-8 t-small text-muted">
          <a href={`mailto:${site.company.email}`} className="font-semibold text-heading">{site.company.email}</a> · {site.company.responsePromise}
        </p>
      </div>
    </header>
    </>
  );
}
