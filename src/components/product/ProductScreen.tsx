import { AppMark } from "@/components/product/AppMark";
import { Icon, type IconName } from "@/components/ui/Icon";

// Real product UI built in HTML/CSS (§4.1 "show the product doing the job").
// Demo data only, clearly fictional, never presented as customers.
// stage: 0 = chaotic inbox · 1 = sorted · 2 = reply + quote · 3 = overview board

type Row = {
  id: string;
  name: string;
  subject: string;
  channel: IconName;
  waited: string;
  tag: "Haster" | "Tilbud" | "Spørgsmål" | "Booking";
  owner: string;
  urgency: number;
};

const rows: Row[] = [
  { id: "r1", name: "Lene Holm", subject: "Vandskade i køkkenet – kan I komme i dag?", channel: "phone", waited: "2 t", tag: "Haster", owner: "MK", urgency: 0 },
  { id: "r2", name: "Bo Andersen", subject: "Pris på nyt badeværelse, ca. 6 m²", channel: "form", waited: "1 d", tag: "Tilbud", owner: "SJ", urgency: 1 },
  { id: "r3", name: "Café Nordlys", subject: "Kan vi flytte aftalen til torsdag?", channel: "mail", waited: "3 t", tag: "Booking", owner: "MK", urgency: 3 },
  { id: "r4", name: "Ida Kjær", subject: "Hvor lang tid tager en udskiftning?", channel: "mail", waited: "2 d", tag: "Spørgsmål", owner: "AL", urgency: 2 },
  { id: "r5", name: "Henrik Dahl", subject: "Tilbud på 3 vinduer + montering", channel: "form", waited: "5 t", tag: "Tilbud", owner: "SJ", urgency: 1 },
];

const tagStyle: Record<Row["tag"], string> = {
  Haster: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.17_25)]",
  Tilbud: "bg-accent-soft text-accent",
  Spørgsmål: "bg-[oklch(0.94_0.04_155)] text-[oklch(0.42_0.11_155)]",
  Booking: "bg-[oklch(0.95_0.05_85)] text-[oklch(0.45_0.1_70)]",
};

export function ProductScreen({ stage = 1, live = false, className = "" }: { stage?: 0 | 1 | 2 | 3; live?: boolean; className?: string }) {
  const sorted = stage >= 1 ? [...rows].sort((a, b) => a.urgency - b.urgency) : rows;
  const shown = stage === 0 ? [rows[2], rows[3], rows[0], rows[4], rows[1]] : sorted;

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--r-xl)] border border-line-strong bg-surface-raised text-left shadow-3 ${className}`}
      role="img"
      aria-label="Eksempel på Fjords indbakke med kundehenvendelser sorteret efter hastende"
    >
      {/* Window bar */}
      <div className="flex h-11 items-center gap-3 border-b border-line bg-surface px-4">
        <AppMark />
        <div className="ml-auto hidden items-center gap-2 rounded-md bg-surface-sunk px-3 py-1 text-[0.6875rem] text-muted sm:flex">
          Søg i henvendelser <kbd className="rounded border border-line px-1 font-sans text-[0.625rem]">⌘K</kbd>
        </div>
      </div>

      <div className="grid min-h-[360px] grid-cols-[52px_1fr] md:grid-cols-[52px_1fr_minmax(0,0.9fr)]">
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-2 border-r border-line bg-surface py-4" aria-hidden>
          {(["mail", "doc", "clock", "user"] as IconName[]).map((n, i) => (
            <span key={n} className={`grid size-9 place-items-center rounded-lg ${i === (stage === 3 ? 2 : 0) ? "bg-accent-soft text-accent" : "text-muted"}`}>
              <Icon name={n} size={18} />
            </span>
          ))}
        </div>

        {stage === 3 ? (
          <Board />
        ) : (
          <>
            {/* List */}
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[0.9375rem] font-semibold text-heading">Indbakke</span>
                  <span className="tnum text-[0.75rem] text-muted">{stage === 0 ? "23 ulæste" : "5 åbne"}</span>
                </div>
                <div className={`flex gap-1 transition-opacity duration-[420ms] ${stage >= 1 ? "opacity-100" : "opacity-0"}`} aria-hidden>
                  <span className="rounded-full bg-heading px-2.5 py-1 text-[0.6875rem] font-semibold text-surface-raised">Hastende først</span>
                  <span className="hidden rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-muted sm:inline">Mine</span>
                </div>
              </div>
              <ul>
                {shown.map((r, i) => (
                  <li
                    key={r.id}
                    className={`flex items-center gap-3 border-b border-line px-4 py-3 transition-[background-color] duration-[420ms] ${stage === 2 && r.id === "r2" ? "bg-accent-soft" : ""} ${live ? "product-arrive" : ""}`}
                    style={live ? { animationDelay: `${300 + i * 80}ms` } : undefined}
                  >
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${stage === 0 && (r.waited.includes("d")) ? "bg-[oklch(0.94_0.05_25)] text-[oklch(0.5_0.17_25)]" : "bg-surface-sunk text-muted"}`}>
                      <Icon name={r.channel} size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[0.8125rem] font-semibold text-heading">{r.name}</span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-semibold transition-all duration-[420ms] ${tagStyle[r.tag]} ${stage >= 1 ? "opacity-100" : "w-0 overflow-hidden px-0 opacity-0"}`}
                        >
                          {r.tag}
                        </span>
                      </span>
                      <span className="block truncate text-[0.75rem] text-muted">{r.subject}</span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className={`tnum text-[0.6875rem] ${stage === 0 && r.waited.includes("d") ? "font-semibold text-danger" : "text-muted"}`}>{r.waited}</span>
                      <span
                        className={`grid size-5 place-items-center rounded-full bg-heading text-[0.5rem] font-bold text-surface-raised transition-opacity duration-[420ms] ${stage >= 1 ? "opacity-100" : "opacity-0"}`}
                        aria-hidden
                      >
                        {r.owner}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detail pane */}
            <div className="hidden min-w-0 flex-col border-l border-line bg-surface md:flex">
              <div className="border-b border-line px-5 py-3">
                <p className="text-[0.8125rem] font-semibold text-heading">Bo Andersen</p>
                <p className="truncate text-[0.75rem] text-muted">Pris på nyt badeværelse, ca. 6 m²</p>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="rounded-lg rounded-tl-sm bg-surface-sunk p-3 text-[0.75rem] leading-relaxed text-text">
                  Hej. Vi skal have lavet badeværelset om efter nytår. Hvad koster det cirka, og hvornår kan I?
                </p>
                <div className={`rounded-lg border border-line bg-surface-raised p-3 transition-all duration-[420ms] ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                  <p className="mb-1.5 flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-accent">
                    <Icon name="sparkle" size={12} /> Forslag til svar · AI
                  </p>
                  <p className="text-[0.75rem] leading-relaxed text-text">Hej Bo. Tak for din henvendelse. Jeg har lagt et tilbud på 6 m² ved, og vi har tid i uge 3 …</p>
                </div>
                <div className={`mt-auto flex items-center justify-between rounded-lg bg-heading px-3 py-2.5 text-surface-raised transition-all duration-[420ms] ${stage >= 2 ? "opacity-100" : "opacity-0"}`}>
                  <span className="flex items-center gap-2 text-[0.75rem] font-semibold">
                    <Icon name="doc" size={14} /> Tilbud #1042 sendt
                  </span>
                  <span className="grid size-5 place-items-center rounded-full bg-success text-white">
                    <Icon name="check" size={12} />
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Board() {
  const cols = [
    { name: "Nye", count: 3, items: ["Vandskade", "Carport"] },
    { name: "Besvaret", count: 6, items: ["Udskiftning", "Booking"] },
    { name: "Tilbud sendt", count: 4, items: ["Badeværelse", "3 vinduer"] },
    { name: "Vundet", count: 9, items: ["Tag", "Køkken"] },
  ];
  return (
    <div className="col-span-1 min-w-0 p-4 md:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[0.9375rem] font-semibold text-heading">Overblik · denne uge</span>
        <span className="flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.04_155)] px-2.5 py-1 text-[0.6875rem] font-semibold text-[oklch(0.42_0.11_155)]">
          <Icon name="check" size={12} /> Ingen venter over 24 t
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {cols.map((c, i) => (
          <div key={c.name} className="rounded-lg bg-surface-sunk p-2.5">
            <p className="mb-2 flex items-center justify-between text-[0.6875rem] font-semibold text-muted">
              {c.name} <span className="tnum text-heading">{c.count}</span>
            </p>
            <div className="space-y-1.5">
              {c.items.map((it) => (
                <div key={it} className="rounded-md border border-line bg-surface-raised px-2 py-1.5 text-[0.6875rem] text-heading shadow-1">
                  {it}
                  <span className={`mt-1 block h-1 rounded-full ${i === 3 ? "bg-success" : "bg-line-strong"}`} style={{ width: `${40 + ((it.length * 7) % 50)}%` }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
