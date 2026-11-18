"use client";

// Færdigheder as a one-at-a-time slider (Marco 2026-11-10): small coral label, heading and text, arrows with dots,
// then one wide cream card per skill: photo on the left; tag, title, text and two short facts on the right.
// Heading and text are the approved copy; the minutes are the same example times as before.
import Image from "next/image";
import { useState } from "react";

// coralText = the coral darkened for small text, so it passes contrast on white and cream.
const c = {
  ink: "#201613",
  muted: "#5a4a44",
  coral: "#e8664a",
  coralText: "#b8452c",
  coralSoft: "#fbe1d7",
  cream: "#f7f2ee",
};

const slides = [
  {
    tag: "Mails",
    title: "Skriv mails på halvdelen af tiden",
    img: "/img/stock/typing-above.jpg",
    pos: "30% 50%",
    text: "Du lærer at give AI'en de oplysninger, den mangler, så første udkast er tæt på færdigt. Du retter til i stedet for at starte forfra.",
    facts: [
      ["9 min", " i stedet for 20 pr. mail"],
      ["10 min", " lektion med en opgave fra din indbakke"],
    ],
  },
  {
    tag: "Møder",
    title: "Referat på fem minutter",
    img: "/img/stock/writing-sun.jpg",
    pos: "40% 35%",
    text: "Fra noter eller en optagelse til et referat med beslutninger og hvem der gør hvad. Klar til at sende, inden næste møde starter.",
    facts: [
      ["8 min", " i stedet for 30 pr. referat"],
      ["3 trin", ": noter, referat, opfølgning"],
    ],
  },
  {
    tag: "Excel",
    title: "Formler uden at kunne kode",
    img: "/img/stock/desk-warm.jpg",
    pos: "70% 50%",
    text: "Beskriv med dine egne ord, hvad regnearket skal gøre, og få formlen forklaret, så du kan rette den selv næste gang.",
    facts: [
      ["6 min", " i stedet for 25 pr. formel"],
      ["På dansk", ", også forklaringen"],
    ],
  },
  {
    tag: "Data",
    title: "Ved, hvad du må dele",
    img: "/img/stock/window-laptop.jpg",
    pos: "60% 40%",
    text: "Navne, CPR-numre og kundedata skal ikke ind i en chat. Du øver dig i at fjerne dem, før du deler, så du bruger AI trygt.",
    facts: [
      ["4 min", " i stedet for 15 at tjekke en tekst"],
      ["GDPR", " og AI-forordningen i praksis"],
    ],
  },
] as const;

export function UseCases() {
  const [i, setI] = useState(0);
  const go = (d: number) =>
    setI((x) => (x + d + slides.length) % slides.length);
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div>
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p
                className="text-[0.75rem] font-semibold uppercase tracking-[0.12em]"
                style={{ color: c.coralText }}
              >
                I praksis
              </p>
              <h2
                className="mt-2 max-w-[18ch] text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
                style={{ color: c.ink }}
              >
                Færdigheder, du kan bruge allerede i morgen
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p
                className="max-w-[28rem] text-[1rem] leading-relaxed"
                style={{ color: c.muted }}
              >
                Ingen teori for teoriens skyld. Hvert kursus er bygget op om
                opgaver, du kender fra din egen arbejdsdag.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Forrige"
                  onClick={() => go(-1)}
                  className="nf-focus grid size-10 place-items-center rounded-full transition-colors hover:bg-black/[0.04]"
                  style={{ color: c.ink }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-2"
                  style={{ background: c.cream }}
                  role="tablist"
                  aria-label="Vælg færdighed"
                >
                  {slides.map((s, n) => (
                    <button
                      key={s.tag}
                      type="button"
                      role="tab"
                      aria-selected={n === i}
                      aria-label={s.tag}
                      onClick={() => setI(n)}
                      className="size-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: n === i ? c.coral : "rgba(32,22,19,0.2)",
                        width: n === i ? 14 : 6,
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Næste"
                  onClick={() => go(1)}
                  className="nf-focus grid size-10 place-items-center rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(32,22,19,0.3)] ring-1 ring-black/5 transition-transform hover:translate-x-0.5"
                  style={{ color: c.ink }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative mt-8 rounded-[22px] p-2.5 sm:p-3"
            style={{ background: c.cream }}
          >
            <div className="grid">
              {slides.map((s, n) => (
                <article
                  key={s.tag}
                  aria-hidden={n !== i}
                  className={`col-start-1 row-start-1 grid gap-6 transition-opacity duration-500 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] md:aspect-auto md:min-h-[20rem]">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33rem, 100vw"
                      className="object-cover"
                      style={{ objectPosition: s.pos }}
                    />
                  </div>
                  <div className="flex flex-col justify-start px-3 pb-6 md:justify-center md:px-0 md:pb-0 md:pr-8">
                    <span
                      className="self-start rounded-full px-3 py-1 text-[0.75rem] font-medium"
                      style={{ background: c.coralSoft, color: "#8a3420" }}
                    >
                      {s.tag}
                    </span>
                    <h3
                      className="mt-3 text-[clamp(1.375rem,1.1rem+0.8vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.01em]"
                      style={{ color: c.ink }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-2.5 text-[0.9375rem] leading-relaxed"
                      style={{ color: c.muted }}
                    >
                      {s.text}
                    </p>
                    <ul
                      className="mt-5 space-y-1.5 text-[0.9375rem]"
                      style={{ color: c.muted }}
                    >
                      {s.facts.map(([hi, rest]) => (
                        <li key={hi}>
                          <span
                            className="font-semibold"
                            style={{ color: c.coralText }}
                          >
                            {hi}
                          </span>
                          {rest}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[0.75rem]" style={{ color: c.muted }}>
            Tiderne er eksempler.
          </p>
        </div>
      </div>
    </section>
  );
}
