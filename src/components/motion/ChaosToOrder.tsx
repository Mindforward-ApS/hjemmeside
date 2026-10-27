"use client";

import { useRef } from "react";
import { gsap, useGSAP, motionQuery, reduceQuery } from "@/lib/gsap";
import { AppMark } from "@/components/product/AppMark";
import { Icon, type IconName } from "@/components/ui/Icon";

// Concept A, "Kaos → orden". The section pins while you scroll.
// 1) Loose requests (mail, phone, form) tumble into view, scattered.
// 2) They fly into a sorted inbox and get a tag and an owner.
// 3) The inbox flips to the week overview: "Ingen venter over 24 t".
// Reduced motion: the final, ordered state is shown statically.

type Req = { name: string; subject: string; channel: IconName; tag: string; tagClass: string; owner: string; scatter: [number, number, number] };

const reqs: Req[] = [
  { name: "Lene Holm", subject: "Vandskade i køkkenet – kan I komme i dag?", channel: "phone", tag: "Haster", tagClass: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.17_25)]", owner: "MK", scatter: [-60, -190, -9] },
  { name: "Bo Andersen", subject: "Pris på nyt badeværelse, ca. 6 m²", channel: "form", tag: "Tilbud", tagClass: "bg-accent-soft text-accent", owner: "SJ", scatter: [240, -200, 7] },
  { name: "Henrik Dahl", subject: "Tilbud på 3 vinduer + montering", channel: "form", tag: "Tilbud", tagClass: "bg-accent-soft text-accent", owner: "SJ", scatter: [-90, 70, 5] },
  { name: "Ida Kjær", subject: "Hvor lang tid tager en udskiftning?", channel: "mail", tag: "Spørgsmål", tagClass: "bg-[oklch(0.94_0.04_155)] text-[oklch(0.42_0.11_155)]", owner: "AL", scatter: [260, 120, -6] },
  { name: "Café Nordlys", subject: "Kan vi flytte aftalen til torsdag?", channel: "mail", tag: "Booking", tagClass: "bg-[oklch(0.95_0.05_85)] text-[oklch(0.45_0.1_70)]", owner: "MK", scatter: [40, 240, 10] },
];

const boardItems = [
  ["Vandskade", "Carport", "Tagrender"],
  ["Udskiftning", "Booking", "Garanti"],
  ["Badeværelse", "3 vinduer", "Terrasse"],
  ["Tag", "Køkken", "Kælder"],
];

const phases = [
  { k: "01", title: "Mails, opkald og formularer. Alt på én gang.", body: "Sådan ser en almindelig tirsdag ud. Noget haster, noget kan vente, og intet står samme sted." },
  { k: "02", title: "Fjord sorterer for dig.", body: "Hver henvendelse får en type, en ansvarlig og en frist. Det hastende lægger sig øverst." },
  { k: "03", title: "Og ingen bliver glemt.", body: "Venter en kunde for længe, får den ansvarlige besked. Du ser hele ugen på én skærm." },
];

export function ChaosToOrder() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        const k = window.innerWidth < 768 ? 0.35 : window.innerWidth < 1024 ? 0.5 : 1;
        const cards = gsap.utils.toArray<HTMLElement>(".cto-card");
        const texts = gsap.utils.toArray<HTMLElement>(".cto-phase");

        gsap.set(cards, {
          x: (i) => reqs[i].scatter[0] * k,
          y: (i) => reqs[i].scatter[1] * k,
          rotation: (i) => reqs[i].scatter[2],
          scale: 1,
          opacity: 1,
          borderRadius: 14,
          boxShadow: "0 0 0 1px oklch(0.27 0.02 266 / 0.12), 0 18px 40px -12px oklch(0.2 0.05 266 / 0.35)",
        });
        gsap.set(".cto-meta", { opacity: 0, scale: 0.6 });
        gsap.set(".cto-board", { opacity: 0, y: 20 });
        gsap.set(texts.slice(1), { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=200%", scrub: 0.8, pin: ".cto-pin", anticipatePin: 1 },
        });

        // Phase 1: chaos arrives
        tl.to(cards, { y: "+=14", rotation: (i) => reqs[i].scatter[2] * 1.3, duration: 0.6, stagger: 0.04, ease: "sine.inOut" })
          // Phase 2: order
          .to(texts[0], { opacity: 0, y: -24, duration: 0.3 }, "+=0.2")
          .to(texts[1], { opacity: 1, y: 0, duration: 0.3 }, "<0.15")
          .to(cards, { x: 0, y: 0, rotation: 0, borderRadius: 0, boxShadow: "0 0 0 0px oklch(0.27 0.02 266 / 0), 0 0 0 0 oklch(0.2 0.05 266 / 0)", duration: 0.9, stagger: 0.06, ease: "expo.inOut" }, "<0.1")
          .to(".cto-meta", { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" }, "-=0.3")
          .to(".cto-filter", { opacity: 1, duration: 0.2 }, "<")
          // Phase 3: overview
          .to(texts[1], { opacity: 0, y: -24, duration: 0.3 }, "+=0.4")
          .to(texts[2], { opacity: 1, y: 0, duration: 0.3 }, "<0.15")
          .to(cards, { opacity: 0, y: -12, duration: 0.3, stagger: 0.03 }, "<")
          .to(".cto-board", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
          .from(".cto-col", { y: 24, opacity: 0, stagger: 0.08, duration: 0.4 }, "<0.1")
          .from(".cto-badge", { scale: 0.6, opacity: 0, duration: 0.3, ease: "back.out(2.5)" }, "-=0.1")
          .to(".cto-progress", { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
      });

      mm.add(reduceQuery, () => {
        gsap.set(".cto-phase", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cto-title" className="relative">
      <div className="cto-pin flex min-h-[100dvh] items-center py-6 lg:py-10">
        <div className="container-wide w-full">
        <div className="field-blue grid w-full items-center gap-10 overflow-hidden rounded-[16px] p-6 md:p-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:p-16">
          {/* Narrative (above the scattered cards) */}
          <div className="relative z-30">
            <p className="t-label mb-5">Sådan virker det</p>
            <h2 id="cto-title" className="sr-only">Fra kaos til orden</h2>
            <div className="relative grid">
              {phases.map((p) => (
                <div key={p.k} className="cto-phase [grid-area:1/1]">
                  <p className="tnum font-display text-[0.875rem] font-semibold text-heading opacity-70">{p.k} / 03</p>
                  <p className="t-display mt-3" style={{ fontSize: "clamp(1.625rem, 1.1rem + 2.6vw, 3.25rem)" }}>{p.title}</p>
                  <p className="t-lead mt-5 hidden max-w-md lg:block">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 h-1 w-full max-w-sm lg:mt-10 overflow-hidden rounded-full bg-line" aria-hidden>
              <div className="cto-progress h-full origin-left scale-x-0 rounded-full bg-white" />
            </div>
          </div>

          {/* Stage */}
          <div className="light-scope relative mx-auto w-full max-w-[640px] bg-transparent">
            <div className="cto-window relative rounded-[var(--r-xl)] border border-line-strong bg-surface-raised shadow-3">
              <div className="flex h-11 items-center gap-3 rounded-t-[var(--r-xl)] border-b border-line bg-surface px-4">
                <AppMark />
                <span className="ml-auto text-[0.6875rem] text-muted">Indbakke · i dag</span>
              </div>
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="text-[0.9375rem] font-semibold text-heading">Indbakke</span>
                <span className="cto-filter rounded-full bg-heading px-2.5 py-1 text-[0.6875rem] font-semibold text-surface-raised opacity-0">Hastende først</span>
              </div>
              {/* Slots: cards are positioned exactly here and animated from their scattered offsets */}
              <ul className="relative">
                {reqs.map((r) => (
                  <li key={r.name} className="cto-card relative z-10 flex items-center gap-3 border-b border-line bg-surface-raised px-4 py-3 last:border-b-0 will-change-transform">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunk text-muted"><Icon name={r.channel} size={16} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[0.875rem] font-semibold text-heading">{r.name}</span>
                        <span className={`cto-meta shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-semibold ${r.tagClass}`}>{r.tag}</span>
                      </span>
                      <span className="block truncate text-[0.8125rem] text-muted">{r.subject}</span>
                    </span>
                    <span className="cto-meta grid size-6 shrink-0 place-items-center rounded-full bg-heading text-[0.5625rem] font-bold text-surface-raised">{r.owner}</span>
                  </li>
                ))}
              </ul>

              {/* Phase 3: board replaces the list */}
              <div className="cto-board absolute inset-x-0 bottom-0 top-11 z-20 rounded-b-[var(--r-xl)] bg-surface-raised p-4 opacity-0">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[0.9375rem] font-semibold text-heading">Overblik · denne uge</span>
                  <span className="cto-badge flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.04_155)] px-2.5 py-1 text-[0.6875rem] font-semibold text-[oklch(0.42_0.11_155)]">
                    <Icon name="check" size={12} /> Ingen venter over 24 t
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[["Nye", 3], ["Besvaret", 6], ["Tilbud sendt", 4], ["Vundet", 9]].map(([n, c], i) => (
                    <div key={n} className="cto-col rounded-lg bg-surface-sunk p-2.5">
                      <p className="mb-2 flex justify-between text-[0.6875rem] font-semibold text-muted">{n}<span className="tnum text-heading">{c}</span></p>
                      {boardItems[i].map((it) => (
                        <div key={it} className="mb-1.5 rounded-md border border-line bg-surface-raised px-2 py-1.5 text-[0.6875rem] text-heading shadow-1">
                          {it}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
