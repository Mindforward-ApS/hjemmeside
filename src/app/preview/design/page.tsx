import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";
import { Skift } from "./Skift";

// Design pass preview (Marco 2026-11-24, design/troevaerdighed.md): the live home with points 1, 2, 3 and 6 applied
// as one CSS layer, switchable Før/Efter. Nothing here touches the live site.
export const metadata = { robots: { index: false } };
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const P = ".greb-btn:not(.greb-btn--light), .nf-press.h-11.text-white";
const S = ".greb-btn.greb-btn--light, .nf-press.h-11:not(.text-white), .nf-press.h-\\[43px\\]";

const css = `
/* 1 · Ét knapsystem: alle primære orange, alle sekundære hvide, samme pille og samme løft. */
.dp main :is(${P}) { background: linear-gradient(90deg, #fb970a, #f8400a) !important; color: #fff !important; border-color: transparent !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -2px 5px rgba(120,20,0,.35), 0 1px 1px rgba(0,0,0,.3), 0 3px 6px -2px rgba(0,0,0,.26), 0 14px 24px -12px rgba(0,0,0,.38) !important; }
.dp main :is(${S}) { background: #fff !important; color: #201613 !important; border-color: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(32,22,19,.12), 0 1px 1px rgba(0,0,0,.06), 0 3px 6px -2px rgba(0,0,0,.08), 0 12px 20px -12px rgba(0,0,0,.16) !important; }
.dp main :is(${P}, ${S}):active { box-shadow: inset 0 2px 6px rgba(120,20,0,.45) !important; transform: translateY(0) !important; }

/* 2 · Orange kun til handling: ikoncirkler, barer og fremhævede rammer bliver rolige; prisrammen står stille. */
.dp main span.grid.rounded-full:is(.size-9, .size-10, .size-11)[style*="fb970a"],
.dp main span.grid.rounded-full:is(.size-9, .size-10, .size-11)[class*="bg-"] { background: transparent !important; box-shadow: inset 0 0 0 1.5px currentColor !important; color: inherit !important; }
.dp main .h-1.rounded-full[style*="fb970a"] { background: #201613 !important; }
.dp main .pris-glow { animation: none !important; background: #f8580a !important; }
.dp main .pris-glow::before { display: none !important; }
.dp main #problemet .pris-glow, .dp main section:has(#features-title) .pris-glow { background: #201613 !important; }
.dp main #problemet .pris-glow > p, .dp main section:has(#features-title) .pris-glow > p { text-shadow: none !important; }
.dp main .kontakt-glow { display: none !important; }

/* 3 · Kort med dybde: én radius-skala (24 ude, 16 inde), 1 px kant, lag-skygge og en lys linje i toppen. */
.dp main :is(.rounded-\\[20px\\], .rounded-\\[22px\\], .rounded-\\[24px\\], .rounded-\\[32px\\], .rounded-\\[34px\\]):not(.pris-glow):not(button):not(a) { border-radius: 24px !important; }
.dp main :is(.rounded-\\[16px\\], .rounded-\\[18px\\], .rounded-\\[19px\\]) { border-radius: 16px !important; }
.dp main .pris-glow { border-radius: 24px !important; }
.dp main .pris-glow > div { border-radius: 21px !important; }
.dp main :is(.rounded-\\[20px\\], .rounded-\\[24px\\], .rounded-\\[32px\\], .rounded-\\[34px\\]):is(.bg-white, [style*="#fbf8f3"], [style*="#f5f2ef"]):not(button):not(a) {
  box-shadow: 0 0 0 1px rgba(32,22,19,.07), inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(32,22,19,.05), 0 8px 16px -8px rgba(32,22,19,.08), 0 24px 40px -24px rgba(32,22,19,.18) !important; border-color: transparent !important; }

/* 6 · Detaljer: tal i samme bredde, formularfelter 48 px, samme fokusring overalt. */
.dp main { font-variant-numeric: tabular-nums; }
.dp main :is(input:not([type=checkbox]):not([type=radio]), select) { min-height: 48px !important; border-radius: 12px !important; }
.dp main textarea { border-radius: 12px !important; }
.dp main :is(a, button, input, textarea, select):focus-visible { outline: 2px solid #201613 !important; outline-offset: 3px !important; }
`;

export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{css}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
      <Skift />
    </div>
  );
}
