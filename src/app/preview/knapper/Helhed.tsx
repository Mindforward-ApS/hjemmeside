import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Button variants seen on the whole home page (Marco 2026-11-23: "kan ikke se det for mig i helheden").
// Same page as "/", only the button styling differs. A = pressed in, B = today's lifted button, C = flat.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Every primary and every secondary button on the page, whatever component draws it today.
const P = ".greb-btn:not(.greb-btn--light), .nf-press.h-11.text-white";
const S = ".greb-btn.greb-btn--light, .nf-press.h-11:not(.text-white), .nf-press.h-\\[43px\\]";
const PS = `${P}, ${S}`;
const orange = "linear-gradient(90deg, #fb970a, #f8400a)";

// Shared: primaries are orange, secondaries white, all the same pill.
const base = `
  :is(${P}) { background: ${orange} !important; color: #fff !important; border-color: transparent !important; }
  :is(${S}) { background: #fff !important; color: #201613 !important; border-color: transparent !important; }
`;

const variants = {
  // A: pressed into the page at rest; hover lifts it a little towards the surface.
  a: base + `
    :is(${PS}) { transform: none !important; filter: none; transition: box-shadow .2s ease, filter .2s ease !important; }
    :is(${P}) { box-shadow: inset 0 2px 6px rgba(120,20,0,.55), inset 0 -1px 0 rgba(255,255,255,.2), 0 1px 0 rgba(255,255,255,.35) !important; }
    :is(${S}) { box-shadow: inset 0 2px 5px rgba(32,22,19,.18), inset 0 0 0 1px rgba(32,22,19,.06), 0 1px 0 rgba(255,255,255,.9) !important; }
    .greb-btn__circle { box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.25) !important; }
    .greb-btn::before, .greb-btn::after { display: none; }
    @media (hover: hover) {
      :is(${P}):hover { filter: brightness(1.05); box-shadow: inset 0 1px 2px rgba(120,20,0,.4), 0 1px 0 rgba(255,255,255,.35) !important; }
      :is(${S}):hover { box-shadow: inset 0 1px 2px rgba(32,22,19,.12), inset 0 0 0 1px rgba(32,22,19,.06) !important; }
    }
    :is(${P}):active { box-shadow: inset 0 3px 9px rgba(120,20,0,.7) !important; }
    :is(${S}):active { box-shadow: inset 0 3px 8px rgba(32,22,19,.25) !important; }
  `,
  // B: today's lifted button, applied to every button.
  b: base + `
    :is(${P}) { box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -2px 5px rgba(120,20,0,.35), 0 1px 1px rgba(0,0,0,.30), 0 3px 6px -2px rgba(0,0,0,.26), 0 14px 24px -12px rgba(0,0,0,.38) !important; }
    :is(${S}) { box-shadow: inset 0 0 0 1px rgba(32,22,19,.12), 0 1px 1px rgba(0,0,0,.08), 0 3px 6px -2px rgba(0,0,0,.1), 0 12px 20px -12px rgba(0,0,0,.18) !important; }
    @media (hover: hover) { :is(${PS}):hover { transform: translateY(-2px); } }
  `,
  // C: flat. Colour and shape only, no depth.
  c: base + `
    :is(${PS}) { transform: none !important; filter: none; }
    :is(${P}) { background: #f8680a !important; box-shadow: none !important; }
    :is(${S}) { box-shadow: inset 0 0 0 1px rgba(32,22,19,.18) !important; }
    .greb-btn::before, .greb-btn::after { display: none; }
    .greb-btn__circle { box-shadow: none !important; }
    @media (hover: hover) { :is(${P}):hover { background: #ea5c06 !important; } :is(${S}):hover { background: #f5f2ef !important; } }
  `,
} as const;

export function Helhed({ v }: { v: keyof typeof variants }) {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{variants[v]}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
