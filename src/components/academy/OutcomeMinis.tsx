// Small product moments for each learning outcome (realistic Danish demo data, no lorem).
import { Icon } from "@/components/ui/Icon";

const coral = "oklch(0.66 0.19 33)";
const ink = "oklch(0.24 0.02 30)";

// 1 · Spar tid: a meeting summary drafted by AI, with the time saved.
export function MiniDraft() {
  return (
    <div className="rounded-[1rem] bg-white p-5 text-left shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.06),0_18px_40px_-20px_oklch(0.3_0.04_30/0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[0.8125rem] text-[oklch(0.5_0.012_30)]">
        <span className="whitespace-nowrap">Til: <span style={{ color: ink }}>Mette Holm</span></span>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.75rem] font-medium" style={{ background: "oklch(0.7 0.15 28 / 0.12)", color: coral }}>
          <Icon name="sparkle" size={12} /> Udkast på 38 sek.
        </span>
      </div>
      <p className="mt-3 text-[0.9375rem] font-medium" style={{ color: ink }}>Referat: Lagermøde tirsdag</p>
      <ul className="mt-3 grid gap-1.5 text-[0.875rem] leading-snug text-[oklch(0.42_0.012_30)]">
        <li>• Ny plukkerute fra 1. december</li>
        <li>• Jonas bestiller to ekstra scannere</li>
        <li>• Næste møde 3. dec. kl. 9.00</li>
      </ul>
    </div>
  );
}

// 2 · Brug AI sikkert: what you may share before you paste.
export function MiniSafety() {
  const rows = [
    { t: "Kundens firmanavn", s: "Må deles", c: "oklch(0.55 0.11 150)", i: "check" as const },
    { t: "CPR-nummer", s: "Del aldrig", c: coral, i: "close" as const },
    { t: "Intern prisliste", s: "Spørg først", c: "oklch(0.62 0.12 70)", i: "shield" as const },
  ];
  return (
    <ul className="grid gap-2 rounded-[1rem] bg-white p-3 shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.06),0_18px_40px_-20px_oklch(0.3_0.04_30/0.35)]">
      {rows.map((r) => (
        <li key={r.t} className="flex items-center justify-between gap-3 rounded-[0.7rem] bg-[oklch(0.975_0.006_60)] px-3.5 py-2.5 text-[0.875rem]">
          <span style={{ color: ink }}>{r.t}</span>
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium" style={{ color: r.c }}>
            <Icon name={r.i} size={14} /> {r.s}
          </span>
        </li>
      ))}
    </ul>
  );
}

// 3 · Skriv bedre prompts: the four-part method, filled in.
export function MiniPrompt() {
  const parts = [
    { k: "Rolle", v: "Du er min salgsassistent" },
    { k: "Opgave", v: "Skriv et tilbud til Bølge ApS" },
    { k: "Eksempel", v: "Brug tonen fra mit sidste tilbud" },
    { k: "Format", v: "Max 120 ord, tre punkter" },
  ];
  return (
    <div className="grid gap-2 rounded-[1rem] bg-white p-4 shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.06),0_18px_40px_-20px_oklch(0.3_0.04_30/0.35)]">
      {parts.map((p, i) => (
        <div key={p.k} className="flex items-baseline gap-3 text-[0.875rem]">
          <span className="w-[4.5rem] shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.08em]" style={{ color: i === 1 ? coral : "oklch(0.55 0.012 30)" }}>{p.k}</span>
          <span style={{ color: ink }}>{p.v}</span>
        </div>
      ))}
    </div>
  );
}

// 4 · Få et bevis: a course certificate.
export function MiniCert() {
  return (
    <div className="relative overflow-hidden rounded-[1rem] bg-white p-5 shadow-[0_0_0_1px_oklch(0.2_0.01_30/0.06),0_18px_40px_-20px_oklch(0.3_0.04_30/0.35)]">
      <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[oklch(0.55_0.012_30)]">Kursusbevis</p>
      <p className="mt-2 text-[1.5rem] font-semibold leading-none tracking-[-0.03em]" style={{ color: ink }}>Sofie Lund</p>
      <p className="mt-2 text-[0.875rem] text-[oklch(0.42_0.012_30)]">AI på arbejdet · 12 lektioner · 14. nov. 2026</p>
      <span aria-hidden className="absolute -right-3 -top-3 grid size-20 place-items-center rounded-full text-white" style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))" }}>
        <Icon name="check" size={26} />
      </span>
    </div>
  );
}

export const minis = [MiniDraft, MiniSafety, MiniPrompt, MiniCert];
