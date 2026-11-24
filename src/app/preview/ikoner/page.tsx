import {
  ArrowClockwiseIcon, CalendarCheckIcon, ChartLineUpIcon, CheckIcon, ClockIcon, EnvelopeIcon, FileTextIcon, LockSimpleIcon,
  MinusCircleIcon, NotePencilIcon, PlayIcon, PlusIcon, ShieldCheckIcon, SparkleIcon, UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PIcon } from "@phosphor-icons/react";
import { Icon, type IconName } from "@/components/ui/Icon";

// Icon comparison (Marco 2026-11-24): today's hand-drawn icons vs Phosphor Regular and Bold, all dark ink at 22 px,
// judged against his favourites, the three price facts. Preview only.
export const metadata = { robots: { index: false } };
const ink = "#201613";

type Row = { hvor: string; tekst: string; nu: IconName | "favorit"; p: PIcon };
const rows: Row[] = [
  { hvor: "Hero", tekst: "10 minutter om dagen, på dansk.", nu: "clock", p: ClockIcon },
  { hvor: "Hero", tekst: "Opgaver fra jeres egen hverdag.", nu: "chart", p: ChartLineUpIcon },
  { hvor: "Hero", tekst: "Kursusbevis og overblik til lederen.", nu: "doc", p: FileTextIcon },
  { hvor: "Problemet", tekst: "Kundedata ryger ind i gratis værktøjer", nu: "minus", p: MinusCircleIcon },
  { hvor: "Problemet · Priser · Kontakt", tekst: "Ingen binding, I kan stoppe, når I vil", nu: "check", p: CheckIcon },
  { hvor: "Øvemiljøet", tekst: "En opgave fra din hverdag", nu: "mail", p: EnvelopeIcon },
  { hvor: "Øvemiljøet", tekst: "Du skriver prompten selv", nu: "form", p: NotePencilIcon },
  { hvor: "Øvemiljøet", tekst: "Score og feedback med det samme", nu: "chart", p: ChartLineUpIcon },
  { hvor: "Pilotforløb", tekst: "Direkte kontakt til os", nu: "user", p: UserIcon },
  { hvor: "Pilotforløb", tekst: "I er med til at forme kurserne", nu: "sparkle", p: SparkleIcon },
  { hvor: "Pilotforløb", tekst: "Data i EU", nu: "lock", p: LockSimpleIcon },
  { hvor: "Løsningen", tekst: "Sådan kommer du i gang", nu: "play", p: PlayIcon },
  { hvor: "FAQ", tekst: "Hvor lang tid tager det?", nu: "plus", p: PlusIcon },
];

// His favourites, drawn exactly as on the live price section.
const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const favoritter = [
  { t: "7 dages gratis prøveperiode", svg: <svg {...ico}><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17M9 15l2 2 4-4" /></svg>, p: CalendarCheckIcon },
  { t: "Ingen skjulte gebyrer", svg: <svg {...ico}><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z" /><path d="M9 12l2 2 4-4" /></svg>, p: ShieldCheckIcon },
  { t: "Opsig, når I vil", svg: <svg {...ico}><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v4.5h-4.5" /></svg>, p: ArrowClockwiseIcon },
];

function Cell({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-[15px]" style={{ color: ink }}>{children}</div>;
}

export default function Page() {
  return (
    <div className="min-h-screen px-8 pb-24 pt-14" style={{ background: "#f5f2ef", color: ink }}>
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a7d76]">Forslag · kun til gennemsyn</p>
        <h1 className="mt-3 text-[40px] font-semibold leading-tight tracking-[-0.02em]">Ikoner: i dag eller Phosphor</h1>
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-[#5e524c]">Alle i mørk farve og 22 px, så det kun er selve tegningen, der er forskellig. Øverst dine tre yndlingsikoner fra priserne som målestok.</p>

        <div className="mt-10 grid grid-cols-[180px_1fr_1fr_1fr] items-center gap-x-6 rounded-[20px] bg-white px-7 py-3 shadow-[0_0_0_1px_rgba(32,22,19,0.07)]">
          {["", "I dag", "Phosphor Regular", "Phosphor Bold"].map((h) => <p key={h} className="py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a7d76]">{h}</p>)}
          {favoritter.map((f) => (
            <div key={f.t} className="contents">
              <p className="border-t py-4 text-[13px] font-semibold text-[#c2410c]" style={{ borderColor: "rgba(32,22,19,0.07)" }}>Dit yndlingsikon</p>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell>{f.svg}{f.t}</Cell></div>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell><f.p size={22} weight="regular" />{f.t}</Cell></div>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell><f.p size={22} weight="bold" />{f.t}</Cell></div>
            </div>
          ))}
          {rows.map((r, k) => (
            <div key={k} className="contents">
              <p className="border-t py-4 text-[13px] text-[#8a7d76]" style={{ borderColor: "rgba(32,22,19,0.07)" }}>{r.hvor}</p>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell><Icon name={r.nu as IconName} size={22} />{r.tekst}</Cell></div>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell><r.p size={22} weight="regular" />{r.tekst}</Cell></div>
              <div className="border-t py-4" style={{ borderColor: "rgba(32,22,19,0.07)" }}><Cell><r.p size={22} weight="bold" />{r.tekst}</Cell></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
