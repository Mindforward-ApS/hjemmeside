// Holdet card, three proposals (Marco 2026-11-02: "one card at the time … lav en ny preview og kom med nogle forslag").
// Each is built after one Dribbble reference (screenshots in design/references/holdet-kort/), in Mindforward's
// brown, cream and coral. Example data.
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const c = { dark: "#201613", ink: "#201613", muted: "#6e625d", line: "#efe8e3", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6", brown: "#8a4e3b" };
const people = [
  { n: "Sofie Lund", r: "Kundeservice", img: "/img/people/mette-krogh.webp", m: 9, s: 92 },
  { n: "Mads Holm", r: "Salg", img: "/img/people/jonas-bak.webp", m: 8, s: 86 },
  { n: "Ida Brandt", r: "Kundeservice", img: "/img/people/line-vestergaard.webp", m: 7, s: 79 },
];

function Face({ src, size = 36, ring }: { src: string; size?: number; ring?: string }) {
  return (
    <span className="relative block shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size, boxShadow: ring ? `0 0 0 2px ${ring}` : undefined }}>
      <Image src={src} alt="" fill sizes="48px" className="object-cover object-top" />
    </span>
  );
}

/* A · Rangliste (after AlgoStar "Top Performing Sales Reps") */
// Private version (Marco 2026-11-02): the same card, but the learner's own modules instead of the team. Example data.
const modules = [
  { n: "Skriv bedre prompts", r: "ChatGPT · Copilot · Claude", m: 9, s: 92 },
  { n: "AI på arbejdet", r: "Mails, referater, tilbud", m: 7, s: 86 },
  { n: "Data og AI", r: "Det må du dele", m: 4, s: 71 },
];
function ModuleMark({ i }: { i: number }) {
  return <span className="grid size-9 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold" style={{ background: i === 0 ? c.coralSoft : "#f3ede9", color: i === 0 ? "#b8432a" : c.ink }}>{i + 1}</span>;
}

// `fill`: stretch to the parent's height (hero: both top cards share one height). `privat`: the learner's own modules.
export function KortRangliste({ fill = false, privat = false }: { fill?: boolean; privat?: boolean }) {
  const rows = privat ? modules.map((m) => ({ ...m, img: "" })) : people;
  return (
    <div className={`@container w-full max-w-[30rem] rounded-[24px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] @[24rem]:p-7 ${fill ? "flex h-full flex-col" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[1.0625rem] font-semibold" style={{ color: c.ink }}>{privat ? "Dine moduler" : "Holdets top 3"}</p>
          <p className="mt-1 truncate text-[0.8125rem]" style={{ color: c.muted }}>{privat ? "Din fremdrift i øvemiljøet" : "Score i øvemiljøet"}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.75rem] font-medium" style={{ borderColor: c.line, color: c.ink }}>{privat ? "Alle kurser" : "Hele holdet"} <Icon name="arrowRight" size={12} /></span>
      </div>
      <ul className={fill ? "mt-auto pt-3" : "mt-4 @[24rem]:mt-6"}>
        {rows.map((p, i) => (
          <li key={p.n} className={`flex items-center gap-3 border-t @[24rem]:gap-3.5 ${fill ? "py-2" : "py-2.5 @[24rem]:py-3.5"}`} style={{ borderColor: c.line }}>
            {!privat && <span className="w-6 text-[0.8125rem] font-semibold tabular-nums" style={{ color: i === 0 ? c.coral : c.muted }}>#{i + 1}</span>}
            {privat ? <ModuleMark i={i} /> : <Face src={p.img} />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-semibold" style={{ color: c.ink }}>{p.n}</p>
              <p className="truncate text-[0.75rem]" style={{ color: c.muted }}>{p.r}</p>
              <div className="mt-1 flex items-center gap-2 @[26rem]:hidden">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: c.line }}><div className="h-full rounded-full" style={{ width: `${(p.m / 9) * 100}%`, background: i === 0 ? c.coral : c.ink }} /></div>
                <span className="text-[0.75rem] tabular-nums" style={{ color: c.muted }}>{p.m}/9</span>
              </div>
            </div>
            <div className="hidden w-[7.5rem] @[26rem]:block">
              <p className="text-[0.6875rem]" style={{ color: c.muted }}>{p.m}/9 moduler</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ background: c.line }}><div className="h-full rounded-full" style={{ width: `${(p.m / 9) * 100}%`, background: i === 0 ? c.coral : c.ink }} /></div>
            </div>
            <span className="w-9 text-right text-[1rem] font-semibold tabular-nums" style={{ color: c.ink }}>{p.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* B · Fremdrift (after Andree Wenas "Project Progress 65%") */
export function KortFremdrift() {
  return (
    <div className="w-full max-w-[30rem] rounded-[24px] p-7 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10" style={{ background: "linear-gradient(160deg, #3a2722 0%, #241815 100%)" }}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[0.875rem] text-white/75"><Icon name="sparkle" size={14} /> Holdets fremdrift</p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.75rem] text-white/75">AI på arbejdet</span>
      </div>
      <p className="mt-5 text-[4.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">68<span className="text-[2rem] text-white/60">%</span></p>
      <div className="relative mt-6 h-9 overflow-hidden rounded-full bg-white/[0.08]">
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: "68%", background: "linear-gradient(90deg, #e8664a 0%, #f6c9b6 100%)" }} />
        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[0.75rem] font-semibold" style={{ color: c.ink }}>Mål 1. dec.</span>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-[0.8125rem] text-white/60">Deltagere · 12</p>
          <div className="mt-2 flex -space-x-2.5">
            {people.map((p) => <Face key={p.n} src={p.img} size={36} ring="#2b1d19" />)}
            <span className="grid size-9 place-items-center rounded-full bg-white/12 text-[0.75rem] font-semibold ring-2 ring-[#2b1d19]">+8</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[0.8125rem] font-medium">Se holdet <Icon name="arrowRight" size={13} /></span>
      </div>
    </div>
  );
}

/* C · Aktivitet (after Dmitry Sergushkin "Activity Summary") */
export function KortAktivitet() {
  const tools = [
    { n: "ChatGPT", h: "16 t 05 m", p: 42, col: c.coral },
    { n: "Copilot", h: "13 t 50 m", p: 36, col: c.brown },
    { n: "Claude", h: "8 t 25 m", p: 22, col: c.peach },
  ];
  // 60 thin ticks coloured by share
  const ticks = Array.from({ length: 60 }, (_, i) => (i < 25 ? tools[0].col : i < 47 ? tools[1].col : tools[2].col));
  return (
    <div className="w-full max-w-[30rem] rounded-[24px] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[0.875rem] font-semibold" style={{ color: c.ink }}><Icon name="clock" size={15} /> Holdets øvetid</p>
        <span className="rounded-full border px-3 py-1 text-[0.75rem]" style={{ borderColor: c.line, color: c.muted }}>November</span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex -space-x-2">{people.slice(0, 3).map((p) => <Face key={p.n} src={p.img} size={32} ring="#fff" />)}</div>
        <div><p className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>Kundeservice</p><p className="text-[0.75rem]" style={{ color: c.muted }}>12 personer · 9 moduler</p></div>
      </div>
      <p className="mt-6 text-[0.8125rem]" style={{ color: c.muted }}>Øvetid i alt</p>
      <p className="mt-1 text-[2.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: c.ink }}>38 t 20 m</p>
      <div className="mt-5 flex gap-4 text-[0.75rem]" style={{ color: c.muted }}>
        {tools.map((t) => <span key={t.n} className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: t.col }} />{t.n}</span>)}
      </div>
      <div className="mt-3 flex h-10 items-end gap-[3px]">{ticks.map((col, i) => <span key={i} className="flex-1 rounded-full" style={{ background: col, height: `${70 + ((i * 37) % 30)}%` }} />)}</div>
      <div className="mt-4 grid grid-cols-3 border-t pt-4" style={{ borderColor: c.line }}>
        {tools.map((t, i) => (
          <div key={t.n} className={i ? "border-l pl-4" : ""} style={{ borderColor: c.line }}>
            <p className="text-[0.9375rem] font-semibold tabular-nums" style={{ color: c.ink }}>{t.h}</p>
            <p className="text-[0.75rem]" style={{ color: c.muted }}>{t.p} %</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HoldetKortPreview() {
  const items: { id: string; title: string; ref: string; node: ReactNode }[] = [
    { id: "a", title: "A · Rangliste", ref: "Efter AlgoStar · Top Performing Sales Reps", node: <KortRangliste /> },
    { id: "b", title: "B · Fremdrift", ref: "Efter Andree Wenas · Project Progress", node: <KortFremdrift /> },
    { id: "c", title: "C · Aktivitet", ref: "Efter Dmitry Sergushkin · Activity Summary", node: <KortAktivitet /> },
  ];
  return (
    <div className="min-h-[100svh] px-5 py-14 sm:px-10" style={{ background: "radial-gradient(70% 60% at 50% 0%, #3a2722 0%, #201613 70%)" }}>
      <div className="mx-auto max-w-[1500px]">
        <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-white">Holdet-kortet · 3 forslag</h1>
        <p className="mt-2 text-white/60">Ét kort ad gangen. Vælg det, du synes er flottest. Alt er eksempeldata.</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {items.map((it) => (
            <section key={it.id} className="grid content-start justify-items-center gap-5">
              <div className="text-center"><p className="text-[1.125rem] font-semibold text-white">{it.title}</p><p className="text-[0.8125rem] text-white/50">{it.ref}</p></div>
              {it.node}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
