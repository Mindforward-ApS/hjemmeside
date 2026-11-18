"use client";
// "Nu": copy of the current Certificate + Testimonial from NyForside, for comparison in /preview/v3-certifikat-citater.
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

const c = { dark: "#201613", dark2: "#2c1f1b", cream: "#f7f2ee", sand: "#efe7e1", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;
const wrap = "w-full px-5 sm:px-[3.5vw]";
const reduceMq = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(reduceMq);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
function useReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(reduceMq).matches, () => true);
}

function useInView<T extends Element>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${dark ? "bg-white/10 text-white/75" : "bg-[#efe7e1] text-[#5a4a44]"}`}>{children}</span>;
}

function IconChip({ name }: { name: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-[12px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" style={{ background: c.sand, color: c.ink }}>
      <Icon name={name} size={18} />
    </span>
  );
}

export function NuCertifikat() {
  const reduce = useReducedMotion();
  const [ref, seen] = useInView<HTMLDivElement>();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!seen || reduce) return;
    const id = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(id);
  }, [seen, reduce]);
  const state = !seen ? "idle" : reduce || done ? "ok" : "checking";
  return (
    <section className="bg-white pb-24 lg:pb-32">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
        <div ref={ref} data-reveal className="relative min-w-0 overflow-hidden rounded-[28px] p-6 sm:p-9" style={{ background: c.cream }}>
          <div className="relative h-[23rem]">
            <div className="absolute left-0 top-0 h-[16rem] w-[13rem] overflow-hidden rounded-[20px] sm:w-[16rem]">
              <Image src="/img/people/mette-krogh.webp" alt="Deltager" fill sizes="16rem" className="object-cover" />
              <span className="absolute left-3 top-3"><Pill>Pladsholder</Pill></span>
            </div>
            <div data-cert className="absolute right-0 top-[5.5rem] w-[min(16rem,78%)] overflow-hidden rounded-[20px] border-t-2 p-6 text-white shadow-[0_30px_60px_-28px_rgba(32,22,19,0.7)] sm:w-[20rem]" style={{ background: c.dark, borderColor: c.coral }}>
              <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full border-[14px] border-[#e8664a]/25" />
              <div aria-hidden className="absolute -right-2 -top-2 size-24 rounded-full border-[10px] border-[#e8664a]/25" />
              <MindforwardLogo size={20} />
              <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/75">Kursusbevis · MF-26-04812</p>
              <p className="mt-1 text-[1.625rem] font-semibold tracking-[-0.02em]">Sofie Lund</p>
              <p className="mt-0.5 text-[0.8125rem] text-white/80">AI på arbejdet · Niveau 1</p>
            </div>
            <div className="absolute bottom-0 left-0 flex w-[17rem] items-center gap-3 rounded-[16px] bg-white p-4 shadow-[0_14px_30px_-18px_rgba(32,22,19,0.35)] sm:w-[20rem]" aria-live="polite">
              <span className="grid size-10 place-items-center rounded-full transition-colors duration-500" style={{ background: state === "ok" ? "#dcefe3" : c.coralSoft, color: state === "ok" ? "#2f7a4f" : c.coral }}>
                {state === "checking" ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon name={state === "ok" ? "check" : "shield"} size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{state === "ok" ? "Certifikatet er ægte" : state === "checking" ? "Tjekker certifikatet …" : "Tjek certifikatet"}</p>
                <p className="text-[0.75rem]" style={{ color: c.muted }}>QR-kode og unikt ID</p>
              </div>
              <span className="text-[0.9375rem] font-semibold tabular-nums" style={{ color: c.ink }}><span data-count="92">92</span> %</span>
            </div>
          </div>
        </div>
        <div>
          <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Et certifikat, der kan tjekkes</h2>
          <p data-reveal className="mt-5 max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op.</p>
          <div className="mt-9 grid gap-7">
            {[
              { i: "user" as const, t: "Dit navn og et unikt ID", d: "Beviset viser, hvilket forløb du har taget, og hvornår." },
              { i: "globe" as const, t: "Del det på LinkedIn", d: "Eller send det til chefen. QR-koden viser, at det er ægte." },
            ].map((r) => (
              <div key={r.t} data-reveal className="group flex gap-4">
                <IconChip name={r.i} />
                <div><h3 className="text-[1.1875rem] font-semibold" style={{ color: c.ink }}>{r.t}</h3><p className="mt-1.5 max-w-[24rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{r.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 6 · Testimonials: a real carousel (the example quotes from the current site) ───────────── */
const quotes = [
  { name: "Kontorchef", firm: "logistikvirksomhed, 40 ansatte", photo: "", initials: "KC", quote: "Referaterne tager mig otte minutter nu. Før brugte jeg en halv time efter hvert møde.", before: "30 min", after: "8 min", what: "pr. referat" },
  { name: "Sælger", firm: "byggemarked", photo: "/img/people/ali-yilmaz.webp", initials: "SA", quote: "Jeg skriver tilbud på halvdelen af tiden, og de lyder stadig som mig.", before: "45 min", after: "20 min", what: "pr. tilbud" },
  { name: "Ejer", firm: "revisionsfirma, 12 ansatte", photo: "/img/people/peter-skov.webp", initials: "EJ", quote: "Nu ved hele holdet, hvad vi må dele med AI. Det var dét, der holdt os tilbage.", before: "0", after: "12", what: "medarbejdere i gang" },
];

export function NuCitater() {
  const [i, setI] = useState(2);
  const q = quotes[i];
  const go = (d: number) => setI((x) => (x + d + quotes.length) % quotes.length);
  return (
    <section className="bg-white pb-24 lg:pb-32">
      <div className={wrap}>
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 data-split className={h2} style={{ color: c.ink }} data-no-split>Hvad siger deltagerne</h2>
          <p data-reveal className="mt-5 text-[1.0625rem] leading-relaxed" style={{ color: c.muted }}>Her kommer rigtige citater fra vores første pilotforløb.</p>
        </div>
        <div data-reveal className="relative mt-14 grid gap-4 md:grid-cols-[0.75fr_1.45fr]" aria-roledescription="karrusel">
          <div key={`p${i}`} className="nf-fade relative h-[18rem] overflow-hidden rounded-[24px] md:h-auto md:min-h-[22rem]" style={{ background: c.cream }}>
            {q.photo ? <Image src={q.photo} alt="" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" /> : <span className="absolute inset-0 grid place-items-center text-[4rem] font-semibold tracking-[-0.04em]" style={{ color: c.peach, background: c.dark2 }}>{q.initials}</span>}
            <span className="absolute left-4 top-4"><Pill>Pladsholder</Pill></span>
          </div>
          <div className="flex flex-col justify-between gap-10 rounded-[24px] p-8 sm:p-12" style={{ background: c.dark }}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Pill dark>Eksempel</Pill>
              <p key={`m${i}`} className="nf-fade flex items-center gap-2 text-[0.875rem] text-white/70">
                <span className="line-through decoration-white/40">{q.before}</span>
                <Icon name="arrowRight" size={14} />
                <span className="font-semibold" style={{ color: c.peach }}>{q.after}</span> {q.what}
              </p>
            </div>
            <p key={`q${i}`} className="nf-fade max-w-[34rem] text-[clamp(1.375rem,1rem+1.2vw,1.875rem)] font-medium leading-snug tracking-[-0.01em] text-white">“{q.quote}”</p>
            <div className="flex items-end justify-between gap-4">
              <div><p className="font-semibold text-white">{q.name}</p><p className="text-[0.875rem] text-white/60">{q.firm}</p></div>
              <p className="flex gap-1" style={{ color: c.peach }} aria-label="5 ud af 5">{[0, 1, 2, 3, 4].map((k) => <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" /></svg>)}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <div className="mr-auto flex gap-2" aria-hidden>{quotes.map((_, k) => <span key={k} className="h-1.5 rounded-full transition-all duration-500" style={{ width: k === i ? 28 : 8, background: k === i ? c.ink : "#d9cec7" }} />)}</div>
          <button type="button" onClick={() => go(-1)} aria-label="Forrige citat" className="grid size-11 place-items-center rounded-full border transition-colors hover:bg-[#f7f2ee]" style={{ borderColor: "rgba(32,22,19,0.15)", color: c.ink }}><Icon name="arrowLeft" size={16} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Næste citat" className="grid size-11 place-items-center rounded-full transition-[filter] hover:brightness-110" style={{ background: c.coral, color: c.ink }}><Icon name="arrowRight" size={16} /></button>
        </div>
      </div>
    </section>
  );
}

