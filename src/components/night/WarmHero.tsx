"use client";

import { appLinks } from "@/lib/app";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { SilkWave, type SilkStyle } from "@/components/night/SilkWave";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { HeroPerson } from "@/components/night/HeroPerson";
import { ArcLines, ArcTiles } from "@/components/night/ArcTiles";
import { EditTiles } from "@/components/night/EditTiles";
import { HeroLogin } from "@/components/night/HeroLogin";
import { CertReveal } from "@/components/night/CertReveal";

// Home hero, warm dark-chocolate stage with its own nav: thin headline with a warm fade, white button with a
// coral arrow, an abstract silk ribbon (SilkWave) in the open centre, floating dots, a stat on the right,
// and two white cards overlapping the bottom edge. Our copy, our artwork. No photos.

// Background measured from Marco's reference (sampled hex): brightest at the top centre (#3a2a27),
// warm brown mid (#261a16), near-black red-brown at the edges (#130601 / #1a0d0a), plus a soft diagonal light streak.
const warm = {
  stage:
    "radial-gradient(70% 55% at 50% 8%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), radial-gradient(60% 70% at 72% 85%, #271d19 0%, transparent 70%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)",
  sheen: "linear-gradient(120deg, transparent 18%, rgba(120, 92, 84, 0.16) 30%, rgba(160, 128, 118, 0.10) 36%, transparent 48%)",
  coral: "oklch(0.66 0.19 33)",
};

function Arrow({ size = 34 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-white" style={{ width: size, height: size, background: warm.coral }}>
      <Icon name="arrowRight" size={Math.round(size * 0.45)} className="-rotate-45" />
    </span>
  );
}

export function WarmHero({ tiles = "float", cta, silk = "lines", person = "fade", cert = false, title, sub, eyebrow, points, titleClass }: { title?: React.ReactNode; sub?: string; eyebrow?: string; points?: string[]; titleClass?: string; tiles?: "float" | "arc" | "edit"; cta?: React.ReactNode; silk?: SilkStyle; person?: "fade" | "touch" | "behind"; cert?: boolean } = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  // Big monitors (same gate as the 3-line heading): lower the headline block halfway toward the white card.
  // Only ever moves it down, never sideways or up.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1600px) and (min-height: 1060px)");
    const fit = () => {
      const head = headRef.current, card = cardRef.current;
      if (!head || !card) return;
      head.style.transform = "";
      if (!mq.matches) return;
      // The div stretches to the grid row, so measure its content (the lowest child), not the div itself.
      const bottom = Math.max(...[...head.children].map((c) => c.getBoundingClientRect().bottom));
      const dy = card.getBoundingClientRect().top - 40 - bottom;
      // 40 % of the free space: lower, but not resting on the card (Marco: full drop "alt for lavt", then "a tiny bit higher").
      if (dy > 0) head.style.transform = `translateY(${Math.round(dy * 0.4)}px)`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (headRef.current) ro.observe(headRef.current);
    window.addEventListener("resize", fit);
    mq.addEventListener("change", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); mq.removeEventListener("change", fit); };
  }, []);
  // "touch": her feet land exactly on the white card's top edge at every screen size (measured, not guessed).
  // Her waving sleeve reaches further right than the white card (image pixel x 1071 of 1100 on the bottom row), so the
  // whole centre column (person + AI tiles) shifts left just enough that the sleeve still rests on the card.
  useEffect(() => {
    if (person !== "touch") return;
    const fit = () => {
      const box = personRef.current, card = cardRef.current, col = colRef.current;
      if (!box || !card || !col) return;
      box.style.transform = "";
      col.style.transform = "";
      const b = box.getBoundingClientRect(), c = card.getBoundingClientRect();
      box.style.transform = `translateY(${c.top - b.bottom}px)`;
      const scale = Math.min(b.width / 1100, b.height / 998);
      const sleeveRight = b.left + (b.width - 1100 * scale) / 2 + 1075 * scale;
      const dx = Math.min(0, c.right - 12 - sleeveRight);
      col.style.transform = `translateX(${dx}px)`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (cardRef.current) ro.observe(cardRef.current);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, [person]);
  const [menu, setMenu] = useState(false);
  const [waving, setWaving] = useState(true);
  const [slide, setSlide] = useState(1);

  return (
    <section>
      {/* Full-bleed stage: edge to edge, no frame */}
      <div ref={stageRef} className="relative overflow-hidden" style={{ background: warm.stage }}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: warm.sheen }} />
        {/* Abstract 3D silk ribbon (original, code-generated) */}
        <SilkWave look={silk} />
        {/* Edge vignette: right side falls to near-black like the reference */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 100% at 40% 40%, transparent 55%, rgba(19, 6, 1, 0.55) 100%)" }} />

        {/* Floating pill header in brown glass: logo · links in an inner pill (active = light pill) · log in + primary */}
        <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 md:px-2 md:pt-4">
          {/* Header shape after mindforward.dk (Marco 2026-10-22): a near full-width bar with 16px corners, plain text links,
              "Log ind" as a text link and a squared 12px primary button. Our own brown glass and cream colours. */}
          <nav
            aria-label="Hovedmenu"
            className="mx-auto flex h-16 items-center gap-2 rounded-[16px] border border-white/10 pl-4 pr-2 backdrop-blur-xl backdrop-saturate-150 sm:h-[4.75rem] sm:gap-4 sm:pl-6 sm:pr-3"
            style={{ background: "linear-gradient(180deg, rgba(52, 32, 26, 0.82), rgba(30, 18, 15, 0.76))", boxShadow: "inset 0 1px 0 rgba(255, 220, 200, 0.08), 0 14px 40px -22px rgba(19, 6, 1, 0.7)" }}
          >
            <Link href="/" aria-label="Mindforward forside" className="rounded-lg">
              <MindforwardLogo size={36} />
            </Link>

            <ul className="mx-auto hidden items-center gap-1 lg:flex">
              {[
                { label: "Kurser", href: "/#kurser" },
                { label: "Sådan virker det", href: "/#saadan" },
                { label: "Priser", href: "/#priser" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-full px-4 py-2 text-[0.9375rem] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ml-auto flex items-center gap-2 sm:gap-5 lg:ml-0">
              <Link href={appLinks.login} className="hidden text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-white md:inline">Log ind</Link>
              <Link href={appLinks.signup} className="n-btn n-btn-cream !min-h-11 !rounded-[12px] !px-4 !text-[0.875rem] sm:!min-h-12 sm:!px-6 sm:!text-[0.9375rem]"><span className="sm:hidden">Start</span><span className="hidden sm:inline">Start et kursus</span></Link>
              <button type="button" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-label="Menu" className="grid size-11 place-items-center rounded-[12px] text-white lg:hidden">
                <Icon name={menu ? "close" : "menu"} />
              </button>
            </div>
          </nav>
        </header>
        {/* Spacer for the fixed bar */}
        <div aria-hidden className="h-24" />
        {menu && (
          <ul className="fixed inset-x-2 top-[5rem] z-50 grid gap-1 rounded-[16px] border border-white/10 p-3 backdrop-blur-xl lg:hidden" style={{ background: "rgba(40, 25, 21, 0.75)" }}>
            {[...site.nav, ...site.utilityNav].map((l) => (
              <li key={l.href}><Link href={l.href} className="block rounded-xl px-4 py-3 text-white hover:bg-white/10">{l.label}</Link></li>
            ))}
          </ul>
        )}

        {/* Stage content */}
        <div className={`relative grid gap-10 px-6 pb-12 md:px-[3.5vw] ${points ? "hero-pts-grid lg:min-h-[calc(100svh-6rem-14svh)]" : "lg:h-[calc(100svh-6rem-14svh)]"} lg:min-h-[30rem] lg:grid-cols-[1.1fr_1fr_0.75fr] lg:pb-0`}>
          {/* Headline + action */}
          <div ref={headRef} className={`relative z-10 pt-10 ${points ? "hero-pts-col lg:pt-12 lg:pb-[calc(20svh+2.5rem)]" : "lg:pt-16"}`}>
            {/* Subheading above the headline (Marco 2026-10-23) */}
            {eyebrow && <p className="hero-pts-eyebrow mb-6 text-[1.0625rem] font-medium text-white/75 sm:text-[1.1875rem]">{eyebrow}</p>}
            <h1 className={`${points ? "hero-pts-title " : ""}font-display font-normal leading-[1.02] tracking-[-0.04em] text-white ${titleClass ?? "text-[clamp(2.5rem,0.8rem+3.6vw,4.5rem)]"}`}>
              {title ?? (
                <>
                  <span className="lg:whitespace-nowrap">Lær AI, der</span>
                  <br />
                  <span className="lg:whitespace-nowrap">virker i din</span>
                  <br />
                  <span className="text-white">hverdag</span>
                </>
              )}
            </h1>
            {sub && <p className="mt-6 max-w-[26rem] text-[1.125rem] leading-relaxed text-white/70">{sub}</p>}
            {/* Three value propositions with check marks under the headline (Marco 2026-10-23) */}
            {points && (
              <ul className="hero-pts-list mt-8 grid gap-3.5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[1.0625rem] text-white/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full text-white" style={{ background: warm.coral }}>
                      <Icon name="check" size={14} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {cta ?? <HeroLogin />}
          </div>

          {/* Centre: the Mindforward person standing on the stage's bottom edge, lit warm from behind */}
          <div ref={colRef} className="relative hidden lg:block">
            <div aria-hidden className="absolute bottom-[22svh] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.45),oklch(0.5_0.08_40/0.15)_60%,transparent)] blur-2xl" />
            {tiles === "arc" && (
              <div aria-hidden className="pointer-events-none absolute bottom-[20svh] left-1/2 top-[3%] z-0 aspect-[540/660] -translate-x-1/2">
                <ArcLines waving={waving} />
              </div>
            )}
            <div ref={personRef} className={`absolute left-[-48%] right-[4%] z-[1] ${{ fade: "bottom-[20svh] top-[3%] [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]", touch: "bottom-[17svh] top-[3%]", behind: "bottom-[20svh] top-[3%] translate-y-[7svh]" }[person]}`}>
              <HeroPerson onWavingChange={tiles === "edit" ? undefined : setWaving} forceWaving={tiles === "edit" ? waving : undefined} />
            </div>
            {/* AI tiles floating around her, exactly as on mindforward.dk (Ny3.tsx): positions are relative to a
                box the size of her body (aspect 460/660, centred on her), 64 px tiles, radius 20, white ring, ny-float */}
            <div aria-hidden={tiles !== "edit"} className={`absolute bottom-[20svh] left-1/2 top-[3%] z-[2] aspect-[540/660] -translate-x-1/2 ${tiles === "edit" ? "" : "pointer-events-none"}`}>
              {tiles === "edit" ? <EditTiles waving={waving} setWaving={setWaving} /> : tiles === "arc" ? <ArcTiles waving={waving} /> : <>
              {/* Marco's own layout from the editor (design/tile-positions.json, 2026-10-22): tile centres in % of this box */}
              {[
                { id: "claude", src: "/logos/claude.png", x: -14.4, y: 9.8, r: "-6deg", d: "5.2s", delay: "0s" },
                { id: "chatgpt", src: "/logos/chatgpt.png", x: 60.3, y: 41.2, r: "5deg", d: "4.6s", delay: "-1.4s" },
                { id: "copilot", src: "/logos/copilot.png", x: -16.7, y: 41.3, r: "-4deg", d: "5.8s", delay: "-2.6s" },
                { id: "ai", x: 48.8, y: 7.3, r: "4deg", d: "5.4s", delay: "-3.1s" },
              ].map((t) => (
                <div key={t.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
                  <div
                    className={`ny-float size-[64px] overflow-hidden rounded-[20px] ${t.src ? "bg-white shadow-[0_18px_40px_-14px_rgba(14,23,38,.55)] ring-4 ring-white/50" : "grid place-items-center bg-[linear-gradient(145deg,#4a2f27_0%,#33201b_100%)] shadow-[inset_0_1px_0_rgba(255,220,200,.18),0_18px_40px_-14px_rgba(14,8,6,.7)] ring-4 ring-white/30"}`}
                    style={{ ["--r" as string]: t.r, ["--float-d" as string]: t.d, ["--delay" as string]: t.delay }}
                  >
                    {t.src ? (
                      <Image src={t.src} alt="" width={128} height={128} className="h-full w-full object-cover" />
                    ) : (
                      <span className="relative leading-none">
                        <span className="bg-[linear-gradient(160deg,#ffd9b8_0%,#ff9a5c_45%,#e8643a_100%)] bg-clip-text text-[28px] font-black tracking-[-0.06em] text-transparent [filter:drop-shadow(0_0_10px_rgba(255,140,80,.45))]">AI</span>
                        <span aria-hidden className="absolute -right-2.5 -top-1.5 text-[11px] text-[#ffc89e]">✦</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              </>}
            </div>
          </div>

          {/* Right column: arrow chip + stat */}
          <div className="relative z-10 hidden flex-col pt-[8svh] lg:flex">
            <div className="flex items-center">
              <span className="relative size-16 shrink-0 rounded-full border-2 border-white/25">
                <Image src="/img/avatar-learner.webp" alt="Mand ved sin computer" width={128} height={128} className="size-full rounded-full object-cover" />
                <span aria-hidden className="absolute left-1/2 top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/20 text-white ring-1 ring-white/30 backdrop-blur-[2px]"><Icon name="play" size={12} className="translate-x-px" /></span>
              </span>
              <span className="relative z-10 -ml-3"><Arrow size={64} /></span>
            </div>
            <p className="mt-[6svh] font-display text-[2.25rem] font-medium leading-none tracking-[-0.04em] text-white">10 min</p>
            <p className="mt-1 text-[1.125rem] font-medium text-white">pr. lektion</p>
            <span className="my-6 h-px w-full bg-white/20" />
            <p className="text-[1.125rem] leading-relaxed text-white/75">Korte, konkrete lektioner på dansk, som du kan tage mellem to møder.</p>
          </div>

          
        </div>

        {/* Bottom cards overlapping the stage edge */}
        <div className="relative z-[5] grid gap-4 lg:-mt-[20svh] lg:h-[34svh] lg:min-h-[17rem] lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div ref={cardRef} className="relative overflow-hidden bg-[oklch(0.99_0.003_60)] p-8 lg:mr-24 lg:h-[31svh] lg:self-end lg:rounded-tr-[2.25rem] lg:py-[4svh] lg:pl-[3.5vw] lg:pr-14">
            <div className="grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-center lg:h-full">
              <div>
                <h2 className="font-display text-[clamp(1.5rem,0.6rem+1.9vw,2.5rem)] font-extrabold uppercase leading-[1] tracking-[-0.02em] text-[oklch(0.24_0.02_30)] [&>span]:block lg:[&>span]:whitespace-nowrap"><span>Et certifikat, du</span><span>stolt kan vise frem</span></h2>
                <p className="mt-5 max-w-[22rem] text-[1.1875rem] leading-relaxed text-[oklch(0.3_0.015_30)]">Med dit navn og et unikt ID. Sæt det på LinkedIn, eller send det til chefen.</p>
                <Link href="/#certifikat" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" }); }} className="mt-6 inline-block text-[1.0625rem] underline underline-offset-4" style={{ color: warm.coral }}>Se certifikatet</Link>
              </div>
              {/* Team photo (Marco's cut-out), standing on the card's bottom edge */}
              <div className="relative hidden self-end sm:block md:-mb-14 md:-mr-14 lg:-mb-[4svh] lg:-ml-[18%] lg:h-[calc(31svh-2svh)] lg:min-h-[15rem]">
                <Image
                  src="/img/team3.webp"
                  alt="Fem kolleger, der kigger sammen på et papir og smiler"
                  width={2752}
                  height={1536}
                  sizes="(min-width: 1024px) 34vw, 50vw"
                  className="h-auto w-full select-none object-contain object-bottom mix-blend-multiply lg:h-full lg:w-auto lg:ml-auto"
                />
              </div>
            </div>
          </div>

          <div className="relative px-6 pb-6 lg:pb-8 lg:pr-[3.5vw]">
            {/* Card stack: the next two cards peek out directly beneath the top card */}
            <div className="relative">
            <span aria-hidden className="absolute inset-x-4 -bottom-2.5 top-2.5 rounded-[1rem] bg-white/55 shadow-1" />
            <span aria-hidden className="absolute inset-x-8 -bottom-5 top-5 rounded-[1rem] bg-white/25" />
            <div className="relative z-10 flex gap-4 rounded-[1rem] bg-white p-5 shadow-3">
              <div className="flex flex-1 flex-col">
                <p className="font-display text-[1.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-[oklch(0.24_0.02_30)]">{["Find dit forløb", "AI på arbejdet", "For virksomheder"][slide]}</p>
                <p className="mt-3 text-[0.9375rem] leading-snug text-[oklch(0.5_0.012_30)]">{["Tag en kort test, og få et forslag til dit niveau.", "Vores mest populære begynderkursus.", "Fælles forløb og overblik for hele teamet."][slide]}</p>
                <Link href={["/#kurser", "/kurser/ai-paa-arbejdet", "/priser"][slide]} className="mt-auto pt-4 text-[1.0625rem] text-[oklch(0.24_0.02_30)] underline underline-offset-4">Se detaljer</Link>
              </div>
              <div className="grid w-[9.5rem] place-items-center rounded-[0.6rem] bg-[oklch(0.22_0.025_35)] p-4 text-white" aria-hidden>
                <div className="text-center">
                  <p className="font-display text-[2.25rem] font-medium leading-none tracking-[-0.04em]">{["6", "12", "5+"][slide]}</p>
                  <p className="mt-1 text-[0.75rem] text-white/70">{["kurser", "lektioner", "brugere"][slide]}</p>
                </div>
              </div>
            </div>
            </div>
            <div className="mt-9 flex justify-center gap-2" role="tablist" aria-label="Kort">
              {[0, 1, 2].map((i) => (
                <button key={i} type="button" role="tab" aria-selected={slide === i} aria-label={`Kort ${i + 1}`} onClick={() => setSlide(i)} className={`size-2.5 rounded-full transition-colors ${slide === i ? "bg-white" : "bg-white/35 hover:bg-white/60"}`} />
              ))}
            </div>
          </div>
        </div>
        {cert && <CertReveal stage={stageRef} card={cardRef} />}
      </div>
    </section>
  );
}
