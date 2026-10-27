"use client";

import { useEffect, useRef, useState } from "react";
import { AppMark } from "@/components/product/AppMark";
import { Icon, type IconName } from "@/components/ui/Icon";

// The working product (hero proof): pick a request, the suggested reply types itself, send it.
// Plays the first request once on its own; any click hands control to the visitor.
// Reduced motion: replies appear instantly. Demo data only, clearly labelled.

type Req = { id: string; name: string; subject: string; channel: IconName; tag: string; tagClass: string; waited: string; message: string; reply: string };

const reqs: Req[] = [
  {
    id: "r1", name: "Lene Holm", subject: "Vandskade i køkkenet – kan I komme i dag?", channel: "phone", tag: "Haster",
    tagClass: "bg-[oklch(0.94_0.05_25)] text-[oklch(0.45_0.17_25)]", waited: "2 t",
    message: "Telefonnote: Vand under køkkenvasken siden i morges. Hun er hjemme hele dagen.",
    reply: "Hej Lene. Vi har en montør i nærheden og kan være hos dig kl. 14 i dag. Du får en sms, når han kører.",
  },
  {
    id: "r2", name: "Bo Andersen", subject: "Pris på nyt badeværelse, ca. 6 m²", channel: "form", tag: "Tilbud",
    tagClass: "bg-surface-sunk text-heading", waited: "1 d",
    message: "Vi skal have lavet badeværelset om efter nytår. Hvad koster det cirka, og hvornår kan I?",
    reply: "Hej Bo. Tak for din henvendelse. Jeg har lagt et tilbud på 6 m² ved, og vi kan starte i uge 3.",
  },
  {
    id: "r3", name: "Ida Kjær", subject: "Hvor lang tid tager en udskiftning?", channel: "mail", tag: "Spørgsmål",
    tagClass: "bg-[oklch(0.94_0.04_155)] text-[oklch(0.42_0.11_155)]", waited: "2 d",
    message: "Hvor lang tid tager det at skifte et toilet, og skal vandet lukkes hele dagen?",
    reply: "Hej Ida. En udskiftning tager typisk 2–3 timer, og vandet er kun lukket i cirka en time.",
  },
  {
    id: "r4", name: "Henrik Dahl", subject: "Tilbud på 3 vinduer + montering", channel: "form", tag: "Tilbud",
    tagClass: "bg-surface-sunk text-heading", waited: "5 t",
    message: "Vi skal have skiftet tre vinduer i stuen. Kan I give et tilbud inklusive montering?",
    reply: "Hej Henrik. Tak for din henvendelse. Du får tilbuddet på tre vinduer med montering i morgen formiddag.",
  },
  {
    id: "r5", name: "Café Nordlys", subject: "Kan vi flytte aftalen til torsdag?", channel: "mail", tag: "Booking",
    tagClass: "bg-[oklch(0.95_0.05_85)] text-[oklch(0.45_0.1_70)]", waited: "3 t",
    message: "Vi kan desværre ikke tirsdag. Passer torsdag kl. 8 i stedet?",
    reply: "Hej. Torsdag kl. 8 passer fint. Vi har flyttet aftalen, og du får en bekræftelse på sms.",
  },
];

export function InboxDemo() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState<string[]>([]);
  const [auto, setAuto] = useState(true);
  const [started, setStarted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const r = reqs[active];
  const done = typed >= r.reply.length;
  const nextUnsent = reqs.findIndex((q) => !sent.includes(q.id));

  // Start typing once the demo is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setTyped(reduce ? r.reply.length : (n) => n + 2), reduce ? 0 : 22);
    return () => window.clearTimeout(t);
  }, [started, typed, done, r.reply.length]);

  useEffect(() => {
    if (!auto || !done || sent.includes(r.id)) return;
    const t = window.setTimeout(() => {
      setSent((s) => [...s, r.id]);
      setAuto(false);
    }, 1100);
    return () => window.clearTimeout(t);
  }, [auto, done, r.id, sent]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
    setTyped(0);
    setStarted(true);
  };

  const isSent = sent.includes(r.id);

  return (
    <div ref={root} className="light-scope flex h-full flex-col overflow-hidden rounded-[28px] border border-line-strong bg-surface-raised text-left shadow-3">
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface px-4">
        <AppMark />
        <span className="ml-auto t-small text-muted">Indbakke · {reqs.length - sent.length} åbne</span>
      </div>

      <ul aria-label="Henvendelser (prøv selv)" className="shrink-0 border-b border-line">
        {reqs.map((q, i) => {
          const hint = !auto && nextUnsent === i && i !== active && sent.length > 0;
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === active}
                className={`relative flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left transition-colors duration-[180ms] last:border-b-0 hover:bg-surface-sunk ${i === active ? "bg-accent-soft" : ""}`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunk text-muted"><Icon name={q.channel} size={16} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[0.875rem] font-semibold text-heading">{q.name}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.75rem] font-semibold ${q.tagClass}`}>{q.tag}</span>
                  </span>
                  <span className="block truncate text-[0.8125rem] text-muted">{q.subject}</span>
                </span>
                {sent.includes(q.id) ? (
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-white"><Icon name="check" size={13} /><span className="sr-only">Besvaret</span></span>
                ) : (
                  <span className="tnum shrink-0 text-[0.75rem] text-muted">{q.waited}</span>
                )}
                {hint && <span aria-hidden className="absolute left-1.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--accent-500)]" style={{ animation: "pulse-dot 1.4s ease-in-out 4" }} />}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4" aria-live="polite">
        <p className="rounded-[12px] rounded-tl-sm bg-surface-sunk px-3 py-2.5 t-small text-text">{r.message}</p>
        <div className="rounded-[12px] border border-line p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-heading"><Icon name="sparkle" size={12} className="text-accent" /> Forslag til svar · AI</p>
          <p className="min-h-[3em] t-small text-heading">
            {started ? r.reply.slice(0, typed) : <span className="text-muted">Fjord skriver et forslag …</span>}
            {started && !done && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-heading" />}
          </p>
        </div>
        <div className="flex flex-wrap gap-2" aria-hidden>
          {["Ret svaret", "Send som sms", "Vedhæft tilbud"].map((a) => (
            <span key={a} className="rounded-full border border-line px-3 py-1.5 text-[0.75rem] font-medium text-text">{a}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="t-small text-muted">{isSent ? "Sendt fra din egen mail" : sent.length > 0 ? "Prøv selv: vælg en anden" : "Eksempeldata"}</span>
          {isSent ? (
            <span role="status" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[oklch(0.94_0.04_155)] px-4 t-small font-semibold text-[oklch(0.38_0.1_155)]">
              <Icon name="check" size={16} /> Sendt
            </span>
          ) : (
            <button type="button" disabled={!done} onClick={() => { setAuto(false); setSent((s) => [...s, r.id]); }} className="btn btn-primary btn-sm">
              Send svar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
